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
import { Nav, NavDropdown } from 'react-bootstrap';
import { RxDropdownMenu } from "react-icons/rx";
import { useCallback } from 'react';




const DynamicSelect = ({ apiEndpoint, projectId,onSelectCategory }) => {
  const theme = useTheme();
  const [options, setOptions] = React.useState([]);
  const [selectedOptions, setSelectedOptions] = React.useState('');

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
    

        setOptions((prevOptions)=>{
          console.log("options", prevOptions)
         return categoryArray;
      
        });
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [apiEndpoint, projectId]);

  // const handleChange = (eventKey) => {
  // //   const { target: { value } } = event;
  // //   setSelectedOptions(value);
    
  // // onSelectCategory(value); // Pass the selected category to the parent component
  // setSelectedOptions(eventKey);
  // onSelectCategory(eventKey);
  // };
  const handleChange = useCallback((eventKey) => {
    setSelectedOptions(eventKey);
    // Assuming onSelectCategory is passed as a prop or defined in the same component
    onSelectCategory(eventKey);
  }, []);
  

  return (
    <>
     <div>
      {/* <FormControl sx={{ m: 1, width: 200 }} size="small">
        <InputLabel className='text-white text-3xl'>
          <FaAlignJustify />
        </InputLabel>

        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={selectedOptions}
          label="Category"
          onChange={handleChange}
          input={<OutlinedInput />}
          variant="outlined"
        >
          {options.map((option) => (
            <ThemeProvider theme={innerTheme} key={option}>
              <MenuItem
                value={option}
                style={getStyles(theme, option, selectedOptions)}
                component={Link}
                to={`/dropdown/${option}`}
              >
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </MenuItem>
            </ThemeProvider>
          ))}
        </Select>
      </FormControl> */}

<div style={{ marginTop: '20px' }}> {/* Adjust this value as needed */}
      <NavDropdown
        id="nav-dropdown-dark-example"
        title={<span><FaAlignJustify /> </span>}
        menuVariant="dark"
        onSelect={()=>handleChange}
      >
        {options.map((option) => (
          <NavDropdown.Item
            key={option}
            eventKey={option}
            as={Link}
            to={`/dropdown/${option}`}
          >
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </NavDropdown.Item>
        ))}
      </NavDropdown>
    </div>
    </div>
    </>
  );
};

export default DynamicSelect;
