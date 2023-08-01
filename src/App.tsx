import { ProtectedLayout } from './components/ProtectedLayout'
import { Login } from './components/ProtectedLayout/Login/Login'
import { AuthProvider } from './context/AuthProvider'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { CssBaseline, ThemeProvider } from '@mui/material'
import  {theme}  from './themes'
import Dashboard from './pages/Dashboard/Dashboard'
import { ResetPassword } from './pages/ResetPassword/ResetPassword'
import { useEffect } from 'react'
import CalendarPage from './pages/Schedule/CalendarPage'
import Patients from './pages/Patients/Patients'
import LayoutPrincipal from './pages/Layout/Layout'
import Consults from './pages/Consults/Consults'
import Profile from './pages/Profile/Profile'
import MyPlan from './pages/MyPlan/MyPlan'
import Home from './pages/Home/Home'


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
            
            <Home/>
            
          </Route>
          <Route path="/dashboard">
            <ProtectedLayout>
            <LayoutPrincipal content={<Dashboard/>}/>
            </ProtectedLayout>
          </Route>
          <Route path="/schedule">
            <ProtectedLayout>
            <LayoutPrincipal content={<CalendarPage/>}/>
            </ProtectedLayout>
          </Route>
          <Route path="/patients">
            <ProtectedLayout>
            <LayoutPrincipal content={<Patients/>}/>
            </ProtectedLayout>
          </Route>
          <Route path="/consults">
            <ProtectedLayout>
            <LayoutPrincipal content={<Consults/>}/>
            </ProtectedLayout>
          </Route>
          <Route path="/myPlan">
            <ProtectedLayout>
            <LayoutPrincipal content={<MyPlan/>}/>
            </ProtectedLayout>
          </Route>
          <Route path="/profile">
            <ProtectedLayout>
            <LayoutPrincipal content={<Profile/>}/>
            </ProtectedLayout>
          </Route>
          <Route path='/login'>
            <Login/>
          </Route>
          <Route path='/resetPassword'>
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
