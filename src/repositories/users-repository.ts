export interface CreateUserData{
    name: string
    email: string 
    passwordHash: string
    role?: 'AGENT'| 'SUPERVISOR' | 'ADMIN'
}

export interface UsersRepository {
    findByEmail(email: string): Promise<{
        id: string
        name: string
        email: string
        passwordHash: string
        role: string
    } | null>

create(data: CreateUserData): Promise<{
    id: string
    name: string
    email: string
    role: string
 }>
}