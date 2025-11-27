import { Link, usePage } from "@inertiajs/react";
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "./ui/sidebar";
import { sidebarItems } from "@/config/sidebar";

export default function AppSidebar() {
    const { props }: any = usePage();
    const user = props.auth.user;

    return (
        <Sidebar>
            <SidebarHeader>
                <h2 className="px-4 py-2 text-lg font-bold">Menu</h2>
            </SidebarHeader>
            <SidebarContent>
                <SidebarMenu>
                    {sidebarItems
                        .filter((item) => item.show(user))
                        .map((item) => (
                            <SidebarMenuItem key={item.href}>
                                <SidebarMenuButton asChild>
                                    <Link
                                        href={item.href}
                                        className="flex items-center gap-2"
                                    >
                                        <item.icon className="w-4 h-4" />
                                        <span>{item.label}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                </SidebarMenu>
            </SidebarContent>
        </Sidebar>
    );
}
