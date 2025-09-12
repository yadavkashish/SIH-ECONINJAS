import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Progress } from "../../components/ui/Progress";

export default function PointsDashboard() {
  const totalPoints = 1250;
  const pointsBreakdown = [
    {
      category: "Selling Waste",
      points: 680,
      icon: "♻️",
      color: "bg-amber-400",
    },
    {
      category: "Sustainable Products",
      points: 320,
      icon: "🛒",
      color: "bg-yellow-500",
    },
    {
      category: "Community Participation",
      points: 250,
      icon: "👥",
      color: "bg-orange-400",
    },
  ];

  const maxPoints = Math.max(...pointsBreakdown.map((p) => p.points));

  return (
    <Card className="bg-card border-border shadow-lg rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-card-foreground text-xl font-bold">
          <span className="text-3xl">🏆</span>
          Points Dashboard
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-8">
        {/* Total Points Section */}
        <div className="text-center p-6 bg-gradient-to-r from-amber-100 via-yellow-100 to-orange-200 rounded-xl shadow-md">
          <div className="text-5xl font-extrabold text-amber-700 mb-2 animate-pulse">
            {totalPoints.toLocaleString()}
          </div>
          <div className="text-muted-foreground text-lg">
            Total Eco-Points Earned
          </div>
          <Badge
            variant="secondary"
            className="mt-3 px-4 py-1 rounded-full bg-gradient-to-r from-amber-500 to-yellow-600 text-white shadow-md"
          >
            ✨ Level 5 - Golden Champion
          </Badge>
        </div>

        {/* Points Breakdown */}
        <div className="space-y-5">
          <h3 className="font-semibold text-lg text-card-foreground">
            Points Breakdown
          </h3>
          {pointsBreakdown.map((item, index) => (
            <div
              key={index}
              className="p-5 bg-muted rounded-xl shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer border-2 border-gray-200 hover:bg-amber-50 hover:border-amber-300"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full ${item.color}`} />
                  <span className="text-2xl">{item.icon}</span>
                  <span className="font-medium text-card-foreground">
                    {item.category}
                  </span>
                </div>
                <div className="font-bold text-amber-600 text-lg">
                  {item.points}
                </div>
              </div>
              {/* Progress Bar */}
              <Progress
                value={(item.points / maxPoints) * 100}
                className="h-3 rounded-full bg-amber-200"
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
