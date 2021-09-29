import styles from '../styles/Home.module.css';
import { MDXRemote } from "next-mdx-remote"; // Esta herramienta convierte el codigo en `source` en codigo JSX para despues convertirlo a HTML
import { getFileBySlug, getFiles } from "../lib/mdx"

//componentes propios creador para ser renderizados con MDXComponents
import MDXComponents from "../components/MDXComponents";
import Layout from "../components/Layout";

export default function Post({ source, frontmatter }){
    return(
        <Layout>
            <div className={styles.espaciado_left}>
                <MDXRemote {...source} components={MDXComponents}/> {/* aqui convierte el codigo de source a LOS COMPONENTES */}
            </div>
        </Layout>
    ) 
}

/* En este momento, cualquier direccion que tipeemos da como resultado `Post` */

/* Ahora bien, necesitamos obtener source y frontmatter, para eso utilizamos getStaticProps */

export async function getStaticProps( {params} ){
    // console.log(params.slug)
    //console.log('esto se ejecuta getStaticProps')
    //console.log(params, params.slug)
    const { source, frontmatter } = await getFileBySlug(params.slug);

    return {
        props: { source, frontmatter }
    };
}

export async function getStaticPaths(){
    /* Esta funcion se ejecuta automaticamente cada vez que visitamos una ruta, y una vez recupera la informacion
    la guarda en params, que es el argumento que recibe getStaticProps */

    //console.log('esto se ejecuta getStaticPath')
    const posts = await getFiles(); //devuelve el nombre de los ficheros con la terminacion mdx
    const paths = posts.map(function(post){
        return {params: {
            slug: post.replace(/\.mdx|\.md/, '')
        }}
    });

    return {
        paths,
        fallback: false, // si no encuentra la ruta devuelve un error 404
    }

}