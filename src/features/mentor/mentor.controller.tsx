import { useLocation } from "react-router-dom";
import { Modal, useModal, useLocalStorage } from "@/shared/modules";
import { FieldPopup, OnlineStatusPopup, LocalPopup } from "@/shared/components";
import { MentorView } from "./mentor.view";
import { useState, useEffect } from "react";
import { categoryApis } from "@/networks";

export const MentorController = () => {
  const [keyword, setKeyword] = useState(""); // 입력값
  const [searchText, setSearchText] = useState(""); // 실제 API에 쓰이는 값
  const [selectedFields, setSelectedFields] = useLocalStorage<string[]>("selectedFields", []);
  const [selectedRegions, setSelectedRegions] = useLocalStorage<string[]>("selectedRegions", []);
  const [onlineStatus, setOnlineStatus] = useLocalStorage<string>("onlineStatus", "전체");
  const [isOnlineOnly, setIsOnlineOnly] = useLocalStorage<boolean>("isOnlineOnly", false);
  const [fieldCheckedItems, setFieldCheckedItems] = useLocalStorage<Record<string, boolean>>("fieldCheckedItems", {});
  const [regionCheckedItems, setRegionCheckedItems] = useLocalStorage<Record<string, boolean>>("regionCheckedItems", {});
  const [sortOption, setSortOption] = useState("기본순");

  // 모달 정의
  const firstModal = useModal(Modal);
  const secondModal = useModal(Modal);
  const thirdModal = useModal(Modal);

  // api
  const [mentorings, setMentorings] = useState<any[]>([]); // api로 받아온 멘토링 목록
  const [loading, setLoading] = useState(false); // 로딩 상태

  const fetchMentorings = async () => {
    setLoading(true);
    try {
      const data = await categoryApis.getMentoringList({
        field: selectedFields.join(","),
        region: selectedRegions.join(","),
        lecture_type: onlineStatus === "전체" ? undefined : onlineStatus === "온라인" ? "ONLINE" : "OFFLINE",
        search_text: searchText,
        sort_type: sortOption === "기본순" ? "LATEST" : sortOption === "인기순" ? "POPULAR" : "LATEST",
        page: 1,
        size: 20,
      });
      setMentorings(data.contents ?? []);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  // 필터 변경될 때마다 새로 조회
  useEffect(() => {
    fetchMentorings();
  }, [selectedFields, selectedRegions, onlineStatus, sortOption, searchText]);

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
      ariaLabelledBy: "field-modal-title",
      role: "dialog",
      children: (modalProps: { id: string; closeModal: (id: string) => void }) => (
        <FieldPopup
          aria-labelledby="field-modal-title"
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
      ariaLabelledBy: "onoff-modal-title",
      role: "dialog",
      children: (modalProps: { id: string; closeModal: (id: string) => void }) => (
        <OnlineStatusPopup
          aria-labelledby="onoff-modal-title"
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
      searchText,
      selectedFields,
      selectedRegions,
      onlineStatus,
      isOnlineOnly,
      mentorings,
      loading,
      sortOption,
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
    },
  };

  return <MentorView {...props} />;
};
