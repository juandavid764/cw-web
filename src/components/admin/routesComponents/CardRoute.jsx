import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import DropdownButton from "./DropdownButton"

export default function CardRoute() {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
                {/* Donde creo las clases */}
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Lizard
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Lizards are a widespread group of squamate reptiles, with over 6,000
                        species, ranging across all continents except Antarctica
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <DropdownButton avalibleOptions={1} color={true} />
            </CardActions>
        </Card>
    );
}
