import { useLocation } from "react-router-dom";
import { Modal, useModal, useLocalStorage } from "@/shared/modules";
import { FieldPopup, OnlineStatusPopup, LocalPopup } from "@/shared/components";
import { MentorView } from "./mentor.view";
import { useState } from "react";

export const MentorController = () => {
  const location = useLocation();
  const [keyword, setKeyword] = useState("");
  const [isOnlineOnly, setIsOnlineOnly] = useLocalStorage<boolean>("isOnlineOnly", false);
  const [selectedFields, setSelectedFields] = useLocalStorage<string[]>("selectedFields",[]);
  const [selectedRegions, setSelectedRegions] = useLocalStorage<string[]>("selectedRegions",[]);
  const [onlineStatus, setOnlineStatus] = useLocalStorage<string>("onlineStatus", "전체");
  const [fieldCheckedItems, setFieldCheckedItems] = useLocalStorage<Record<string, boolean>>("fieldCheckedItems",{});
  const [regionCheckedItems, setRegionCheckedItems] = useLocalStorage<Record<string, boolean>>("regionCheckedItems",{});

  // 모달 정의
  const firstModal = useModal(Modal);
  const secondModal = useModal(Modal);
  const thirdModal = useModal(Modal);

  // 필터 초기화
  const resetFilters = () => {
    setKeyword("");
    setSelectedFields([]);
    setSelectedRegions([]);
    setOnlineStatus("전체");
    setIsOnlineOnly(false);
    setFieldCheckedItems({});
    setRegionCheckedItems({});
  };

  // 모달 열기 함수들
  const openFirstModal = () => {
    firstModal.openModal({
      key: JSON.stringify(fieldCheckedItems), // 강제 재마운트용 key
      title: "분야",
      subtitle: "최대 3개 선택",
      variant: "default",
      children: (modalProps: { id: string; closeModal: (id: string) => void }) => (
        <FieldPopup
          closeModal={() => modalProps.closeModal(modalProps.id)}
          initialCheckedItems={fieldCheckedItems}
          onApply={(fields, latestCheckedItems) => {
            setSelectedFields(fields);
            setFieldCheckedItems(latestCheckedItems);
            modalProps.closeModal(modalProps.id);
          }}
        />
      ),
    });
  };

  const openSecondModal = () => {
    secondModal.openModal({
      title: "온/오프라인",
      variant: "default",
      children: (modalProps: { id: string; closeModal: (id: string) => void }) => (
        <OnlineStatusPopup
          closeModal={() => modalProps.closeModal(modalProps.id)}
          onOnlineSelected={(isOnline) => {
            setIsOnlineOnly(isOnline);
            setOnlineStatus(isOnline ? "온라인" : "오프라인");
          }}
        />
      ),
    });
  };

  const openThirdModal = () => {
    if (isOnlineOnly) {
      alert("온라인 선택 시 지역 선택은 불가능합니다.");
      return;
    }

    thirdModal.openModal({
      key: JSON.stringify(regionCheckedItems),
      title: "지역",
      subtitle: "최대 10개 선택",
      variant: "default",
      children: (modalProps: { id: string; closeModal: (id: string) => void }) => (
        <LocalPopup
          closeModal={() => modalProps.closeModal(modalProps.id)}
          initialCheckedItems={regionCheckedItems}
          onApply={(regions, latestCheckedItems) => {
            setSelectedRegions(regions);
            setRegionCheckedItems(latestCheckedItems);
            modalProps.closeModal(modalProps.id);
          }}
        />
      ),
    });
  };

  const labelToKey = (label: string) => label.replace(/\s*>\s*/g, "-");

  const removeField = (field: string) => {
    const key = labelToKey(field);
    setSelectedFields((prev) => prev.filter((f) => f !== field));

    setFieldCheckedItems((prev) => {
      const newItems = { ...prev };
      delete newItems[key];
      return newItems;
    });
  };

  const removeRegion = (region: string) => {
    const key = labelToKey(region);
    setSelectedRegions((prev) => prev.filter((r) => r !== region));

    setRegionCheckedItems((prev) => {
      const newItems = { ...prev };
      delete newItems[key];
      return newItems;
    });
  };

  const props = {
    event: {
      openFirstModal,
      openSecondModal,
      openThirdModal,
    },
    state: {
      keyword,
      selectedFields,
      selectedRegions,
      onlineStatus,
      isOnlineOnly,
    },
    actions: {
      setKeyword,
      setSelectedFields,
      setSelectedRegions,
      removeField,
      removeRegion,
      setOnlineStatus,
      resetFilters,
    },
  };

  return <MentorView {...props} />;
};
