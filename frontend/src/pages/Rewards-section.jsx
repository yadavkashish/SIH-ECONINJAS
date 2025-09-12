import React from "react";
import PointsDashboard from "./Rewards/PointsDashboard";
import RedeemOptions from "./Rewards/RedeemOptions";
import TransactionHistory from "./Rewards/TransactionHistory";
import LeaderboardsBadges from "./Rewards/LeaderboardsBadges";
import ProgressTracker from "./Rewards/ProgressTracker";
import "./Rewards/RewardsTheme.css";

export default function RewardsSection() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">
          🌱 Eco Rewards
        </h1>
        <p className="text-muted-foreground text-lg">
          Earn points for making a difference
        </p>
      </div>

      <div className="grid gap-8">
        {/* Points Dashboard */}
        <PointsDashboard />

        {/* Progress Tracker */}
        <ProgressTracker />

        {/* Redeem Options */}
        <RedeemOptions />

        {/* Transaction History & Leaderboards */}
        <div className="grid lg:grid-cols-2 gap-8">
          <TransactionHistory />
          <LeaderboardsBadges />
        </div>
      </div>
    </div>
  );
}
