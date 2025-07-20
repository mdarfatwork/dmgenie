import { getJobById, getMessagesByJobId } from "@/lib/queries";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Building2, Briefcase } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { EditJobButton } from "@/components/job/edit-job-button";
import { DeleteJobButton } from "@/components/job/delete-job-button";
import Messages from "@/components/job/messages";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function JobPage({ params }: Props) {
  const { id: jobId } = await params;
  const job = await getJobById(jobId);

  const messages = await getMessagesByJobId(jobId);

  if (!job) {
    return (
      <main className="container mx-auto py-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Job Not Found
          </h1>
          <p className="text-gray-600">
            The job you&apos;re looking for doesn&apos;t exist.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto py-4 min-h-screen space-y-3">
      <div className="max-w-4xl mx-auto px-4">
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Building2 className="h-4 w-4" />
                  <span className="text-sm font-medium">{job.companyName}</span>
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900">
                  {job.jobRole}
                </CardTitle>
              </div>
              <Badge variant="secondary" className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {formatDistanceToNow(new Date(job.createdAt), {
                  addSuffix: true,
                })}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                Job Description
              </h3>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap prose prose-sm max-w-none">
                {job.jobDescription}
              </p>
            </div>

            <div className="pt-3 border-t">
              <div className="flex justify-between text-sm text-muted-foreground">
                <div>
                  <span className="font-medium">Created:</span>{" "}
                  {new Intl.DateTimeFormat("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  }).format(new Date(job.createdAt))}
                </div>
                <div>
                  <span className="font-medium">Updated:</span>{" "}
                  {new Intl.DateTimeFormat("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  }).format(new Date(job.updatedAt))}
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <EditJobButton job={job} />
            <DeleteJobButton jobId={job.id} />
          </CardFooter>
        </Card>
      </div>
      <Messages job={job} messages={messages} />
    </main>
  );
}
