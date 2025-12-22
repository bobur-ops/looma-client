import { Button } from "@/components/ui/button";
import { useTheme } from "./theme-provider";
import { useCallback, useMemo } from "react";
import { MoonIcon, SunIcon } from "lucide-react";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  const toggleTheme = useCallback(() => {
    setTheme(theme === "light" ? "dark" : "light");
  }, [theme, setTheme]);

  const renderTheme = useMemo(() => {
    if (theme === "light") {
      return (
        <Button size={"icon"} onClick={toggleTheme}>
          <MoonIcon className="size-5" />
        </Button>
      );
    }

    if (theme === "dark") {
      return (
        <Button size={"icon"} onClick={toggleTheme}>
          <SunIcon className="size-5" />
        </Button>
      );
    }
  }, [theme, toggleTheme]);

  return <div>{renderTheme}</div>;
}
