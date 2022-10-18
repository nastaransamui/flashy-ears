import { makeStyles } from 'tss-react/mui';

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
