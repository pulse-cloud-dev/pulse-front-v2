import { useLocation } from "react-router-dom";
import { Modal, useModal, useLocalStorage } from "@/shared/modules";
import { FieldPopup, OnlineStatusPopup, LocalPopup } from "@/shared/components";
import { MentorView } from "./mentor.view";
import { useState } from "react";
import { useMentoringListQuery } from "@/shared/components/widgets/Mentor/hooks/useMentoringListQuery";
import { useSearchParams } from "react-router-dom";

export const MentorController = () => {
  const [keyword, setKeyword] = useState("");
  const [searchText, setSearchText] = useState("");


  const [selectedFields, setSelectedFields] = useLocalStorage<string[]>("selectedFields", []);
  const [selectedRegions, setSelectedRegions] = useLocalStorage<string[]>("selectedRegions", []);
  const [onlineStatus, setOnlineStatus] = useLocalStorage<string>("onlineStatus", "전체");
  const [isOnlineOnly, setIsOnlineOnly] = useLocalStorage<boolean>("isOnlineOnly", false);
  const [fieldCheckedItems, setFieldCheckedItems] = useLocalStorage<Record<string, boolean>>("fieldCheckedItems", {});
  const [regionCheckedItems, setRegionCheckedItems] = useLocalStorage<Record<string, boolean>>("regionCheckedItems", {});
  const [sortOption, setSortOption] = useState("기본순");


  const firstModal = useModal(Modal);
  const secondModal = useModal(Modal);
  const thirdModal = useModal(Modal);

  const [searchParams, setSearchParams] = useSearchParams();
  const offset = Number(searchParams.get("offset")) || 1;

  const setOffset = (page: number) => {
    setSearchParams((prev) => ({ 
      ...prev, 
      offset: page.toString(),
      menu: prev.get("menu") || "map",
    }));
  }

  // const { data: mentorings = [], isLoading: loading } = useMentoringListQuery({
  //   selectedFields,
  //   selectedRegions,
  //   onlineStatus,
  //   sortOption,
  //   searchText,
  //   offset,
  // });

  const resetFilters = () => {
    setKeyword("");
    setSelectedFields([]);
    setSelectedRegions([]);
    setOnlineStatus("전체");
    setIsOnlineOnly(false);
    setFieldCheckedItems({});
    setRegionCheckedItems({});
    setOffset(1); 
  };

  const openFirstModal = () => {
    firstModal.openModal({
      key: JSON.stringify(fieldCheckedItems),
      title: "분야",
      subtitle: "최대 3개 선택",
      variant: "default",
      ariaLabelledBy: "field-modal-title",
      role: "dialog",
      children: (modalProps: { id: string; closeModal: (id: string) => void }
) => (
        <FieldPopup
          aria-labelledby="field-modal-title"
          closeModal={() => modalProps.closeModal(modalProps.id)}
          initialCheckedItems={fieldCheckedItems}
          onApply={(fields, latestCheckedItems) => {
            setSelectedFields(fields);
            setFieldCheckedItems(latestCheckedItems);
            setOffset(1); 
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
      ariaLabelledBy: "onoff-modal-title",
      role: "dialog",
      children: (modalProps: { id: string; closeModal: (id: string) => void }
) => (
        <OnlineStatusPopup
          aria-labelledby="onoff-modal-title"
          initialValue={
            onlineStatus === "온라인" ? "ONLINE" :
            onlineStatus === "오프라인" ? "OFFLINE" : null
          }
          closeModal={() => modalProps.closeModal(modalProps.id)}
          onOnlineSelected={(isOnline) => {
            if (isOnline === undefined) {
              setOnlineStatus("전체");
              setIsOnlineOnly(false);
            } else {
              setOnlineStatus(isOnline ? "온라인" : "오프라인");
              setIsOnlineOnly(isOnline);
            }
            setOffset(1); 
          }}
        />
      ),
    });
  };

  const openThirdModal = () => {
    thirdModal.openModal({
      key: JSON.stringify(regionCheckedItems),
      title: "지역",
      subtitle: "최대 10개 선택",
      variant: "default",
      ariaLabelledBy: "region-modal-title",
      role: "dialog",
      children: (modalProps: { id: string; closeModal: (id: string) => void }
) => (
        <LocalPopup
          aria-labelledby="region-modal-title"
          closeModal={() => modalProps.closeModal(modalProps.id)}
          initialCheckedItems={regionCheckedItems}
          onApply={(regions, latestCheckedItems) => {
            setSelectedRegions(regions);
            setRegionCheckedItems(latestCheckedItems);
            setOffset(1); 
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
    setOffset(1);
  };

  const removeRegion = (region: string) => {
    const key = labelToKey(region);
    setSelectedRegions((prev) => prev.filter((r) => r !== region));
    setRegionCheckedItems((prev) => {
      const newItems = { ...prev };
      delete newItems[key];
      return newItems;
    });
    setOffset(1); 
  };

  const props = {
    event: {
      openFirstModal,
      openSecondModal,
      openThirdModal,
    },
    state: {
      keyword,
      searchText,
      selectedFields,
      selectedRegions,
      onlineStatus,
      isOnlineOnly,
      // mentorings,
      // loading,
      sortOption,
      offset, 
    },
    actions: {
      setKeyword,
      setSearchText,
      setSelectedFields,
      setSelectedRegions,
      removeField,
      removeRegion,
      setOnlineStatus,
      resetFilters,
      setSortOption,
      setOffset,
    },
  };

  return <MentorView {...props} />;
};
