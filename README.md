# OTP BRIDGE - DEGOOGLE YOUR 2FA CODES

A web application that helps you extract your 2FA codes from Google Authenticator and migrate them to any other authenticator app.

Visit the live application at [otpbridge.org](https://otpbridge.org)

## How to Use

This application allows you to extract your 2FA codes from Google Authenticator in two ways:

1. **Scan QR Code**: Upload an image of your Google Authenticator migration QR code
2. **Paste URL**: Directly paste the migration URL from Google Authenticator

Once processed, the application will:

- Extract all your 2FA accounts from the migration data
- Generate individual QR codes for each account
- Display the data in JSON format for manual import
- Allow you to scan these new QR codes with any authenticator app of your choice

## Why This Software Was Created

Many users want to move away from Google's ecosystem but find it difficult to migrate their 2FA codes. Google Authenticator doesn't provide an easy way to export codes in a standard format that other authenticator apps can import.

This tool solves that problem by:

- Decoding Google's proprietary migration format
- Converting it to standard QR codes that work with any authenticator app
- Providing a simple, privacy-focused way to migrate your 2FA codes
- Working entirely in your browser - no data is sent to any server

## How to Run Locally

To run this application locally:

```bash
npm install
npm run dev
```

The application will be available at http://localhost:3000. That's it!

The counter component will not work by default since it requires cloudflare KV credentials. You can read about how to get started with [cloudflare kv here](https://developers.cloudflare.com/kv/).
You can check which credentials you need by checking .env.example.

The application runs entirely in the browser and doesn't require any backend services or API keys.
