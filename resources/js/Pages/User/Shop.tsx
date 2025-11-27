import { Head } from '@inertiajs/react'
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from '@/types';

export default function Shop({
auth
} : PageProps<{}>) {
  return (
    <AuthenticatedLayout user={auth.user}
    header={
        <h2>Shop</h2>
    }>
<Head title='Shop'/>
    </AuthenticatedLayout>
  )
}
