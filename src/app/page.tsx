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
import { ArrowLeftIcon, QrCode } from "lucide-react";
import axios from "axios";
import Counter from "@/components/Counter";
import { ModeToggle } from "@/components/ModeToggle";
import { Navigation } from "@/components/Navigation";

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
    <div className="flex flex-col items-center justify-center py-4 px-3 bg-muted min-h-screen">
      <h1 className="text-2xl sm:text-3xl mb-2 font-bold text-center">
        Transfer Google Authenticator Codes to Any App
      </h1>

      <Card className="w-full max-w-2xl mb-3 p-4 mt-4">
        <div className="flex items-center justify-center gap-3">
          <QrCode className="min-w-7 min-h-7 text-primary" />
          <p className="text-center text-sm">
            Input your Google Authenticator QR code to convert it into standard
            QR codes that can be scanned with any 2FA app
          </p>
        </div>
      </Card>

      <Card className="w-full max-w-2xl min-h-96 p-5">
        {!decoded ? (
          <Tabs defaultValue="scan">
            <div className="flex justify-between">
              <TabsList className="mb-3">
                <TabsTrigger value="scan">Scan QR Code</TabsTrigger>
                <TabsTrigger value="url">Paste URL</TabsTrigger>
              </TabsList>
              <ModeToggle />
            </div>

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
                <div className="flex justify-between">
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

                  <ModeToggle />
                </div>
                <p className="text-green-600 mt-1 text-center">
                  URL parsed successfully!
                </p>
              </div>
            )}
            {decoded && <Output decoded={decoded} />}
          </>
        )}
      </Card>
      <div className="mt-3"></div>
      <Counter />

      <div className="mt-3">
        <Navigation />
      </div>
    </div>
  );
}
