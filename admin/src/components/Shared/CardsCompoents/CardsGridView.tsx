import { FC, ReactNode, Fragment } from 'react'
import PropTypes from 'prop-types'


import Grid, { GridSize } from '@mui/material/Grid'
import useCurrentRouteState from '@/hookes/useCurrentRouteState'
import { useReadLocalStorage } from 'usehooks-ts'

const CardsGridView: FC<{ children: ReactNode }> = (({ children }) => {
  const currentRouteState = useCurrentRouteState();
  const { modelName } = currentRouteState;
  const gridView: GridSize = useReadLocalStorage(`${modelName}_gridView`)!
  return (
    <Grid
      item
      style={{ paddingRight: 8, paddingLeft: 8 }}
      xs={gridView}
      sm={gridView}
      md={gridView}
      lg={gridView}
      xl={gridView}>
      {children}
    </Grid>
  )
})

CardsGridView.propTypes = {
  children: PropTypes.node.isRequired
}

export default CardsGridView;