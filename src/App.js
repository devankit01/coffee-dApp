
import './App.css';
import { useState, useEffect } from 'react';
import { ethers } from "ethers";
import abi from './contract/coffee.json'
import  BuyCoffee  from './components/BuyCoffee';
import GetTxns from './components/GetTxns';

function App() {

  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null
  })
  const [account, setAccount] = useState("None")
  useEffect(() => {

    const connectWallet = async () => {
      const contractAddress = "0x44Bb2B1594D74DED072070C6D2ad383e96b43E68";
      const contractABI = abi.abi;

      try {
        const { ethereum } = window;

        if (ethereum) {

          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          })

          window.ethereum.on("accountChanged", () => {
            window.location.reload();
          })

          const account = await ethereum.request({ method: "eth_requestAccounts" })
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(contractAddress, contractABI, signer);
  
          setState({ provider, signer, contract })
          setAccount(account)
        }
        else{
          alert("Please install metamask")
        }


      }
      catch (error) {
        console.log(error)
      }

    };

    // call connectWallet inside userEffect
    connectWallet();
  }, []);

  console.log(state);
  
  return (
    <div className="App">
      <h3>Buy Me Coffee dApp</h3>
      {account && <h4>Account Connected : {account}</h4>}
      <BuyCoffee state={state}/>
      <GetTxns state={state}/>
    </div>
  );
}

export default App;
