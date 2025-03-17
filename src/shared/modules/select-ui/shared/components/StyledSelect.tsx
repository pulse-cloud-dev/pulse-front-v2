import type { HTMLAttributes, PropsWithChildren } from 'react';
import { forwardRef, useState } from 'react';

interface StyledSelectProps extends HTMLAttributes<HTMLSelectElement>, PropsWithChildren {}
export const StyledSelect = (props: StyledSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Option 1');

  const toggleDropdown = () => setIsOpen((prevState) => !prevState);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="dropdown">
      <button onClick={toggleDropdown} className="dropdown-toggle">
        {selectedOption}
      </button>
      {isOpen && (
        <ul className="dropdown-menu">
          <li onClick={() => handleOptionClick('Option 1')}>Option 1</li>
          <li onClick={() => handleOptionClick('Option 2')}>Option 2</li>
          <li onClick={() => handleOptionClick('Option 3')}>Option 3</li>
        </ul>
      )}
    </div>
  );
};
