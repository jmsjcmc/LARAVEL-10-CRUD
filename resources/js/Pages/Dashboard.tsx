import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { PageProps, PaginatedUsers, User } from "@/types";
import UserTable from "@/Components/users/UserTable";


export default function Dashboard({ auth, users, filters }: PageProps<{users: PaginatedUsers; filters: { search: string}}>) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>

            }
        >
            <Head title="Dashboard" />

            <div className="">
                <UserTable users={users.data} pagination={users.links} filters={filters}/>
            </div>
        </AuthenticatedLayout>
    );
}
