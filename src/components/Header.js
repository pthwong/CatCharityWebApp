import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

function Header() {

return(
    <AppBar position="relative">
    <Toolbar>
    <Typography variant="h6" color="inherit" noWrap>
        Album layout
    </Typography>
    </Toolbar>
    </AppBar>
);

}

export default Header;