"use client";

import {
  DropZoneArea,
  Dropzone,
  DropzoneMessage,
  DropzoneTrigger,
  useDropzone,
} from "@/components/ui/dropzone";
import { UploadIcon, FileText, X } from "lucide-react";
import { toast } from "sonner";
import pdfToText from "react-pdftotext";
import { useState } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { useAction } from "next-safe-action/hooks";
import { createProfile } from "@/actions/profile.action";
import type { ProfileData } from "@/lib/queries";

interface Props {
  userId: string;
  userEmail: string;
  profile: ProfileData;
}

export default function ProfileForm({ userId, userEmail, profile }: Props) {
  const [originalText, setOriginalText] = useState<string | null>(
    profile?.aboutMe ?? null
  );
  const [editedText, setEditedText] = useState<string>(profile?.aboutMe ?? "");

  const dropzone = useDropzone({
    onDropFile: async (file: File) => {
      try {
        const extractedText = await pdfToText(file);
        setOriginalText(extractedText);
        setEditedText(extractedText);
        toast.success("PDF uploaded successfully");
      } catch (error) {
        console.error("Failed to extract text from PDF", error);
        toast.error("Failed to extract text from PDF. Please try again.");
      }
      return { status: "success", result: file };
    },
    validation: {
      accept: {
        "application/pdf": [".pdf"],
      },
      maxSize: 2 * 1024 * 1024,
      maxFiles: 1,
    },
    shiftOnMaxFiles: true,
  });

  const handleTextChange = (value: string) => {
    setEditedText(value);
  };

  const { execute, isExecuting } = useAction(createProfile, {
    onSuccess: ({}) => {
      toast.success("Your profile is created sucessfully");
    },
    onError: ({ error }) => {
      toast.error("Error while creating profile");
      console.error("Error while creating profile", error);
    },
  });

  const handleReset = () => {
    if (originalText) {
      setEditedText(originalText);
      toast.info("Text reset to original");
    }
  };

  const handleStartOver = () => {
    setOriginalText(null);
    setEditedText("");
    toast.info("Starting over with new upload");
  };

  const hasChanges = originalText !== editedText;

  return (
    <div className="container sm:max-w-2xl mx-auto py-8">
      {originalText ? (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold">About Me</h2>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleStartOver}
              className="space-x2 cursor-pointer"
            >
              <X className="h-4 w-4" />
              Start Over
            </Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="about-me">
              Edit your about me section
              {hasChanges && (
                <span className="text-xs text-orange-600 ml-2">(Modified)</span>
              )}
            </Label>
            <Textarea
              id="about-me"
              value={editedText}
              onChange={(e) => handleTextChange(e.target.value)}
              placeholder="Tell us about yourself..."
              className="min-h-[200px] resize-y"
            />
            <p className="text-xs text-muted-foreground">
              {editedText.length} characters
            </p>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={() => {
                execute({
                  clerkId: userId,
                  email: userEmail,
                  aboutMe: editedText,
                });
              }}
              disabled={isExecuting || !editedText.trim()}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
            >
              {isExecuting ? "Submitting..." : "Submit"}
            </Button>

            {hasChanges && (
              <Button
                variant="outline"
                onClick={handleReset}
                disabled={isExecuting}
              >
                Reset
              </Button>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight">
              Upload Your Resume
            </h2>
            <p className="text-muted-foreground mt-2">
              We&apos;ll extract the content to help you create your profile
            </p>
          </div>

          <Dropzone value={dropzone}>
            <DropZoneArea className="border-0 p-0">
              <DropzoneTrigger className="flex w-full flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed bg-transparent px-6 py-12 text-sm transition-colors hover:bg-muted/50 hover:border-primary/50">
                <UploadIcon className="h-12 w-12 text-muted-foreground" />
                <div className="text-center space-y-2">
                  <p className="text-base text-foreground">
                    Drag & drop your resume here, or{" "}
                    <span className="font-semibold text-primary hover:underline">
                      click to browse
                    </span>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Only PDF files are allowed (Max 2MB)
                  </p>
                </div>
              </DropzoneTrigger>
            </DropZoneArea>
            <DropzoneMessage className="mt-4 text-center" />
          </Dropzone>
        </div>
      )}
    </div>
  );
}
