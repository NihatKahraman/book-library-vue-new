<template>
    <div class="container">
        <div class="row row-cols-1 row-cols-md-2 g-4">
  <div class="col" v-for="item in bookCollection" :key="item.id">
    <div class="card">
      <img src="https://cdn.britannica.com/83/78183-004-345353F4/Stack-books.jpg" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">{{item.Title}}</h5>
        <p class="card-text">Price - {{ item.Price }}</p>
      </div>
    </div>
  </div>
</div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios'

const bookCollection = ref([])


onMounted(() => {
    axios.get("https://localhost:7227/api/books?PageNumber=1&PageSize=3")
    .then((response) => {
        bookCollection.value = response.data;
    })
})
</script>

<style>

</style>