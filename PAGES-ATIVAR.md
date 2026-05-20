# Ativar o site (obrigatório — 1 vez)

O deploy **já envia os arquivos** para a branch `gh-pages`.  
O **404** acontece porque o GitHub Pages ainda **não está ligado** no repositório.

## Passo a passo

1. Abra: https://github.com/victorgiusepp42/Manel_Tattoo/settings/pages  
2. Em **Build and deployment** → **Source**, escolha: **Deploy from a branch**  
3. **Branch:** `gh-pages`  
4. **Folder:** `/ (root)`  
5. Clique **Save**  
6. Aguarde 2–10 minutos  
7. Abra no celular: **https://victorgiusepp42.github.io/Manel_Tattoo/**

## Conferir se o deploy rodou

https://github.com/victorgiusepp42/Manel_Tattoo/actions  
→ workflow **MVP_0 Deploy GitHub Pages** deve estar **verde (success)**.

## Conferir se os arquivos existem

https://github.com/victorgiusepp42/Manel_Tattoo/tree/gh-pages  
→ deve ter `index.html`, pasta `assets/`, imagens da logo, etc.
