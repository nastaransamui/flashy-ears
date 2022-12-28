import PropTypes from 'prop-types'
import Grid from '@mui/material/Grid';
import MuiPagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography'
import { FC, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '@/src/redux/store';
import { useReadLocalStorage } from 'usehooks-ts'
import useCurrentRouteState from '@/hookes/useCurrentRouteState'
import { DataShowCtx, DataShowInterface } from './useDataShow';

export interface PaginationType {

}

const Pagination: FC<PaginationType> = ((props: PaginationType) => {
  const { t } = useTranslation()
  const currentRouteState = useCurrentRouteState();
  const { modelName } = currentRouteState
  const { setPageNumber, setPerPage } = useContext(DataShowCtx)
  const { totalCount } = useSelector<State, State>(state => state)
  const pageNumber: number = useReadLocalStorage(`${modelName}_pageNumber`)!
  const perPage: number = useReadLocalStorage(`${modelName}_perPage`)!
  const [count, setCount] = useState(0)
  const dispatch = useDispatch();

  useEffect(() => {
    setPageNumber(() => pageNumber == null ? 1 : pageNumber)
    setPerPage(() => perPage == null ? 48 : perPage)
    setCount(() => totalCount == 0 ? totalCount : Math.ceil(totalCount / perPage))
    if (totalCount > 0) {
      if (pageNumber > totalCount / perPage) {
        setPageNumber(Math.ceil(totalCount / perPage))
      }
    }
    return () => { }
  }, [pageNumber, perPage, totalCount])

  return (
    <Grid
      container
      spacing={1}
      direction='column'
      justifyContent='center'
      alignItems='center'
      sx={{ pb: 2, pt: 2 }}>
      <Grid item >
        <Typography>
          {t('Page', { ns: 'common' })}: {pageNumber}
          &nbsp;&nbsp;&nbsp;&nbsp;
          {t('Total', { ns: 'common' })}: {totalCount.toLocaleString()}
        </Typography>
      </Grid>
      <Grid item >
        <MuiPagination
          count={count}
          page={pageNumber == null ? 1 : pageNumber as number}
          showLastButton
          showFirstButton
          boundaryCount={2}
          color='primary'
          onChange={(e, value) => {
            // requestSearch('');
            dispatch({
              type: 'FIRST_SEARCH',
              payload: true
            })
            dispatch({
              type: 'DELETE_IDS',
              payload: []
            })
            dispatch({
              type: 'STATUS_IDS_UPDATE',
              payload: []
            })
            setPageNumber((prevValue: number) => value)
          }}
          siblingCount={1}
        />
      </Grid>
    </Grid>
  )
})

Pagination.propTypes = {

}

export default Pagination;