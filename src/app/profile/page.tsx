import ProfileForm from "@/components/profile/profile-form";
import { Button } from "@/components/ui/button";
import { getProfileByUserId } from "@/lib/queries";
import { SignOutButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import type { Metadata } from 'next'
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Profile | DM Genie",
  description: "Manage your profile and resume in DM Genie",
};

export default async function Page() {
  const user = await currentUser();
  if (!user) redirect("/");

  const userId = user.id;
  const userEmail = user.emailAddresses[0]?.emailAddress;

  const profile = await getProfileByUserId();

  return (
    <section className="min-h-screen">
      <ProfileForm userId={userId} userEmail={userEmail} profile={profile} />
      <div className="flex items-center justify-center">
        <SignOutButton>
          <Button
            variant="destructive"
            className="text-sm bg-red-600 hover:bg-red-700 text-white cursor-pointer mx-auto"
          >
            Sign Out
          </Button>
        </SignOutButton>
      </div>
    </section>
  );
}
