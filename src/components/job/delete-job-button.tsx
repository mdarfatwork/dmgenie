"use client";

import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Trash } from "lucide-react";
import { deleteJob } from "@/actions/job.actions";
import { toast } from "sonner";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";

export function DeleteJobButton({ jobId }: { jobId: string }) {
  const router = useRouter();

  const { execute, isExecuting } = useAction(deleteJob, {
    onSuccess: () => {
      toast.success("Job deleted successfully");
      router.push("/job");
    },
    onError: ({ error }) => {
      toast.error("Failed to delete the job");
      console.error("Failed to delete the job", error);
    },
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
          className="bg-red-600 cursor-pointer"
          size="sm"
        >
          <Trash className="w-4 h-4 mr-2" />
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. It will permanently delete this job
            post.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer" disabled={isExecuting}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() =>
              execute({
                id: jobId,
              })
            }
            disabled={isExecuting}
            className="text-white bg-red-600 hover:bg-red-700 cursor-pointer"
          >
            {isExecuting ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
