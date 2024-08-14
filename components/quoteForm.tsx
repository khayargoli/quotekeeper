"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "./ui/input";
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import React from 'react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { toast, useToast } from "./ui/use-toast";
import {createQuote} from "@/app/server-actions/actions";

const formSchema = z.object({
    quoteFrom: z.string().min(2, {
        message: "Must be at least 2 characters.",
    }),
    quote: z.string().min(2, {
        message: "Must be at least 2 characters.",
    }),
})

const QuoteForm = () => {

    const { toast } = useToast();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            quoteFrom: "",
            quote: ""
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        const formData = new FormData();

        Object.entries(values).forEach(([key, value]) => {
            formData.append(key, String(value));
        });

        createQuote(formData);

        form.reset();

        toast({
            title: "Great!",
            description: (
                <pre className="mt-2 w-[340px] rounded-md text-md">
                    Quote has been added!
                </pre>
            ),
        });


    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">

                        <FormField
                            control={form.control}
                            name="quoteFrom"
                            render={({ field }) => (

                                <FormItem>
                                    <FormLabel htmlFor="quoteFrom">Where did you find the Quote from?</FormLabel>
                                    <FormControl>
                                        <Input id="quoteFrom" placeholder="E.g. Book, Website, Blog, etc."  {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>

                            )} />
                    </div>

                    <div className="grid w-full gap-4">

                        <FormField
                            control={form.control}
                            name="quote"
                            render={({ field }) => (

                                <FormItem>
                                    <FormControl>
                                        <Textarea placeholder="Type your quote here." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>

                            )} />
                        <Button type="submit">Add Quote</Button>
                    </div>
                </div>
            </form>
        </Form>
    );
}

export default QuoteForm;
