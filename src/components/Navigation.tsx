import Link from "next/link";
import { BookOpen, Info, Github } from "lucide-react";

export function Navigation() {
  return (
    <nav className="flex justify-center gap-6 w-full flex-wrap">
      <Link
        href="/guide"
        className="flex items-center gap-2 text-muted-foreground transition-all duration-300 hover:text-foreground"
      >
        <BookOpen className="w-4 h-4" />
        <span>Guide</span>
      </Link>
      <Link
        href="/about"
        className="flex items-center gap-2 text-muted-foreground transition-all duration-300 hover:text-foreground"
      >
        <Info className="w-4 h-4" />
        <span>About</span>
      </Link>
      <a
        href="https://github.com/AdnanSilajdzic/otp-bridge"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="flex items-center gap-2 text-muted-foreground transition-all duration-300 hover:text-foreground cursor-pointer">
          <Github className="w-4 h-4" />
          <span>GitHub</span>
        </div>
      </a>
    </nav>
  );
}
