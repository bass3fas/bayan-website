import { NewsDetailProps } from "@/interfaces";

export default function NewsDetail({ params }: NewsDetailProps) {
  // Fetch news item by slug
  return (
    <div className="news-detail mt-6">
      <h1>News Article: {params.slug}</h1>
      {/* News detail content */}
    </div>
  );
}