import { Typography } from "@/shared/components";
import { useQueryParams } from "@/shared/modules/modals/shared/hooks/usequeryparams";
import { useSearchParams } from "react-router-dom";

const baseGroups = [
  { id: "1", name: "그룹명1" },
  { id: "2", name: "그룹명2" },
  { id: "3", name: "그룹명3" },
  { id: "4", name: "그룹명은최대열두자까지임" },
  { id: "5", name: "그룹명은최대열두자까지임" },
];

const groups = Array.from({ length: 30 }, (_, i) => {
  const base = baseGroups[i % baseGroups.length];
  return {
    id: String(i + 1),
    name: base.name,
  };
});

const ChatGroupList = () => {
  const { currentValue: currentGroupId } = useQueryParams("group");
  const [_, setSearchParams] = useSearchParams();

  return (
    <ul
      style={{
        listStyle: "none",
        padding: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "12px",
        marginBottom: "12px",
      }}
    >
      {groups.map((group) => (
        <li key={group.id}>
          <button
            onClick={() => {
              setSearchParams({ group: group.id }, { replace: true });
            }}
            style={{
              width: "104px",
              height: "64px",
              borderRadius: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid #E0E0E0",
              backgroundColor: currentGroupId === group.id ? "#EBFAF8" : "#fff", // 강조
              cursor: "pointer",
              whiteSpace: "normal",
              wordBreak: "break-word",
              textAlign: "center",
              padding: "15px 16px 14px 16px",
            }}
          >
            <Typography variant="compact" size="14" weight="medium" color={currentGroupId === group.id ? "primary" : "black"}>
              {group.name}
            </Typography>
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ChatGroupList;
