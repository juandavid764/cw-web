import React from 'react';
import cwLogo from "../../assets/cwlogo.webp";
import GitHubIcon from '@mui/icons-material/GitHub';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import { orange } from '@mui/material/colors';

const Footer = () => {
    return (

        <footer className="bg-black grid grid-cols-1 lg:flex lg:flex-col lg:pt-10 p-5 lg:w-full lg:items-stretch">
            <div className='lg:flex lg:flex-row lg:justify-center gap-x-72'>
                <div className="size-40 lg:w-56 flex flex-col justify-start	h-min">
                    <img src={cwLogo} alt="Company Logo" className="" />
                </div>
                <div className="flex flex-col lg:content-center lg:justify-start gap-7 pt-5 lg:pt-0 lg:w-56">
                    <div>
                        <h1 className="text-white lg:text-2xl font-bold lg:text-center">Síguenos:</h1>
                    </div>

                    <div className="flex flex-row gap-2 lg:place-content-around">
                        <a href="https://www.instagram.com/cartoon_war_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="" rel="noopener noreferrer">
                            <button className="">
                                <InstagramIcon fontSize="large" sx={{ color: orange[300] }} />
                            </button>
                        </a>
                        <a href="https://api.whatsapp.com/send?phone=%2B573165684544&context=ARChOaqFpsWOHIzhj9FxMRRX29SCN37f25c_32pVncYsT2WylMmikHYYymsDpoAX5nRqUN1328afGb-gruHbbhT3sMF-yiXEyErNzCUfbfDdSxLKXFXUPI9u_cy7ZFl_hfonnwxka666lXKo9QClqVcvwg&source=FB_Page&app=facebook&entry_point=page_cta" target="" rel="noopener noreferrer">
                            <button className="">
                                <WhatsAppIcon fontSize="large" sx={{ color: orange[300] }} />
                            </button>
                        </a>
                        <a href="https://www.facebook.com/CartoonWar123" target="" rel="noopener noreferrer">
                            <button className="">
                                <FacebookIcon fontSize="large" sx={{ color: orange[300] }} />
                            </button>
                        </a>
                    </div>
                    <div className='flex flex-col lg:place-content-around'>
                    </div>
                </div>
                <div className="row-start-2 lg:flex lg:flex-col lg:justify-start lg:w-56">
                    <h2 className="text-white lg:text-2xl font-bold lg:text-center">Horarios:</h2>
                    <br></br>
                    <h2 className="text-white lg:text-xl  lg:text-center">Todos los días</h2>
                    <h2 className="text-white lg:text-xl  lg:text-center">6:00pm - 12:00am</h2>
                </div>
            </div>
            <br></br>
            <div className='flex flex-row lg:justify-center gap-x-5'>
                <a href="https://github.com/juandavid764" className=''>
                    <GitHubIcon color='primary' fontSize="large" />
                </a>
                <a href="https://github.com/SebastianM1206">
                    <GitHubIcon color='error' fontSize="large" />
                </a>
            </div>
        </footer >
    );
};

export default Footer;