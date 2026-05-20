import { useState, useCallback } from "react";
import { useReducedMotion } from "framer-motion";

interface ShareLinkProps {
  url: string;
  title?: string;
  text?: string;
}

function isTouchDevice(): boolean {
  if (typeof window === "undefined" || typeof navigator === "undefined") return false;
  return window.matchMedia("(pointer: coarse)").matches || navigator.maxTouchPoints > 0;
}

export function ShareLink({ url, title, text }: ShareLinkProps) {
  const [copied, setCopied] = useState(false);
  const shouldReduce = useReducedMotion();

  const handleShare = useCallback(async () => {
    const mobile = isTouchDevice();
    if (mobile && typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ url, title, text });
      } catch {
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
    }
  }, [url, title, text]);

  return (
    <div className="text-center" style={{ marginTop: "96px" }}>
      <button
        type="button"
        onClick={handleShare}
        aria-label={copied ? "Link copied to clipboard" : "Share this entry"}
        style={{
          fontFamily: "var(--font-mono, monospace)",
          fontSize: "13px",
          color: copied ? "#B8471C" : "#5C5750",
          cursor: "pointer",
          background: "none",
          border: "none",
          padding: 0,
          transition: shouldReduce ? "none" : "color 200ms ease",
          borderRadius: "2px",
        }}
        className="share-link-button"
      >
        {copied ? "Link copied" : "Share this →"}
      </button>
      <style>{`
        .share-link-button:hover {
          color: #B8471C !important;
        }
        .share-link-button:focus-visible {
          outline: 1px solid #B8471C;
          outline-offset: 2px;
        }
      `}</style>
    </div>
  );
}
