import browserStorage from '@services/browserStorage'
import axios from 'axios'
import { useState } from 'react'

export interface IIdImage {
  url?: string
  _id?: string
}
export interface IFileImage {
  id?: string | number
  imageFile?: File
}

const useUploadImage = (onSuccess?: (idImage: IIdImage) => void) => {
  const [imageFile, setImage] = useState<IIdImage>()
  const [isUploading, setIsUploading] = useState<boolean>()
  const uploadImage = (image: IFileImage) => {
    setIsUploading(true)
    const formData = new FormData()
    formData.append('file', image.imageFile as File)

    if (image.imageFile) {
      axios<any>({
        method: 'POST',
        url: `${import.meta.env.VITE_BASE_URL_UPLOAD}`,
        headers: {
          Authorization: `Bearer ${browserStorage.get('token')}`,
        },
        data: formData,
      }).then((res) => {
        const IDImage = {
          url: res.data.data.data,
          _id: res.data.data.fileName,
        }
        onSuccess?.(IDImage)
        setImage(IDImage)
        setIsUploading(false)
      })
    }
  }
  return { imageFile, isUploading, uploadImage, setImage }
}

export default useUploadImage
