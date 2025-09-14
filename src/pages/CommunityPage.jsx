import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Send } from "lucide-react";

import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/Avatar";
import { PostCard } from "../components/PostCard";
import { Badge } from "../components/ui/Badge";

import { mockCommunities, mockPosts } from "../data/community-mockData";

export default function CommunityPage() {
  const { id } = useParams();
  const community = mockCommunities.find((c) => String(c.id) === id);
  const posts = mockPosts.filter((p) => String(p.communityId) === id);

  if (!community) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-2xl font-bold">Community not found.</p>
        <Link to="/">
          <Button className="mt-4">Back to Home</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[hsl(38,52%,94%)] bg-background">
      <header className="relative">
        <div className="h-64 md:h-80 w-full relative">
          <img
            src={community.image}
            alt={community.name}
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 text-white">
          <div className="container mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold font-headline">
              {community.name}
            </h1>
            <p className="max-w-2xl mt-2 text-lg">{community.description}</p>
          </div>
        </div>
        <div className="absolute top-4 left-4">
          <Link to="/communities">
            <Button
              variant="outline"
              size="icon"
              className="bg-background/50 hover:bg-background/80 rounded-full"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back</span>
            </Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-card p-4 rounded-lg shadow-sm">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src="https://i.pravatar.cc/150?u=currentUser" />
                  <AvatarFallback>ME</AvatarFallback>
                </Avatar>
                <Input
                  placeholder={`Post in ${community.name}...`}
                  className="flex-1 h-12"
                />
                <Button size="icon">
                  <Send className="h-5 w-5" />
                  <span className="sr-only">Create Post</span>
                </Button>
              </div>
            </div>

            <div className="space-y-6">
              {posts.length > 0 ? (
                posts.map((post) => <PostCard key={post.id} post={post} />)
              ) : (
                <div className="text-center py-16 border-2 border-dashed rounded-lg bg-card">
                  <p className="text-muted-foreground">
                    No posts in this community yet.
                  </p>
                  <p className="text-muted-foreground mt-2">
                    Be the first to say something!
                  </p>
                </div>
              )}
            </div>
          </div>

          <aside className="space-y-6">
            <div className="bg-card p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold font-headline mb-4">
                About Community
              </h3>
              <p className="text-muted-foreground">{community.description}</p>
              <div className="mt-4 pt-4 border-t flex flex-col space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Category:</span>
                  <Badge variant="secondary">{community.category}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Location:</span>
                  <span className="font-medium">{community.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Members:</span>
                  <span className="font-medium">
                    {community.members.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
