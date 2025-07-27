import { Typography } from "@/shared/components";
import React, { useEffect } from "react";

interface ChatGroupProps {
  children?: React.ReactNode;
}

export const TempLayout = ({ children }: ChatGroupProps) => {
  return (
    <>
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          width: "336px",
          height: "100%",
          overflow: "scroll",
        }}
      >
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            paddingRight: "25px",
            paddingLeft: "25px",
            position: "sticky",
            top: 0,
            zIndex: 10,
            backgroundColor: "#FFFFFF",
          }}
        >
          <PageTabs
            tabList={[
              { id: "accept", display: "수락" },
              { id: "allow", display: "요청" },
            ]}
          />
        </header>

        {children}
      </section>
    </>
  );
};
import { useCallback, useId, useMemo } from "react";

type TabItem = {
  id: string;
  display: string;
};

interface PageTabsProps {
  tabList: TabItem[];
}
import { useQueryParams } from "@/shared/modules/modals/shared/hooks/usequeryparams";
export const PageTabs = ({ tabList }: PageTabsProps) => {
  const tabGroupId = useId();

  const { currentValue, setQueryValue } = useQueryParams("status");

  const currentTab = currentValue;

  useEffect(() => {
    setQueryValue("accept");
  }, []);

  const onClick = useCallback(
    (id: string) => {
      if (id !== currentTab) {
        setQueryValue(id);
      }
    },
    [currentTab]
  );

  const renderedTabs = useMemo(
    () =>
      tabList.map(({ id: tabId, display }) => (
        <button key={tabId} id={`${tabGroupId}-${tabId}`} className={`tabs-btn ${currentTab === tabId ? "active" : ""}`} role="tab" aria-selected={currentTab === tabId} aria-controls={`tabpanel-${tabId}`} onClick={() => onClick(tabId)}>
          <Typography variant="compact" size="16" weight={currentTab === tabId ? "bold" : "medium"}>
            {display}
          </Typography>
        </button>
      )),
    [tabList, currentTab, onClick, tabGroupId]
  );

  if (!tabList.length) return null;

  return (
    <div className="tabs__pageMenu" role="tablist" style={{ height: "71px" }}>
      {renderedTabs}
    </div>
  );
};
