"use client";

import { FormEvent, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Check, LoaderCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type FormStatus = "idle" | "loading" | "success";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalizedEmail = email.trim().toLowerCase();

    if (!EMAIL_PATTERN.test(normalizedEmail)) {
      setError("Digite um e-mail válido.");
      return;
    }

    setError("");
    setStatus("loading");

    // Estado visual de demonstração. Substitua por uma Server Action ou rota de API.
    await new Promise((resolve) => setTimeout(resolve, 1100));

    setStatus("success");
  }

  function resetForm() {
    setEmail("");
    setError("");
    setStatus("idle");
  }

  return (
    <Card id="waitlist" className="scroll-mt-24 rounded-none border-foreground/15 bg-transparent shadow-none">
      <CardContent className="p-5 sm:p-6">
        <AnimatePresence mode="wait" initial={false}>
          {status === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="flex min-h-24 items-start gap-4"
              role="status"
              aria-live="polite"
            >
              <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full border border-sage-dark/25 bg-sage/15 text-sage-dark">
                <Check className="size-4" strokeWidth={2.4} />
              </span>
              <div>
                <p className="font-serif text-xl font-semibold">Acesso reservado.</p>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  As novidades da Sokra serão enviadas para <strong className="font-medium text-foreground">{email}</strong>.
                </p>
                <button
                  type="button"
                  onClick={resetForm}
                  className="mt-2 text-xs font-semibold text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary"
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
              <div className="mb-4">
                <p className="text-sm font-semibold text-foreground">Receba um convite para testar a Sokra</p>
                <p className="mt-1 text-sm leading-5 text-muted-foreground">
                  Acesso antecipado para estudantes e educadores.
                </p>
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
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      if (error) setError("");
                    }}
                    disabled={status === "loading"}
                    aria-invalid={Boolean(error)}
                    aria-describedby={error ? "email-error" : undefined}
                    className="rounded-md bg-background"
                  />
                </div>
                <Button type="submit" size="lg" disabled={status === "loading"} className="rounded-md sm:min-w-52">
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
                  <p id="email-error" className="text-xs font-medium text-destructive">
                    {error}
                  </p>
                ) : (
                  <p className="text-xs text-muted-foreground">Sem spam. Apenas convites e atualizações do projeto.</p>
                )}
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
