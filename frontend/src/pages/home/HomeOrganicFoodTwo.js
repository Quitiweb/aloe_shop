import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import LayoutOne from "../../layouts/LayoutOne";
import HeroSliderTwenty from "../../wrappers/hero-slider/HeroSliderTwenty";
import FeatureIconFour from "../../wrappers/feature-icon/FeatureIconFour";
import TestimonialOne from "../../wrappers/testimonial/TestimonialOne";
import BlogFeaturedThree from "../../wrappers/blog-featured/BlogFeaturedThree";
import CountDownFour from "../../wrappers/countdown/CountDownFour";
import BannerSeventeen from "../../wrappers/banner/BannerSeventeen";
import TabProductFive from "../../wrappers/product/TabProductFive";

const HomeOrganicFoodTwo = () => {
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
        <HeroSliderTwenty spaceLeftClass="ml-70" spaceRightClass="mr-70" />
        {/* feature icon */}

        {/* tab product */}
        <TabProductFive
          spaceTopClass="pt-95"
          spaceBottomClass="pb-70"
          category="na"
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
