import AppShell from "@/app/layouts/app-shell";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sidebar } from "@/widgets/sidebar";

export default function HomePage() {
  return (
    <AppShell>
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={5} maxSize={20} minSize={7}>
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
              <ScrollArea className="h-full">
                <section className="space-y-2 p-2">
                  {Array.from({ length: 50 }).map((_, i) => (
                    <div key={i} className="">
                      Note {i + 1}
                    </div>
                  ))}
                </section>
              </ScrollArea>
            </ResizablePanel>

            <ResizableHandle />

            <ResizablePanel defaultSize={85} collapsible={false}>
              <ScrollArea className="h-full">
                <main className="p-2 ">
                  <h1 className="text-2xl font-bold mb-4">Editor</h1>
                  <p>
                    This is the big important panel where actual work allegedly
                    happens.
                  </p>
                </main>
              </ScrollArea>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </AppShell>
  );
}
