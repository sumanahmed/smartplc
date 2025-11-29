"use client";

import { useRouter } from "next/navigation";
import { ChevronRight, List } from "lucide-react";

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface BrowseCategoriesPanelProps {
  categories: Category[];
}

const BrowseCategoriesPanel: React.FC<BrowseCategoriesPanelProps> = ({
  categories,
}) => {
  const router = useRouter();

  const goToShopWithCategory = (slug: string) => {
    router.push(`/category/${slug}`);
  };

  return (
    <aside className="hidden lg:block h-full">
      {/* Outer border + rounded – Engineers Shop style */}
      <div className="bg-white border border-[#4CAF50] rounded-md overflow-hidden h-full">
        {/* Green header bar */}
        <div className="flex items-center gap-2 px-4 h-12 bg-[#4CAF50] text-white">
          <span className="inline-flex w-5 h-5 items-center justify-center rounded bg-white/10">
            <List className="w-4 h-4" />
          </span>
          <span className="text-sm font-semibold uppercase tracking-wide">
            Browse Categories
          </span>
        </div>

        {/* Category list  */}
        <ul>
          {categories.length === 0 && (
            <li className="px-4 py-3 text-sm text-gray-400">
              Loading categories...
            </li>
          )}

          {categories.map((category) => (
            <li
              key={category.id}
              className="border-t border-gray-100 first:border-t-0"
            >
              <button
                type="button"
                onClick={() => goToShopWithCategory(category.slug)}
                className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-gray-800 hover:bg-green-50 hover:text-green-700 transition-colors"
              >
                <span className="truncate">{category.name}</span>
                {/* now current arrow icon next time added subcategory value */}
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default BrowseCategoriesPanel;
