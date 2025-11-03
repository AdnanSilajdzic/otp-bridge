import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

type propsTypes = {
  handleDecode: Function;
  setUrl: Function;
  url: string;
};

const PasteUrl = (props: propsTypes) => {
  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor="url" className="mb-2">
        Enter your Google OTP migration url
      </Label>
      <Input
        id="url"
        placeholder="otpauth-migration://offline?data=ABCXYZ123%ABC..."
        type="text"
        value={props.url}
        onChange={(e) => props.setUrl(e.target.value)}
      />
      <Button
        variant={"outline"}
        size={"lg"}
        onClick={() => props.handleDecode()}
      >
        Degoogle
      </Button>
    </div>
  );
};

export default PasteUrl;
