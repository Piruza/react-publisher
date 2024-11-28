import React from "react";

import Header from "@/components/partials/Header";
import LoginBox from "./components/LoginBox";

export default function Login() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <main>
        <Header />

        <LoginBox />

      </main>
    </>
  );
}
