import { Button } from "@mui/material";
import { FC, Fragment, useMemo } from "react";
import { CustomPropsTypes } from "../../Shared/interfaces/react.interface";
import maindashboardStyle from "./maindashboard-style";

import { useSelector } from "react-redux";
import { State } from "@/src/redux/store";
import FirstRow from "./FirstRow";
import SecondRow from "./SecondRow";


const MainDashboard: FC<CustomPropsTypes> = (props: CustomPropsTypes) => {

  const propsMiniActive = useSelector<State, boolean>((state) => state.propsMiniActive);
  const { classes, cx } = maindashboardStyle({})
  return (
    <Fragment>
      <div className={classes.MainDashboard + " " + cx({
        [classes.sidebarHandlemainOpen]: propsMiniActive,
        [classes.sidebarHandlemainClose]: !propsMiniActive,
      })}>
        {/* <FirstRow />
        <SecondRow /> */}
      </div>
    </Fragment>
  )
}

export default MainDashboard
