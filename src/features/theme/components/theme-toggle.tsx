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
        <Button size={"icon-lg"} onClick={toggleTheme} variant={"ghost"}>
          <MoonIcon className="size-6" />
        </Button>
      );
    }

    if (theme === "dark") {
      return (
        <Button size={"icon-lg"} onClick={toggleTheme} variant={"ghost"}>
          <SunIcon className="size-6" />
        </Button>
      );
    }
  }, [theme, toggleTheme]);

  return <div>{renderTheme}</div>;
}
