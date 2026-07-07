import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/marketing/Header";
import { Footer } from "@/components/marketing/Footer";
import { CartDrawer } from "@/components/shop/CartDrawer";

export const metadata: Metadata = {
  title: {
    default: "Kavala — Botanical Oral Ritual Oil",
    template: "%s · Kavala",
  },
  description:
    "A botanical oral-care concentrate made after the classical Irimedadi formula. One quiet minute, morning or night. Freshens breath as part of your daily oral-care routine.",
  metadataBase: new URL("https://kavala.example.com"),
  openGraph: {
    siteName: "Kavala",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:opsz,wght@6..96,400;6..96,500;6..96,600&family=Instrument+Sans:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-bone focus:px-4 focus:py-2 focus:text-ink">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <CartDrawer />
      </body>
    </html>
  );
}
