import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name"),
  email: z.string().trim().email("Please enter a valid email address"),
  phone: z.string().trim().optional(),
  eventDate: z.string().trim().optional(),
  partySize: z.string().trim().optional(),
  message: z.string().trim().min(1, "Please tell us a little about your party"),
  consent: z.boolean(),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
