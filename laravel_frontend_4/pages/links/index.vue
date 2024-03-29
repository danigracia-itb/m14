<script setup lang="ts">
import axios from "axios";
import {TailwindPagination} from "laravel-vue-pagination"

axios.get("/links");
definePageMeta({
  middleware: ["auth"],
});

const loading = ref(true)
const links = ref([])
const page = ref(1)

async function getLinks(pageNumber = 1) {
  const response = await axios.get("/links", {
    params: { page: pageNumber },
  });

  links.value = response.data;

  loading.value = false;
}

onMounted(() => {
  getLinks()
})

watch(page, async (newPage, oldPage) => {
  if (newPage !== oldPage) {
    getLinks(newPage);
  }
});

</script>
<template>
  <div>
    <nav class="flex justify-between mb-4 items-center">
      <h1 class="mb-0">My Links</h1>
      <div class="flex items-center">
        <SearchInput modelValue="" />
        <NuxtLink to="/links/create" class="ml-4">
          <IconPlusCircle class="inline" /> Create New
        </NuxtLink>
      </div>
    </nav>

    <div v-if="!loading">
      <table class="table-fixed w-full">
        <thead>
          <tr>
            <th class="w-[35%]">Full Link</th>
            <th class="w-[35%]">Short Link</th>
            <th class="w-[10%]">Views</th>
            <th class="w-[10%]">Edit</th>
            <th class="w-[10%]">Trash</th>
            <th class="w-[6%] text-center">
              <button><IconRefresh /></button>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="link in links.data">
            <td>
              <a :href="link.full_link" target="_blank">
                {{ link.full_link.replace(/^http(s?):\/\//, "") }}</a
              >
            </td>
            <td>
              <a
                :href="`${useRuntimeConfig().public.appURL}/${link.short_link}`"
                target="_blank"
              >
                {{
                  useRuntimeConfig().public.appURL.replace(
                    /^http(s?):\/\//,
                    ""
                  )
                }}/{{ link.short_link }}
              </a>
            </td>
            <td>{{ link.views }}</td>
            <td>
              <NuxtLink class="no-underline" :to="`/links/${link.id}`"
                ><iconEdit
              /></NuxtLink>
            </td>
            <td>
              <button><IconTrash /></button>
            </td>
            <td></td>
          </tr>
        </tbody>
      </table>
      <TailwindPagination :data="links" @pagination-change-page="page=$event" />
      <div class="mt-5 flex justify-center"></div>
    </div>

    <!-- No links message for when table is empty -->
    <div
      v-else
      class="border-dashed border-gray-500 p-3 border-[1px] text-center"
    >
      <div class="flex justify-center">
        <IconLink />
      </div>
      <p>
        <!-- Show this if reason for no links is none found in search -->
        <span v-if="false"> No links matching links found. </span>

        <!-- Show this if reason for no links is User has none -->
        <span v-else>
          No links created yet
          <NuxtLink to="/links/create" class="text-green-600"
            >Go create your first link!</NuxtLink
          >
        </span>
      </p>
    </div>
  </div>
</template>