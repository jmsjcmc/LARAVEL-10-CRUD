import React from 'react'
interface DeleteConfirmDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: () => void;
    title?: string;
    message?: string;
}
export default function DeleteConfirmDialog() {
  return (
    <div>DeleteConfirmDialog</div>
  )
}
