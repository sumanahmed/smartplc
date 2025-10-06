"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { fetchAvailableCategories, Category } from "@/lib/homeApi";

const Footer: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const cats = await fetchAvailableCategories();
        setCategories(cats);
      } catch (err) {
        console.error("Failed to fetch footer categories", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <footer className="bg-gray-800 text-white py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Shop Links (dynamic categories) */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Shop</h3>
          <ul className="space-y-2">
            {/* Static Home link */}
            {/* <li>
              <Link href="/" className="hover:text-blue-400 transition">Home</Link>
            </li> */}

            {/* Dynamic categories */}
            {loading ? (
              <li className="text-sm text-gray-300"></li>
            ) : categories.length === 0 ? (
              <li className="text-sm text-gray-300">No categories</li>
            ) : (
              categories.map((cat) => (
                <li key={cat.id}>
                  {/* <Link
                    href={`/category/${cat.slug}`}
                    className="hover:text-blue-400 transition text-sm"
                  >
                    {cat.name}
                    {{cat.products_count ? `(${cat.products_count})` : ""}}
                  </Link> */}
                  <Link href={`/category/${cat.slug}`}>{cat.name}</Link>
                </li>
              ))
            )}
          </ul>
        </div>

        {/* Keep other footer columns as before */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
          <ul className="space-y-2">
            <li><Link href="/contact" className="hover:text-blue-400 transition">Contact Us</Link></li>
            <li><Link href="/faq" className="hover:text-blue-400 transition">FAQ</Link></li>
            <li><Link href="/returns" className="hover:text-blue-400 transition">Returns & Refunds</Link></li>
            <li><Link href="/shipping" className="hover:text-blue-400 transition">Shipping Info</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Contact</h3>
          <p className="mb-2">Email: smartplcbd@gmail.com</p>
          <p className="mb-2">Phone: +880 1810 447906</p>
          <p className="mb-2">Address: Ko-27/A Rosulbag, Mohakhali, Dhaka-1212</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
          <p className="mb-4">Subscribe to get the latest offers and updates.</p>
          <form className="flex flex-col space-y-2">
            <input type="email" placeholder="Enter your email" className="p-2 rounded-md text-gray-800" required />
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md transition">Subscribe</button>
          </form>
        </div>
      </div>

      <div className="mt-8 border-t border-gray-700 pt-6 text-center">
        <p>&copy; {new Date().getFullYear()} NextGen IT Park. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
