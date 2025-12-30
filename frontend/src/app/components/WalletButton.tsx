"use client"

import { Button } from "@/components/ui/button";
import { connectWallet } from "@/service/web3";

import { useState } from "react";
import { toast } from "sonner";

export default function WalletButton() {

  const [walletConnected, setWalletConnected] = useState(false);

  const handleConnectWallet = async () => {
    const connected = await connectWallet();

    if (connected.code == 1) {
      setWalletConnected(true);
    } else {
      toast.error(connected.msg, {
        duration: 5000,
      });
    }
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

