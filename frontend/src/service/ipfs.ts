import api from "@/lib/axios"

class Ipfs {


  createImage(image: File) {
    const formData = new FormData()
    formData.append('file', image)

    return api.post(`/add`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })
  }
  createMetadata(imgHash: string, nftNmame: string, description: string) {
    const metadata = {
      "name": nftNmame,
      "description": description,
      "image": `https://ipfs.io/ipfs/${imgHash}`
    }

    const jsonString = JSON.stringify(metadata);

    const formData = new FormData()
    formData.append('file', jsonString)


    return api.post(`/add`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })
  }

  getObject(cid: string) {
    return api.post(`/cat?arg=${cid}`)
  }
}

export default new Ipfs();
