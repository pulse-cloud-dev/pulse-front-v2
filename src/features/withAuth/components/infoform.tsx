
import { useState } from "react";
import { Icon } from "@/shared/components";
import { ToggleSwitch } from "@/shared/components";
import { NicknameEditModal } from "./modal/nickname";
import { PasswordEditModal } from "./modal/password";
import { EmailConfirmContainer } from "./modal/emailConfirm";

export const MyInfoForm = ({ data }: { data: any }) => {
  const [emailAgree, setEmailAgree] = useState(true);
  const [smsAgree, setSmsAgree] = useState(false);

  const [modalId, setModalId] = useState<null | string>(null);
  const [isNicknameModalOpen, setIsNicknameModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isEmailConfirmOpen, setIsEmailConfirmOpen] = useState(false);



  return (
    <>
    <div className="info-box">
      <div className="info-row">
        <div className="info-label">이메일</div>
        <div className="info-value">{data.email}</div>
      </div>
      <div className="info-row">
        <div className="info-label">비밀번호</div>
        <div className="info-value">
          {data.password}
          <button onClick={() => setIsPasswordModalOpen(true)}>변경</button>
        </div>
      </div>
      <div className="info-row">
        <div className="info-label">닉네임</div>
        <div className="info-value">
          {data.nickname}
                    <button onClick={() => setIsNicknameModalOpen(true)}>변경</button>

        </div>
      </div>
      <div className="info-row">
        <div className="info-label">이름</div>
        <div className="info-value">{data.name}</div>
      </div>
      <div className="info-row">
        <div className="info-label">휴대폰 번호</div>
        <div className="info-value">{data.phone}</div>
      </div>
      <div className="info-row">
        <div className="info-label">이메일 수신 동의</div>
        <div className="info-value">
          <ToggleSwitch
            checked={emailAgree}
          
            onChange={(val) => setEmailAgree(val)}
          />
        </div>
      </div>
      <div className="info-row">
        <div className="info-label">SMS 수신 동의</div>
        <div className="info-value">
          <ToggleSwitch
            checked={smsAgree}
            onChange={(val) => setSmsAgree(val)}
          />
        </div>
      </div>

      
    </div>
      <div className="info-withdraw">
        <button>회원 탈퇴 <Icon src={"chevron_right"} alt="탈퇴하기"/></button>
      </div>

      {/* 닉네임 변경 모달 */}
      {isNicknameModalOpen && (
        <NicknameEditModal
          id="nickname-edit"
          closeModal={() => setIsNicknameModalOpen(false)}
        />
      )}

      {/* 비밀번호 변경 모달 */}
      {isPasswordModalOpen && (
        <PasswordEditModal
          id="nickname-edit"
          closeModal={() => setIsPasswordModalOpen(false)}
        />
      )}

      {/* 이메일 confirm */}
      
      </>
  );
};
