import { router, useForm } from "@inertiajs/react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { DialogTitle } from "@radix-ui/react-dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";
import { Input } from "@/Components/ui/input";
import { toast } from "sonner";
import { useState } from "react";

export interface User {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
}
interface Props {
    users: User[];
}
export default function UserTable({ users }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const form = useForm({
        id: null as number | null,
        first_name: "",
        last_name: "",
        username: "",
        password: "",
    });
    const openCreate = () => {
        form.reset();
        form.setData("id", null);
        setIsOpen(true);
    };
    const openEdit = (u: User) => {
        form.setData({
            id: u.id,
            first_name: u.first_name,
            last_name: u.last_name,
            username: u.username,
            password: "",
        });
        setIsOpen(true);
    };
    const submit = () => {
        if (form.data.id) {
            form.put(`/users/${form.data.id}`,
                {
                    onSuccess: () => {
                        toast.success('User updated!');
                        setIsOpen(false);
                    }, onError: () => toast.error('Failed to update user')
                }
            );
        } else {
            form.post("/users", {
                onSuccess: () => {
                    toast.success("User created!");
                    setIsOpen(false);
                }, onError: () => toast.error('Failed to create user')
            });
        }
    };
    const deleteUser = (id: number) => {
        router.delete(`/users/${id}`,
            {
                onSuccess: () => toast.success('User deleted!'),
                onError: () => toast.error('Failed to delete user')
            }
        );
    };
    return (
        <div className="p-8">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Users</h1>
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={openCreate}>Add User</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                {form.data.id ? "Edit User" : "Add User"}
                            </DialogTitle>
                        </DialogHeader>

                        <div className="py-2 space-y-4">
                            <Input
                                placeholder="First Name"
                                value={form.data.first_name}
                                onChange={(e) =>
                                    form.setData("first_name", e.target.value)
                                }
                            />
                            <Input
                                placeholder="Last Name"
                                value={form.data.last_name}
                                onChange={(e) =>
                                    form.setData("last_name", e.target.value)
                                }
                            />
                            <Input
                                placeholder="Username"
                                value={form.data.username}
                                onChange={(e) =>
                                    form.setData("username", e.target.value)
                                }
                            />
                            <Input
                                placeholder="Password"
                                type="password"
                                value={form.data.password}
                                onChange={(e) =>
                                    form.setData("password", e.target.value)
                                }
                            />
                            <Button onClick={submit} disabled={form.processing}>
                                {form.processing ? "Saving..." : "Save"}
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Username</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map((u) => (
                        <TableRow key={u.id}>
                            <TableCell>{u.id}</TableCell>
                            <TableCell>
                                {u.first_name} {u.last_name}
                            </TableCell>
                            <TableCell>{u.username}</TableCell>
                            <TableCell className="space-x-2 text-right">
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button
                                            size={"sm"}
                                            variant={"outline"}
                                            onClick={() => openEdit(u)}
                                        >
                                            Edit
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Edit User</DialogTitle>
                                        </DialogHeader>
                                        <div className="py-2 space-y-4">
                                            <Input
                                            placeholder="First Name"
                                            value={form.data.first_name}
                                            onChange={(e) => form.setData('first_name', e.target.value)}/>
                                            <Input
                                            placeholder="Last Name"
                                            value={form.data.last_name}
                                            onChange={(e) => form.setData('last_name', e.target.value)}/>
                                            <Input
                                            placeholder="Username"
                                            value={form.data.username}
                                            onChange={(e) => form.setData('username', e.target.value)}/>
                                            <Input
                                            placeholder="Password"
                                            value={form.data.password}
                                            onChange={(e) => form.setData('password', e.target.value)}/>
                                            <Button onClick={submit} disabled={form.processing}>
                                                {form.processing ? 'Saving' : 'Save'}
                                            </Button>
                                        </div>
                                    </DialogContent>
                                </Dialog>

                                <Button size={'sm'}
                                variant={'destructive'}
                                onClick={() => deleteUser(u.id)}>
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
