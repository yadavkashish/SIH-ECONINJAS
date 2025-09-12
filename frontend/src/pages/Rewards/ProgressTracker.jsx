import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/Card";
import { Progress } from "../../components/ui/Progress";

export default function ProgressTracker() {
  const currentPoints = 1250;
  const nextMilestone = 1500;
  const progress = (currentPoints / nextMilestone) * 100;

  const badges = [
    { name: "Plastic Hero", earned: true, icon: "🦸‍♂️" },
    { name: "Zero Waste Champion", earned: true, icon: "🌟" },
    { name: "Green Saver", earned: true, icon: "💚" },
    { name: "Eco Warrior", earned: false, icon: "⚔️" },
    { name: "Planet Protector", earned: false, icon: "🌍" },
  ];

  return (
    <Card className="bg-white border-2 border-gray-200 rounded-3xl shadow-lg p-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-gray-800 text-2xl font-bold">
          <span className="text-3xl">📈</span>
          Progress Tracker
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Progress to Next Reward */}
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500 font-semibold">
              Progress to Next Reward
            </span>
            <span className="font-bold text-gray-800">
              {currentPoints}/{nextMilestone} points
            </span>
          </div>
          <Progress value={progress} className="h-4 rounded-full" />
          <div className="text-center text-sm text-gray-500">
            {nextMilestone - currentPoints} points until next reward unlock
          </div>
        </div>

        {/* Achievement Badges */}
        <div className="space-y-3">
          <h3 className="font-bold text-lg text-gray-800">
            Achievement Badges
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {badges.map((badge, index) => (
              <div
                key={index}
                className={`p-4 rounded-xl text-center transition-all shadow-md ${
                  badge.earned
                    ? "bg-amber-100 text-amber-800 border-2 border-amber-300"
                    : "bg-gray-100 text-gray-500 border-2 border-gray-300 opacity-70"
                }`}
              >
                <div className="text-4xl mb-2">{badge.icon}</div>
                <div className="text-xs font-semibold">{badge.name}</div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
