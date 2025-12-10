import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, CartesianGrid } from 'recharts';
import { Trip } from "@/hooks/useTrips";

interface ActivityChartProps {
    trips: Trip[];
}

export function ActivityChart({ trips }: ActivityChartProps) {
    // Aggregate data by day (simplified)
    // In a real app, we'd group by date properly.
    // For now, let's just show the last 7 trips or map them to "Mon", "Tue" etc.

    const data = trips.slice(0, 7).reverse().map(trip => ({
        name: new Date(trip.date).toLocaleDateString('en-US', { weekday: 'short' }),
        distance: trip.distance,
        calories: trip.calories,
    }));

    return (
        <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-muted-foreground)" opacity={0.1} />
                    <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#9ca3af', fontSize: 12 }}
                        dy={10}
                    />
                    <YAxis hide />
                    <Tooltip
                        cursor={{ fill: 'var(--color-muted)', opacity: 0.2, radius: 10 }}
                        contentStyle={{
                            borderRadius: '16px',
                            border: 'none',
                            boxShadow: '0 10px 30px -10px rgba(0,0,0,0.2)',
                            background: 'rgba(255, 255, 255, 0.9)',
                            backdropFilter: 'blur(8px)',
                            padding: '12px 16px'
                        }}
                        itemStyle={{ color: '#171717', fontWeight: 600 }}
                        labelStyle={{ color: '#9ca3af', marginBottom: '4px', fontSize: '12px' }}
                    />
                    <Bar dataKey="distance" radius={[8, 8, 8, 8]} barSize={12}>
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={index === data.length - 1 ? 'url(#colorGradient)' : '#FED7AA'} />
                        ))}
                    </Bar>
                    <defs>
                        <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#FF6B00" stopOpacity={1} />
                            <stop offset="100%" stopColor="#FF8533" stopOpacity={1} />
                        </linearGradient>
                    </defs>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
