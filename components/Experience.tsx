"use client";

import { useEffect } from "react";
import { initExperience } from "@/lib/experience";

/* Liga toda a interação do site (lib/experience.ts) depois que a página aparece. */
export default function Experience() {
  useEffect(() => initExperience(document), []);
  return null;
}
