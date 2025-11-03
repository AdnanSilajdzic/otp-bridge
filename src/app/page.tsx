"use client";
import { useState } from "react";
import parser from "@/helpers/parser";

export default function Home() {
  const [link, setLink] = useState<string>("");
  const [decoded, setDecoded] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleDecode() {
    parser(link).then((result) => {
      setDecoded(result);
    });
  }

  return (
    <div className="font-sans flex flex-col items-center justify-items-center min-h-screen p-8 pb-20 sm:p-20">
      <label htmlFor="link" className="mb-2">
        Enter the Google OTP migration link
      </label>
      <input
        id="link"
        type="text"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        className="bg-white text-black p-2 rounded w-full max-w-md"
      />
      <button
        onClick={handleDecode}
        className="bg-white text-black mt-3 px-4 py-2 rounded hover:bg-gray-200"
      >
        Degoogle
      </button>

      {error && (
        <div className="text-red-500 mt-4 max-w-md">
          <strong>Error:</strong> {error}
        </div>
      )}

      {decoded && (
        <pre className="text-left mt-5 bg-gray-900 text-white p-4 rounded w-full max-w-md overflow-x-auto">
          {JSON.stringify(decoded, null, 2)}
        </pre>
      )}
    </div>
  );
}
