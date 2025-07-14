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

export default function ProfileForm() {
  const [originalText, setOriginalText] = useState<string | null>(null);
  const [editedText, setEditedText] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  const dropzone = useDropzone({
    onDropFile: async (file: File) => {
      try {
        const extractedText = await pdfToText(file);
        setOriginalText(extractedText);
        setEditedText(extractedText);
        setUploadedFileName(file.name);
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

  const handleSubmit = async () => {
    if (!editedText.trim()) {
      toast.error("Please enter some content before submitting");
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate API call - replace with your actual submission logic
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Your submission logic here
      console.log("Submitting:", editedText);

      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Submission failed:", error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    if (originalText) {
      setEditedText(originalText);
      toast.info("Text reset to original");
    }
  };

  const handleStartOver = () => {
    setOriginalText(null);
    setEditedText("");
    setUploadedFileName(null);
    toast.info("Starting over with new upload");
  };

  const hasChanges = originalText !== editedText;

  return (
    <div className="container sm:max-w-2xl mx-auto py-8">
      {originalText ? (
        <div className="space-y-6">
          {/* Header with file info */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              <div>
                <h2 className="text-lg font-semibold">About Me</h2>
                {uploadedFileName && (
                  <p className="text-sm text-muted-foreground">
                    From: {uploadedFileName}
                  </p>
                )}
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleStartOver}
              className="gap-2"
            >
              <X className="h-4 w-4" />
              Start Over
            </Button>
          </div>

          {/* Textarea */}
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

          {/* Action buttons */}
          <div className="flex gap-3">
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting || !editedText.trim()}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>

            {hasChanges && (
              <Button
                variant="outline"
                onClick={handleReset}
                disabled={isSubmitting}
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
