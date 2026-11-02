import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bernadette Borromeo-Macatangay — Business Analytics Portfolio",
  description:
    "Marketing operations professional with 10+ years in social listening and digital analytics, currently pursuing a Master's in Business Analytics at Mapúa University. Featured projects: grocery sales forecasting (3M+ observations, LightGBM, SHAP) and airline delay rate forecasting (ETS, rolling-origin validation).",
  keywords: [
    "Business Analytics",
    "Marketing Operations",
    "Social Listening",
    "Sprinklr",
    "Data Analyst",
    "BI Analyst",
    "Consultant",
    "Time Series Forecasting",
    "LightGBM",
    "SHAP",
    "Python",
    "Mapúa University",
  ],
  authors: [{ name: "Bernadette Borromeo-Macatangay" }],
  openGraph: {
    title: "Bernadette Borromeo-Macatangay — Business Analytics Portfolio",
    description:
      "10+ years marketing operations + Master's in Business Analytics at Mapúa University. Forecasting, EDA, machine learning, and BI storytelling.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
