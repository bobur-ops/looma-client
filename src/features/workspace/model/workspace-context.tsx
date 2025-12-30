import type { EditorHandle } from "@/features/editor/components/Editor";
import type { EditorCommand } from "@/features/editor/lib/commands";
import {
  createContext,
  useContext,
  useRef,
  type PropsWithChildren,
} from "react";

type WorkspaceContextType = {
  editorRef: React.RefObject<EditorHandle | null>;
  executeCommand: (command: EditorCommand) => void;
};

const WorkspaceContext = createContext<null | WorkspaceContextType>(null);

export const WorkspaceProvider = ({ children }: PropsWithChildren) => {
  const editorRef = useRef<EditorHandle>(null);

  const executeCommand = (command: EditorCommand) => {
    editorRef.current?.executeCommand(command);
  };

  return (
    <WorkspaceContext.Provider value={{ editorRef, executeCommand }}>
      {children}
    </WorkspaceContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useWorkspaceEditor = () => {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error(
      "useWorkspaceEditor must be used within a WorkspaceProvider"
    );
  }

  return context;
};
