import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import DropdownButton from "./DropdownButton"
import Box from '@mui/material/Box';


export default function CardRoute({ route}) {
    return (
               
        <Card sx={{ maxWidth: 400, width: 350,
        maxHeight:400 }}>
            <CardActionArea>
                {/* Donde creo las clases */}
                <CardContent>
                <Box display="flex" justifyContent="space-between">
                    <Typography gutterBottom variant="h5" component="div">
                        {route.Domiciliario}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                        {"#"+route.idRuta}
                    </Typography>
                </Box>
                    <Typography variant="body1" sx={{ color: 'black' }}>
                        {route.pedidos.join(", ")}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions className='justify-between'>
                <Typography variant="body1" sx={{ color: 'black' }}>
                    Total: ${route.pedidos.length+100000}
                </Typography>
                <DropdownButton avalibleOptions={1} color={true} />
            </CardActions>
        </Card>
    );
}
