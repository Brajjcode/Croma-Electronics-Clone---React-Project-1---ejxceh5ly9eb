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
      // Helper function to truncate text to a specified number of words
function truncateText(text, numWords) {
  const words = text.split(' ');

  // If the number of words is greater than the specified limit, truncate and append "..."
  if (words.length > numWords) {
    return words.slice(0, numWords).join(' ') + '...';
  }

  // If the number of words is within the limit, return the original text
  return text;
}

  return (

    <>
<ThemeProvider theme={darkTheme}>
    {/* <Card sx={{ maxWidth: 300, margin: 2, '@media (max-width:500px)': { maxWidth: '100%' } }} > */}
    <Card sx={{ maxWidth: 300, margin: 2 }}>

      <CardMedia
       
        component="img"
        alt="green iguana"
        height="140"
        //sx={{maxheight:380, maxWidth:280, margin:0.2}}
        sx={{ width: '100%', objectFit: 'cover' }}
        image={props.url}

      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        {truncateText(props.name, 6)}
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
