const ssri = require("ssri");
const fs = require("fs");
const jsonfile = require("jsonfile");

async function generateSRI() {
    const blueprintPath = "./blueprint.json";

    const sriJS = await ssri.fromStream(
        fs.createReadStream("./dist/ui-extension-sdk.js")
    );

    const sriCSS = await ssri.fromStream(
        fs.createReadStream("./dist/ui-extension-sdk.css")
    );

    const blueprint = JSON.parse(fs.readFileSync(blueprintPath));
    blueprint.subresourceIntegrity = {
        js: sriJS.toString(),
        css: sriCSS.toString(),
    };

    jsonfile.writeFile(blueprintPath, blueprint, { spaces: 2 });
}

generateSRI();
