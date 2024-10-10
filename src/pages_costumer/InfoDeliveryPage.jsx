import CustomizedSteppers from "../components/web/CustomizedSteppers";
import Footer from "../components/web/Footer";
import CustomizedInputBase from "../components/web/TextFieldWithIcon"

const InfoDeliveryPage = () => {
    const idText = <span className="text-orange-300 font-bold">412341</span>

    return (
        <div className="">
            <div className="flex flex-col items-center p-10 gap-5">
                <h1 className="font-bold text-center lg:text-left text-2xl mt-3">Estado de tu pedido</h1>
                <br></br>
                <div className="">
                    <CustomizedInputBase />
                </div>
                <div className="">
                    <CustomizedSteppers />
                </div>
                <br></br>
            </div>
            <div>
                <Footer />
            </div>
        </div>
    );
}

export default InfoDeliveryPage;
