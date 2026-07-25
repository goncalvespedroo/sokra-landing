"use client";

import { motion, useReducedMotion } from "motion/react";

import { StudyNote } from "@/components/study-note";
import { WaitlistForm } from "@/components/waitlist-form";

const steps = [
  {
    number: "01",
    title: "Parta da dúvida",
    text: "Escreva uma questão, um exercício ou um conceito que ainda não está claro.",
  },
  {
    number: "02",
    title: "Organize o raciocínio",
    text: "A Sokra devolve perguntas curtas para revelar o que você já sabe e onde está a dificuldade.",
  },
  {
    number: "03",
    title: "Chegue à compreensão",
    text: "Você constrói a resposta e registra o caminho que fez sentido para aprender de verdade.",
  },
];

const principles = [
  "Perguntas antes de explicações",
  "Ritmo definido pelo estudante",
  "Feedback claro e gradual",
  "Aprendizado que pode ser revisitado",
];

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <main id="inicio">
      <section className="border-b border-border">
        <div className="mx-auto grid min-h-[calc(100svh-4rem)] max-w-6xl items-center gap-14 px-5 py-16 sm:px-8 lg:grid-cols-[1.02fr_0.98fr] lg:gap-20 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Tutor de estudo baseado no método socrático
            </p>

            <h1 className="mt-6 text-balance font-serif text-[clamp(3.3rem,7.5vw,6.4rem)] font-medium leading-[0.92] tracking-[-0.055em]">
              Aprender começa com uma boa pergunta.
            </h1>

            <p className="mt-7 max-w-xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              A Sokra transforma dúvidas em conversas de estudo. Em vez de entregar respostas prontas, ela organiza seu raciocínio e conduz você até a compreensão.
            </p>

            <div className="mt-9 max-w-xl">
              <WaitlistForm />
            </div>

            <p className="mt-5 max-w-lg text-sm leading-6 text-muted-foreground">
              Feita para quem quer estudar com autonomia, clareza e menos dependência de memorização.
            </p>
          </motion.div>

          <StudyNote />
        </div>
      </section>

      <section id="metodo" className="scroll-mt-20 border-b border-border bg-paper">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
          <div className="grid gap-8 border-b border-foreground/12 pb-10 md:grid-cols-[0.7fr_1.3fr] md:items-end">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Como funciona</p>
            <h2 className="max-w-2xl font-serif text-[clamp(2.3rem,5vw,4.2rem)] leading-[1.02] tracking-[-0.04em]">
              Um processo simples para pensar com mais profundidade.
            </h2>
          </div>

          <div className="grid divide-y divide-foreground/12 md:grid-cols-3 md:divide-x md:divide-y-0">
            {steps.map((step, index) => (
              <motion.article
                key={step.number}
                initial={{ opacity: 0, y: reduceMotion ? 0 : 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: reduceMotion ? 0 : 0.5, delay: index * 0.08 }}
                className="py-8 md:px-7 md:first:pl-0 md:last:pr-0"
              >
                <span className="font-serif text-sm italic text-primary">{step.number}</span>
                <h3 className="mt-8 font-serif text-2xl font-semibold tracking-[-0.02em]">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{step.text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="principios" className="scroll-mt-20 border-b border-border">
        <div className="mx-auto grid max-w-6xl gap-14 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Princípios</p>
            <h2 className="mt-5 max-w-md font-serif text-[clamp(2.4rem,5vw,4.1rem)] leading-[1.02] tracking-[-0.04em]">
              Estudar com direção, não com atalhos.
            </h2>
          </div>

          <div className="border-t border-foreground/15">
            {principles.map((principle, index) => (
              <motion.div
                key={principle}
                initial={{ opacity: 0, x: reduceMotion ? 0 : -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.65 }}
                transition={{ duration: reduceMotion ? 0 : 0.45, delay: index * 0.06 }}
                className="grid grid-cols-[2rem_1fr] items-center gap-4 border-b border-foreground/15 py-5"
              >
                <span className="font-serif text-sm italic text-primary">0{index + 1}</span>
                <p className="font-serif text-xl sm:text-2xl">{principle}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-foreground text-background">
        <div className="mx-auto flex max-w-6xl flex-col gap-5 px-5 py-10 sm:flex-row sm:items-end sm:justify-between sm:px-8">
          <div>
            <p className="font-serif text-2xl">Sokra.</p>
            <p className="mt-2 text-sm text-background/60">Aprenda pensando, não decorando.</p>
          </div>
          <a href="#inicio" className="text-sm text-background/60 transition-colors hover:text-background">
            Voltar ao início ↑
          </a>
        </div>
      </footer>
    </main>
  );
}
