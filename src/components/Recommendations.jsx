import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../components/ui/Form';
import { Textarea } from '../components/ui/textarea';
import { Button } from '../components/ui/Button';
import { Loader2 } from 'lucide-react';
import { CommunityCard } from './Community-card';
import { useToast } from '../hooks/use-toast';
import { recommendRelevantCommunities } from '../ai/flows/recommend-relevant-communities';

// Validation function (replaces zod)
const validateForm = (values) => {
  const errors = {};
  if (!values.interests || values.interests.length < 10) {
    errors.interests = 'Please describe your interests in at least 10 characters.';
  }
  if (!values.location || values.location.length < 2) {
    errors.location = 'Please enter a valid location.';
  }
  return errors;
};

export function Recommendations({ joinedCommunityIds, onToggleJoin }) {
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [pendingRecs, setPendingRecs] = useState(new Set());

  const form = useForm({
    defaultValues: {
      interests: '',
      location: 'Citywide',
    },
  });

  const onSubmit = async (values) => {
    const errors = validateForm(values);
    if (Object.keys(errors).length > 0) {
      Object.values(errors).forEach(msg => toast({ title: "Error", description: msg, variant: "destructive" }));
      return;
    }

    setIsLoading(true);
    setRecommendations([]);
    try {
      const result = await recommendRelevantCommunities({
        userInterests: values.interests,
        userLocation: values.location,
      });
      setRecommendations(result);
      setPendingRecs(new Set());
    } catch (error) {
      console.error('Failed to get recommendations:', error);
      toast({
        title: "Error",
        description: "Failed to generate recommendations. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRecommendationJoin = (id) => {
    setPendingRecs(prev => {
      const newSet = new Set(prev);
      newSet.add(id);
      return newSet;
    });
    toast({
      title: "Request Sent",
      description: "Your request to join this community has been sent to the admin for approval.",
    });
  };

  const recommendationCommunities = recommendations.map((rec, index) => ({
    id: `rec-${index}-${rec.name.replace(/\s/g, '-')}`,
    name: rec.name,
    description: rec.description,
    category: rec.category,
    location: rec.location,
    image: `https://picsum.photos/600/400?random=${10 + index}`,
    members: Math.floor(Math.random() * 500) + 10, // Mock members
  }));

  return (
    <div className="space-y-8">
      <Card className="bg-card/80 border-dashed bg-white">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Find Your Community</CardTitle>
          <CardDescription>
            Tell us about your eco-interests, and we'll suggest some communities for you.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="interests"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel >Your Interests</FormLabel>
                    <FormControl>
                      <Textarea className="bg-[hsl(38,52%,94%)]"
                        placeholder="e.g., composting, reducing plastic waste, urban gardening..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="bg-[hsl(29,74%,44%)] text-white" type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Get Recommendations
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <div className="h-48 w-full bg-muted-foreground/20"></div>
              <CardHeader><div className="h-6 w-3/4 bg-muted-foreground/20 rounded"></div></CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="h-4 w-full bg-muted-foreground/20 rounded"></div>
                  <div className="h-4 w-5/6 bg-muted-foreground/20 rounded"></div>
                </div>
              </CardContent>
              <CardFooter><div className="h-10 w-24 bg-muted-foreground/20 rounded-md"></div></CardFooter>
            </Card>
          ))}
        </div>
      )}

      {recommendations.length > 0 && (
        <div>
          <h2 className="text-3xl font-headline font-bold mb-6">Our Suggestions for You</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendationCommunities.map((community) => (
              <CommunityCard
                key={community.id}
                community={community}
                isJoined={false}
                isPending={pendingRecs.has(community.id)}
                onToggleJoin={handleRecommendationJoin}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
