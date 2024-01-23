import { MainContext, MainContextType } from "@contexts/MainProvider";
import DeleteIcon from "@mui/icons-material/Delete";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import SaveIcon from "@mui/icons-material/Save";
import { Box, Button, Stack } from "@mui/material";
import { CardWrapper, Text } from "@src/globalStyle";
import React, { useContext } from "react";
import { FlexBetween, FlexWrapper } from "./Flex";

const Confirmation: React.FC<{ title: string }> = ({ title }) => {
  const {
    state: { confirm },
    actions: { resConfirm },
  } = useContext<MainContextType>(MainContext);

  return (
    <Box width="700px" p="30px">
      <CardWrapper
        sx={{
          p: "60px 36px",
          boxShadow: confirm.isDelete ? "0px 5px 11px 0px #D7280F" : "0px 5px 11px 0px #00544C",
        }}
      >
        <Stack gap="45px">
          <FlexWrapper gap="24px">
            <Box
              sx={{
                border: "1px solid #D7280F",
                width: "85px",
                height: "60px",
                borderRadius: "60%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                // mt: "100px",
              }}
            >
              <DeleteIcon sx={{ color: "#D7280F", width: "40px", height: "40px" }} />
            </Box>
            <Text fs="14px">{title}</Text>
          </FlexWrapper>
          <FlexBetween>
            <div></div>
            <FlexWrapper gap="15px">
              <Button
                variant="contained"
                sx={{ textTransform: "none", padding: "4px 8px" }}
                startIcon={<SaveIcon />}
                onClick={() => resConfirm(true)}
              >
                Да
              </Button>

              <Button
                variant="contained"
                startIcon={<DisabledByDefaultIcon />}
                sx={{
                  textTransform: "none",
                  padding: "4px 8px",
                }}
                color="secondary"
                onClick={() => resConfirm(false)}
              >
                Нет
              </Button>
              {/* <CustomButton value="Да " width="100px" />
          <CustomButton value="Нет " width="100px"  /> */}
            </FlexWrapper>
          </FlexBetween>
        </Stack>
      </CardWrapper>
    </Box>
  );
};

export default Confirmation;
