import { usePageNavigation } from "@/shared/lib/hooks";
import { useLocation } from "react-router-dom";
import { MyInfoSidebar } from "./components/sidebar";
import { PageTabs } from "@/shared/components";
import { MyInfoForm } from "./components/infoform";


export const MyPageView = () => {
 
const location = useLocation();
  const params = new URLSearchParams(location.search);
  const currentTab = params.get("menu") || "basic";
    
  const userInfo = {
      email: "pulse@naver.com",
      nickname: "짱구는목말라",
      name: "김펄스",
      phone: "010-1234-1234",
    };

  return (
    <div className="mypage-layout">
      <MyInfoSidebar selected={currentTab}/>
      

      <main className="mypage-main">
        <h1 className="mypage-title">내 정보</h1>

        <PageTabs
          tabList={[
            { id: "basic", display: "기본 정보" },
            { id: "mentor", display: "멘토 정보" },
            { id: "condition", display: "맞춤 멘토 조건" },
          ]}
        />

        <div className="tab-panel">
          {currentTab === "basic" && <MyInfoForm data={userInfo}/>}
          {currentTab === "mentor" && <div>멘토 정보 콘텐츠</div>}
          {currentTab === "condition" && <div>맞춤 멘토 조건 콘텐츠</div>}
        </div>
      </main>
    </div>
  );
};
