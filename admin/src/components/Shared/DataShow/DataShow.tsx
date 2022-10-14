import PropTypes from 'prop-types'
import { FC, forwardRef, LegacyRef } from 'react'

import { styled } from '@mui/material/styles';
import { Container } from '@mui/material';

import MainHeader from './Header/MainHeader';
import Pagination from './Pagination';
import MainCard from './Cards/MainCard';
import MainTable from './Table/MainTable';
import useDataShow, { DataShowCtx } from './useDataShow';


const BodyBox = styled(Container)(({ theme }) => ({
  border: '3px solid ',
  marginTop: 10,
  borderColor: theme.palette.secondary.main,
  borderRadius: 5,
  marginBottom: 10,
  minWidth: '100%'
}));

export interface DataShowPropsType {
  // modelName: string;
}

export interface PostType {
  // modelName: string;

}


const DataShow: FC<DataShowPropsType> = forwardRef((props: DataShowPropsType, ref: LegacyRef<HTMLDivElement>) => {

  const {
    widthRef,
    cardView,
    dataShowContext
  } = useDataShow()


  return (
    <div ref={ref}>
      <DataShowCtx.Provider value={dataShowContext}>
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
      </DataShowCtx.Provider>
    </div>
  )
})


DataShow.propTypes = {
  // modelName: PropTypes.string.isRequired
}

export default DataShow;