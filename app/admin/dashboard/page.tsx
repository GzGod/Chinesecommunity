"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    projectCount: 0,
    postCount: 0,
    commentCount: 0,
    pendingComments: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // 这里可以创建一个专门的stats API，现在先用简单的方式
      const [projects, posts, comments] = await Promise.all([
        fetch("/api/projects").then((r) => r.json()),
        fetch("/api/posts").then((r) => r.json()),
        fetch("/api/comments?approved=false").then((r) => r.json()),
      ]);

      setStats({
        projectCount: projects.length || 0,
        postCount: posts.total || 0,
        commentCount: 0,
        pendingComments: comments.length || 0,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>加载中...</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">数据面板</h1>
        <p className="text-gray-600 mt-2">欢迎回来，查看您的社区数据统计</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">项目总数</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.projectCount}</div>
            <p className="text-xs text-muted-foreground">活跃的Web3项目</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">内容总数</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <path d="M2 10h20" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.postCount}</div>
            <p className="text-xs text-muted-foreground">已发布的内容</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">待审核评论</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingComments}</div>
            <p className="text-xs text-muted-foreground">需要审核的评论</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总评论数</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.commentCount}</div>
            <p className="text-xs text-muted-foreground">社区互动</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>快速操作</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <a
              href="/admin/projects"
              className="block p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition"
            >
              <div className="font-medium">创建新项目</div>
              <div className="text-sm text-gray-600">添加新的Web3项目</div>
            </a>
            <a
              href="/admin/posts"
              className="block p-3 bg-green-50 hover:bg-green-100 rounded-lg transition"
            >
              <div className="font-medium">发布内容</div>
              <div className="text-sm text-gray-600">添加推文、截图或活动</div>
            </a>
            <a
              href="/admin/comments"
              className="block p-3 bg-yellow-50 hover:bg-yellow-100 rounded-lg transition"
            >
              <div className="font-medium">审核评论</div>
              <div className="text-sm text-gray-600">
                {stats.pendingComments} 条评论待审核
              </div>
            </a>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>最近活动</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-gray-600">
              暂无最近活动记录
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
