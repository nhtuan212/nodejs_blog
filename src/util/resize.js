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

const setFileName = () => (
	`${Math.random()}.png`
)

const handleSizeImage = (size) => {
	
	// Handle

	const result = parseInt(size)
	return result
}

export const Resize = ({ imagePath, imageSize, buffer }) => {
	if (buffer) {
		const fileName = setFileName()
		const filePath = setFilePath(imagePath, fileName)
		const fileSize = imageSize.replace("x", ', ').replace("'", '').split(',')
		const imageWidth = handleSizeImage(fileSize[0])
		const imageHeight = handleSizeImage(fileSize[1])

		sharp(buffer)
			.resize(imageWidth, imageHeight, {
				fit: sharp.fit.inside,
				withoutEnlargement: true
			})
			.toFile(filePath)

		return fileName;
	}

	console.log('out of buffer');
}
