import { useForm } from "@inertiajs/react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface UserDialogProps {
    isOpen: boolean;
    setIsOpen: (state:boolean) => void;
    user: any | null;
}
export default function UserForm(
    { isOpen, setIsOpen, user} : UserDialogProps
) {
    const form = useForm({
        id: user?.id ?? null,
        first_name: user?.first_name ?? '',
        last_name: user?.last_name ?? '',
        username: user?.username ?? '',
        password: ''
    });

    useEffect(() => {
        form.setData({
            id: user?.id ?? null,
            first_name: user?.first_name ?? '',
            last_name: user?.last_name ?? '',
            username: user?.username ?? '',
            password: ''
        });
    },[user]);
    const submit = () => {
        if (form.data.id) {
            form.put(`/users/${form.data.id}`,
                { onSuccess: () => {
                    toast.success('User updated!');
                    setIsOpen(false);
                }, onError: () => toast.error('Failed to update user')}
            );
        } else {
            form.post(`/users`,
                { onSuccess: () => {
                    toast.success('User created!');
                    setIsOpen(false);
                }, onError: () => toast.error('Failed to create user')}
            );
        }
    }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                    {user ? 'Edit User' : 'Add User'}
                </DialogTitle>
            </DialogHeader>

            <div className="py-2 space-y-4">
                <div className="flex gap-4">
                     <Input
                placeholder="First Name"
                value={form.data.first_name}
                onChange={e => form.setData('first_name', e.target.value)}/>
                <Input
                placeholder="Last Name"
                value={form.data.last_name}
                onChange={e => form.setData('last_name', e.target.value)}/>
                </div>
                <Input
                placeholder="Username"
                value={form.data.username}
                onChange={e => form.setData('username', e.target.value)}/>
                <Input
                placeholder="Password"
                type='password'
                value={form.data.password}
                onChange={e => form.setData('password', e.target.value)}/>
                <Button onClick={submit} disabled={form.processing}>
                    {form.processing ? 'Saving' : 'Save'}
                </Button>
            </div>
        </DialogContent>
    </Dialog>
  )
}
