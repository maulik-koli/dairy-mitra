import { z } from "zod";

export const intentSchema = z.enum(["new_subscription", "pause", "quantity_change", "cancel"]);

export const customerSchema = z.object({
  id: z.string(),
  name: z.string(),
  nameAliases: z.array(z.string()),
  product: z.string(),
  quantityLiters: z.number(),
  frequency: z.enum(["daily", "alternate", "one_time"]),
  ratePerLiter: z.number(),
  billing: z.enum(["monthly", "daily_cash"]),
  status: z.string()
});

export const extractSuccessSchema = z.object({
  ok: z.literal(true),
  intent: intentSchema,
  confidence: z.number().min(0).max(1),
  customer: z.object({
    name: z.string(),
    matchedCustomerId: z.string().nullable()
  }),
  fields: z.object({
    product: z.string().nullable().optional(),
    quantityLiters: z.number().nullable().optional(),
    oldQuantityLiters: z.number().nullable().optional(),
    frequency: z.enum(["daily", "alternate", "one_time"]).nullable().optional(),
    startDate: z.string().nullable().optional(),
    effectiveDate: z.string().nullable().optional(),
    pauseDates: z.array(z.string()).nullable().optional(),
    reason: z.string().nullable().optional(),
    ratePerLiter: z.number().nullable().optional(),
    billing: z.enum(["monthly", "daily_cash"]).nullable().optional(),
    status: z.string().nullable().optional()
  }),
  whatsappMessageGu: z.string(),
  notes: z.string().nullable().optional()
});

export const extractFailureSchema = z.object({
  ok: z.literal(false),
  code: z.enum(["UNKNOWN_CUSTOMER", "INVALID_INPUT", "MODEL_ERROR"]),
  message: z.string()
});

export const extractRequestSchema = z.object({
  text: z.string().trim().min(1)
});

export type Intent = z.infer<typeof intentSchema>;
export type Customer = z.infer<typeof customerSchema>;
export type ExtractSuccess = z.infer<typeof extractSuccessSchema>;
export type ExtractFailure = z.infer<typeof extractFailureSchema>;
export type ExtractResponse = ExtractSuccess | ExtractFailure;
