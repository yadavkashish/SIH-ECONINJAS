const modulesData = [
  {
    title: "Introduction to Waste Management",
    id: "intro-waste",
    sections: [
      {
        id: "introduction-video",
        name: "Video",
        path: "/video/intro-waste",   // ✅ use module id
        type: "video",
        description: "Why waste management matters (India’s problem + real-life impact).",
        hasActivity: false,
        videoUrl: "https://res.cloudinary.com/dz5qcaurk/video/upload/v1757335824/Intro_wwxs8i.mp4"
,
      },
      {
        id: "introduction-content",
        name: "Content",
        path: "/content/intro-waste",
        type: "content",
        description: "Types of waste – Wet, Dry, Hazardous.",
        hasActivity: false,
      },
      {
        id: "introduction-quiz",
        name: "Quiz",
        path: "/quiz/intro-waste",
        type: "quiz",
        description: "Match the item (banana peel, glass bottle, battery) with the right bin.",
        hasActivity: false,
      }
    ]
  },
  {
    title: "Segregation at Home",
    id: "segregation-home",
    sections: [
      {
        id: "segregation-home-video",
        name: "Video",
        path: "/video/segregation-home",   // ✅
        type: "video",
        description: "How to use the 3-bin system.",
        hasActivity: false,
        videoUrl: "https://res.cloudinary.com/dz5qcaurk/video/upload/q_auto,f_auto/waste-segregation.mp4",
      },
      {
        id: "segregation-home-content",
        name: "Content",
        path: "/content/segregation-home",
        type: "content",
        description: "Do’s and Don’ts (e.g., don’t mix sanitary waste with wet waste).",
        hasActivity: true,
      },
      {
        id: "segregation-home-activity",
        name: "Activity",
        path: "/activity/segregation-home",
        type: "activity",
        description: "Drag-and-drop segregation game (virtual bins).",
        hasActivity: false,
      }
    ]
  },
  {
    title: "Composting Made Easy",
    id: "composting-easy",
    sections: [
      {
        id: "composting-video",
        name: "Video",
        path: "/video/composting-easy",   // ✅
        type: "video",
        description: "Step-by-step guide to making compost at home.",
        hasActivity: false,
        videoUrl: "https://res.cloudinary.com/dz5qcaurk/video/upload/v1757321057/waste-segregation.mp4",
      },
      {
        id: "composting-content",
        name: "Content",
        path: "/content/composting-easy",
        type: "content",
        description: "Common mistakes in composting & how to avoid them.",
        hasActivity: false,
      },
      {
        id: "composting-quiz",
        name: "Quiz",
        path: "/quiz/composting-easy",
        type: "quiz",
        description: "True/False – “Cooked food waste can be composted easily.”",
        hasActivity: false,
      }
    ]
  },
  {
    title: "Reduce, Reuse, Recycle",
    id: "reduce-reuse-recycle",
    sections: [
      {
        id: "3r-video",
        name: "Video",
        path: "/video/reduce-reuse-recycle",   // ✅
        type: "video",
        description: "Simple ways to reduce plastic, reuse items, and recycle effectively.",
        hasActivity: false,
        videoUrl: "https://res.cloudinary.com/dz5qcaurk/video/upload/v1757321034/3R_qgzpmt.mp4",
      },
      {
        id: "3r-content",
        name: "Content",
        path: "/content/reduce-reuse-recycle",
        type: "content",
        description: "Recycling symbols explained (plastic, paper, glass, metal).",
        hasActivity: true,
      },
      {
        id: "3r-activity",
        name: "Activity",
        path: "/activity/reduce-reuse-recycle",
        type: "activity",
        description: "Identify which items can be recycled in your city.",
        hasActivity: false,
      }
    ]
  },
  {
    title: "Community & Digital Participation",
    id: "community-digital",
    sections: [
      {
        id: "community-video",
        name: "Video",
        path: "/video/community-digital",   // ✅
        type: "video",
        description: "How citizens can report waste (photo apps, local movements).",
        hasActivity: false,
        videoUrl: "https://res.cloudinary.com/dz5qcaurk/video/upload/v1757321060/community_yzwdtm.mp4",
      },
      {
        id: "community-content",
        name: "Content",
        path: "/content/community-digital",
        type: "content",
        description: "Success stories (e.g., Yadgir city, Swachh Bharat initiatives).",
        hasActivity: false,
      },
      {
        id: "community-pledge",
        name: "Mini Pledge",
        path: "/pledge/community-digital",
        type: "pledge",
        description: "“I pledge to segregate waste daily.”",
        hasActivity: false,
      }
    ]
  },
  {
    title: "Final Quiz & Certification",
    id: "final-quiz",
    sections: [
      {
        id: "final-quiz",
        name: "Final Quiz",
        path: "/quiz/final",
        type: "quiz",
        description: "10–15 mixed questions (MCQs + scenarios). Passing Score: 70%.",
        hasActivity: false,
      },
      {
        id: "certificate",
        name: "Certificate",
        path: "/certificate",
        type: "certificate",
        description: "Digital Certificate of Completion issued.",
        hasActivity: false,
      }
    ]
  }
];

export default modulesData;
