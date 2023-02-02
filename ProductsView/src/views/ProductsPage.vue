<template>
  <el-row :gutter="12">
    <el-col :span="24">
      <strong style="font-weight: bold">Products</strong>
      <el-row :gutter="12" style="padding: 5px; align-items: center;">
        <el-input
          v-model="searchingVal"
          style="width: 250px; padding: 0 10px"
          placeholder="Type..."
        />
        <el-button @click="filterProducts">Search</el-button>
      </el-row>
      <el-table :data="data" stripe style="width: 100%">
        <el-table-column label="Name" width="auto">
          <template #default="scope">
            <el-skeleton animated :count="1" v-if="isLoading">
              <template #template>
                <div style="display: flex; align-items: center">
                  <el-skeleton-item variant="image" style="width: 40px; height: 40px" />
                  <el-skeleton-item variant="text" style="width: 100px; margin-left: 5px"/>
                </div>
              </template>
            </el-skeleton>
            <div style="display: flex; align-items: center" v-else>
              <img
                :src="scope.row.thumbnail"
                class="image" />
              <strong style="margin-left: 5px">{{scope.row.title}}</strong>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="brand" label="Brand" width="auto" sortable>
          <template #default="scope">
            <el-skeleton animated :count="1" v-if="isLoading">
              <template #template>
                <div style="display: flex; align-items: center">
                  <el-skeleton-item variant="text" style="width: 80px;"/>
                </div>
              </template>
            </el-skeleton>
            <span v-else>{{scope.row.brand}}</span>
          </template>
        </el-table-column>
        <el-table-column label="In Stock" width="auto">
          <template #default="scope">
            <el-skeleton animated :count="1" v-if="isLoading">
              <template #template>
                <div style="display: flex; align-items: center">
                  <el-skeleton-item variant="text" style="width: 50px;"/>
                </div>
              </template>
            </el-skeleton>
            <span v-else>{{scope.row.stock}}</span>
          </template>
        </el-table-column>
        <el-table-column label="Price">
          <template #default="scope">
            <el-skeleton animated :count="1" v-if="isLoading">
              <template #template>
                <div style="display: flex; align-items: center">
                  <el-skeleton-item variant="text" style="width: 50px;"/>
                </div>
              </template>
            </el-skeleton>
            <span v-else>{{scope.row.price}} $</span>
          </template>
        </el-table-column>
      </el-table>
      <el-row style="align-items: center">
        <span>Total {{totalDataCount}}</span>
        <el-pagination
          background layout="prev, pager, next"
          :page-count="Math.ceil(totalDataCount/limit)" :total="totalDataCount"
          style="margin-left: 5px"
          :default-current-page="currentPage"
          @current-change="(number) => changePage(number)"
        />
      </el-row>
<!--      <el-row :gutter="12" style="padding: 0; margin: 0">-->
<!--        <el-col :span="6" v-for="item of data" :key="item.id">-->
<!--          <el-skeleton style="width: 240px" :loading="isLoading" animated>-->
<!--            <template #template>-->
<!--              <el-skeleton-item variant="image" style="width: 240px; height: 240px" />-->
<!--              <div style="padding: 14px">-->
<!--                <el-skeleton-item variant="h3" style="width: 50%" />-->
<!--                <div-->
<!--                  style="-->
<!--                  display: flex;-->
<!--                  align-items: center;-->
<!--                  justify-content: space-between;-->
<!--                  margin-top: 16px;-->
<!--                  height: 16px;">-->
<!--                    <el-skeleton-item variant="text" style="margin-right: 16px" />-->
<!--                    <el-skeleton-item variant="text" style="width: 30%" />-->
<!--                </div>-->
<!--              </div>-->
<!--            </template>-->
<!--            <template #default>-->
<!--              <el-card body-style="padding: 5px" shadow="hover">-->
<!--                  <img-->
<!--                    :src="item.thumbnail"-->
<!--                    class="image"-->
<!--                  />-->
<!--                  <div>-->
<!--                    <strong style="font-weight: bold">{{ item.title }}</strong>-->
<!--                    <small style="float: right;" class="product-brand-label">brand</small>-->
<!--                  </div>-->
<!--                  <div>-->
<!--                    <el-rate-->
<!--                      v-model="item.rating"-->
<!--                      disabled-->
<!--                      show-score-->
<!--                      text-color="#ff9900"-->
<!--                      score-template="{value}"-->
<!--                    />-->
<!--                  </div>-->
<!--                  <div>-->
<!--                    <strong style="font-weight: bold">Price: </strong><span>{{ item.price }} $</span>-->
<!--                  </div>-->
<!--              </el-card>-->
<!--            </template>-->
<!--          </el-skeleton>-->
<!--        </el-col>-->
<!--      </el-row>-->
    </el-col>
  </el-row>
</template>
<script setup>
import axios from 'axios';
import { ref, watch } from "vue";
const data = ref([])
const totalDataCount = ref(0)
const currentPage = ref(1)
const brandOptions = ref([
  {
    value: 'Apple',
    label: 'Apple'
  },
  {
    value: 'Samsung',
    label: 'Samsung'
  },
  {
    value: 'Huawei',
    label: 'Huawei'
  },
  {
    value: 'Infinix',
    label: 'Infinix'
  },
  {
    value: 'HP Pavilion',
    label: 'HP Pavilion'
  },
  {
    value: 'Microsoft Surface',
    label: 'Microsoft Surface'
  }
])
const isLoading = ref(false)
const searchingVal = ref('')
const limit = ref(12)
const skip = ref(0)


async function getProducts () {
  isLoading.value = true
  try {
    const response = await axios.get(`https://dummyjson.com/products?limit=${limit.value}&skip=${skip.value}`)
    data.value = response.data?.products
    totalDataCount.value = response.data?.total
  } catch (err) {
    console.log(err);
  }
  isLoading.value = false
}
await getProducts();

const filterProducts = async () => {
  isLoading.value = true
  try {
    const response = await axios.get(`https://dummyjson.com/products/search?q=${searchingVal.value}&limit=${limit.value}&skip=${skip.value}`)
    data.value = response.data?.products
    totalDataCount.value = response.data?.total
  } catch (err) {
    console.log(err);
  }
  isLoading.value = false
}

const changePage = (page) => {
  currentPage.value = page
  skip.value = (page-1) * limit.value
}
watch(
  () => currentPage.value, // store value in currentPosts when the posts.value is updated (get data from api)
  async () => {
    if(currentPage.value){
      await getProducts()
    }
  }
)

</script>
<style scoped lang="scss">
.el-row {
  padding: 50px 0;
  width: 1280px !important;

  .image{
    width: 40px;
    height: 40px;
    object-fit: cover;
  }

  .product-brand-label{
    background-color: #b4bccc;
    font-weight: bold;
    padding: 0 5px;
    border-radius: 5px;
  }
}
</style>
