<script setup lang="ts">
import { TailwindPagination } from "laravel-vue-pagination"
import { useLinks } from "~~/composables/useLinks";

definePageMeta({
  middleware: ["auth"],
});

const queries = ref({
  page: 1,
  sort: "",
  "filter[full_link]": "",
  ...useRoute().query,
})

const { data, index: getLinks, destroy } = useLinks({ queries });


async function handleDelete(id: number) {
  await destroy(id);
  if (data.value) {
    data.value.data = data.value?.data.filter(link => link.id != id);
  }
}

watch(queries, async () => {
  useRouter().push({ query: queries.value })
},
  { deep: true })

onMounted(() => {
  getLinks()
})


</script>
<template>
  <div>
    <nav class="flex justify-between mb-4 items-center">
      <h1 class="mb-0">My Links</h1>
      <div class="flex items-center">
        <SearchInput v-model="queries['filter[full_link]']" />
        <NuxtLink to="/links/create" class="ml-4">
          <IconPlusCircle class="inline" /> Create New
        </NuxtLink>
      </div>
    </nav>

    <div v-if="!loading">
      <table class="table-fixed w-full">
        <thead>
          <tr>
            <TableTh v-model="queries.sort" name="full_link" class="w-[29%]">Full Link</TableTh>
            <TableTh v-model="queries.sort" name="short_link" class="w-[29%]">Short Link</TableTh>
            <TableTh v-model="queries.sort" name="views" class="w-[29%]">Views</TableTh>
            <th class="w-[10%]">Edit</th>
            <th class="w-[10%]">Trash</th>
            <th class="w-[6%] text-center">
              <button @click="getLinks()">
                <IconRefresh />
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="link in data?.data" :key="link.id">
            <td :title="`created ${useTimeAgo(link.created_at).value}`">
              <a :href="link.full_link" target="_blank">
                {{ link.full_link.replace(/^http(s?):\/\//, "") }}</a
              >
            </td> 
            <td>
              <a :href="`${useRuntimeConfig().public.appURL}/${link.short_link}`" target="_blank">
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
              <button @click="handleDelete(link.id as number)">
                <IconTrash />
              </button>
            </td>
            <td></td>
          </tr>
        </tbody>
      </table>
      <TailwindPagination :data="{ ...data }" @pagination-change-page="queries.page = $event" />
      <div class="mt-5 flex justify-center"></div>
    </div>

    <!-- No links message for when table is empty -->
    <div v-else class="border-dashed border-gray-500 p-3 border-[1px] text-center">
      <div class="flex justify-center">
        <IconLink />
      </div>
      <p>
        <!-- Show this if reason for no links is none found in search -->
        <span v-if="false"> No links matching links found. </span>

        <!-- Show this if reason for no links is User has none -->
        <span v-else>
          No links created yet
          <NuxtLink to="/links/create" class="text-green-600">Go create your first link!</NuxtLink>
        </span>
      </p>
    </div>
  </div>
</template>