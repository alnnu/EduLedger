import api from "@/lib/axios"

class Ipfs {


  createImage(image: string) {
    return api.post(`/add`, {
      "path": image
    })
  }
}


export default new Ipfs();
