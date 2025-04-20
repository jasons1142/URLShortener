import getCollection from "@/db";
import { URLS_COLLECTION } from "@/db";
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

//@ts-expect-error
export default async function AliasRedirect({ params }) {
    const alias = params.alias;

    const collection = await getCollection(URLS_COLLECTION);
    const result = await collection.findOne({ alias });

    if (result) {
        redirect(result.url);
    }

    return (
        <p className = "p-3 text-center text-red-700">
            Unfound Alias
        </p>
    );
}