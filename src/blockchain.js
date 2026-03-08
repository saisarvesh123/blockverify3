import { ethers } from "ethers";

const contractAddress = "0x2563cC4D76B85919efb1C55d4548DF3df6F5e600";

const abi = [
  "function storeDocument(string memory hash)",
  "function verifyDocument(string memory hash) view returns (bool)"
];

async function getContract() {

  if (!window.ethereum) {
    alert("Install MetaMask");
    return null;
  }

  await window.ethereum.request({ method: "eth_requestAccounts" });

  const provider = new ethers.BrowserProvider(window.ethereum);

  const signer = await provider.getSigner();

  return new ethers.Contract(contractAddress, abi, signer);
}


// STORE HASH ON BLOCKCHAIN
export async function registerHash(hash) {

  const contract = await getContract();
  if (!contract) return;

const tx = await contract.storeDocument(hash);
  await tx.wait();

  alert("Document stored on blockchain!");
}


// VERIFY HASH
export async function verifyHash(hash) {

  const contract = await getContract();
  if (!contract) return false;

  const exists = await contract.verifyDocument(hash);

  return exists;
}