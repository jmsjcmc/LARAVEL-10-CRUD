import { router, useForm } from '@inertiajs/react'
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'
import { DialogTitle } from '@radix-ui/react-dialog'
import { Input } from 'postcss'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'


interface User
{
    id: number
    first_name: string
    last_name: string
    username: string
}
interface Props
{
    users: User[]
}
export default function UserTable({users} : Props) {
    const form = useForm(
        {
            id: null as number | null,
            first_name: '',
            last_name: '',
            username: '',
            password: ''
        }
    )
    const openCreate = () =>
    {
        form.reset()
        form.setData('id', null)
    }
    const openEdit = (u: User) =>
    {
        form.setData(
            {
                id: u.id,
                first_name: u.first_name,
                last_name: u.last_name,
                username: u.username,
                password: ''
            }
        )
    }
    const submit = () =>
    {
        if (form.data.id)
        {
            form.put(`/users/${form.data.id}`)
        } else
        {
            form.post('users')
        }
    }
    const deleteUser = (id: number) =>
    {
        router.delete(`/users/${id}`)
    }
  return (
    <div className='p-8'>
        <div className='flex items-center justify-between mb-6'>
            <h1 className='text-2xl font-bold'>Users</h1>
            <Dialog>
                <DialogTrigger asChild>
                    <Button onClick={openCreate}>Add User</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {form.data.id ? 'Edit User' : 'Add User'}
                        </DialogTitle>
                    </DialogHeader>

                    <div className="py-2 space-y-4">

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
                    <TableHead className='text-right'>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users.map((u) => (
                    <TableRow key={u.id}>
                        <TableCell>{u.id}</TableCell>
                        <TableCell>{u.first_name} {u.last_name}</TableCell>
                        <TableCell>{u.username}</TableCell>
                        <TableCell className='space-x-2 text-right'>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button size={'sm'} variant={'outline'} onClick={() => openEdit(u)}>Edit</Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Edit User</DialogTitle>
                                    </DialogHeader>
                                </DialogContent>
                            </Dialog>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </div>
  )
}
