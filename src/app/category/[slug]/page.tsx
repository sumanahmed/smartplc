import React from "react";
import CategoryShopPage from "@/components/frontend/shopCategory/CategoryShopPage";

interface PageProps {
  params: { slug: string };
}

export default function Page({ params }: PageProps) {
  return <CategoryShopPage slug={params.slug} />;
}