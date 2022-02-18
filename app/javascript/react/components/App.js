import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import ForceReload from './helpers/ForceReload'
import LandingPage from './layouts/LandingPage'
import Navbar from './layouts/NavBar'
import helperFetch from './helpers/helperFetch'
import UserPage from './layouts/UserPage'
import Dashboard from './material_ui/Dashboard'
import Pricing from './material_ui/Pricing'

export const App = (props) => {
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    helperFetch('api/users').then(reply => {
      if (reply.user) {
        setCurrentUser(reply.user)
      }
    })
  }, [])

  return (
    <BrowserRouter>
      <Navbar currentUser={currentUser}/>
      <Switch>
        <Route exact path="/"> 
          <Dashboard user={currentUser}/>
        </Route>
        <Route exact path="/pricings"> 
          <Pricing user={currentUser}/>
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
