import React from "react";
import { usePageNavigation } from "@/shared/lib/hooks";
import { FindPassWordView } from "./findPassWord.view";
import { useState } from "react";

export const FindController = () => {
  // View에서 사용되어질 상태관리
    const [step, setStep] = useState<"initial" | "certification" | "form">("initial");
  
    // Controller에서 View로 내려질 Props
    const props = {
      state: { step, setStep },
    };
  return <FindPassWordView {...props}/>;
};

