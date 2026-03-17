export const CLIENT_CONFIG = {
  brand: {
    name: "Superpower Mentors",
    logoUrl: "/logo.jpg",
    primaryColor: "#2244EE",
    primaryColorLight: "#EEF2FF",
    primaryColorDark: "#1A33CC",
    fontHeading: "Inter",
    fontBody: "Inter",
  },
  quiz: {
    headline: "Find Out If Your Child Qualifies for 1-on-1 Mentorship",
    subheadline: "Answer 3 quick questions to see if Superpower Mentors is the right fit for your family.",
    questions: [
      {
        key: "q1",
        text: "What best describes your child's situation?",
        options: [
          { id: "a", label: "Diagnosed with ADHD",                          points: 3 },
          { id: "b", label: "Diagnosed with Dyslexia or reading challenges", points: 3 },
          { id: "c", label: "On the Autism spectrum",                        points: 3 },
          { id: "d", label: "Other learning differences / not yet diagnosed", points: 2 },
        ],
      },
      {
        key: "q2",
        text: "How old is your child?",
        options: [
          { id: "a", label: "5–8 years old",   points: 2 },
          { id: "b", label: "9–12 years old",  points: 3 },
          { id: "c", label: "13–17 years old", points: 3 },
          { id: "d", label: "18+ years old",   points: 1 },
        ],
      },
      {
        key: "q3",
        text: "What is your biggest concern right now?",
        options: [
          { id: "a", label: "Falling behind academically",                     points: 3 },
          { id: "b", label: "Struggling with confidence and self-esteem",       points: 3 },
          { id: "c", label: "Social challenges and making friends",             points: 2 },
          { id: "d", label: "Finding the right support — nothing has worked",   points: 3 },
        ],
      },
    ],
    thresholds: {
      high: 8,
      mid: 5,
    },
    calendars: {
      high: "https://cal.com/superpower-mentors/discovery-call",
      mid:  "https://cal.com/superpower-mentors/intro-call",
      low:  "https://cal.com/superpower-mentors/learn-more",
    },
  },
  webhook: {
    url: "https://hooks.zapier.com/hooks/catch/YOUR_HOOK_ID",
  },
  meta: {
    title: "Apply | Superpower Mentors",
    description: "Find out if your child qualifies for 1-on-1 mentorship with Superpower Mentors.",
    faviconUrl: "/favicon.ico",
  },
};
