import { ResetSelection } from "@/shared/components/atoms/reset/resetSelection";
import { Icon } from "@/shared/components/atoms";
import { DeleteIcon } from "@/shared/components/atoms/deletes/delete";
import { PopupSearch } from "@/shared/components/blocks";
import type { FilterProps } from "../type/filterProps";

export const FilterBar = ({ event, keyword, setKeyword, setSearchText, selectedFields, selectedRegions, onlineStatus, removeField, removeRegion, onReset }: FilterProps) => (
  <>
    <div className="flex_r gap_6 m-t-30">
      <PopupSearch title="분야" openPopup={event?.openFirstModal} count={selectedFields.length} />
      <PopupSearch title="온/오프라인" openPopup={event?.openSecondModal} />
      {onlineStatus !== "온라인" && <PopupSearch title="지역" openPopup={event?.openThirdModal} count={selectedRegions.length} />}
      <div className="btn-search">
        <input
          id="mentor-search"
          aria-label="멘토 검색"
          placeholder="검색"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setSearchText(keyword);
            }
          }}
        />
        <button onClick={() => setSearchText(keyword)} aria-label="검색">
          <Icon src="search_18" alt="검색 아이콘" aria-hidden="true" />
        </button>
      </div>
    </div>

    <div className="selected-filters flex gap-2 flex-wrap m-t-16">
      {(selectedFields.length > 0 || selectedRegions.length > 0) && <ResetSelection className="m-l-5" onClick={onReset} label="초기화" />}
      {selectedFields.map((field, idx) => (
        <span key={idx} className="tag" aria-label={`분야 ${field} 삭제`}>
          {field}
          <DeleteIcon size={12} color="#9E9E9E" className="m-l-4" onClick={() => removeField(field)} />
        </span>
      ))}
      {selectedRegions.map((region, idx) => (
        <span key={idx} className="tag" aria-label={`지역 ${region} 삭제`}>
          {region}
          <DeleteIcon size={12} color="#9E9E9E" className="m-l-4" onClick={() => removeRegion(region)} />
        </span>
      ))}
    </div>
  </>
);
