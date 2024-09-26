import CustomizedSteppers from "../components/web/CustomizedSteppers";
import Footer from "../components/web/Footer";

const InfoDeliveryPage = () => {

    return (
        <div className="">
            <div className="flex flex-col items-center p-10 ">
                <h1 className="font-bold text-center lg:text-left text-2xl mt-3">Consulta el estado de tu pedido</h1>
                <br></br>
                <CustomizedSteppers />
                <br></br>
                <h2 className="text-xl text-center">Aprende a dominar el arte de ordenar como un verdadero villano.</h2>
                <br></br>
            </div>
            <div>
                <Footer />
            </div>
        </div>
    );
}

export default InfoDeliveryPage;
