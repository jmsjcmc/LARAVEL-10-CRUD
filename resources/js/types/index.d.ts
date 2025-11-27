export interface User {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    email_verified_at: string;
}
export interface UserTableProps {
    users: User[];
    filters: {
        search: string;
    };
    pagination: PaginationLink[];
}
export interface PaginatedUsers {
    data: User[];
    links: PaginationLink[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}
export interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}
export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
};
