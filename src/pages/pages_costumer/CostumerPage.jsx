// src/pages/Home.jsx
import React, { useEffect } from "react";
import ImageSlider from "../../components/web/ImageSlider";
import SecondaryMenu from "../../components/web/SecondaryMenu";
import CardsContainer from "../../components/web/CardsContainer";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const CostumerPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full ">
      <ImageSlider />
      <SecondaryMenu />
      <CardsContainer />
      <ToastContainer
        toastStyle={{  backgroundColor: "#fb923c", color: "white", fontWeight:"bold", boxShadow:" 0px -4px 15px 0px rgba(0,0,0,0.2)" }} 
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover={false}
        theme="colored"
        />
    </div>
  );
};

export default CostumerPage;
