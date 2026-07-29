"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowDownRight, ArrowRight } from "lucide-react";

import Image from "next/image";
import { StudyNote } from "@/components/study-note";
import { WaitlistForm } from "@/components/waitlist-form";

const steps = [
  {
    number: "01",
    title: "Conte onde travou",
    text: "Comece com uma dúvida, questão ou conceito que ainda não fez sentido para você.",
  },
  {
    number: "02",
    title: "Pense em voz alta",
    text: "A Sokra faz perguntas curtas para revelar o que você já sabe e onde está a lacuna.",
  },
  {
    number: "03",
    title: "Construa a resposta",
    text: "Você chega à compreensão pelo próprio raciocínio e registra um caminho que pode revisitar.",
  },
];

const principles = [
  {
    index: "01",
    title: "Perguntas antes de explicações",
    text: "A resposta pronta só aparece quando ela realmente ajuda — nunca antes do seu raciocínio.",
  },
  {
    index: "02",
    title: "Um ritmo que respeita você",
    text: "A conversa avança por etapas, sem pressa artificial e sem transformar estudo em competição.",
  },
  {
    index: "03",
    title: "Clareza sobre onde está a dificuldade",
    text: "A Sokra identifica a lacuna por trás do erro e direciona a próxima pergunta para ela.",
  },
  {
    index: "04",
    title: "Aprendizado que permanece",
    text: "Seu caminho de raciocínio vira material de revisão, não apenas uma resposta perdida no histórico.",
  },
];

