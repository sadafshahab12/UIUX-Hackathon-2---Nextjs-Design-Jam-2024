import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "Furniro | Ecommerce Website",
  description: "Ecommerce Website created with next js and tailwind use figma template",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` antialiased`}>
        <Navbar />

        {children}
        <Footer />
      </body>
    </html>
  );
}
