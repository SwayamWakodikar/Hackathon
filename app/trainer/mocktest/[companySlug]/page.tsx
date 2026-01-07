import MockTestPage from "@/components/Pages/MockTest";

interface PageProps {
  params: Promise<{ companySlug: string }>;
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  const companySlug = resolvedParams.companySlug?.toLowerCase() ?? "";

  return <MockTestPage companySlug={companySlug} />;
}
