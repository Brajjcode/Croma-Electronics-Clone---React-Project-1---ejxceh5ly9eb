// DynamicSelect.js
import React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(theme, name, personName) {
  return {
    fontWeight: personName.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
  };
}

const DynamicSelect = ({ apiEndpoint, projectId, onSelectCategory }) => {
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

        setOptions(categoryArray);
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

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300, mt: 3 }}>
        <Select
          multiple
          value={selectedOptions}
          onChange={handleChange}
          input={<OutlinedInput />}
          MenuProps={MenuProps}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          {options.map((option) => (
            <MenuItem
              key={option}
              value={option}
              style={getStyles(theme, option, selectedOptions)}
            >
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default DynamicSelect;
