import React from "react"
// import AuthContext from "../context/AuthContext"
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import RedditIcon from '@mui/icons-material/Reddit';
import useMediaQuery from '@mui/material/useMediaQuery';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from "react-router-dom";
export default function Home(props) {
    const navigate = useNavigate()
    const handleLogout = (event) => {
        window.localStorage.removeItem('token')
        props.setuser(null)
        navigate("/")
    }
    const matches = useMediaQuery('(min-width:480px)');
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed">
                <Toolbar>
                    {matches ? <RedditIcon style={{ fontSize: "2rem", marginRight: "1rem" }} /> : null}
                    <Typography align="left" variant="h4" component="div" sx={{ flexGrow: 1 }}>
                        <Button color="inherit" href="/">Airdrop Insurance</Button>
                    </Typography>
                    {props.user ?
                        <div>
                            <Button color="inherit" href="/profile"><AccountCircleIcon style={{ marginRight: "0.5rem" }} />Profile</Button>
                            <Button color="inherit" href="/Wallet"><AccountCircleIcon style={{ marginRight: "0.5rem" }} />Wallet</Button>
                            <Button color="inherit" href="/BuyInsurance"><AccountCircleIcon style={{ marginRight: "0.5rem" }} />Buy Insurance</Button>
                            <Button color="inherit" href="/ClaimInsurance"><ExitToAppIcon style={{ marginRight: "0.5rem" }} />Claim Insurance</Button>
                            <Button color="inherit" onClick={handleLogout}><ExitToAppIcon style={{ marginRight: "0.5rem" }} />Logout</Button>
                        </div>
                        :
                        <div>
                            Home Page
                        </div>
                    }
                </Toolbar>
            </AppBar>
        </Box>

    )
}