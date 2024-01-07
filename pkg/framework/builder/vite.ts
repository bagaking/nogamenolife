import fs from 'fs';
import path from 'path';

// genViteConfigs used to generate configs of vite,which are used in the `forge.config.ts` file
// dirPath and configFilename should be set to runtime_folder_path in the specific project
// the file must be the direct child of the given dirPath, and it's name be ends with 'runtime'
// both `.ts` and `.js` file are supported
export function genViteConfigs(dirPath: string, configFilename: string) {
    const resolvedPath = path.resolve(dirPath);
    const files = fs.readdirSync(resolvedPath);
    const jsFiles = files.filter((file) =>
        (path.extname(file) === '.js' || path.extname(file) === '.ts') && path.basename(file, path.extname(file)).endsWith("runtime")
    );

    const confList = jsFiles.map((file) => {
        return {
            entry: path.join(resolvedPath, file),
            config: configFilename,
        };
    });

    console.log("genViteConfigs", confList)
    return confList;
}
