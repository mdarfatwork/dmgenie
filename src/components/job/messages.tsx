import { MessageSquare } from "lucide-react";
import { AddMessageButton } from "./add-message-button";
import type { JobData, MessagesData } from "@/lib/queries";
import { ViewMessageDialog } from "./view-message";

type Props = {
  job: NonNullable<JobData>;
  messages: MessagesData;
};
export default function Messages({ job, messages }: Props) {
  return (
    <>
      {!messages || messages.length === 0 ? (
        <section className="flex flex-col items-center justify-center gap-6 py-8 text-center">
          <span className="w-16 h-16 rounded-2xl bg-[#9798ff] flex items-center justify-center">
            <MessageSquare className="w-8 h-8 text-white" />
          </span>
          <h2 className="text-lg md:text-xl lg:text-2xl font-bold">
            Generate Personalized Messages
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Create tailored email messages for {job.companyName} employees
            regarding the {job.jobRole} position
          </p>
          <AddMessageButton
            jobId={job.id}
            companyName={job.companyName}
            jobRole={job.jobRole}
          />
        </section>
      ) : (
        <>
          <div className="flex items-center justify-between my-2 mx-4">
            <h2 className="text-xl font-bold">Messages</h2>
            <AddMessageButton
              jobId={job.id}
              companyName={job.companyName}
              jobRole={job.jobRole}
            />
          </div>
          <section className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className="rounded-xl border p-4 shadow-sm flex flex-col justify-between space-y-4"
              >
                <div>
                  <h4 className="text-base font-semibold">
                    {message.employeeName}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {message.employeeRole}
                  </p>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {message.generatedMessage}
                </p>
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                  <span>
                    {new Intl.DateTimeFormat("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    }).format(new Date(message.updatedAt))}
                  </span>
                  <ViewMessageDialog companyName={job.companyName} jobRole={job.jobRole} message={message} />
                </div>
              </div>
            ))}
          </section>
        </>
      )}
    </>
  );
}
