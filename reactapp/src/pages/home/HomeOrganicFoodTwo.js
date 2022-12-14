import React, { Fragment, useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import LayoutOne from "../../layouts/LayoutOne";
import HeroSliderTwenty from "../../wrappers/hero-slider/HeroSliderTwenty";
import FeatureIconFour from "../../wrappers/feature-icon/FeatureIconFour";
import TestimonialOne from "../../wrappers/testimonial/TestimonialOne";
import BlogFeaturedThree from "../../wrappers/blog-featured/BlogFeaturedThree";
import CountDownFour from "../../wrappers/countdown/CountDownFour";
import BannerSeventeen from "../../wrappers/banner/BannerSeventeen";
import TabProductFive from "../../wrappers/product/TabProductFive";
import axios from 'axios';

const url = window.$BASE_URL;

const HomeOrganicFoodTwo = () => {
  var [categoryTop, setCategoryTop] = useState('');
  var [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    axios.get(url + '/api/category-top', {
      headers: {
          Authorization: token
      }
  })
  .then(function (response) {
      console.log(response.data[0].nombre)
      setCategoryTop(response.data[0].nombre)
  }).catch(function (error) {
      console.log(error);
  }); 
  }, []);


  return (
    <Fragment>
      <MetaTags>
        <title>aloeshop</title>
        <meta
          name="Aloe Shop"
          content="Aloe Shop es la marca pionera en la venta de cosmética natural online y nutrición con aloe vera. Conoce la cosmética natural en nuestra tienda online."
        />
      </MetaTags>
      <LayoutOne headerTop="visible">
        {/* hero slider */}
        <div className={'col-12 row header-icon'} style={{ display: 'none' }}>
          <div className={'col-2'}></div>
          <img
            className={'col-8'}
            alt=""
            src={process.env.PUBLIC_URL + "/assets/img/logo/icon_transparent.png"}
            style={{position: 'relative', left: 10, maxWidth: 500}}
          />
          <div className={'col-2'}></div>
        </div>
        {/* <HeroSliderTwenty spaceLeftClass="ml-70" spaceRightClass="mr-70" /> */}
        {/* feature icon */}

        {/* tab product */}
        <TabProductFive
          spaceTopClass="pt-95"
          spaceBottomClass="pb-70"
          category={ categoryTop }
        />
        {/* banner */}
        {/* <BannerSeventeen spaceTopClass="pt-95" /> */}
        {/* countdown */}
        {/* <CountDownFour
          spaceTopClass="pt-100"
          spaceBottomClass="pb-100"
          dateTime="November 13, 2020 12:12:00"
          countDownImage="/assets/img/banner/deal-6.png"
        /> */}
        {/* testimonial */}
        {/* <TestimonialOne
          spaceTopClass="pt-100"
          spaceBottomClass="pb-95"
          bgColorClass="bg-gray-3"
        />
        {/* blog featured */}
        {/* <BlogFeaturedThree spaceTopClass="pt-70" spaceBottomClass="pb-70" /> */}
      </LayoutOne>
    </Fragment>
  );
};

export default HomeOrganicFoodTwo;
