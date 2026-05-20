# Manel Tattoo

Site institucional e conversão — tatuador itinerante no Brasil.

## Desenvolvimento

```bash
npm install
npm run dev
```

Abra [http://localhost:5173](http://localhost:5173)

## Site no celular (GitHub Pages)

URL: **https://victorgiusepp42.github.io/Manel_Tattoo/**

Se aparecer **404**, o deploy subiu os arquivos mas falta **ativar** o Pages (só uma vez):

1. Abra [Settings → Pages](https://github.com/victorgiusepp42/Manel_Tattoo/settings/pages)
2. Em **Build and deployment**, escolha **uma** opção:
   - **Opção A (recomendada):** Source = *Deploy from a branch* → Branch `main` → Folder `/docs`
   - **Opção B:** Source = *Deploy from a branch* → Branch `gh-pages` → Folder `/ (root)`
   - **Opção C:** Source = *GitHub Actions* (o workflow `MVP_0 Deploy GitHub Pages` já publica)
3. Clique **Save** e aguarde 2–5 minutos

Veja o status em [Actions](https://github.com/victorgiusepp42/Manel_Tattoo/actions).

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
