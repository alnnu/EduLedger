import { ethers } from 'ethers'
import { abi } from '../../abi'
import { addCertType } from '@/schema/certSchema';
import { convertCertToObj, bachConvertCertToObj } from '@/lib/cert';

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '';



const getProviderOrSigner = async (needSigner = false) => {


  const web3Provider = new ethers.BrowserProvider(window.ethereum);
  console.log(web3Provider);
  const { chainId } = await web3Provider.getNetwork();

  if (chainId !== 141319n) {
    console.log(chainId);
    throw new Error('Carteira em outra rede. Por favor, mude para a rede correta!');
  }

  if (needSigner) {
    try {
      const signer = await web3Provider.getSigner();
      return signer;
    } catch (err) {
      throw new Error('Erro ao tentar conectar a carteira. Por favor, tente novamente!');
    }
  }
  return web3Provider;
};

export const connectWallet = async () => {
  try {

    if (typeof window.ethereum === 'undefined') {
      throw new Error('nem uma carteira web3 detectada');
    }
    await getProviderOrSigner(true);
    return {
      code: 1,
      msg: 'carteira conectada com sucesso',
    };
  } catch (err) {
    console.error(err);
    return {
      code: 2,
      msg: err instanceof Error ? err.message : 'erro desconhecido',
    };
  }
};

export const addCertService = async (dados: addCertType) => {

  const signer = await getProviderOrSigner(true);
  const certContract = new ethers.Contract(contractAddress, abi, signer);
  const tx = await certContract.addCert(dados.instituicao, dados.data, dados.aluno, dados.curso, dados.hashImagen, dados.hashMetadado, {
    gasLimit: 5000000,
  });

  const receipt = await tx.wait(1);

  return receipt;
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


  console.log(certData);
  const certsArray = bachConvertCertToObj(certData);

  return certsArray;
}

