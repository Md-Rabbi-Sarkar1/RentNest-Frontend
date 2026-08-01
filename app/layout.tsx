import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider"; 
import { Toaster } from "sonner";
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
        <ThemeProvider>
          {children}
         
          <Toaster position="top-right" richColors closeButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
