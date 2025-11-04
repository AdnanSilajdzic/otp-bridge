import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import QrCodeOutput from "./QrCodeOutput";
import { decodedJson } from "@/types/types";

type propsTypes = {
  decoded: decodedJson[];
};

const Output = (props: propsTypes) => {
  return (
    <>
      <Tabs defaultValue="qr">
        <TabsList className="mb-3">
          <TabsTrigger value="qr">QR codes</TabsTrigger>
          <TabsTrigger value="json">json</TabsTrigger>
        </TabsList>

        <TabsContent value="qr">
          <QrCodeOutput decoded={props.decoded} />
        </TabsContent>
        <TabsContent value="json">
          <pre className="text-left w-full mt-5 bg-muted text-primary p-4 rounded overflow-x-auto">
            {JSON.stringify(props.decoded, null, 2)}
          </pre>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default Output;
