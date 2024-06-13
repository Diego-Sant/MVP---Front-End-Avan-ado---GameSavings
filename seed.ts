const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
  const dataPath = path.join(__dirname, 'data.json');
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

  for (const jogo of data) {
    const existingGame = await prisma.games.findFirst({
      where: {
        name: jogo.name,
        subname: jogo.subname,
      },
    });

    if (!existingGame) {
      await prisma.games.create({
        data: jogo,
      });
      console.log(`Jogo ${jogo.name} - ${jogo.subname || ''} inserido com sucesso!`);
    } else {
      console.log(`Jogo ${jogo.name} - ${jogo.subname || ''} já existe no banco de dados.`);
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });