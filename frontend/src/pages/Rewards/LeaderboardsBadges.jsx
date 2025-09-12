import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Avatar, AvatarFallback } from "../../components/ui/Avatar";

export default function LeaderboardsBadges() {
  const leaderboard = [
    { rank: 1, name: "Priya Sharma", points: 2450, avatar: "PS", badge: "🥇" },
    { rank: 2, name: "Rahul Kumar", points: 2180, avatar: "RK", badge: "🥈" },
    { rank: 3, name: "Anita Singh", points: 1890, avatar: "AS", badge: "🥉" },
    {
      rank: 4,
      name: "You",
      points: 1250,
      avatar: "YO",
      badge: "🏅",
      isCurrentUser: true,
    },
    { rank: 5, name: "Vikram Patel", points: 1120, avatar: "VP", badge: "🏅" },
  ];

  return (
    <Card className="bg-white border-2 border-gray-200 rounded-3xl shadow-lg p-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-gray-800 text-2xl font-bold">
          <span className="text-3xl">🏆</span>
          Community Leaderboard
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {leaderboard.map((user) => (
            <div
              key={user.rank}
              className={`flex items-center justify-between p-4 rounded-xl transition-all cursor-pointer ${
                user.isCurrentUser
                  ? "bg-amber-100 text-amber-900 border-2 border-amber-300 hover:bg-amber-200"
                  : "bg-gray-100 hover:bg-amber-100"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{user.badge}</span>
                  <span className="font-bold text-sm">#{user.rank}</span>
                </div>
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="text-xs">
                    {user.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div
                    className={`font-medium text-sm ${
                      user.isCurrentUser ? "text-amber-900" : "text-gray-800"
                    }`}
                  >
                    {user.name}
                  </div>
                </div>
              </div>
              <Badge
                className={`text-sm px-3 py-1 font-bold rounded-full ${
                  user.isCurrentUser
                    ? "bg-amber-300 text-amber-900"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {user.points.toLocaleString()} pts
              </Badge>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gray-100 rounded-xl text-center shadow-inner">
          <div className="text-sm text-gray-500 mb-2">Your Local Area Rank</div>
          <div className="text-2xl font-bold text-green-700">#4</div>
          <div className="text-xs text-gray-500">out of 127 participants</div>
        </div>
      </CardContent>
    </Card>
  );
}
