import { FC, ReactNode } from "react";

//Mui
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container'

//Redux
import { useSelector } from 'react-redux';
import { State } from '@/src/redux/store';

type InputProps = {
  dispay: string
}

type DeleteBoxPropsType = {
  children: ReactNode;
}

export const StyledBox = styled(Container)<InputProps>(({ theme, dispay }) => ({
  border: '2px solid ',
  marginTop: -10,
  borderColor: theme.palette.secondary.main,
  borderRadius: 5,
  marginBottom: 5,
  minWidth: '100%',
  [theme.breakpoints.only('lg')]: {
    minHeight: 30,
  },
  [theme.breakpoints.only('md')]: {
    minHeight: 30,
  },
  display: dispay,
}));

const CardDeleteBox: FC<DeleteBoxPropsType> = (({ children }: DeleteBoxPropsType) => {

  const { deleteIds, statusIdsUpdate, } = useSelector<State, State>(state => state)
  return (
    <StyledBox
      dispay={deleteIds.length !== 0 || statusIdsUpdate.length !== 0 ? 'flex' : 'none'}
      disableGutters
      maxWidth='xl'
      className='animate__animated animate__zoomIn'>
      {children}
    </StyledBox>
  )
})

CardDeleteBox.defaultProps = {
  children: null
}



export default CardDeleteBox;