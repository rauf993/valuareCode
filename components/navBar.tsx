"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NAV = [
  { href: "/", label: "Home" },      
  { href: "/about", label: "About" },
  { href: "/services", label: "Servicios" },
  { href: "/contact", label: "Contacto" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 transition-all",
        scrolled
          ? "bg-background/70 backdrop-blur border-b border-border/60"
          : "bg-transparent",
      ].join(" ")}
    >
      <nav className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
 
          <Link href="/" className="font-semibold">
            <span className="text-primary">N</span>exa
          </Link>

  
          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden rounded-xl p-2 hover:bg-foreground/10"
            aria-label="Abrir menú"
          >
            <div className="grid h-5 w-6 gap-1.5">
              <span className="block h-0.5 w-full bg-foreground" />
              <span className="block h-0.5 w-full bg-foreground" />
              <span className="block h-0.5 w-full bg-foreground" />
            </div>
          </button>


          <ul className="hidden items-center gap-1 md:flex">
            {NAV.map((item) => {
              const active =
                pathname === item.href ||
                pathname.startsWith(item.href + "/");
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    data-active={active}
                    className="rounded-xl px-3 py-2 text-sm font-medium hover:bg-foreground/10 data-[active=true]:bg-primary/15 data-[active=true]:text-primary"
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {open && (
          <ul className="flex flex-col gap-1 pb-4 md:hidden">
            {NAV.map((item) => {
              const active =
                pathname === item.href ||
                pathname.startsWith(item.href + "/");
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    data-active={active}
                    className="block rounded-xl px-3 py-2 text-base hover:bg-foreground/10 data-[active=true]:bg-primary/15 data-[active=true]:text-primary"
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </nav>
    </header>
  );
}
