import Link from "next/link";

const dimensions = {
  "Core Layer": [
    { name: "Evolution Loop", path: "/evolution-loop" },
    { name: "Meta Architecture", path: "/meta-architecture" },
  ],
  "Control Layer": [
    { name: "Core Engine", path: "/core-engine" },
    { name: "Agent Network", path: "/agent-network" },
    { name: "Sync Matrix", path: "/sync-matrix" },
  ],
  "Service Layer": [
    { name: "Rune System", path: "/rune-system" },
    { name: "Knowledge Hub", path: "/knowledge-hub" },
    { name: "Tagging System", path: "/tagging-system" },
  ],
  "Interface Layer": [
    { name: "Interface Protocol", path: "/interface-protocol" },
    { name: "Theme Engine", path: "/theme-engine" },
  ],
  "Boundary Layer": [
    { name: "Security Domain", path: "/security-domain" },
    { name: "Monitoring Body", path: "/monitoring-body" },
  ],
};

export function Sidebar() {
  return (
    <aside className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <span>JunAiKey #OmniKey</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {Object.entries(dimensions).map(([layer, dims]) => (
              <div key={layer} className="my-2">
                <h3 className="mb-1 px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">{layer}</h3>
                {dims.map((dim) => (
                  <Link
                    key={dim.name}
                    href={dim.path}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                  >
                    {dim.name}
                  </Link>
                ))}
              </div>
            ))}
          </nav>
        </div>
      </div>
    </aside>
  );
}
