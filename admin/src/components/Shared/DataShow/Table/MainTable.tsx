import { FC, Fragment } from "react";

import Box from '@mui/material/Box'
import { useSelector } from 'react-redux';
import { State } from '@/src/redux/store';




export interface MainTableType { }

const MainTable: FC<MainTableType> = ((props: MainTableType) => {
  const { totalData } = useSelector<State, State>(state => state)
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
        {totalData.map((a) => {
          return (
            <span key={a._id}>{a.userName || a._id}<br /></span>
          )
        })}
      </Box>
    </Fragment>
  )
});

export default MainTable;