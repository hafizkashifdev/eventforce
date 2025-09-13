"use client";
import { useState, useEffect } from "react";
import { useMediaQuery as useMuiMediaQuery } from "@mui/material";

export function useMediaQuery(query: string) {
  const [mounted, setMounted] = useState(false);
  const matches = useMuiMediaQuery(query);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent SSR hydration mismatch
  return mounted ? matches : false;
}
