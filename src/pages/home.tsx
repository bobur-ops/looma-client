import AppShell from "@/app/layouts/app-shell";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import Editor from "@/features/editor/components/Editor";
import { NoteList } from "@/features/notes/components/NoteList";
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
              <ScrollArea className="h-full">
                <main>
                  <Editor
                    value={`## 💼 Work Experience

### **Smart-Base** (Nov 2023 – Present)

**Frontend Developer** - Full-Time

Key contributions and responsibilities:

- Designed and evolved scalable frontend architecture for enterprise systems
- Refactored and optimized large legacy codebases to improve maintainability, performance, and stability
- Built modular, reusable components and internal UI patterns used across multiple applications
- Implemented complex user interfaces including analytical dashboards, data visualizations, and interactive maps
- Optimized rendering and data flow for applications working with large datasets and real-time updates
- Integrated frontend applications with internal APIs and real-time services
- Developed complex forms, filters, and validation logic for data-intensive workflows
- Participated in code reviews, mentored junior developers, and contributed to frontend development standards
- Collaborated closely with backend engineers, designers, and product managers on architectural and product decisions

**Technologies:<br />**
React, Typescript, Vite, Redux Toolkit, Zustand, TansStack Query, React Hook Form, Zod, Leaflet, data visualization libraries, WebSockets, TailwindCSS, SCSS, Git, CI/CD

---`}
                  />
                </main>
              </ScrollArea>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </AppShell>
  );
}
