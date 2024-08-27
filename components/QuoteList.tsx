
import prisma from "@/app/db/db";
import MoveToTrash from "./ui/MoveToTrash";
import { klee_One } from "../app/fonts";
import { createClient } from "@/utils/supabase/server";

const QuoteList = async () => {

    const supabase = createClient();
    const { data: { user: supabase_user } } = await supabase.auth.getUser();

    const quotes = await prisma.quote.findMany({
        where: {
            userId: supabase_user?.id,
        },
        include: { user: true }
    });

    return (
        <>
            {quotes.length ? <div className="grid grid-cols-1 gap-6 md:grid-cols-3 px-4">
                {quotes.map((quote) => (
                    <div key={quote.id} className=" mb-9 py-4">
                        <div className="mx-auto text-center overflow-auto">
                            <svg className="w-10 h-10 mx-auto mb-3 text-gray-400 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
                                <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
                            </svg>
                            <blockquote>
                                <p className={`text-2xl italic font-medium text-gray-900 dark:text-white  ${klee_One.className}`}>{quote.quote}</p>
                            </blockquote>
                            <figcaption className="flex items-center justify-center mt-6 space-x-3 rtl:space-x-reverse">

                                <div className="flex items-center divide-x-2 rtl:divide-x-reverse divide-gray-500 dark:divide-gray-700">
                                    <cite className="pe-3 font-medium text-sm text-gray-900 dark:text-white">By <b>{quote.user?.username || "Anynomous"}</b></cite>
                                    <cite className="ps-3 pe-3 font-medium text-sm text-gray-900 dark:text-white">{quote.quoteFrom}</cite>
                                    <cite className="ps-3 pe-3 text-sm text-gray-500 dark:text-gray-400">{new Date(quote.createdAt).toDateString()}</cite>
                                    <div className="ps-3 text-sm text-gray-500 dark:text-gray-400"><MoveToTrash quoteId={quote.id} /></div>
                                </div>
                            </figcaption>
                        </div>
                    </div>
                ))}
            </div> : <h1>No quotes to show.</h1>}

        </>

    );
}

export default QuoteList;
