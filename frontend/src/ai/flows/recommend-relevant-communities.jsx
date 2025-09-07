// src/ai/recommendRelevantCommunities.js

/**
 * Mock function to simulate AI recommending relevant communities
 * based on user interests and location.
 */

const exampleCommunities = [
  {
    name: "Eco-Warriors of Downtown",
    description: "A group dedicated to improving the eco-friendliness of downtown businesses and residents.",
    category: "cleanup",
    location: "Downtown",
  },
  {
    name: "Sustainable Living Collective",
    description: "Sharing tips and tricks for sustainable living in the suburbs.",
    category: "community",
    location: "Suburbia",
  },
  {
    name: "Recycle Right",
    description: "Educating and advocating for better recycling practices.",
    category: "recycling",
    location: "Citywide",
  },
  {
    name: "City Park Gardeners",
    description: "Volunteer to help maintain and beautify our local city park gardens.",
    category: "gardening",
    location: "City Park",
  },
  {
    name: "Oceanfront Recyclers",
    description: "Dedicated to promoting recycling and reducing waste along the beachfront.",
    category: "recycling",
    location: "Beachside",
  },
];

export async function recommendRelevantCommunities({ userInterests, userLocation }) {
  // Simulate a small delay like a real API call
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Filter mock data based on interests or location (simple keyword match)
  const filtered = exampleCommunities.filter(
    (c) =>
      c.name.toLowerCase().includes(userInterests.toLowerCase()) ||
      c.description.toLowerCase().includes(userInterests.toLowerCase()) ||
      c.location.toLowerCase().includes(userLocation.toLowerCase())
  );

  // Return either filtered results or random selection
  return filtered.length > 0 ? filtered : exampleCommunities.slice(0, 3);
}
