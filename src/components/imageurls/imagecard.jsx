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
import loader from "../Assets/loader1.gif"
import headphones from "../Assets/271807_xhhqk6.webp"
import star from "../Assets/icons8-star-filled-24.png"

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
      const handleImageError=(event)=>{
        event.target.src= 'https://media.croma.com/image/upload/v1687507201/Croma%20Assets/Entertainment/Television/Images/274276_r3vime.png'
          console.log("src for card")
      }

  return (

    <>
<ThemeProvider theme={darkTheme}>
    {/* <Card sx={{ maxWidth: 300, margin: 2, '@media (max-width:500px)': { maxWidth: '100%' } }} > */}
    <Card sx={{ maxWidth: 280, margin: 2,height:'380px', display: 'flex', flexDirection: 'column', position:'relative' }}>

      <CardMedia
       
        component="img"
        alt="green iguana"
        height="140"
        //sx={{maxheight:380, maxWidth:280, margin:0.2}}
       sx={{ maxWidth: 220, objectFit: 'cover', margin:'auto', display:'block' }}
        image={props.url}
        onError={handleImageError}


      />
      <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flexGrow: 1, position:'relative' }}>
        <div className='mb-4' > 
        <Typography gutterBottom variant="h6" component="div" sx={{fontSize:'1rem'}}>
        {truncateText(props.name, 6)}   
        </Typography>
        </div>

        <div> 
        {typeof props.ratings === 'number' ? (
                <Typography variant="h6" component="div" sx={{ fontSize: '1rem', color: 'green', display: 'flex', alignItems: 'center',position:'relative'}} >
               <img src={star} style={{ marginLeft: '0.2rem', height:'0.8rem' }}/>  {props.ratings.toFixed(1)}
                </Typography>
              ) : (
                <Typography variant="h6" component="div" sx={{ fontSize: '1rem', color: 'green' }}>
                  N/A
                </Typography>
              )}

        </div>
        <div className=' mb-4'>
        <Typography variant="body2" className='font-medium text-2xl relative'>
         ₹{props.price.toFixed(2).replace(/\d(?=(\d{4})+\.)/g, '$&,')}
        </Typography>
        </div>

      </CardContent>
     
    </Card>
    </ThemeProvider>
    
    </>
  );
}
