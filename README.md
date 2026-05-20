# Manel Tattoo

Site institucional e conversão — tatuador itinerante no Brasil.

## Desenvolvimento

```bash
npm install
npm run dev
```

Abra [http://localhost:5173](http://localhost:5173)

## Build

```bash
npm run build
npm run preview
```

## Personalizar

- **Dados e copy:** `src/data/site.ts`
- **Portfólio / fotos:** adicione `image: "/portfolio/nome.webp"` nos itens em `site.ts`
- **WhatsApp:** altere `BRAND.whatsapp` em `site.ts`
- **Cidades:** array `NEXT_CITIES` em `site.ts`

## Estrutura das seções

1. Ticker → Hero → Portfólio → Próximas cidades → Artista Multifacetado → Atendimento → Depoimentos → FAQ → CTA → Sobre → Footer
