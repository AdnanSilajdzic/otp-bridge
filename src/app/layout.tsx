import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/ThemeProvider";
import { GitHubBanner } from "@/components/GitHubBanner";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "OTP Bridge",
  description:
    "Browser-based tool to export and migrate 2FA codes from Google Authenticator to any authenticator app",
  url: "https://otpbridge.org",
  applicationCategory: "SecurityApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  featureList: [
    "Export Google Authenticator codes",
    "Transfer 2FA accounts between apps",
    "Browser-based processing",
    "Privacy-focused (no server processing)",
    "Open source",
    "Works with any authenticator app",
  ],
  author: {
    "@type": "Organization",
    name: "OTP Bridge",
  },
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title:
    "OTP Bridge - Transfer Google Authenticator to Any App | 2FA Migration Tool",
  description:
    "Easily export and migrate 2FA codes from Google Authenticator to any authenticator app. Browser-based tool for transferring 2FA accounts without app installation. Privacy-focused & open source.",
  keywords:
    "google authenticator export, transfer 2fa codes, migrate google authenticator, 2fa backup, degoogling 2fa, authenticator migration tool",
  authors: [{ name: "Adnan Silajdzic" }],
  creator: "Adnan Silajdzic",
  publisher: "Adnan Silajdzic",
  robots: "index, follow",
  openGraph: {
    title: "OTP Bridge - Transfer Google Authenticator to Any App",
    description:
      "Easily export and migrate 2FA codes from Google Authenticator to any authenticator app. Browser-based tool for transferring 2FA accounts.",
    url: "https://otpbridge.org",
    siteName: "OTP Bridge",
    images: [
      {
        url: "https://otpbridge.org/og-image.png",
        alt: "OTP Bridge - 2FA Migration Tool",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OTP Bridge - Transfer Google Authenticator to Any App",
    description:
      "Easily export and migrate 2FA codes from Google Authenticator to any authenticator app. Browser-based tool for transferring 2FA accounts.",
    images: ["https://otpbridge.org/twitter-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <meta name="apple-mobile-web-app-title" content="OTP Bridge" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-muted`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <GitHubBanner />
          <Toaster position="top-right" />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
