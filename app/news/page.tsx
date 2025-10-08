import News from "@/components/News";

export const metadata = {
  title: 'News & Updates - Bayan Medical',
  description: 'Stay updated with the latest news, announcements, and updates from Bayan Medical.',
};

export default function NewsPage() {
  return (
    <div className="news-page mt-6">
      <News />
    </div>
  );
}