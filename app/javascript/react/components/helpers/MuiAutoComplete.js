import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import helperFetch from './helperFetch';

export default function MuiAutocomplete({ label, callback }) {
    const [options, setOptions] = React.useState([])
    const [delay, setDelay] = React.useState(null)

    const handleInputChange = (e, value) => {
        if (delay) {
            clearTimeout(delay)
        }
        setDelay(setTimeout(() => {
            helperFetch(`/api/companies?symbol=${value}`).then(response => {
                setOptions(response.companies)
            })
        }, 500))
    }

    return (
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={options}
            getOptionLabel={(option) => `${option.name} (${option.symbol})`}
            sx={{ width: 300 }}
            onChange={callback}
            onInputChange={handleInputChange}
            renderInput={(params) => <TextField {...params} label={label} />}
        />
    );
}