import { socialConstant } from "@/shared/constants";
import { BaseButton, Icon } from "@/shared/components";

// Step 2
export const SignUpCertificationStep = ({ handleJoinSocial }: { handleJoinSocial: () => void }) => {
  const socialLogin = socialConstant.socialLogin;

  return (
    <div className="m-t-40 w-100 flex_r align_center justify_center">
      {socialLogin.map((item) => (
        <BaseButton className="w400 m-b-30 border gap_8" size="xl" onClick={handleJoinSocial}>
          <Icon src={item.icon} alt={item.alt} />
          {item.text}
        </BaseButton>
      ))}
    </div>
  );
};
