import React from 'react';
import cwLogo from "../../assets/cwlogo.webp";
import fbIcon from "../../assets/socialMediaIcons/fb.svg"
import igIcon from "../../assets/socialMediaIcons/igicon.svg"
import wpIcon from "../../assets/socialMediaIcons/wpicon.svg"

const Footer = () => {
    return (

        <footer className="bg-black grid grid-cols-3 p-10">

            <div className="">
                <img src={cwLogo} alt="Company Logo" />
            </div>
            <div className="flex flex-col content-center gap-7 ">
                <h1 className="text-white text-4xl font-bold text-center">Síguenos:</h1>
                <div className="flex flex-row place-content-around">
                    <a href="https://www.instagram.com/cartoon_war_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="" rel="noopener noreferrer">
                        <button className="">
                            <img src={igIcon} alt="Facebook Icon" className="w-12 h-12" />

                        </button>
                    </a>
                    <a href="https://api.whatsapp.com/send?phone=%2B573165684544&context=ARChOaqFpsWOHIzhj9FxMRRX29SCN37f25c_32pVncYsT2WylMmikHYYymsDpoAX5nRqUN1328afGb-gruHbbhT3sMF-yiXEyErNzCUfbfDdSxLKXFXUPI9u_cy7ZFl_hfonnwxka666lXKo9QClqVcvwg&source=FB_Page&app=facebook&entry_point=page_cta" target="" rel="noopener noreferrer">
                        <button className="">
                            <img src={wpIcon} alt="Facebook Icon" className="w-12 h-12" />

                        </button>
                    </a>
                    <a href="https://www.facebook.com/CartoonWar123" target="" rel="noopener noreferrer">
                        <button className="">
                            <img src={fbIcon} alt="Facebook Icon" className="w-12 h-12" />
                        </button>
                    </a>
                </div>
                <h2 className="text-white text-2xl font-semibold text-center">Desarrolladores:</h2>
                <div className='flex flex-row place-content-around'>
                    <a href="https://github.com/juandavid764" className='animate-pulse'>
                        <h2 className="text-white text-2xl  text-center">Juan Trujillo</h2>
                    </a>
                    <a href="https://github.com/SebastianM1206" className='animate-pulse'>
                        <h2 className="text-white text-2xl  text-center">Sebastian Medina</h2>
                    </a>
                </div>
            </div>
            <div className="flex flex-col place-content-around">
                <h2 className="text-white text-4xl font-bold text-center">Horarios:</h2>
                <h2 className="text-white text-2xl font-semibold text-center">Todos los días</h2>
                <h2 className="text-white text-2xl font-semibold text-center">6:00pm - 12am</h2>
                <h3>Columna 3</h3>
                <p>Contenido de la columna 3</p>
            </div>

        </footer >
    );
};

export default Footer;