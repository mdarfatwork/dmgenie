"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { addJobSchema, AddJobSchemaType } from "@/lib/zod-schema";
import { useAction } from "next-safe-action/hooks";
import { addJob } from "@/actions/job.actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function AddJobButton() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const isDev = process.env.NODE_ENV === "development";

  const form = useForm<AddJobSchemaType>({
    resolver: zodResolver(addJobSchema),
    defaultValues: isDev
      ? {
          companyName: "WebMakers Studio",
          jobRole: "Frontend Developer",
          jobDescription:
            "We are looking for a passionate Frontend Developer to join our team. The ideal candidate should have experience with React, TypeScript, and Tailwind CSS, and a strong eye for design and user experience. You will collaborate with cross-functional teams to build responsive, accessible, and high-performance web interfaces.",
        }
      : {
          companyName: "",
          jobRole: "",
          jobDescription: "",
        },
  });

  const { execute, isExecuting } = useAction(addJob, {
    onSuccess: ({ data }) => {
      toast.success("your job is added successfully");
      setOpen(false);
      router.push(`/job/${data.id}`);
    },
    onError: ({ error }) => {
      toast.error("failed to add the job");
      console.error("failed to add the job", error);
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className="bg-[#9798ff] hover:bg-[#8589ff] text-white px-8 py-3 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Job
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add Job Details</DialogTitle>
          <DialogDescription>
            Enter the job information to generate personalized messages for
            company employees.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(execute)} className="space-y-6 max-h-[70vh] overflow-auto">
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Tech Solutions Inc."
                      disabled={isExecuting}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter the name of the company you&apos;re applying to.
                  </FormDescription>
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
                    <Input
                      placeholder="e.g., Senior Software Engineer"
                      disabled={isExecuting}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter the specific job title or role.
                  </FormDescription>
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
                      placeholder="Enter the job description, requirements, and key responsibilities..."
                      className="min-h-[120px]"
                      disabled={isExecuting}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Provide detailed information about the job requirements and
                    responsibilities.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={isExecuting}
                className="cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isExecuting}
                className="bg-[#9798ff] hover:bg-[#8589ff] cursor-pointer"
              >
                {isExecuting ? "Adding..." : "Add Job"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
