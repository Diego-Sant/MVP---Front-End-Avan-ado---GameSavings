# Desenvolvimento Front-end Avançado Puc-Rio MVP

O objetivo deste projeto é oferecer aos clientes as melhores opções para comprar jogos a preços mais acessíveis, podendo ser financeiramente rentáveis através de parcerias , funcionalidades premium ou até mesmo publicidades sem que atrapalhe a experiência do usuário.

---
## Projeto no Figma

Projeto feito em alta fidelidade com 4 páginas(Menu principal, página com apenas jogos da Steam, página com apenas novidades e página de pesquisa).

As interatividade no protótipo são as seguintes: 

* Hover nos links no Navbar
* Hover nos ícones das empresas
* Animação ao clicar na barra de pesquisa
* Hover no ícone de pesquisar
* Funcionalidade da barra do slider de preço

```
https://www.figma.com/design/vQAvZ30BPh6tjIUacmHlXu/MVP---GameSavings?node-id=1-346&t=TFNH7hSD7YrrrbXB-1
```

---
## Como inicializar

Primeiramente usar o comando `npm install` no terminal para instalar quaisquer dependências que estarão no `package.json`

```
npm install
```

Em seguida, criar o arquivo .env na raíz do projeto e copiar o `DATABASE_URL` que será enviado junto com o link do github na plataforma da Puc-Rio

---
Para iniciar a aplicação deverá ser usado o comando `npm run dev`

```
npm run dev
```

---
## Adicionar jogos no banco de dados

Para testar a funcionalidade do banco de dados, abra o arquivo `data.json`. Você pode copiar um jogo existente ou criar um novo jogo do zero, seguindo as especificações fornecidas em `schema.prisma`. Se optar por copiar e colar, lembre-se de que o `seed.ts` possui uma funcionalidade que impede a duplicação de jogos com o mesmo "name" e/ou "subname". Portanto, ao adicionar um novo jogo, certifique-se de alterar o nome.

Após adicionar um novo jogo, use o comando `npm run seed`. O terminal identificará todos os jogos no arquivo e informará se o novo jogo foi adicionado com sucesso. Se você adicionar um novo jogo sem apagar nada do `data.json`, o terminal exibirá mensagens indicando que alguns jogos não foram adicionados porque já existem no banco de dados. Isso é normal, o novo jogo que você adicionou será confirmado com uma mensagem positiva.

```
npm run seed
```

---
## Requisitos do MVP

- [x] Protótipo em alta fidelidade das três páginas
- [x] Adição de interatividade ao protótipo
- [x] O projeto React deve ser visualmente fiel ao protótipo criado no Figma

- [x] Componentes reutilizáveis
- [x] Recursos do React como useState, useEffect, useRouter, etc.
- [x] Reaproveitamento de no mínimo 3 componentes em pelo menos 2 páginas (Navbar, GameCard, LoadingScreen e Footer)
- [x] Apresentação de uma abordagem criativa e inovadora no design ou nas funcionalidades implementadas
- [x] Leitura de um arquivo JSON

- [x] Hospedado no github um projeto público
- [x] Criar projeto público no Figma e adicionar ao README.md
- [x] Instruções no README.md(Título, descrição do projeto e instruções de instalação)
