import { FeedbackItem, Theme, TeamMember, Workspace, Report } from "./types";

export const workspace: Workspace = {
  id: "ws_nimbus",
  name: "Nimbus Analytics",
  plan: "Growth",
  createdAt: "2025-11-02",
};

export const team: TeamMember[] = [
  { id: "u1", name: "Shipra Gupta", email: "shipra@nimbus.io", role: "ADMIN", avatarColor: "#3B5BFF" },
  { id: "u2", name: "Arjun Mehta", email: "arjun@nimbus.io", role: "ANALYST", avatarColor: "#1FAA59" },
  { id: "u3", name: "Kavya Rao", email: "kavya@nimbus.io", role: "ANALYST", avatarColor: "#C98A1F" },
  { id: "u4", name: "Dev Singh", email: "dev@nimbus.io", role: "VIEWER", avatarColor: "#E2492D" },
];

export const themes: Theme[] = [
  { id: "t1", name: "Onboarding friction", description: "New users struggle in first-run setup", color: "#3B5BFF", feedbackCount: 41, trend: 12 },
  { id: "t2", name: "Pricing confusion", description: "Unclear plan tiers and seat-based billing", color: "#C98A1F", feedbackCount: 27, trend: -6 },
  { id: "t3", name: "Slow report exports", description: "PDF/CSV export times out on large datasets", color: "#E2492D", feedbackCount: 33, trend: 24 },
  { id: "t4", name: "Loved: Ask LOOP chat", description: "Users praise the natural-language insight search", color: "#1FAA59", feedbackCount: 52, trend: 18 },
  { id: "t5", name: "Integration requests", description: "Requests for Zendesk, Intercom, HubSpot connectors", color: "#8A5BFF", feedbackCount: 19, trend: 9 },
  { id: "t6", name: "Mobile experience", description: "Dashboard not usable on small screens", color: "#2AA1B0", feedbackCount: 15, trend: -3 },
];

