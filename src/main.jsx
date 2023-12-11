import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Members from './components/Members.jsx'
import Update from './components/Update.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App></App>
  },
  {
    path: '/members',
    element: <Members></Members>,
    loader: () => fetch('https://simple-crud-server-final.vercel.app/members')
  },
  {
    path: '/members/:id',
    element: <Update></Update>,
    loader: ({ params }) => fetch(`https://simple-crud-server-final.vercel.app/members/${params.id}`)

  }
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
