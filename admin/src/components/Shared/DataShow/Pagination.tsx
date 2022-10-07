import Grid from '@mui/material/Grid';
import MuiPagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography'
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

export interface PaginationType { }

const Pagination: FC<PaginationType> = ((props: PaginationType) => {
  const { t } = useTranslation()
  return (
    <Grid
      container
      spacing={1}
      direction='column'
      justifyContent='center'
      alignItems='center'
      sx={{ pb: 2, pt: 2 }}>
      <Grid item>
        <Typography>
          {t('Page', { ns: 'common' })}: 1
          &nbsp;&nbsp;&nbsp;&nbsp;
          {t('Total', { ns: 'common' })}: {1}
        </Typography>
      </Grid>
      {/* {adminFormSubmit ? (
      <Grid item component='nav' style={{ height: 30, marginTop: 10 }} />
    ) : ( */}
      <Grid item>
        <MuiPagination
          // count={Math.ceil(total / perPage)}
          // page={pageNumber}
          count={1}
          page={1}
          showLastButton
          showFirstButton
          boundaryCount={2}
          color='primary'
          onChange={(e, value) => {
            // cardView && setExpanded({});
            // requestSearch('');
            // paginationChange(value);
          }}
          siblingCount={1}
        />
      </Grid>
      {/* )} */}
    </Grid>
  )
})

export default Pagination;