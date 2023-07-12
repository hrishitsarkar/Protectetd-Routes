import "./styles.css";
import {
  BrowserRouter,
  createBrowserRouter,
  Navigate,
  Router,
  RouterProvider
} from "react-router-dom";

import { Navbar } from "./components/Navbar";
import { Home } from "./pages/Home";
import { List } from "./pages/List";
import { Contact } from "./pages/Contact";
import { ItemDetails } from "./pages/ItemDetails";
import { NotFound } from "./pages/NotFound";
import { useState } from "react";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // create high-level protected route below
  const ProtectedRoute = ({children}) => {
    if(!isLoggedIn) return <Navigate to= '/' replace = {true} />

    return children;

  }

  // protect the routes for the contact, list and item details pages
  const router = createBrowserRouter([
    {
      path: "/",
      errorElement: <NotFound />,
      element: <Navbar />,
      children: [
        {
          index: true,
          element: <Home loggedIn={isLoggedIn} setLoggedin={setIsLoggedIn} />
        },
        {
          path: "/contact",
          element: (
            <ProtectedRoute><Contact /></ProtectedRoute>
          )
        },
        {
          path: "/list",
          children: [
            {
              index: true,
              element: (
              <ProtectedRoute><List /></ProtectedRoute>
              )
            },
            {
              path: ":itemId",
              element: (
                <ProtectedRoute><ItemDetails /></ProtectedRoute>
                )
            }
          ]
        }
      ]
    }
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}
