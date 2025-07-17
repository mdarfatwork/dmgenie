import Link from "next/link";
import { MessageSquareText } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="container mx-auto py-8">
      <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-[#9798ff] rounded-lg flex items-center justify-center">
            <MessageSquareText className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">DM Genie</span>
        </div>

        <nav className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
          <Link
            href="/contact"
            className="text-gray-600 hover:text-[#9798ff] transition-colors duration-200 font-medium"
          >
            Contact
          </Link>
          <Link
            href="/terms"
            className="text-gray-600 hover:text-[#9798ff] transition-colors duration-200 font-medium"
          >
            Terms
          </Link>
          <Link
            href="/privacy"
            className="text-gray-600 hover:text-[#9798ff] transition-colors duration-200 font-medium"
          >
            Privacy Policy
          </Link>
        </nav>
      </div>

      <div className="mt-8 pt-6">
        <div className="text-center text-gray-600 text-sm">
          <p className="flex flex-wrap justify-center items-center gap-1">
            <span>Copyright</span>
            <span>© {currentYear}</span>
            <span className="font-bold text-gray-900">LetterGenie</span>
            <span>. All rights reserved. Made with ❤️ by</span>
            <Link
              href="https://www.linkedin.com/in/momin-mohammed-arfat/"
              target="_blank"
              className="font-bold text-[#9798ff] hover:text-[#8889ff] transition-colors duration-200"
            >
              Mohammed Arfat
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
