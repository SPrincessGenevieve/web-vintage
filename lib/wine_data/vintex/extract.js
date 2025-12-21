const fs = require("fs");
const path = require("path");

// 1. We need to point to your data file (vintex.ts or vintex.ts)
// If your file is vintex.ts, you may need to temporarily rename it to .js
// or paste the "export const Wine1..." code directly into this file.
const folderPath = "./";

// This function mimics your loop logic to find all Wine1, Wine2... objects
function getLwin11FromFiles() {
  const lwinList = [];

  // Since your data is likely exported in a file in this folder:
  // We will read the file 'vintex.ts' (or whichever file has the Wine objects)
  const dataFile = path.join(__dirname, "vintex.ts");

  // If you are using TypeScript (.ts), Node cannot 'require' it.
  // QUICKEST FIX: Copy/Paste your 'wineVintex' logic here or
  // run this in the browser console.

  // BUT, if you want to run it via NODE:
  try {
    const Wines = require("./vintex.ts"); // Ensure vintex.ts exists

    // This is the logic from your snippet
    const wineVintex = Object.fromEntries(
      Array.from({ length: 80 }, (_, i) => {
        const index = i + 1;
        return [index.toString(), Wines[`Wine${index}`]];
      })
    );

    // Extract the IDs
    Object.values(wineVintex).forEach((wine) => {
      if (wine && wine.results) {
        wine.results.forEach((item) => {
          if (item.lwin11) lwinList.push(item.lwin11);
        });
      }
    });

    return lwinList;
  } catch (e) {
    console.error(
      "Make sure your data file is named 'vintex.ts' and uses 'module.exports' instead of 'export const'"
    );
    return [];
  }
}

const results = getLwin11FromFiles();

if (results.length > 0) {
  fs.writeFileSync("lwin11_list.json", JSON.stringify(results, null, 2));
  console.log(`Successfully extracted ${results.length} LWIN11 codes!`);
}
