
import { useState } from "react";
import { Icon } from "@/shared/components";


export const MyInfoForm = ({ data }: { data: any }) => {
  const [emailAgree, setEmailAgree] = useState(true);
  const [smsAgree, setSmsAgree] = useState(false);

  return (
    <>
    <div className="info-box">
      <div>이메일: {data.email}</div>
      <div>비밀번호:  <button>변경</button></div>
      <div>닉네임: {data.nickname} <button>변경</button></div>
      <div>이름: {data.name}</div>
      <div>휴대폰 번호: {data.phone}</div>
      <div>
        이메일 수신 동의: 
        <input className="toggle-switch" type="checkbox" checked={emailAgree} onChange={(e) => setEmailAgree(e.target.checked)} />
      </div>
      <div>
        SMS 수신 동의:
        <input className="toggle-switch" type="checkbox" checked={smsAgree} onChange={(e) => setSmsAgree(e.target.checked)} />
      </div>

      
    </div>
      <div className="info-withdraw">
        <button>회원 탈퇴 <Icon src={"chevron_right"} alt="탈퇴하기"/></button>
      </div>
      </>
  );
};
