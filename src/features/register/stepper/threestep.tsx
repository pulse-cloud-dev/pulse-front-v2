import { StepProps } from "./type/stepstype";
import { BaseButton, Typography } from "@/shared/components";
import { HTMLAttributes, PropsWithChildren, useState } from "react";
import { useSchedule } from "./schedulecontext/context";
import { CheckField } from "@/shared/modules/select-ui";
import { Icon } from "@/shared/components";

import React, { forwardRef } from "react";
type Region = {
  city: string;
  district: string;
};

type RemovableRegiobuttonProps = {
  region: Region;
  onRemove?: () => void;
};

const RemovableRegiobutton = forwardRef<HTMLButtonElement, RemovableRegiobuttonProps>(({ region, onRemove }, ref) => {
  return (
    <button ref={ref} type="button" onClick={onRemove} aria-label={`Remove ${region.city} ${region.district}`} style={{ display: "inline-flex", justifyContent: "center", alignItems: "center" }}>
      <Typography size="14" weight="medium" color="primary" colorscale="40" style={{ display: "inline-block" }}>
        {region.city}
        {region.district}
      </Typography>
      <Icon src="close_line_bk_24" alt="지역 제거" style={{ width: "10px", height: "10px" }} />
    </button>
  );
});

interface FooterProps extends HTMLAttributes<HTMLElement>, PropsWithChildren {
  onPrev: () => void;
  onNext: () => void;
}

const Footer = ({ className = "", onPrev, onNext, ...restProps }: FooterProps) => {
  const { schedule, dispatch } = useSchedule();

  return (
    <footer className={`popup--online__footer ${className}`} {...restProps} style={{ display: "flex", flexDirection: "column" }}>
      <div
        style={{
          width: "100%",
          height: "98px",
          borderBottom: "1px solid var(--palette-gray-30)",
          padding: "16px 24px",
        }}
      >
        {Array.from(schedule.region).map((region) => (
          <RemovableRegiobutton key={`${region.city}-${region.district}`} region={region} onRemove={() => dispatch({ type: "DELETE_REGION", payload: region })} />
        ))}
      </div>
      <div
        style={{
          marginTop: "10px",
          marginLeft: "auto",
          display: "flex",
          gap: "8px",
          justifyContent: "flex-end",
          alignItems: "center",
          padding: "16px 24px",
        }}
      >
        <BaseButton color="reverse" onClick={onPrev}>
          나중에
        </BaseButton>
        <BaseButton color="primary" onClick={onPrev}>
          지금등록
        </BaseButton>
      </div>
    </footer>
  );
};

