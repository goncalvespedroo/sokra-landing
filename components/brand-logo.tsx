import { cn } from "@/lib/utils";

type BrandLogoProps = {
  className?: string;
  inverted?: boolean;
};

export function BrandLogo({ className, inverted = false }: BrandLogoProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 text-xl font-semibold tracking-[-0.055em]",
        inverted ? "text-background" : "text-foreground",
        className,
      )}
      aria-label="Sokra"
    >
      <span>Sokra</span>
      <span
        className={cn("size-2 rounded-full", inverted ? "bg-marker" : "bg-primary")}
        aria-hidden="true"
      />
    </span>
  );
}
