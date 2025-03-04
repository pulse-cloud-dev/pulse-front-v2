import * as React from 'react';
import { useToggle } from './useToggle';
import { useClickOutSide } from './useClickOutSide';

type Props = {
  initialColor?: string;
};

export function useColorPicker({ initialColor = '#ffffff' }: Props) {
  const [currentColor, setCurrentColor] = React.useState(initialColor); // Color State

  const [isActive, toggle, onActive, onInactive] = useToggle(); // Color Picker Toggle

  const ref = useClickOutSide(onInactive); // Track Outside ref object

  const onChangeColor = (color: string, callback?: (color: string) => void) => {
    setCurrentColor(color);

    if (callback && typeof callback === 'function') {
      callback(color);
    }
  };

  return {
    // Outside Tracking
    ref, // Tracking Outside

    // State
    currentColor, // currently selected color
    onChangeColor, // change event handler

    // Toggle
    isActive, // Color Picker is activate or isn't activate
    toggle, // Color Picker's activate toggle handler
    onActive, // Run color picker
    onInactive, // Does not run Color picker
  } as const;
}
