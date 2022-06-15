import type { UserRole, RouteInfo } from "types/api";

export const USER_ROLES: { ADMINE: UserRole; USER: UserRole; OWNER: UserRole } =
  {
    ADMINE: "admin",
    USER: "user",
    OWNER: "owner",
  };

export const PUBLIC_ROUTES: RouteInfo[] = [
  { url: "/user/signin" },
  { url: "/user/signup" },
  { url: "/airlines", methods: ["GET"] },
];
