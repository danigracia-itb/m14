<template>
    <div class="flex flex-wrap flex-grow">
        <PostCard v-for="post in allEntries" :key="post.id" :post="post" />
    </div>
</template>
<script setup>
import PostCard from "../components/PostCard.vue";
// import usePost from "../composables/usePost.js";
// const { posts, llegirPosts } = usePost();
// llegirPosts();

//Importar composable general
import useResource from '../composables/useResource.js'
const {allEntries, fetchAll} = useResource("posts"); //Crear una instancia del composable para tipo posts
fetchAll() //Obtener los posts
</script>
