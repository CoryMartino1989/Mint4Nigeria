import { useEffect, useState } from "react";
import {
  ThirdwebProvider,
  ConnectWallet,
  useContract,
  useAddress,
  useContractWrite,
  metamaskWallet,
  walletConnect,
} from "@thirdweb-dev/react";
import { createThirdwebClient, defineChain } from "thirdweb";

// Custom Nigerian-styled theme
const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#008753", // Nigerian green
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

// Thirdweb client setup
const client = createThirdwebClient({
  clientId: "9db4f27b3ff418eb08e209f9d863cce7",
});

// Contract and chain details
const CONTRACT_ADDRESS = "0x00aD629685845FCfbEd45b8946bd7eC77aE2A003";
const seiChain = defineChain(1329); // Sei EVM mainnet chainId

function MintSection() {
  const address = useAddress();
  const { contract } = useContract(CONTRACT_ADDRESS);
  const { mutateAsync: claimNFT, isLoading } = useContractWrite(contract, "claim");

  const handleMint = async () => {
    try {
      const result = await claimNFT({ args: [address, 1] });
      console.log("NFT Minted:", result);
    } catch (error) {
      console.error("Minting error:", error);
    }
  };

  return (
    <div>
      {address ? (
        <>
          <p>Connected as: {address}</p>
          <button style={styles.button} onClick={handleMint} disabled={isLoading}>
            {isLoading ? "Minting..." : "Mint NFT"}
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
    <ThirdwebProvider
      clientId="9db4f27b3ff418eb08e209f9d863cce7"
      activeChain={seiChain}
      supportedWallets={[
        metamaskWallet({ projectId: "8e16b3285debe4e3bbefcef01b2d3006" }),
        walletConnect({ projectId: "8e16b3285debe4e3bbefcef01b2d3006" }),
      ]}
    >
      <div style={styles.container}>
        <h1>Nigerian NFT Mint Site 🇳🇬</h1>
        <ConnectWallet theme="light" />
        <MintSection />
      </div>
    </ThirdwebProvider>
  );
}
