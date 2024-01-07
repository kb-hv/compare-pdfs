# compare-pdfs
A simple web app that takes in two PDF files and compares them page by page (pixel) or line by line (text).

### Instructions to run
1. Clone repo to local system
2. Run ``` npm i ``` in cmd
3. Run ``` node start ``` /  ``` nodemon start ``` to start the app
4. Go to ``` http://localhost:3000/ ``` to compare PDF files
5. You can use the files in the __sample files__ folder to see a demo

### Functions
- Text Comparison
    - Extracts text from the PDFs and performs a line-by-line comparison. The output is two lists: one containing lines exclusive to File 1 and the other with lines exclusive to File 2.
- Pixel by Pixel Comparison
    - Converts each page of the PDFs into images and does a pixel-by-pixel comparison. The output is a page-by-page match result.

### Tech and dependencies
- Frontend - HTML (EJS), Bootstrap
- Backend - Node.js, Express
- Packages used to implement the comparison functionality
   - ``` multer``` for handling file uploads from the form
   - ``` pdf-parse```  to extract text content from the files
   - ``` pdf-img-convert```  to convert pdf files to images
   - ``` pixelmatch```  to compare images pixel by pixel
