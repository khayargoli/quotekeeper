import React from 'react';
import prisma from '../db/db';
import { klee_One, sacramento } from '../fonts';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
export const revalidate = 0; // Disables caching for this component, fetches on every request.

const ListedQuotes = async () => {

    const quotes = await prisma.quote.findMany({
        where: {
            isPublic: true,
        },
        include: {
            user: true,
        },
    });

    return (
        <>
            <div className="flex flex-col items-center justify-center h-32 text-start mt-[30px] m-auto">
                <Label className={`text-6xl ${sacramento.className}`}>Quote Keeper</Label>
                <br />
                <p className={`text-md ${klee_One.className}`} ><Link href="/protected" className="underline">Join us</Link> to share your quotes to the world</p>
            </div>
            {quotes && quotes.length ? (
                <ul className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4 px-10 pt-10">
                    {quotes.map((quote) => (
                        <div key={quote.id} className="flex items-center p-4 bg-white">
                            <div className="mx-auto text-center overflow-auto">
                                <svg
                                    className="w-10 h-10 mx-auto mb-3 text-gray-400 dark:text-gray-600"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 18 14"
                                >
                                    <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
                                </svg>

                                <p className={`text-xl italic font-medium text-gray-900 ${klee_One.className} break-words`}>
                                    {quote.quote}
                                </p>


                                <figcaption className="flex items-center justify-center mt-6 space-x-3 rtl:space-x-reverse">
                                    <div className="flex items-center divide-x-2 rtl:divide-x-reverse divide-gray-500 dark:divide-gray-700">
                                        <cite className="pe-3 font-medium text-sm text-gray-900 dark:text-white">By <b>{quote.user?.username || "Anynomous"}</b></cite>
                                        <cite className="ps-3 pe-3 font-medium text-sm text-gray-900">{quote.quoteFrom}</cite>
                                        <cite className="ps-3 pe-3 text-sm text-gray-500 dark:text-gray-400">
                                            {new Date(quote.createdAt).toDateString()}
                                        </cite>
                                    </div>
                                </figcaption>
                            </div>
                        </div>
                    ))}
                </ul>
            ) : (
                <div className="flex items-center justify-center">
                    <h1>No quotes to show.</h1>
                </div>
            )}
        </>
    );
};

export default ListedQuotes;
