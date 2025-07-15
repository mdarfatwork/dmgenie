import { SignUp } from "@clerk/nextjs";
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Sign Up | DM Genie",
  description:
    "Create your DM Genie account to start generating personalized messages.",
};

export default async function Page() {
  return (
    <section className="flex items-center justify-center h-screen">
      <SignUp />
    </section>
  );
}
