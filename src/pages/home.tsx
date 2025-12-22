import Editor from "@/features/editor/components/Editor";
import { useState } from "react";

export default function HomePage() {
  const [md, setMd] = useState(
    "# Hello\n## Hello\n### Hello\n\nType **markdown** here.\n"
  );

  return (
    <div className="font-mono h-dvh grid grid-cols-12">
      <div className="col-span-6 p-4 max-h-dvh overflow-y-auto">
        <div className="text-sm opacity-70 mb-2">Raw value</div>
        <pre className="text-base whitespace-pre-wrap">{md}</pre>
      </div>
      <div className="col-span-6 max-h-dvh overflow-y-auto">
        <div className="border-l h-full">
          <Editor value={md} onChange={setMd} className="shadow-sm" />
        </div>
      </div>
    </div>
  );
}
