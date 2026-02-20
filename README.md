# OTP BRIDGE - DEGOOGLE YOUR 2FA CODES

A web application that helps you extract the secret key to your 2FA codes from Google Authenticator and migrate them to any other authenticator app.

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

- **Counter component** — uses Cloudflare KV to track total migrations
- **Cloudflare Turnstile** — bot protection on API endpoints
- **History page** — uses Cloudflare D1 database to display migration stats over time

Without these credentials, the above features will simply not work, but QR code decoding and migration will function perfectly.