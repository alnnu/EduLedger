import Web3Modal from 'web3modal'
import { ethers } from 'ethers'
import { abi } from '../../abi'
import { addCertType } from '@/schema/certSchema';
import { convertCertToObj, bachConvertCertToObj } from '@/lib/cert';

const contractAddress = "0x0D2b766c3a814EC9f17214841838856C2f80F216";

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
  const tx = await certContract.addCert(dados.instituicao, dados.data, dados.aluno, dados.curso, dados.hashImagen, dados.hashMetadado, {
    gasLimit: 5000000,
  });
  return tx;
};

export const getCertService = async (certHash: string) => {
  const provider = await getProviderOrSigner();
  const certContract = new ethers.Contract(contractAddress, abi, provider);
  const certData = await certContract.getCert(certHash);

  const certObj = convertCertToObj(certData);

  return certObj;
};

export const getAllCertsService = async () => {
  const provider = await getProviderOrSigner();
  const certContract = new ethers.Contract(contractAddress, abi, provider);
  const certData = await certContract.getAllCerts();

  const certsArray = bachConvertCertToObj(certData);

  return certsArray;
}

