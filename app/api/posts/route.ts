import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/config";

// GET - 获取所有内容
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get("projectId");
    const type = searchParams.get("type");
    const featured = searchParams.get("featured");
    const limit = parseInt(searchParams.get("limit") || "20");
    const offset = parseInt(searchParams.get("offset") || "0");

    const where: any = {};
    if (projectId) where.projectId = projectId;
    if (type) where.type = type;
    if (featured) where.featured = featured === "true";

    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where,
        orderBy: [
          { pinned: "desc" },
          { featured: "desc" },
          { publishedAt: "desc" },
        ],
        take: limit,
        skip: offset,
        include: {
          project: {
            select: {
              id: true,
              name: true,
              slug: true,
              logo: true,
            },
          },
          _count: {
            select: { comments: true },
          },
        },
      }),
      prisma.post.count({ where }),
    ]);

    return NextResponse.json({ posts, total });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}

// POST - 创建新内容
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      projectId,
      type,
      title,
      titleEn,
      content,
      contentEn,
      images,
      link,
      tags,
      featured,
      pinned,
      publishedAt,
    } = body;

    const post = await prisma.post.create({
      data: {
        projectId,
        type,
        title,
        titleEn,
        content,
        contentEn,
        images: images || [],
        link,
        tags: tags || [],
        featured: featured || false,
        pinned: pinned || false,
        publishedAt: publishedAt ? new Date(publishedAt) : new Date(),
      },
      include: {
        project: true,
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}
