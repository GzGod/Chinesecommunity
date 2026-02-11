export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/admin/dashboard/:path*",
    "/admin/projects/:path*",
    "/admin/posts/:path*",
    "/admin/comments/:path*",
  ],
};
