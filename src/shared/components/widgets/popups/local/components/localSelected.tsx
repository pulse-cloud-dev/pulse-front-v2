import { Typography } from "../../../../atoms";

interface SelectedItem {
  key: string;
  label: string;
}

interface SelectedItemsProps {
  selectedItems: SelectedItem[];
  handleToggle: (key: string) => void;
}

export const SelectedItems = ({ selectedItems, handleToggle }: SelectedItemsProps) => {
  return (
    <div className="popup-local__body-bottom">
      {selectedItems.length > 0 ? (
        <div className="data flex flex-wrap gap-5">
          {selectedItems.map(({ key, label }) => (
            <span
              key={key}
              className="items-center bg-[#E6F4F1] text-gray-800 rounded-full px-3 py-1 text-sm"
            >
              {label}
              <button
                onClick={() => handleToggle(key)}
                className="ml-2"
                aria-label="선택 삭제"
              >
                <svg
                    width={12}
                    height={11}
                    viewBox="0 0 12 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M10.9227 1.42465C11.157 1.19034 11.157 0.810441 10.9227 0.576127C10.6884 0.341812 10.3085 0.341812 10.0742 0.576127L5.99844 4.65186L1.9227 0.576127C1.68839 0.341812 1.30849 0.341812 1.07417 0.576127C0.839859 0.810441 0.839859 1.19034 1.07417 1.42465L5.14991 5.50039L1.07417 9.57613C0.839859 9.81044 0.839859 10.1903 1.07417 10.4247C1.30849 10.659 1.68839 10.659 1.9227 10.4247L5.99844 6.34892L10.0742 10.4247C10.3085 10.659 10.6884 10.659 10.9227 10.4247C11.157 10.1903 11.157 9.81044 10.9227 9.57613L6.84697 5.50039L10.9227 1.42465Z"
                      fill="#9E9E9E"
                    />
                  </svg>
              </button>
            </span>
          ))}
        </div>
      ) : (
        <Typography className="no-data" variant="body" size="14" color="grayscale">
          분야를 선택해주세요
        </Typography>
      )}
    </div>
  );
};