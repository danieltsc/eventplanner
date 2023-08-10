import { Box, Typography } from "@mui/material";
import moment from "moment";
import { useEvents } from "../../context/events";

const EventPreview = () => {

  const { state } = useEvents();

  const { nextEvent } = state;

  const styles: StylesProps = {
    eventContainer: {
      background: "linear-gradient(to bottom right, #8E44AD, #fff)",
      borderRadius: "12px",
      pl: 2,
      pt: 1,
      pb: 1,
      mr: 4,
      mt: 2,
    },
    eventInfoBox: {
      width: "100%",
    },
    eventTitle: {
      fontSize: "16px",
      fontWeight: "600",
    },
    eventDateBox: {
      display: "flex",
      justifyContent: "flex-end",
      pt: "4px",
    },
    eventDate: {
      mr: 2,
      backgroundColor: "#3c3030",
      padding: "4px 12px",
      borderRadius: "12px",
      color: "white",
      fontSize: "12px",
      fontWeight: "400",
    },
    imageBox: {
      mr: 1,
    },
  };

  if (!nextEvent) return null;

  return (
    <Box sx={styles.eventContainer}>
      <Box
        sx={{
          display: "flex",
        }}
      >
        <Box sx={styles.imageBox}>
          <img
            src={
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5zprnBxhAyzKdTsEsw6vi8Xpg1iHbhAbGjA&usqp=CAU"
            }
            alt="Your Alt Text"
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "24px",
              objectFit: "cover",
            }}
          />
        </Box>
        <Box sx={styles.eventInfoBox}>
          <Box>
            <Typography sx={styles.eventTitle}>{nextEvent.title}</Typography>
            <Typography sx={styles.eventType}>{nextEvent.category}</Typography>
            <Typography sx={styles.eventOwner}>{nextEvent.owner}</Typography>
          </Box>
        </Box>
      </Box>
      <Box sx={styles.eventDateBox}>
        <Typography sx={styles.eventDate}>{moment(nextEvent.startDate).format("MMMM, Do | HH:mm")}</Typography>
      </Box>
    </Box>
  );
};

export default EventPreview;
