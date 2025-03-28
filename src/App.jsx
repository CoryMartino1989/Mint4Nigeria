import { useSendTransaction } from "thirdweb/react";
import {
  createThirdwebClient,
  getContractWithAbi,
} from "thirdweb";
import { defineChain } from "thirdweb/chains";
import { ConnectButton, useActiveAccount } from "thirdweb/react";
import ABI from "../abi.json";

const client = createThirdwebClient({
  clientId: "9db4f27b3ff418eb08e209f9d863cce7",
});

const chain = defineChain(1329);

const contract = getContractWithAbi({
  client,
  chain,
  address: "0x00aD629685845FCfbEd45b8946bd7eC77aE2A003",
  abi: ABI,
});

export default function App() {
  const account = useActiveAccount();
  const { mutate: sendTransaction, isPending, isSuccess, error } = useSendTransaction();

  const handleMint = async () => {
    if (!contract || !contract.write || typeof contract.write.claim !== "function") {
      console.error("Contract not ready or claim function is undefined");
      return;
    }
    try {
      setStatus("Minting...");
      const tx = await contract.write.claim([
        account.address,
        BigInt(1),
        "0x0000000000000000000000000000000000000000",
        BigInt(0),
        {
          proof: [],
          quantityLimitPerWallet: BigInt(0),
          pricePerToken: BigInt(0),
          currency: "0x0000000000000000000000000000000000000000",
        },
        "0x",
      ]);
      console.log("Transaction sent:", tx);
      setStatus("Mint successful!");
    } catch (err) {
      console.error("Mint failed:", err);
      setStatus("Mint failed.");
    }
  };

  return (
    <div style={{
      minHeight: "100vh", backgroundColor: "#008753", color: "#fff", display: "flex",
      flexDirection: "column", justifyContent: "center", alignItems: "center", fontFamily: "sans-serif"
    }}>
      <h1>Nigerian NFT Mint Site 🇳🇬</h1>
      <ConnectButton client={client} chain={chain} />
      {account && (
        <>
          <p>Connected as: {account.address}</p>
          <button
            onClick={handleMint}
            disabled={isPending}
            style={{
              backgroundColor: "#fff", color: "#008753", padding: "1rem 2rem",
              fontSize: "1rem", border: "none", borderRadius: "8px", cursor: "pointer", marginTop: "1rem"
            }}
          >
            {isPending ? "Minting..." : "Mint NFT"}
          </button>
          {isSuccess && <p>✅ Mint successful!</p>}
          {error && <p>❌ Mint failed: {error.message}</p>}
        </>
      )}
    </div>
  );
}
