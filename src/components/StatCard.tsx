import clsx from "clsx";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
    label: string;
    value: string | number;
    unit?: string;
    icon: LucideIcon;
    trend?: string; // e.g., "+2.5%" or similar (optional)
    color?: "orange" | "blue" | "green" | "red"; // For icon background or accent
    className?: string;
}

export function StatCard({ label, value, unit, icon: Icon, trend, color = "orange", className }: StatCardProps) {
    return (
        <div className={clsx("glass-card card-hover p-4 rounded-2xl flex flex-col justify-between h-full", className)}>
            <div className="flex justify-between items-start">
                <div className={clsx("p-2 rounded-full", {
                    "bg-orange-100 text-orange-600": color === "orange",
                    "bg-blue-100 text-blue-600": color === "blue",
                    "bg-green-100 text-green-600": color === "green",
                    "bg-red-100 text-red-600": color === "red",
                })}>
                    <Icon size={20} />
                </div>
                {trend && <span className="text-xs text-green-500 font-medium">{trend}</span>}
            </div>
            <div className="mt-4">
                <p className="text-sm text-muted-foreground">{label}</p>
                <h3 className="text-2xl font-bold mt-1">
                    {value}
                    {unit && <span className="text-sm font-normal text-muted-foreground ml-1">{unit}</span>}
                </h3>
            </div>
        </div>
    );
}
