import { Box, Typography } from "@mui/material";
import EventPreview from "../EventPreview/EventPreview";
import { Event, useEvents } from "../../context/events";

const MyEvents = () => {
  const { state } = useEvents();

  const { events } = state;

  const myEvents = events.filter((event: Event) => event.isSubscribed);

  const styles: StylesProps = {
    container: {
      height: "60vh",
      overflow: "scroll",
    },
    infoBox: {
      mt: 2,
    },
  };

  return (
    <Box>
      <Box sx={styles.infoBox}>
        <Typography>Other events:</Typography>
      </Box>
      <Box sx={styles.container}>
        {myEvents.length > 0 ? (
          myEvents.map((event: any, index: number) => {
            return <EventPreview key={index} {...event} />;
          })
        ) : (
          <Typography>You have no following events.</Typography>
        )}
      </Box>
    </Box>
  );
};

export default MyEvents;