interface BodyProps extends HTMLAttributes<HTMLDivElement>, PropsWithChildren {}
const Body = (props: BodyProps) => {
  const { className, children, ...restProps } = props;
  const [city, setCity] = useState("서울특별시");

  const regions = [
    {
      city: "서울특별시",
      district: [
        "종로구",
        "중구",
        "용산구",
        "성동구",
        "광진구",
        "동대문구",
        "중랑구",
        "성북구",
        "강북구",
        "도봉구",
        "노원구",
        "은평구",
        "서대문구",
        "마포구",
        "양천구",
        "강서구",
        "구로구",
        "금천구",
        "영등포구",
        "동작구",
        "관악구",
        "서초구",
        "강남구",
        "송파구",
        "강동구",
      ],
    },
    {
      city: "부산광역시",
      district: ["중구", "서구", "동구", "영도구", "부산진구", "동래구", "남구", "북구", "해운대구", "사하구", "금정구", "강서구", "연제구", "수영구", "사상구", "기장군"],
    },
    {
      city: "대구광역시",
      district: ["중구", "동구", "서구", "남구", "북구", "수성구", "달서구", "달성군"],
    },
    {
      city: "인천광역시",
      district: ["중구", "동구", "미추홀구", "연수구", "남동구", "부평구", "계양구", "서구", "강화군", "옹진군"],
    },
    {
      city: "광주광역시",
      district: ["동구", "서구", "남구", "북구", "광산구"],
    },
    {
      city: "대전광역시",
      district: ["동구", "중구", "서구", "유성구", "대덕구"],
    },
    {
      city: "울산광역시",
      district: ["중구", "남구", "동구", "북구", "울주군"],
    },
    {
      city: "세종특별자치시",
      district: ["세종특별자치시"],
    },
    {
      city: "경기도",
      district: [
        "수원시 장안구",
        "수원시 권선구",
        "수원시 팔달구",
        "수원시 영통구",
        "성남시 수정구",
        "성남시 중원구",
        "성남시 분당구",
        "의정부시",
        "안양시 만안구",
        "안양시 동안구",
        "부천시",
        "광명시",
        "평택시",
        "동두천시",
        "안산시 상록구",
        "안산시 단원구",
        "고양시 덕양구",
        "고양시 일산동구",
        "고양시 일산서구",
        "과천시",
        "구리시",
        "남양주시",
        "오산시",
        "시흥시",
        "군포시",
        "의왕시",
        "하남시",
        "용인시 처인구",
        "용인시 기흥구",
        "용인시 수지구",
        "파주시",
        "이천시",
        "안성시",
        "김포시",
        "화성시",
        "광주시",
        "양주시",
        "포천시",
        "여주시",
        "연천군",
        "가평군",
        "양평군",
      ],
    },
    {
      city: "강원도",
      district: ["춘천시", "원주시", "강릉시", "동해시", "태백시", "속초시", "삼척시", "홍천군", "횡성군", "영월군", "평창군", "정선군", "철원군", "화천군", "양구군", "인제군", "고성군", "양양군"],
    },
    {
      city: "충청북도",
      district: ["청주시 상당구", "청주시 흥덕구", "청주시 서원구", "청주시 청원구", "충주시", "제천시", "보은군", "옥천군", "영동군", "진천군", "괴산군", "음성군", "단양군"],
    },
    {
      city: "충청남도",
      district: ["천안시 동남구", "천안시 서북구", "공주시", "보령시", "아산시", "서산시", "논산시", "계룡시", "당진시", "금산군", "부여군", "서천군", "청양군", "홍성군", "예산군", "태안군"],
    },
    {
      city: "전라북도",
      district: ["전주시 완산구", "전주시 덕진구", "군산시", "익산시", "정읍시", "남원시", "김제시", "완주군", "진안군", "무주군", "장수군", "임실군", "순창군", "고창군", "부안군"],
    },
    {
      city: "전라남도",
      district: ["목포시", "여수시", "순천시", "나주시", "광양시", "담양군", "곡성군", "구례군", "고흥군", "보성군", "화순군", "장흥군", "강진군", "해남군", "영암군", "무안군", "함평군", "영광군", "장성군", "완도군", "진도군", "신안군"],
    },
    {
      city: "경상북도",
      district: [
        "포항시 남구",
        "포항시 북구",
        "경주시",
        "김천시",
        "안동시",
        "구미시",
        "영주시",
        "영천시",
        "상주시",
        "문경시",
        "경산시",
        "군위군",
        "의성군",
        "청송군",
        "영양군",
        "영덕군",
        "청도군",
        "고령군",
        "성주군",
        "칠곡군",
        "예천군",
        "봉화군",
        "울진군",
        "울릉군",
      ],
    },
    {
      city: "경상남도",
      district: [
        "창원시 의창구",
        "창원시 성산구",
        "창원시 마산합포구",
        "창원시 마산회원구",
        "창원시 진해구",
        "진주시",
        "통영시",
        "사천시",
        "김해시",
        "밀양시",
        "거제시",
        "양산시",
        "의령군",
        "함안군",
        "창녕군",
        "고성군",
        "남해군",
        "하동군",
        "산청군",
        "함양군",
        "거창군",
        "합천군",
      ],
    },
    {
      city: "제주특별자치도",
      district: ["제주시", "서귀포시"],
    },
  ];
  const { schedule, dispatch } = useSchedule();

  return (
    <div className={`popup--step3__body ${className}`} {...restProps} style={{ display: "flex", height: "356px", borderTop: "1px solid var(--palette-gray-30)", borderBottom: "1px solid var(--palette-gray-30)" }}>
      <div style={{ display: "flex", flex: "1", width: "full", overflow: "scroll", flexDirection: "column" }}>
        {regions.map((region) => (
          <div
            key={region.city}
            style={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              backgroundColor: city === region.city ? "var(--palette-gray-30)" : "var(--palette-white-05)",
              border: "0.5px solid var(--palette-gray-30)",
              cursor: "pointer",
              minHeight: "54px",
              width: "100%",
            }}
            onClick={() => setCity(region.city)}
          >
            <Typography weight="medium" size="16" style={{ marginLeft: "10px" }}>
              {region.city}
            </Typography>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", flex: "1", overflow: "scroll" }}>
        {regions
          .find((region) => region.city === city)
          ?.district.map((district) => (
            <div key={district} style={{ cursor: "pointer", height: "54px", width: "100%", padding: "10px", minHeight: "54px", boxSizing: "border-box" }}>
              <CheckField className="check-field-module" variant="circle">
                <CheckField.Input
                  checkId={district}
                  name={district}
                  isChecked={[...schedule.region].some((r) => r.city === city && r.district === district)}
                  onChange={() => {
                    dispatch({ type: "UPDATE_REGION", payload: { city, district } });
                  }}
                />
                <CheckField.Label checkId={district}>{district}</CheckField.Label>
              </CheckField>
            </div>
          ))}
      </div>
    </div>
  );
};

const Header = () => {
  return (
    <div>
      <div
        style={{
          paddingTop: "16px",
          paddingRight: "16px",
          paddingBottom: "0px",
          paddingLeft: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: "4px",
        }}
      >
        <Typography>지역</Typography>
        <Typography size="14" weight="regular">
          최대 5개 선택
        </Typography>
      </div>
      <div style={{ padding: "16px" }}>
        <HeaderSearchbar style={{ width: "100%" }} />
      </div>
    </div>
  );
};

export const ThreeStep: React.FC<StepProps> = ({ onNext, onPrev }) => {
  return (
    <div className="modal_box on">
      <div className={`popup--step__layout`}>
        <Header />
        <Body />
        <Footer onNext={onNext} onPrev={onPrev} style={{ borderTop: "1px solid #eee", padding: "16px" }} />
      </div>
    </div>
  );
};

type SearchbarElement = HTMLInputElement;

interface HeaderSearchbarProps extends HTMLAttributes<SearchbarElement> {
  placeholder?: string;
}

export const HeaderSearchbar = forwardRef<HTMLInputElement, HeaderSearchbarProps>(({ id = "search-input", placeholder, className, style, ...rest }, ref) => {
  return (
    <div
      role="search"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        width: "100%",
        height: "48px",
        padding: "0 18px",
        border: "1px solid var(--palette-gray-30)",
        borderRadius: "10px",
        backgroundColor: "var(--palette-white-100)",
        boxSizing: "border-box",
        ...style,
      }}
      className={className}
    >
      <label htmlFor={id} className="visually-hidden">
        검색어 입력
      </label>

      <input
        id={id}
        ref={ref}
        type="text"
        placeholder={placeholder || "검색어를 입력해주세요."}
        aria-label="Search"
        style={{
          flex: 1,
          border: "none",
          outline: "none",
          fontSize: "14px",
          backgroundColor: "transparent",
        }}
        {...rest}
      />
      <Icon src="search_18" alt="search icon" />
    </div>
  );
});
