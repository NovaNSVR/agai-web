import { redirect } from "next/navigation";
import { LOCALES } from "@/utils/serverT";

export const generateStaticParams = () => LOCALES.map((locale) => ({ locale }));

export default function LegalIndexPage({ params }: { params: { locale: string } }) {
  redirect(`/${params.locale}/legal/terms`);
}
