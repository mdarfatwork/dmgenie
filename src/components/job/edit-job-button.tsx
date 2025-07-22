"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { editJobSchema, EditJobSchemaType } from "@/lib/zod-schema";
import { editJob } from "@/actions/job.actions";
import { toast } from "sonner";
import { useAction } from "next-safe-action/hooks";
import type { JobData } from "@/lib/queries";

type Props = {
  job: NonNullable<JobData>;
};

export function EditJobButton({ job }: Props) {
  const [open, setOpen] = useState(false);

  const form = useForm<EditJobSchemaType>({
    resolver: zodResolver(editJobSchema),
    defaultValues: job,
  });

  const { execute, isExecuting } = useAction(editJob, {
    onSuccess: () => {
      toast.success("Job updated successfully");
      setOpen(false);
    },
    onError: ({ error }) => {
      toast.error("Failed to update the job");
      console.error("Failed to update the job", error);
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="cursor-pointer" size="sm">
          <Pencil className="w-4 h-4 mr-2" />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Job</DialogTitle>
          <DialogDescription>Update your job details.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(execute)} className="space-y-6">
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isExecuting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="jobRole"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Role</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isExecuting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="jobDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Description</FormLabel>
                  <FormControl>
                    <Textarea
                      className="min-h-[120px] max-h-[60vh] overflow-y-scroll"
                      {...field}
                      disabled={isExecuting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={isExecuting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-[#9798ff] text-white hover:bg-[#8589ff]"
                disabled={isExecuting}
              >
                Save Changes
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
