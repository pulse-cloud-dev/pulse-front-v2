import { useCallback, useState } from "react";

type TabItem = {
  id: string;
  display: string;
};

interface PageTabsProps {
  tabList: TabItem[];
}

export const PageTabs = (props: PageTabsProps) => {
  const { tabList } = props;
  const [activeTab, setActiveTab] = useState<string>(tabList[0].id);

  const onClick = useCallback((id: string) => {
    setActiveTab(id);
  }, []);

  if (tabList?.length === 0) return null;

  return (
    <div className="tabs__pageMenu" role="tablist">
      {tabList?.map(({ id: tabId, display }) => (
        <button id={tabId} className={`tabs-btn ${activeTab === tabId ? "active" : ""}`} role="tab" onClick={() => onClick(tabId)}>
          {display}
        </button>
      ))}
    </div>
  );
};
