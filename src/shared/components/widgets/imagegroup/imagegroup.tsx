const DEFAULT_PROFILE_IMAGE = "profile 1";
import { Participants } from "@/features/chat/view/chatroom/chat.roomlist";
import { Image } from "../../atoms";

export const ImageGroup = ({ participants }: Participants) => {
  const displayedImages = participants.slice(0, 4);

  if (displayedImages.length === 0) {
    return (
      <div style={{ width: "48px", height: "48px" }}>
        <Image
          src={DEFAULT_PROFILE_IMAGE}
          alt="default profile"
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
      </div>
    );
  }
  if (displayedImages.length === 1) {
    return (
      <div style={{ width: "48px", height: "48px" }}>
        <Image
          src={displayedImages[0]}
          alt="participant"
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
      </div>
    );
  }

  // Multiple images - show in 2x2 grid for better visibility
  if (displayedImages.length === 2) {
    return (
      <div
        style={{
          display: "flex",
          position: "relative",
          width: "48px",
          height: "48px",
          gap: "2px",
        }}
      >
        <Image
          src={displayedImages[0]}
          alt="participant-0"
          style={{
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            objectFit: "cover",
            border: "1px solid white",
            position: "absolute",
            top: "0px",
            left: "0px",
            zIndex: 2,
          }}
        />
        <Image
          src={displayedImages[1]}
          alt="participant-1"
          style={{
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            objectFit: "cover",
            border: "1px solid white",
            position: "absolute",
            top: "16px",
            left: "16px",
            zIndex: 1,
          }}
        />
      </div>
    );
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows: "1fr 1fr",
        gap: "2px",
        width: "48px",
        height: "48px",
        padding: "2px",
      }}
    >
      {displayedImages.map((img, idx) => (
        <Image
          key={idx}
          src={img}
          alt={`participant-${idx}`}
          style={{
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            objectFit: "cover",
            border: "1px solid white",
          }}
        />
      ))}
    </div>
  );
};
