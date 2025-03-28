import { useEffect, useState } from "react";
import {
  ConnectButton,
  useActiveAccount,
} from "thirdweb/react";
import {
  createThirdwebClient,
  getNFTDrop,
} from "thirdweb";
import { defineChain } from "thirdweb/chains";

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#008753",
    color: "#ffffff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "sans-serif",
    padding: "2rem",
  },
  button: {
    backgroundColor: "#ffffff",
    color: "#008753",
    padding: "1rem 2rem",
    fontSize: "1rem",
    fontWeight: "bold",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "1rem",
  },
};

const client = createThirdwebClient({
  clientId: "9db4f27b3ff418eb08e209f9d863cce7",
});

const chain = defineChain(1329);
const contract = getNFTDrop({
  client,
  chain,
  address: "0x00aD629685845FCfbEd45b8946bd7eC77aE2A003",
});

function MintSection() {
  const account = useActiveAccount();
  const address = account?.address;

  const handleMint = async () => {
    try {
      const tx = await contract.claim({
        to: address,
        quantity: 1,
      });
      console.log("Minted successfully:", tx);
    } catch (err) {
      console.error("Mint failed:", err);
    }
  };

  return (
    <div>
      {address ? (
        <>
          <p>Connected as: {address}</p>
          <button style={styles.button} onClick={handleMint}>
            Mint NFT
          </button>
        </>
      ) : (
        <p>Please connect your wallet.</p>
      )}
    </div>
  );
}

export default function App() {
  return (
    <div style={styles.container}>
      <h1>Nigerian NFT Mint Site 🇳🇬</h1>
      <ConnectButton client={client} chain={chain} />
      <MintSection />
    </div>
  );
}
