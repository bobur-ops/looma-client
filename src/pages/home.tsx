import AppShell from "@/app/layouts/app-shell";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NoteList } from "@/features/notes/components/note-list";
import Workspace from "@/features/workspace/components/workspace";
import { Sidebar } from "@/widgets/sidebar";

export default function HomePage() {
  return (
    <AppShell>
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={10} maxSize={20} minSize={10}>
          <ScrollArea className="h-full">
            <Sidebar />
          </ScrollArea>
        </ResizablePanel>

        <ResizableHandle />

        <ResizablePanel defaultSize={90}>
          <ResizablePanelGroup direction="horizontal" className="h-full w-full">
            <ResizablePanel
              defaultSize={15}
              maxSize={40}
              minSize={10}
              collapsible={false}
            >
              <NoteList />
            </ResizablePanel>

            <ResizableHandle />

            <ResizablePanel defaultSize={85} collapsible={false}>
              <Workspace />
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </AppShell>
  );
}
