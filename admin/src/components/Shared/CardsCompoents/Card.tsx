import { forwardRef, ReactNode } from 'react'
import PropTypes from 'prop-types'
import MuiCard from '@mui/material/Card';
import { useSelector } from 'react-redux';
import { State } from '@/src/redux/store';


interface Props {
  children: ReactNode;
  index: number;
}

export type Ref = HTMLDivElement;
const Card = forwardRef<Ref, Props>(({ children, index }, ref) => {

  const { expanded } = useSelector<State, State>(state => state)

  const setCardStyle = (index: number, expanded: { [key: string]: boolean }) => {
    return {
      opacity:
        Object.keys(expanded).length === 0 &&
          Object.keys(expanded)[0] == undefined
          ? 1
          : expanded[index as keyof typeof expanded] == true
            ? 1
            : Object.values(expanded)[0] == undefined ||
              !Object.values(expanded)[0]
              ? 1
              : 0.2,
    };
  };
  return (
    <MuiCard ref={ref} style={setCardStyle(index, expanded)}>
      {children}
    </MuiCard>
  )
})

Card.propTypes = {
  children: PropTypes.node.isRequired,
  index: PropTypes.number.isRequired
}

export default Card;