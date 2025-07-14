import ProfileForm from "@/components/profile/profile-form";
import { Button } from "@/components/ui/button";
import { SignOutButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await currentUser();
  if (!user) redirect("/");

  //   const userEmail = user.emailAddresses[0]?.emailAddress || "";

  return (
    <section className="min-h-screen">
      <ProfileForm />
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
