import { Button } from "@mui/material";
import { FC, Fragment, useMemo } from "react";
import { CustomPropsTypes } from "../../Shared/interfaces/react.interface";
import maindashboardStyle from "./maindashboard-style";
import { useLocation, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { State } from "@/src/redux/store";
import FirstRow from "./FirstRow";
import SecondRow from "./SecondRow";


export function useQuery() {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
}

const MainDashboard: FC<CustomPropsTypes> = (props: CustomPropsTypes) => {
  const navigate = useNavigate();
  const { propsMiniActive } = useSelector<State, State>(state => state)
  const { classes, cx } = maindashboardStyle({})
  return (
    <Fragment>
      <div className={classes.MainDashboard + " " + cx({
        [classes.sidebarHandlemainOpen]: propsMiniActive,
        [classes.sidebarHandlemainClose]: !propsMiniActive,
      })}>
        <FirstRow />
        <SecondRow />
      </div>
    </Fragment>
  )
}

export default MainDashboard
