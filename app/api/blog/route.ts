import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function main() {
    try {
        await prisma.$connect();//データベース接続開始
    } catch (err) {
        return Error("DB接続に失敗しました")
    }
}

// ブログの全記事取得api
export const GET = async (req: Request, res: NextResponse) => {
    try {
        await main();
        const posts = await prisma.post.findMany();// 全ユーザー取得
        return NextResponse.json({ message: "Success", posts}, {status: 200});
    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 })
    } finally {
        await prisma.$disconnect();//接続を止める
    }
};

// ブログの投稿用api
export const POST = async (req: Request, res: NextResponse) => {
    try {
        const { title, description } = await req.json();
        await main();
        const post = await prisma.post.create({ data: { title, description }})
        return NextResponse.json({ message: "Success", post}, {status: 201});
    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 })
    } finally {
        await prisma.$disconnect();//接続を止める
    }
};