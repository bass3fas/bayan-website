import "../styles/globals.css";
import { ReactNode, Suspense } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ServiceWorker from "../components/ServiceWorker";

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/assets/icons/icon.png" />
      </head>
      <body>
        <ServiceWorker />
        
        {/* 🏎️ Load Header Fast */}
        <Suspense fallback={<div className="loading-header">Loading...</div>}>
          <Header />
        </Suspense>
        
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
