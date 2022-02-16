import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import ForceReload from './helpers/ForceReload'
import LandingPage from './layouts/LandingPage'
import Navbar from './layouts/NavBar'
import helperFetch from './helpers/helperFetch'
import UserPage from './layouts/UserPage'

export const App = (props) => {
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    helperFetch('api/users').then(user => {
      if (user.email) {
        setCurrentUser(user)
      }
    })
  }, [])

  return (
    <BrowserRouter>
      <Navbar currentUser={currentUser}/>
      <Switch>
        <Route exact path="/"> 
          <LandingPage user={currentUser}/>
        </Route>
        <Route exact path="/account"> 
          <UserPage user={currentUser}/> 
        </Route>
        <Route exact path="/users/sign_in" component={ForceReload}/>
        <Route exact path="/users/sign_up" component={ForceReload}/>
      </Switch>
    </BrowserRouter>
  )
}

export default App
