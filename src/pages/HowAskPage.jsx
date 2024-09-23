import Footer from "../components/web/Footer";
import React from "react";

const HowAskPage = () => {
    return (
        <div className="">
            <div className="flex flex-col items-center p-10 ">
                <h1 className="font-bold text-center lg:text-left text-2xl mt-3">Manual del Villano Hambriento: ¿Cómo Pedir?</h1>
                <br></br>
                <div className="w-screen flex flex-row justify-center">
                    <iframe className="w-9/12 h-96" src="https://www.youtube.com/embed/ZYWX1DjCvl0?si=kTi9hI82_HfiWhHE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                </div>

                <br></br>
                <h2 className="text-xl text-center">Aprende a dominar el arte de ordenar como un verdadero villano.</h2>
                <br></br>
            </div>
            <div>
                <Footer />
            </div>
        </div>
    );
};

export default HowAskPage;

