const groups = [
  { id: "1", name: "그룹명1" },
  { id: "2", name: "그룹명2" },
  { id: "3", name: "그룹명3" },
  { id: "3", name: "그룹명은최대열두자까지임" },
  { id: "4", name: "그룹명은최대열두자까지임" },
];

// const groups
import { Typography } from "@/shared/components";
const ChatGroupList = () => {
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
            style={{
              width: "104px",
              height: "64px",
              borderRadius: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid #E0E0E0",
              backgroundColor: "#fff",
              cursor: "pointer",
              whiteSpace: "normal",
              wordBreak: "break-word",
              textAlign: "center",
              padding: "15px 16px 14px 16px",
            }}
          >
            <Typography variant="compact" size="14" weight="medium">
              {group.name}
            </Typography>
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ChatGroupList;
