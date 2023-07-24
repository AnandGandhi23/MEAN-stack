const cloudinary = require('cloudinary').v2
const multer = require('multer')

// Configuration
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
})

const storage = multer.diskStorage({
	destination: function (
		req: any,
		file: any,
		cb: (arg0: null, arg1: string) => void
	) {
		cb(null, 'uploads') // store files in the 'uploads' folder
	},
	filename: function (
		req: any,
		file: { originalname: string },
		cb: (arg0: null, arg1: string) => void
	) {
		cb(null, Date.now() + '-' + file.originalname) // set the filename to be unique
	},
})

const upload = multer({ storage: storage }).single('profileImage')

export { cloudinary, storage, upload }
