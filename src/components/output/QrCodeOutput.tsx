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

  function generateUrl(index: number) {
    return `otpauth://totp/${props.decoded[index].issuer}:${props.decoded[index].name}?secret=${props.decoded[index].secret}&issuer=${props.decoded[index].issuer}&algorithm=${props.decoded[index].algorithm}`;
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
          value={generateUrl(currentIndex)}
          viewBox={`0 0 256 256`}
        />
      </div>
    </div>
  );
};

export default QrCodeOutput;
