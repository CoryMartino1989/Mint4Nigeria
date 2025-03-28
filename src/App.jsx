import { useSendTransaction } from "thirdweb/react";
import {
  createThirdwebClient,
  getContract,
} from "thirdweb";
import { defineChain } from "thirdweb/chains";
import { ConnectButton, useActiveAccount } from "thirdweb/react";
import ABI from "../abi.json";

const client = createThirdwebClient({
  clientId: "9db4f27b3ff418eb08e209f9d863cce7",
});

const chain = defineChain(1329);

const contract = getContract({
  client,
  chain,
  address: "0x00aD629685845FCfbEd45b8946bd7eC77aE2A003",
  abi: ABI,
});

export default function App() {
  const account = useActiveAccount();
  const { mutate: sendTransaction, isPending, isSuccess, error } = useSendTransaction();

  const handleMint = () => {
    if (!account) return;

    const tx = contract.call("claim", [
      account.address,
      "1",
      "0x0000000000000000000000000000000000000000", // native currency
      "0",
      {
        proof: [],
        quantityLimitPerWallet: "0",
        pricePerToken: "0",
        currency: "0x0000000000000000000000000000000000000000",
      },
      "0x",
    ]);

    sendTransaction(tx);
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
