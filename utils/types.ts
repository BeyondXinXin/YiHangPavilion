export interface Site {
    id: number
    name: string
    url: string
    favicon?: string
}

export interface Category {
    id: number
    name: string
    siteList: Site[]
}

export interface Domain {
    id: number
    name: string
    categoryList: Category[]
}