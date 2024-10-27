// import React from 'react'

// import Footer from "../shared/Footer";
import { Helmet } from "react-helmet-async";
import Navbar from "../shared/Navbar";

export default function Blog() {
  return (<>
    <Helmet>
      <title> Book Shop | Blogs </title>
    </Helmet>
    <Navbar></Navbar>
    <div className="font-bold text-center text-4xl text-green-600 py-20">
      Welcome to Blog Page
    </div>
  </>
  )
}
