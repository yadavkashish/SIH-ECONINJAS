import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { Users } from "lucide-react";
import { CategoryIcon } from "../components/Icons";

export function CommunityCard({
  community,
  isJoined,
  isPending,
  onToggleJoin,
}) {
  const getButtonState = () => {
    if (isJoined) {
      return {
        text: "Leave",
        variant: "secondary",
        disabled: false,
        className: "bg-[hsl(142,41%,30%)]",
      };
    }
    if (isPending) {
      return { text: "Request Pending", variant: "outline", disabled: true };
    }
    return { text: "Join", variant: "default", disabled: false };
  };

  const buttonState = getButtonState();

  const handleButtonClick = (e) => {
    // Prevent the link from firing when the button is clicked
    if (isJoined) {
      e.preventDefault();
    }
    onToggleJoin(community.id);
  };

  return (
    <Card className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl h-full group">
      <div className={isJoined ? "cursor-pointer" : ""}>
        <CardHeader className="p-0">
          <div className="relative h-48 w-full">
            <img
              src={community.image}
              alt={community.name}
              className="object-cover w-full h-full"
              data-ai-hint={`${community.category} community`}
            />
            {isJoined && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white font-bold text-lg">
                  View Community
                </span>
              </div>
            )}
          </div>
          <div className="p-6 pb-2 ">
            <Badge
              variant="secondary"
              className=" bg-[hsl(142,41%,30%)] text-white mr-48 mb-2 uppercase text-xs flex items-center"
            >
              <CategoryIcon
                category={community.category}
                className="  mr-1 h-3 w-3"
              />
              {community.category}
            </Badge>
            <CardTitle className="font-headline text-xl">
              {community.name}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="flex-grow p-6 pt-0">
          <p className="text-muted-foreground text-gray-500">
            {community.description}
          </p>
        </CardContent>
      </div>
      <CardFooter className="flex justify-between items-center p-6 pt-0 mt-auto">
        <div className="flex items-center text-sm text-gray-500 text-muted-foreground">
          <Users className="mr-2 h-4 w-4" />
          <span>{community.members.toLocaleString()} members</span>
        </div>
        <Button
          className={
            buttonState.text === "Leave"
              ? "bg-[hsl(142,41%,30%)] text-white" // green for Leave
              : "bg-[hsl(29,74%,44%)] text-white" // orange for Join / Request Pending
          }
          onClick={handleButtonClick}
          variant={buttonState.variant}
          disabled={buttonState.disabled}
        >
          {buttonState.text}
        </Button>
      </CardFooter>
    </Card>
  );
}
