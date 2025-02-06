import "../styles/globals.css";
import { ReactNode } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ServiceWorker from "../components/ServiceWorker"; // Import the service worker component

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <link rel="manifest" href="/manifest.json" />
      <link rel="icon" href="/assets/icons/icon.png" />
      <body>
        <ServiceWorker /> {/* Register the Service Worker */}
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
