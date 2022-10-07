import PropTypes from 'prop-types'
import { FC, forwardRef, useRef, LegacyRef, useState, useEffect } from 'react'

import { styled } from '@mui/material/styles';
import { Container } from '@mui/material';

import MainHeader from './Header/MainHeader';
import Pagination from './Pagination';
import { useSelector } from 'react-redux';
import { State } from '@/src/redux/store';
import MainCard from './Cards/MainCard';
import MainTable from './Table/MainTable';

const BodyBox = styled(Container)(({ theme }) => ({
  border: '3px solid ',
  marginTop: 10,
  borderColor: theme.palette.secondary.main,
  borderRadius: 5,
  marginBottom: 10,
  minWidth: '100%'
}));

export interface DataShowPropsType {

}


const DataShow: FC<DataShowPropsType> = forwardRef((props: DataShowPropsType, ref: LegacyRef<HTMLDivElement>) => {
  const widthRef = useRef<HTMLDivElement>(null);
  const { cardView } = useSelector<State, State>(state => state)

  return (
    <div ref={ref}>
      <MainHeader />
      <BodyBox
        maxWidth='xl'
        ref={widthRef}
        className='animate__animated animate__zoomIn'>
        <Pagination />
        {
          cardView ? <MainCard /> : <MainTable />
        }
        <Pagination />
      </BodyBox>
    </div>
  )
})

export default DataShow;