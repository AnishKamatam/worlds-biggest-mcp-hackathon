import { mcp } from '@anthropic-ai/claude-code';

export const PersonalAssistant = mcp
  .task("Handle voice requests for sending emails")
  .withAgents({
    email: mcp.agent("EmailAgent").can("send an email given a recipient, subject, and body"),
  });
