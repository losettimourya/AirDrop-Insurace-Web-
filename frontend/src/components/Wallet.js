// import React from "react"
// import "./App.css"
// import { useState, useEffect } from 'react';
// import { ethers } from 'ethers';
// import UserService from "../services/Users"
// export default function Wallet(props) {

//     const [Amount, setAmount] = React.useState(0)
//     const [Balance, setBalance] = React.useState(0)
//     const [Address, setAddress] = React.useState("")
//     const [errorMessage, setErrorMessage] = React.useState(null)
//     const [touched, settouched] = React.useState({
//         Amount: false,
//         Address: false
//     })
//     const [web3Provider, setWeb3Provider] = useState(null);
//     const [walletAddress, setWalletAddress] = useState('');
//     function changeAmount(event) {
//         setemaillogin(event.target.value)
//     }
//     function changeAddress(event) {
//         setpasswordlogin(event.target.value)
//     }
//     useEffect(() => {
//         var userdata
//         const fetchData = async () => {
//             const data = UserService.getID()
//             userdata = data
//             setWalletAddress(userdata.metamaskWAddress)


//         }
//         fetchData();
//         async function getBalance() {
//             const provider = new ethers.providers.JsonRpcProvider('ethereum-client-url');
//             const contract = new ethers.Contract(contractName, contractAbi, provider);
//             const balance = await contract.getBalance(userdata.metamaskWAddress);
//             setBalance(balance);
//         }
//         if (web3Provider && walletAddress) {
//             getBalance();
//         }
//     }, [web3Provider, walletAddress]);
//     async function query(functionName, args) {
//         const contract = new ethers.Contract(contractAddress, abi, provider);
//         const result = await contract[functionName](...args);
//         return result;
//     }
//     async function transaction(functionName, args) {
//         const contract = new ethers.Contract(contractAddress, abi, signer);
//         const result = await contract[functionName](...args);
//         await result.wait();
//         return result.hash;
//     }
//     async function getBalance(address) {
//         const contract = new ethers.Contract(contractAddress, abi, provider);
//         const balance = await contract.balanceOf(address);
//         return balance.toString();
//     }
//     async function deposit(functionName, args) {
//         const privateKey = new ethers.utils.HexString(loggedInUser.metamaskPK);
//         const wallet = new ethers.Wallet(privateKey, web3Provider);
//         const contract = new ethers.Contract(contractName, contractAbi, wallet);
//         const func = contract.functions[functionName];
//         const result = await func(...args);
//         return result.hash;
//     }
//     async function connectMetamask() {
//         if (window.ethereum) {
//             try {
//                 await window.ethereum.enable();
//                 const provider = new ethers.providers.Web3Provider(window.ethereum);
//                 setWeb3Provider(provider);
//             } catch (error) {
//                 console.error(error);
//             }
//         } else {
//             console.error('Metamask not installed');
//         }
//     }
//     async function handleSend() {
//         const args = [walletAddress, amount];
//         const result = await deposit('send', args);
//         console.log(result);
//     }
//     const handleClick = async (event) => {
//         console.log(Amount, Address)
//         if (canBeSubmitted()) {
//             event.preventDefault()
//             try {
//                 // TODO: Write API request here

//                 setAmount("")
//                 setAddress("")
//                 // TODO: Make sure everything is reight here
//             } catch (error) {
//                 console.log(Amount, Address, error)
//                 setAddress("")
//                 setAmount("")
//                 setErrorMessage(
//                     `Invalid Credentials`
//                 )
//                 setTimeout(() => {
//                     setErrorMessage(null)
//                 }, 3000)
//             }
//         }
//         else {
//             console.log(Address, Amount)
//             setAddress("")
//             setAmount("")
//             setErrorMessage(
//                 `Invalid Credentials`
//             )
//             setTimeout(() => {
//                 setErrorMessage(null)
//             }, 3000)
//         }
//     }
//     function canBeSubmitted() {
//         const errors = validate(touched.Amount, touched.Address);
//         const isDisabled = Object.keys(errors).some(x => errors[x]);
//         return !isDisabled;
//     }
//     const errors = validate(Amount, Address);
//     const isDisabled = Object.keys(errors).some(x => errors[x]);
//     const shouldMarkError = field => {
//         const hasError = errors[field];
//         const shouldShow = touched[field];
//         return hasError ? shouldShow : false;
//     };
//     return (
//         <div>
//             <ThemeProvider theme={theme}>
//                 <Container component="main" maxWidth="xs">
//                     <CssBaseline />
//                     <Box
//                         sx={{
//                             marginTop: 8,
//                             display: 'flex',
//                             flexDirection: 'column',
//                             alignItems: 'center',
//                         }}
//                     >
//                         <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
//                             <LockOutlinedIcon />
//                         </Avatar>
//                         <Typography component="h1" variant="h5">
//                             Transaction
//                         </Typography>
//                         <Notification message={errorMessage} />
//                         <Box component="form" onSubmit={handlelogin} noValidate sx={{ mt: 1 }}>
//                             {
//                                 shouldMarkError("email") ?
//                                     <TextField
//                                         error
//                                         margin="normal"
//                                         fullWidth
//                                         id="filled-error-helper-text"
//                                         label="Email Address"
//                                         name="email"
//                                         autoComplete="email"
//                                         helperText="Invalid entry"
//                                         variant="filled"
//                                         autoFocus
//                                         value={Amount}
//                                         onChange={changeAmount}
//                                         onBlur={event => settouched({ ...touched, Amount: true })}
//                                     /> :
//                                     <TextField
//                                         margin="normal"
//                                         required
//                                         fullWidth
//                                         id="email"
//                                         label="Email Address"
//                                         name="email"
//                                         autoComplete="email"
//                                         autoFocus
//                                         value={Amount}
//                                         onChange={changeAmount}
//                                         onBlur={event => settouched({ ...touched, email: true })}
//                                     />
//                             }
//                             {
//                                 shouldMarkError("password") ?
//                                     <TextField
//                                         error
//                                         margin="normal"
//                                         required
//                                         fullWidth
//                                         helperText="Invalid entry"
//                                         variant="filled"
//                                         name="password"
//                                         label="Password"
//                                         type="password"
//                                         id="filled-error-helper-text"
//                                         autoComplete="current-password"
//                                         value={Address}
//                                         onChange={changeAddress}
//                                         onBlur={event => settouched({ ...touched, password: true })}
//                                     /> :
//                                     <TextField
//                                         margin="normal"
//                                         required
//                                         fullWidth
//                                         name="password"
//                                         label="Password"
//                                         type="password"
//                                         id="password"
//                                         autoComplete="current-password"
//                                         valueAmount
//                                         onChange={changeAddress}
//                                         onBlur={event => settouched({ ...touched, password: true })}
//                                     />
//                             }
//                             {
//                                 isDisabled ?
//                                     <Button fullWidth disabled sx={{ mt: 3, mb: 2 }}>Sign In</Button> :
//                                     <Button
//                                         type="submit"
//                                         fullWidth
//                                         variant="contained"
//                                         sx={{ mt: 3, mb: 2 }}
//                                         onSubmit={handlelogin}
//                                     >
//                                         Sign In
//                                     </Button>
//                             }
//                         </Box>
//                     </Box>
//                 </Container>
//             </ThemeProvider>
//         </div>
//     )
// }