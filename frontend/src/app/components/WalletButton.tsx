"use client"

interface WalletButtonProps {
    walletConnected: boolean;
    connectWallet: () => Promise<void>;
  }
  
  export default function WalletButton({ walletConnected, connectWallet }: WalletButtonProps) {
    return (
      <button
        onClick={connectWallet}
        disabled={walletConnected}
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-300 disabled:bg-gray-400"
      >
        {walletConnected ? "Wallet Connected" : "Connect Wallet"}
      </button>
    );
  }
  