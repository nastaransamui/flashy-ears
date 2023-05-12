import { makeStyles } from 'tss-react/mui';
const productStyles = makeStyles<{}>({
  name: 'ProductPage',
  uniqId: 'uniqeIDProductPage',
})((theme, _params, classes: any) => {
  return {
    colorEmpty: {
      display: 'flex',
      width: '100%',
      marginLeft: '1%',
      justifyContent: 'center',
    },
    uploadIcon: {
      width: '3em',
      height: '3em',
      cursor: 'pointer',
      color: theme.palette.secondary.main,
      [theme.breakpoints.down('sm')]: {
        height: '3em',
        width: '3em',
        marginRight: 'auto',
        marginLeft: 'auto',
      },
    },
    dropIcon: {
      width: '3em',
      height: '3em',
      color: theme.palette.primary.main,
      cursor: 'pointer',
      [theme.breakpoints.down('sm')]: {
        height: '3em',
        width: '3em',
        marginRight: 'auto',
        marginLeft: 'auto',
      },
    },
    label: {
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
    },
    labelRoot: {
      width: 'inherit',

      borderRadius: 10,
      marginLeft: 20,
      marginRight: 20,
    },
    img: {
      borderRadius: 15,
      maxWidth: '25vw',
      maxHeight: '25vw',
      objectFit: 'contain',
      alignSelf: 'center',
      [theme.breakpoints.down('sm')]: {
        maxWidth: '60vw',
        maxHeight: '60vw',
      },
    },
    imgBox: {
      borderRadius: 10,
      marginTop: 5,
      maxWidth: '95% !important',
      padding: 10,
      display: 'flex',
      flexDirection: 'column',
    },

    deleteButton: {
      width: '100%',
    },

    overlay__caption: {
      // background: 'red',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      // opacity: 0.4,
      zIndex: 3333,
      minHeight: '100%',
    },
    indeterminateColor: {
      color: '#f50057',
    },
    selectAllText: {
      fontWeight: 500,
    },
    selectedAll: {
      backgroundColor: theme.palette.action.selected,
      '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.08)',
      },
    },
  };
});
export default productStyles;
