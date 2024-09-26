import React from 'react';
import cwLogo from "../../assets/cwlogo.webp";
import fbIcon from "../../assets/socialMediaIcons/fb.svg"
import igIcon from "../../assets/socialMediaIcons/igicon.svg"
import wpIcon from "../../assets/socialMediaIcons/wpicon.svg"
import GitHubIcon from '@mui/icons-material/GitHub';

const Footer = () => {
    return (

        <footer className="bg-black grid grid-cols-1 lg:grid-cols-3 lg:p-10 p-5">

            <div className="size-40 lg:size-72">
                <img src={cwLogo} alt="Company Logo" className="" />
            </div>
            <div className="flex flex-col lg:content-center gap-7 pt-5 lg:pt-0">
                <div>
                    <h1 className="text-white lg:text-2xl font-bold lg:text-center">Síguenos:</h1>
                </div>

                <div className="flex flex-row gap-2 lg:place-content-around">
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
                <h2 className="text-white lg:text-xl font-semibold lg:text-center">Desarrolladores:</h2>
                <div className='flex flex-col lg:place-content-around'>
                    <a href="https://github.com/juandavid764" className='animate-pulse'>
                        <h2 className="text-white lg:text-xl  lg:text-center">Juan David Trujillo</h2>
                    </a>
                    <GitHubIcon color="primary" />
                    <a href="https://github.com/SebastianM1206" className='animate-pulse'>
                        <h2 className="text-white lg:text-xl  lg:text-center">Sebastian Medina Garcia</h2>

                        <h2 className="text-white lg:text-xl  lg:text-center">Sebastian Medina Garcia</h2>

                    </a>
                </div>
            </div>
            <div className="row-start-2 lg:row-start-1 lg:col-start-3 lg:align-top">
                <h2 className="text-white lg:text-2xl font-bold lg:text-center">Horarios:</h2>
                <br></br>
                <h2 className="text-white lg:text-xl  lg:text-center">Todos los días</h2>
                <h2 className="text-white lg:text-xl  lg:text-center">6:00pm - 12am</h2>
            </div>
            <br></br>

        </footer >
    );
};

export default Footer;