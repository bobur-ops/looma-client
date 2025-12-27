import { EditableTitle } from "./editable-title";

export const WorkspaceHeader = () => {
  return (
    <div className="absolute z-10 left-0 right-0 top-0 border-b bg-background px-4 py-2">
      <EditableTitle />
    </div>
  );
};
