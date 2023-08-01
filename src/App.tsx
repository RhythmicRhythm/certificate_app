import React, { lazy, Suspense, useRef } from "react";
import { useState } from "react";
import IdPage from "./pages/IdPage";
const Certificate = lazy(() => import("./pages/Certificate"));
const Certificate2 = lazy(() => import("./pages/Certificate2"));
import { Route, Routes } from "react-router-dom";
function App() {
  const [imgData, setImgData] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  return (
    <Suspense
      fallback={
        <p className="h-screen flex items-center font-bold justify-center text-5xl">
          LOADING USER DATA ......
        </p>
      }
    >
      <Routes>
        <Route path="/" element={<Certificate2 />} />
        <Route path="/certificates" element={<Certificate />} />
       
      </Routes>
    </Suspense>
  );
}

export default App;
