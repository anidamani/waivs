import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Use Clerk middleware to protect routes
export default clerkMiddleware((req) => {
	// ...any custom middleware logic if needed...
	return NextResponse.next();
});

// Only run the middleware on specific routes; adjust the matcher as necessary.
export const config = {
	matcher: ["/((?!_next/|static/|favicon.ico).*)"],
};