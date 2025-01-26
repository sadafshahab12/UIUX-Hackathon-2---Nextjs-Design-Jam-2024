import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Poppins } from "next/font/google";
import { ProductProvider } from "./components/context/ProductContext";

const poppins = Poppins({
  weight: ["400", "700"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Furniro | Ecommerce Website",
  description:
    "Ecommerce Website created with next js and tailwind use figma template",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` ${poppins.className} antialiased`}>
        <ProductProvider>
          <Navbar />
          {children}
          <Footer />
        </ProductProvider>
      </body>
    </html>
  );
}
