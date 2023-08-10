import { Box, Button, SxProps, Typography, useMediaQuery } from "@mui/material";

import { CSSProperties, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Categories,
  Event,
  EventActionType,
  useEvents,
} from "../context/events";
import EventPreview from "../components/EventPreview/EventPreview";
import EventFilters from "../components/EventFilters/EventFilters";
import EventList from "../components/EventList/EventList";
import MyEvents from "../components/MyEvents/MyEvents";
import { getAllEvents } from "../utils/requests-wrapper";

enum ListEventTypes {
  ALL = "All",
  SUBSCRIBED = "Subscribed",
}

const Events = () => {
  const isMobile = useMediaQuery("(max-width: 688px)");
  const [listEventType, setListEventType] = useState<ListEventTypes>(
    ListEventTypes.ALL
  );

  const { state, dispatch } = useEvents();

  const { events, nextEvent } = state;

  useEffect(() => {
    const hasUUID = localStorage.getItem("browser_UUID");

    if (!hasUUID) {
      const browserUUID = uuidv4();
      localStorage.setItem("browser_UUID", browserUUID);
    }
    const fetchData = async () => {
      const data = await getAllEvents();
      if (data.error) return;

      dispatch({ type: EventActionType.UPDATE_EVENTS, payload: data.events });
    };
    fetchData();
  }, []);

  const webStyles = {
    container: {
      width: "30vw",
      pl: 4,
      pt: 2,
      pb: 2,
      border: "1px solid #605a5a24",
    },
    eventsBox: {
      mt: 4,
    },
  };

  const mobileStyles = {
    container: {
      width: "100%",
      pl: 2,
      pr: 2,
    },
    eventsBox: {
      mt: 2,
    },
  };

  const styles: StylesProps = {
    main: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      mt: 4,
      height: "100vh",
      overflow: "hidden",
    },
    container: {
      background:
        listEventType === ListEventTypes.ALL
          ? `
        radial-gradient(circle at bottom left, transparent 0%, transparent 45%, white 45%, white 100%),
        linear-gradient(to top right, #8e44add1 0%, #8e44add1 0%, white 50%, white 100%)
      `
          : undefined,
      ...(isMobile ? mobileStyles.container : webStyles.container),
      borderRadius: "8px",
    },
    title: {
      fontSize: "24px",
      background: "linear-gradient(to right, #8E44AD, #fff)",
      WebkitBackgroundClip: "text", // For Safari
      color: "transparent",
      fontWeight: "800",
    },
    eventsBox: {
      ...(isMobile ? mobileStyles.eventsBox : webStyles.eventsBox),
    },
    eventsListBox: {
      display: "flex",
      flexDirection: "column",
      mt: 2,
      pr: 2,
      maxHeight: "50vh",
      overflow: "scroll",
    },
    listEventButton: {
      mr: 2,
      borderRadius: "12px",
      textTransform: "uppercase",
    },
    eventTypesBox: {
      mb: 1,
      mt: 1,
    },
  };

  const updateEventType = (type: ListEventTypes) => {
    setListEventType(type);
  };

  return (
    <Box sx={styles.main}>
      <Box sx={styles.container}>
        <Box>
          <Typography sx={styles.title}>Welcome</Typography>
        </Box>
        <Box sx={styles.eventTypesBox}>
          <Button
            onClick={() => updateEventType(ListEventTypes.ALL)}
            sx={styles.listEventButton}
            variant={
              listEventType === ListEventTypes.ALL ? "contained" : "outlined"
            }
          >
            <Typography>All</Typography>
          </Button>
          <Button
            onClick={() => updateEventType(ListEventTypes.SUBSCRIBED)}
            sx={styles.listEventButton}
            variant={
              listEventType === ListEventTypes.SUBSCRIBED
                ? "contained"
                : "outlined"
            }
          >
            <Typography>Subscribed</Typography>
          </Button>
        </Box>
        {nextEvent && (
          <Box>
            <Box>
              <Typography>Your next event:</Typography>
            </Box>
            <Box>
              <EventPreview />
            </Box>
          </Box>
        )}
        {listEventType === ListEventTypes.ALL && (
          <>
            <Box sx={styles.eventsBox}>
              <EventFilters />
            </Box>
            <Box sx={styles.eventsListBox}>
              {events.length > 0 &&
                events.map((event: Event, index: number) => {
                  const eventContainerStyle = {
                    display: "flex",
                    justifyContent: index % 2 === 0 ? "flex-start" : "flex-end",
                    mt: 4,
                    mb: 2,
                  };
                  return (
                    <Box key={index} sx={eventContainerStyle}>
                      <EventList {...event} />
                    </Box>
                  );
                })}
            </Box>
          </>
        )}
        {listEventType === ListEventTypes.SUBSCRIBED && <MyEvents />}
      </Box>
    </Box>
  );
};

export default Events;
