import CompilerView from "../components/CompilerView";

export default function EditorPage() {
  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="absolute inset-0 top-16 overflow-hidden pointer-events-none">
        <div className="absolute -inset-[10px] opacity-30">
          <div className="absolute inset-0 bg-gradient-to-r from-chart-1 to-chart-2 animate-pulse" style={{ filter: 'blur(100px)' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-chart-3 rounded-full mix-blend-multiply animate-blob" style={{ filter: 'blur(100px)' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-chart-4 rounded-full mix-blend-multiply animate-blob animation-delay-2000" style={{ filter: 'blur(100px)' }} />
        </div>
      </div>
      <CompilerView />
    </div>
  );
} 