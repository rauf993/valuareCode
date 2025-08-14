"use client";

import { useEffect, useRef } from "react";

export default function HomePage() {
  const layerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!layerRef.current) return;
      const y = window.scrollY * 0.5;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          layerRef.current!.style.transform = `translateY(${y}px)`;
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main className="relative min-h-screen text-white">
      <div
        ref={layerRef}
        className="pointer-events-none absolute inset-0 -z-10 h-[140vh] w-full bg-cover bg-center will-change-transform"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb')",
        }}
      />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-black/40" />

      <section className="flex h-screen flex-col items-center justify-center">
        <h1 className="text-5xl font-bold">Bienvenid@ 🚀</h1>
        <p className="mt-4 max-w-2xl text-center text-lg">
          Parallax con Next.js + Tailwind.
        </p>
      </section>

      <section className="bg-gray-900 px-6 py-16">
        <h2 className="mb-4 text-3xl font-semibold">Desplázate hacia abajo</h2>
        <div className="mx-auto max-w-3xl space-y-4">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis bibendum metus sed fermentum volutpat…
          </p>
          <p>
            Sigue haciendo scroll para ver cómo el fondo se mueve más lento que el contenido.
          </p>
          <div className="h-[150vh]" />
        </div>
      </section>
    </main>
  );
}
