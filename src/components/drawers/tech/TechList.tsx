import React, { useEffect, useState } from 'react';
import { ScrollableDiv } from './components/ScrollableDiv';
import {
  useDataState,
  useRadarState,
  TechItemType,
  RadarUtilities
} from '@undp_sdg_ai_lab/undp-radar';
import { TechItem } from './components/TechItem';
import { techButtonColors } from './colors';
import './TechList.scss';

export const TechList: React.FC = () => {
  const {
    state: {
      blips,
      radarData,
      techFilters,
      hoveredTech,
      hoveredItem,
      useCaseFilter,
      disasterTypeFilter
    },
    actions: { setTechFilter, setHoveredTech }
  } = useRadarState();

  const {
    state: { keys }
  } = useDataState();

  const [tech, setTech] = useState<TechItemType[]>([]);

  const resetTech = (): void => {
    setTechFilter([]);
  };

  useEffect(() => {
    if (blips.length > 0) {
      const newTechMap: Map<string, TechItemType> = new Map();
      RadarUtilities.filterBlips(
        blips,
        keys,
        useCaseFilter,
        disasterTypeFilter
      ).forEach((b) => {
        (b[keys.techKey] as string[]).forEach((techy) => {
          const foundTech = radarData.tech.find((t) => t.type === techy);
          if (foundTech && !newTechMap.has(foundTech.slug)) {
            if (
              b[keys.useCaseKey] === useCaseFilter ||
              useCaseFilter === 'all'
            ) {
              (b[keys.techKey] as string[]).forEach((t) => {
                if (t === foundTech.type) newTechMap.set(t, foundTech);
              });
            }
            if (
              b[keys.useCaseKey] === disasterTypeFilter ||
              disasterTypeFilter === 'all'
            ) {
              (b[keys.techKey] as string[]).forEach((t) => {
                if (t === foundTech.type) {
                  newTechMap.set(t, foundTech);
                }
              });
            }
          }
        });
      });
      const techListArr: any = Array.from(newTechMap.values());
      const colors = [...techButtonColors];
      techListArr.forEach((t: any) => (t['color'] = colors.pop()));
      setTech(techListArr);
    }
  }, [blips, radarData, useCaseFilter, disasterTypeFilter]);

  const selected = (techItem: TechItemType): boolean => {
    if (techFilters && techFilters.length > 0) {
      return !!techFilters.find((tech) => tech === techItem.slug);
    }
    return false;
  };

  return (
    <div className='techListContainer'>
      <div className='techListContainer-scroll'>
        <ScrollableDiv>
          {tech.map((t) => {
            const toggleTechFilter = (): void => {
              if (techFilters && techFilters.length > 0) {
                const item = techFilters.find((tech) => tech === t.slug);
                if (item) {
                  setTechFilter([
                    ...techFilters.filter((tech) => tech !== item)
                  ]);
                  return;
                }
              }
              setTechFilter([...techFilters, t.slug]);
            };
            return (
              <TechItem
                key={t.uuid}
                hoveredTech={hoveredTech}
                setHoveredTech={setHoveredTech}
                hoveredItem={hoveredItem}
                tech={t}
                techKey={keys.techKey}
                selected={selected(t)}
                techFilter={techFilters}
                setTechFilter={toggleTechFilter}
              />
            );
          })}
        </ScrollableDiv>
      </div>
      {Boolean(techFilters.length) && (
        <button
          onClick={resetTech}
          type='button'
          className={'resetTechFilterButton'}
        >
          Reset
        </button>
      )}
    </div>
  );
};
