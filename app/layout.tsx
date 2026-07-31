import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider"; // 👈 Your exact file location
import "./globals.css";

export const metadata: Metadata = {
  title: "RentNest - Property Management System",
  description: "Find your next home easily",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {/* The hotkey script initializes inside this provider safely */}
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
