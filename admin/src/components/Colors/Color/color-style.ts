import { makeStyles } from 'tss-react/mui';
const colorStyles = makeStyles<{ colorSelected: string }>({
  name: 'ColorPage',
  uniqId: 'uniqeIDColorPage',
})((theme, _params, classes: any) => {
  const { colorSelected } = _params;
  return {
    colorDiv: {
      position: 'relative',
      background:
        colorSelected !== '' ? colorSelected : theme.palette.secondary.main,
      width: '100%',
      height: 40,
      borderRadius: 4,
      border: `solid 1px ${theme.palette.primary.main}`,
      cursor: 'pointer',
      display: 'flex',
      justifyContent: 'center',
      alignContent: 'center',
    },
    colorP: {
      color: theme.palette.text.color,
      margin: 'auto',
    },
  };
});
export default colorStyles;
