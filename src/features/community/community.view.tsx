import { Typography } from "@/shared/components";
import React from "react";

interface CommunityViewProps {}
export const CommunityView = (props: CommunityViewProps) => {
  return (
    <article className="sub-layout__content">
      <div className="flex_c border-b">
        <h1>타이포 그래피 Title</h1>
        <Typography variant="title" size="56">
          안녕하세요 텍스트입니다. - 56
        </Typography>
        <Typography variant="title" size="48">
          안녕하세요 텍스트입니다. - 48
        </Typography>
        <Typography variant="title" size="40">
          안녕하세요 텍스트입니다. - 40
        </Typography>
        <Typography variant="title" size="36">
          안녕하세요 텍스트입니다. - 36
        </Typography>
        <Typography variant="title" size="28">
          안녕하세요 텍스트입니다. - 28
        </Typography>
        <Typography variant="title" size="24">
          안녕하세요 텍스트입니다. - 24
        </Typography>
        <Typography variant="title" size="20">
          안녕하세요 텍스트입니다. - 20
        </Typography>
        <Typography variant="title" size="18">
          안녕하세요 텍스트입니다. - 18
        </Typography>
      </div>

      <div className="flex_c border-b">
        <h1>타이포 그래피 Compact</h1>
        <Typography variant="compact" size="18">
          안녕하세요 텍스트입니다. - 18
        </Typography>
        <Typography variant="compact" size="16">
          안녕하세요 텍스트입니다. - 16
        </Typography>
        <Typography variant="compact" size="15">
          안녕하세요 텍스트입니다. - 15
        </Typography>
        <Typography variant="compact" size="14">
          안녕하세요 텍스트입니다. - 14
        </Typography>
        <Typography variant="compact" size="13">
          안녕하세요 텍스트입니다. - 13
        </Typography>
        <Typography variant="compact" size="12">
          안녕하세요 텍스트입니다. - 12
        </Typography>
        <Typography variant="compact" size="11">
          안녕하세요 텍스트입니다. - 11
        </Typography>
      </div>

      <div className="flex_c border-b">
        <h1>타이포 그래피 Body</h1>
        <Typography variant="body" size="18">
          안녕하세요 텍스트입니다. - 18
        </Typography>
        <Typography variant="body" size="16">
          안녕하세요 텍스트입니다. - 16
        </Typography>
        <Typography variant="body" size="15">
          안녕하세요 텍스트입니다. - 15
        </Typography>
        <Typography variant="body" size="14">
          안녕하세요 텍스트입니다. - 14
        </Typography>
        <Typography variant="body" size="12">
          안녕하세요 텍스트입니다. - 12
        </Typography>
      </div>
    </article>
  );
};
