import { Outlet, Navigate } from 'react-router';
import { useAuth } from './useAuth'

export const ProtectedRoutes = () =>{
    // console.log("Use Auth:", useAuth)
    const cookies = useAuth();
    // console.log("Protected Routes cookies:", cookies)

    return cookies.token ? <Outlet/> : <Navigate to='/login' exact />
}

