import React from "react";

import Header from "@/components/partials/Header";
import RegisterBox from "./components/RegisterBox";
import { useSearchParams } from "react-router-dom";



export default function Register() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <main>
        <Header />

        <RegisterBox />

      </main>
    </>
  );
}
