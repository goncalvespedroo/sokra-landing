"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, BookOpen, CircleHelp, Sparkles } from "lucide-react";

export function StudyNote() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.75, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden bg-ink text-background"
      aria-label="Exemplo de uma sessão de estudo com a Sokra"
    >
      <div className="grid min-h-[36rem] lg:grid-cols-[0.34fr_0.66fr]">
        <aside className="flex flex-col justify-between border-b border-background/15 p-6 lg:border-b-0 lg:border-r lg:p-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-background/55">
              <BookOpen className="size-4" />
              Sessão de estudo
            </div>
            <p className="mt-6 max-w-[15rem] text-sm leading-6 text-background/64">
              Funções matemáticas · Fundamentos
            </p>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-2 lg:grid-cols-1">
            {["Contexto", "Raciocínio", "Síntese"].map((item, index) => (
              <div
                key={item}
                className="flex items-center gap-3 border-t border-background/15 pt-3 text-xs text-background/55"
              >
                <span className={index === 1 ? "text-marker" : "text-background/35"}>0{index + 1}</span>
                <span className={index === 1 ? "text-background" : ""}>{item}</span>
              </div>
            ))}
          </div>
        </aside>

        <div className="flex flex-col p-6 sm:p-8 lg:p-10 xl:p-12">
          <div className="flex items-center justify-between text-xs text-background/48">
            <span>Progresso 2 de 4</span>
            <span className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-marker" />
              Sokra está acompanhando
            </span>
          </div>

          <div className="flex flex-1 flex-col justify-center py-12 lg:py-16">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-marker">
              <CircleHelp className="size-4" />
              Próxima pergunta
            </div>
            <h2 className="mt-5 max-w-4xl text-balance text-[clamp(2.4rem,5.6vw,5.8rem)] font-medium leading-[0.94] tracking-[-0.065em]">
              O que aconteceria se uma mesma entrada tivesse duas saídas?
            </h2>
          </div>

          <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
            <div className="border border-background/18 bg-background/[0.055] p-5 sm:p-6">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-background/45">
                <Sparkles className="size-4" />
                Seu raciocínio até aqui
              </div>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-background/78 sm:text-base">
                Uma função precisa associar cada valor de entrada a uma única saída. Se houver duas, essa relação deixa de cumprir a regra.
              </p>
            </div>
            <button
              type="button"
              className="grid size-14 place-items-center rounded-full bg-marker text-ink transition-transform hover:-translate-y-0.5 sm:size-16"
              aria-label="Continuar raciocínio"
            >
              <ArrowUpRight className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
