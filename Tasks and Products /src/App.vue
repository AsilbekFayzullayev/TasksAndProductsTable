<script setup>
import { RouterView } from "vue-router";
</script>

<template>
  <Suspense>
    <template #default>
      <div class="app">
        <RouterView />
      </div>
    </template>
    <template #fallback>
      <div>Loading...</div>
    </template>
  </Suspense>
</template>

<style lang="scss">
.app {
  padding: 10px 0;
  width: 1280px !important;
  .header {
    display: flex;
    justify-content: space-between;

    strong{
      font-weight: bold;
    }
  }
  .product-brand-label{
    background-color: #b4bccc;
    font-weight: bold;
    padding: 0 5px;
    border-radius: 5px;
  }
}

</style>
