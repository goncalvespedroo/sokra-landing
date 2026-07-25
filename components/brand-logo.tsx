import { cn } from "@/lib/utils";

type BrandLogoProps = {
  className?: string;
};

export function BrandLogo({ className }: BrandLogoProps) {
  return (
    <span
      className={cn("inline-flex items-baseline gap-2 text-foreground", className)}
      aria-label="Sokra"
    >
      <span className="font-serif text-[1.35rem] font-semibold tracking-[-0.03em]">
        Sokra
      </span>
      <span className="size-1.5 rounded-full bg-primary" aria-hidden="true" />
    </span>
  );
}
