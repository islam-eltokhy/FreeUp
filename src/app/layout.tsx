import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Fraunces, Great_Vibes, Montserrat } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/context/StoreContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { Toaster } from "@/components/Toaster";

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "variable",
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT"],
});

const logo = Montserrat({
  variable: "--font-logo",
  subsets: ["latin"],
  weight: ["800"],
});

const script = Great_Vibes({
  variable: "--font-script",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: {
    default: "Vibes Outlet — Where fashion sets the mood",
    template: "%s · Vibes Outlet",
  },
  description:
    "Women’s fashion outlet in Hadayek October: this season’s jackets, dresses, denim and jewellery at outlet prices. Delivery across Egypt, cash on delivery available.",
  openGraph: {
    title: "Vibes Outlet",
    description: "Boutique pieces, outlet prices. Delivery across Egypt or visit us at Zoweil Plaza Mall.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} ${display.variable} ${script.variable} ${logo.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <StoreProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
          <Toaster />
        </StoreProvider>
      </body>
    </html>
  );
}
