import React, { useRef } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import Html5QrcodePlugin from "./Html5QrCodePlugin";

type propsTypes = {
  handleDecode: Function;
  setUrl: Function;
  url: string | null;
};
const UploadQrCode = (props: propsTypes) => {
  const lastExecutionRef = useRef(0);
  const THROTTLE_MS = 600;

  const onQrSuccess = (result: string) => {
    const now = Date.now();
    if (now - lastExecutionRef.current < THROTTLE_MS) {
      return; // ignore rapid repeats
    }

    lastExecutionRef.current = now;

    props.setUrl(result);
    props.handleDecode(result);
  };

  return (
    <div className="flex flex-col w-full gap-3">
      <Label htmlFor="picture">QR Code</Label>
      <Html5QrcodePlugin
        fps={10}
        qrbox={250}
        disableFlip={false}
        qrCodeSuccessCallback={(result: string) => {
          onQrSuccess(result);
        }}
      />
    </div>
  );
};

export default UploadQrCode;
