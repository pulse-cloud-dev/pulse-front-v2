import { useLocation } from "react-router-dom";
import { Modal, useModal } from "@/shared/modules";
import { FieldPopup, OnlineStatusPopup, LocalPopup  } from "@/shared/components";
import { MentorView } from "./mentor.view";
import { useState } from "react";


const useModals = ({
  setSelectedFields,
  setSelectedRegions,
  fieldCheckedItems,
  regionCheckedItems,
  setFieldCheckedItems,
  setRegionCheckedItems,
} : {
  setSelectedFields: (fields: string[]) => void,
  setSelectedRegions: (regions: string[]) => void,
  fieldCheckedItems : Record<string, boolean>,
  regionCheckedItems: Record<string, boolean>,
  setFieldCheckedItems: React.Dispatch<React.SetStateAction<Record<string, boolean>>>,
  setRegionCheckedItems: React.Dispatch<React.SetStateAction<Record<string, boolean>>>
}) => {

  return {
    first: useModal(Modal, {
      title: "분야",
      subtitle: "최대 3개 선택",
      variant: "default",
      children: (modalProps: any) => (
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
    }),
    second: useModal(Modal, {
      title: "온/오프라인",
      variant: "default",
      children: (modalProps: any) => (
        <OnlineStatusPopup closeModal={() => modalProps.closeModal(modalProps.id)} />
  ),
    }),
    third: useModal(Modal, {
      title: "지역",
      subtitle: "최대 10개 선택",
      variant: "default",
      children: (modalProps: any) => (
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
    }),
  };
};

export const MentorController = () => {
  const location = useLocation();
  const [keyword, setKeyword] = useState("");
  const [isOnlineOnly, setIsOnlineOnly] = useState(false);
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [onlineStatus, setOnlineStatus] = useState<string>("전체");
  const [fieldCheckedItems, setFieldCheckedItems] = useState<Record<string, boolean>>({});

  const [regionCheckedItems, setRegionCheckedItems] = useState<Record<string, boolean>>({});

  const modals = useModals({
    setSelectedFields,
    setSelectedRegions,
    fieldCheckedItems,
    regionCheckedItems,
    setFieldCheckedItems,
    setRegionCheckedItems,
  });


  const removeField = (field: string) => {
    setSelectedFields(prev => prev.filter(f => f !== field));
  };

  const removeRegion = (region: string) => {
    setSelectedRegions(prev => prev.filter(r => r !== region));
  };

  const resetFilters = () => {
    setKeyword("");
    setSelectedFields([]);
    setSelectedRegions([]);
    setOnlineStatus("전체");
  };

  const props = {
    event: {
      openFirstModal: modals.first.openModal,
      openSecondModal: () => modals.second.openModal(),
      openThirdModal: () => {
        if (!isOnlineOnly) {
          modals.third.openModal();
        } else {
          alert("온라인 선택 시 지역 선택은 불가능합니다.");
        }
      },
    },
    state: {
      keyword,
      selectedFields,
      selectedRegions,
      onlineStatus,
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

