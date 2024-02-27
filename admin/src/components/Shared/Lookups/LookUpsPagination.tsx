import { FC, Fragment, useContext, useEffect, useState } from "react";


//Mui
import Grid from '@mui/material/Grid';
import MuiPagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';


//Hooks 
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { SingleDataCtx } from '@/hookes/useSingleData'
import { useReadLocalStorage } from 'usehooks-ts'
import useCurrentRouteState from '@/hookes/useCurrentRouteState';

export interface LookUpsPaginationPropsType {
  stepIndex: number;
  stepId: string;
  total: number;
}

const LookUpsPagination: FC<LookUpsPaginationPropsType> = ((
  { stepIndex, stepId, total }
) => {
  const { t } = useTranslation('common');
  const dispatch = useDispatch();
  const { setLookupsFilter } = useContext(SingleDataCtx);
  const currentRouteState = useCurrentRouteState();

  const { modelName, lookUps, predefineDb } = currentRouteState;
  const lookupsFilter: any = useReadLocalStorage(`${modelName}_Lookup`)!
  const [count, setCount] = useState(0)
  const [pageNumber, setPageNumber] = useState(lookupsFilter?.[stepIndex]?.[`${modelName}_${stepId}_pageNumber`]);
  const [perPage, setPerPage] = useState(lookupsFilter?.[stepIndex]?.[`${modelName}_${stepId}_perPage`])

  useEffect(() => {
    if (lookUps !== undefined && lookupsFilter == null) {
      var arrayOfLookup: any = []
      lookUps.map((routeLookup: string, index: number) => {
        arrayOfLookup.push({
          [`${modelName}_${routeLookup}_pageNumber`]: 1,
          [`${modelName}_${routeLookup}_perPage`]: 10,
          [`${modelName}_${routeLookup}_sortByField`]: predefineDb ? 'name' : 'createdAt',
          [`${modelName}_${routeLookup}_sortDirection`]: predefineDb ? 1 : -1,
        })
      })
      setLookupsFilter(() => arrayOfLookup)
    }

    setCount(() => total == 0 ? total :
      Math.ceil(total / lookupsFilter?.[stepIndex]?.[`${modelName}_${stepId}_perPage`] || 10))
    setPageNumber(() => pageNumber == null ? 1 : pageNumber)
    setPerPage(() => perPage == null ? 10 : perPage)
    if (total > 0) {
      if (pageNumber > total / perPage) {
        setPageNumber(Math.ceil(total / perPage))
      }
    }
    return () => {

    }
  }, [pageNumber, perPage, total, lookupsFilter])

  return (
    <Fragment>
      <Grid
        container
        spacing={1}
        direction='column'
        justifyContent="center"
        alignItems='center'
        sx={{ pb: 2, pt: 2 }}>
        <Grid item>
          <Typography>
            {t('Page')}: {pageNumber}
            &nbsp;&nbsp;&nbsp;&nbsp;
            {t('Total')}: {total.toLocaleString()}
          </Typography>
        </Grid>
        <Grid item>
          <MuiPagination
            count={count}
            page={
              lookupsFilter?.[stepIndex]?.[`${modelName}_${stepId}_pageNumber`]
                == null ? 1
                :
                lookupsFilter?.[stepIndex]?.[`${modelName}_${stepId}_pageNumber`] as number}
            showLastButton
            showFirstButton
            boundaryCount={2}
            color='primary'
            onChange={(e, value) => {

              if (lookupsFilter !== null) lookupsFilter[stepIndex][`${modelName}_${stepId}_pageNumber`] = value;
              setLookupsFilter(() => lookupsFilter)
              dispatch({
                type: 'RERUN_SINGLE_GET',
                payload: true
              })
              setPageNumber((prevValue: number) => value)
            }}
            siblingCount={1} />
        </Grid>
      </Grid>
    </Fragment>
  )
})


export default LookUpsPagination;
