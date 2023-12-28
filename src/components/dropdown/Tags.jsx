import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const mapSortValueToLabel = {
  '': 'None',
  Trending: 'Trending',
  Bestseller: 'Best Seller',
  Newarrival: 'New Arrival',
};

export default function Tags({onTagselect}) {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
    onTagselect(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small-label" className=' text-white'>Tags</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={age}
        label="Age"
        onChange={handleChange}
        sx={{color:'white'}}
      >
        {Object.entries(mapSortValueToLabel).map(([value, label]) => (
            <MenuItem key={value} value={label}>
              {label}
            </MenuItem>
          ))}
        
      </Select>
    </FormControl>
  );
}
