import { Link } from "react-router-dom";
import { BRAND } from "../data/site";

export function NotFound() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-5 text-center">
      <section
        className="pointer-events-none absolute inset-0 bg-center bg-no-repeat opacity-15"
        style={{ backgroundImage: `url(${BRAND.heroArt})`, backgroundSize: "min(70vw, 400px)" }}
        aria-hidden
      />
      <p className="display-title text-8xl text-red-light/40">404</p>
      <h1 className="display-title mt-4 text-3xl text-cream">Página não encontrada</h1>
      <p className="mt-4 max-w-md text-muted">
        Essa rota não existe — mas sua próxima tattoo pode. Volta pro início e chama no DM.
      </p>
      <Link to="/" className="btn btn-primary mt-8">
        Voltar ao site
      </Link>
    </section>
  );
}
