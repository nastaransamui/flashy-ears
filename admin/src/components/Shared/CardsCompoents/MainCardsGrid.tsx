import { FC, ReactNode } from "react";
import PropTypes from 'prop-types'
import Grid from '@mui/material/Grid'

const MainCardsGrid: FC<{ children: ReactNode }> = (({ children }) => {

  return (
    <Grid container direction="row" spacing={2} style={{ marginTop: 20 }} justifyContent="center" alignItems="center">
      {children}
    </Grid>
  )
});

MainCardsGrid.propTypes = {
  children: PropTypes.node.isRequired
}

export default MainCardsGrid;