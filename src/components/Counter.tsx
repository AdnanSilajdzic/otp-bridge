"use client";
import React, { useEffect, useState } from "react";
import { Card } from "./ui/card";
import axios from "axios";
import { Skeleton } from "./ui/skeleton";

const Counter = () => {
  const [counter, setCounter] = useState(null);
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
        counter && (
          <Card className="w-full max-w-2xl  p-7">
            <h1 className="text-center font-bold text-3xl">{counter}</h1>
            <p className="text-center text-lg">OTP codes degoogled so far</p>
          </Card>
        )
      )}
    </>
  );
};

export default Counter;
