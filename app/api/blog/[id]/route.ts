import { NextResponse } from "next/server";
import { main } from "../route";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//ブログ詳細記事取得API
export const GET = async (req: Request, res: NextResponse) => {
    try {
        const id: number = parseInt(req.url.split("/blog/")[1]);
        await main();
        const post = await prisma.post.findFirst({ where: { id } });// http://localhost:3000/api/blog/1
        return NextResponse.json({ message: "Success", post}, {status: 200});
    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 })
    } finally {
        await prisma.$disconnect();//接続を止める
    }
};

//ブログ編集用API
export const PUT = async (req: Request, res: NextResponse) => {
    try {
        const id: number = parseInt(req.url.split("/blog/")[1]);

        const { title, description } = await req.json();

        await main();
        const post = await prisma.post.update({
            data: { title, description },
            where: { id } 
        });
        return NextResponse.json({ message: "Success", post}, {status: 200});
    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 })
    } finally {
        await prisma.$disconnect();//接続を止める
    }
};

//削除用API
export const DELETE = async (req: Request, res: NextResponse) => {
    try {
        const id: number = parseInt(req.url.split("/blog/")[1]);

        await main();
        const post = await prisma.post.delete({
            where: { id },
        });
        return NextResponse.json({ message: "Success", post}, {status: 200});
    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 })
    } finally {
        await prisma.$disconnect();//接続を止める
    }
};

