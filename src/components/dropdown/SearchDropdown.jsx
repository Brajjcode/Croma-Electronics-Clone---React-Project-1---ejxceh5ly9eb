import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { withTheme } from 'styled-components';

export default function SelectSmall({onSelectedoption}) {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
    onSelectedoption(event.target.value)
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small-label" className=' text-white'>Price</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={age}
        label="Age"
        onChange={handleChange}
        sx={{ color: 'white' }}

      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem   value={"lowest"} >Price(Lowest First)</MenuItem>
        <MenuItem   value={"highest"} >Price(Highest First)</MenuItem>
        <MenuItem  value={"TopRated"} >Top Rated</MenuItem>
      </Select>
    </FormControl>
  );
}
