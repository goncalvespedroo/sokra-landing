"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  BookOpen,
  Check,
  CircleHelp,
  RotateCcw,
  Sparkles,
} from "lucide-react";

type StudyStage = "Contexto" | "Raciocínio" | "Síntese";

type DemoOption = {
  label: string;
  insight: string;
  nextStep?: number;
  completes?: boolean;
};

type DemoStep = {
  stage: StudyStage;
  eyebrow: string;
  context?: string;
  question: string;
  options: DemoOption[];
};



const stages: StudyStage[] = ["Contexto", "Raciocínio", "Síntese"];

const demoSteps: DemoStep[] = [
  {
    stage: "Contexto",
    eyebrow: "Observe a situação",
    context:
      "Uma máquina recebe o número 4 e devolve 8. Em outro momento, ela recebe novamente o número 4 e devolve 12.",
    question: "O que chama sua atenção nessa relação?",
    options: [
      {
        label: "A mesma entrada produziu resultados diferentes.",
        insight:
          "Você percebeu que o número 4 foi usado como entrada duas vezes, mas produziu resultados diferentes.",
        nextStep: 1,
      },
      {
        label: "O número 4 simplesmente apareceu duas vezes.",
        insight:
          "A repetição não é o problema principal. Observe o que aconteceu com as saídas dessa entrada.",
        nextStep: 1,
      },
      {
        label: "Não parece existir nada de estranho.",
        insight:
          "Compare os dois resultados produzidos quando a mesma entrada foi utilizada.",
        nextStep: 1,
      },
    ],
  },
  {
    stage: "Raciocínio",
    eyebrow: "Construa uma hipótese",
    question:
      "Se a mesma entrada puder produzir duas saídas, ainda conseguimos prever o resultado?",
    options: [
      {
        label: "Sim, porque as duas saídas continuam sendo válidas.",
        insight:
          "Mas, ao receber a entrada 4, como saberíamos se o resultado seria 8 ou 12?",
        nextStep: 2,
      },
      {
        label: "Não, porque não saberíamos qual saída esperar.",
        insight:
          "Exatamente. A mesma entrada deixaria de possuir um resultado determinado.",
        nextStep: 2,
      },
      {
        label: "Ainda não tenho certeza.",
        insight:
          "Imagine que você conhece apenas a entrada 4. Sem outra informação, seria possível escolher entre 8 e 12?",
        nextStep: 2,
      },
    ],
  },
  {
    stage: "Raciocínio",
    eyebrow: "Questione a regra",
    question: "Essa relação ainda poderia ser considerada uma função?",
    options: [
      {
        label: "Sim, porque ainda existem entradas e saídas.",
        insight:
          "Ter entradas e saídas não é suficiente. Uma função também precisa determinar uma única saída para cada entrada.",
        nextStep: 3,
      },
      {
        label: "Não, porque uma entrada deveria ter uma única saída.",
        insight:
          "Você identificou a regra fundamental que diferencia uma função de outras relações.",
        nextStep: 3,
      },
      {
        label: "Dependeria dos números utilizados.",
        insight:
          "A regra não depende dos números específicos, mas da relação estabelecida entre cada entrada e sua saída.",
        nextStep: 3,
      },
    ],
  },
  {
    stage: "Síntese",
    eyebrow: "Formule sua conclusão",
    question: "Qual definição representa melhor o que você descobriu?",
    options: [
      {
        label: "Uma função relaciona qualquer entrada a várias saídas.",
        insight:
          "Essa definição permitiria resultados imprevisíveis para uma mesma entrada.",
        completes: true,
      },
      {
        label: "Uma função associa cada entrada a uma única saída.",
        insight:
          "Você chegou à ideia central: cada entrada de uma função deve estar associada a uma única saída.",
        completes: true,
      },
      {
        label: "Uma função é qualquer conjunto formado por números.",
        insight:
          "Uma função não é definida apenas pelos elementos, mas pela forma como entradas e saídas se relacionam.",
        completes: true,
      },
    ],
  },
];

type StudyNoteProps = {
  waitlistId?: string;
};

