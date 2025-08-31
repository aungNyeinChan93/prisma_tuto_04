import prisma from "@/config/prisma-config";
import React from "react";

const UserPage = async () => {
  const users = await prisma.user.findMany();

  return (
    <React.Fragment>
      <main>
        <pre>{JSON.stringify(users, null, 2)}</pre>
      </main>
    </React.Fragment>
  );
};

export default UserPage;
