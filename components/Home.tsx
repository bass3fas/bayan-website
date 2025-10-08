import NewsBar from './NewsBar';

export default function Home() {
  return (
    <div className="mb-0" id="home">
      <section className="hero-section relative">
        <video className="hero-video w-full h-screen object-cover" autoPlay loop muted>
          <source src="/assets/videos/bayan-hero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Transparent Rectangle with Text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-gray-900 bg-opacity-5 p-8 rounded-lg flex flex-col items-center">
            <h2 className="text-xl lg:text-2xl font-bold text-white mb-2">Welcome to</h2>
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-8">
              Bayan Medical Company
            </h1>
            <h3 className="text-lg lg:text-xl text-sky-200 font-bold mb-6">
              Transforming healthcare with state-of-the-art Medical Solutions
            </h3>
            
            {/* Button Container */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#contact"
                className="px-6 py-3 text-sky-900 bg-white font-bold rounded-lg hover:bg-sky-200 transition duration-300"
              >
                Get in Touch
              </a>
              <a
                href="/news"
                className="px-6 py-3 text-white bg-sky-900 font-bold rounded-lg hover:bg-sky-800 transition duration-300 "
              >
                Latest News
              </a>
            </div>
          </div>
        </div>

        {/* Sliding News Bar - Positioned at bottom */}
        <div className="absolute bottom-0 left-0 right-0 z-30 mb-20">
          <NewsBar />
        </div>
      </section>
    </div>
  );
}