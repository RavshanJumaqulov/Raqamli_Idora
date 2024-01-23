
export interface SidebarItemsTypes {
    label: string,
    icon: React.ReactNode,
    link: string,
    key: string,
    child?: SidebarItemChildTypes[]
}

export interface SidebarItemChildTypes {
    label: string,
    link: string,
    key: string,
}
