import { createThirdwebClient, getContract } from "thirdweb";
import { useSendTransaction, useActiveAccount } from "thirdweb/react";
import ABI from "./abi.json";
import { baseSepolia } from "thirdweb/chains";

const client = createThirdwebClient({ clientId: "your-client-id" });

const contract = getContract({
  client,
  chain: baseSepolia,
  address: "0xYourDropContractAddress",
  abi: ABI,
});

const MintButton = () => {
  const account = useActiveAccount();
  const { mutate: sendTransaction } = useSendTransaction();

  const handleMint = async () => {
    if (!account || !contract) return;

    const tx = await contract.erc721.claimTo.prepare({
      to: account.address,
      quantity: 1n,
    });

    sendTransaction(tx, {
      onSuccess: (result) => {
        console.log("Mint success!", result);
      },
      onError: (err) => {
        console.error("Mint failed", err);
      },
    });
  };

  return <button onClick={handleMint}>Mint</button>;
};

export default MintButton;