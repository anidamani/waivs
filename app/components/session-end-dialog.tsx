"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { NoteFormat, TherapyType } from "../lib/types"
import { NOTE_FORMATS } from "../lib/types"

interface SessionEndDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: (data: { therapyType: TherapyType; noteFormat: NoteFormat }) => void
}

export function SessionEndDialog({ open, onOpenChange, onConfirm }: SessionEndDialogProps) {
  const [therapyType, setTherapyType] = React.useState<TherapyType>("Individual")
  const [noteFormat, setNoteFormat] = React.useState<NoteFormat>("SOAP")
  const [openCombobox, setOpenCombobox] = React.useState(false)

  const handleConfirm = () => {
    onConfirm({ therapyType, noteFormat })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>End Session</DialogTitle>
          <DialogDescription>Choose the session type and note format before ending the session.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="grid gap-2">
            <Label>Therapy Type</Label>
            <RadioGroup
              value={therapyType}
              onValueChange={(value) => setTherapyType(value as TherapyType)}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Individual" id="individual" />
                <Label htmlFor="individual">Individual</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Couple" id="couple" />
                <Label htmlFor="couple">Couple</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="grid gap-2">
            <Label>Note Format</Label>
            <Popover open={openCombobox} onOpenChange={setOpenCombobox}>
              <PopoverTrigger asChild>
                <Button variant="outline" role="combobox" aria-expanded={openCombobox} className="justify-between">
                  {noteFormat ? NOTE_FORMATS[noteFormat].name : "Select format..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[400px] p-0">
                <Command>
                  <CommandInput placeholder="Search note formats..." />
                  <CommandList>
                    <CommandEmpty>No format found.</CommandEmpty>
                    <CommandGroup>
                      <ScrollArea className="h-[200px]">
                        {Object.values(NOTE_FORMATS).map((format) => (
                          <CommandItem
                            key={format.name}
                            value={format.name}
                            onSelect={() => {
                              setNoteFormat(format.name)
                              setOpenCombobox(false)
                            }}
                          >
                            <Check
                              className={cn("mr-2 h-4 w-4", noteFormat === format.name ? "opacity-100" : "opacity-0")}
                            />
                            <div>
                              <div>{format.name}</div>
                              <div className="text-sm text-muted-foreground">{format.description}</div>
                            </div>
                          </CommandItem>
                        ))}
                      </ScrollArea>
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            {noteFormat && (
              <div className="mt-2 space-y-4">
                <div className="text-sm font-medium">Format sections:</div>
                <div className="grid gap-2">
                  {NOTE_FORMATS[noteFormat].sections.map((section) => (
                    <div key={section.letter} className="flex gap-2">
                      <div className="font-bold">{section.letter}:</div>
                      <div className="text-sm text-muted-foreground">
                        {section.title} - {section.description}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleConfirm}>End Session</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

