import { BrandTitle } from "./BrandTitle";
import { InstagramButton } from "./InstagramButton";
import { Logo } from "./Logo";

export function Header() {
  return (
    <header className="header-bar sticky top-[34px] z-[600]">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-5 sm:h-[4.25rem]">
        <a
          href="#inicio"
          className="brand-lockup brand-lockup--nav min-h-[44px] min-w-0"
          aria-label="Manel Tattoo — início"
        >
          <Logo size="nav" />
          <BrandTitle size="nav" className="brand-lockup__title hidden min-[380px]:block" />
        </a>
        <InstagramButton className="shrink-0 px-4 py-2.5 text-xs sm:text-sm min-h-[44px]">
          Instagram
        </InstagramButton>
      </div>
    </header>
  );
}
