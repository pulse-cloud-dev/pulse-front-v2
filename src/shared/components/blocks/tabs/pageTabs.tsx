import { useCallback, useId, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";


type TabItem = {
  id: string;
  display: string;
};

interface PageTabsProps {
  tabList: TabItem[];
}

export const PageTabs = ({ tabList }: PageTabsProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const tabGroupId = useId();

  const params = new URLSearchParams(location.search);
  const currentTab = (params.get("menu") || tabList[0]?.id) ?? "";

  const onClick = useCallback(
    (id: string) => {
      if (id !== currentTab) {
       navigate(`?menu=${id}`);
      }
    },
    [navigate, currentTab]
  );

   const renderedTabs = useMemo(
    () =>
      tabList.map(({ id: tabId, display }) => (
        <button
          key={tabId}
          id={`${tabGroupId}-${tabId}`}
          className={`tabs-btn ${currentTab === tabId ? "active" : ""}`}
          role="tab"
          aria-selected={currentTab === tabId}
          aria-controls={`tabpanel-${tabId}`}
          onClick={() => onClick(tabId)}
        >
          {display}
        </button>
      )),
    [tabList, currentTab, onClick, tabGroupId]
  );

  if (!tabList.length) return null;

  return (
    <div className="tabs__pageMenu" role="tablist">
      {renderedTabs}
    </div>
  );
};
