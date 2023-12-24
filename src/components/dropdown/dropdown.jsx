// DynamicSelect.js
import React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Link } from 'react-router-dom';
import {FaAlignJustify,FaUser } from "react-icons/fa6";
import { createTheme } from '@mui/material/styles';
import { green, orange } from '@mui/material/colors';
import { ThemeProvider } from 'styled-components';
// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 50,
//     },
//   },
// };

function getStyles(theme, name, personName) {
  return {
    fontWeight: personName.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
  };
}

const DynamicSelect = ({ apiEndpoint, projectId,onSelectCategory }) => {
  const theme = useTheme();
  const [options, setOptions] = React.useState([]);
  const [selectedOptions, setSelectedOptions] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiEndpoint, {
          headers: {
            'projectId': projectId,
          },
        });
        const data = await response.json();
        console.log(data);

        // Check if the data is an array or an object with an array property
        const categoryArray = Array.isArray(data) ? data : data.data || [];
        //const uppercasedCategories = categoryArray.map(category => category.toUpperCase());

        setOptions((prevOptions)=>{
          console.log("options", prevOptions)
         return categoryArray;
         //return uppercasedCategories;
        });
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [apiEndpoint, projectId]);

  const handleChange = (event) => {
    const { target: { value } } = event;
    setSelectedOptions(value);
  onSelectCategory(value); // Pass the selected category to the parent component
  };
  const innerTheme = createTheme({
    palette: {
      primary: {
        main: green[500],
      },
    },
  });

  return (
    <div>
       <FormControl sx={{ m: 1, Width:5}} size="small">
      <InputLabel className=' text-white text-3xl' ><FaAlignJustify/></InputLabel>
      

      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={selectedOptions}
        label="Age"
        onChange={handleChange}
        input={<OutlinedInput />}
       variant='h6'
       // MenuProps={MenuProps}
       // inputProps={{ 'aria-label': 'Without label' }}
      >
          {options.map((option) => (
         <ThemeProvider theme={innerTheme}>
            <MenuItem
              key={option}
              value={option}
             style={getStyles(theme, option, selectedOptions)}
              component={Link}
              to={`/dropdown/${option}`}  
            >
              {option}
            </MenuItem>
            
          </ThemeProvider>
            
          ))}
        </Select>
        
      </FormControl>
      
    </div>
  );
};

export default DynamicSelect;
