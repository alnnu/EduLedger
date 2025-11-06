import type { CertType } from '@/schema/certSchema';

export const convertCertToObj = (cert: any): CertType => {
  console.log(cert);
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


