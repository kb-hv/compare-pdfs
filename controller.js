const fs = require('fs');
const pdfParse = require('pdf-parse');
const { PNG } = require('pngjs');
const pixelmatch = require('pixelmatch');
const pdf2img = require('pdf-img-convert')

module.exports.home = (req, res) => {
  return res.render('home', { error: null, result: null })
}

module.exports.compareFiles = async (req, res) => {
  const comparisonOption = req.body.comparisonOption

  let textComparison = null
  let pixelComparison = null

  // check file format
  const file1 = req.files.file1[0]
  const file2 = req.files.file2[0]
  if (file1.mimetype != 'application/pdf' || file2.mimetype != 'application/pdf') {
    return res.render('home', { error: {message: 'Please upload PDF files only'}, result: null })
  }

  if (comparisonOption == 'text') {
    // compare text
    const { addedLines, removedLines, isTextIdentical } = await compareText(file1.path, file2.path)
    textComparison = { addedLines, removedLines, isTextIdentical }
  } else if (comparisonOption == 'pixelbypixel') {
    // compare pixels
    const { messages, arePDFsIdentical } = await comparePixel(file1.path, file2.path)
    pixelComparison = { messages, arePDFsIdentical }
  }
  res.render('home', {
    message: null, error: false, result: { textComparison, pixelComparison }
  })
}

const compareText = async (filePath1, filePath2) => {
  // extract text
  const file1Text = await getFileContent(filePath1)
  const file2Text = await getFileContent(filePath2)
  // compare
  const lines1 = file1Text.split('\n')
  const lines2 = file2Text.split('\n')
  const addedLines = lines2.filter(line => !lines1.includes(line));
  const removedLines = lines1.filter(line => !lines2.includes(line));
  const isTextIdentical = (addedLines == 0 && removedLines == 0)
  // console.log('Extra lines in File 2 / Missing lines in File 1');
  // addedLines.forEach(line => console.log(line));
  // console.log('Missing lines in File 1 / Extra lines in File 2');
  // removedLines.forEach(line => console.log(line));

  return { addedLines, removedLines, isTextIdentical }
}

const getFileContent = async (filePath) => {
  const dataBuffer = fs.readFileSync(filePath)
  const data = await pdfParse(dataBuffer)
  return data.text
}

const comparePixel = async (pdfPath1, pdfPath2) => {
  const images1 = await convertPDFtoPNG(pdfPath1, __dirname + '/files/images1/');
  const images2 = await convertPDFtoPNG(pdfPath2, __dirname + '/files/images2/');

  let arePDFsIdentical = true
  let messages = []
  if (images1.length != images2.length) {
    messages.push('The number of pages is different')
    arePDFsIdentical = false;
    return { messages, arePDFsIdentical };
  }

  for (let i = 0; i < images2.length; i++) {
    const image1Path = __dirname + '/files/images1/' + 'output' + i + '.png';
    const image2Path = __dirname + '/files/images2/' + 'output' + i + '.png';
    console.log('about to enter function compareImages', image1Path)
    const arePagesIdentical = compareImages(image1Path, image2Path);
    if (arePagesIdentical) {
      messages.push(`Page ${i + 1} - identical`)
    }
    else {
      messages.push(`Page ${i + 1} - not identical`)
      arePDFsIdentical = false
    }
  }
  return { messages, arePDFsIdentical };
}

const convertPDFtoPNG = async (pdfPath, outputDir) => {
  const options = {
    outputdir: outputDir,
    format: 'png',
    width: 600
  };
  const outputImages = await pdf2img.convert(pdfPath, options)
  for (i = 0; i < outputImages.length; i++) {
    fs.writeFileSync(outputDir + "output" + i + ".png", outputImages[i])
  }
  console.log(outputImages.length)
  return outputImages
}

const compareImages = (image1Path, image2Path) => {
  console.log(image1Path)
  const img1 = PNG.sync.read(fs.readFileSync(image1Path));
  const img2 = PNG.sync.read(fs.readFileSync(image2Path));
  return pixelmatch(img1.data, img2.data, null, img1.width, img1.height, { threshold: 0.1 }) === 0;
}