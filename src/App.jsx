import React, { useEffect, useState } from "react";
import Home from "./Pages/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createContext } from "react";
import axios from "axios";
import Dashboard from "./Pages/Dashboard";
import Contacts from "./Components/Contacts";
import AddContact from "./Components/AddContact";
import Logout from "./Components/Logout";
import ProtectedRoutes from "./Components/ProtectedRoutes";
import NotFound from "./Pages/NotFound";

export const UserContext = createContext(null);

const router = createBrowserRouter([
      {
            path: "/",
            element: <Home></Home>
      },
      {
            path: "/register",
            element: <Register></Register>
      },
      {
            path: "/login",
            element: <Login></Login>
      },
      {
            path: "/dashboard",
            element: <ProtectedRoutes><Dashboard></Dashboard></ProtectedRoutes>,
            children: [
                  {
                        index: true,
                        element: <Contacts></Contacts>
                  },
                  {
                        path: "/dashboard/add-contact",
                        element: <AddContact></AddContact>
                  }
            ]
      },
      {
            path: "/logout",
            element: <Logout></Logout>
      },
      {
            path: "*",
            element: <NotFound></NotFound>
      }
]);

const App = () => {
      const [user, setUser] = useState();
      useEffect(() => {
            axios.get("https://contact-nest-app.vercel.app/contact-nest/verify", {
                  headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                  }
            })
                  .then(res => {
                        if (res.data.success) {
                              setUser(res.data.user);
                        }
                  }).catch(err => {
                        console.log(err);
                  })
      }, []);
      return (
            <>
                  <ToastContainer></ToastContainer>
                  <UserContext.Provider value={{user, setUser}}>
                        <RouterProvider router={router}></RouterProvider>
                  </UserContext.Provider>
            </>
      );
};

export default App;