import prisma from "@/config/prisma-config";
import Link from "next/link";
import React from "react";

export type Post = {
  id?: string | number;
  title: string;
  content?: string | null;
  image?: string | null | File;
  published?: boolean | null;
  createdAt?: Date | string | null;
  updatedAt?: Date | string | null;
};

const PostsPage = async () => {
  const posts: Post[] = await prisma.post.findMany({
    include: {
      user: true,
    },
    orderBy: {
      createdAt: "asc",
    },
    // select: {
    //   title: true,
    //   content: true,
    //   id: true,
    // },
    take: 10,
    // skip: 1,
  });

  const totalPosts = await prisma.post.count();
  return (
    <React.Fragment>
      <main className="container mx-auto w-full h-auto p-2">
        <Link href={"/tests/posts/create-post"}>➕</Link>
        <h3 className="p-2 text-2xl text-red-500">
          Total Posts : {totalPosts}
        </h3>
        <pre>{JSON.stringify(posts, null, 2)}</pre>
      </main>
    </React.Fragment>
  );
};

export default PostsPage;
