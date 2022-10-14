import Grid, { GridSize } from '@mui/material/Grid'
import { FC, useEffect, useState, createRef, Fragment } from 'react'
import { useSelector } from 'react-redux';
import { State } from '@/src/redux/store';
import useCurrentRouteState from '@/hookes/useCurrentRouteState'
import { useReadLocalStorage } from 'usehooks-ts'
export interface MainCardTypes { }

const MainCard: FC<MainCardTypes> = ((props: MainCardTypes) => {
  const [elRefs, setElRefs] = useState([]);
  useEffect(() => {
    // add  refs
    setElRefs((elRefs) =>
      Array(10)
        .fill(0)
        .map((_, i) => elRefs[i] || createRef())
    );
  }, []);

  const currentRouteState = useCurrentRouteState();
  const { modelName } = currentRouteState;

  const { totalData } = useSelector<State, State>(state => state)
  const gridView: GridSize = useReadLocalStorage(`${modelName}_gridView`)!


  // const setCardStyle = (index, expanded) => {
  //   return {
  //     // height: '80%',
  //     opacity:
  //       Object.keys(expanded).length === 0 &&
  //       Object.keys(expanded)[0] == undefined
  //         ? 1
  //         : expanded[index] == true
  //         ? 1
  //         : Object.values(expanded)[0] == undefined ||
  //           !Object.values(expanded)[0]
  //         ? 1
  //         : 0.2,
  //   };
  // };

  return (
    <Fragment>
      <Grid container spacing={2} style={{ marginTop: 20 }}>
        {totalData.map((a, index) => {
          return (
            <Grid
              item
              xs={gridView}
              sm={gridView}
              md={gridView}
              lg={gridView}
              xl={gridView}
              key={index}>
              {a.userName}<img src={a?.profileImage} style={{ width: 30, height: 30 }} /><br />
            </Grid>
          )
        })}
      </Grid>
    </Fragment>
  )
});


export default MainCard