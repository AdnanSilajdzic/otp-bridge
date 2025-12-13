"use client";
import Link from "next/link";
import { BookOpen, Info, Github, Home } from "lucide-react";
import { usePathname } from "next/navigation";

export function Navigation() {
  const pathName = usePathname();
  const navigationLinks = [
    {
      name: "Home",
      icon: () => <Home className="w-4 h-4" />,
      url: "/",
    },
    {
      name: "Guide",
      icon: () => <BookOpen className="w-4 h-4" />,
      url: "/guide",
    },
    {
      name: "About",
      icon: () => <Info className="w-4 h-4" />,
      url: "/about",
    },
    {
      name: "GitHub",
      icon: () => <Github className="w-4 h-4" />,
      url: "https://github.com/AdnanSilajdzic/otp-bridge",
      target: "_blank",
    },
  ];

  return (
    <nav className="flex justify-center gap-6 w-full flex-wrap">
      {navigationLinks.map((link, index) => {
        return (
          <Link
            key={index}
            href={link.url}
            className="flex items-center gap-2 text-muted-foreground transition-all duration-300 hover:text-foreground"
            target={link.target ? link.target : "_self"}
            hidden={link.url === pathName}
          >
            {link.icon()}
            <span>{link.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}
