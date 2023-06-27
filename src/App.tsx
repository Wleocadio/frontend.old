import { ProtectedLayout } from './components/ProtectedLayout'
import { Login } from './components/ProtectedLayout/Login/Login'
import { AuthProvider } from './context/AuthProvider'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { CssBaseline, ThemeProvider } from '@mui/material'
import  {theme}  from './themes'
import { Dashboard } from './pages/Dashboard/Dashboard'
import { ResetPassword } from './pages/ResetPassword/ResetPassword'
import { useEffect } from 'react'
import CalendarPage from './pages/Schedule/CalendarPage'
import  Layout from './pages/Layout/Layout'


function App() {
  useEffect(() => {
    const handlePopstate = () => {
      // Realize a ação desejada, como atualizar a página
      window.location.reload();
    };

    window.addEventListener('popstate', handlePopstate);

    return () => {
      window.removeEventListener('popstate', handlePopstate);
    };
  }, []);
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
          <Route path="/Schedule">
            <ProtectedLayout>
            <Layout content={<CalendarPage/>}/>
            </ProtectedLayout>
          </Route>

          <Route path='/login'>
            <Login/>
          </Route>
          <Route path='/ResetPassword'>
            <ResetPassword/>
          </Route>
        </Switch>
      </BrowserRouter>
    </AuthProvider>
    </CssBaseline>
    </ThemeProvider>
  )
}

export default App
