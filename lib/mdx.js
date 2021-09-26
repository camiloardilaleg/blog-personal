import path from 'path' // trabaja con las rutas
import fs from 'fs' // filesystem: leer ficheros del sistema
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';

const root = process.cwd();

// funciones que nos permiten convertir los ficheros en mdx to html
export const getFiles = () => {
    // lee los ficheros de la carpeta 'data'
    const re = fs.readdirSync(path.join(root, 'data'));
    //console.log(re);
    return re;
};

export const getFileBySlug = async (slug) => {
    // lee el contenido de los files.mdx en path-pwd/data/*.mdx
    const mdxSource = await fs.readFileSync(
        path.join(root, 'data', `${slug}.mdx`),
        'utf-8'
    );
    // console.log(mdxSource)
    // extrae el contenido y lo coloca en metadata (data) y contenido (content)
    const { data, content} = await matter(mdxSource);
    const source = await serialize(content, {}) // las "{}" se refiere a las opciones de renderizado

    return {
        source,
        frontmatter: {
            slug,
            ...data
        }
    }
};

export const getAllFilesMetadata = () => {
    const files = getFiles(); //devuelve un array
    return files.reduce((allPosts, postSlug) => {
        // toma la lista de rutas y las lee una por una
        const mdxSource = fs.readFileSync(path.join(root, 'data', postSlug));
        //toma solamente la metadata
        const { data } = matter(mdxSource);

        //retorna la metadata deglosada (spread operador), la ruta sin el mdx y todos los post
        return [
            {
                ...data,
                slug: postSlug.replace('.mdx', '')
            },
            ...allPosts
        ]
    }, []
    );
};