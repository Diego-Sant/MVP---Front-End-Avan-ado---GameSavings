import { NextApiRequest, NextApiResponse } from "next";

import prismadb from "@/lib/prismadb";

export default async function handler(req:NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        return res.status(405).end();
    }

    try {
        const {gameId} = req.query;

        if(typeof gameId !== 'string') {
            throw new Error("ID inválido!")
        }

        if(!gameId) {
            throw new Error("ID inválido!")
        }

        const games: {[key: string]: any} = {jogos: prismadb.games}
        
        let existingGame = null;

        for (const game of Object.keys(games)) {
            const gameOfType = await games[game].findUnique({
                where: {
                    id: gameId,
                },
            });

            if (gameOfType !== null) {
                existingGame = gameOfType;
                break;
            }
        }

        if (!existingGame) {
            throw new Error("ID inválido!")
        }

        return res.status(200).json(existingGame);
    } catch (error) {
        console.log(error)
        return res.status(400).end();
    }
}