"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactFormValues } from "@/lib/contact-schema";
import { submitNetlifyForm } from "@/lib/netlify-forms";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";

const labelClass = "font-bold text-sm tracking-[.1em] uppercase";

export function ContactForm() {
  const { toast } = useToast();
  const [isPending, setIsPending] = useState(false);
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      eventDate: "",
      partySize: "",
      message: "",
      consent: false,
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsPending(true);
    try {
      await submitNetlifyForm("contact", {
        name: data.name,
        email: data.email,
        phone: data.phone ?? "",
        event_date: data.eventDate ?? "",
        party_size: data.partySize ?? "",
        message: data.message,
        consent: data.consent ? "yes" : "no",
      });
      toast({
        title: "Message sent!",
        description: "Thanks, darling. We'll be in touch soon.",
      });
      form.reset();
    } catch {
      toast({
        title: "Error",
        description: "Sorry, your message couldn't be sent. Please call or email us instead.",
        variant: "destructive",
      });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Form {...form}>
      <form name="contact" onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2 max-[600px]:grid-cols-1 gap-5">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelClass}>Name</FormLabel>
              <FormControl>
                <input placeholder="Your name" autoComplete="name" className="field" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelClass}>Email</FormLabel>
              <FormControl>
                <input type="email" placeholder="your@email.com" autoComplete="email" className="field" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelClass}>Phone <span className="font-normal normal-case tracking-normal">(optional)</span></FormLabel>
              <FormControl>
                <input type="tel" placeholder="772.555.0123" autoComplete="tel" className="field" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="eventDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelClass}>Event date <span className="font-normal normal-case tracking-normal">(optional)</span></FormLabel>
              <FormControl>
                <input type="date" className="field" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="partySize"
          render={({ field }) => (
            <FormItem className="col-span-full">
              <FormLabel className={labelClass}>Party size <span className="font-normal normal-case tracking-normal">(optional)</span></FormLabel>
              <FormControl>
                <input type="number" min={1} inputMode="numeric" placeholder="How many in your crew?" className="field" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="col-span-full">
              <FormLabel className={labelClass}>Message</FormLabel>
              <FormControl>
                <textarea
                  placeholder="Bachelorette? Birthday? Divorce? Tell us everything."
                  className="field min-h-[150px] resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="consent"
          render={({ field }) => (
            <FormItem className="col-span-full flex flex-row items-start space-x-3 space-y-0 border-2 border-ink p-4">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>I agree to the privacy policy</FormLabel>
                <FormDescription>
                  By checking this box, you agree to allow us to store and process your personal data.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        <button
          type="submit"
          disabled={isPending || !form.formState.isValid}
          className="btn-block col-span-full justify-self-center cursor-pointer"
        >
          {isPending ? "Sending..." : "Send It"}
        </button>
      </form>
    </Form>
  );
}
