import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Users } from 'lucide-react';
import { Input } from '../components/ui/Input';
import { CommunityCard } from '../components/Community-card';
import { Recommendations } from '../components/Recommendations';
import { useToast } from '../hooks/use-toast';
import { mockCommunities } from '../data/community-mockData'; // <-- imported mock data

export default function Communities() {
  const [searchTerm, setSearchTerm] = useState('');
  const [joinedCommunityIds, setJoinedCommunityIds] = useState(new Set(['3']));
  const [pendingCommunityIds, setPendingCommunityIds] = useState(new Set());
  const { toast } = useToast();

  const handleToggleJoin = (id) => {
    setJoinedCommunityIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
        return newSet;
      }

      setPendingCommunityIds(pendingPrev => {
        const newPendingSet = new Set(pendingPrev);
        if (!newPendingSet.has(id)) {
          newPendingSet.add(id);
          toast({
            title: "Request Sent",
            description: "Your request to join this community has been sent to the admin for approval.",
          });
        }
        return newPendingSet;
      });

      return newSet;
    });
  };

  const filteredCommunities = useMemo(() => {
    if (!searchTerm) return mockCommunities;
    return mockCommunities.filter(community =>
      community.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      community.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      community.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const showRecommendations = joinedCommunityIds.size < 2;

  return (
    <div className="min-h-screen bg-[hsl(38,52%,94%)] bg-background">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-2">
              <div className="bg-secondary bg-[hsl(142,41%,30%)] p-2 rounded-lg">
                <Users className="h-6 w-6 text-white text-secondary-foreground" />
              </div>
              <h1 className="text-2xl font-bold font-headline text-[hsl(142,41%,30%)] text-secondary">EcoConnect</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <section className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl text-[hsl(142,41%,30%)] font-bold font-headline text-secondary tracking-tight">
              Connect with your Local Eco-Community
            </h2>
            <p className="mt-4 max-w-2xl text-gray-500 mx-auto text-lg text-muted-foreground">
              Discover, join, and participate in sustainability-focused groups near you.
            </p>
          </section>

          <section className="mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 text-gray-400 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for communities by name, interest, or category..."
                className="w-full pl-12 h-12 text-lg rounded-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </section>

          {showRecommendations && (
            <section className="mb-16">
              <Recommendations joinedCommunityIds={joinedCommunityIds} onToggleJoin={handleToggleJoin} />
            </section>
          )}

          <section>
            <h2 className="text-3xl font-headline font-bold mb-6">
              {searchTerm ? `Results for "${searchTerm}"` : "Explore Communities"}
            </h2>
            {filteredCommunities.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCommunities.map(community => {
                  const isJoined = joinedCommunityIds.has(community.id);
                  const cardContent = (
                    <CommunityCard
                      community={community}
                      isJoined={isJoined}
                      isPending={pendingCommunityIds.has(community.id)}
                      onToggleJoin={handleToggleJoin}
                    />
                  );

                  if (isJoined) {
                    return (
                      <Link key={community.id} to={`/community/${community.id}`} className="contents">
                        {cardContent}
                      </Link>
                    );
                  }

                  return (
                    <div key={community.id}>
                      {cardContent}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-16 border-2 border-dashed rounded-lg">
                <p className="text-muted-foreground">No communities found matching your search.</p>
              </div>
            )}
          </section>
        </div>
      </main>

      <footer className="mt-16 py-8 bg-card/50">
        <div className="container mx-auto text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} EcoConnect. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
