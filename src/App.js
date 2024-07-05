import React, { useState, useEffect } from 'react';
import './App.css';
import { ethers } from 'ethers';
import GradeBookForm from './gradebook-frontend/src/GradeBookForm.js';
require('dotenv').config(); 

function App() {
  const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS; // Access contract address from .env

  const [contract, setContract] = useState(null);

  useEffect(() => {
    const initializeContract = async () => {
      try {
        if (window.ethereum) {
          await window.ethereum.enable(); 
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const gradeBookContract = new ethers.Contract(contractAddress, ABI, signer);
          setContract(gradeBookContract);
        } else {
          console.error('Please install MetaMask to use this application.');
        }
      } catch (error) {
        console.error('Error initializing contract:', error);
      }
    };

    initializeContract();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>GradeBook Frontend</h1>
      </header>
      <main>
        {contract && <GradeBookForm contract={contract} />}
      </main>
    </div>
  );
}

export default App;
