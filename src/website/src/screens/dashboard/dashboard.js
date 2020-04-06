import React from 'react'
import { connect } from 'react-redux';

//Material ui
import { makeStyles } from '@material-ui/core';

// Cookie stuff
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router-dom'


// Components
import Header from '../../components/Header';
import NavBar  from '../../components/Navbar';
import MainBodyCard from '../../components/MainBodyCard';

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}))

const Dashboard = (props) => {
    const classes = useStyles();
    // Pull account from the store
    const { account } = props

    const history = useHistory()
    const [cookies] = useCookies(['cookie-name']);
    const xToken = cookies["x-token"]
    // Verify the cookies only if empty. If it is send to backend. In production, the backend server will handle this.
    verifyCookie(xToken,history)
    return(
       <>
        <Header title={"Dashboard"}/>
        <NavBar/>
       </>
    )
}
const verifyCookie = (xToken,history) => {
  if (xToken === undefined) {
    history.push("/")
    return
  }
  // No need to verify jwt, backend will handle it.
}
function mapStateToProps(state) {
    return {
      account: state.user.account
    };
  }
export default connect(mapStateToProps)(Dashboard);