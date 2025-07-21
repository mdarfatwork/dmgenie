import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | DM Genie",
  description:
    "Learn how your data is collected, used, and protected on DM Genie.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="px-4 py-12">
      <div className="mx-auto max-w-5xl space-y-6">
        <h1 className="text-4xl font-bold">Privacy Policy</h1>

        <p className="text-muted-foreground">Last updated: July 15, 2025</p>

        <div className="bg-muted p-4 rounded-xl border border-border text-sm">
          <strong>Disclaimer:</strong> DM Genie is a personal project created
          for educational and portfolio purposes. It uses third-party services
          including <strong>Clerk</strong> for authentication,{" "}
          <strong>Neon</strong> for database storage, and{" "}
          <strong>Gemini</strong> (by Google AI) for generating content. While
          we take care to handle your data responsibly, this is not a
          production-grade application.
        </div>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">1. Information We Collect</h2>
          <p>
            We collect basic user information such as your name, email address,
            and resume details when you sign up or upload content.
          </p>
          <p>
            Authentication and user management is handled securely via{" "}
            <strong>Clerk</strong>.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">2. How We Use Your Data</h2>
          <p>
            We use your data to provide features like personalized message
            generation for job applications. AI content is generated using{" "}
            <strong>Gemini</strong>, and no user data is sold or shared for
            marketing purposes.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">3. Data Storage</h2>
          <p>
            Your data is stored securely in a PostgreSQL database hosted on{" "}
            <strong>Neon</strong>. Only necessary data is stored, and access is
            limited to authorized operations within the app.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">4. AI Content Generation</h2>
          <p>
            Generated content (e.g., LinkedIn messages) is powered by Google’s{" "}
            <strong>Gemini</strong>. Your resume and job details may be
            temporarily sent to the AI model for generating messages, but are
            not retained or used beyond that purpose.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">5. Third-Party Services</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>
              <strong>Clerk</strong> – Handles user sign-up, sign-in, and
              session management.
            </li>
            <li>
              <strong>Neon</strong> – Hosts and manages our PostgreSQL database.
            </li>
            <li>
              <strong>Gemini</strong> – Generates AI content based on user
              inputs.
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">6. Data Deletion</h2>
          <p>
            You can request deletion of your account and associated data by
            contacting us. We&apos;ll process such requests within a reasonable
            timeframe.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">7. Security</h2>
          <p>
            We implement reasonable security measures to protect your data, but
            since this is a portfolio-level project, it should not be treated as
            a production environment for sensitive information.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">8. Changes to This Policy</h2>
          <p>
            This Privacy Policy may be updated in the future. Changes will be
            reflected on this page with a new &quot;Last Updated&quot; date.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">9. Contact</h2>
          <Link
            className="font-semibold underline text-blue-500"
            href="/contact"
          >
            Contact Page
          </Link>
        </section>
      </div>
    </div>
  );
}
