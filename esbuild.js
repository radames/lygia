import { build } from 'esbuild';
import { glsl } from 'esbuild-plugin-glsl-include';

build({
    entryPoints: ['lighting/raymarch.js'],
    // outfile: 'build/index.js',
    outdir: 'build',
    bundle: true,
    splitting: true,
    format: 'esm',
    treeShaking: true,
    chunkNames: 'chunks/[name]-[hash]',
    // minify: true,
    plugins: [
        glsl()
    ]
}).catch((err) => {
    console.log(err)
    process.exit(1)
});