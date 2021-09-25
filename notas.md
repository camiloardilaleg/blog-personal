---
title: 'Documentacion y dudas'
date: '2021-09-22'
---

# Instalar proyecto NextJs 

```bash
npx create-next-app <nombre-de-proyecto>
```

Esto instala las librerias de **react, react-dom y next**

# Instalar librerias auxiliares

```bash
npm install gray-matter next-mdx-remote
```

`gray-matter`: sirve para recoger/obtener la metainformacion de los archivos markdown

`next-mdx-remote`: Permite parsear markdown, libreria especifica para Next

# Cuando una funcion retorna una promesa

Cuando una funcion retorna una promesa podemos tratarlo de la siguiente manera

1. Utilizamos las palabras clave `async` y `await`

```js
const f_name = async function(param1, param2){
    const resultado = await funcionQueRetornaPromesa(...)
}
```

O tambien podemos utilizar el `.then`

```js
const f_name = function(param1, param2){
    const resultado = funcionQueRetornaPromesa(...).then()
}
```

# Funcion `Reduce`

La funcion reduce tienen un comportamient algo complicado. En principio, principalmente esta funcion se encarga de acumular los resultados de las operaciones en el acumulador (primer parametro) y para ello, se debe utilizar este primer parametro para cualquier operacion

Sin embargo, el uso que hace Carlos Azaustre es bastante interesante, el logra que en cada iteracion del array se devuelva un objeto con los atributos deseasos - la metadata y la ruta -

para ello utiliza la siguiente funcion:

```js
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
    }, [] //pasa como valor inicial un arreglo vacio
    );
};
```
Como vemos, pasa un arreglo vacio y, a partir de el, se van introduciendo en la posicion 0, los demas valores

Otro ejemplo de reduce es:
```js
const arreglo = [1, 10, 100, 1000];
const arr4 = arreglo.reduce(function(a, x){a.push(x + 1); return  a}, [])
```
el cual devuelve el arreglo de numeros sumado una unidad. El anterior codigo tambien puede ser conseguido de la siguiente manera
```js
const arr4 = arreglo.reduce(function(a, x){return [x + 1, ...a]}, [])
```

# NextJs: pasar datos al componente Home({ name_obj })

El framework NextJs tiene una funcion bastante dificil de entender para principiantes. En el modulo `index.js` existe un componente `Home({ posts })` el cual se le pasa un argumento que 
> 1. No tienen como nombre por defecto la palabra clave `props` 
> 2. necesita una funcion llamada `getStaticProps` que se utiliza cuando tenemos que renderizar del lado del servidor para que el cliente solo le lleguen los archivos listos

el codigo de la funcion según la [documentacion](https://nextjs.org/docs/messages/invalid-getstaticprops-value) es el siguiente

```js
export async function getStaticProps(ctx: {
  params?: ParsedUrlQuery
  preview?: boolean
  previewData?: PreviewData
}) {
  return {
    props: { [key: string]: any }
  }
}
```

en nuestro caso la funcion queda de la siguiente manera:

```js
export async function getStaticProps() {
  const posts = await getAllFilesMetadata();
  console.log(posts); 

  return {
    props: { posts },
  };
}
```