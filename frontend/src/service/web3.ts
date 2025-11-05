import Web3Modal from 'web3modal'
import { ethers } from 'ethers'
import { abi } from '../../abi'
import { addCertType } from '@/schema/certSchema';

const contractAddress = "0x22d05daccd046f4eef2A2b9F7C9512c9D6574C32";

let web3Modal: Web3Modal;

if (typeof window !== 'undefined') {
  web3Modal = new Web3Modal({
    network: 'rinkeby',
    providerOptions: {},
    disableInjectedProvider: false,
  });
}

const getProviderOrSigner = async (needSigner = false) => {
  const provider = await web3Modal.connect();
  const web3Provider = new ethers.BrowserProvider(provider);
  const { chainId } = await web3Provider.getNetwork();

  if (chainId !== 4n && chainId !== 1337n) {
    window.alert('Change the network to Rinkeby or ganache');
    throw new Error('Change network to Rinkeby or ganache');
  }

  if (needSigner) {
    const signer = await web3Provider.getSigner();
    return signer;
  }
  return web3Provider;
};

export const connectWallet = async () => {
  try {
    await getProviderOrSigner();
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const addCertService = async (dados: addCertType) => {
  const signer = await getProviderOrSigner(true);
  const certContract = new ethers.Contract(contractAddress, abi, signer);
  const tx = await certContract.addCert(dados.instituicao, dados.data, dados.aluno, dados.hashImagen, dados.hashMetadado, {
    gasLimit: 5000000,
  });
  return tx;
};

export const getCertService = async (certId: number) => {
  const provider = await getProviderOrSigner();
  const certContract = new ethers.Contract(contractAddress, abi, provider);
  const certData = await certContract.getCert(certId);
  return certData;
};
