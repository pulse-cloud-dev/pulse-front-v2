import { CheckField, useCheckFieldGroup } from "@/shared/modules/select-ui";
import type { HTMLAttributes, PropsWithChildren } from "react";
import { BaseButton } from "../../atoms";
import { useState } from "react";
import { Icon } from "@/shared/components";

interface HeaderProps extends HTMLAttributes<HTMLElement>, PropsWithChildren {}
const Header = (props: HeaderProps) => {
  const { className, children, ...restProps } = props;
  return (
    <header className={`popup--local__header ${className}`} {...restProps}>
      {/* {children} */}
      <div className="popup--local__search">
        <input type="text" placeholder="찾으시는 지역을 검색해 주세요" />
        <Icon
          src="search_18"
          alt="검색 아이콘"
          className="popup--local__search-icon"
        />
      </div>
    </header>
  );
};

interface BodyProps extends HTMLAttributes<HTMLDivElement>, PropsWithChildren {}
const CITIES = [
  "서울특별시",
  "부산광역시",
  "대구광역시",
  "인천광역시",
  "광주광역시",
  "대전광역시",
  "울산광역시",
  "세종특별자치시",
  "경기도",
  "강원특별자치도",
  "충청북도",
  "충청남도",
  "전라북도",
  "전라남도",
  "경상북도",
  "경상남도",
  "제주특별자치도",
  "전국",
];
const DISTRICTS: Record<string, string[]> = {
  서울특별시: ["전체", "강남구", "강동구", "강북구", "강서구", "관악구", "광진구", "구로구", "노원구"],
  부산광역시: ["전체", "해운대구", "부산진구", "사하구", "동래구"],
  대구광역시: ["전체", "중구", "동구", "서구", "남구", "북구"],
  인천광역시: ["전체", "계양구", "부평구", "남동구", "미추홀구"],
  광주광역시: ["전체", "북구", "동구", "서구", "남구"],
  대전광역시: ["전체", "유성구", "서구", "동구", "중구"],
  울산광역시: ["전체", "남구", "중구", "동구", "북구"],
  세종특별자치시: ["전체"],
  경기도: ["전체", "수원시", "성남시", "용인시", "고양시", "화성시"],
  강원특별자치도: ["전체", "춘천시", "원주시", "강릉시"],
  충청북도: ["전체", "청주시", "충주시", "제천시"],
  충청남도: ["전체", "천안시", "아산시", "서산시"],
  전라북도: ["전체", "전주시", "군산시", "익산시"],
  전라남도: ["전체", "목포시", "여수시", "순천시"],
  경상북도: ["전체", "포항시", "경주시", "김천시"],
  경상남도: ["전체", "창원시", "진주시", "김해시"],
  제주특별자치도: ["전체", "제주시", "서귀포시"],
  전국: ["전체"],
};


export const Body = (props: BodyProps) => {
  const { className, ...restProps } = props;

  const [selectedCity, setSelectedCity] = useState("서울특별시");
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const handleToggle = (key: string) => {
    const selectedCount = Object.values(checkedItems).filter(Boolean).length;
    if (checkedItems[key]) {
      setCheckedItems({ ...checkedItems, [key]: false });
    } else if (selectedCount < 10) {
      setCheckedItems({ ...checkedItems, [key]: true });
    } else {
      alert("최대 10개까지 선택 가능합니다.");
    }
  };

  return (
    <div className={`popup--local__body ${className || ""}`} {...restProps}>
      {/* 시/도 리스트 */}
      <div className="popup--local__column popup--local__column--left">
        {CITIES.map((city) => (
          <div
            key={city}
            className={`popup--local__item ${selectedCity === city ? "active" : ""}`}
            onClick={() => setSelectedCity(city)}
          >
            {city}
          </div>
        ))}
      </div>

      {/* 구/군 리스트 */}
      <div className="popup--local__column popup--local__column--right">
        {DISTRICTS[selectedCity]?.map((district) => (
          <CheckField key={district} className="check-field-module" variant="circle">
            <CheckField.Input
              checkId={district}
              name={district}
              isChecked={!!checkedItems[district]}
              onChange={() => handleToggle(district)}
            />
            <CheckField.Label checkId={district}>{district}</CheckField.Label>
          </CheckField>
        ))}
      </div>
    </div>
  );
};

import { ResetSelection } from "../../atoms/reset/resetSelection";

interface FooterProps extends HTMLAttributes<HTMLElement>, PropsWithChildren {}
const Footer = (props: FooterProps) => {
  const { className = "online", children, ...restProps } = props;
  return (
    <footer className={`popup--online__footer ${className}`} {...restProps}>
      <ResetSelection className={className}/>
      <div className="popup--online__footer--right">
        <BaseButton color="reverse">닫기</BaseButton>
        <BaseButton color="teal">적용</BaseButton>
      </div>
    </footer>
  );
};

export function LocalPopup() {
  return (
    <div className="popup--local">
      <Header />
      <Body />
      <Footer />
    </div>
  );
}
