import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/providers/app-provider";
export const metadata: Metadata = { title: "Pizza Admin", description: "Pizza Delivery Platform administration" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en" suppressHydrationWarning><body><AppProvider>{children}</AppProvider></body></html>; }
