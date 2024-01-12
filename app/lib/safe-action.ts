import { createSafeActionClient } from "next-safe-action";
import { cookies } from "next/headers";

export const action = createSafeActionClient({
  middleware: (_input) => {
    const session = cookies().get("session")?.value;

    if (!session) {
      // throw new Error("Session not found!");
    }

    return {
      // user: JSON.parse(session).user, // {user: {name: string}}
    };
  },
});
