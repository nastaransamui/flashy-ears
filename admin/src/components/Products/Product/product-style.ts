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
      color: theme.palette.secondary.main,
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
      maxWidth: 'inherit',
      objectFit: 'contain',
    },
    imgBox: {
      border: `2px solid ${theme.palette.primary.main}`,
      borderRadius: 10,
      padding: 10,
    },

    deleteButton: {
      paddingBottom: '1em',
      width: '100%',
    },
  };
});
export default productStyles;
