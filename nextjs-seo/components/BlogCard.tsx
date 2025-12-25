import Link from 'next/link';
import Image from 'next/image';
import { FaRegClock, FaRegFolder, FaRegUser } from 'react-icons/fa';
import dateFormat from '@/lib/utils/dateFormat';

interface BlogCardProps {
  title: string;
  slug: string;
  excerpt: string;
  image?: string;
  author: string;
  category: string;
  publishedAt: string;
  readTime?: number;
}

export default function BlogCard({
  title,
  slug,
  excerpt,
  image,
  author,
  category,
  publishedAt,
  readTime = 5
}: BlogCardProps) {
  return (
    <div className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
      {image && (
        <Link href={`/blog/${slug}`} className="block overflow-hidden">
          <div className="relative h-56 w-full">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </Link>
      )}

      <div className="p-6">
        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
          <Link
            href={`/blog/category/${category}`}
            className="flex items-center gap-1.5 hover:text-inspir-purple transition-colors"
          >
            <FaRegFolder className="text-inspir-purple" />
            <span>{category}</span>
          </Link>
          <span className="flex items-center gap-1.5">
            <FaRegClock />
            {readTime} min read
          </span>
        </div>

        {/* Title */}
        <Link href={`/blog/${slug}`}>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-inspir-purple transition-colors line-clamp-2">
            {title}
          </h3>
        </Link>

        {/* Excerpt */}
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {excerpt}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
          <span className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <FaRegUser className="text-inspir-purple" />
            {author}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-500">
            {dateFormat(publishedAt)}
          </span>
        </div>
      </div>
    </div>
  );
}
