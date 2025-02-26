import  { PropsWithChildren } from 'react'
import QueryProvider from '../../providers/QueryProvider'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from '../../contexts/AuthContext'
import AuthGuard from './AuthGuard'

const Layout = ({children}:PropsWithChildren) => {
  return (
    <QueryProvider>
        <AuthProvider>
        <Toaster/>
         <AuthGuard />
         {children} 
         <Outlet/>
        </AuthProvider>
    </QueryProvider>
  )
}

export default Layout
