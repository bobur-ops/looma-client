import { SettingsButton } from "@/features/settings/components/settings-button";
import { ThemeToggle } from "@/features/theme/components/theme-toggle";
import { UserPopover } from "./components/user-popover";

export const Sidebar = () => {
  return (
    <aside className="relative h-full bg-sidebar">
      <div className="absolute right-2 top-2">
        <SettingsButton />
      </div>
      <div className="absolute left-2 top-2">
        <ThemeToggle />
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <UserPopover />
      </div>
    </aside>
  );
};
