# OTP Bridge - OTP Format Converter

A browser-based tool that decodes Protocol Buffer-encoded OTP exports into standard `otpauth://totp/` QR codes for use with compatible authenticator applications.

Visit the live application at [otpbridge.org](https://otpbridge.org).

## How to Use

Provide an OTP export in the supported `otpauth-migration://offline?data=...` format, such as an export from Google Authenticator, using one of these methods:

1. **Scan QR Code**: Scan the export QR code or upload an image containing it.
2. **Paste URL**: Paste the export URL directly.

Once processed, the application will:

- Decode the OTP account data from the Protocol Buffer payload.
- Generate individual QR codes using the standard `otpauth://totp/` URI format.
- Display the decoded data in JSON format for inspection or manual import.
- Let you scan the generated QR codes with an authenticator app that supports the account's TOTP settings.

## Format Compatibility

Authenticator applications can use different formats for exporting and importing account data. OTP Bridge makes supported OTP exports easier to use across applications by:

- Decoding Protocol Buffer-encoded account data.
- Converting TOTP account details into widely supported QR codes.
- Making account secrets and settings available in a readable format.
- Performing OTP decoding and QR code generation in your browser.

## How to Run Locally

You must have [Git](https://git-scm.com/downloads), [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/get-npm) installed.

```bash
# download the repo
git clone https://github.com/AdnanSilajdzic/otp-bridge.git
# enter the folder it created
cd otp-bridge
# copy the .env.example to a .env file
cp .env.example .env
# install dependencies
npm install
# run
npm run dev
```

The application will be available in your browser at http://localhost:3000. The core functionality (decoding QR codes and extracting 2FA secrets) works fully offline with no configuration needed.

That's it.

Running locally will never connect to any hosted instance of OTP Bridge. Some features require valid Cloudflare credentials in your `.env` and `wrangler.jsonc` file to function:

- **Counter component** — uses Cloudflare KV to track total conversions
- **Cloudflare Turnstile** — bot protection on API endpoints
- **History page** — uses Cloudflare D1 database to display conversion statistics over time

Without these credentials, the above features will simply not work, but QR code decoding and format conversion will function normally.
