import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import Footer from "../../components/web/Footer";
import { useEffect } from 'react';

const ConfirmPage = () => {


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className='flex flex-col min-h-screen bg-neutral-50'>
      <div className='flex-grow flex flex-col justify-center items-center lg:mt-10'>
        <Box
          sx={{
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: { xs: '8px', sm: '16px' },
            maxWidth: '600px',
            width: '100%',
            margin: '0 auto',
            textAlign: 'center',
            backgroundColor: 'white'
          }}
        >
          <div className='flex flex-col justify-center'>
            <h2 className="text-2xl lg:text-4xl font-bold">Información de mi pedido</h2>
            <div className='flex flex-row justify-center items-center gap-5'>
              <h2 className="text-lg lg:text-2xl font-bold">#123232</h2>
              <Chip label={"Pendiente"} variant="filled" size='medium' color='error' className="my-4" />
            </div>
            <div className='flex flex-col justify-center items-center gap-5'>
              <p className="text-lg lg:text-2xl">*1 Maiz
[Verde, ]
Adics:
-1 Yuca
-1 Pollo

- - - - - - - - - - - - -
Juan David
3006999492
Morichal
Cra324#2312-231
10/20</p>
            </div>
            
            <div>
              <Button
                startIcon={<WhatsAppIcon />}
                variant="contained"
                //sx={{ textTransform: 'none', backgroundColor: '#BF9000', '&:hover': { backgroundColor: '#A67C00' } }}
                color="warning"
                className="mt-4 bg-orange-300 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded-lg"
                fullWidth
              >
                Confirmar pedido
              </Button>
            </div>
          </div>
        </Box>
      </div>
      <footer className="">
        <Footer />
      </footer>
    </div>
  );
};

export default ConfirmPage;