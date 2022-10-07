import Grid from '@mui/material/Grid'
import { FC, useEffect, useState, createRef, Fragment } from 'react'

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
        Card view come here
      </Grid>
    </Fragment>
  )
});


export default MainCard