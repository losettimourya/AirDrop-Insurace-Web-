import React, { useState, useEffect } from "react";
import { Framework } from "@superfluid-finance/sdk-core";
import {
  Button,
  Card,
  CircularProgress,
  Container,
  FormControl,
  FormGroup,
  TextField,
  Typography,
} from "@mui/material";
import Box from '@mui/material/Box';
import { ethers } from "ethers";

let account;

//where the Superfluid logic takes place
async function deleteExistingFlow(recipient) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);

  const signer = provider.getSigner();

  const chainId = await window.ethereum.request({ method: "eth_chainId" });
  const sf = await Framework.create({
    chainId: Number(chainId),
    provider: provider
  });

  const superSigner = sf.createSigner({ signer: signer });

  console.log(signer);
  console.log(await superSigner.getAddress());
  const daix = await sf.loadSuperToken("fDAIx");

  console.log(daix);

  try {
    const deleteFlowOperation = daix.deleteFlow({
      sender: await signer.getAddress(),
      receiver: recipient
      // userData?: string
    });

    console.log(deleteFlowOperation);
    console.log("Deleting your stream...");

    const result = await deleteFlowOperation.exec(superSigner);
    console.log(result);

    console.log(
      `Congrats - you've just updated a money stream!
    `
    );
  } catch (error) {
    console.log(
      "Hmmm, your transaction threw an error. Make sure that this stream does not already exist, and that you've entered a valid Ethereum address!"
    );
    console.error(error);
  }
}

export default function DeleteFlow(props){
  const [recipient, setRecipient] = useState("");
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [currentAccount, setCurrentAccount] = useState("");

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }
      const accounts = await ethereum.request({
        method: "eth_requestAccounts"
      });
      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
      account = currentAccount;
      // Setup listener! This is for the case where a user comes to our site
      // and connected their wallet for the first time.
      // setupEventListener()
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfWalletIsConnected = async () => {
    console.log("runs");
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have metamask!");
      return;
    } else {
      console.log("We have the ethereum object", ethereum);
    }

    const accounts = await window.ethereum.request({ method: "eth_accounts" });
    const chain = await window.ethereum.request({ method: "eth_chainId" });
    let chainId = chain;
    console.log("chain ID:", chain);
    console.log("global Chain Id:", chainId);
    if (accounts.length !== 0) {
      account = accounts[0];
      console.log("Found an authorized account:", account);
      setCurrentAccount(account);
      // Setup listener! This is for the case where a user comes to our site
      // and ALREADY had their wallet connected + authorized.
      // setupEventListener()
    } else {
      console.log("No authorized account found");
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  function calculateFlowRate(amount) {
    if (typeof Number(amount) !== "number" || isNaN(Number(amount)) === true) {
      alert("You can only calculate a flowRate based on a number");
      return;
    } else if (typeof Number(amount) === "number") {
      if (Number(amount) === 0) {
        return 0;
      }
      const amountInWei = ethers.BigNumber.from(amount);
      const monthlyAmount = ethers.utils.formatEther(amountInWei.toString());
      const calculatedFlowRate = monthlyAmount * 3600 * 24 * 30;
      return calculatedFlowRate;
    }
  }

  function DeleteButton({ isLoading, children, ...props }) {
    return (
      <Button variant="success" className="button" {...props}>
        {isButtonLoading ? <CircularProgress animation="border" /> : children}
      </Button>
    );
  }

  const handleRecipientChange = (e) => {
    setRecipient(() => ([e.target.name] = e.target.value));
  };

  return (
    <Container component="main" maxWidth="xs">
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
      <Box component="form" sx={{ mt: 5 }}>
      <Card sx={{ p: 3, mb: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Delete a Flow
        </Typography>

        {currentAccount === "" ? (
          <Button variant="contained" onClick={connectWallet} fullWidth>
            Connect Wallet
          </Button>
        ) : (
          <Typography variant="subtitle1" align="center" gutterBottom>
            Connected Wallet: {`${currentAccount.substring(0, 4)}...${currentAccount.substring(38)}`}
          </Typography>
        )}

        <FormControl fullWidth sx={{ mt: 3 }}>
          <TextField
            name="recipient"
            value={recipient}
            onChange={handleRecipientChange}
            label="Recipient Address"
            variant="outlined"
          />
        </FormControl>

        <Button
          variant="contained"
          onClick={() => {
            setIsButtonLoading(true);
            deleteExistingFlow(recipient);
            setTimeout(() => {
              setIsButtonLoading(false);
            }, 1000);
          }}
          disabled={isButtonLoading}
          fullWidth
          sx={{ mt: 3 }}
        >
          {isButtonLoading ? (
            <CircularProgress size={24} />
          ) : (
            "Delete Flow"
          )}
        </Button>

        {/* <Typography variant="subtitle2" align="center" sx={{ mt: 3 }}>
          Go to the DeleteFlow.js component and look at the <b>deleteFlow()</b> function to see under the hood
        </Typography> */}
      </Card>
      </Box>
      </Box>
    </Container>
  );
};
