import fs from 'fs/promises'
import path from 'path'
import fg from 'fast-glob'
import { build } from 'esbuild';
import { glsl } from 'esbuild-plugin-glsl-include';


async function init() {
    const glslsFiles = await fg(['./**/*.glsl'], { dot: true })
    const baseLygia = new Map()
    const entryPoints = []
    for (const filePath of glslsFiles) {
        let { dir, base, name } = path.parse(filePath)
        if (/^\d/g.test(name) || ['const', 'new'].includes(name)) {
            const parent = dir.split('/')[1]  || dir.split('/')[0]
            name = `${parent}_${name}`
        }
        if (!baseLygia.get(dir)) {
            baseLygia.set(dir, [])
        }
        baseLygia.get(dir).push({
            module: name,
            path: `${name}.js`
        })

        const code = `export { default as ${name} } from './${base}'\n`;
        const jsFilePath = `./${dir}/${name}.js`
        entryPoints.push(jsFilePath)
        await fs.writeFile(jsFilePath, code)

    }
    for (const [dir, files] of baseLygia) {
        // console.log(dir, files)
        let code = ""
        for(const file of files) {
            code += `import { ${file.module} } from './${file.path}'\n`
        }
        code += `export default { ${files.map(file => file.module).join(', ')} }\n`

        const jsFilePath = `./${dir}/index.js`

        await fs.writeFile(jsFilePath, code)

    }
    const dirs = new Set([...baseLygia.keys()].map(dir => dir.split('/')[0]))
    let code = ""
    for (const dir of dirs) {

        code += `export { default as ${dir} } from './${dir}/index.js'\n`
    }    // // build using esbuild
    await fs.writeFile('./lygia.js', code)

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