import { Card, CardContent, CardFooter, CardHeader } from "./ui/Card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar";
import { Button } from "./ui/Button";
import { MessageSquare, ThumbsUp, Share2, MapPin } from "lucide-react";
import { Badge } from "./ui/Badge";

export function PostCard({ post }) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center gap-4 p-4">
        <Avatar>
          <AvatarImage src={post.author.avatar} alt={post.author.name} />
          <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="grid gap-1">
          <div className="flex items-center gap-2">
            <p className="font-semibold">{post.author.name}</p>
            {post.location && (
              <Badge variant="outline" className="font-normal">
                <MapPin className="mr-1 h-3 w-3" />
                {post.location}
              </Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground">{post.timestamp}</p>
        </div>
      </CardHeader>

      <CardContent className="p-4 pt-0">
        <p className="whitespace-pre-wrap">{post.content}</p>
        {post.image && (
          <div className="h-96 w-full mt-4 rounded-lg overflow-hidden">
            <img
              src={post.image}
              alt="Post"
              className="object-cover w-full h-full"
            />
          </div>
        )}
      </CardContent>

      <CardFooter className="flex justify-between items-center p-2 border-t">
        <Button variant="ghost" className="flex-1">
          <ThumbsUp className="mr-2 h-4 w-4" />
          {post.likes > 0 && <span>{post.likes}</span>}
          <span className="ml-1 hidden sm:inline">Like</span>
        </Button>
        <Button variant="ghost" className="flex-1">
          <MessageSquare className="mr-2 h-4 w-4" />
          {post.comments > 0 && <span>{post.comments}</span>}
          <span className="ml-1 hidden sm:inline">Comment</span>
        </Button>
        <Button variant="ghost" className="flex-1">
          <Share2 className="mr-2 h-4 w-4" />
          <span className="ml-1 hidden sm:inline">Share</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
