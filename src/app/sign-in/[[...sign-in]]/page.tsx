import { SignIn } from "@clerk/nextjs";
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Sign In | DM Genie",
  description:
    "Access your DM Genie account to manage your profile and messages.",
};

export default async function Page() {
  return (
    <section className="flex items-center justify-center h-screen">
      <SignIn />
    </section>
  );
}
