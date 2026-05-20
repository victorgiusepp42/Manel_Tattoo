import { useEffect, useRef, useState, type CSSProperties } from "react";
import { instagramUrl, whatsappUrl } from "../data/site";
import { useSocialFloatLayout } from "../hooks/useSocialFloatLayout";
import { cn } from "../lib/cn";
import { InstagramIcon } from "./icons/InstagramIcon";
import { WhatsAppIcon } from "./icons/WhatsAppIcon";

function floatStyle(
  mode: ReturnType<typeof useSocialFloatLayout>["mode"],
  parkedTop?: number,
): CSSProperties | undefined {
  if (mode === "parked" && parkedTop !== undefined) {
    return { position: "absolute", top: `${parkedTop}px`, bottom: "auto" };
  }
  return undefined;
}

export function SocialFloats() {
  const measureRef = useRef<HTMLAnchorElement>(null);
  const [buttonHeight, setButtonHeight] = useState(0);
  const { mode, parkedTop } = useSocialFloatLayout(buttonHeight);
  const visible = mode !== "hidden";

  useEffect(() => {
    const el = measureRef.current;
    if (!el) return;

    const measure = () => setButtonHeight(el.offsetHeight);
    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const posStyle = floatStyle(mode, parkedTop);

  return (
    <>
      <a
        ref={measureRef}
        href={instagramUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "social-float ig-float",
          visible && "social-float--visible",
          mode === "fixed" && "social-float--fixed",
          mode === "parked" && "social-float--parked",
        )}
        style={posStyle}
        aria-label="Chamar no Instagram"
        aria-hidden={!visible}
        tabIndex={visible ? 0 : -1}
      >
        <span className="social-float__pulse" aria-hidden="true" />
        <InstagramIcon className="social-float__icon" />
        <span className="social-float__label hidden sm:inline">Instagram</span>
      </a>
      <a
        href={whatsappUrl("Oi! Vi o site da Manel Tattoo e quero saber mais.")}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "social-float wa-float",
          visible && "social-float--visible",
          mode === "fixed" && "social-float--fixed",
          mode === "parked" && "social-float--parked",
        )}
        style={posStyle}
        aria-label="Falar no WhatsApp"
        aria-hidden={!visible}
        tabIndex={visible ? 0 : -1}
      >
        <span className="social-float__pulse" aria-hidden="true" />
        <WhatsAppIcon className="social-float__icon" />
        <span className="social-float__label hidden sm:inline">WhatsApp</span>
      </a>
    </>
  );
}
