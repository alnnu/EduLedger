"use client"
import Web3Modal from "web3modal";
import {ethers} from "ethers";
import { useEffect, useRef, useState } from "react";
export default function Home() {
  const abi =  [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "certs",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "issuer",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "issuernceDate",
          "type": "string"
        },
        {
          "components": [
            {
              "internalType": "string",
              "name": "id",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "mane",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "email",
              "type": "string"
            },
            {
              "internalType": "address",
              "name": "publicKey",
              "type": "address"
            }
          ],
          "internalType": "struct Cert.cretencials",
          "name": "credentialSubject",
          "type": "tuple"
        },
        {
          "components": [
            {
              "internalType": "string",
              "name": "contentType",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "content",
              "type": "string"
            }
          ],
          "internalType": "struct Cert.display",
          "name": "displayInfo",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "addCert",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string[]",
              "name": "context",
              "type": "string[]"
            },
            {
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            },
            {
              "internalType": "string[]",
              "name": "certType",
              "type": "string[]"
            },
            {
              "internalType": "string",
              "name": "issuer",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "issuernceDate",
              "type": "string"
            },
            {
              "components": [
                {
                  "internalType": "string",
                  "name": "id",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "mane",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "email",
                  "type": "string"
                },
                {
                  "internalType": "address",
                  "name": "publicKey",
                  "type": "address"
                }
              ],
              "internalType": "struct Cert.cretencials",
              "name": "credentialSubject",
              "type": "tuple"
            },
            {
              "components": [
                {
                  "internalType": "string",
                  "name": "contentType",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "content",
                  "type": "string"
                }
              ],
              "internalType": "struct Cert.display",
              "name": "displayInfo",
              "type": "tuple"
            }
          ],
          "internalType": "struct Cert.cert",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "payable",
      "type": "function",
      "payable": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        }
      ],
      "name": "getCert",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string[]",
              "name": "context",
              "type": "string[]"
            },
            {
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            },
            {
              "internalType": "string[]",
              "name": "certType",
              "type": "string[]"
            },
            {
              "internalType": "string",
              "name": "issuer",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "issuernceDate",
              "type": "string"
            },
            {
              "components": [
                {
                  "internalType": "string",
                  "name": "id",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "mane",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "email",
                  "type": "string"
                },
                {
                  "internalType": "address",
                  "name": "publicKey",
                  "type": "address"
                }
              ],
              "internalType": "struct Cert.cretencials",
              "name": "credentialSubject",
              "type": "tuple"
            },
            {
              "components": [
                {
                  "internalType": "string",
                  "name": "contentType",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "content",
                  "type": "string"
                }
              ],
              "internalType": "struct Cert.display",
              "name": "displayInfo",
              "type": "tuple"
            }
          ],
          "internalType": "struct Cert.cert",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    }
  ];
  const contractAdress = "0x398b1392d49B86093AB321A06a0d9e8572cb653A";
  const [walletConnected, setWalletConnected] = useState(false);
  const [cert, setCert] = useState<any>();
  const [searchId, setSearchId] = useState(0);
  // @ts-ignore
  const web3ModalRef = useRef();

  /**
   * Returns a Provider or Signer object representing the Ethereum RPC with or without the
   * signing capabilities of metamask attached
   *
   * A `Provider` is needed to interact with the blockchain - reading transactions, reading balances, reading state, etc.
   *
   * A `Signer` is a special type of Provider used in case a `write` transaction needs to be made to the blockchain, which involves the connected account
   * needing to make a digital signature to authorize the transaction being sent. Metamask exposes a Signer API to allow your website to
   * request signatures from the user using Signer functions.
   *
   * @param {*} needSigner - True if you need the signer, default false otherwise
   */
  const getProviderOrSigner = async (needSigner = false) => {
    // Connect to Metamask
    // Since we store `web3Modal` as a reference, we need to access the `current` value to get access to the underlying object
    // @ts-ignore
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new ethers.BrowserProvider(provider);
    // If user is not connected to the Rinkeby network, let them know and throw an error
    const { chainId } = await web3Provider.getNetwork();
    console.log(chainId)
    if (chainId !== 4n && chainId !== 1337n) {
      window.alert("Change the network to Rinkeby or ganache");
      throw new Error("Change network to Rinkeby or ganache");
    }

    if (needSigner) {
      const signer = web3Provider.getSigner();
      return signer;
    }
    return web3Provider;
  };

  const addCert = async () => {
    try {
      const signer = await getProviderOrSigner(true);
      const certContract = new ethers.Contract(contractAdress, abi, signer)
      const tx = await  certContract.addCert();
      setCert(`Transaction sent: ${tx.hash}. Waiting for confirmation...`);
      // Wait for the transaction to be mined
      const receipt = await tx.wait();
      setCert(receipt);
      console.log(receipt)
    } catch (err) {
      console.error(err);
      // @ts-ignore
      setCert(`Error: ${err.message}`);
    }
  };

  const getCert = async (certId: number) => {
    try {
      // For reading data, we don't necessarily need a signer
      const provider = await getProviderOrSigner();
      const certContract = new ethers.Contract(contractAdress, abi, provider)
      const certData = await  certContract.getCert(certId);
      setCert(certData);
      console.log(certData)
    } catch (err) {
      console.error(err);
      // @ts-ignore
      setCert(`Error: ${err.message}`);
    }
  };

  /*
    connectWallet: Connects the MetaMask wallet
  */
  const connectWallet = async () => {
    try {
      // Get the provider from web3Modal, which in our case is MetaMask
      // When used for the first time, it prompts the user to connect their wallet
      await getProviderOrSigner();
      setWalletConnected(true);
    } catch (err) {
      console.error(err);
    }
  };


  useEffect(() => {
    if (!walletConnected) {
      // @ts-ignore
      web3ModalRef.current = new Web3Modal({
        network: "rinkeby",
        providerOptions: {},
        disableInjectedProvider: false,
      });
      connectWallet();
    }
  }, [walletConnected]);
  return ();
}
