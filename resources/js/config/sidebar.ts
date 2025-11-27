import { ClipboardList, Home, Users } from "lucide-react";

export const sidebarItems = [
    {
        label: 'Dashboard',
        href: '/dashboard',
        icon: Home,
        show: () => true
    },
    {
        label: 'Users',
        href: '/users',
        icon: Users,
        show: (user: any) => user?.roles?.some((r: any) => r.name === 'admin')
    },
    {
        label: 'Reports',
        href: '/reports',
        icon: ClipboardList,
        show: (user: any) => user?.permissions?.some((p: any) => p.name === 'view_reports')
    },
    {
        label: 'Task Manager',
        href: '/tasks',
        icon: ClipboardList,
        show: (user: any) => user?.roles?.some((r: any) => r.name === 'manager')
    }
]
