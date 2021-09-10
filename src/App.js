import { ThemeProvider } from "@material-ui/core/styles";
import "./App.css";
import { showModal } from "./store/selectors/modal.selector";
import theme from "./theme";
import { ComplainPopup } from "./components";
import * as MODAL_ACTION from "./store/actions/modal.action";
import { useSelector, useDispatch } from "react-redux";
import { ModalTypes } from "./models/constant";
import {
  InputVarientContext,
  ButtonVarientContext,
} from "./contexts/variant.context";
import React, { useState } from "react";
function App() {
  const isModalOpened = useSelector(showModal);
  const dispatch = useDispatch();
  const openModal = (item) => {
    dispatch({
      type: MODAL_ACTION.OPEN_MODAL,
      payload: {
        type: ModalTypes.complain,
        data: {
          title: "Add/Edit complain",
          ...item,
        },
      },
    });
  };
  return (
    <ThemeProvider theme={theme}>
      <InputVarientContext.Provider value="standard">
        <ButtonVarientContext.Provider value="contained">
          {isModalOpened ? <ComplainPopup /> : null}

          <div className="App">
            <button onClick={(e) => openModal({ id: 2, title: "CC/TV" })}>
              open modal
            </button>
          </div>
        </ButtonVarientContext.Provider>
      </InputVarientContext.Provider>
    </ThemeProvider>
  );
}

export default App;
