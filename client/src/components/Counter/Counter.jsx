import { IconButton, Typography, Box } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

const Counter = ({ count, onIncrement, onDecrement, disabled }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        border: "1px solid #ccc",
        borderRadius: "8px",
        width: "fit-content",
        overflow: "hidden",
        backgroundColor: disabled ? "#f0f0f0" : "#fff",
        opacity: disabled ? 0.7 : 1,
      }}
    >
      <IconButton
        onClick={onDecrement}
        disabled={disabled}
        size="large"
        sx={{ borderRadius: 0, borderRight: "1px solid #ccc" }}
      >
        <RemoveIcon />
      </IconButton>

      <Typography sx={{ mx: 3, fontWeight: 600, fontSize: "20px" }}>
        {count}
      </Typography>

      <IconButton
        onClick={onIncrement}
        disabled={disabled}
        size="large"
        sx={{ borderRadius: 0, borderLeft: "1px solid #ccc" }}
      >
        <AddIcon />
      </IconButton>
    </Box>
  );
};

export default Counter;
