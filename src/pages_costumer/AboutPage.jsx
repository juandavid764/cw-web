import foodImg from "../assets/aboutUsPage/imgAboutUs1.webp";
import teamImg from "../assets/aboutUsPage/imgAboutUs2.webp";
import Footer from "../components/web/Footer";
import LoginPage from "../pages_admin/LoginPage";
import ButtonComponent from "../components/web/ButtonComponent";

const AboutUsPage = () => {
  const warText = <span className="text-red-600 font-bold">War</span>;
  const cartoonText = (
    <span className="text-orange-300 font-bold">Cartoon</span>
  );

  return (
    <div className="flex flex-col lg:mt-10 bg-neutral-50">
      <div className="flex flex-col-reverse lg:flex-row justify-center lg:mx-24">
        <div className="lg:w-4/6 p-5 lg:p-5">
          <h1 className="font-bold text-center lg:text-left text-4xl mt-3">
            ¿Quiénes somos?
          </h1>
          <br />
          <p className="text-left text-2xl">
            Bienvenidos a {cartoonText} {warText}, la Sociedad Secreta de
            Supervillanos donde la comida rápida alcanza nuevas dimensiones.
            Desde el año 2017, hemos conspirado para ofrecerte una experiencia
            culinaria única, fusionando la calidad de nuestros productos, la
            innovación gastronómica y el deleite de sus paladares.
          </p>
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
        <p className="text-2xl">
          En {cartoonText} {warText}, cada producto es una obra maestra creada
          con ingredientes cuidadosamente seleccionados para asegurar un sabor
          inigualable. Nuestra dedicación a la calidad es tan inquebrantable
          como la lealtad de un villano a su causa. Únete a nosotros y descubre
          por qué somos la elección de los verdaderos supervillanos del sabor.{" "}
        </p>
      </div>
      <br />
      <div className="flex flex-col justify-center items-center lg:px-24">
        <h2 className="text-2xl font-bold text-center pb-3 lg:pb-5">
          ¡Te esperamos para que formes parte de nuestra conspiración culinaria!{" "}
        </h2>
        <div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d127448.5532150539!2d-76.583987667006!3d3.4068373849820843!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x8e30a7b35d9df85d%3A0xed4c4dc72e938c62!2sCl.%2051%20%23%2040c-03%2C%20Cali%2C%20Valle%20del%20Cauca!3m2!1d3.4068429!2d-76.5015876!5e0!3m2!1ses!2sco!4v1727905262019!5m2!1ses!2sco"
            className="w-[300px] h-[200px] lg:w-[350px] lg:h-[300px]"
          ></iframe>
        </div>
      </div>
      <br />
      <div className="flex flex-row justify-center lg:px-24">
        <ButtonComponent title={"Realizar pedido"} />
      </div>
      <br />
      <div>
        <Footer />
      </div>
    </div>
  );
};

//no entiendo la parte de

export default AboutUsPage;
