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
    "Browser-based tool to convert supported OTP exports into standard TOTP QR codes for compatible authenticator apps",
  url: "https://otpbridge.org",
  applicationCategory: "SecurityApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  featureList: [
    "Decode supported OTP export data",
    "Generate standard TOTP QR codes",
    "Browser-based OTP processing",
    "Display decoded account data as JSON",
    "Open source",
    "Works with compatible TOTP authenticator apps",
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
  icons: { icon: "/favicon.svg" },
  title:
    "OTP Bridge - OTP Format Converter",
  description:
    "Convert supported OTP exports into standard TOTP QR codes for compatible authenticator apps. Open source, with OTP processing in your browser.",
  keywords:
    "otp format converter, otp export, totp qr codes, authenticator compatibility, 2fa account transfer",
  authors: [{ name: "Adnan Silajdzic" }],
  creator: "Adnan Silajdzic",
  publisher: "Adnan Silajdzic",
  robots: "index, follow",
  openGraph: {
    title: "OTP Bridge - OTP Format Converter",
    description:
      "Convert supported OTP exports into standard TOTP QR codes for compatible authenticator apps, with OTP processing in your browser.",
    url: "https://otpbridge.org",
    siteName: "OTP Bridge",
    images: [
      {
        url: "https://otpbridge.org/og-image.png",
        alt: "OTP Bridge - OTP Format Converter",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OTP Bridge - OTP Format Converter",
    description:
      "Convert supported OTP exports into standard TOTP QR codes for compatible authenticator apps, with OTP processing in your browser.",
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
