import { FC, } from "react";
import Container from '@mui/material/Container';
import PropTypes from 'prop-types'
import { makeStyles } from "tss-react/mui";
interface PageContainerTypes {
  children: React.ReactNode;
}


const containerStyle = makeStyles<{}>()((theme) => {
  return {
    mainStyle: {
      marginTop: 100,
      minHeight: '78vh',
      paddingLeft: 0,
      paddingRight: 0,
      marginLeft: theme.direction == 'ltr' ? -20 : 0,
      marginRight: theme.direction == 'ltr' ? 0 : -20,
      minWidth: '100%',
      borderRadius: 5,
      [theme.breakpoints.down('sm')]: {
        marginRight: theme.direction == 'ltr' ? 0 : 5,
        marginLeft: theme.direction == 'ltr' ? -5 : 0
      }
    }
  }
})



const PageContainer: FC<PageContainerTypes> = ((props: PageContainerTypes) => {
  const { children } = props
  const { classes } = containerStyle({})
  return (
    <Container disableGutters className={classes.mainStyle} maxWidth='xl' {...props} >
      {children}
    </Container>
  )
})

PageContainer.propTypes = {
  children: PropTypes.node.isRequired,
}

export default PageContainer;