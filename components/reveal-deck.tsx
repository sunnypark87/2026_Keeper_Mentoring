"use client";

import { useEffect, useRef, useState } from "react";
import type { RevealApi } from "reveal.js";

type RevealDeckProps = {
  children: React.ReactNode;
};

export function RevealDeck({ children }: RevealDeckProps) {
  const deckRef = useRef<HTMLDivElement>(null);
  const revealInstanceRef = useRef<RevealApi | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!deckRef.current || revealInstanceRef.current) {
      return;
    }

    let isMounted = true;

    const initializeDeck = async () => {
      try {
        const { default: Reveal } = await import("reveal.js");

        if (!deckRef.current || revealInstanceRef.current || !isMounted) {
          return;
        }

        const deck = new Reveal(deckRef.current, {
          embedded: true,
          controls: true,
          progress: true,
          center: false,
          hash: true,
          slideNumber: "c/t",
          transition: "slide",
          width: 1280,
          height: 720,
          margin: 0.06,
        });

        revealInstanceRef.current = deck;
        await deck.initialize();

        if (isMounted) {
          setIsReady(true);
        }
      } catch (error: unknown) {
        console.error("Reveal initialization failed", error);

        if (isMounted) {
          setIsReady(false);
        }
      }
    };

    void initializeDeck();

    return () => {
      isMounted = false;
      revealInstanceRef.current?.destroy();
      revealInstanceRef.current = null;
      setIsReady(false);
    };
  }, []);

  return (
    <div
      ref={deckRef}
      className={`reveal deck-frame ${isReady ? "is-ready" : "is-static"}`}
      data-ready={isReady}
    >
      <div className="slides">{children}</div>
    </div>
  );
}
