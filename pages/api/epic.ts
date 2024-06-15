import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        return res.status(405).end();
    }

    try {
        const games = await prismadb.games.findMany({
            where: {
                cheapestSeller: "Epic"
            }
        });;

        return res.status(200).json(games);
    } catch (error) {
        console.log(error);
        return res.status(400).end();
    }
}
