import { makeStyles } from 'tss-react/mui';
export const grayColor = [
  '#999',
  '#777',
  '#3C4858',
  '#AAAAAA',
  '#D2D2D2',
  '#DDD',
  '#555555',
  '#333',
  '#eee',
  '#ccc',
  '#e4e4e4',
  '#E5E5E5',
  '#f9f9f9',
  '#f5f5f5',
  '#495057',
  '#e7e7e7',
  '#212121',
  '#c8c8c8',
  '#505050',
  '#212121',
  '#263238',
];
const userStyles = makeStyles<{}>({
  name: 'UserPage',
  uniqId: 'uniqeIDUserPage',
})((theme, _params, classes: any) => {
  return {
    cardIconTitle: {
      color: theme.palette.secondary.main,
      textAlign: 'center',
      marginTop: '15px',
      marginBottom: '0px',
      '& small': {
        fontSize: '80%',
        fontWeight: '400',
        textAlign: 'center',
      },
    },
    cardCategory: {
      marginTop: '10px',
      color: grayColor[0] + ' !important',
      textAlign: 'center',
    },
    cardTitle: {
      textAlign: 'center',
      color: theme.palette.text.color,
      marginTop: '15px',
      marginBottom: '0px',
      '& small': {
        fontSize: '80%',
        fontWeight: '400',
      },
    },
    description: {
      textAlign: 'center',
      color: grayColor[0],
    },
  };
});
export default userStyles;
