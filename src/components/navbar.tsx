import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MessageSquareText } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="container flex items-center justify-between py-6 mx-auto">
      <Link href="/" className="flex items-center space-x-2 cursor-pointer">
        <MessageSquareText className="h-8 w-8 text-[#9798ff]" />
        <h1 className="text-xl lg:text-2xl font-semibold tracking-tight text-foreground">
          DM Genie
        </h1>
      </Link>

      <div className="flex items-center space-x-2">
        <Link href="/sign-in">
          <Button className="cursor-pointer" variant="outline">
            Sign In
          </Button>
        </Link>
        <Link href="/sign-up">
          <Button className="bg-[#9798ff] text-white hover:bg-[#8789f2] cursor-pointer">
            Sign Up
          </Button>
        </Link>
      </div>
    </nav>
  );
}
