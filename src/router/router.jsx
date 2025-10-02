import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home/Home/Home";
import AuthLayouts from "../Layouts/AuthLayouts";
import Login from "../Pages/Authentications/Login/Login";
import Register from "../Pages/Authentications/Register/Register";
import Coverage from "../Pages/Coverage/Coverage";
import SendParcel from "../Pages/SendParcel/SendParcel";
import PrivateRoute from "../routes/PrivetRoutes";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path : "coverage",
        element : <Coverage/>
      },
      {
        path : "send-parcel",
        element : <PrivateRoute><SendParcel/></PrivateRoute>,
        loader : ()=>fetch('/public/ServiceArea.json')
      }
    ],
  },
  {
    
      path : "/",
      element : <AuthLayouts/>,
      children : [
        {
          path : "login/",
          element : <Login/>
        },
        {
          path : "register/",
          element : <Register/>
        }
      ]
  },
]);
