//@ts-nocheck
const path = require("path");
const protobuf = require("protobufjs");
const { base32 } = require("rfc4648");

const ALGORITHM = {
  0: "unspecified",
  1: "sha1",
  2: "sha256",
  3: "sha512",
  4: "md5",
};

const DIGIT_COUNT = {
  0: "unspecified",
  1: 6,
  2: 8,
};

const OTP_TYPE = {
  0: "unspecified",
  1: "hotp",
  2: "totp",
};

const protobufPromise = (protoFilePath) => {
  return new Promise((resolve, reject) => {
    protobuf.load("/otpauth-migration.proto", (err, root) => {
      if (err) {
        return reject(err);
      }
      return resolve(root);
    });
  });
};

const parser = async (sourceUrl) => {
  if (typeof sourceUrl !== "string") {
    throw new Error("source url must be a string");
  }

  if (sourceUrl.indexOf("otpauth-migration://offline") !== 0) {
    throw new Error(
      "source url must be begun with otpauth-migration://offline"
    );
  }

  const sourceData = new URL(sourceUrl).searchParams.get("data");

  if (!sourceData) {
    throw new Error("source url doesn't contain otpauth data");
  }

  const protobufRoot = await protobufPromise(
    path.join(__dirname, "otpauth-migration.proto")
  );

  const migrationPayload = protobufRoot.lookupType("MigrationPayload");
  const decodedOtpPayload = migrationPayload.decode(
    Buffer.from(sourceData, "base64")
  );

  const otpParameters = [];
  for (let otpParameter of decodedOtpPayload.otpParameters) {
    otpParameters.push({
      secret: base32.stringify(otpParameter.secret),
      name: otpParameter.name,
      issuer: otpParameter.issuer,
      algorithm: ALGORITHM[otpParameter.algorithm],
      digits: DIGIT_COUNT[otpParameter.digits],
      type: OTP_TYPE[otpParameter.type],
      counter: otpParameter.counter,
    });
  }

  return otpParameters;
};

export default parser;
