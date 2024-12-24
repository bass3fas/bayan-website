export default function Home() {
  return (
    <div className="main-content mb-4">
      <section className="hero-section">
        <video className="hero-video" autoPlay loop muted>
          <source src="/assets/videos/Home.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="hero-content bg-gray-700 bg-opacity-70 p-6 rounded-lg">
          <h1>Welcome to Bayan Medical</h1>
          <p className="text-sm">Dedicated to maintaining the highest standards of integrity.</p>
        </div>
      </section>
    </div>
  );
}