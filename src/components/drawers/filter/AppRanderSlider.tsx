import React, { useState, useEffect } from 'react';
import Slider from 'rc-slider'; // rc-slider from https://slider-react-component.vercel.app
import 'rc-slider/assets/index.css';

import { handleRender } from './HandleRender';

interface Props {
  min: number;
  max: number;
  selectedStart: number;
  selectedEnd: number;
  onChange?: ((value: number | number[]) => void) | undefined;
  reset: boolean;
}

export const AppRangerSlider: React.FC<Props> = ({
  min,
  max,
  selectedStart,
  selectedEnd,
  onChange: changeParent,
  reset = false
}) => {
  const [selectedMin, setSelectedMin] = useState<number>(min);
  const [selectedMax, setSelectedMax] = useState<number>(max);

  useEffect(() => {
    if (min) setSelectedMin(selectedStart || min);
  }, [min]);

  useEffect(() => {
    if (max) setSelectedMax(selectedEnd || max);
  }, [max]);

  const onChange = (value: number | number[]): void => {
    if (typeof value === 'object') {
      setSelectedMin(value[0]);
      setSelectedMax(value[1]);
    }
  };

  useEffect(() => {
    if (selectedMax && selectedMin && changeParent)
      changeParent([selectedMin, selectedMax]);
  }, [selectedMax, selectedMin]);

  useEffect(() => {
    if (reset) {
      setSelectedMax(max);
      setSelectedMin(min);
    }
  }, [reset, max, min]);

  return (
    <>
      <Slider
        min={min}
        max={max}
        onChange={onChange}
        range
        defaultValue={[selectedMin, selectedMax]}
        value={[selectedMin, selectedMax]}
        step={1}
        handleRender={handleRender}
        handleStyle={{
          opacity: 1.0
        }}
        trackStyle={{ backgroundColor: '#3182ce' }}
      />
    </>
  );
};
