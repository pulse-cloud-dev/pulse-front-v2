import { socialConstant } from "@/shared/constants";
import { BaseButton, Icon, Typography } from "@/shared/components";

// Step 2
export const SignUpCertificationStep = ({ handleJoinSocial }: { handleJoinSocial: () => void }) => {
  const socialLogin = socialConstant.socialLogin;

  return (
    <div className="m-t-33 w-100 flex_r align_center justify_center">
      {socialLogin.map((item) => (
        <BaseButton className="w400 m-b-30 border gap_8" size="xl" onClick={handleJoinSocial}>
          <Icon src={item.icon} alt={item.alt} />
          <Typography variant="compact" size="16" weight="regular" color="grayscale" colorscale="90" style={{ letterSpacing: "-2%", lineHeight: "100%" }}>
            {item.text}
          </Typography>
        </BaseButton>
      ))}
    </div>
  );
};
