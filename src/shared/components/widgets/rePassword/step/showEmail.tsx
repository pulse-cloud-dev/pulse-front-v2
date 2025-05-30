import { Typography } from "@/shared/components";


const FoundAccountPanel = ({ email, name }: { email: string; name: string }) => {
  return (
    <div className="w-100 border-gray flex_c align-center justify_center gap_16" style={{ padding: "24px", height: "104px", borderRadius: "10px" }}>
      <p>
        <Typography variant="compact" size="16" weight="bold" color="grayscale" colorscale="90">
          {name}님의 아이디
        </Typography>
      </p>
      <p>
        <Typography variant="compact" size="18" weight="regular" color="grayscale" colorscale="90">
          {email}
        </Typography>
      </p>
    </div>
  );
};


export const ShowEmailIdStep = ({
  email,
  name,
  onNext,
  onSignIn,
}: {
  email: string;
  name: string;
  onNext?: () => void;
  onSignIn?: () => void;
}) => {
  return (
    <>
      <FoundAccountPanel email={email} name={name} />
      <div className="w-80 m-t-40 flex_r align_center justify_center gap_8" style={{ margin: "auto" }}>
        <button className="find_reset__button" onClick={onNext}>
          비밀번호 재설정
        </button>
        <button className={`fs_16 find_submit_button btn_l flex1`} onClick={onSignIn}>
          로그인하기
        </button>
      </div>
    </>
  );
};