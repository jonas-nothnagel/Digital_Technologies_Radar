import React, { useEffect, useState } from 'react';
import {
  BlipType,
  QuadrantRadar,
  useRadarState
} from '@undp_sdg_ai_lab/undp-radar';

import { BackButton } from 'radar/components';
import { QuadrantHorizonList } from 'components/lists/quadrant/QuadrantHorizonList';

export const QuadrantView: React.FC = () => {
  const {
    state: {
      blips,
      isFiltered,
      filteredBlips,
      selectedQuadrant,
      radarData: { quadrants }
    },
    processes: { setFilteredBlips }
  } = useRadarState();

  const [bufferBlips, setBufferBlips] = useState<BlipType[]>([]);
  const [quadIndex, setQuadIndex] = useState<number | false>(false);

  useEffect(() => {
    const newBufferBlips = (isFiltered ? filteredBlips : blips).filter(
      (b) => b.quadrantIndex === quadIndex
    );
    // TODO: filter by tech
    setBufferBlips(newBufferBlips);
  }, [filteredBlips, blips, isFiltered, quadIndex]);

  useEffect(() => {
    setFilteredBlips(isFiltered, filteredBlips);
  }, []);

  useEffect(() => {
    if (selectedQuadrant) {
      setQuadIndex(quadrants.indexOf(selectedQuadrant));
    } else setQuadIndex(false);
  }, [selectedQuadrant]);

  return (
    <div className='quadrantView'>
      <BackButton to='RADAR' />

      <div className='quadrantRadar'>
        <QuadrantRadar />
      </div>
      {(quadIndex === 0 ||
        quadIndex === 1 ||
        quadIndex === 2 ||
        quadIndex === 3) && (
        <div className='horizontalList'>
          <QuadrantHorizonList blips={bufferBlips} quadIndex={quadIndex} />
        </div>
      )}
    </div>
  );
};
