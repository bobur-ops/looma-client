import { SettingsButton } from "@/features/settings/components/settings-button";
import { ThemeToggle } from "@/features/theme/components/theme-toggle";

export const Sidebar = () => {
  return (
    <aside className="relative">
      <div className="absolute right-2 top-2">
        <SettingsButton />
      </div>
      <div className="absolute left-2 top-2">
        <ThemeToggle />
      </div>
    </aside>
  );
};
