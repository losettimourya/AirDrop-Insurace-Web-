import React from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css"
import Home from './components/Home';

export default function Wallet(props) {
    const [Amount, setAmount] = React.useState(0)
    const [Balance, setBalance] = React.useState(0)
    const [Address, setAddress] = React.useState("")
    const [errorMessage, setErrorMessage] = React.useState(null)
    const [touched, settouched] = React.useState({
        Amount: false,
        Address: false
    })
    function changeAmount(event) {
        setemaillogin(event.target.value)
    }
    function changeAddress(event) {
        setpasswordlogin(event.target.value)
    }
    const handleClick = async (event) => {
        console.log(Amount, Address)
        if (canBeSubmitted()) {
            event.preventDefault()
            try {
                // TODO: Write API request here
                setAmount("")
                setAddress("")
                // TODO: Make sure everything is reight here
            } catch (error) {
                console.log(Amount,Address, error)
                setAddress("")
                setAmount("")
                setErrorMessage(
                    `Invalid Credentials`
                )
                setTimeout(() => {
                    setErrorMessage(null)
                }, 3000)
            }
        }
        else {
            console.log(Address,Amount)
            setAddress("")
            setAmount("")
            setErrorMessage(
                `Invalid Credentials`
            )
            setTimeout(() => {
                setErrorMessage(null)
            }, 3000)
        }
    }
    function canBeSubmitted() {
        const errors = validate(touched.Amount, touched.Address);
        const isDisabled = Object.keys(errors).some(x => errors[x]);
        return !isDisabled;
    }
    const errors = validate(Amount,Address);
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    const shouldMarkError = field => {
        const hasError = errors[field];
        const shouldShow = touched[field];
        return hasError ? shouldShow : false;
    };
    return (
        <div>
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Transaction
                        </Typography>
                        <Notification message={errorMessage} />
                        <Box component="form" onSubmit={handlelogin} noValidate sx={{ mt: 1 }}>
                            {
                                shouldMarkError("email") ?
                                    <TextField
                                        error
                                        margin="normal"
                                        fullWidth
                                        id="filled-error-helper-text"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        helperText="Invalid entry"
                                        variant="filled"
                                        autoFocus
                                        value={emaillogin}
                                        onChange={changeemaillogin}
                                        onBlur={event => settouched({ ...touched, Amount: true })}
                                    /> :
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        autoFocus
                                        value={emaillogin}
                                        onChange={changeemaillogin}
                                        onBlur={event => settouched({ ...touched, email: true })}
                                    />
                            }
                            {
                                shouldMarkError("password") ?
                                    <TextField
                                        error
                                        margin="normal"
                                        required
                                        fullWidth
                                        helperText="Invalid entry"
                                        variant="filled"
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="filled-error-helper-text"
                                        autoComplete="current-password"
                                        value={passwordlogin}
                                        onChange={changepasswordlogin}
                                        onBlur={event => settouched({ ...touched, password: true })}
                                    /> :
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                        value={passwordlogin}
                                        onChange={changepasswordlogin}
                                        onBlur={event => settouched({ ...touched, password: true })}
                                    />
                            }
                            {
                                isDisabled ?
                                    <Button fullWidth disabled sx={{ mt: 3, mb: 2 }}>Sign In</Button> :
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                        onSubmit={handlelogin}
                                    >
                                        Sign In
                                    </Button>
                            }
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </div>
    )



}