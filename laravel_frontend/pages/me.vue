<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";

const userInfo = ref({ name: "", email: "" });

const getUserInfo = async () => {
  let resUserInfo;
  try {
    resUserInfo = await axios.get("/user");
    userInfo.value = resUserInfo.data;
  } catch (e) {
    console.log(`Ha ocurrido un error: ${e}`);
  }
  console.log(resUserInfo);
};

onMounted(() => getUserInfo())
</script>
<template>
  <div v-if="userInfo">
    <p><strong>User Name:</strong>{{ userInfo.name }}</p>
    <p><strong>User Email:</strong>{{ userInfo.email }}</p>
  </div>
</template>
