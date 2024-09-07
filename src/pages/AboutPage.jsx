import foodImg from "../assets/aboutUsPage/imgAboutUs1.webp";
import teamImg from "../assets/aboutUsPage/imgAboutUs2.webp";

const AboutUsPage = () => {
  const cartoonText = (
    <span className=" text-orange-300 font-bold">Cartoon</span>
  );
  const warText = <span className="text-red-600  font-bold">War</span>;
  return (
    <div className="flex flex-col mt-10">
      <div className="flex flex-row justify-center px-10">
        <div className="w-4/6 p-5">
          <h1 className="font-bold text-center">¿Quiénes somos?</h1>
          <br />
          <p className="text-left text-sm">
            Bienvenidos a {cartoonText} {warText}, la Sociedad Secreta de
            Supervillanos donde la comida rápida alcanza nuevas dimensiones.
            Desde el año 2017, hemos conspirado para ofrecerte una experiencia
            culinaria única, fusionando la calidad de nuestros productos, la
            innovación gastronómica y el deleite de sus paladares.
          </p>
        </div>
        <div className="w-4/6 p-5">
          <img src={foodImg} alt="Imagen 1" />
        </div>
      </div>
      <br />
      <div className="flex flex-row justify-center">
        <img src={teamImg} alt="Imagen 2" />
      </div>
      <br />
      <div className="flex flex-row justify-center px-10">
        <p className="text-lg leading-normal">
          En {cartoonText} {warText}, cada producto es una obra maestra creada
          con ingredientes cuidadosamente seleccionados para asegurar un sabor
          inigualable. Nuestra dedicación a la calidad es tan inquebrantable
          como la lealtad de un villano a su causa. Únete a nosotros y descubre
          por qué somos la elección de los verdaderos supervillanos del sabor.{" "}
        </p>
      </div>
      <br />
      <div className="flex flex-row justify-center px-10">
        <h1 className="text-4xl font-bold text-center">
          ¡Te esperamos para que formes parte de nuestra conspiración culinaria!{" "}
        </h1>
      </div>
      <br />
      <div className="flex flex-row justify-center px-10">
        <button className="bg-orange-400 text-black px-4 py-2 rounded-md hover:bg-orange-500 text-3xl">
          Realizar pedido
        </button>
      </div>
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default AboutUsPage;
