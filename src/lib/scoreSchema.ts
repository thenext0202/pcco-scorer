import { z } from "zod";

/**
 * Claude API 응답을 검증하기 위한 Zod 스키마
 * src/types/score.ts의 ScoreResult와 동일한 구조
 */

export const ScoreElementSchema = z.object({
  score: z.number().int().min(0).max(20),
  level: z.string(),
  detected: z.string().nullable(),
  feedback: z.string(),
});

export const BonusPenaltySchema = z.object({
  type: z.string(),
  points: z.number(),
  reason: z.string(),
});

// R-PCCO 프롬프트 채점 스키마
export const ScoreResultSchema = z.object({
  total_score: z.number().int().min(0).max(100),
  grade: z.enum(["S", "A", "B", "C", "D", "F"]),
  elements: z.object({
    role: ScoreElementSchema,
    purpose: ScoreElementSchema,
    context: ScoreElementSchema,
    constraints: ScoreElementSchema,
    output: ScoreElementSchema,
  }),
  bonuses: z.array(BonusPenaltySchema),
  penalties: z.array(BonusPenaltySchema),
  strengths: z.array(z.string()),
  improvements: z.array(z.string()),
  improved_example: z.string(),
});

export type ScoreResultValidated = z.infer<typeof ScoreResultSchema>;

// I-MRKO 지침 채점 스키마
export const InstructionScoreResultSchema = z.object({
  total_score: z.number().int().min(0).max(100),
  grade: z.enum(["S", "A", "B", "C", "D", "F"]),
  elements: z.object({
    identity: ScoreElementSchema,
    mission: ScoreElementSchema,
    rules: ScoreElementSchema,
    knowledge: ScoreElementSchema,
    output: ScoreElementSchema,
  }),
  bonuses: z.array(BonusPenaltySchema),
  penalties: z.array(BonusPenaltySchema),
  strengths: z.array(z.string()),
  improvements: z.array(z.string()),
  improved_example: z.string(),
});

export type InstructionScoreResultValidated = z.infer<
  typeof InstructionScoreResultSchema
>;
