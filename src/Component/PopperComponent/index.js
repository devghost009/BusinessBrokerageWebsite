import React from "react";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Paper from "@mui/material/Paper";
import classes from "./PopperComponent.module.css";

const PoperComponent = ({ setOpen, open, anchorRef, data, handleClick }) => {
  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <Popper
      open={open}
      anchorEl={anchorRef.current}
      role={undefined}
      placement="bottom-start"
      transition
      disablePortal
    >
      {({ TransitionProps, placement }) => (
        <Grow
          {...TransitionProps}
          style={{
            transformOrigin:
              placement === "center-start" ? "center center" : "center center",
          }}
        >
          <Paper className={[classes.popperDiv]}>
            <ClickAwayListener onClickAway={() => setOpen(false)}>
              <MenuList
                autoFocusItem={open}
                id="composition-menu"
                aria-labelledby="composition-button"
                onKeyDown={handleListKeyDown}
              >
                {data?.map((item, i) => {
                  return (
                    <MenuItem
                      onClick={() => {
                        handleClick(item);
                        setOpen(false);
                      }}
                      key={i}
                    >
                      {item}
                    </MenuItem>
                  );
                })}
              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  );
};

export default PoperComponent;
