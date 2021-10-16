import fs from 'fs/promises'
import path from 'path'
import fg from 'fast-glob'
import { build } from 'esbuild';
import { glsl } from 'esbuild-plugin-glsl-include';


async function init() {
    const glslsFiles = await fg(['./**/*.glsl'], { dot: true })
    const entryPoints = []
    for (const filePath of glslsFiles) {
        let { dir, base, name } = path.parse(filePath)
        if (/^\d/g.test(name) || ['const', 'new'].includes(name)) {
            const parent = dir.split('/')[1]
            name = `${parent}_${name}`
        }
        console.log(name)
        const code = `export { default as ${name} } from './${base}'\n`;
        const jsFilePath = `./${dir}/${name}.js`
        entryPoints.push(jsFilePath)
        await fs.writeFile(jsFilePath, code)

    }

    // // build using esbuild

    build({
        entryPoints: ['./lygia.js', ...entryPoints],
        outdir: 'build',
        bundle: true,
        splitting: true,
        allowOverwrite: true,
        format: 'esm',
        treeShaking: true,
        plugins: [
            glsl()
        ]
    }).catch((err) => {
        console.log(err)
        process.exit(1)
    });


}



init()