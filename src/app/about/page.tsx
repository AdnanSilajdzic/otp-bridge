import React from "react";
import Link from "next/link";
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

export default function AboutPage() {
  return (
    <div className="flex flex-col items-center justify-start py-6 px-3 bg-muted min-h-screen">
      <div className="w-full max-w-4xl space-y-8">
        <div className="flex items-center justify-between w-full">
          <Link href="/">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
        </div>
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">
            About OTP Bridge
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A privacy focused tool to liberate your 2FA codes from proprietary
            formats
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Privacy First
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                All processing happens directly in your browser. Your 2FA codes
                never leave your device.
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
                project localy as well.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Universal Compatibility
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Generate standard QR codes that work with any authenticator app,
                giving you the freedom to choose your preferred 2FA solution.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                Convenenience
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Import the codes into this app using either your google OTP
                migration url, scanning a QR code, or uploading an image of the
                migration QR code.
              </p>
            </CardContent>
          </Card>
        </div>

        <Separator />

        <Card>
          <CardHeader>
            <CardTitle>How It Works</CardTitle>
            <CardDescription>
              Simple steps to migrate your 2FA codes
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-6 h-6 rounded-full border border-border text-xs font-medium mt-1">
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
              <div className="flex items-center justify-center w-6 h-6 rounded-full border border-border text-xs font-medium mt-1">
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
              <div className="flex items-center justify-center w-6 h-6 rounded-full border border-border text-xs font-medium mt-1">
                3
              </div>
              <div>
                <h4 className="font-medium">Import to Any Authenticator</h4>
                <p className="text-sm text-muted-foreground">
                  Scan the generated OTP Bridge QR codes with your preferred
                  authenticator app
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5" />
              The Mission
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              I believe in digital freedom and the right to control your own
              data. This project exists to help users break free from vendor
              lock-in and maintain access to their essential security tools
              regardless of which services they choose to use.
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
      </div>
    </div>
  );
}
