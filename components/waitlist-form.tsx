"use client";

import { FormEvent, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Check, LoaderCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type FormStatus = "idle" | "loading" | "success";

type WaitlistResponse = {
  message?: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalizedEmail = email.trim().toLowerCase();
    const honeypot = new FormData(event.currentTarget).get("website");

    if (!EMAIL_PATTERN.test(normalizedEmail)) {
      setError("Digite um e-mail válido.");
      return;
    }

    setError("");
    setStatus("loading");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: normalizedEmail,
          website: typeof honeypot === "string" ? honeypot : "",
        }),
      });

      const data = (await response.json().catch(() => ({}))) as WaitlistResponse;

      if (!response.ok) {
        throw new Error(data.message || "Não foi possível concluir sua inscrição.");
      }

      setEmail(normalizedEmail);
      setStatus("success");
    } catch (submissionError) {
      setStatus("idle");
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "Não foi possível concluir sua inscrição. Tente novamente.",
      );
    }
  }

  function resetForm() {
    setEmail("");
    setError("");
    setStatus("idle");
  }

  return (
    <div id="waitlist" className="scroll-mt-28">
      <AnimatePresence mode="wait" initial={false}>
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="flex min-h-[7.5rem] items-start gap-4 border-t border-foreground/25 pt-5"
            role="status"
            aria-live="polite"
          >
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
              <Check className="size-4" strokeWidth={2.5} />
            </span>
            <div>
              <p className="text-lg font-semibold tracking-[-0.025em]">Seu lugar foi reservado.</p>
              <p className="mt-1 max-w-md text-sm leading-6 text-muted-foreground">
                As próximas novidades da Sokra serão enviadas para{" "}
                <strong className="font-semibold text-foreground">{email}</strong>.
              </p>
              <button
                type="button"
                onClick={resetForm}
                className="mt-2 text-xs font-semibold text-primary underline decoration-primary/35 underline-offset-4 hover:decoration-primary"
              >
                Usar outro e-mail
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            noValidate
          >
            <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
              <label htmlFor="website">Não preencha este campo</label>
              <input
                id="website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <div className="flex flex-col gap-2.5 sm:flex-row">
              <div className="min-w-0 flex-1">
                <label htmlFor="email" className="sr-only">
                  Seu e-mail
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="Seu melhor e-mail"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    if (error) setError("");
                  }}
                  disabled={status === "loading"}
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? "email-error" : "email-note"}
                  className="h-14 rounded-full border-foreground/30 bg-paper px-5 text-base shadow-none"
                />
              </div>
              <Button
                type="submit"
                size="lg"
                disabled={status === "loading"}
                className="h-14 rounded-full px-6 sm:min-w-48"
              >
                {status === "loading" ? (
                  <>
                    <LoaderCircle className="animate-spin" />
                    Reservando
                  </>
                ) : (
                  <>
                    Garantir acesso
                    <ArrowRight />
                  </>
                )}
              </Button>
            </div>

            <div className="mt-2 min-h-5" aria-live="polite">
              {error ? (
                <p id="email-error" className="text-xs font-semibold text-destructive">
                  {error}
                </p>
              ) : (
                <p id="email-note" className="text-xs text-muted-foreground">
                  Convites e atualizações do projeto. Sem spam.
                </p>
              )}
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
