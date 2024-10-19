import { TextField, InputAdornment, Box } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useSearchField } from "./store";

const SearchField = () => {
    const { fieldValue, setFieldValue } = useSearchField();

    return (
        <Box
            sx={{
                w: '100%',
                display: 'flex',
                justifyContent: 'center'
            }}
        >
            <TextField
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon sx={{ color: '#ffffff60' }} />
                            </InputAdornment>
                        ),
                    },
                }}
                sx={{
                    flex: '1'
                }}
                onChange={(e) => { setFieldValue(e.target.value) }}
                value={fieldValue}
                placeholder="Nike Air Zoom"
                size="small"
                variant="outlined"
            />
        </Box>
    );
}

export default SearchField;