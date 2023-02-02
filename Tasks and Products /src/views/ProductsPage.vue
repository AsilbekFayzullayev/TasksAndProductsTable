<template>
  <div class="header">
    <strong>Products</strong>
    <el-button @click="logout" v-if="isHaveToken">Logout</el-button>
    <el-button @click="signIn" v-else>Sign In</el-button>
  </div>
  <el-row :gutter="12" style="padding: 0; margin: 0">
        <el-col :span="6" v-for="item of data" :key="item.id" style="margin-top: 10px">
          <el-skeleton style="width: 240px" :loading="isLoading" animated>
            <template #template>
              <el-skeleton-item variant="image" style="width: 240px; height: 240px" />
              <div style="padding: 14px">
                <el-skeleton-item variant="h3" style="width: 50%" />
                <div
                  style="
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  margin-top: 16px;
                  height: 16px;">
                    <el-skeleton-item variant="text" style="margin-right: 16px" />
                    <el-skeleton-item variant="text" style="width: 30%" />
                </div>
              </div>
            </template>
            <template #default>
              <el-card body-style="padding: 10px" shadow="hover" @click="$router.push(`product/${item.id}`)">
                  <img
                    :src="item.thumbnail"
                    class="image"
                  />
                  <div>
                    <strong style="font-weight: bold">{{ item.title }}</strong>
                  </div>
                  <div>
                    <el-rate
                      v-model="item.rating"
                      disabled
                      show-score
                      text-color="#ff9900"
                      score-template="{value}"
                    />
                  </div>
                  <div>
                    <strong style="font-weight: bold">Price: </strong><span>{{ item.price }} $</span>
                  </div>
                  <small style="float: right;margin-bottom: 10px" class="product-brand-label">{{ item.brand }}</small>
              </el-card>
            </template>
          </el-skeleton>
        </el-col>
      </el-row>
</template>
<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
const router = useRouter()

const isLoading = ref(false)
const data = ref([])
async function getProducts () {
  isLoading.value = true
  try {
    const response = await axios.get(`https://dummyjson.com/products?limit=50`)
    data.value = response.data?.products
  } catch (err) {
    console.log(err);
  }
  isLoading.value = false
}
await getProducts();

const isHaveToken = localStorage.getItem('token')
const logout = () => {
  localStorage.clear()
  window.location.pathname = ('/sign-in')
}
const signIn = () => {
  window.location.pathname = ('/sign-in')
}

</script>
<style scoped lang="scss">

.el-row {
  .el-card {
    &:hover {
      cursor: pointer;
    }
  }
  .image{
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
}
</style>
