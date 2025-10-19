import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  amount: number;
  icon: LucideIcon;
  trend?: number;
  type?: "income" | "expense" | "balance";
}

export const StatsCard = ({ title, amount, icon: Icon, trend, type = "balance" }: StatsCardProps) => {
  const getGradient = () => {
    if (type === "income") return "gradient-success";
    if (type === "expense") return "gradient-destructive";
    return "gradient-primary";
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  return (
    <Card className="card-hover overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold">{formatCurrency(amount)}</p>
            {trend !== undefined && (
              <p className={`text-xs ${trend >= 0 ? "text-success" : "text-destructive"}`}>
                {trend >= 0 ? "+" : ""}{trend}% from last month
              </p>
            )}
          </div>
          <div className={`${getGradient()} p-3 rounded-xl`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
