import foodImg from "../assets/aboutUsPage/imgAboutUs1.webp";
import teamImg from "../assets/aboutUsPage/imgAboutUs2.webp";
import Footer from "../components/web/Footer";

const AboutUsPage = () => {
    const warText = <span className="text-red-600 font-bold">War</span>
    const cartoonText = <span className="text-orange-300 font-bold">Cartoon</span>
    return (
        <div className="flex flex-col lg:mt-10 bg-neutral-50">
            <div className="flex flex-col-reverse lg:flex-row justify-center lg:mx-24">
                <div className="lg:w-4/6 p-5 lg:p-5">
                    <h1 className="font-bold text-center lg:text-left text-4xl mt-3">¿Quiénes somos?</h1>
                    <br />
                    <p className="text-left text-2xl">Bienvenidos a {cartoonText} {warText}, la Sociedad Secreta de Supervillanos donde la comida rápida alcanza nuevas dimensiones. Desde el año 2017, hemos conspirado para ofrecerte una experiencia culinaria única, fusionando la calidad de nuestros productos, la innovación gastronómica y el deleite de sus paladares.</p>

                </div>
                <div className="lg:w-4/6 lg:p-5">
                    <img src={foodImg} alt="Imagen 1" />
                </div>
            </div>
            <br />
            <div className="flex flex-row justify-center lg:px-28">
                <img src={teamImg} alt="Imagen 2" className="" />
            </div>
            <br />
            <div className="flex flex-row justify-center p-5 lg:px-24">
                <p className="text-2xl">En {cartoonText} {warText}, cada producto es una obra maestra creada con ingredientes cuidadosamente seleccionados para asegurar un sabor inigualable. Nuestra dedicación a la calidad es tan inquebrantable como la lealtad de un villano a su causa. Únete a nosotros y descubre por qué somos la elección de los verdaderos supervillanos del sabor. </p>
            </div>
            <br />
            <div className="flex flex-row justify-center lg:px-24">
                <h2 className="text-2xl font-bold text-center">¡Te esperamos para que formes parte de nuestra conspiración culinaria! </h2>
            </div>
            <br />
            <div className="flex flex-row justify-center lg:px-24">
                <button className="bg-orange-400 text-black font-bold px-4 py-2 rounded-md hover:bg-orange-500 text-3xl ">Realizar pedido</button>
            </div>
            <br />
            <div>
                <Footer />
            </div>
        </div>
    );
};

export default AboutUsPage;