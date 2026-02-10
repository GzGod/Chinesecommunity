"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">加载中...</div>
      </div>
    );
  }

  if (!session) {
    router.push("/admin/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航栏 */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <Link href="/admin/dashboard" className="text-xl font-bold">
                Web3社区管理后台
              </Link>
              <nav className="hidden md:flex space-x-4">
                <Link
                  href="/admin/dashboard"
                  className="text-gray-600 hover:text-gray-900"
                >
                  数据面板
                </Link>
                <Link
                  href="/admin/projects"
                  className="text-gray-600 hover:text-gray-900"
                >
                  项目管理
                </Link>
                <Link
                  href="/admin/posts"
                  className="text-gray-600 hover:text-gray-900"
                >
                  内容管理
                </Link>
                <Link
                  href="/admin/comments"
                  className="text-gray-600 hover:text-gray-900"
                >
                  评论审核
                </Link>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                {session.user?.name || session.user?.email}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => signOut({ callbackUrl: "/admin/login" })}
              >
                退出登录
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* 主内容区域 */}
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
