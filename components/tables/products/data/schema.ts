import { z } from "zod"

export const productSchema = z.object({
  id: z.string(),
  title: z.string(),
  price: z.number(),
  category: z.string().optional(),
  img: z.string().optional(),
  about: z.string().optional(),
})