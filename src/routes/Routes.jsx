
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
import Profile from "../pages/dashboardPages/Profile";
import CreateCategory from "../pages/dashboardPages/CreateCategory";
import InsertBooksPage from "../pages/dashboardPages/InsertBooksPage";
import AllUsers from "../pages/dashboardPages/AllUsers";
import AllBooks from "../pages/dashboardPages/AllBooks";
import AllCategories from "../pages/dashboardPages/AllCategories";
import EditCategories from "../pages/dashboardPages/EditCategories";
import EditBooks from "../pages/dashboardPages/EditBooks";
import CategoryBasedBookDataLoad from "../book/CategoryBasedBookDataLoad";


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
        element: <PrivateRoute>,
          <BookDetailsPage></BookDetailsPage>
        </PrivateRoute>,
         loader: ({params}) => fetch(`https://bootcamp-book-shop-server-psi.vercel.app/book/${params.id}`),
      },
      {
        path: "/categoryy/:id",
        element: <CategoryBasedBookDataLoad></CategoryBasedBookDataLoad>,
        loader: ({ params }) =>
          fetch(
            `https://bootcamp-book-shop-server-psi.vercel.app/categoryy/${params.id}`
          ),
      },
      {
        path: "/blog",
        element: <Blog></Blog>,
      },
      {
        path: "/faq",
        element: <FaqPage></FaqPage>,
      },
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
        loader: ({ params }) =>
          fetch(`https://bootcamp-book-shop-server-psi.vercel.app/user/${params.id}`),
      },
      {
        path: "/dashboard/categories",
        element: <CreateCategory></CreateCategory>,
      },
      {
        path: "/dashboard/allCategories",
        element: <AllCategories></AllCategories>,
        loader: () => fetch("https://bootcamp-book-shop-server-psi.vercel.app/categories"),
      },
      {
        path: "/dashboard/category/:id",
        element: <EditCategories></EditCategories>,
        loader: ({params}) => fetch(`https://bootcamp-book-shop-server-psi.vercel.app/category/${params.id}`),
      },
      {
        path: "/dashboard/books",
        element: <InsertBooksPage></InsertBooksPage>, 
        // element:<AddBook></AddBook>,
      },
      {
        path: "/dashboard/book/:id",
        element: <EditBooks></EditBooks>,
        loader: ({params}) => fetch(`https://bootcamp-book-shop-server-psi.vercel.app/book/${params.id}`),
      },
      {
        path: "/dashboard/allBooks",
        element: <AllBooks></AllBooks>,
        loader: () => fetch("https://bootcamp-book-shop-server-psi.vercel.app/books"),
      },
      {
        path: "/dashboard/allUsers",
        element: <AllUsers></AllUsers>,
      },
    ],
  },
])

export default routes;

