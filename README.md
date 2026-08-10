# Reset

Web app PWA de hábitos, autocontrole e progresso feito para pequenos passos — sem culpa e sem conta obrigatória.

## Executar

É um projeto estático. Sirva esta pasta com qualquer servidor HTTP local para testar o PWA; depois abra o endereço no navegador. Para regras puras, execute `npm test` onde o Node estiver disponível.

## Privacidade

Os dados estruturados ficam no IndexedDB deste navegador. Caso ele seja bloqueado, há um fallback de armazenamento local. Nada é enviado a servidores. Em **Configurações**, a pessoa pode exportar JSON, importar backup validado ou apagar todos os dados com confirmação.

## GitHub Pages

Publique o conteúdo desta pasta na raiz do repositório e habilite Pages. Todos os caminhos são relativos e as telas usam hash (`#/home`), então funciona em `https://usuario.github.io/repositorio/`. O Service Worker é relativo (`./sw.js`) e funciona no subcaminho do repositório.

## Estrutura

- `js/core`: armazenamento e datas.
- `js/systems`: catálogo de 56 missões, progressão, streak, conquistas, jornada e gráficos.
- `js/pages.js` e `js/screens.js`: telas da SPA.
- `js/audio`: feedback sonoro nativo após interação.
- `sw.js` e `manifest.json`: instalação e uso offline.

## Manutenção

Adicione missões em `js/systems/catalog.js`; conquistas e regras em `js/systems/logic.js`; itens puramente cosméticos na lista `shop` do catálogo. Ao publicar uma atualização de arquivos offline, altere a versão `CACHE` em `sw.js`.
