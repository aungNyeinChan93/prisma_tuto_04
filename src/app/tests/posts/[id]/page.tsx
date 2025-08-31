import prisma from "@/config/prisma-config";
import React from "react";

interface Props {
  params: Promise<{
    id?: string;
  }>;
}

const DetailPost = async ({ params }: Props) => {
  const { id } = await params;

  const post = await prisma.post.findFirst({
    where: {
      id: {
        equals: Number(id),
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      title: true,
      id: true,
    },
  });

  return (
    <React.Fragment>
      <main>
        <pre className="text-4xl">{JSON.stringify(post, null, 2)}</pre>
      </main>
    </React.Fragment>
  );
};

export default DetailPost;