export function StudyNote({ waitlistId = "waitlist" }: StudyNoteProps) {
  const reduceMotion = useReducedMotion();

  const [started, setStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [completed, setCompleted] = useState(false);
  const [insight, setInsight] = useState(
    "Observe a situação e escolha a hipótese que mais se aproxima do que você pensou.",
  );

  const step = demoSteps[currentStep];
  const currentStageIndex = stages.indexOf(step.stage);

  function handleOptionSelect(option: DemoOption, optionIndex: number) {
    if (selectedOption !== null) {
      return;
    }

    setSelectedOption(optionIndex);
    setInsight(option.insight);

    window.setTimeout(
      () => {
        if (option.completes) {
          setCompleted(true);
          return;
        }

        setCurrentStep(option.nextStep ?? currentStep + 1);
        setSelectedOption(null);
      },
      reduceMotion ? 0 : 550,
    );
  }

  function restartDemo() {
    setCurrentStep(0);
    setSelectedOption(null);
    setCompleted(false);
    setInsight(
      "Observe a situação e escolha a hipótese que mais se aproxima do que você pensou.",
    );
  }

  function scrollToWaitlist() {
    const waitlist = document.getElementById(waitlistId);

    if (waitlist) {
      waitlist.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "center",
      });
    }
  }

  return (
    <motion.section
      initial={{
        opacity: 0,
        y: reduceMotion ? 0 : 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: reduceMotion ? 0 : 0.75,
        delay: 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative overflow-hidden bg-ink text-background"
      aria-label="Demonstração de uma sessão de estudo com o Sokra"
    >
      <AnimatePresence>
        {!started && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: reduceMotion ? 0 : 0.45,
            }}
            className="absolute inset-0 z-20 flex items-center justify-center bg-ink/55 px-6 py-12 backdrop-blur-[2px]"
          >
            <motion.div
              initial={{
                opacity: 0,
                y: reduceMotion ? 0 : 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: reduceMotion ? 0 : -12,
              }}
              transition={{
                duration: reduceMotion ? 0 : 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mx-auto max-w-5xl text-center"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-marker">
                Experiência guiada
              </p>

              <h2 className="mt-6 text-balance text-[clamp(2.8rem,7vw,7rem)] font-medium leading-[0.91] tracking-[-0.07em] text-background">
                Uma resposta pronta termina o processo. <h2>A pergunta certa começa.</h2>
              </h2>

              <p className="mx-auto mt-6 max-w-xl text-sm leading-6 text-background/65 sm:text-base">
                Experimente como o Sokra conduz você até uma conclusão sem
                simplesmente entregar a resposta.
              </p>

              <button
                type="button"
                onClick={() => setStarted(true)}
                className="group mx-auto mt-9 flex min-h-14 items-center gap-4 rounded-full bg-marker px-7 text-sm font-semibold text-ink transition hover:-translate-y-0.5"
              >
                Começar sessão guiada

                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </button>

              <p className="mt-4 text-xs text-background/40">
                4 perguntas · menos de 1 minuto
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        aria-hidden={!started}
        className={[
          "transition-[filter,opacity] duration-700",
          started
            ? "blur-0 opacity-100"
            : "pointer-events-none select-none blur-[3px] opacity-35",
        ].join(" ")}
      >
        <div className="grid min-h-[42rem] lg:grid-cols-[0.3fr_0.7fr]">

          <aside className="flex flex-col justify-between border-b border-background/15 p-6 lg:border-b-0 lg:border-r lg:p-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-background/55">
                <BookOpen className="size-4" />
                Sessão de estudo
              </div>

              <p className="mt-6 max-w-[15rem] text-sm leading-6 text-background/64">
                Funções matemáticas · Fundamentos
              </p>

              <p className="mt-3 max-w-[16rem] text-xs leading-5 text-background/40">
                Uma pequena demonstração de como o Sokra conduz o raciocínio.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-2 lg:grid-cols-1">
              {stages.map((stage, index) => {
                const isActive = index === currentStageIndex;
                const isCompleted = index < currentStageIndex || completed;

                return (
                  <div
                    key={stage}
                    className="flex items-center gap-3 border-t border-background/15 pt-3 text-xs"
                  >
                    <span
                      className={
                        isActive
                          ? "text-marker"
                          : isCompleted
                            ? "text-background/65"
                            : "text-background/30"
                      }
                    >
                      0{index + 1}
                    </span>

                    <span
                      className={
                        isActive
                          ? "text-background"
                          : isCompleted
                            ? "text-background/65"
                            : "text-background/45"
                      }
                    >
                      {stage}
                    </span>

                    {isCompleted && !isActive && (
                      <Check className="ml-auto size-3.5 text-marker" />
                    )}
                  </div>
                );
              })}
            </div>
          </aside>

          <div className="flex flex-col p-6 sm:p-8 lg:p-10 xl:p-12">
            <div className="flex items-center justify-between gap-4 text-xs text-background/48">
              <span>
                {completed
                  ? "Demonstração concluída"
                  : `Progresso ${currentStep + 1} de ${demoSteps.length}`}
              </span>

              <span className="flex items-center gap-2 text-right">
                <span className="size-1.5 shrink-0 rounded-full bg-marker" />
                Demonstração guiada
              </span>
            </div>

            <div className="flex flex-1 flex-col justify-center py-10 lg:py-14">
              <AnimatePresence mode="wait">
                {!completed ? (
                  <motion.div
                    key={currentStep}
                    initial={{
                      opacity: 0,
                      y: reduceMotion ? 0 : 14,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      y: reduceMotion ? 0 : -10,
                    }}
                    transition={{
                      duration: reduceMotion ? 0 : 0.35,
                    }}
                  >
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-marker">
                      <CircleHelp className="size-4" />
                      {step.eyebrow}
                    </div>

                    {step.context && (
                      <p className="mt-6 max-w-3xl text-sm leading-6 text-background/58 sm:text-base">
                        {step.context}
                      </p>
                    )}

                    <h2 className="mt-5 max-w-5xl text-balance text-[clamp(2.3rem,5vw,5.4rem)] font-medium leading-[0.96] tracking-[-0.06em]">
                      {step.question}
                    </h2>
                  </motion.div>
                ) : (
                  <motion.div
                    key="completed"
                    initial={{
                      opacity: 0,
                      y: reduceMotion ? 0 : 14,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: reduceMotion ? 0 : 0.45,
                    }}
                  >
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-marker">
                      <Sparkles className="size-4" />
                      Síntese concluída
                    </div>

                    <h2 className="mt-5 max-w-5xl text-balance text-[clamp(2.3rem,5vw,5.4rem)] font-medium leading-[0.96] tracking-[-0.06em]">
                      Você chegou à definição sem recebê-la pronta.
                    </h2>

                    <p className="mt-6 max-w-2xl text-base leading-7 text-background/62">
                      O Sokra não substitui seu raciocínio. Ele faz as perguntas
                      necessárias para que você consiga construí-lo.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div>
              <AnimatePresence mode="wait">
                {!completed ? (
                  <motion.div
                    key={`options-${currentStep}`}
                    initial={{
                      opacity: 0,
                      y: reduceMotion ? 0 : 12,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                    }}
                    transition={{
                      duration: reduceMotion ? 0 : 0.3,
                    }}
                  >
                    <div
                      className="border border-background/18 bg-background/[0.055] p-5 sm:p-6"
                      aria-live="polite"
                    >
                      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-background/45">
                        <Sparkles className="size-4" />
                        Seu raciocínio até aqui
                      </div>

                      <p className="mt-3 max-w-3xl text-sm leading-6 text-background/78 sm:text-base">
                        {insight}
                      </p>
                    </div>

                    <div className="mt-3 grid gap-2">
                      {step.options.map((option, index) => {
                        const isSelected = selectedOption === index;
                        const anotherOptionWasSelected =
                          selectedOption !== null && !isSelected;

                        return (
                          <button
                            key={option.label}
                            type="button"
                            disabled={selectedOption !== null}
                            onClick={() => handleOptionSelect(option, index)}
                            className={[
                              "group flex w-full items-center justify-between gap-6 border px-5 py-4 text-left text-sm leading-6 transition sm:px-6 sm:text-base",
                              isSelected
                                ? "border-marker bg-marker text-ink"
                                : "border-background/15 bg-transparent text-background/76 hover:border-background/40 hover:bg-background/[0.045] hover:text-background",
                              anotherOptionWasSelected
                                ? "opacity-35"
                                : "opacity-100",
                            ].join(" ")}
                          >
                            <span>{option.label}</span>

                            <span
                              className={[
                                "grid size-9 shrink-0 place-items-center rounded-full border transition",
                                isSelected
                                  ? "border-ink/20 bg-ink text-marker"
                                  : "border-background/20 group-hover:border-background/50",
                              ].join(" ")}
                            >
                              {isSelected ? (
                                <Check className="size-4" />
                              ) : (
                                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                              )}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="result"
                    initial={{
                      opacity: 0,
                      y: reduceMotion ? 0 : 12,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: reduceMotion ? 0 : 0.35,
                    }}
                  >
                    <div className="border border-marker/40 bg-marker/10 p-5 sm:p-6">
                      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-marker">
                        <Check className="size-4" />
                        Sua conclusão
                      </div>

                      <p className="mt-3 max-w-3xl text-base leading-7 text-background">
                        Uma função associa cada valor de entrada a uma única
                        saída.
                      </p>
                    </div>

                    <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                      <button
                        type="button"
                        onClick={scrollToWaitlist}
                        className="group flex min-h-14 flex-1 items-center justify-between gap-4 bg-marker px-5 py-3 text-sm font-semibold text-ink transition hover:brightness-95 sm:px-6"
                      >
                        Quero estudar assim

                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                      </button>

                      <button
                        type="button"
                        onClick={restartDemo}
                        className="flex min-h-14 items-center justify-center gap-2 border border-background/18 px-5 py-3 text-sm text-background/70 transition hover:border-background/40 hover:text-background"
                      >
                        <RotateCcw className="size-4" />
                        Refazer demonstração
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </motion.section>
  );
}