"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { MessagesData } from "@/lib/queries";
import { CheckCircle, Copy, Eye } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

type Props = {
  message: NonNullable<MessagesData>[number];
};

export function ViewMessageDialog({ message }: Props) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.generatedMessage);
      setCopied(true);
      toast.success("Cover letter copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error("Failed to copy to clipboard");
      console.error("Copy to clipboard failed:", error);
      setCopied(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="cursor-pointer" variant="outline" size="sm">
          <Eye className="w-4 h-4 mr-2" />
          View Message
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[70vh] overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>Message for {message.employeeName}</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Role: {message.employeeRole} · Tone: {message.messageTone}
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            disabled={copied}
            className={`cursor-pointer ${copied && "text-green-700"}`}
          >
            {copied ? (
              <>
                <CheckCircle className="w-4 h-4 mr-1" />
                Copied
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-1" />
                Copy
              </>
            )}
          </Button>
        </div>
        <div className="whitespace-pre-wrap text-sm leading-relaxed mt-4">
          {message.generatedMessage}
        </div>
      </DialogContent>
    </Dialog>
  );
}
