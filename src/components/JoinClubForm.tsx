"use client";

import { useState, type FormEvent } from "react";
import { submitNetlifyForm } from "@/lib/netlify-forms";
import { useToast } from "@/hooks/use-toast";

type Status = "idle" | "sending" | "joined";

export function JoinClubForm() {
  const { toast } = useToast();
  const [status, setStatus] = useState<Status>("idle");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    setStatus("sending");
    try {
      await submitNetlifyForm("born-dirty-club", data);
      setStatus("joined");
      form.reset();
    } catch {
      setStatus("idle");
      toast({
        title: "Something went wrong",
        description: "We couldn't sign you up just now. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <form
      name="born-dirty-club"
      onSubmit={onSubmit}
      className="grid grid-cols-2 max-[860px]:grid-cols-1 gap-3.5 max-w-[560px] mx-auto"
    >
      {/* Honeypot: hidden from people, filled in by spam bots */}
      <input type="text" name="bot-field" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <input name="first_name" placeholder="First name" aria-label="First name" autoComplete="given-name" className="field" />
      <input name="last_name" placeholder="Last name" aria-label="Last name" autoComplete="family-name" className="field" />
      <input name="email" type="email" required placeholder="Email" aria-label="Email" autoComplete="email" className="field" />
      <input
        name="birthday"
        placeholder="Birthday (MM/DD)"
        aria-label="Birthday (MM/DD)"
        pattern="(0?[1-9]|1[0-2])/(0?[1-9]|[12][0-9]|3[01])"
        title="Use MM/DD, like 07/04"
        className="field"
      />
      <button
        type="submit"
        disabled={status !== "idle"}
        className="btn-block col-span-full justify-self-center mt-2 cursor-pointer"
      >
        {status === "joined" ? "Welcome to the club" : status === "sending" ? "Joining..." : "Join the Club"}
      </button>
    </form>
  );
}
