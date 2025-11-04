"use client"

import { Button } from "@/components/ui/button";
import { connectWallet } from "@/service/web3";

import { useState } from "react";

export default function WalletButton() {

  const [walletConnected, setWalletConnected] = useState(false);

  const handleConnectWallet = async () => {
    const connected = await connectWallet();
    setWalletConnected(connected);
    console.log("Wallet connected:", connected);
  }


  return (
    <Button
      onClick={handleConnectWallet}
      disabled={walletConnected}
      variant="outline"
    >

      {walletConnected ? "Carteira Conectada" : "Conectar Carteira"}
      </Button>
  );
}

