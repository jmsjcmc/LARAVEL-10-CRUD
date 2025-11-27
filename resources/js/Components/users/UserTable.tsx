import { User, UserTableProps } from "@/types";
import { router } from "@inertiajs/react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import UserForm from "../forms/UserForm";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";
import { Pencil, Trash } from "lucide-react";

export default function UserTable({ users }: UserTableProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const openCreate = () => {
        setSelectedUser(null);
        setIsOpen(true);
    };
    const openEdit = (u: User) => {
        setSelectedUser(u);
        setIsOpen(true);
    };
    const deleteUser = (id: number) => {
        router.delete(`/users/${id}`, {
            onSuccess: () => toast.success("User deleted!"),
            onError: () => toast.error("Failed to delete user"),
        });
    };
    return (
        <div className="p-8">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Users</h1>
                <Button onClick={openCreate}>Add User</Button>
            </div>

            <UserForm
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                user={selectedUser}
            />

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
                                <Button
                                size={'sm'}
                                variant={'outline'}
                                onClick={() => openEdit(u)}>
                                    <Pencil className="w-4 h-4 mr-1"/>
                                    Edit</Button>
                                <Button
                                    size={"sm"}
                                    variant={"destructive"}
                                    onClick={() => deleteUser(u.id)}
                                >
                                    <Trash className="w-4 h-4 mr-1"/>
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
