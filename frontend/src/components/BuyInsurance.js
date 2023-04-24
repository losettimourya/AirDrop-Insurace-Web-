// import React, { useState,useEffect } from "react";
// import { Framework } from "@superfluid-finance/sdk-core";
// import {
//   Button,
//   TextField,
//   CircularProgress,
//   Card,
// } from "@mui/material";
// import { ethers } from "ethers";
// import UserService from "../services/Users";
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
// let account;
// //where the Superfluid logic takes place
// async function createNewFlow(recipient, flowRate) {
//     const provider = new ethers.providers.Web3Provider(window.ethereum);
//     await provider.send("eth_requestAccounts", []);
//     const signer = provider.getSigner();
//     const chainId = await window.ethereum.request({ method: "eth_chainId" });
//     const sf = await Framework.create({
//         chainId: Number(chainId),
//         provider: provider
//     });
//     const superSigner = sf.createSigner({ signer: signer });
//     console.log(signer);
//     console.log(await superSigner.getAddress());
//     const daix = await sf.loadSuperToken("fDAIx");
//     console.log(daix);
//     try {
//         const createFlowOperation = daix.createFlow({
//             sender: await superSigner.getAddress(),
//             receiver: "0xEF52F6b2c89561A8D36CdE667C174F9c7674cAF1",
//             flowRate: "22"
//             // userData?: string
//         });
//         console.log(createFlowOperation);
//         console.log("Creating your stream...");
//         const result = await createFlowOperation.exec(superSigner);
//         console.log(result);
//         console.log(
//             `Congrats - you've just created a money stream!`
//         );
//     } catch (error) {
//         console.log(
//             "Hmmm, your transaction threw an error. Make sure that this stream does not already exist, and that you've entered a valid Ethereum address!"
//         );
//         console.error(error);
//     }
// }

