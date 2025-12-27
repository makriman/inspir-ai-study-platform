import ImageFallback from "@/helpers/ImageFallback";
import dateFormat from "@/lib/utils/dateFormat";
import Link from "next/link";
import { FaRegFolder, FaRegUserCircle } from "react-icons/fa";

interface BlogCardProps {
  data: {
    id?: number
    title: string
    slug: string
    excerpt?: string
    featured_image?: string
    published_at?: string
    author?: {
      name: string
      avatar_url?: string
    }
    category?: {
      name: string
      slug: string
      color?: string
    }
  }
}

const BlogCard = ({ data }: BlogCardProps) => {
  return (
    <div className="bg-body dark:bg-darkmode-body">
      {data.featured_image && (
        <ImageFallback
          className="mb-6 w-full rounded"
          src={data.featured_image}
          alt={data.title}
          width={445}
          height={230}
        />
      )}
      <h4 className="mb-3">
        <Link href={`/blog/${data.slug}`}>{data.title}</Link>
      </h4>
      <ul className="mb-4">
        {data.author && (
          <li className="mr-4 inline-block">
            <FaRegUserCircle className="-mt-1 mr-2 inline-block" />
            {data.author.name}
          </li>
        )}
        {data.category && (
          <li className="mr-4 inline-block">
            <FaRegFolder className="-mt-1 mr-2 inline-block" />
            <Link href={`/blog/category/${data.category.slug}`}>
              {data.category.name}
            </Link>
          </li>
        )}
        {data.published_at && (
          <li className="inline-block">{dateFormat(data.published_at)}</li>
        )}
      </ul>
      {data.excerpt && (
        <p className="mb-6">{data.excerpt}</p>
      )}
      <Link
        className="btn btn-outline-primary btn-sm"
        href={`/blog/${data.slug}`}
      >
        read more
      </Link>
    </div>
  );
};

export default BlogCard;
