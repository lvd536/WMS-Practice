import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import { Geist, Geist_Mono } from "next/font/google";
import { ViewTransitions } from "next-view-transitions";
import "./globals.css";
import { AuthProvider } from "@/components/AuthProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "WMS App",
    description: "WMS Manager for warehouses",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ViewTransitions>
            <html
                lang="en"
                className={`${geistSans.variable} ${geistMono.variable} ${geistSans.className} h-full antialiased`}
            >
                <body>
                    <ThemeProvider>
                        <TooltipProvider>
                            <main className="min-h-full flex items-center flex-col container mx-auto">
                                <AuthProvider>{children}</AuthProvider>
                            </main>
                        </TooltipProvider>
                    </ThemeProvider>

                    <Toaster />
                </body>
            </html>
        </ViewTransitions>
    );
}
