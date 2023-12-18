<template>
    <div v-if="post && user">
        <h1 class="text-3xl">{{ post.title }}</h1>
        <div class="text-gray-500 mb-10">by {{ user.name }}</div>
        <div>{{ post.body }}</div>
    </div>
</template>
<script setup>
import { useRoute } from "vue-router";
import { onMounted } from "vue";
// import usePost from "../composables/usePost.js";
// import useUser from "../composables/useUser.js";
import useResource from "../composables/useResource.js";

const route = useRoute();

/* OLD VERSION */
// const { post, llegirPost } = usePost();
// const { user, llegirUser } = useUser();

// onMounted(async () => {
//     await llegirPost(route.params.id);
//     await llegirUser(post.value.userId);
// });

/* NEW VERSION */
const { fetchOne: llegirPost, oneEntry: post } = useResource("posts"); //Instancia de useResource para posts
const { fetchOne: llegirUser, oneEntry: user } = useResource("users"); //Instancia de useResource para users

//Obtener la información, usamos onMounted para poder usar await y esperar a tener una respuesta de la API de posts
onMounted(async () => {
    await llegirPost(route.params.id);
    await llegirUser(post.value.userId);
});
</script>
