import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-6 lg:pr-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              AI-Powered
              <br />
              <span className="text-[#9798ff]">LinkedIn Message</span>
              <br />
              Generator for
              <br />
              Job Seekers
            </h1>

            <p className="text-lg md:text-xl text-gray-600 max-w-lg">
              Upload your resume, add a job, and generate personalized outreach
              messages.
            </p>

            <div className="pt-4">
              <Link href="/sign-up">
                <Button
                  size="lg"
                  className="bg-[#9798ff] hover:bg-[#8889ff] text-white px-8 py-3 text-lg font-semibold rounded-lg transition-colors duration-200 cursor-pointer"
                >
                  Get Started
                </Button>
              </Link>
            </div>
          </div>

          <div className="order-first lg:order-last flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-3 h-3 bg-[#9798ff] rounded-full opacity-60"></div>
              <div className="absolute -top-8 left-8 w-2 h-2 bg-[#9798ff] rounded-full opacity-40"></div>
              <div className="absolute -top-2 left-16 w-4 h-4 bg-[#9798ff] rounded-full opacity-30"></div>
              <div className="absolute top-8 -right-6 w-3 h-3 bg-[#9798ff] rounded-full opacity-50"></div>
              <div className="absolute top-16 -right-2 w-2 h-2 bg-[#9798ff] rounded-full opacity-40"></div>
              <div className="absolute bottom-4 -left-8 w-3 h-3 bg-[#9798ff] rounded-full opacity-45"></div>
              <div className="absolute bottom-8 -right-4 w-2 h-2 bg-[#9798ff] rounded-full opacity-35"></div>
              <div className="absolute bottom-12 left-4 w-4 h-4 bg-[#9798ff] rounded-full opacity-25"></div>

              <svg
                width="280"
                height="280"
                viewBox="0 0 280 280"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-64 h-64 md:w-80 md:h-80"
              >
                <rect
                  x="60"
                  y="80"
                  width="160"
                  height="120"
                  rx="25"
                  fill="#9798ff"
                  stroke="#7c7dff"
                  strokeWidth="3"
                />

                <text
                  x="140"
                  y="150"
                  textAnchor="middle"
                  fill="white"
                  fontSize="48"
                  fontWeight="bold"
                  fontFamily="Arial, sans-serif"
                >
                  AI
                </text>

                <circle cx="100" cy="70" r="6" fill="#9798ff" />
                <rect x="98" y="50" width="4" height="25" fill="#9798ff" />
                <circle cx="180" cy="70" r="6" fill="#9798ff" />
                <rect x="178" y="50" width="4" height="25" fill="#9798ff" />

                <circle cx="110" cy="120" r="8" fill="white" />
                <circle cx="170" cy="120" r="8" fill="white" />
                <circle cx="110" cy="120" r="4" fill="#9798ff" />
                <circle cx="170" cy="120" r="4" fill="#9798ff" />

                <path
                  d="M 120 170 Q 140 185 160 170"
                  stroke="white"
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                />

                <rect
                  x="20"
                  y="120"
                  width="50"
                  height="20"
                  rx="10"
                  fill="#9798ff"
                />
                <rect
                  x="210"
                  y="120"
                  width="50"
                  height="20"
                  rx="10"
                  fill="#9798ff"
                />

                <rect
                  x="80"
                  y="200"
                  width="120"
                  height="60"
                  rx="15"
                  fill="#9798ff"
                  stroke="#7c7dff"
                  strokeWidth="2"
                />

                <rect
                  x="95"
                  y="215"
                  width="90"
                  height="8"
                  rx="4"
                  fill="white"
                  opacity="0.3"
                />
                <rect
                  x="95"
                  y="230"
                  width="70"
                  height="6"
                  rx="3"
                  fill="white"
                  opacity="0.3"
                />
                <rect
                  x="95"
                  y="242"
                  width="50"
                  height="6"
                  rx="3"
                  fill="white"
                  opacity="0.3"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
