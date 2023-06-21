import { ProtectedLayout } from './components/ProtectedLayout/Logout'
import { Login } from './components/ProtectedLayout/Login/Login'

import { AuthProvider } from './context/AuthProvider'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { CssBaseline, ThemeProvider } from '@mui/material'
import  {theme}  from './themes'
import { Dashboard } from './pages/Dashboard/Dashboard'


function App() {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
    <AuthProvider>
      <BrowserRouter>
        <Switch>
        <Route exact path='/'>
            
            <h2> Bem Vindo</h2>
            
          </Route>
          <Route path="/Dashboard">
            <ProtectedLayout>
            <Dashboard/>
            </ProtectedLayout>
          </Route>

          <Route path='/login'>
            <Login/>
          </Route>
        </Switch>
      </BrowserRouter>
    </AuthProvider>
    </CssBaseline>
    </ThemeProvider>
  )
}

export default App
