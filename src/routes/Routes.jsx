
import { createBrowserRouter } from "react-router-dom"
import CommonLayout from "../layout/CommonLayout"
import HomePage from "../pages/homepage";
import Blog from "../blog/Blog";
import FaqPage from "../faq/FaqPage";
import LoginPage from "../pages/LoginPage";
import ErrorPage from "../errorpage/ErrorPage";
import Register from "../pages/Register";
import LoginLayout from "../layout/LoginLayout";
import BookDetails from "../book/BookDetails";
import BookDetailsPage from "../book/BookDetailsPage";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layout/DashboardLayout";
// import TestRegister from "../pages/TestRegister";
import Profile from "../pages/dashboardPages/Profile";
import CreateCategory from "../pages/dashboardPages/CreateCategory";
import InsertBooksPage from "../pages/dashboardPages/InsertBooksPage";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <CommonLayout></CommonLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <HomePage></HomePage>,
        // loader: () => fetch(`http://localhost:5000/books`),
      },

      {
        path: "/books",
        element: <BookDetails></BookDetails>,
        // loader: () => fetch(`http://localhost:5000/books`),
      },
      {
        path: "/book/:id",
        element: <PrivateRoute>
          <BookDetailsPage></BookDetailsPage>
        </PrivateRoute>
        ,
        loader: ({ params }) =>
          fetch(`http://localhost:5001/user/${params.id}`),
      },
      {
        path: "/blog",
        element: <Blog></Blog>,
      },
      {
        path: "/faq",
        element: <FaqPage></FaqPage>,
      },
      // {
      //   path: "/test",
      //   element: <TestRegister></TestRegister>,
      // },
    ],
  },
  {
    path: "/login",
    element: <LoginLayout />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
  },
  {
    path: "/register",
    element: <LoginLayout />,
    children: [
      {
        path: "/register",
        element: <Register></Register>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "",
        element: <Profile />,
      },
      {
        path: "/dashboard/categories",
        element: <CreateCategory></CreateCategory>,
        // loader: () => fetch("http://localhost:5001/categories"),
      },
      {
        path: "/dashboard/books",
        element: <InsertBooksPage></InsertBooksPage>,
        // loader: () => fetch("http://localhost:5001/categories"),
      },
    ],
  },
])

export default routes;

