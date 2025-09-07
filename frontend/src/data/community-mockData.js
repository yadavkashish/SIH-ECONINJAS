// src/data/mockData.js

export const mockCommunities = [
  {
    id: "1",
    name: "Downtown Clean-Up Crew",
    description:
      "Weekly clean-up events in the city center to keep our streets beautiful.",
    category: "cleanup",
    location: "Downtown",
    image: "https://picsum.photos/1200/400?random=1",
    members: 124,
  },
  {
    id: "2",
    name: "Suburbia Composters",
    description:
      "A group for sharing tips and resources on home composting in suburban areas.",
    category: "composting",
    location: "Suburbs",
    image: "https://picsum.photos/1200/400?random=2",
    members: 88,
  },
  {
    id: "3",
    name: "City Park Gardeners",
    description:
      "Volunteer to help maintain and beautify our local city park gardens.",
    category: "gardening",
    location: "City Park",
    image: "https://picsum.photos/1200/400?random=3",
    members: 215,
  },
  {
    id: "4",
    name: "Oceanfront Recyclers",
    description:
      "Dedicated to promoting recycling and reducing waste along the beachfront.",
    category: "recycling",
    location: "Beachside",
    image: "https://picsum.photos/1200/400?random=4",
    members: 302,
  },
  {
    id: "5",
    name: "Green Commuters",
    description:
      "Advocating for and practicing sustainable commuting options like biking and public transport.",
    category: "community",
    location: "Citywide",
    image: "https://picsum.photos/1200/400?random=5",
    members: 76,
  },
  {
    id: "6",
    name: "Rooftop Solar Enthusiasts",
    description:
      "Explore the potential of solar energy for residential homes in our city.",
    category: "solar power",
    location: "Citywide",
    image: "https://picsum.photos/1200/400?random=6",
    members: 54,
  },
];

export const mockPosts = [
  {
    id: "p1",
    communityId: "3",
    author: {
      name: "Park Admin",
      avatar: "https://i.pravatar.cc/150?u=admin-park",
    },
    content:
      "Event Announcement: Join us for the annual Spring Clean-Up event this Saturday at 9 AM. We'll be meeting at the main entrance. Gloves and bags will be provided. Let's make our park sparkle! ✨",
    timestamp: "2 days ago",
    likes: 45,
    comments: 18,
  },
  {
    id: "p2",
    communityId: "3",
    author: {
      name: "Jane Doe",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    },
    content:
      "Spotted a large amount of litter behind the old boathouse. We should add this to our list for Saturday's cleanup.",
    image: "https://picsum.photos/800/600?random=21",
    timestamp: "8 hours ago",
    likes: 12,
    comments: 5,
    location: "Old Boathouse",
  },
  {
    id: "p3",
    communityId: "3",
    author: {
      name: "John Smith",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026705d",
    },
    content:
      "Discussion: I've noticed the recycling bins near the playground are always overflowing. Should we request another one from the city council?",
    timestamp: "1 day ago",
    likes: 28,
    comments: 15,
  },
  {
    id: "p4",
    communityId: "1",
    author: {
      name: "City Official",
      avatar: "https://i.pravatar.cc/150?u=admin-city",
    },
    content:
      "Heads up team! There's a large illegal dumping site reported near the corner of 5th and Main. This will be a priority for our next scheduled clean-up.",
    image: "https://picsum.photos/800/600?random=22",
    timestamp: "4 hours ago",
    likes: 32,
    comments: 7,
    location: "5th and Main",
  },
  {
    id: "p5",
    communityId: "1",
    author: {
      name: "Mike Brown",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026707d",
    },
    content:
      "Great turnout for the downtown cleanup today! We collected over 20 bags of trash from the high street alone. Let's keep up the great work!",
    timestamp: "1 day ago",
    likes: 58,
    comments: 11,
  },
];
