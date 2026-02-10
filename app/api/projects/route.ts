import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/config";

// GET - 获取所有项目
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");

    const where: any = {};
    if (status) where.status = status;
    if (category) where.category = { has: category };
    if (featured) where.featured = featured === "true";

    const projects = await prisma.project.findMany({
      where,
      orderBy: [{ featured: "desc" }, { order: "asc" }, { createdAt: "desc" }],
      include: {
        _count: {
          select: { posts: true },
        },
      },
    });

    return NextResponse.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

// POST - 创建新项目（需要管理员权限）
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      slug,
      name,
      nameEn,
      logo,
      description,
      descriptionEn,
      website,
      twitter,
      telegram,
      discord,
      category,
      tags,
      featured,
      order,
    } = body;

    const project = await prisma.project.create({
      data: {
        slug,
        name,
        nameEn,
        logo,
        description,
        descriptionEn,
        website,
        twitter,
        telegram,
        discord,
        category: category || [],
        tags: tags || [],
        featured: featured || false,
        order: order || 0,
      },
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}
