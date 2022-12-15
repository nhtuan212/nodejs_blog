import sharp from 'sharp'
import path from 'path'

// export class Resize {
// 	constructor(folder) {
// 		this.folder = folder;
// 	}
// 	async save(buffer) {
// 		const filename = Resize.filename();
// 		const filepath = this.filepath(filename);

// 		await sharp(buffer)
// 			.resize(300, 300, { // size image 300x300
// 				fit: sharp.fit.inside,
// 				withoutEnlargement: true
// 			})
// 			.toFile(filepath);

// 		return filename;
// 	}
// 	static filename() {
// 		// random file name
// 		return `${Math.random()}.png`;
// 	}
// 	filepath(filename) {
// 		// Go to path image
// 		return path.resolve(`${this.folder}/${filename}`)
// 	}
// }

const setFilePath = (imagePath, fileName) => (
	path.resolve(`${imagePath}/${fileName}`)
)

const setFileName = ({ imageName, mimeType, imageSize }) => {
	const extension = mimeType.split('/')[1]
	const fileName = imageName.replace(`.${extension}`, '')
	const uniqueSuffix = `${Date.now()}_${Math.round(Math.random() * 1E9)}_${imageSize}`
	return `${fileName}_${uniqueSuffix}.${extension}`
}

const handleSizeImage = (imageSize) => {
	const fileSize = imageSize.replace("x", ', ').replace("'", '').split(',')
	const result = {
		width: parseInt(fileSize[0]),
		height: parseInt(fileSize[1])
	}
	return result
}

export const Resize = ({ imagePath, imageSize, imageInfo }) => {
	if (imageInfo) {
		const imageWidth = handleSizeImage(imageSize).width
		const imageHeight = handleSizeImage(imageSize).height
		const fileName = setFileName({
			imageName: imageInfo.originalname,
			mimeType: imageInfo.mimetype,
			imageSize: `${imageWidth}x${imageHeight}`
		})
		const filePath = setFilePath(imagePath, fileName)

		sharp(imageInfo.buffer)
			.resize(imageWidth, imageHeight, {
				fit: sharp.fit.inside,
				withoutEnlargement: true
			})
			.toFile(filePath)

		return fileName;
	}

	console.log('out of buffer');
}
