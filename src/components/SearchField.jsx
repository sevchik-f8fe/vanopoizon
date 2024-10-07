import { TextField, InputAdornment, Box } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

const SearchField = () => {
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
                placeholder="Поиск в Poizon"
                size="small"
                variant="outlined"
            />
        </Box>
    );
}

export default SearchField;