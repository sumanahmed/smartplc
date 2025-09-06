import Link from 'next/link';
import { BlogCard } from '@/components/frontend/BlogCard';

const blogPosts = [
  {
    id: '1',
    title: 'Getting Started with Smart PLC Technology',
    excerpt: 'Learn the basics of Smart PLC systems and how they revolutionize industrial automation.',
    author: 'John Smith',
    date: '2024-01-15',
    readTime: '5 min read',
    image: '/slider-images/1.jpeg',
    category: 'Technology'
  },
  {
    id: '2',
    title: 'Industrial Automation Trends 2024',
    excerpt: 'Discover the latest trends shaping the future of industrial automation and smart manufacturing.',
    author: 'Sarah Johnson',
    date: '2024-01-10',
    readTime: '7 min read',
    image: '/slider-images/2.jpeg',
    category: 'Industry'
  },
  {
    id: '3',
    title: 'PLC Programming Best Practices',
    excerpt: 'Essential tips and techniques for writing efficient and maintainable PLC code.',
    author: 'Mike Chen',
    date: '2024-01-05',
    readTime: '6 min read',
    image: '/slider-images/3.jpeg',
    category: 'Programming'
  },
  {
    id: '4',
    title: 'Smart Manufacturing Solutions',
    excerpt: 'How smart PLC systems are transforming modern manufacturing processes.',
    author: 'Emily Davis',
    date: '2024-01-01',
    readTime: '8 min read',
    image: '/slider-images/1.jpeg',
    category: 'Manufacturing'
  },
  {
    id: '5',
    title: 'Troubleshooting Common PLC Issues',
    excerpt: 'A comprehensive guide to diagnosing and fixing common PLC problems.',
    author: 'David Wilson',
    date: '2023-12-28',
    readTime: '4 min read',
    image: '/slider-images/2.jpeg',
    category: 'Troubleshooting'
  },
  {
    id: '6',
    title: 'Future of Industrial IoT',
    excerpt: 'Exploring how the Internet of Things is reshaping industrial automation.',
    author: 'Lisa Brown',
    date: '2023-12-20',
    readTime: '9 min read',
    image: '/slider-images/3.jpeg',
    category: 'IoT'
  }
];

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Blog</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Stay updated with the latest insights, trends, and best practices in industrial automation and smart PLC technology.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
