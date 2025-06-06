import { useState, useMemo, useEffect } from "react";


// 컴포넌트
import { Header } from "../components/localPopupHeader";
import { Body } from "../components/localPopupBody";
import { SelectedItems } from "../components/localSelected";
import { Footer } from "../components/localPopupFooter";
import { useCheckFieldGroup } from "@/shared/modules/select-ui";

export function LocalPopup({closeModal} : { closeModal?: () => void; }) {
  const { reset } = useCheckFieldGroup ({
    initialValues : {
      option: false
    }
  })
  const [selectedCity, setSelectedCity] = useState("서울특별시");
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [searchKeyword, setSearchKeyword] = useState("");

  const handleReset = () => {
    reset();
    setCheckedItems({});
    setSelected(null);
    setSelectedCity("서울특별시");
    setSearchKeyword("");
  }  

  const [selected, setSelected] = useState(null);

  const handleApply = () => {
    const appliedItems = selectedItems;
    handleClose(); //모달 닫기
  };

  const handleClose = () => {
    closeModal?.();
    console.log("모달 닫기");
  };

  const handleToggle = (key: string) => {
    const selectedCount = Object.values(checkedItems).filter(Boolean).length;
    if (!checkedItems[key] && selectedCount >= 10) {
      alert("최대 10개까지 선택 가능합니다.");
      return;
    }
    setCheckedItems({ ...checkedItems, [key]: !checkedItems[key] });
  };

  const selectedItems = useMemo(() => {
    return Object.entries(checkedItems)
      .filter(([, isChecked]) => isChecked)
      .map(([key]) => {
        const [city, district] = key.split("-");

        if (key === "전국-전국") {
        return { key, label: "전국" };
      }
      
        return { key, label: `${city} > ${district}` };
      });
  }, [checkedItems]);

  const [cities, setCities] = useState<{ name: string; code: string }[]>([]);

// 검색어 변경 시 도시 선택
useEffect(() => {
  if (!searchKeyword) return;
  const matched = cities.find((city) =>
    city.name.toLowerCase().includes(searchKeyword.toLowerCase())
  );
  if (matched) setSelectedCity(matched.name);
}, [searchKeyword, cities]);


  return (
    <div className="popup-local">
      <Header onSearch={setSearchKeyword} />
      <Body
        cities={cities}
        setCities={setCities}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        checkedItems={checkedItems}
        handleToggle={handleToggle}
        // searchKeyword={searchKeyword}
      />
      <SelectedItems selectedItems={selectedItems} handleToggle={handleToggle} />
      <Footer onReset={handleReset}  onClose={handleClose} onApply={handleApply}/>
    </div>
  );
}
