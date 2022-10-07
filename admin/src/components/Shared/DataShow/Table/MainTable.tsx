import { FC, Fragment } from "react";

import Box from '@mui/material/Box'

export interface MainTableType { }

const MainTable: FC<MainTableType> = ((props: MainTableType) => {

  return (
    <Fragment>
      <Box
        sx={{
          height: '63vh',
          bgcolor: 'background.paper',
          borderRadius: 2,
          mb: 2,
          mt: 2,
        }}>
        This is Table view
      </Box>
    </Fragment>
  )
});

export default MainTable;