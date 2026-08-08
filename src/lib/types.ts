export type Role = "ADMIN" | "ANALYST" | "VIEWER";

export type Sentiment = "POSITIVE" | "NEUTRAL" | "NEGATIVE";

export type FeedbackSource = "EMAIL" | "SURVEY" | "APP_REVIEW" | "SUPPORT_TICKET" | "SALES_CALL" | "MANUAL";

export interface Workspace {
  id: string;
  name: string;
  plan: "Starter" | "Growth" | "Enterprise";
  createdAt: string;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatarColor: string;
}

export interface Theme {
  id: string;
  name: string;
  description: string;
  color: string;
  feedbackCount: number;
  trend: number; // % change week over week
}

export interface FeedbackItem {
  id: string;
  text: string;
  customer: string;
  company: string;
  source: FeedbackSource;
  sentiment: Sentiment;
  themeIds: string[];
  createdAt: string;
  priority: "Low" | "Medium" | "High";
}

export interface ReportSection {
  heading: string;
  body: string;
}

export interface Report {
  id: string;
  title: string;
  period: string;
  generatedAt: string;
  stats: {
    totalFeedback: number;
    sentimentSplit: { positive: number; neutral: number; negative: number };
    topThemes: { name: string; count: number }[];
  };
  narrative: ReportSection[];
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: { id: string; snippet: string }[];
}
