import React, { lazy } from 'react'

const Dashboard = lazy(() => import('views/Dashboard.js'))
// const Notifications = lazy(() => import('views/Notifications.js'))
const TableListUser = lazy(() => import('./views/User/TableListUser.js'))
// const UserProfile = lazy(() => import('views/UserProfile.js'))
const UserDetails = lazy(() => import('./views/User/UserDetails.js'))
const AddUser = lazy(() => import('./views/User/AddUser.js'))
const ErrorLog = lazy(() => import('./views/Compagne/ErrorLog'))
const ErrorLogSms = lazy(() => import('./views/CompagneSms/ErrorLog'))
const AddCompagne = lazy(() => import('./views/Compagne/AddCompagne'))
const AddCompagneSms = lazy(() => import('./views/CompagneSms/AddCompagne'))
const CompagneDetails = lazy(() => import('./views/Compagne/CompagneDetails'))
const CompagneDetailsSms = lazy(() => import('./views/CompagneSms/CompagneDetails'))
const UpdateUser = lazy(() => import('./views/User/UpdateUser.js'))
const TableListCompagne = lazy(() => import('./views/Compagne/TableListCompagne'))
const TableListCompagneSms = lazy(() => import('./views/CompagneSms/TableListCompagne'))

var routes = [{
  path: '/tablesUsers',
  name: 'List Users',
  icon: 'tim-icons icon-single-02',
  component: <TableListUser/>,
  layout: '/admin',
}, {
  path: '/TableListCompagne',
  name: 'Compagne Email',
  icon: 'tim-icons icon-single-02',
  component: <TableListCompagne/>,
  layout: '/admin',
},
  {
    path: '/TableListCompagneSms',
    name: 'Compagne Sms',
    icon: 'tim-icons icon-single-02',
    component: <TableListCompagneSms/>,
    layout: '/admin',
  }, {
    path: '/dashboard',
    name: 'Dashboard',
    icon: 'tim-icons icon-chart-pie-36',
    component: <Dashboard/>,
    layout: '/admin',
  }//,
   //    {
   //  path: '/notifications',
   //  name: 'Notifications',
   //  icon: 'tim-icons icon-bell-55',
   //  component: <Notifications/>,
   //  layout: '/admin',
   // }, {
//   path: '/user-profile',
//   name: 'User Profile',
//   icon: 'tim-icons icon-single-02',
//   component: <UserProfile/>,
//   layout: '/admin',
// }
  , {
    path: '/UserDetails/:id/', component: <UserDetails/>, layout: '/admin',
  },
  {
    path: '/CompagneDetails/:id/', component: <CompagneDetails/>, layout: '/admin',
  },
  {
    path: '/CompagneDetailsSms/:id/', component: <CompagneDetailsSms/>, layout: '/admin',
  },
  {
    path: '/AddUser', component: <AddUser/>, layout: '/admin',
  }, {
    path: '/AddCompagne', component: <AddCompagne/>, layout: '/admin',
  }, {
    path: '/AddCompagneSms', component: <AddCompagneSms/>, layout: '/admin',
  }, {
    path: '/UpdateUser/:id/', component: <UpdateUser/>, layout: '/admin',
  }, {
    path: '/ErrorLog/:id', component: <ErrorLog/>, layout: '/admin',
  }, {
    path: '/ErrorLogSms/:id', component: <ErrorLogSms/>, layout: '/admin',
  },]
export default routes
