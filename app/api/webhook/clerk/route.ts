import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client with service role key for admin actions
const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '', // Ensure NEXT_PUBLIC_SUPABASE_URL is available
    process.env.SUPABASE_SERVICE_ROLE_KEY || ''  // Ensure SUPABASE_SERVICE_ROLE_KEY is available
);

export async function POST(req: Request) {
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

    if (!WEBHOOK_SECRET) {
        throw new Error('Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env.local or .env.production')
    }

    // Get the headers
    const headerPayload = headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response('Error occurred -- no svix headers', {
            status: 400
        })
    }

    // Get the payload
    const payload = await req.json()
    const body = JSON.stringify(payload);

    // Instantiate the webhook
    const wh = new Webhook(WEBHOOK_SECRET);

    let evt: WebhookEvent

    // Verify the payload with the headers
    try {
        evt = wh.verify(body, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        }) as WebhookEvent
    } catch (err) {
        console.error('Error verifying webhook:', err);
        return new Response('Error occurred -- could not verify webhook', {
            status: 400
        })
    }

    const eventType = evt.type;

    // Handle user creation event
    if (eventType === 'user.created') {
        const { id: clerkUserId, email_addresses, first_name, last_name } = evt.data;
        const email = email_addresses[0].email_address;

        try {
            // 1. Create Supabase Auth user
            const { data: supabaseUser, error: supabaseAuthError } = await supabaseAdmin.auth.admin.createUser({
                email: email,
                user_metadata: { clerk_id: clerkUserId } // Optional: Store Clerk ID in user metadata for reference
            });

            if (supabaseAuthError) {
                console.error('Error creating Supabase Auth user:', supabaseAuthError);
                return new Response('Error creating Supabase Auth user', { status: 500 });
            }
            const supabaseAuthUid = supabaseUser.user.id;

            // 2. Create therapist record in your database, linking to Supabase Auth user
            const { error: therapistError } = await supabaseAdmin // Use supabaseAdmin for service role access
                .from('therapists')
                .insert([
                    {
                        clerk_id: clerkUserId,
                        supabase_auth_uid: supabaseAuthUid, // Link to Supabase Auth user
                        email: email,
                        first_name: first_name || '',
                        last_name: last_name || '',
                    }
                ]);

            if (therapistError) {
                console.error('Error creating therapist:', therapistError);
                return new Response('Error creating therapist', { status: 500 });
            }

            console.log(`Therapist created successfully for Clerk user ${clerkUserId} and Supabase Auth user ${supabaseAuthUid}`);
            return new Response('User and Therapist created successfully', { status: 201 }); // Use 201 for successful creation

        } catch (error) {
            console.error('Error processing user.created webhook:', error);
            return new Response('Error processing webhook event', { status: 500 }); // Generic error for webhook processing
        }
    }

    // Handle other webhook events if necessary (e.g., user.updated, user.deleted)
    // ...

    // Return a default success response for events we don't explicitly handle
    return new Response('Webhook received and processed successfully', { status: 200 });
}
