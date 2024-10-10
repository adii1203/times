"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export function AddMode({
  addMode,
  setName,
  setDuration,
  name,
  duration,
}: {
  addMode: () => void;
  setName: (name: string) => void;
  setDuration: (duration: number) => void;
  name: string;
  duration: number;
}) {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size={"icon"}
          className="w-7 h-7 rounded-full">
          +
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add new mode</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right text-xs">
              Name
            </Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="name"
              className="col-span-3 h-7"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="duration" className="text-right text-xs">
              Duration
            </Label>
            <Input
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              id="duration"
              className="col-span-3 h-7"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            size={"sm"}
            variant={"outline"}
            className="w-20 h-7 text-xs"
            onClick={() => {
              addMode();
              setIsDialogOpen(false);
            }}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
