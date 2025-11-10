import type { CertType } from '@/schema/certSchema';

export const convertCertToObj = (cert: any): CertType => {
  const [aluno, curso, data, credenciais, display] = cert;

  const [instituicao, carteira] = credenciais;
  const [imagem, metadado] = display;

  const obj: CertType = {
    aluno,
    curso,
    data,
    credenciais: {
      instituicao,
      carteira,
    },
    display: {
      imagem,
      metadado
    }
  }

  return obj;

}

export const bachConvertCertToObj = (cert: any): CertType[] => {
  const certsArray: CertType[] = [];
  for (let i = 0; i < cert.length; i++) {
    certsArray.push(convertCertToObj(cert[i]));
  }
  return certsArray;
}


