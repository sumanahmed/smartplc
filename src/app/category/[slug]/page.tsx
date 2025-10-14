
'use client'
import { use } from 'react';
import CategoryShopPage from "@/components/frontend/shopCategory/CategoryShopPage";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function Page({ params }: PageProps) {
  const { slug } = use(params);
  
  return <CategoryShopPage slug={slug} />;
}
