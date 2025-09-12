import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";

export default function TransactionHistory() {
  const transactions = [
    {
      id: 1,
      type: "earned",
      description: "Sold 2kg plastic bottles",
      points: 20,
      date: "2024-01-15",
      icon: "♻️",
    },
    {
      id: 2,
      type: "redeemed",
      description: "Eco-product discount coupon",
      points: -50,
      date: "2024-01-14",
      icon: "🎁",
    },
    {
      id: 3,
      type: "earned",
      description: "Community event participation",
      points: 30,
      date: "2024-01-13",
      icon: "👥",
    },
    {
      id: 4,
      type: "earned",
      description: "Bought sustainable products",
      points: 15,
      date: "2024-01-12",
      icon: "🛒",
    },
    {
      id: 5,
      type: "redeemed",
      description: "Wallet cashback",
      points: -100,
      date: "2024-01-11",
      icon: "💰",
    },
  ];

  return (
    <Card className="bg-white border-2 border-gray-200 rounded-3xl shadow-lg p-6">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2 text-gray-800 text-2xl font-bold">
          <span className="text-3xl">📋</span>
          Transaction History
        </CardTitle>
        <Button variant="outline" size="sm" className="rounded-full px-4 text-sm font-semibold text-gray-700 hover:bg-gray-100">
          View All
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-xl transition-all hover:bg-amber-100 cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <span className="text-2xl">{transaction.icon}</span>
              <div>
                <div className="font-semibold text-gray-800 text-base">
                  {transaction.description}
                </div>
                <div className="text-xs text-gray-500">
                  {new Date(transaction.date).toLocaleDateString()}
                </div>
              </div>
            </div>
            <div className="text-right">
              <Badge
                className={`text-sm px-3 py-1 font-bold rounded-full ${
                  transaction.type === "earned"
                    ? "bg-green-100 text-green-700"
                    : "bg-amber-100 text-amber-700"
                }`}
              >
                {transaction.points > 0 ? "+" : ""}
                {transaction.points} pts
              </Badge>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
