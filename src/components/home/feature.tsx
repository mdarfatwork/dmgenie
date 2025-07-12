import { FileText, Briefcase, MessageSquare } from "lucide-react";

export default function Feature() {
  const features = [
    {
      icon: FileText,
      title: "Upload Your Resume",
      description: "Upload a recent resume candidate.",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: Briefcase,
      title: "Add Job Details",
      description: "Add details about the job completion.",
      color: "bg-[#9798ff] text-white",
    },
    {
      icon: MessageSquare,
      title: "Generate Personalized Messages",
      description: "Send sage messages from personalized outreach.",
      color: "bg-purple-100 text-purple-600",
    },
  ];

  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
        {features.map((feature, index) => (
          <div key={index} className="text-center space-y-6">
            {/* Icon */}
            <div className="flex justify-center">
              <div
                className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center ${feature.color}`}
              >
                <feature.icon className="w-8 h-8 md:w-10 md:h-10" />
              </div>
            </div>

            {/* Title */}
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight">
              {feature.title}
            </h3>

            {/* Description */}
            <p className="text-gray-600 text-base md:text-lg max-w-sm mx-auto">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
