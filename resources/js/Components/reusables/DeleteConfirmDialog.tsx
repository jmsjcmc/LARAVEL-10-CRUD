import React from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";

interface DeleteConfirmDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: () => void;
    title?: string;
    message?: string;
}
export default function DeleteConfirmDialog({
    open,
    onOpenChange,
    onConfirm,
    title,
    message,
}: DeleteConfirmDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{message}</DialogDescription>
                </DialogHeader>
                <div className="flex justify-end gap-2 mt-4">
                    <Button
                        variant={"outline"}
                        onClick={() => onOpenChange(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                    variant={'destructive'}
                    onClick={() => {
                        onConfirm();
                        onOpenChange(false);
                    }}>
                        Delete
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
