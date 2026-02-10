import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/config";

// GET - 获取评论
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get("postId");
    const approved = searchParams.get("approved");

    const where: any = {};
    if (postId) where.postId = postId;
    if (approved !== null) where.approved = approved === "true";

    const comments = await prisma.comment.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: {
        post: {
          select: {
            id: true,
            title: true,
          },
        },
        replies: true,
      },
    });

    return NextResponse.json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json(
      { error: "Failed to fetch comments" },
      { status: 500 }
    );
  }
}

// POST - 创建评论
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { postId, author, content, parentId } = body;

    if (!content || content.trim().length === 0) {
      return NextResponse.json(
        { error: "Content is required" },
        { status: 400 }
      );
    }

    const comment = await prisma.comment.create({
      data: {
        postId,
        author: author || "匿名",
        content,
        parentId,
        approved: false, // 需要管理员审核
      },
    });

    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    console.error("Error creating comment:", error);
    return NextResponse.json(
      { error: "Failed to create comment" },
      { status: 500 }
    );
  }
}

// PUT - 更新评论（审核/点赞）
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, approved, likes } = body;

    const session = await getServerSession(authOptions);

    // 审核需要管理员权限
    if (approved !== undefined && !session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data: any = {};
    if (approved !== undefined) data.approved = approved;
    if (likes !== undefined) data.likes = likes;

    const comment = await prisma.comment.update({
      where: { id },
      data,
    });

    return NextResponse.json(comment);
  } catch (error) {
    console.error("Error updating comment:", error);
    return NextResponse.json(
      { error: "Failed to update comment" },
      { status: 500 }
    );
  }
}

// DELETE - 删除评论
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Comment ID is required" },
        { status: 400 }
      );
    }

    await prisma.comment.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting comment:", error);
    return NextResponse.json(
      { error: "Failed to delete comment" },
      { status: 500 }
    );
  }
}
