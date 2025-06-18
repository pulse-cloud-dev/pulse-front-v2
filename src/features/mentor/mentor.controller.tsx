import { useLocation } from "react-router-dom";
import { Modal, useModal } from "@/shared/modules";
import { FieldPopup, OnlineStatusPopup, LocalPopup } from "@/shared/components";
import { MentorView } from "./mentor.view";
import { useState } from "react";

export const MentorController = () => {
  const location = useLocation();
  const [keyword, setKeyword] = useState("");
  const [isOnlineOnly, setIsOnlineOnly] = useState(false);
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [onlineStatus, setOnlineStatus] = useState<string>("전체");
  const [fieldCheckedItems, setFieldCheckedItems] = useState<Record<string, boolean>>({});
  const [regionCheckedItems, setRegionCheckedItems] = useState<Record<string, boolean>>({});

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

  const removeField = (field: string) => {
    setSelectedFields((prev) => prev.filter((f) => f !== field));
    setFieldCheckedItems((prev) => {
      const newItems = { ...prev };
      delete newItems[field];
      return newItems;
    });
  };

  const removeRegion = (region: string) => {
    setSelectedRegions((prev) => prev.filter((r) => r !== region));
    setRegionCheckedItems((prev) => {
      const newItems = { ...prev };
      delete newItems[region];
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
