<script setup lang="ts">
import type { RegisterForm } from "../types/"
import type { FormKitNode } from "@formkit/core"
import { useAuth } from "~~/composables/useAuth"

const router = useRouter()

const { register } = useAuth();

definePageMeta({
  layout: "centered",
  middleware: ["guest"]
})


async function handleRegister(payload: RegisterForm, node?: FormKitNode) {
  try {
    await register(payload)
  } catch (error) {
    handleInvalidForm(error, node)
  }
}

</script>
<template>
  <div class="register">
    <h1>Register</h1>
    <FormKit type="form" submit-label="Register" @submit="handleRegister">
      <FormKit label="Name" name="name" type="text" />
      <FormKit label="Email" name="email" type="email" />
      <FormKit label="Password" name="password" type="password" />
      <FormKit label="Confirm Password" name="password_confirmation" type="password" />
    </FormKit>

    <p>
      Already have an account?
      <NuxtLink class="underline text-lime-600" to="/login">Login</NuxtLink>
    </p>
  </div>
</template>