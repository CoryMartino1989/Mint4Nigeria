
import { useEffect, useState } from "react";
import {
  createThirdwebClient,
  getContract,
} from "thirdweb";
import { defineChain } from "thirdweb/chains";
import { useActiveAccount, useConnect, useSendTransaction } from "thirdweb/react";
import ABI from "../abi.json";

const client = createThirdwebClient({
  clientId: "9db4f27b3ff418eb08e209f9d863cce7",
});

const contract = getContract({
  client,
  chain: defineChain(1329),
  address: "0x00aD629685845FCfbEd45b8946bd7eC77aE2A003",
  abi: ABI,
});

export default function App() {
  const connect = useConnect();
  const account = useActiveAccount();
  const { mutate: sendTransaction, isPending } = useSendTransaction();

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleMint = async () => {
    setError(null);
    setSuccess(null);
    if (!account) {
      setError("Please connect your wallet first.");
      return;
    }

    try {
      const tx = await contract.write.claim([
        account.address,
        1,
        "0x0000000000000000000000000000000000000000", // Native currency
        0,
        {
          proof: [],
          quantityLimitPerWallet: 0,
          pricePerToken: 0,
          currency: "0x0000000000000000000000000000000000000000",
        },
        "0x",
      ]);
      sendTransaction(tx, {
        onSuccess: () => setSuccess("Mint successful!"),
        onError: (err) => setError("Mint failed: " + err.message),
      });
    } catch (err) {
      setError("Transaction error: " + err.message);
    }
  };

  return (
    <main style={{ textAlign: "center", padding: "4rem", fontFamily: "sans-serif" }}>
      <h1 style={{ color: "#1a8e3d" }}>Mint4Nigeria</h1>
      {account ? (
        <>
          <p>Wallet: {account.address}</p>
          <button onClick={handleMint} disabled={isPending}>
            {isPending ? "Minting..." : "Mint NFT"}
          </button>
        </>
      ) : (
        <button onClick={() => connect.connect()}>Connect Wallet</button>
      )}
      {success && <p style={{ color: "green" }}>{success}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </main>
  );
}
