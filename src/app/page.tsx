import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl">Welcome to JunAiKey #OmniKey</CardTitle>
          <CardDescription>
            The Terminus Matrix awaits your command.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            This is the central interface for the Quantum Codex Edition of the Omni-System.
            Use the sidebar to navigate through the 12 core functional dimensions of the matrix.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
