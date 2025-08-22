"use client";

import AuthButton from "@/components/AuthButton";
import AgentChat from "@/components/AgentChat";
import { useAuth } from "@/context/AuthContext";

export default function Home() {
  const { user, loading } = useAuth();

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 flex items-center justify-between w-full h-16 px-4 border-b shrink-0 bg-background/95 backdrop-blur-sm md:px-6">
        <h1 className="text-xl font-bold">JunAiKey Terminus Matrix</h1>
        <AuthButton />
      </header>
      <main className="flex-1 flex flex-col items-center justify-center p-8">
        {loading ? (
          <p>Loading...</p>
        ) : user ? (
          <AgentChat />
        ) : (
          <div className="text-center">
            <h2 className="text-4xl font-bold">Welcome</h2>
            <p className="text-muted-foreground">
              Please log in to access the system.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
