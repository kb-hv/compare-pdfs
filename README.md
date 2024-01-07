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

### Demo
https://github.com/kb-hv/compare-pdfs/assets/69793895/124e40b3-30ef-4e44-a20b-e75b03aa3ece

In Demo -
- Scenario 1 - Different files (Set 1), text comparison
- Scenario 2 - Different files (Set 1), pixel comparison
- Scenario 3 - Same file, text comparison
- Scenario 4 - Same file, pixel comparison
- Scenario 5 - Different files (Set 2), text comparison
- Scenario 6 - Different files (Set 2), pixel comparison
