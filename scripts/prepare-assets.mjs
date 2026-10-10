import { copyFile, mkdir, writeFile } from 'node:fs/promises'
import { pdf } from 'pdf-to-img'
import sharp from 'sharp'

const sourcePdf = 'src/assets/desenho-colorir-minc-cc8b3.pdf'
const sourcePhoto = 'src/assets/famila-capsula-7e994.jpg'
const filesDirectory = 'public/arquivos'
const imagesDirectory = 'public/imagens'

await mkdir(filesDirectory, { recursive: true })
await mkdir(imagesDirectory, { recursive: true })
await copyFile(sourcePdf, `${filesDirectory}/desenho-para-colorir-minc.pdf`)

const document = await pdf(sourcePdf, { scale: 3 })
const preview = await document.getPage(1)
await writeFile(`${imagesDirectory}/desenho-para-colorir-minc.png`, preview)
await sharp(preview)
  .webp({ quality: 90, effort: 5 })
  .toFile(`${imagesDirectory}/desenho-para-colorir-minc.webp`)
document.destroy()

for (const width of [640, 960, 1440, 1536]) {
  await sharp(sourcePhoto)
    .resize({ width, withoutEnlargement: true })
    .jpeg({ quality: 88, progressive: true, mozjpeg: true })
    .toFile(`${imagesDirectory}/familia-capsula-${width}.jpg`)

  await sharp(sourcePhoto)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 84, effort: 5 })
    .toFile(`${imagesDirectory}/familia-capsula-${width}.webp`)

  await sharp(sourcePhoto)
    .resize({ width, withoutEnlargement: true })
    .avif({ quality: 63, effort: 4 })
    .toFile(`${imagesDirectory}/familia-capsula-${width}.avif`)
}

await sharp(sourcePhoto)
  .resize({ width: 1200, height: 630, fit: 'cover', position: 'attention' })
  .jpeg({ quality: 88, progressive: true, mozjpeg: true })
  .toFile(`${imagesDirectory}/og-desenho-minc.jpg`)
