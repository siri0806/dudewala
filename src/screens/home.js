import React from "react";
import Navbar from "../components/navbar";
import Caroussel from "../components/Caroussel";

export default function Home() {
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div>
        <Caroussel/>
      </div>
    </>
  );
}
