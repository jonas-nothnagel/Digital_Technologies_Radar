import React, { useEffect, useState } from "react";
import { Box, Flex, useColorMode } from "@chakra-ui/react";
import { useParams } from "react-router";
import {
  BlipType,
  DataLists,
  Filter,
  QuadrantRadar,
  TechList,
  useRadarState,
} from "@undp_sdg_ai_lab/undp-radar";

import { BackButton, WaitingForRadar } from "../../radar/components";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../navigation/routes";

export const QuadrantView: React.FC = () => {
  const nav = useNavigate();
  const { colorMode } = useColorMode();
  const [loading, setLoading] = useState(true);
  const {
    state: {
      selectedItem,
      selectedQuadrant,
      radarData: { quadrants },
    },
    setSelectedQuadrant,
  } = useRadarState();

  const { quadrantId } = useParams();

  useEffect(() => {
    console.log("selectedQuadrant: ", selectedQuadrant);
    console.log("quadrants: ", quadrants);
    console.log("quadrantRouteParam: ", quadrantId);

    const goToBlip = (blip: BlipType) => nav(`${ROUTES.BLIP}/${blip.id}`);
    if (selectedItem) {
      goToBlip(selectedItem);
    } else if (quadrantId) {
      if (quadrants && quadrants.length > 0 && quadrants.includes(quadrantId)) {
        // we must show Quadrant view
        setSelectedQuadrant(quadrantId);
        setLoading(false);
      }
    }
  }, [selectedItem, selectedQuadrant, quadrants, quadrantId]);

  return (
    <Flex
      py={0}
      flexBasis={["auto", "45%"]}
      w="full"
      justifyContent="space-between"
      bg={
        colorMode === "light" ? "rgba(250,250,250,1)" : "rgba(250,250,250,.3)"
      }
    >
      <BackButton to="RADAR" />
      <Box>
        <TechList showTitle={false} />
        <Filter />
      </Box>
      <Box flex={1}>
        {loading && <WaitingForRadar />}
        {!loading && (
          <>
            {/* TODO: change the undefined type to null in the lib */}
            <QuadrantRadar selectedQuadrant={selectedQuadrant || undefined} />
          </>
        )}
      </Box>
      <Box>
        <DataLists />
      </Box>
    </Flex>
  );
};
