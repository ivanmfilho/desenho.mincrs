import { cp, mkdir, readFile, writeFile } from 'node:fs/promises'
import { pdf } from 'pdf-to-img'
import sharp from 'sharp'

const sourcePdf = 'src/assets/desenho-colorir-minc-cc8b3.pdf'
const sourcePhoto = 'src/assets/famila-capsula-7e994.jpg'
const publicFiles = 'public/arquivos'
const publicImages = 'public/imagens'

await mkdir(publicFiles, { recursive: true })
await mkdir(publicImages, { recursive: true })
await cp(sourcePdf, `${publicFiles}/desenho-para-colorir-minc.pdf`)

const document = await pdf(sourcePdf, { scale: 3 })
const previewPng = await document.getPage(1)
await writeFile(`${publicImages}/desenho-para-colorir-minc.png`, previewPng)
await sharp(previewPng)
  .webp({ quality: 88, effort: 5 })
  .toFile(`${publicImages}/desenho-para-colorir-minc.webp`)
document.destroy()

const photo = sharp(sourcePhoto)
const metadata = await photo.metadata()
const widths = [640, 960, 1440, 2048].filter((width) => width <= (metadata.width ?? 2048))

for (const width of widths) {
  await sharp(sourcePhoto)
    .resize({ width, withoutEnlargement: true })
    .jpeg({ quality: 88, progressive: true, mozjpeg: true })
    .toFile(`${publicImages}/familia-capsula-${width}.jpg`)

  await sharp(sourcePhoto)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 84, effort: 5 })
    .toFile(`${publicImages}/familia-capsula-${width}.webp`)

  await sharp(sourcePhoto)
    .resize({ width, withoutEnlargement: true })
    .avif({ quality: 63, effort: 4 })
    .toFile(`${publicImages}/familia-capsula-${width}.avif`)
}

await sharp(sourcePhoto)
  .resize({ width: 1200, height: 630, fit: 'cover', position: 'attention' })
  .jpeg({ quality: 88, progressive: true, mozjpeg: true })
  .toFile(`${publicImages}/og-desenho-minc.jpg`)

const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="12" fill="#18263f"/><path fill="#fff" d="M13 23h8v3c2-3 5-4 8-4 4 0 7 2 9 5 2-3 6-5 10-5 8 0 11 5 11 13v12h-9V36c0-4-1-6-4-6s-5 2-5 7v10h-9V36c0-4-1-6-4-6s-5 2-5 7v10H13V23Z"/></svg>`
await writeFile('public/favicon.svg', faviconSvg)

console.log('Assets preparados com sucesso.')
