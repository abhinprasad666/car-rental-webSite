import React, { useEffect } from 'react'
import SearchBanner from '../../components/user/hero/SearchBanner'
import HighlightedRides from '../../components/user/HighlightedRides/HighlightedRides'
import { useDispatch } from 'react-redux';
import {getCars } from '../../redux/actions/carActions/carActios';
import WhyChooseUs from '../../components/user/WhyChooseUs/WhyChooseUs';
import CustomerReviews from '../../components/user/review/CustomerReviews';





const Homepage = () => {
    const dispatch = useDispatch();
    useEffect(()=>{

  dispatch(getCars)
   
    },[dispatch])
       
  return (
    <div>
        <SearchBanner/>
        <HighlightedRides/>
        
        <WhyChooseUs/>
        <CustomerReviews/>
        
       
    </div>
  )
}

export default Homepage