import CloseIcon from "@mui/icons-material/Close";
import { Box, Modal } from "@mui/material";
import React from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  border: "none",
  outline: "none",
  // paddingTop: "20px",
};

type T = {
  open: boolean;
  closeModal: () => void;
  children: JSX.Element;
  overflow?: string;
  maxHeight?: string;
  height?: string;
  isConfirmationModal?: boolean;
  isProductModal?: boolean;
  isCopyFromModal?: boolean;
};

const CustomModal: React.FC<T> = ({
  open,
  closeModal,
  children,
  overflow,
  maxHeight,
  height,
  isConfirmationModal,
  isProductModal,
  isCopyFromModal,
}) => {
  return (
    <Modal
      open={open}
      onClose={closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        height={height}
        maxHeight={maxHeight ? maxHeight : "600px"}
        overflow={overflow ? overflow : "auto"}
        sx={style}
        mt={isCopyFromModal && "30px"}
      >
        <Box
          sx={{
            position: "absolute",
            top: isConfirmationModal ? "45px" : "10px",
            right: isConfirmationModal ? "45px" : isProductModal ? "25px" : "10px",
            cursor: "pointer",
            p: "5px 5px 0 5px",
            borderRadius: "5px",
          }}
          bgcolor="#D7280F"
        >
          <CloseIcon fontSize="medium" onClick={closeModal} sx={{ width: "100%", color: "#fff" }} />
        </Box>
        {children}
      </Box>
    </Modal>
  );
};

export default CustomModal;
