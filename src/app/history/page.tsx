"use client"
import { Metadata } from "next";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Navigation } from "@/components/Navigation";
import { ChartLineLabel } from "@/components/ui/lineChart";
import { useEffect, useState } from "react";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";

export default function GuidePage() {
    const [history, setHistory] = useState<[{ date: string, value: number }] | null>(null)
    const [error, setError] = useState<boolean>(false)

    useEffect(() => {
        axios.get('/api/get-history').then((response) => {
            if (response?.data?.history && response?.data?.history?.length) {
                setHistory(response.data.history)
            } else {
                setError(true)
            }
        }).catch((error) => {
            setError(true)
        })
    }, [])

    return (
        <div className="flex flex-col items-center justify-center py-6 px-3 bg-muted min-h-screen">
            <h1 className="text-2xl sm:text-3xl mb-2 font-bold text-center">OTP Codes migrated over time</h1>
            <div className="px-3 py-2 w-full max-w-4xl mb-2">
                {
                    history ?
                        <ChartLineLabel data={history} /> : null
                }

                {
                    !history && !error ?
                        <Skeleton className="w-full h-full bg-muted-foreground/10" style={{ height: "400px" }} /> : null
                }

                {
                    error && !history ?
                        <Card className="border-dashed border-muted-foreground/30 flex flex-col items-center justify-center" style={{ height: "400px" }}>
                            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                                <div className="rounded-full bg-muted-foreground/10 p-3 mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
                                        <path d="M3 3v18h18" />
                                        <path d="m19 9-5 5-4-4-3 3" />
                                    </svg>
                                </div>
                                <p className="text-sm font-medium text-muted-foreground">No data available yet</p>
                                <p className="text-xs text-muted-foreground/70 mt-1">History will appear here once codes are migrated.</p>
                            </CardContent>
                        </Card>
                        : null
                }
            </div>
            <Navigation />
        </div>
    );
}
