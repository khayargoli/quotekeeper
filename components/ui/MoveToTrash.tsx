"use client";

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './dialog';
import { TrashIcon } from '@radix-ui/react-icons';
import { Button } from './button';
import { deleteQuote } from '@/app/server-actions/actions';

function MoveToTrash({ quoteId }: { quoteId: string }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <TrashIcon className="cursor-pointer h-6 w-6" />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Delete Quote</DialogTitle>
                    <DialogDescription>
                        Do you really want to delete?
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter>

                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <div className="md:hidden h-5"></div>
                    <DialogClose asChild>
                        <Button variant="destructive" onClick={() => { deleteQuote(quoteId) }} >Yes</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default MoveToTrash