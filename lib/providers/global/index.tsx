import { TooltipProvider } from "@/lib/components/ui/tooltip";
import { ThemeProvider } from "@/lib/providers/theme-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <TooltipProvider>{children}</TooltipProvider>
    </ThemeProvider>
  );
}
