import React from "react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About OTP Bridge - OTP Format Converter",
  description:
    "Learn how OTP Bridge converts supported OTP exports into standard TOTP QR codes. Open source, with OTP processing in your browser.",
  keywords:
    "otp bridge about, otp format conversion, totp qr codes, authenticator compatibility, open source",
  openGraph: {
    title: "About OTP Bridge - OTP Format Converter",
    description:
      "Learn how OTP Bridge helps you use supported OTP exports with compatible authenticator apps.",
  },
};
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Shield,
  Lock,
  Globe,
  Code,
  Heart,
  Users,
  ArrowLeft,
} from "lucide-react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Navigation } from "@/components/Navigation";

export default function AboutPage() {
  return (
    <div className="flex flex-col items-center justify-start py-6 px-3 bg-muted min-h-screen">
      <div className="w-full max-w-4xl space-y-8">
        <div className="flex items-center justify-between w-full">
          <Breadcrumb
            items={[{ name: "Home", href: "/" }, { name: "About" }]}
          />
        </div>
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">
            About OTP Bridge
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A browser-based tool for converting OTP exports into standard QR
            codes for compatible authenticator apps
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Local Processing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                OTP decoding and QR code generation happen directly in your
                browser. Your account secrets are processed on your device.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Open Source
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                The code is completely free and open source. You can review and
                contribute to the project on GitHub. Feel free to run the
                project locally as well.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Format Compatibility
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Generate QR codes in the standard TOTP format for authenticator
                apps that support your account settings.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                Flexible Input
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Provide a supported OTP export by pasting its URL, scanning a QR
                code, or uploading an image of the export QR code.
              </p>
            </CardContent>
          </Card>
        </div>

        <Separator />

        <Card>
          <CardHeader>
            <CardTitle>How It Works</CardTitle>
            <CardDescription>
              Simple steps to convert your OTP export
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex items-center aspect-square justify-center w-6 h-6 rounded-full border border-border text-xs font-medium mt-1">
                1
              </div>
              <div>
                <h4 className="font-medium">
                  Export from Google Authenticator
                </h4>
                <p className="text-sm text-muted-foreground">
                  Use Google Authenticator's export feature to get a migration
                  QR code
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex items-center aspect-square justify-center w-6 h-6 rounded-full border border-border text-xs font-medium mt-1">
                2
              </div>
              <div>
                <h4 className="font-medium">Upload or Paste</h4>
                <p className="text-sm text-muted-foreground">
                  Scan the QR code with the scanner on the website or upload a
                  picture of the QR code. You can even scan the QR code with
                  another app and just enter the URL output
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex items-center aspect-square justify-center w-6 h-6 rounded-full border border-border text-xs font-medium mt-1">
                3
              </div>
              <div>
                <h4 className="font-medium">Import to a Compatible Authenticator</h4>
                <p className="text-sm text-muted-foreground">
                  Scan the generated OTP Bridge QR codes with your preferred
                  authenticator app that supports your account's TOTP settings
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5" />
              Project Purpose
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Authenticator apps can use different export and import formats.
              OTP Bridge helps connect these formats by converting supported OTP
              exports into standard TOTP QR codes and readable account data.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Contributing
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              This is a community-driven project. I welcome bug reports and
              feature requests. Visit my GitHub repository to get involved and
              help make 2FA more accessible for everyone.
            </p>
          </CardContent>
        </Card>
        <div className="pt-6 border-t border-border w-full">
          <Navigation />
        </div>
      </div>
    </div>
  );
}
