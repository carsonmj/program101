import React, { useState } from "react";

import { FolderTree, StepProgressBar } from "../../components/organisms";
import { MainTemplate, TooltipModal } from "../../components/templates";

const MainPage = () => {
  return (
    <>
      <TooltipModal direction="left" />
      <MainTemplate
        visualContent={<StepProgressBar labels={["step1", "step2", "step3"]} />}
        codeContent={<FolderTree />}
      />
    </>
  );
};

export default MainPage;