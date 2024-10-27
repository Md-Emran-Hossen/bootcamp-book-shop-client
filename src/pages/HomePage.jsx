// import React from 'react'
import BookDetails from '../book/BookDetails'
import AboutUs from '../shared/AboutUs'
import ContactUs from '../shared/ContactUs'
import { Helmet } from "react-helmet-async";


export default function HomePage() {
  return (
    <>
      <Helmet>
        <title> Book Shop | Home </title>
      </Helmet>
      <BookDetails></BookDetails>
      <AboutUs></AboutUs>
      <ContactUs></ContactUs>
      {/* <Footer></Footer> */}
    </>
  )
}
