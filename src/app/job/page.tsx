import { Briefcase, Eye } from "lucide-react";
import { AddJobButton } from "@/components/job/add-job-button";
import { getJobsByUserId } from "@/lib/queries";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function JobPage() {
  const jobs = await getJobsByUserId();

  if (!jobs || jobs.length === 0) {
    return (
      <main className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-12">
          <div className="text-center space-y-8">
            <div className="flex justify-center">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-[#9798ff] flex items-center justify-center">
                <Briefcase className="w-10 h-10 md:w-12 md:h-12 text-white" />
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              Add Job to Generate Messages
            </h1>

            <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
              Create personalized email messages for company employees by adding
              job details and requirements
            </p>
          </div>

          <AddJobButton />
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-16 md:py-24">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            My Jobs
          </h1>
          <p className="text-gray-600 text-lg mt-2">
            Manage your job applications and generate personalized messages
          </p>
        </div>
        <AddJobButton />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <Card
            key={job.id}
            className="hover:shadow-lg transition-shadow duration-200"
          >
            <CardHeader className="pb-3">
              <CardTitle className="text-xl font-semibold text-gray-900 line-clamp-1">
                {job.companyName}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-lg font-medium text-gray-700 line-clamp-2">
                  {job.jobRole}
                </p>
                <p className="text-sm text-gray-500 mt-2 line-clamp-3">
                  {job.jobDescription}
                </p>
              </div>

              <div className="flex justify-between items-center pt-2">
                <div className="text-xs text-gray-400">
                  {new Intl.DateTimeFormat("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  }).format(new Date(job.createdAt))}
                </div>
                <Link href={`/jobs/${job.id}`}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <Eye className="w-4 h-4" />
                    View Job
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
