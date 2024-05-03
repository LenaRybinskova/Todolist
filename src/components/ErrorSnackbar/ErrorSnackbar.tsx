import * as React from "react";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import { useAppDispatch, useAppSelector } from "AppWithRedux/store";
import { appActions, selectError } from "AppWithRedux/app-reducer";

export function ErrorSnackbar() {
  const error = useAppSelector(selectError);
  const dispatch = useAppDispatch();

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    // если гдето мимо кликаем, то не уберется сообщение
    if (reason === "clickaway") {
      return;
    }
    dispatch(appActions.setAppStatus({ status: "succeeded" }));
    dispatch(appActions.setAppError({ error: null }));
  };

  return (
    <Box sx={{ width: 500 }}>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={error !== null}
        onClose={handleClose}
        message={error}
        key={"bottom" + "center"}
        autoHideDuration={3000}
      />
    </Box>
  );
}
