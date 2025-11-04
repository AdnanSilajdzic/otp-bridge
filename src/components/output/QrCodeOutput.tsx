import { decodedJson } from "@/types/types";
import React, { useState } from "react";
import QRCode from "react-qr-code";
import { ButtonGroup } from "../ui/button-group";
import { Button } from "../ui/button";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

type propsTypes = {
  decoded: decodedJson[];
};
const QrCodeOutput = (props: propsTypes) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  function generateUrl(code: decodedJson) {
    return `otpauth://totp/${code.issuer}:${code.name}?secret=${code.secret}&issuer=${code.issuer}&algorithm=${code.algorithm}`;
  }

  return (
    <div>
      <p className="text-center mb-2">
        This code contains {props.decoded.length} totp codes. Please scan each
        qr code individually with your 2FA app.
      </p>

      <div className="w-full flex justify-center mb-3">
        <ButtonGroup>
          <Button
            variant={"outline"}
            onClick={() => {
              if (currentIndex === 0) {
                setCurrentIndex(props.decoded.length - 1);
              } else setCurrentIndex(currentIndex - 1);
            }}
          >
            <ArrowLeftIcon />
          </Button>
          <Button
            variant={"outline"}
            onClick={() => {
              if (currentIndex === props.decoded.length - 1) {
                setCurrentIndex(0);
              } else setCurrentIndex(currentIndex + 1);
            }}
          >
            <ArrowRightIcon />
          </Button>
        </ButtonGroup>
      </div>

      <p className="text-center mb-3">
        {currentIndex + 1} / {props.decoded.length}
      </p>

      <div
        style={{
          height: "auto",
          margin: "0 auto",
          width: "70%",
        }}
      >
        <QRCode
          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          value={generateUrl(props.decoded[currentIndex])}
          viewBox={`0 0 256 256`}
        />
      </div>

      <p className="text-center font-semibold">
        Secret: {props.decoded[currentIndex].secret}
      </p>
      <p className="text-center font-semibold">
        {props.decoded[currentIndex].issuer}
      </p>
      <p className="text-center font-semibold">
        {props.decoded[currentIndex].name}
      </p>
    </div>
  );
};

export default QrCodeOutput;
