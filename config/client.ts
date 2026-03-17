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
        text: "How old is your child?",
        options: [
          { id: "a", label: "9–11 years old",  points: 1 },
          { id: "b", label: "12–14 years old", points: 3 },
          { id: "c", label: "15–18 years old", points: 3 },
          { id: "d", label: "18–22 years old", points: 2 },
          { id: "e", label: "23–25+",          points: 1 },
        ],
      },
      {
        key: "q2",
        text: "What are you hoping to get help with right now?",
        options: [
          { id: "a", label: "College transition & independence",      points: 3 },
          { id: "b", label: "Executive function & time management",   points: 3 },
          { id: "c", label: "ADHD or dyslexia support",              points: 3 },
          { id: "d", label: "Motivation & confidence",               points: 2 },
          { id: "e", label: "Anxiety & stress",                      points: 2 },
          { id: "f", label: "Other",                                 points: 1 },
        ],
      },
      {
        key: "q3",
        text: "If this feels like the right fit, are you prepared to invest in a mentoring program for your teen?",
        options: [
          { id: "a", label: "Yes — ready to invest",                                    points: 4 },
          { id: "b", label: "Exploring options — possibly depending on fit",             points: 2 },
          { id: "c", label: "I'd like to learn about scholarship opportunities",         points: 0 },
        ],
      },
    ],
    thresholds: {
      high: 8,
      mid: 4,
    },
    calEmbed: {
      namespace: "super-power-mentors",
      calLink: "adamwolfe/super-power-mentors",
      brandColor: "#3764de",
    },
    calendars: {
      high: "https://app.cal.com/adamwolfe/super-power-mentors",
      mid:  "https://app.cal.com/adamwolfe/super-power-mentors",
      low:  "https://app.cal.com/adamwolfe/super-power-mentors",
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
