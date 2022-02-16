import React, { useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    marginRight: 5,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'white',
    '& .MuiInputBase-input': {
        backgroundColor: 'gray',
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
            width: '20ch',
        },
        },
    },
}));
  
export default function Navbar({currentUser}) {

    const [anchorElUser, setAnchorElUser] = useState(null);

    const history = useHistory()

    const settings = currentUser ? ['Profile', 'Logout'] : ['Login', 'Sign up']
    const user = currentUser ? "Account" : "Login"

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const urlMappings = {
        "Profile": "/account",
        "Logout": "/",
        "Login": "/users/sign_in",
        "Sign up": "/users/sign_up"
    }

    const logout = async () => {
        const response = await fetch('/users/sign_out', {
            method:"DELETE",
            headers:{
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            credentials:"same-origin"
        })
        if (response.ok) {
            window.location.reload();
        }
    }

    const redirectFunc = (url) => {
        history.push(url)
    }

    const handleCloseUserMenu = (e) => {
        setAnchorElUser(null);
        if (e.currentTarget.id === "Logout") {
            logout()
        }
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" style={{backgroundColor: 'dimgray'}}>
                <Toolbar>

                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                >
                    <Button
                        onClick={() => redirectFunc('/')}
                        sx={{ color: 'white', display: 'block' }}
                    >
                        Home
                    </Button>
                </Typography>

                <Search>
                    <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                    />
                </Search>

                <Box sx={{ flexGrow: 0 }}>
                    <Button 
                        onClick={handleOpenUserMenu} 
                        sx={{ color: 'white', display: 'block' }}
                    >
                        {user}
                    </Button>
                    <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                    >
                    {settings.map((setting) => (
                        <MenuItem key={setting} onClick={handleCloseUserMenu} id={setting}>
                            <Link to={urlMappings[setting]}>
                                <Typography textAlign="center">{setting}</Typography>
                            </Link>
                        </MenuItem>
                    ))}
                    </Menu>
                </Box>
                </Toolbar>
            </AppBar>
        </Box>
    )
}