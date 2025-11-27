"use client";
import { useState } from "react";
import parser from "@/helpers/parser";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import PasteUrl from "@/components/views/PasteUrl";
import { Card } from "@/components/ui/card";
import Output from "@/components/output/Output";
import UploadQrCode from "@/components/views/UploadQrCode";
import { ArrowLeftIcon, InfoIcon } from "lucide-react";
import axios from "axios";
import Counter from "@/components/Counter";

export default function Home() {
  const [url, setUrl] = useState<string>("");
  const [decoded, setDecoded] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  async function updateCounter(number: number) {
    axios
      .post("/api/update-counter", {
        counter: number,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Failed to update global counter");
      });
  }

  async function handleDecode(urlString = null as string | null) {
    let result;
    try {
      result = await parser(urlString ?? url);
    } catch (error) {
      toast.error("" + error);
      return;
    }
    if (result) {
      toast.success("2FA Codes successfully degoogled.");
      updateCounter(result.length);
    }
    setDecoded(result);
  }

  return (
    <div className="flex  flex-col items-center justify-center py-6 px-3 bg-muted min-h-screen">
      <h1 className="sm:text-4xl text-3xl mb-6 font-bold text-center">
        Transfer Google Authenticator to Any App
      </h1>
      <h3 className="w-full max-w-2xl mb-6 text-center ">
        Export your 2FA codes from Google Authenticator in seconds. Upload
        migration QR code or paste the URL, and we'll generate individual QR
        codes that work with Authy, Aegis, 2FAS, or any other 2FA app and
        password manager. No app installation required - works entirely in your
        browser.
      </h3>
      <Card className="w-full max-w-xl min-h-96 p-7">
        {!decoded ? (
          <Tabs defaultValue="scan">
            <TabsList className="mb-3">
              <TabsTrigger value="scan">Scan QR Code</TabsTrigger>
              <TabsTrigger value="url">Paste URL</TabsTrigger>
            </TabsList>

            <TabsContent value="url">
              <PasteUrl url={url} setUrl={setUrl} handleDecode={handleDecode} />
            </TabsContent>
            <TabsContent value="scan">
              <UploadQrCode
                url={url}
                setUrl={setUrl}
                handleDecode={handleDecode}
              />
            </TabsContent>
          </Tabs>
        ) : (
          <>
            {decoded && (
              <div className="flex flex-col w-full">
                <Button
                  onClick={() => {
                    setDecoded(null);
                  }}
                  variant={"outline"}
                  className="w-24"
                >
                  <ArrowLeftIcon />
                  Back
                </Button>
                <p className="text-green-600 mt-1 text-center">
                  URL parsed successfully!
                </p>
              </div>
            )}
            {decoded && <Output decoded={decoded} />}
          </>
        )}
      </Card>
      <div className="mt-6"></div>
      <Counter />

      <div className="mt-3 flex justify-center gap-6 w-full max-w-xl flex-wrap">
        <a
          href="/guide"
          className="flex items-center gap-2 text-muted-foreground transition-all duration-300 hover:text-foreground"
        >
          Guide
        </a>
        <a
          href="/about"
          className="flex items-center gap-2 text-muted-foreground transition-all duration-300 hover:text-foreground"
        >
          <InfoIcon className="w-4 h-4" />
          About
        </a>
        <a href="https://github.com/AdnanSilajdzic/otp-bridge" target="_blank">
          <img
            src="/github.svg"
            alt="View OTP Bridge source code on GitHub"
            className="w-7 h-7 opacity-70 hover:opacity-100 transition-all duration-300 cursor-pointer"
          />
        </a>
      </div>
    </div>
  );
}
