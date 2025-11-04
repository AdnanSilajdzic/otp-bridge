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

export default function Home() {
  const [url, setUrl] = useState<string>("");
  const [decoded, setDecoded] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

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
    }
    setDecoded(result);
  }

  return (
    <div className="flex flex-col items-center justify-center pb-6 px-3 bg-muted min-h-screen">
      <h1 className="text-3xl mb-6 -mt-12">Degoogle your 2FA codes</h1>
      <h3 className="w-full max-w-2xl mb-6 text-center">
        Upload an image of your google authenticator migration qr code or paste
        the url. For each totp code, a qr code will be generated which can be
        scanned by any 2FA app!
      </h3>
      <Card className="w-full max-w-xl min-h-96 p-7">
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
        {decoded && (
          <p className="text-green-600 -mt-3 text-center">
            URL parsed successfully!
          </p>
        )}

        {decoded && <Output decoded={decoded} />}
      </Card>
    </div>
  );
}
