import { NextRequest, NextResponse } from "next/server";
import getCollection from "@/db";

export async function POST(req: NextRequest) {
    const { alias, url } = await req.json();

    if (!alias || alias.includes('/')) {
        return NextResponse.json(
          { error: 'Alias cannot be empty or contain slashes' },
          { status: 400 }
        );
    }

    try {
        new URL(url);
    } catch {
        return NextResponse.json({ error: 'Invalid URL'}, {status: 400});
    }

    const urls = await getCollection('urls');
    const existing = await urls.findOne({ alias });

    if (existing) {
        return NextResponse.json(
            { error: 'Invalid alias: This alias is taken'}, 
            {status: 400}
        );
    }

    await urls.insertOne({ alias, url });
    return NextResponse.json({ alias });
}