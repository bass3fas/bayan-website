"use client";
import "../styles/globals.css";
import { ReactNode, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/service-worker.js')
          .then((registration) => {
            console.log('Service Worker registered:', registration);
          })
          .catch((error) => {
            console.log('Service Worker registration failed:', error);
          });
      });
    }
  }, []);

  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;