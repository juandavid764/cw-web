// src/pages/Home.jsx
import React, { useEffect } from "react";
import ImageSlider from "../../components/web/ImageSlider";
import SecondaryMenu from "../../components/web/SecondaryMenu";
import CardsContainer from "../../components/web/CardsContainer";

const CostumerPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full ">
      <ImageSlider />
      <SecondaryMenu />
      <CardsContainer />
    </div>
  );
};

export default CostumerPage;
