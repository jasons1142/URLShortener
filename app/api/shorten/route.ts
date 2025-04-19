import { NextRequest, NextResponse } from "next/server";
import getCollection from "@/db";

function isValidUrl(url: string) {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

export async function POST(req: NextRequest) {
    const { url, alias } = await req.json();

    if (!isValidUrl(url)) {
        return NextResponse.json({ error: 'Invalid URL'}, {status: 400});
    }

    const urls = await getCollection('urls');
    const existing = await urls.findOne({ alias });

    if (existing) {
        return NextResponse.json({ error: 'Alias taken'}, {status: 400});
    }

    await urls.insertOne({ alias, url });
    return NextResponse.json({ alias });
}