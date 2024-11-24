import { Box } from "@mui/material";
import { styled } from "@mui/system";

const ModalBox = styled(Box)({
  backgroundColor: "white",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  padding: 24,
  borderRadius: 6,
  display: "flex",
  flexDirection: "column",
});

export default ModalBox;
