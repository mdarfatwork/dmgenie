"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MessageSquare, Send, Sparkles } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { addMessageSchema, AddMessageSchemaType } from "@/lib/zod-schema";
import { useAction } from "next-safe-action/hooks";
import { addMessage } from "@/actions/job.actions";

interface AddMessageButtonProps {
  jobId: string;
  companyName: string;
  jobRole: string;
}

export function AddMessageButton({
  jobId,
  companyName,
  jobRole,
}: AddMessageButtonProps) {
  const [open, setOpen] = useState(false);

  const isDev = process.env.NODE_ENV === "development";

  const form = useForm<AddMessageSchemaType>({
    resolver: zodResolver(addMessageSchema),
    defaultValues: isDev
      ? {
          jobId,
          employeeName: "John Smith",
          employeeRole: "Engineering Manager",
          messageTone: "professional",
          customInstructions:
            "Please emphasize my experience with React and TypeScript",
        }
      : {
          jobId,
          employeeName: "",
          employeeRole: "",
          messageTone: undefined,
          customInstructions: "",
        },
  });

  const { execute, isExecuting } = useAction(addMessage, {
    onSuccess: () => {
      toast.success("Message Generated successfully");
      setOpen(false);
    },
    onError: ({ error }) => {
      toast.error("Failed while generating message");
      console.log("Failed while generating message", error);
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className="bg-[#9798ff] hover:bg-[#8589ff] text-white px-8 py-3 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer"
        >
          <Sparkles className="w-5 h-5 mr-2" />
          Generate Message
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Generate Personalized Message
          </DialogTitle>
          <DialogDescription>
            Create a personalized email message for a {companyName} employee
            regarding the {jobRole} position.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(execute)} className="space-y-6">
            <FormField
              control={form.control}
              name="employeeName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Employee Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Sarah Johnson"
                      disabled={isExecuting}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter the name of the company employee you want to contact.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="employeeRole"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Employee Role</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Senior Developer, HR Manager"
                      disabled={isExecuting}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter the role or position of the employee.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="messageTone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message Tone</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={isExecuting}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select message tone" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white">
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="friendly">Friendly</SelectItem>
                      <SelectItem value="casual">Casual</SelectItem>
                      <SelectItem value="formal">Formal</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Choose the tone for your message based on the company
                    culture.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="customInstructions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Custom Instructions (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Any specific points you'd like to emphasize or include in the message..."
                      className="min-h-[100px]"
                      disabled={isExecuting}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Provide any additional context or specific requirements for
                    the message.
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
                {isExecuting ? (
                  <>
                    <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Generate Message
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
