// Root redirect — middleware handles locale detection and redirects to /[locale]/
// This page is only rendered if middleware is bypassed (e.g., direct static export).
import { redirect } from "next/navigation";

export default function RootPage() {
  redirect("/en");
}
