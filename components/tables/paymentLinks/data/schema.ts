import { z } from "zod"

export const invoiceSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  expiredAt: z.string(),
  fields: z.any().optional(),
  amount: z.number(),
  price: z.number().optional(),
  status: z.string(),
  productId: z.string().optional(),
  projectId: z.string(),
  priceType: z.string()
})