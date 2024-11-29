import Button from "@mui/material/Button";

//Pasamos el titulo del boton y la funcion a ejecutar cuando se oprima
const ButtonComponent = ({ title, onClickButton, type="button"  }) => {
  const handleClick = () => {
    onClickButton();
  };

  return (
    <Button sx={{ textTransform: 'none' }} type={type} variant="contained" color="warning" onClick={handleClick} className="mt-4 bg-orange-300 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded-lg">
      {title}
    </Button>
  );
};

export default ButtonComponent;
