import { useUser } from "@clerk/nextjs";

export function useRole(): { role?: string; isAdmin: boolean; isStudent: boolean } {
  const { user } = useUser();
  const role = user?.publicMetadata?.role as string;

  return {
    role,
    isAdmin: role === "admin",
    isStudent: role === "student",
  };
}
