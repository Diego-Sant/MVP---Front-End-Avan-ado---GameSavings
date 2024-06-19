# Desenvolvimento Front-end Avançado Puc-Rio MVP

O objetivo deste projeto é oferecer aos clientes as melhores opções para comprar jogos a preços mais acessíveis, podendo ser financeiramente rentáveis através de parcerias , funcionalidades premium ou até mesmo publicidades sem que atrapalhe a experiência do usuário.

---
## Como inicializar

Primeiramente usar o comando `npm install` no terminal para instalar quaisquer dependências que estarão no `package.json`

```
npm install
```

---
Em seguida para iniciar a aplicação deverá ser usado o comando `npm run dev`

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
