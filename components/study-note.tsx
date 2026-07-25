"use client";

import { motion, useReducedMotion } from "motion/react";

const answers = [
  "É uma relação entre dois conjuntos.",
  "Cada valor de entrada leva a uma única saída.",
];

export function StudyNote() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.7, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto w-full max-w-[31rem]"
      aria-label="Exemplo de uma conversa de estudo com a Sokra"
    >
      <div className="absolute -left-3 top-8 hidden h-[calc(100%-4rem)] w-px bg-primary/25 sm:block" />
      <div className="border border-foreground/15 bg-paper px-6 py-7 shadow-[0_22px_60px_-45px_rgba(20,30,38,0.45)] sm:px-9 sm:py-9">
        <div className="flex items-center justify-between border-b border-foreground/10 pb-4 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          <span>Caderno de raciocínio</span>
          <span>01 / 03</span>
        </div>

        <div className="pt-7">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
            Tema · Funções
          </p>
          <h2 className="mt-3 font-serif text-[clamp(1.75rem,4vw,2.35rem)] leading-tight tracking-[-0.025em]">
            O que precisa ser verdade para que uma relação seja uma função?
          </h2>

          <div className="mt-8 border-l-2 border-primary/25 pl-4">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              O que você já sabe
            </p>
            <div className="mt-3 space-y-3">
              {answers.map((answer, index) => (
                <motion.p
                  key={answer}
                  initial={{ opacity: 0, x: reduceMotion ? 0 : -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.45, delay: 0.55 + index * 0.18 }}
                  className="text-sm leading-6 text-foreground/78"
                >
                  {answer}
                </motion.p>
              ))}
            </div>
          </div>

          <div className="mt-8 bg-secondary/70 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
              Próxima pergunta
            </p>
            <p className="mt-2 font-serif text-lg leading-snug">
              E o que aconteceria se uma mesma entrada tivesse duas saídas?
            </p>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-2" aria-hidden="true">
            <span className="h-1 bg-primary" />
            <span className="h-1 bg-foreground/12" />
            <span className="h-1 bg-foreground/12" />
          </div>
        </div>
      </div>

      <p className="mt-3 text-right text-xs italic text-muted-foreground">
        Um passo de cada vez, sem respostas prontas.
      </p>
    </motion.div>
  );
}
