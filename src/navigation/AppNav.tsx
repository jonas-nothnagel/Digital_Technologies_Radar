import { useState } from 'react';
import { Flex } from '@chakra-ui/react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { ROUTES } from './routes';
// Components
import { AppLeftNav, AppMobileHeader, AppBottomNav } from '../components';

// Layouts
import { MainLayout } from '../ui/MainLayout';
import { RadarLayout } from '../layouts/RadarLayout';
// Pages
import {
  NotFound404,
  Radar as RadarComponent,
  Search,
  About,
  Volunteers,
  Home
} from '../pages';
// Views
import { QuadrantView } from '../pages/views/QuadrantView';
// Context
import { RadarContext, RadarContextInterface } from './context';

// Styles
import './AppNav.scss';

export const NavApp: React.FC = () => {
  const [radarStateValues, setRadarStateValues] = useState({
    region: '',
    subRegion: '',
    data: '',
    startYear: '',
    endYear: '',
    implementer: '',
    sdg: '',
    country: ''
  });

  const radarContext: RadarContextInterface = {
    radarStateValues,
    setRadarStateValues
  };
  return (
    <RadarContext.Provider value={radarContext}>
      <Flex className='navApp'>
        <AppLeftNav />
        <AppBottomNav />
        <AppMobileHeader />
        <MainLayout>
          <Routes>
            <Route path={ROUTES.HOME} element={<Home />} />
            <Route path={ROUTES.RADAR} element={<RadarLayout />}>
              <Route path={''} element={<RadarComponent />}></Route>
              <Route path={ROUTES.QUADRANT}>
                <Route
                  path={ROUTES.QUADRANT_PARAM}
                  element={<QuadrantView />}
                />
              </Route>
            </Route>
            <Route path={ROUTES.ABOUT} element={<About />} />
            <Route path={ROUTES.SEARCH} element={<Search />} />
            <Route path={ROUTES.VOLUNTEERS} element={<Volunteers />} />

            <Route path='/' element={<Navigate replace to={ROUTES.RADAR} />} />
            <Route path='*' element={<NotFound404 />} />
          </Routes>
        </MainLayout>
      </Flex>
    </RadarContext.Provider>
  );
};
