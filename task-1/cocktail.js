import path from "path";
import fs from "fs/promises";

const BASE_URL = "https://www.thecocktaildb.com/api/json/v1/1";

function formatDrinkToMarkdown(drink) {
  let markdown = `## ${drink.strDrink}\n\n`;

  markdown += `![${drink.strDrink}](${drink.strDrinkThumb}/medium)\n\n`;

  let isAlcoholic = "No";
  if (drink.strAlcoholic === "Alcoholic") {
    isAlcoholic = "Yes";
  }

  markdown += `**Category**: ${drink.strCategory}\n\n`;
  markdown += `**Alcoholic**: ${isAlcoholic}\n\n`;

  markdown += `### Ingredients\n\n`;

  for (let i = 1; i <= 15; i++) {
    const ingredient = drink["strIngredient" + i];
    const measure = drink["strMeasure" + i];

    if (ingredient !== null && ingredient !== "") {
      let displayMeasure = "";
      if (measure !== null && measure !== "") {
        displayMeasure = measure.trim() + " ";
      }
      markdown += "- " + displayMeasure + ingredient + "\n";
    }
  }

  markdown += `\n### Instructions\n\n${drink.strInstructions}\n\n`;
  markdown += `Serve in: ${drink.strGlass}\n\n`;

  return markdown;
}

export async function main() {
  if (process.argv.length < 3) {
    console.error("Please provide a cocktail name as a command line argument.");
    return;
  }

  const cocktailName = process.argv[2];
  const url = `${BASE_URL}/search.php?s=${cocktailName}`;

  const __dirname = import.meta.dirname;
  const outPath = path.join(__dirname, `./output/${cocktailName}.md`);

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.drinks === null) {
      console.error("No cocktails found with that name.");
      return;
    }

    let markdownContent = "# Cocktail Recipes\n\n";

    for (const drink of data.drinks) {
      markdownContent += formatDrinkToMarkdown(drink);
    }

    await fs.writeFile(outPath, markdownContent);
    console.log(`Markdown file created at: ${outPath}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

if (!process.env.VITEST) {
  main();
}
