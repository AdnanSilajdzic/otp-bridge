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

export default function Home() {
  const [url, setUrl] = useState<string>("");
  const [decoded, setDecoded] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleDecode() {
    let result;
    try {
      result = await parser(url);
    } catch (error) {
      toast.error("" + error);
      return;
    }
    setDecoded(result);
  }

  return (
    <div className="flex flex-col items-center justify-center py-6 bg-muted min-h-screen">
      <Card className="w-full max-w-xl min-h-96 p-7">
        <Tabs defaultValue="url">
          <TabsList className="mb-3">
            <TabsTrigger value="upload">Upload QR Code</TabsTrigger>
            <TabsTrigger value="url">Paste URL</TabsTrigger>
            <TabsTrigger value="scan">Scan QR Code</TabsTrigger>
          </TabsList>

          <TabsContent value="url">
            <PasteUrl url={url} setUrl={setUrl} handleDecode={handleDecode} />
          </TabsContent>
          <TabsContent value="upload">
            <p>Coming soon</p>
          </TabsContent>
          <TabsContent value="scan">
            <p>Coming soon</p>
          </TabsContent>
        </Tabs>

        {decoded && (
          <pre className="text-left w-full mt-5 bg-muted text-primary p-4 rounded overflow-x-auto">
            {JSON.stringify(decoded, null, 2)}
          </pre>
        )}
      </Card>
    </div>
  );
}
