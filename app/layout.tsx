import type { Metadata } from "next";
import "./globals.css";
import NextUIProvider from "./NextUIProvider";

export const metadata: Metadata = {
  title: "Ess next-proto",
  description: "Ess next-proto",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="dark text-foreground bg-background h-screen w-screen">
        <NextUIProvider>{children}</NextUIProvider>
      </body>
    </html>
  );
}
