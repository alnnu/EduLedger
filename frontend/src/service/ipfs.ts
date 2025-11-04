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
}


export default new Ipfs();
