import React from "react";

type RegionSelectModalProps = {
  onSelect: (region: string) => void;
  onClose: () => void;
};

const REGION_LIST = ["서울 강남구", "서울 서초구", "서울 마포구", "경기 성남시", "경기 수원시", "부산 해운대구", "대구 중구", "광주 북구"];

const RegionSelectModal: React.FC<RegionSelectModalProps> = ({ onSelect, onClose }) => {
  const handleRegionClick = (region: string) => {
    onSelect(region);
    onClose();
  };

  return (
    <div className="modal">
      <h2>지역 선택</h2>
      <ul className="region-list">
        {REGION_LIST.map((region) => (
          <li key={region}>
            <button onClick={() => handleRegionClick(region)}>{region}</button>
          </li>
        ))}
      </ul>

      <div className="modal-footer">
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
};

export default RegionSelectModal;
