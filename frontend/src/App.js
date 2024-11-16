import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Banner from "./components/Banner";
import { useState, useEffect } from 'react';
import abi from "./abi/music.json";
import { ethers,utils } from "ethers";
import Headphones from "./components/Headphones";
import Earpods from "./components/Earpods";
import Speakers from "./components/Speakers";
import Orders from './components/Orders';




function App() {
  const [state, setState] = useState({
    provider: null,
    signer:null,
    contract: null
    });
   
   const [accountDetails, setAccountDetails] = useState({
     accounts: null,
     chainId: null,
     balance: null,
     contAddress: null
   });

   useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; 
      const contractAbi = abi.abi;
      try{
        const {ethereum} = window;
  
        if(ethereum){
          const accounts = await ethereum.request({
            method:"eth_requestAccounts",
        });
        
  
        window.ethereum.on("chainChanged", ()=>{
          window.location.reload();
        })
  
        window.ethereum.on("accountsChanged",()=>{
          window.location.reload();
        })
  
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
       
        
        const contract = new ethers.Contract(
          contractAddress,
          contractAbi,
          signer
        );
        setState({provider,signer,contract})
        
        const { chainId } = await provider.getNetwork();
        var balance = await signer.getBalance()
        balance = utils.formatUnits(balance)
        // console.log("Accounts " + accounts + "chainID " + chainId + "Balance: " + balance)
        setAccountDetails({accounts, chainId, balance, contractAddress});
        
        }
        else{
          alert("Please install MetaMask");
        }
      } catch (error){
        console.log(error);
      }
  };
  connectWallet();
  },[]);
  console.log(state);

  return (
    <div className="App">
      <Header state={state} details={accountDetails}/>
    <Routes>
      <Route path="/" element={<Banner/>}/>
      <Route exact path='/headphones' element={<Headphones state={state} />}/>
      <Route exact path='/earphones' element={<Earpods state={state} />}/>
      <Route exact path='/speakers' element={<Speakers state={state} />}/>
      <Route exact path='/orders' element={<Orders state={state} details={accountDetails}/>}/>
    </Routes>
    </div>
  );
}

export default App;