const motivation = [
  {
    title: "Menos dependência",
    text: "O Sokra não transforma toda dúvida em uma resposta pronta. Ela oferece perguntas, pistas e contrapontos na medida certa, para que você avance sem depender de uma ferramenta para resolver cada novo problema.",
  },

  {
    title: "Mais consciência",
    text: "Ao explicar, comparar e justificar suas ideias, você percebe não apenas que errou, mas onde o raciocínio começou a falhar. O erro deixa de ser um resultado final e passa a ser parte do aprendizado.",
  },

  {
    title: "Revisão com contexto",
    text: "O Sokra considera os assuntos em que você teve dificuldade, os caminhos que tentou e os padrões que aparecem nos seus erros. Assim, revisar deixa de ser apenas repetir conteúdo e passa a ser reconstruir o que ainda não ficou claro.",
  }
];

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <main id="inicio">
      <section className="border-b border-foreground/15">
        <div className="mx-auto max-w-[96rem] px-5 pb-10 pt-12 sm:px-8 sm:pb-14 sm:pt-16 lg:px-10 lg:pb-20 lg:pt-20">
          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between gap-5 border-t border-foreground/25 pt-4 text-xs font-semibold uppercase tracking-[0.17em]">
              <span>Tutor de estudo socrático</span>
              <span className="hidden text-muted-foreground sm:block">Acesso antecipado · 2026</span>
            </div>

            <h1 className="mt-9 max-w-[87rem] text-balance text-[clamp(4rem,10.5vw,10rem)] font-medium leading-[0.84] tracking-[-0.08em]">
              Aprender não é receber uma resposta.
            </h1>
          </motion.div>

          <div className="mt-12 grid gap-10 border-t border-foreground/25 pt-6 lg:grid-cols-[0.52fr_0.48fr] lg:gap-20 lg:pt-8">
            <motion.div
              initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.55, delay: 0.12 }}
              className="max-w-xl"
            >
              <p className="text-pretty text-xl leading-8 tracking-[-0.025em] sm:text-2xl sm:leading-9">
                A Sokra transforma sua dúvida em uma conversa de estudo e conduz você até a compreensão — uma pergunta por vez.
              </p>
              <a
                href="#proposta"
                className="mt-7 inline-flex items-center gap-2 text-sm font-semibold underline decoration-foreground/25 underline-offset-4 transition-colors hover:decoration-foreground"
              >
                Entender a proposta
                <ArrowDownRight className="size-4" />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.55, delay: 0.2 }}
            >
              <p className="mb-4 text-sm font-semibold tracking-[-0.01em]">Receba um convite para testar primeiro.</p>
              <WaitlistForm />
            </motion.div>
          </div>

          <div className="mt-14 sm:mt-20">
            <StudyNote />
          </div>
        </div>
      </section>

      <section
        id="proposta"
        className="bg-ink text-background"
      >
        <div className="mx-auto max-w-[96rem] px-5 sm:px-8 lg:px-10">
          <div className="grid min-h-[38rem] border-b border-background/15 lg:grid-cols-[0.42fr_0.58fr]">
            {/* Coluna esquerda */}
            <div className="flex flex-col py-16 lg:pr-14">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-marker">
                Por que Sokra
              </p>

              <div className="flex flex-1 items-center justify-center py-12">
                <Image
                  src="/logoSokra.png"
                  alt="Ilustração do Sokra"
                  width={900}
                  height={900}
                  priority
                  className="h-auto w-full max-w-[28rem] object-contain"
                />
              </div>
            </div>

            {/* Coluna direita */}
            <div className="flex flex-col justify-center py-16 lg:pl-16">
              <h2 className="max-w-4xl text-balance text-[clamp(3.5rem,6vw,7rem)] font-medium leading-[0.92] tracking-[-0.07em]">
                Se alguém pensa por você, quem está aprendendo?
              </h2>

              <p className="mt-8 max-w-2xl text-base leading-7 text-background/60 sm:text-lg sm:leading-8">
                Sokra vem de socrático. Inspirada no método de Sócrates, ela não
                começa entregando respostas. Começa fazendo perguntas. Cada interação
                ajuda você a explicar o que entendeu, perceber contradições e construir
                o próximo passo do próprio raciocínio.
              </p>
            </div>
          </div>

          <div className="mt-20 grid border-t border-background/20 md:grid-cols-3 md:divide-x md:divide-background/20">
            {motivation.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: reduceMotion ? 0 : 0.45, delay: index * 0.08 }}
                className="border-b border-background/20 py-7 md:border-b-0 md:px-7 md:first:pl-0 md:last:pr-0"
              >
                <span className="text-xs text-marker">0{index + 1}</span>
                <p className="mt-10 text-2xl font-medium tracking-[-0.04em] sm:text-3xl">{item.title}</p>
                <p className="mt-5 max-w-md text-base leading-relaxed text-background/70">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="metodo" className="scroll-mt-20 border-b border-foreground/15 bg-paper">
        <div className="mx-auto max-w-[96rem] px-5 py-20 sm:px-8 sm:py-28 lg:px-10 lg:py-32">
          <div className="grid gap-8 border-b border-foreground/25 pb-10 lg:grid-cols-[0.38fr_0.62fr] lg:items-end">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Como funciona</p>
            <h2 className="max-w-5xl text-balance text-[clamp(3rem,6.8vw,7rem)] font-medium leading-[0.91] tracking-[-0.07em]">
              Uma conversa simples, com intenção em cada etapa.
            </h2>
          </div>

          <div>
            {steps.map((step, index) => (
              <motion.article
                key={step.number}
                initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: reduceMotion ? 0 : 0.45, delay: index * 0.06 }}
                className="grid gap-5 border-b border-foreground/20 py-8 md:grid-cols-[0.16fr_0.36fr_0.48fr] md:items-start md:py-10"
              >
                <span className="text-sm font-semibold text-primary">{step.number}</span>
                <h3 className="text-2xl font-medium tracking-[-0.045em] sm:text-3xl">{step.title}</h3>
                <p className="max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">{step.text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="principios" className="scroll-mt-20 border-b border-foreground/15">
        <div className="mx-auto max-w-[96rem] px-5 py-20 sm:px-8 sm:py-28 lg:px-10 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.38fr_0.62fr] lg:gap-24">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Princípios</p>
              <h2 className="mt-6 max-w-lg text-balance text-[clamp(2.8rem,5.5vw,5.7rem)] font-medium leading-[0.93] tracking-[-0.065em]">
                Tecnologia a serviço da aprendizagem.
              </h2>
            </div>

            <div className="border-t border-foreground/25">
              {principles.map((principle, index) => (
                <motion.article
                  key={principle.index}
                  initial={{ opacity: 0, x: reduceMotion ? 0 : -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.45 }}
                  transition={{ duration: reduceMotion ? 0 : 0.42, delay: index * 0.05 }}
                  className="grid gap-4 border-b border-foreground/20 py-7 sm:grid-cols-[3rem_1fr] sm:gap-6 sm:py-8"
                >
                  <span className="text-xs font-semibold text-primary">{principle.index}</span>
                  <div>
                    <h3 className="text-2xl font-medium tracking-[-0.045em] sm:text-3xl">{principle.title}</h3>
                    <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">{principle.text}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-[96rem] px-5 py-20 sm:px-8 sm:py-28 lg:px-10 lg:py-32">
          <div className="flex items-start justify-between gap-8 border-t border-primary-foreground/30 pt-5 text-xs font-semibold uppercase tracking-[0.18em]">
            <span>Acesso antecipado</span>
            <span className="hidden sm:block">Para estudantes e educadores</span>
          </div>
          <div className="mt-12 grid gap-12 lg:grid-cols-[0.72fr_0.28fr] lg:items-end">
            <h2 className="max-w-5xl text-balance text-[clamp(3.4rem,8vw,8.5rem)] font-medium leading-[0.87] tracking-[-0.075em]">
              Estude com respostas que começam em você.
            </h2>
            <div>
              <p className="max-w-sm text-base leading-7 text-primary-foreground/68">
                Entre na waitlist para acompanhar o desenvolvimento e receber um convite para os primeiros testes.
              </p>
              <a
                href="#waitlist"
                className="mt-8 inline-flex items-center gap-3 rounded-full bg-marker px-6 py-4 text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5"
              >
                Garantir meu acesso
                <ArrowRight className="size-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-ink text-background">
        <div className="mx-auto flex max-w-[96rem] flex-col gap-8 px-5 py-10 sm:flex-row sm:items-end sm:justify-between sm:px-8 lg:px-10">
          <div>
            <p className="text-2xl font-semibold tracking-[-0.05em]">Sokra.</p>
            <p className="mt-2 text-sm text-background/52">Aprenda pensando, não apenas respondendo.</p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-background/55">
            <a href="#proposta" className="transition-colors hover:text-background">Por que Sokra</a>
            <a href="#metodo" className="transition-colors hover:text-background">Como funciona</a>
            <a href="#inicio" className="transition-colors hover:text-background">Voltar ao topo ↑</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
