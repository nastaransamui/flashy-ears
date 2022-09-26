import { makeStyles } from 'tss-react/mui';
import { alpha } from '@mui/material/styles';

const emailStyles = makeStyles<{}>()((theme) => {
  return {
    input: {
      position: 'relative',
      legend: {
        textAlign: theme.direction == 'ltr' ? 'left' : 'right',
      },
      '& label': {
        right: 29,
        textAlign: theme.direction == 'ltr' ? 'left' : 'right',
      },
    },
  };
});

export default emailStyles;
