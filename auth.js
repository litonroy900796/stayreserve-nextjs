import NextAuth from "next-auth";

// This initializes the Auth.js REST endpoints used by SessionProvider.
// Add providers here when the login flow is implemented.
export const { handlers: { GET, POST }, auth } = NextAuth({
  providers: [],
});
