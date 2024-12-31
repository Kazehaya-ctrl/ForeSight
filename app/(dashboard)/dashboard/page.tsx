"use client";

import { useState } from "react";
import {
	format,
	startOfWeek,
	endOfWeek,
	startOfMonth,
	endOfMonth,
	startOfYear,
	endOfYear,
} from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	BarChart,
	Bar,
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";
import { CalendarIcon, DownloadIcon, Zap } from "lucide-react";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const energyData = [
	{ date: "2023-01", actual: 1000, predicted: 950 },
	{ date: "2023-02", actual: 1200, predicted: 1150 },
	{ date: "2023-03", actual: 1100, predicted: 1050 },
	{ date: "2023-04", actual: 1300, predicted: 1250 },
	{ date: "2023-05", actual: 1400, predicted: 1350 },
	{ date: "2023-06", actual: 1600, predicted: 1550 },
	{ date: "2023-07", actual: null, predicted: 1650 },
	{ date: "2023-08", actual: null, predicted: 1750 },
	{ date: "2023-09", actual: null, predicted: 1850 },
	{ date: "2023-10", actual: null, predicted: 1850 },
	{ date: "2023-11", actual: null, predicted: 1850 },
	{ date: "2023-12", actual: null, predicted: 1850 },
];

export default function EnergyDashboard() {
	const [selectedTimeframe, setSelectedTimeframe] = useState("daily");
	const [selectedDate, setSelectedDate] = useState<Date>(new Date());
	const [selectedWeek, setSelectedWeek] = useState<Date>(new Date());
	const [selectedMonth, setSelectedMonth] = useState<Date>(new Date());
	const [selectedYear, setSelectedYear] = useState<Date>(new Date());

	const formatTimeframeDisplay = () => {
		switch (selectedTimeframe) {
			case "daily":
				return format(selectedDate, "PPP");
			case "weekly":
				return `${format(startOfWeek(selectedWeek), "PPP")} - ${format(
					endOfWeek(selectedWeek),
					"PPP"
				)}`;
			case "monthly":
				return format(selectedMonth, "MMMM yyyy");
			case "yearly":
				return format(selectedYear, "yyyy");
			default:
				return "Select a timeframe";
		}
	};

	return (
		<div className="min-h-screen bg-background text-foreground font-serif">
			<header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
				<div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex h-14 items-center">
					<div className="mr-4 hidden md:flex">
						<a className="mr-6 flex items-center space-x-2" href="/">
							<Zap className="h-6 w-6" />
							<span className="hidden font-bold sm:inline-block">
								Energy Dashboard
							</span>
						</a>
						<nav className="flex items-center space-x-6 text-sm font-medium">
							<a
								className="transition-colors hover:text-foreground/80 text-foreground"
								href="/"
							>
								Overview
							</a>
							<a
								className="transition-colors hover:text-foreground/80 text-foreground/60"
								href="/analytics"
							>
								Analytics
							</a>
							<a
								className="transition-colors hover:text-foreground/80 text-foreground/60"
								href="/reports"
							>
								Reports
							</a>
							<a
								className="transition-colors hover:text-foreground/80 text-foreground/60"
								href="/settings"
							>
								Settings
							</a>
						</nav>
					</div>
					<div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
						<div className="w-full flex-1 md:w-auto md:flex-none">
							<button className="inline-flex items-center whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64">
								<span className="hidden lg:inline-flex">
									Search documentation...
								</span>
								<span className="inline-flex lg:hidden">Search...</span>
								<kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
									<span className="text-xs">⌘</span>K
								</kbd>
							</button>
						</div>
					</div>
				</div>
			</header>

			<div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 md:py-10">
				<div className="flex flex-col space-y-6">
					<div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
						<h1 className="text-3xl font-bold tracking-tight">
							Energy Consumption Dashboard
						</h1>
						<div className="flex items-center space-x-4">
							<Select
								onValueChange={setSelectedTimeframe}
								value={selectedTimeframe}
							>
								<SelectTrigger className="w-[180px]">
									<SelectValue placeholder="Select timeframe" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="daily">Daily</SelectItem>
									<SelectItem value="weekly">Weekly</SelectItem>
									<SelectItem value="monthly">Monthly</SelectItem>
									<SelectItem value="yearly">Yearly</SelectItem>
								</SelectContent>
							</Select>
							<Popover>
								<PopoverTrigger asChild>
									<Button
										variant={"outline"}
										className={cn(
											"w-[240px] justify-start text-left font-normal",
											!selectedDate && "text-muted-foreground"
										)}
									>
										<CalendarIcon className="mr-2 h-4 w-4" />
										{formatTimeframeDisplay()}
									</Button>
								</PopoverTrigger>
								<PopoverContent className="w-auto p-0" align="start">
									<div className="bg-background/80 backdrop-blur-sm rounded-md p-3">
										{selectedTimeframe === "daily" && (
											<Calendar
												mode="single"
												selected={selectedDate}
												onSelect={(date) => date && setSelectedDate(date)}
												initialFocus
											/>
										)}
										{selectedTimeframe === "weekly" && (
											<Calendar
												mode="single"
												selected={selectedWeek}
												onSelect={(date) => date && setSelectedWeek(date)}
												initialFocus
											/>
										)}
										{selectedTimeframe === "monthly" && (
											<Calendar
												mode="single"
												selected={selectedMonth}
												onSelect={(date) => date && setSelectedMonth(date)}
												initialFocus
											/>
										)}
										{selectedTimeframe === "yearly" && (
											<Calendar
												mode="single"
												selected={selectedYear}
												onSelect={(date) => date && setSelectedYear(date)}
												initialFocus
											/>
										)}
									</div>
								</PopoverContent>
							</Popover>
						</div>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
						<Card className="border-gray-200 dark:border-gray-800">
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-sm font-medium">
									Total Consumption
								</CardTitle>
								<Zap className="h-4 w-4 text-muted-foreground" />
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold">7,600 kWh</div>
								<p className="text-xs text-muted-foreground">
									+20.1% from last month
								</p>
							</CardContent>
						</Card>
						<Card className="border-gray-200 dark:border-gray-800">
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-sm font-medium">
									Predicted Consumption
								</CardTitle>
								<Zap className="h-4 w-4 text-muted-foreground" />
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold">8,250 kWh</div>
								<p className="text-xs text-muted-foreground">
									+8.5% from current
								</p>
							</CardContent>
						</Card>
						<Card className="border-gray-200 dark:border-gray-800">
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-sm font-medium">
									Efficiency Score
								</CardTitle>
								<Zap className="h-4 w-4 text-muted-foreground" />
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold">85%</div>
								<p className="text-xs text-muted-foreground">
									+2% from last month
								</p>
							</CardContent>
						</Card>
					</div>

					<Card className="border-gray-200 dark:border-gray-800">
						<CardHeader>
							<CardTitle>Energy Consumption Trend</CardTitle>
						</CardHeader>
						<CardContent>
							<ResponsiveContainer width="100%" height={400}>
								<LineChart data={energyData}>
									<CartesianGrid strokeDasharray="3 3" />
									<XAxis dataKey="date" />
									<YAxis />
									<Tooltip
										contentStyle={{
											backgroundColor: "var(--background)",
											borderColor: "var(--border)",
										}}
									/>
									<Legend />
									<Line
										type="monotone"
										dataKey="actual"
										stroke="var(--primary)"
										name="Actual Consumption"
									/>
									<Line
										type="monotone"
										dataKey="predicted"
										stroke="var(--secondary)"
										name="Predicted Consumption"
									/>
								</LineChart>
							</ResponsiveContainer>
						</CardContent>
					</Card>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<Card className="border-gray-200 dark:border-gray-800">
							<CardHeader>
								<CardTitle>Consumption by Source</CardTitle>
							</CardHeader>
							<CardContent>
								<ResponsiveContainer width="100%" height={300}>
									<BarChart
										data={[
											{ name: "Lighting", value: 300 },
											{ name: "HVAC", value: 500 },
											{ name: "Equipment", value: 400 },
											{ name: "Other", value: 200 },
										]}
									>
										<CartesianGrid strokeDasharray="3 3" />
										<XAxis dataKey="name" />
										<YAxis />
										<Tooltip
											contentStyle={{
												backgroundColor: "var(--background)",
												borderColor: "var(--border)",
											}}
										/>
										<Bar dataKey="value" fill="white" />
									</BarChart>
								</ResponsiveContainer>
							</CardContent>
						</Card>
						<Card className="border-gray-200 dark:border-gray-800">
							<CardHeader>
								<CardTitle>Efficiency Recommendations</CardTitle>
							</CardHeader>
							<CardContent>
								<ul className="space-y-2">
									<li className="flex items-center">
										<Zap className="h-4 w-4 mr-2 text-primary" />
										Upgrade to LED lighting to reduce consumption by 15%
									</li>
									<li className="flex items-center">
										<Zap className="h-4 w-4 mr-2 text-primary" />
										Implement smart HVAC controls for potential 20% savings
									</li>
									<li className="flex items-center">
										<Zap className="h-4 w-4 mr-2 text-primary" />
										Conduct an energy audit to identify further optimization
										opportunities
									</li>
									<li className="flex items-center">
										<Zap className="h-4 w-4 mr-2 text-primary" />
										Consider installing solar panels for renewable energy
										generation
									</li>
								</ul>
							</CardContent>
						</Card>
					</div>

					<Card className="border-gray-200 dark:border-gray-800">
						<CardHeader className="flex flex-row items-center justify-between">
							<CardTitle>Detailed Consumption Data</CardTitle>
							<Button variant="outline" className="flex items-center">
								<DownloadIcon className="mr-2 h-4 w-4" />
								Export Data
							</Button>
						</CardHeader>
						<CardContent>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Date</TableHead>
										<TableHead>Actual Consumption (kWh)</TableHead>
										<TableHead>Predicted Consumption (kWh)</TableHead>
										<TableHead>Difference</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{energyData.map((row) => (
										<TableRow key={row.date}>
											<TableCell>{row.date}</TableCell>
											<TableCell>
												{row.actual !== null ? row.actual : "N/A"}
											</TableCell>
											<TableCell>{row.predicted}</TableCell>
											<TableCell>
												{row.actual !== null
													? (row.actual - row.predicted).toFixed(2)
													: "N/A"}
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
