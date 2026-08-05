import { buildPageMetadata } from "@/utils/seo";
import SignupClient from "./SignupClient";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  return buildPageMetadata(locale, "signup");
}

export default function SignupPage() {
  return <SignupClient />;
}
