import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CiImport } from 'react-icons/ci';
import {black} from '@mui/material/colors';
import "./imageurl.css";

export default function ImgMediaCard(props) {

    const darkTheme = createTheme({
        palette: {
          mode: 'dark',
        },
      });
  return (

    <>
<ThemeProvider theme={darkTheme}>
    <Card sx={{ maxWidth: 345, maxHeight:400}} >
      <CardMedia
       
        component="img"
        alt="green iguana"
        height="140"
        sx={{height:200, maxWidth:400, margin:0.2}}
        image={props.url}

      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.name}
        </Typography>
        <Typography variant="body2">
          {props.price}
        </Typography>
      </CardContent>
     
    </Card>
    </ThemeProvider>
    
    </>
  );
}
