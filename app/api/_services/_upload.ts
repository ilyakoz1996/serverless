import cloudinary, { UploadApiOptions } from 'cloudinary'

const c = cloudinary.v2
c.config({ 
    cloud_name: 'dmc', 
    api_key: '971526231192946', 
    api_secret: '3dkH3Xn-I0tRcWNhBV1JjDY9ekk' 
});

const opts: UploadApiOptions = {
    overwrite: true,
    invalidate: true,
    resource_type: 'auto'
}

class UploadService {
    async uploadImage (img: any) {
        const url = await c.uploader.upload(img, opts)
        if (url) {
            return url.secure_url
        } else {
            return null
        }
    }
}

export default UploadService;