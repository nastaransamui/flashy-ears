import { makeStyles } from 'tss-react/mui';
import { darken } from '@mui/material/styles';
import { CSSProperties } from 'react';

const PageStyle = makeStyles<{}>()((theme, _params, classes: any) => {
  return {
    picture: {
      width: '100%',
      height: 'auto',
      display: 'block',
    },
    lead: {
      fontWeight: 100,
      fontSize: 21,
    },
  };
});

export default PageStyle;
