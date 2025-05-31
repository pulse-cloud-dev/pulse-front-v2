import { useCallback, useId, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

type TabItem = {
  id: string;
  display: string;
};

interface PageTabsProps {
  tabList: TabItem[];
}

export const PageTabs = ({ tabList }: PageTabsProps) => {
  const navigate = useNavigate();
  const tabGroupId = useId();
  const [activeTab, setActiveTab] = useState<string>(tabList[0]?.id ?? ""); // 방어 코드 추가

  const onClick = useCallback(
    (id: string) => {
      setActiveTab(id);
      navigate(`?menu=${id}`);
    },
    [setActiveTab]
  );

  const renderedTabs = useMemo(
    () =>
      tabList.map(({ id: tabId, display }) => (
        <button key={tabId} id={`${tabGroupId}-${tabId}`} className={`tabs-btn ${activeTab === tabId ? "active" : ""}`} role="tab" aria-selected={activeTab === tabId} onClick={() => onClick(tabId)}>
          {display}
        </button>
      )),
    [tabList, activeTab, onClick, tabGroupId]
  );

  if (!tabList.length) return null;

  return (
    <div className="tabs__pageMenu" role="tablist">
      {renderedTabs}
    </div>
  );
};
