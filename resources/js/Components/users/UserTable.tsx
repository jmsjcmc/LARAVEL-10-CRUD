import { User, UserTableProps } from "@/types";
import { router } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
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
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
} from "../ui/pagination";
import { Dialog, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { DialogContent } from "@radix-ui/react-dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function UserTable({
    users,
    filters,
    pagination,
}: UserTableProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const [search, setSearch] = useState(filters.search ?? "");
    const [deleteID, setDeleteID] = useState<number | null>(null);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    const confirmDelete = (id: number) => {
        setDeleteID(id);
        setShowDeleteDialog(true);
    }
    useEffect(() => {
        const timer = setTimeout(() => {
            router.get(
                "/dashboard",
                {
                    search,
                },
                {
                    preserveState: true,
                    replace: true,
                }
            );
        }, 500);
        return () => clearTimeout(timer);
    }, [search]);
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
        <div className="flex flex-col h-screen p-8">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Users</h1>

                <div className="flex items-center gap-2">
                    <Input
                        placeholder="Search users..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-64"
                    />
                    <Button onClick={openCreate}>Add User</Button>
                </div>
            </div>

            <UserForm
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                user={selectedUser}
            />
            <div className="flex-1 min-h-0 overflow-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Username</TableHead>
                            <TableHead className="text-right">
                                Actions
                            </TableHead>
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
                                        size={"sm"}
                                        variant={"outline"}
                                        onClick={() => openEdit(u)}
                                    >
                                        <Pencil className="w-4 h-4 mr-1" />
                                        Edit
                                    </Button>
                                    <Button
                                        size={"sm"}
                                        variant={"destructive"}
                                        onClick={() => confirmDelete(u.id)}
                                    >
                                        <Trash className="w-4 h-4 mr-1" />
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <div className="sticky bottom-0 py-2 mt-4">
                <Pagination>
                    <PaginationContent>
                        {pagination.map((p, i) => (
                            <PaginationItem key={i}>
                                <PaginationLink
                                    href={p.url || "#"}
                                    isActive={p.active}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (p.url) {
                                            router.get(
                                                p.url,
                                                {},
                                                {
                                                    preserveState: true,
                                                    replace: true,
                                                    preserveScroll: true,
                                                }
                                            );
                                        }
                                    }}
                                >
                                    <span
                                        dangerouslySetInnerHTML={{
                                            __html: p.label,
                                        }}
                                    />
                                </PaginationLink>
                            </PaginationItem>
                        ))}
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    );
}