export const feedback: FeedbackItem[] = [
  { id: "f1", text: "Took me 25 minutes just to invite my team and connect our first data source. The setup wizard skips explaining what a 'workspace' even is.", customer: "Meera Iyer", company: "Kestrel Foods", source: "SUPPORT_TICKET", sentiment: "NEGATIVE", themeIds: ["t1"], createdAt: "2026-08-05", priority: "High" },
  { id: "f2", text: "Ask LOOP genuinely saved me an afternoon — asked it 'what are churn risks this month' and got a real answer with sources, not a canned dashboard.", customer: "Rohan Das", company: "Vertex Labs", source: "APP_REVIEW", sentiment: "POSITIVE", themeIds: ["t4"], createdAt: "2026-08-04", priority: "Low" },
  { id: "f3", text: "Exporting our Q2 feedback report as PDF times out every single time once we cross ~2k rows. Had to split it into four exports.", customer: "Priya Nair", company: "Orbital Health", source: "SUPPORT_TICKET", sentiment: "NEGATIVE", themeIds: ["t3"], createdAt: "2026-08-04", priority: "High" },
  { id: "f4", text: "Not clear if Analyst seats count toward our 10-seat cap or if Viewers are free. Billing page doesn't say.", customer: "Karan Bhatia", company: "Loopwave", source: "EMAIL", sentiment: "NEUTRAL", themeIds: ["t2"], createdAt: "2026-08-03", priority: "Medium" },
  { id: "f5", text: "Would love a native Zendesk sync so tickets flow straight into the inbox instead of a CSV import every Friday.", customer: "Anita Verma", company: "Skyline CRM", source: "SALES_CALL", sentiment: "NEUTRAL", themeIds: ["t5"], createdAt: "2026-08-03", priority: "Medium" },
  { id: "f6", text: "The trends page on my phone is basically unusable, charts overflow off screen and I can't pinch to zoom.", customer: "Tanvi Shah", company: "Kestrel Foods", source: "APP_REVIEW", sentiment: "NEGATIVE", themeIds: ["t6"], createdAt: "2026-08-02", priority: "Medium" },
  { id: "f7", text: "Our CS team finally has one inbox instead of five spreadsheets. The auto-theming caught a billing complaint pattern we'd completely missed.", customer: "Farhan Ali", company: "Orbital Health", source: "SALES_CALL", sentiment: "POSITIVE", themeIds: ["t4", "t1"], createdAt: "2026-08-02", priority: "Low" },
  { id: "f8", text: "Second time this week a large export just spins forever with no error and no progress bar.", customer: "Neha Kulkarni", company: "Vertex Labs", source: "SUPPORT_TICKET", sentiment: "NEGATIVE", themeIds: ["t3"], createdAt: "2026-08-01", priority: "High" },
  { id: "f9", text: "Signed up on the Growth plan thinking it included unlimited themes, support said that's actually Enterprise-only. Would've liked that upfront.", customer: "Vikram Chauhan", company: "Loopwave", source: "EMAIL", sentiment: "NEGATIVE", themeIds: ["t2"], createdAt: "2026-08-01", priority: "Medium" },
  { id: "f10", text: "Setup checklist is great once you find it, but it's buried under Settings instead of showing on first login.", customer: "Ishaan Kapoor", company: "Skyline CRM", source: "SURVEY", sentiment: "NEUTRAL", themeIds: ["t1"], createdAt: "2026-07-31", priority: "Medium" },
  { id: "f11", text: "Asked Ask LOOP to summarize last week's negative feedback by theme and it nailed it in one prompt, cited the actual tickets too.", customer: "Sanya Malhotra", company: "Orbital Health", source: "APP_REVIEW", sentiment: "POSITIVE", themeIds: ["t4"], createdAt: "2026-07-31", priority: "Low" },
  { id: "f12", text: "Would pay more for an Intercom + HubSpot combo integration, right now we're stitching things together manually.", customer: "Aditya Rao", company: "Vertex Labs", source: "SALES_CALL", sentiment: "NEUTRAL", themeIds: ["t5"], createdAt: "2026-07-30", priority: "Low" },
];

export const weeklyVolume = [
  { week: "Wk 27", positive: 18, neutral: 9, negative: 6 },
  { week: "Wk 28", positive: 21, neutral: 11, negative: 8 },
  { week: "Wk 29", positive: 19, neutral: 10, negative: 12 },
  { week: "Wk 30", positive: 26, neutral: 12, negative: 9 },
  { week: "Wk 31", positive: 24, neutral: 8, negative: 15 },
  { week: "Wk 32", positive: 29, neutral: 13, negative: 11 },
];

export const reports: Report[] = [
  {
    id: "r1",
    title: "Weekly Digest — Aug 4",
    period: "Jul 28 – Aug 4, 2026",
    generatedAt: "2026-08-04",
    stats: {
      totalFeedback: 66,
      sentimentSplit: { positive: 29, neutral: 13, negative: 24 },
      topThemes: [
        { name: "Loved: Ask LOOP chat", count: 14 },
        { name: "Slow report exports", count: 11 },
        { name: "Onboarding friction", count: 9 },
      ],
    },
    narrative: [
      {
        heading: "Overview",
        body: "Feedback volume held steady week over week. Sentiment tilted positive overall, driven largely by praise for the Ask LOOP chat feature, though export reliability complaints grew sharply and now warrant an engineering look.",
      },
      {
        heading: "What's working",
        body: "Ask LOOP mentions are up double digits, with customers specifically calling out cited, sourced answers as a differentiator versus static dashboards.",
      },
      {
        heading: "What needs attention",
        body: "Report export timeouts on large datasets appeared in four separate high-priority tickets this week, all from customers exporting more than 2,000 rows. This is the fastest-growing negative theme and worth prioritizing before it affects renewal conversations.",
      },
    ],
  },
];

export function getFeedbackByTheme(themeId: string) {
  return feedback.filter((f) => f.themeIds.includes(themeId));
}
