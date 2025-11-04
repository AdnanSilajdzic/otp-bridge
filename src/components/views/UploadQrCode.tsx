import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import Html5QrcodePlugin from "./Html5QrCodePlugin";

type propsTypes = {
  handleDecode: Function;
  setUrl: Function;
  url: string | null;
};
const UploadQrCode = (props: propsTypes) => {
  return (
    <div className="flex flex-col w-full gap-3">
      <Label htmlFor="picture">QR Code</Label>
      <Html5QrcodePlugin
        fps={10}
        qrbox={250}
        disableFlip={false}
        qrCodeSuccessCallback={(result: string) => {
          props.setUrl(result);
          props.handleDecode(result);
        }}
      />
    </div>
  );
};

export default UploadQrCode;
