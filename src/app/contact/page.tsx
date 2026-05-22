import FeatureFlagGate from "@/components/FeatureFlagGate";
import ContactSkeleton from "@/components/ContactSkeleton";
import ContactPageClient, { ContactOfflineFallback } from "./ContactPageClient";

export const unstable_instant = false;

export default function ContactPage() {
  return (
    <FeatureFlagGate
      flagName="contact_form_active"
      defaultValue={true} // Default to active for user experience
      skeleton={<ContactSkeleton />}
      fallback={<ContactOfflineFallback />}
    >
      <ContactPageClient />
    </FeatureFlagGate>
  );
}
