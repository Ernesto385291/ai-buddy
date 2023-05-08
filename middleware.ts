import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/sign-in/[[...index]]", "/sign-up/[[...index]]"],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)"],
};
