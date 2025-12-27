import { cn } from "@/lib/utils";

type SpinnerProps = {
  size?: number;
  color?: string;
  className?: string;
};

function Spinner({
  className,
  size = 20,
  color = "var(--primary)",
}: SpinnerProps) {
  return (
    <span
      className={cn("loader", className)}
      style={
        {
          "--spinner-size": `${size}px`,
          "--spinner-color": color,
        } as React.CSSProperties
      }
    />
  );
}

export { Spinner };
