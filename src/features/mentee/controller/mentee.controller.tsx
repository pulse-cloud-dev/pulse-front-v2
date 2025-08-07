import { Modal, useModal, useLocalStorage } from "@/shared/modules";
import { FieldPopup, OnlineStatusPopup, LocalPopup } from "@/shared/components";
import { MenteeView } from "../view/mentor.view";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SubItemWithParent } from "@/shared/components/widgets/popups/type/searchProps";

export const MeteeController = () => {
  const [keyword, setKeyword] = useState("");
  const [searchText, setSearchText] = useState("");
  const [onlineStatus, setOnlineStatus] = useLocalStorage<string>("onlineStatus", "전체");
  const [isOnlineOnly, setIsOnlineOnly] = useLocalStorage<boolean>("isOnlineOnly", false);
  const [fieldCheckedItems, setFieldCheckedItems] = useLocalStorage<SubItemWithParent[]>("fieldCheckedItems", []);
  const [regionCheckedItems, setRegionCheckedItems] = useLocalStorage<SubItemWithParent[]>("regionCheckedItems", []);
  const [sortOption, setSortOption] = useState("기본순");

  const firstModal = useModal(Modal);
  const secondModal = useModal(Modal);
  const thirdModal = useModal(Modal);

  const [searchParams, setSearchParams] = useSearchParams();
  const offset = Number(searchParams.get("offset")) || 1;

  const setOffset = (page: number) => {
    setSearchParams((prev) => {
      const updated = new URLSearchParams(prev);
      updated.set("offset", page.toString());
      return updated;
    });
  };

  const resetFilters = () => {
    setKeyword("");
    setOnlineStatus("전체");
    setIsOnlineOnly(false);
    setRegionCheckedItems([]);
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
      children: (modalProps: { id: string; closeModal: (id: string) => void }) => (
        <FieldPopup
          aria-labelledby="field-modal-title"
          closeModal={() => modalProps.closeModal(modalProps.id)}
          initialCheckedItems={fieldCheckedItems}
          onApply={(latestCheckedItems: SubItemWithParent[]) => {
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
      children: (modalProps: { id: string; closeModal: (id: string) => void }) => (
        <OnlineStatusPopup
          aria-labelledby="onoff-modal-title"
          initialValue={onlineStatus === "온라인" ? "ONLINE" : onlineStatus === "오프라인" ? "OFFLINE" : null}
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
      children: (modalProps: { id: string; closeModal: (id: string) => void }) => (
        <LocalPopup
          aria-labelledby="region-modal-title"
          closeModal={() => modalProps.closeModal(modalProps.id)}
          initialCheckedItems={regionCheckedItems}
          onApply={(latestCheckedItems) => {
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
    setFieldCheckedItems((prev) => prev.filter((item) => item.name !== key));
    setOffset(1);
  };
  const removeRegion = (region: string) => {
    const key = labelToKey(region);
    setRegionCheckedItems((prev) => prev.filter((item) => item.name !== key));

    setOffset(1);
  };

  console.log("regionCheckedItems", regionCheckedItems);

  const props = {
    event: {
      openFirstModal,
      openSecondModal,
      openThirdModal,
    },
    state: {
      keyword,
      searchText,
      fieldCheckedItems,
      regionCheckedItems,
      onlineStatus,
      isOnlineOnly,
      sortOption,
      offset,
    },
    actions: {
      setKeyword,
      setSearchText,
      removeField,
      removeRegion,
      setOnlineStatus,
      resetFilters,
      setSortOption,
      setOffset,
    },
  };

  return <MenteeView {...props} />;
};
