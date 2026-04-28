import { z } from 'zod';
export const companySchema = z.object({ name: z.string().min(2).max(120), industry: z.string().max(120), employee_count: z.number().int().nonnegative(), countries_operating: z.array(z.string().min(2)) });
