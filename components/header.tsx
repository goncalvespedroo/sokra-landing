"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";

import { BrandLogo } from "@/components/brand-logo";
import { Button } from "@/components/ui/button";

const navigation = [
  { label: "Por que Sokra", href: "#proposta" },
  { label: "Como funciona", href: "#metodo" },
  { label: "Princípios", href: "#principios" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-foreground/15 bg-background/92 backdrop-blur-xl">
      <div className="mx-auto flex h-[4.5rem] max-w-[96rem] items-center justify-between px-5 sm:px-8 lg:px-10">
        <a
          href="#inicio"
          className="rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4"
        >
          <BrandLogo />
        </a>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Navegação principal">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium tracking-[-0.01em] text-foreground/66 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="hidden rounded-full px-5 sm:inline-flex">
            <a href="#waitlist">Entrar na waitlist</a>
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="rounded-full lg:hidden"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            onClick={() => setOpen((current) => !current)}
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="overflow-hidden border-t border-foreground/15 bg-background lg:hidden"
          >
            <nav className="mx-auto grid max-w-[96rem] gap-1 px-5 py-5 sm:px-8" aria-label="Navegação móvel">
              {navigation.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-foreground/10 px-1 py-4 text-lg font-medium tracking-[-0.025em]"
                >
                  {item.label}
                </a>
              ))}
              <Button asChild className="mt-4 rounded-full sm:hidden">
                <a href="#waitlist" onClick={() => setOpen(false)}>
                  Entrar na waitlist
                </a>
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
