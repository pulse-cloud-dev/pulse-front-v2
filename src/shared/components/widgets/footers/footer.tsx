import React from "react";
import { Icon, Linker } from "@/shared/components/atoms";



export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__top">
          <Linker href="/" className="header__logo text_bk_wh ">
            <Icon src="logo_01" className="logo" alt="HOME" />
          </Linker>

          <div className="footer__menu">
            <span>개인정보처리방침</span>
            <span className="divider">|</span>
            <span>이용약관</span>
          </div>
        </div>

        <div className="footer__text">
          <p>안녕하세요, Pulse입니다.</p>
          <p>
            저희는 커리어가 없거나 커리어 전환을 하기 위한 사람들을 위해 지속적인 성장을 제공합니다.
            <br />
            멘토로서 지식을 제공하거나, 멘티로서 경험과 지식을 쌓아보세요.
          </p>
        </div>

        <div className="footer__copyright">
          PulseProject©2025
        </div>
      </div>
    </footer>
  );
};
