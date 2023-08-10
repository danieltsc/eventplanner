import { Box, Typography } from "@mui/material";

const EventFilters = () => {
  const styles: StylesProps = {
    container: {
      width: "100%",
      pl: 2,
      pr: 2,
    },
    eventsBox: {
      mt: 2,
    },
    filtersBox: {
      display: "flex",
    },
    filterOptionsBox: {
      display: "flex",
    },
    filterOption: {
      backgroundColor: "#d78ed7ad",
      padding: "2px 12px",
      borderRadius: "12px",
      ml: 1,
      color: "#3e2267",
      fontSize: "12px",
    },
  };

  return (
    <>
      <Box>
        <Typography>Discover upcoming events:</Typography>
      </Box>
      <Box sx={styles.filtersBox}>
        <Box>
          <Typography>Sort by: </Typography>
        </Box>
        <Box sx={styles.filterOptionsBox}>
          <Typography sx={styles.filterOption}>Coding</Typography>
          <Typography sx={styles.filterOption}>Social</Typography>
        </Box>
      </Box>
    </>
  );
};

export default EventFilters;
