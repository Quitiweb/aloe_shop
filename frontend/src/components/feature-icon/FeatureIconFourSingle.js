import PropTypes from "prop-types";
import React from "react";

const FeatureIconFourSingle = ({ data, spaceBottomClass }) => {
  return (
    <div  className={data.id > 3 ? "col-lg-6 col-md-6 col-sm-6" : "col-lg-4 col-md-6 col-sm-6"}>
      <div
        className={`support-wrap-3 text-center ${
          spaceBottomClass ? spaceBottomClass : ""
        }`}
        style={{ backgroundColor: `${data.backgroundColor}` }}
      >
        <div className="support-icon-2">
          <img
            className="animated"
            src={process.env.PUBLIC_URL + data.iconImage}
            alt=""
          />
        </div>
        <div className="support-content-3">
          <img src={process.env.PUBLIC_URL + data.titleImage} alt="" />
          <p style={{color: 'white', position: 'relative', bottom: 15}}>{data.title}</p>
        </div>
      </div>
    </div>
  );
};

FeatureIconFourSingle.propTypes = {
  data: PropTypes.object,
  spaceBottomClass: PropTypes.string
};

export default FeatureIconFourSingle;
