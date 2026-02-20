"use client"

import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart"
import dayjs from "dayjs"

const chartConfig = {
    value: {
        label: "Codes",
        color: "var(--chart-1)",
    },
} satisfies ChartConfig

type DataPoint = { date: string; value: number }

type PropsTypes = {
    data: DataPoint[]
}

export function ChartLineLabel({ data }: PropsTypes) {
    const sortedData = [...data].sort((a, b) => a.date.localeCompare(b.date))

    const chartData = sortedData.map((d) => ({
        date: dayjs(d.date).format("DD MMM"),
        value: d.value,
    }))

    const firstDate = sortedData.length > 0 ? dayjs(sortedData[0].date).format("DD. MMMM YYYY") : ""
    const lastDate = sortedData.length > 0 ? dayjs(sortedData[sortedData.length - 1].date).format("DD. MMMM YYYY") : ""

    return (
        <Card>
            <CardHeader>
                <CardTitle>Total codes migrated over time</CardTitle>
                <CardDescription>{firstDate} — {lastDate}</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <LineChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            top: 20,
                            left: 16,
                            right: 16,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="line" />}
                        />
                        <Line
                            dataKey="value"
                            type="natural"
                            stroke="var(--color-value)"
                            strokeWidth={2}
                            dot={{
                                fill: "var(--color-value)",
                            }}
                            activeDot={{
                                r: 6,
                            }}
                        >
                            <LabelList
                                position="top"
                                offset={12}
                                className="fill-foreground"
                                fontSize={12}
                            />
                        </Line>
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
