import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Forum App",
  description: "A fullstack forum application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}