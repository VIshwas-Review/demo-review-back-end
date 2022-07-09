import type { UserRole, RouteInfo } from 'types/api'

export const USER_ROLES: { ADMIN: UserRole; USER: UserRole; OWNER: UserRole } = {
  ADMIN: 'admin',
  USER: 'user',
  OWNER: 'owner',
}

export const PUBLIC_ROUTES: RouteInfo[] = [
  { url: '/user/signin' },
  { url: '/user/signup' },
  { url: '/airlines', methods: ['GET'] },
]

export const PRIVATE_ROUTES: RouteInfo[] = [
  { url: '/airlines', methods: ['POST'], userRoles: ['admin', 'owner'] },
  {
    url: '/airlines/:id',
    methods: ['PATCH', 'DELETE'],
    userRoles: ['admin', 'owner'],
  },
  {
    url: '/airlines/:id/likeAirline',
    methods: ['PATCH'],
  },
]
