/** Faixa superior (fundo) sem logo nem botões — só o chrome visual. */
export function Header() {
  return (
    <header
      className="header-bar header-bar--spacer sticky top-[34px] z-[600]"
      aria-hidden
    >
      <div className="header-bar__spacer h-16 sm:h-[4.25rem]" />
    </header>
  );
}
