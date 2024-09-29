export interface User {
    id: number,
    email: string
}

export interface Sheet {
    id: number,
    user_id: number,
    title: string
}
