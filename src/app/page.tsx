import Link from "next/link";
import React from "react";

const HomePage = async () => {
  return (
    <React.Fragment>
      <main>
        <Link href={"/tests/users"}>Test Users</Link>
      </main>
    </React.Fragment>
  );
};

export default HomePage;
