import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";

export const SettingsButton = () => {
  return (
    <Button size={"icon-lg"} variant={"ghost"}>
      <Settings className="size-6" />
    </Button>
  );
};
