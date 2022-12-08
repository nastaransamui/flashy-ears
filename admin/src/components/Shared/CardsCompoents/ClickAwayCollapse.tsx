import { FC, ReactElement } from "react"
import PropTypes from 'prop-types'


//Mui Component
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Collapse from '@mui/material/Collapse';

//Redux
import { useSelector, useDispatch } from "react-redux";
import { State } from "@/src/redux/store";

export interface ClickAwayCollapseType {
  children: ReactElement;
  index: number;
}


const ClickAwayCollapse: FC<ClickAwayCollapseType> = (({ children, index }) => {

  const { expanded } = useSelector<State, State>(state => state);
  const dispatch = useDispatch();

  const awayClicked = (index: number, expanded: object) => {
    if (expanded[index as keyof typeof expanded]) {
      dispatch({
        type: 'EXPANDED',
        payload: { [`${index}`]: !expanded[index as keyof typeof expanded] }
      })
    }
  };

  return (
    <Collapse in={expanded[index]} timeout="auto" unmountOnExit >
      <ClickAwayListener
        onClickAway={() => awayClicked(index, expanded)}>
        {children}
      </ClickAwayListener>
    </Collapse>
  )
})

ClickAwayCollapse.propTypes = {
  children: PropTypes.element.isRequired,
  index: PropTypes.number.isRequired,
}

export default ClickAwayCollapse;