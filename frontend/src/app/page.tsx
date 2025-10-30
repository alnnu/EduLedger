'use client'
import Web3Modal from 'web3modal'
import { ethers } from 'ethers'
import { useEffect, useRef, useState } from 'react'
import AddCertForm from './components/AddCertForm'
import GetCertForm from './components/GetCertForm'
import WalletButton from './components/WalletButton'
import { abi } from '../../abi'

export default function Home() {
  const contractAdress = "0xE9E24A0a85249ea7d28eb3F399C1aAcf9fC661b8"
  const [walletConnected, setWalletConnected] = useState(false)
  const [cert, setCert] = useState<any>()
  // @ts-ignore
  const web3ModalRef = useRef()

  const getProviderOrSigner = async (needSigner = false) => {
    // @ts-ignore
    const provider = await web3ModalRef.current.connect()
    const web3Provider = new ethers.BrowserProvider(provider)
    const { chainId } = await web3Provider.getNetwork()
    console.log(chainId)
    if (chainId !== 4n && chainId !== 1337n) {
      window.alert('Change the network to Rinkeby or ganache')
      throw new Error('Change network to Rinkeby or ganache')
    }

    if (needSigner) {
      const signer = web3Provider.getSigner()
      return signer
    }
    return web3Provider
  }

  const addCert = async () => {
    try {
      const signer = await getProviderOrSigner(true)
      const certContract = new ethers.Contract(contractAdress, abi, signer)
      console.log(certContract)
      const tx = await certContract.addCert({
        gasLimit: 5000000
      })
      setCert(`Transaction sent: ${tx.hash}. Waiting for confirmation...`)
      const receipt = await tx.wait()
      setCert(receipt)
      console.log(receipt)
    } catch (err) {
      console.error(err)
      // @ts-ignore
      setCert(`Error: ${err.message}`)
    }
  }

  const getCert = async (certId: number) => {
    try {
      const provider = await getProviderOrSigner()
      const certContract = new ethers.Contract(contractAdress, abi, provider)
      const certData = await certContract.getCert(certId)
      setCert(certData)
      console.log(certData)
    } catch (err) {
      console.error(err)
      // @ts-ignore
      setCert(`Error: ${err.message}`)
    }
  }

  const connectWallet = async () => {
    try {
      await getProviderOrSigner()
      setWalletConnected(true)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if (!walletConnected) {
      // @ts-ignore
      web3ModalRef.current = new Web3Modal({
        network: 'rinkeby',
        providerOptions: {},
        disableInjectedProvider: false,
      })
      connectWallet()
    }
  }, [walletConnected])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-24">
      <div className="w-full max-w-4xl">
        <div className="flex justify-end mb-8">

          <WalletButton walletConnected={walletConnected} connectWallet={connectWallet} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <AddCertForm addCert={addCert} setCert={setCert} />
          <GetCertForm getCert={getCert} setCert={setCert} />
        </div>
        {cert && (
          <div className="mt-12 bg-white shadow-md rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Result</h2>
            <pre className="bg-gray-200 p-4 rounded-lg overflow-x-auto">{JSON.stringify(cert, (key, value) =>
              typeof value === "bigint" ? Number(value) : value, 2)}</pre>
          </div>
        )}
      </div>
    </main>
  )
}
