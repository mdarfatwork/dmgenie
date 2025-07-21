import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms & Conditions | DM Genie",
  description: "Review the Terms and Conditions for using DM Genie.",
};

export default function TermsPage() {
  return (
    <div className="px-4 py-12">
      <div className="mx-auto max-w-5xl space-y-6">
        <h1 className="text-4xl font-bold">Terms and Conditions</h1>

        <p className="text-muted-foreground">Last updated: July 21, 2025</p>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">1. Acceptance of Terms</h2>
          <p>
            By accessing or using DM Genie, you agree to be bound by these Terms
            and Conditions. If you do not agree, you may not use our services.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">2. Use of the Service</h2>
          <p>
            You must be at least 13 years old to use DM Genie. You agree not to
            misuse the platform or engage in activities that may harm our
            systems or users.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            3. Account Responsibilities
          </h2>
          <p>
            You are responsible for maintaining the confidentiality of your
            account and password. You agree to notify us immediately of any
            unauthorized use.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">4. Intellectual Property</h2>
          <p>
            All content and features on DM Genie are the property of the
            creators. You may not reproduce or distribute any part of the
            service without permission.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">5. Limitation of Liability</h2>
          <p>
            DM Genie is provided &quot;as is&quot; without warranties. We are not liable
            for any damages resulting from the use of our service.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">6. Termination</h2>
          <p>
            We reserve the right to suspend or terminate your access to the
            service at any time, without notice, for any violation of these
            terms.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">7. Changes to Terms</h2>
          <p>
            We may update these Terms and Conditions from time to time.
            Continued use of the service constitutes acceptance of the new
            terms.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">8. Contact Us</h2>
          <Link href="/contact">Contact Page</Link>
        </section>
      </div>
    </div>
  );
}
