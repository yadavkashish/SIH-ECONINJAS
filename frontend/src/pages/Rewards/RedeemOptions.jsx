import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";

export default function RedeemOptions() {
  const redeemOptions = [
    {
      title: "Eco-Friendly Products",
      description: "20% off sustainable products",
      points: 100,
      icon: "🌱",
      available: true,
    },
    {
      title: "Wallet Cashback",
      description: "₹50 cashback to your wallet",
      points: 200,
      icon: "💰",
      available: true,
    },
    {
      title: "Tree Plantation",
      description: "Plant 5 trees in your name",
      points: 150,
      icon: "🌳",
      available: true,
    },
    {
      title: "Water Conservation",
      description: "Get a smart water-saving nozzle",
      points: 50,
      icon: "💧",
      available: true,
    },
    {
      title: "Recycle-A-Thon",
      description: "Entry to city-wide recycling challenge",
      points: 400,
      icon: "🏆",
      available: false,
    },
    {
      title: "NGO Donation",
      description: "Donate to environmental NGOs",
      points: 300,
      icon: "❤️",
      available: false,
    },
  ];

  return (
    <Card className="bg-white border-2 border-gray-200 rounded-3xl shadow-lg p-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-gray-800 text-2xl font-bold">
          <span className="text-3xl">🎁</span>
          Redeem Options
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {redeemOptions.map((option, index) => (
            <div
              key={index}
              className={`p-6 rounded-2xl border-2 transition-all shadow-md flex flex-col items-center text-center space-y-4 cursor-pointer ${
                option.available
                  ? "bg-white border-gray-200 hover:border-amber-300"
                  : "bg-gray-100 border-gray-300 opacity-70"
              }`}
            >
              <div className="text-4xl">{option.icon}</div>
              <div className="space-y-1">
                <h3 className="font-semibold text-lg text-gray-800">
                  {option.title}
                </h3>
                <p className="text-sm text-gray-500">{option.description}</p>
              </div>
              <div className="mt-auto space-y-2">
                <Badge
                  className="px-3 py-1 text-sm font-semibold rounded-full"
                  variant="outline"
                >
                  {option.points} points
                </Badge>
                <Button
                  size="sm"
                  className={`w-full font-bold text-white transition-colors duration-200 ${
                    option.available
                      ? "bg-gray-700 hover:bg-gray-600"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                  disabled={!option.available}
                >
                  {option.available ? "Redeem" : "Locked"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
