import React, {
  ChangeEventHandler,
  useEffect,
  useState,
  useContext
} from 'react';
import { Select } from '@chakra-ui/react';
import {
  SelectableItem,
  useDataState,
  useRadarState
} from '@undp_sdg_ai_lab/undp-radar';

import { FilterUtils } from './FilterUtilities';
import {
  subregionKey,
  regionKey,
  countryKey,
  implementerKey,
  sdgKey,
  yearKey,
  dataKey
} from './FilterConstants';
import { AppRangerSlider } from './AppRanderSlider';
import { RadarContext } from 'navigation/context';

import './Filter.scss';

export const CustomFilter: React.FC = () => {
  const {
    state: { blips, disasterTypeFilter, useCaseFilter },
    actions: { setUseCaseFilter, setDisasterTypeFilter },
    processes: { setFilteredBlips }
  } = useRadarState();

  const {
    state: {
      keys: { useCaseKey, disasterTypeKey: disasterKey }
    }
  } = useDataState();

  const { radarStateValues, setRadarStateValues } = useContext(RadarContext);

  // FILTERS
  // subregions
  const [subregionFilter, setSubregionFilter] = useState<string>(
    radarStateValues.subRegion || 'all'
  );
  // regions
  const [regionFilter, setRegionFilter] = useState<string>(
    radarStateValues.region || 'all'
  );
  // countries
  const [countryFilter, setCountryFilter] = useState<string>(
    radarStateValues.country || 'all'
  );
  // implementer
  const [implementerFilter, setImplementerFilter] = useState<string>(
    radarStateValues.implementer || 'all'
  );
  // sdg
  const [sdgFilter, setSdgFilter] = useState<string>(
    radarStateValues.sdg || 'all'
  );
  // start year
  const [startYearFilter, setStartYearFilter] = useState<string>(
    radarStateValues.startYear || 'all'
  );
  // end year
  const [endYearFilter, setEndYearFilter] = useState<string>(
    radarStateValues.endYear || 'all'
  );
  // data
  const [dataFilter, setDataFilter] = useState<string>(
    radarStateValues.data || 'all'
  );

  // ALL OPTIONS
  // subregions
  const [subregions, setSubregions] = useState<SelectableItem[]>([]);
  // regions
  const [regions, setRegions] = useState<SelectableItem[]>([]);
  // countries
  const [countries, setCountries] = useState<SelectableItem[]>([]);
  // disasters
  const [disasterTypes, setDisasterTypes] = useState<SelectableItem[]>([]);
  // use cases
  const [useCases, setUseCases] = useState<SelectableItem[]>([]);
  // implementers
  const [implementers, setImplementers] = useState<SelectableItem[]>([]);
  // sdg
  const [sdgs, setSdgs] = useState<SelectableItem[]>([]);
  // year
  const [years, setYears] = useState<SelectableItem[]>([]);
  // data
  const [data, setData] = useState<SelectableItem[]>([]);

  // EFFECT on Blips change, to get all options
  useEffect(() => {
    if (blips && blips?.length > 0) {
      // subregion options
      const newSubregions = FilterUtils.getSubregions(blips, subregionKey);
      setSubregions(newSubregions);
      // region options
      const newRegions = FilterUtils.getRegions(blips, regionKey);
      setRegions(newRegions);
      // country options
      const newCountries = FilterUtils.getCountries(blips, countryKey);
      setCountries(newCountries);
      // disaster options
      const newDisasterTyes = FilterUtils.getDisasterTypes(blips, disasterKey);
      setDisasterTypes(newDisasterTyes);
      // usecase options
      const newUseCases = FilterUtils.getUseCases(blips, useCaseKey);
      setUseCases(newUseCases);
      // implementer options
      const newImplementers = FilterUtils.getImplementers(
        blips,
        implementerKey
      );
      setImplementers(newImplementers);
      // sdg options
      const newSdgs = FilterUtils.getSDGs(blips, sdgKey);
      setSdgs(newSdgs);
      // start year options
      const newYears = FilterUtils.getYears(blips, yearKey);
      setYears(newYears);
      // data options
      const newData = FilterUtils.getData(blips, dataKey);
      setData(newData);
    }
  }, [blips]);

  // selectedSubregion
  const [selectedSubregion, setSelectedSubregion] = useState<string>(
    subregionFilter === null ? 'all' : subregionFilter
  );

  // selectedRegion
  const [selectedRegion, setSelectedRegion] = useState<string>(
    regionFilter === null ? 'all' : regionFilter
  );

  // selectedCountry
  const [selectedCountry, setSelectedCountry] = useState<string>(
    countryFilter === null ? 'all' : countryFilter
  );

  // selectedDisasterType
  const [selectedDisasterType, setSelectedDisasterType] = useState<string>(
    disasterTypeFilter === null ? 'all' : disasterTypeFilter
  );

  // selectedUserCase
  const [selectedUserCase, setSelectedUserCase] = useState<string>(
    useCaseFilter === null ? 'all' : useCaseFilter
  );

  // selectedImplementer
  const [selectedImplementer, setSelectedImplementer] = useState<string>(
    implementerFilter === null ? 'all' : sdgFilter
  );

  // selectedSGD
  const [selectedSdg, setSelectedSdg] = useState<string>(
    sdgFilter === null ? 'all' : sdgFilter
  );

  // selectedStartYear
  const [selectedStartYear, setSelectedStartYear] = useState<string>(
    startYearFilter === null ? 'all' : startYearFilter
  );

  // selectedEndYear
  const [selectedEndYear, setSelectedEndYear] = useState<string>(
    endYearFilter === null ? 'all' : endYearFilter
  );

  // selectedData
  const [selectedData, setSelectedData] = useState<string>(
    dataFilter === null ? 'all' : dataFilter
  );

  // track active filters
  const [customfilterSelected, setCustomFilterSelected] =
    useState<boolean>(false);

  /**
   * This is our filtering logic
   */
  useEffect(() => {
    let filtered = blips;
    let isFiltered = false;

    // filter subregions
    if (subregionFilter !== 'all') {
      isFiltered = true;
      // We need to check if we have an exact match or the blip is an array containing the subregion
      filtered = filtered.filter(
        (i) =>
          i[subregionKey] === subregionFilter ||
          i[subregionKey].includes(subregionFilter)
      );
    }

    // filter regions
    if (regionFilter !== 'all') {
      isFiltered = true;
      // We need to check if we have an exact match or the blip is an array containing the region
      filtered = filtered.filter(
        (i) =>
          i[regionKey] === regionFilter || i[regionKey].includes(regionFilter)
      );
    }

    // filter countries
    if (countryFilter !== 'all') {
      isFiltered = true;
      // We need to check if we have an exact match or the blip is an array containing the country
      filtered = filtered.filter(
        (i) =>
          i[countryKey] === countryFilter ||
          i[countryKey].includes(countryFilter)
      );
    }

    // filter disaster types
    if (disasterTypeFilter !== 'all') {
      isFiltered = true;
      filtered = filtered.filter((i) => i[disasterKey] === disasterTypeFilter);
    }

    // filter use cases
    if (useCaseFilter !== 'all') {
      isFiltered = true;
      filtered = filtered.filter((i) => i[useCaseKey] === useCaseFilter);
    }

    // filter implementers
    if (implementerFilter !== 'all') {
      isFiltered = true;
      filtered = filtered.filter(
        (i) =>
          i[implementerKey] === implementerFilter ||
          i[implementerKey].includes(implementerFilter)
      );
    }

    // filter SDGs
    if (sdgFilter !== 'all') {
      isFiltered = true;
      // a blip can have multiple SDGs
      filtered = filtered.filter((i) => i[sdgKey].includes(sdgFilter));
    }

    // filter start years
    if (startYearFilter !== 'all') {
      isFiltered = true;
      const start = Number(startYearFilter);
      const end = isNaN(Number(endYearFilter))
        ? new Date().getFullYear()
        : Number(endYearFilter);
      const range = Array.from(
        { length: end - start + 1 },
        (v, k) => k + start
      );
      filtered = filtered.filter((i) => range.includes(Number(i[yearKey])));
    }

    // filter end years
    if (endYearFilter !== 'all') {
      isFiltered = true;
      const start = isNaN(Number(startYearFilter))
        ? 2000 // This assumes the earliest project year
        : Number(startYearFilter);
      const end = Number(endYearFilter);
      const range = Array.from(
        { length: end - start + 1 },
        (v, k) => k + start
      );
      filtered = filtered.filter((i) => range.includes(Number(i[yearKey])));
    }

    // filter data
    if (dataFilter !== 'all') {
      isFiltered = true;
      // We need to check if we have an exact match or the blip is an array containing the data
      filtered = filtered.filter(
        (i) => i[dataKey] === dataFilter || i[dataKey].includes(dataFilter)
      );
    }

    // set filter
    setFilteredBlips(isFiltered, filtered);
    setCustomFilterSelected(isFiltered);
  }, [
    useCaseKey,
    disasterKey,
    regionFilter,
    subregionFilter,
    countryFilter,
    disasterTypeFilter,
    useCaseFilter,
    implementerFilter,
    sdgFilter,
    startYearFilter,
    endYearFilter,
    dataFilter
  ]); // don't forget to add filters to dep array here

  /**
   * Update hook for updating filters after select useState values change
   */
  useEffect(() => {
    setSubregionFilter(selectedSubregion);
    setRegionFilter(selectedRegion);
    setCountryFilter(selectedCountry);
    setDisasterTypeFilter(selectedDisasterType);
    setUseCaseFilter(selectedUserCase);
    setImplementerFilter(selectedImplementer);
    setSdgFilter(selectedSdg);
    setStartYearFilter(selectedStartYear);
    setEndYearFilter(selectedEndYear);
    setDataFilter(selectedData);
  }, [
    selectedSubregion,
    selectedRegion,
    selectedCountry,
    selectedDisasterType,
    selectedUserCase,
    selectedImplementer,
    selectedSdg,
    selectedStartYear,
    selectedEndYear,
    selectedData
  ]);
  // on subregion filter change
  const onSubregionChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    setSelectedSubregion(e.target.value);
    setRadarStateValues({ ...radarStateValues, subRegion: e.target.value });
  };
  // on region filter change
  const onRegionChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    setSelectedRegion(e.target.value);
    setRadarStateValues({ ...radarStateValues, region: e.target.value });
  };
  // on country filter change
  const onCountryChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    setSelectedCountry(e.target.value);
    setRadarStateValues({ ...radarStateValues, country: e.target.value });
  };
  // on disaster type filter change
  const onDisasterTypeChange: ChangeEventHandler<HTMLSelectElement> = (e) =>
    setSelectedDisasterType(e.target.value);
  // on use case filter change
  const onUseCaseChange: ChangeEventHandler<HTMLSelectElement> = (e) =>
    setSelectedUserCase(e.target.value);
  // on implementer filter change
  const onImplementerChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    setSelectedImplementer(e.target.value);
    setRadarStateValues({ ...radarStateValues, implementer: e.target.value });
  };
  // on SDG filter change
  const onSdgChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    setSelectedSdg(e.target.value);
    setRadarStateValues({ ...radarStateValues, sdg: e.target.value });
  };
  // on year range change
  const onYearRangeChange = (e: Number[]): void => {
    setSelectedStartYear(String(e[0]));
    setSelectedEndYear(String(e[1]));
    setRadarStateValues({
      ...radarStateValues,
      startYear: String(e[0]),
      endYear: String(e[1])
    });
  };
  // on data filter change
  const onDataChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    setSelectedData(e.target.value);
    setRadarStateValues({ ...radarStateValues, data: e.target.value });
  };

  const [sliderReset, setSliderReset] = useState(false);
  const onResetFilter = (): void => {
    setSelectedSubregion('all');
    setSelectedRegion('all');
    setSelectedCountry('all');
    setSelectedDisasterType('all');
    setSelectedUserCase('all');
    setSelectedImplementer('all');
    setSelectedSdg('all');
    setSelectedStartYear('all');
    setSelectedEndYear('all');
    setSelectedData('all');

    setSliderReset(true);
    setRadarStateValues({});
  };

  const [min, setMin] = useState<number>();
  const [max, setMax] = useState<number>();
  const forceNumber = (o: { name: string }): number => Number(o.name);

  useEffect(() => {
    const maxApply = Math.max(...years.map(forceNumber));
    const minApply = Math.min(...years.map(forceNumber));
    if (minApply !== Infinity) setMin(minApply);
    if (minApply !== -Infinity) setMax(maxApply);
  }, [years]);

  const onSliderChange: (value: number | number[]) => void = (val) => {
    if (typeof val === 'object') onYearRangeChange(val);
    setSliderReset(false);
  };

  return (
    <div className='customFilterContainer'>
      <div className='customFilterContainer-wrapper'>
        <div className='customFilterContainer-wrapper--margin'>
          <Select
            id='Select0'
            size='lg'
            onChange={onRegionChange}
            value={selectedRegion}
          >
            <option value='all'>Region</option>
            {regions.map((item) => (
              <option key={item.uuid} value={item.name}>
                {item.name}
              </option>
            ))}
          </Select>
        </div>

        <div className='customFilterContainer-wrapper--margin'>
          <Select
            id='Select_Subregion'
            size='lg'
            onChange={onSubregionChange}
            value={selectedSubregion}
          >
            <option value='all'>Subregion</option>
            {subregions.map((item) => (
              <option key={item.uuid} value={item.name}>
                {item.name}
              </option>
            ))}
          </Select>
        </div>

        <div className='customFilterContainer-wrapper--margin'>
          <Select
            id='Select1'
            size='lg'
            onChange={onCountryChange}
            value={selectedCountry}
          >
            <option value='all'>Country</option>
            {countries.map((item) => (
              <option key={item.uuid} value={item.name}>
                {item.name}
              </option>
            ))}
          </Select>
        </div>
        <div className='customFilterContainer-wrapper--margin'>
          <Select
            id='Select2'
            size='lg'
            onChange={onDisasterTypeChange}
            value={selectedDisasterType}
          >
            <option value='all'>Disaster Type</option>
            {disasterTypes.map((item) => (
              <option key={item.uuid} value={item.name}>
                {item.name}
              </option>
            ))}
          </Select>
        </div>
        <div className='customFilterContainer-wrapper--margin'>
          <Select
            id='Select3'
            size='lg'
            onChange={onUseCaseChange}
            value={selectedUserCase}
          >
            <option value='all'>Use Case</option>
            {useCases.map((item) => (
              <option key={item.uuid} value={item.name}>
                {item.name}
              </option>
            ))}
          </Select>
        </div>
        <div className='customFilterContainer-wrapper--margin'>
          <Select
            id='Select4'
            size='lg'
            onChange={onImplementerChange}
            value={selectedImplementer}
          >
            <option value='all'>UN Host</option>
            {implementers.map((item) => (
              <option key={item.uuid} value={item.name}>
                {item.name}
              </option>
            ))}
          </Select>
        </div>
        <div className='customFilterContainer-wrapper--margin'>
          <Select
            id='Select5'
            size='lg'
            onChange={onSdgChange}
            value={selectedSdg}
          >
            <option value='all'>SDG</option>
            {sdgs.map((item) => (
              <option key={item.uuid} value={item.name}>
                {item.name}
              </option>
            ))}
          </Select>
        </div>

        <div className='customFilterContainer-wrapper--margin'>
          <Select
            id='Select8'
            size='lg'
            onChange={onDataChange}
            value={selectedData}
          >
            <option value='all'>Data</option>
            {data.map((item) => (
              <option key={item.uuid} value={item.name}>
                {item.name}
              </option>
            ))}
          </Select>
        </div>

        <div className='customFilterContainer-slider'>
          {min && max && (
            <AppRangerSlider
              max={max}
              min={min}
              selectedStart={Number(radarStateValues.startYear)}
              selectedEnd={Number(radarStateValues.endYear)}
              onChange={onSliderChange}
              reset={sliderReset}
            />
          )}
        </div>
      </div>

      {customfilterSelected && (
        <div>
          <button
            type='button'
            className='customFilterContainer-reset'
            onClick={onResetFilter}
          >
            Reset
          </button>
        </div>
      )}
    </div>
  );
};