// export default function CreateFlow(props){
//     const [recipient, setRecipient] = useState("");
//     const [isButtonLoading, setIsButtonLoading] = useState(false);
//     const [flowRate, setFlowRate] = useState("");
//     const [flowRateDisplay, setFlowRateDisplay] = useState("");
//     const [currentAccount, setCurrentAccount] = useState("");
//     const connectWallet = async () => {
//         try {
//             const { ethereum } = window;
//             if (!ethereum) {
//                 alert("Get MetaMask!");
//                 return;
//             }
//             const accounts = await ethereum.request({
//                 method: "eth_requestAccounts"
//             });
//             console.log("Connected", accounts[0]);
//             setCurrentAccount(accounts[0]);
//             const privateKey = await ethereum.request({
//                 method: "eth_getPrivateKey",
//                 params: [accounts[0]],
//             });
//             console.log("private key", privateKey);
//             const data = await UserService.connect(props.user.id, { metamaskPK: privateKey, metamaskWAddress: accounts[0] })
//             console.log("User connected", data)
//             account = currentAccount;
//             // Setup listener! This is for the case where a user comes to our site and connected their wallet for the first time.setupEventListener()
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     const checkIfWalletIsConnected = async () => {
//         console.log("runs");
//         const { ethereum } = window;
//         if (!ethereum) {
//             console.log("Make sure you have metamask!");
//             return;
//         } else {
//             console.log("We have the ethereum object", ethereum);
//         }
//         const accounts = await window.ethereum.request({ method: "eth_accounts" });
//         const chain = await window.ethereum.request({ method: "eth_chainId" });
//         let chainId = chain;
//         console.log("chain ID:", chain);
//         console.log("global Chain Id:", chainId);
//         if (accounts.length !== 0) {
//             account = accounts[0];
//             console.log("Found an authorized account:", account);
//             setCurrentAccount(account);
//             // Setup listener! This is for the case where a user comes to our site and ALREADY had their wallet connected + authorized. setupEventListener()
//         } else {
//             console.log("No authorized account found");
//         }
//     };

//     useEffect(() => {
//         checkIfWalletIsConnected();
//     }, []);

//     function calculateFlowRate(amount) {
//         if (typeof Number(amount) !== "number" || isNaN(Number(amount)) === true) {
//             alert("You can only calculate a flowRate based on a number");
//             return;
//         } else if (typeof Number(amount) === "number") {
//             if (Number(amount) === 0) {
//                 return 0;
//             }
//             const amountInWei = ethers.BigNumber.from(amount);
//             const monthlyAmount = ethers.utils.formatEther(amountInWei.toString());
//             const calculatedFlowRate = monthlyAmount * 3600 * 24 * 30;
//             return calculatedFlowRate;
//         }
//     }
//     function CreateButton({ isLoading, children, ...props }) {
//         return (
//             <Button variant="success" className="button" {...props}>
//                 {isButtonLoading ? <CircularProgress animation="border" /> : children}
//             </Button>
//         );
//     }
//     const handleRecipientChange = (e) => {
//         setRecipient(() => ([e.target.name] = e.target.value));
//     };
//     const handleFlowRateChange = (e) => {
//         setFlowRate(() => ([e.target.name] = e.target.value));
//         let newFlowRateDisplay = calculateFlowRate(e.target.value);
//         setFlowRateDisplay(newFlowRateDisplay.toString());
//     };
//     return (
//         <div>
//             <Container component="main" maxWidth="xs">
//                     <Box
//                         sx={{
//                             marginTop: 8,
//                             display: 'flex',
//                             flexDirection: 'column',
//                             alignItems: 'center',
//                             maxWidth: 500,
//                         }}
//                     >
//           <Box component="form" sx={{ mt: 3 }}>
//             <Typography variant="h4">Create a Flow</Typography>
//             {currentAccount === "" ? (
//               <Button variant="contained" onClick={connectWallet} sx={{ my: 2 }}>
//                 Connect Wallet
//               </Button>
//             ) : (
//               <Card sx={{ p: 2, my: 2 }}>
//                 <Typography variant="body1">
//                   {`${currentAccount.substring(0, 4)}...${currentAccount.substring(38)}`}
//                 </Typography>
//               </Card>
//             )}
//             <TextField
//               label="Recipient Address"
//               value={recipient}
//               onChange={handleRecipientChange}
//               fullWidth
//               sx={{ my: 2 }}
//             />
//             <TextField
//               label="Flow Rate (wei/second)"
//               value={flowRate}
//               onChange={handleFlowRateChange}
//               fullWidth
//               sx={{ my: 2 }}
//             />
//             <Button
//               variant="contained"
//               onClick={() => {
//                 setIsButtonLoading(true);
//                 createNewFlow(recipient, flowRate);
//                 setTimeout(() => {
//                   setIsButtonLoading(false);
//                 }, 1000);
//               }}
//               disabled={!recipient || !flowRate || isButtonLoading}
//               sx={{ my: 2 }}
//             >
//               {isButtonLoading ? (
//                 <CircularProgress size={24} color="inherit" />
//               ) : (
//                 "Click to Create Your Stream"
//               )}
//             </Button>
//             <Box sx={{ my: 2 }}>
//               {/* <Typography variant="body1">
//                 Go to the CreateFlow.js component and look at the <b>createNewFlow()</b> function to see under the hood
//               </Typography> */}
//               <Box sx={{ mt: 2 }}>
//                 <Typography variant="body1">Your flow will be equal to:</Typography>
//                 <Typography variant="h6">
//                   <b>{flowRateDisplay !== "" ? flowRateDisplay : 0}</b> DAIx/month
//                 </Typography>
//               </Box>
//             </Box>
//           </Box>
//           </Box>
//           </Container>
//         </div>
//       );
//     };

import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ClearIcon from '@mui/icons-material/Clear';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import { red, green } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import RedditIcon from '@mui/icons-material/Reddit';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import InsuranceService from '../services/InsuranceService';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from "react-router-dom";
const theme = createTheme();
export default function MySubGreddits(props) {
    const navigate = useNavigate()
    const [subreddits, setSubreddits] = useState([]);
    const [allsubreddits, setallSubreddits] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [flowrate, setflowrate] = useState(0);
    const [newSubreddit, setNewSubreddit] = useState({
        Name: '',
        Description: '',
        Banned: [],
        Followers: [],
        Tags: [],
        Posts: [],
        Moderator: null
        // Image: null,
    });
    const ToggleForm = () => {
        setNewSubreddit({
            Name: "",
            Description: "",
            Banned: [],
            Followers: [JSON.parse(window.localStorage.getItem('token')).id],
            Posts: [],
            Tags: [],
            Moderator: JSON.parse(window.localStorage.getItem('token')).id
            // Image: null,
        });
        setShowForm(!showForm);
    };
    const [file, setFile] = useState(null);
    const [showbuttons, setshowbuttons] = React.useState({
        showbannedwordbutton: true,
        showcreatetagbutton: true,
        showcreatesubgredditbutton: true,
        showsavebutton: true
    })
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };
    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await InsuranceService.getID()
                const options = await InsuranceService.getAll()
                console.log("recieved", data)
                setallSubreddits(options)
                setSubreddits(data.map(element => {
                    return {
                        ...element,
                        Name: element.Name,
                        Description: element.Description,
                        Expirationdate: element.Expirationdate,
                        Creationdate: element.Creationdate,
                        provider: element.provider,
                        Payout: element.Payout,
                        Users: element.Users,
                        Automated: element.Automated
                    }
                }))
                // console.log("Subreddits on Loading are",subreddits)
            }
            catch (error) {
                console.log(error)
            }
        }
        fetchData();
    }, [])
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData()
        const DATE = new Date()
        setshowbuttons({...showbuttons,showcreatetagbutton:false,showbannedwordbutton:false,showcreatesubgredditbutton:false,showsavebutton:false})
        formData.append("Name", newSubreddit.Name)
        formData.append("Description", newSubreddit.Description)
        formData.append("Banned", JSON.stringify(newSubreddit.Banned))
        formData.append("Followers", [JSON.parse(window.localStorage.getItem('token')).id])
        formData.append("Posts", [])
        newSubreddit.Tags.forEach((word, index) => {
            formData.append(`Tags[${index}]`, word);
          });
        formData.append("Tags", JSON.stringify(newSubreddit.Tags))
        formData.append("Moderator", JSON.parse(window.localStorage.getItem('token')).id)
        formData.append("date", DATE)
        formData.append("image", file)
        const PostSubGreddiit = async () => {
            try {
                console.log("props user for Posting MySubreddiit = ", props.user)
                console.log(file)
                const data = await InsuranceService.create(
                    formData
                )
                setSubreddits([...subreddits, { ...data, Posts: data.Post }]);
                console.log(subreddits)
                console.log("recieved for Posting MySubGrediiit", data)
            }
            catch (error) {
                console.log("In MySubReddit.js", error)
            }
            setshowbuttons({...showbuttons,showcreatetagbutton:true,showbannedwordbutton:true,showcreatesubgredditbutton:true,showsavebutton:true})
        }
        PostSubGreddiit();
        setShowForm(false);
        setNewSubreddit({
            ...newSubreddit,
            Name: "",
            Description: "",
            Banned: [],
            Followers: [JSON.parse(window.localStorage.getItem('token')).id],
            Posts: [],
            Tags: []
            // Image: null,
        });
    };
    function handleDelete(event, id) {
        console.log(id)
        const DeleteSubGreddiit = async () => {
            try {
                console.log("props user for Deleting MySubreddiit = ", props.user)
                console.log(JSON.parse(window.localStorage.getItem('token')).id)
                const data = await InsuranceService.Delete(id)
                setSubreddits(subreddits.filter(element => element._id !== id));
                console.log(subreddits)
                console.log("recieved for Deleting MySubGrediiit", data)
            }
            catch (error) {
                console.log("In MySubReddit.js", error)
            }
        }
        DeleteSubGreddiit();
    }
    // ! Banned Keywords
    const [bannedword, setbannedword] = React.useState("")
    function addword() {
        if (bannedword.length > 0) {
            setNewSubreddit({ ...newSubreddit, Banned: newSubreddit.Banned.concat(bannedword) })
            setbannedword("")
        }
    }
    function RemoveKeyword(id) {
        setNewSubreddit({ ...newSubreddit, Banned: newSubreddit.Banned.filter((element, index) => index !== id) })
    }
    // ! Tags
    const [Tag, setTag] = React.useState("")
    function addTag() {
        if (Tag.length > 0) {
            setNewSubreddit({ ...newSubreddit, Tags: newSubreddit.Tags.concat(Tag) })
            setTag("")
        }
    }
    function RemoveTag(id) {
        setNewSubreddit({ ...newSubreddit, Tags: newSubreddit.Banned.filter((element, index) => index !== id) })
    }
    return (
        <div>
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Box sx={{ mt: 3 }}>
                            {
                                showForm ? <Button
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    onClick={ToggleForm}
                                >
                                    Close Form
                                </Button> :
                                    showbuttons.showcreatesubgredditbutton ?
                                        <Button
                                            fullWidth
                                            variant="contained"
                                            sx={{ mt: 3, mb: 2 }}
                                            onClick={ToggleForm}
                                        >
                                            Create New SubGreddit
                                        </Button> :
                                        <Button
                                            fullWidth
                                            variant="contained"
                                            sx={{ mt: 3, mb: 2 }}
                                            disabled
                                        >
                                            Create New SubGreddit
                                        </Button>
                            }
                            {
                                showForm &&
                                <Box component="form" sx={{ mt: 3 }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                autoComplete="given-name"
                                                name="Name"
                                                required
                                                fullWidth
                                                id="Name"
                                                label="Name"
                                                autoFocus
                                                value={newSubreddit.Name}
                                                onChange={event => setNewSubreddit({ ...newSubreddit, Name: event.target.value })}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                autoComplete="given-name"
                                                name="Description"
                                                required
                                                fullWidth
                                                id="Description"
                                                label="Description"
                                                autoFocus
                                                value={newSubreddit.Description}
                                                onChange={event => setNewSubreddit({ ...newSubreddit, Description: event.target.value })}
                                            />
                                        </Grid>
                                        {/* // ! Banned Keywords */}
                                        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                            <nav aria-label="main mailbox folders">
                                                <List>
                                                    {
                                                        newSubreddit.Banned.map((element, index) => {
                                                            return (
                                                                <ListItem disablePadding>
                                                                    <ListItemButton onClick={() => RemoveKeyword(index)}>
                                                                        <ListItemIcon>
                                                                            <ClearIcon />
                                                                        </ListItemIcon>
                                                                        <ListItemText primary={element} />
                                                                    </ListItemButton>
                                                                </ListItem>
                                                            )
                                                        })
                                                    }
                                                </List>
                                            </nav>
                                        </Box>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                autoComplete="given-name"
                                                name="Keyword"
                                                required
                                                fullWidth
                                                id="Keyword"
                                                label="Keyword"
                                                autoFocus
                                                value={flowrate}
                                                onChange={event => setflowrate(event.target.value)}
                                            />
                                        </Grid>
                                        {/* // ! Tags */}
        
                                    </Grid>
                                    {
                                        showbuttons.showsavebutton ?
                                            <Button
                                                type="submit"
                                                fullWidth
                                                variant="contained"
                                                sx={{ mt: 3, mb: 2 }}
                                                onClick={handleSubmit}
                                            >
                                                SAVE
                                            </Button>
                                            :
                                            <Button
                                                type="submit"
                                                fullWidth
                                                variant="contained"
                                                sx={{ mt: 3, mb: 2 }}
                                                disabled
                                            >
                                                SAVE
                                            </Button>
                                    }
                                </Box>
                            }
                        </Box>
                    </Box>
                </Container>
                <Container component="main" sx={{ mt: 5 }}>
                    <Grid container spacing={4}>
                        {subreddits.map(subreddit => {
                            return <Grid sx={{ mt: 5 }} xs={12} sm={6}>
                                <Card sx={{ maxWidth: 500, bgcolor: green[500] }}>
                                    <CardHeader
                                        avatar={
                                            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                                <RedditIcon style={{ fontSize: "2rem" }} />
                                            </Avatar>
                                        }
                                        title={subreddit.Name}
                                        subheader={`Banned Keywords ${subreddit.Banned.join(',')}`}
                                    />
                                    <CardMedia
                                    // TODO: Attach image Here
                                    />
                                    <CardContent>
                                        <Typography variant="body2" color="text.secondary">
                                            {subreddit.Posts.length} Posts
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {subreddit.Followers.length} Followers
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {subreddit.Description}
                                        </Typography>
                                    </CardContent>
                                    <CardActions disableSpacing>
                                        <IconButton aria-label="add to favorites">
                                            <OpenInNewIcon onClick={event => navigate(`/OpenSubGreddits/${subreddit._id}`)} />
                                        </IconButton>
                                        <IconButton onClick={(event) => handleDelete(event, subreddit._id)} aria-label="share">
                                            <DeleteIcon />
                                        </IconButton>
                                    </CardActions>
                                </Card>
                            </Grid>
                        })}
                    </Grid>
                </Container>
            </ThemeProvider>
        </div >
    )
}
