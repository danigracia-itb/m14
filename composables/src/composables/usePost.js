import { ref } from "vue";

export default function usePost() {
    const baseURL = "https://jsonplaceholder.typicode.com/posts"
    
    const posts = ref([])
    const post = ref(null)

    /*
        Es una función asyncrona eso nos permite utilizar await, esto quiere decir que 
        esperaremos a que se ejecute X función para seguir ejecutando el código.

        En este caso hasta que no tengamos una respuesta de la API no ejecutaremos la siguiente linea, 
        es decir asignar el valor de la respuesta a posts
    */
    const llegirPosts = async () => {
        const response = await fetch(baseURL);
        posts.value = await response.json();
    };

    //Obtener post especifico
    const llegirPost = async id => {
        const response = await fetch(baseURL + "/" + id)
        post.value = await response.json();
    }

    //Retornar funciones y variables (ref)
    return {
        post,
        posts,
        llegirPosts,
        llegirPost
    }
}
