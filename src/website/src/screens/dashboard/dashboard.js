import React from 'react'
import { connect } from 'react-redux';
// Cookie stuff
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router-dom'

const Dashboard = (props) => {
    // Pull account from the store
    const history = useHistory()
    const { account } = props
    const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);
    const xToken = cookies["x-token"]
    // Verify the cookies
    // Redux is non persistent, so account in redux store is deleted upon refresh. Cookies are still stored by browser,so we send it to the backend.
    verifyCookie(xToken,history)
    return(
        <div> THIS IS THE DASHBAORD</div>
    )
}
const verifyCookie = (xToken,history) => {
  if (xToken == undefined) {
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