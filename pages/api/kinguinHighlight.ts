import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        return res.status(405).end();
    }

    try {
        const highlights = await prismadb.games.findMany({
            where: {
                isEnebaHighLight: true
            },
            take: 3
        });

        return res.status(200).json(highlights);
    } catch (error) {
        console.log(error);
        return res.status(400).end();
    }
}
