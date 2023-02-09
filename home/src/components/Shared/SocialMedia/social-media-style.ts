import { makeStyles } from 'tss-react/mui';
const socialMediaStyle = makeStyles<{}>({
  name: 'socialMediaStyle',
  uniqId: 'uniqeIDsocialMediaStyle',
})((theme, _params, classes: any) => {
  return {
    menuItem: {
      '& svg': {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        margin: 'auto',
      },
      '& i': {
        color:
          theme.palette.mode == 'dark'
            ? theme.palette.primary.main
            : theme.palette.secondary.main,
        position: 'absolute',
        left: 0,
        right: 0,
        margin: '15px auto',
      },
      // [theme.breakpoints.down(900)]: {
      //   bottom: 0,
      // },
      background:
        theme.palette.mode == 'dark'
          ? theme.palette.secondary.main + ' !important'
          : theme.palette.primary.main + ' !important',
      color: 'black !important',
      '&:hover': {
        background:
          theme.palette.mode == 'dark'
            ? theme.palette.secondary.dark + ' !important'
            : theme.palette.primary.dark + ' !important',
        color: 'black !important',
      },
    },
  };
});
export default socialMediaStyle;
