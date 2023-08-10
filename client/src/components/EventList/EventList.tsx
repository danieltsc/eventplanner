import { Box, Typography, useMediaQuery } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { Event, EventActionType, useEvents } from "../../context/events";
import { handleEventSub } from "../../utils/requests-wrapper";

const EventList = (props: Event) => {
  const { id, title, isSubscribed } = props;

  const { dispatch } = useEvents();

  const styles: StylesProps = {
    eventBox: {
      display: "flex",
      backgroundColor: "#fff",
      justifyContent: "space-between",
      p: "4px",
      width: "60%",
      alignItems: "center",
      borderRadius: "18px",
      boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.3)",
    },
    eventInfoBox: {
      display: "flex",
    },
    nextEventTitle: {
      fontSize: "16px",
      ml: 1,
      fontWeight: "600",
    },
    eventStarBox: {
      display: "flex",
      alignItems: "center",
    },
  };

  const handleEventSubscription = async () => {
    const userId = localStorage.getItem("browser_UUID") as string;

    const data = await handleEventSub({ userId, eventId: id });
    if (data.error) return;

    dispatch({ type: EventActionType.UPDATE_EVENTS, payload: data.events });
  };

  return (
    <>
      <Box sx={styles.eventBox}>
        <Box sx={styles.eventInfoBox}>
          <img
            src={
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5zprnBxhAyzKdTsEsw6vi8Xpg1iHbhAbGjA&usqp=CAU"
            }
            alt="Your Alt Text"
            style={{
              width: "24px",
              height: "24px",
              objectFit: "cover",
              borderRadius: "50%",
            }}
          />
          <Typography sx={styles.nextEventTitle}>{title}</Typography>
        </Box>
        <Box sx={styles.eventStarBox}>
          {isSubscribed ? (
            <StarIcon onClick={handleEventSubscription} />
          ) : (
            <StarBorderIcon onClick={handleEventSubscription} />
          )}
        </Box>
      </Box>
    </>
  );
};

export default EventList;
