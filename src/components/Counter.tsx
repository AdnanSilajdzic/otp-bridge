"use client";
import React, { useEffect, useState } from "react";
import { Card } from "./ui/card";
import axios from "axios";
import { Skeleton } from "./ui/skeleton";
import { ChartLineIcon } from "lucide-react";
import Link from "next/link";

const Counter = () => {
  const [counter, setCounter] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  async function getCounterNumber() {
    let response;
    try {
      response = await axios.get("/api/get-counter");
    } catch (error) {
      return null;
    }
    return response;
  }

  useEffect(() => {
    getCounterNumber()
      .then((response) => setCounter(response?.data.counter))
      .catch((error) => setIsLoading(false))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      {" "}
      {isLoading ? (
        <Skeleton className="w-full z-50 max-w-2xl h-[146px]" />
      ) : (
        counter !== null && counter > 0 && (
          <Card className="w-full max-w-2xl  p-7 flex flex-col items-center">
            <div className="flex w-fit justify-center items-center relative">
              <h1 className="text-center font-bold text-3xl">
                {counter.toLocaleString("en-US")}
              </h1>
              <Link href="/history" className="flex items-center">
                <ChartLineIcon width={18} className="text-muted-foreground absolute right-0 -mr-6 cursor-pointer hover:text-white transition-all duration-300" />
              </Link>
            </div>
            <p className="text-center text-lg">OTP codes degoogled so far</p>
          </Card>
        )
      )}
    </>
  );
};

export default Counter;
