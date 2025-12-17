import type { Generated, Insertable, Selectable, Updateable } from 'kysely'

// Better-auth required tables
export interface UserTable {
    id: Generated<string>
    name: string
    email: string
    emailVerified: boolean
    image: string | null
    createdAt: Generated<Date>
    updatedAt: Generated<Date>
}

export interface SessionTable {
    id: Generated<string>
    userId: string
    token: string
    expiresAt: Date
    ipAddress: string | null
    userAgent: string | null
    createdAt: Generated<Date>
    updatedAt: Generated<Date>
}

export interface AccountTable {
    id: Generated<string>
    userId: string
    accountId: string
    providerId: string
    accessToken: string | null
    refreshToken: string | null
    expiresAt: Date | null
    password: string | null
    createdAt: Generated<Date>
    updatedAt: Generated<Date>
}

export interface VerificationTable {
    id: Generated<string>
    identifier: string
    value: string
    expiresAt: Date
    createdAt: Generated<Date>
    updatedAt: Generated<Date>
}

// Your custom fields (extend user table)
export interface ExtendedUserTable extends UserTable {
    role: 'user' | 'admin'
    isActive: boolean
    lastLoginAt: Date | null
}

export interface Database {
    user: ExtendedUserTable
    session: SessionTable
    account: AccountTable
    verification: VerificationTable
}

/* Helper types */
export type User = Selectable<ExtendedUserTable>
export type NewUser = Insertable<ExtendedUserTable>
export type UserUpdate = Updateable<ExtendedUserTable>

export type Session = Selectable<SessionTable>
export type NewSession = Insertable<SessionTable>
export type SessionUpdate = Updateable<SessionTable>

export type Account = Selectable<AccountTable>
export type NewAccount = Insertable<AccountTable>
export type AccountUpdate = Updateable<AccountTable>

export type Verification = Selectable<VerificationTable>
export type NewVerification = Insertable<VerificationTable>
export type VerificationUpdate = Updateable<VerificationTable>