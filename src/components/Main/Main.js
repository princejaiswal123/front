import React from 'react'
import { Route, Routes } from 'react-router-dom'
import DashBoard from '../DashBoardComponents/DashboardPage/DashBoard'
import Login from '../Login/Login'
import QuizAnalysis from '../DashBoardComponents/AnalyticsComponents/QuizAnalysis'
import MainDashBoard from '../DashBoardComponents/MainDashBoard'
import SettingPage from '../DashBoardComponents/SettingsComponent/SettingPage'
import Register from '../register/Register'
import SharedTaskPage from '../sharedPage/SharedTaskPage'
import Protected from '../DashBoardComponents/Protected/Protected'

const Main = () => {
    const DashboardComps = [
        {
          path: "/dashboard",
          comp: <DashBoard/>
        },
        
        {
          path: "/analytics",
          comp: <QuizAnalysis />
        },
        {
          path: "/settings",
          comp: <SettingPage/>
        },
      
       
      ]
      const nonDashboardComps = [
        {
          path: "/",
          comp: <Login />
        },
        {
          path: "register",
          comp: <Register />
        },
      ]
  return (
    <div>
        <Routes>
        <Route path="/shared-task/:taskId" element={<SharedTaskPage/>} />
        {nonDashboardComps.map((x, idx) => {
            return <Route
              key={idx}
              path={x.path}
              element={
             <div>{x.comp}</div>
              }
            />
          })} 
        {DashboardComps.map((x, idx) => {
            return <Route
              key={idx}
              path={x.path}
              element={
               <Protected>
                 <MainDashBoard>{x.comp}</MainDashBoard>
               </Protected>
              }
            />
          })} 
        </Routes>
    </div>
  )
}

export default Main