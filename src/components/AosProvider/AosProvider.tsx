"use client";
import Aos from "aos";
import React, { ReactNode, useEffect } from "react";

const AosProvider = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    Aos.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return <>{children}</>;
};

export default AosProvider;
