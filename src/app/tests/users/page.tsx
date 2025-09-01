import prisma from "@/config/prisma-config";
import React from "react";

const UserPage = async () => {
  const users = await prisma.user.findMany({
    include: {
      posts: true,
      profile: true,
    },
  });

  return (
    <React.Fragment>
      <main>
        <pre>{JSON.stringify(users, null, 2)}</pre>
      </main>
    </React.Fragment>
  );
};

export default UserPage;
