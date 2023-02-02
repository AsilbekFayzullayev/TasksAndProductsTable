<script setup>
import { useRoute, useRouter } from "vue-router";
import { UserFilled } from '@element-plus/icons-vue'
import axios from "axios";
import { ref } from "vue";

const router = useRouter()
const isLoading = ref(false)
const isShowAlert = ref(false)
const data = ref(null)
const reviews = ref(null)
const textarea = ref('')
const setRating = ref(0)

const route = useRoute()
const {id} = (route.params)
const token = localStorage.getItem('token')
  async function getProducts () {
    isLoading.value = true
    try {
      const response = await axios.get(`https://dummyjson.com/products/${id}`)
      data.value = response.data
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
    isLoading.value = false
  }
  async function getReviews () {
    try {
      const response = await axios.get(`https://dummyjson.com/comments?limit=10&skip=0`)
      reviews.value = response.data?.comments
    } catch (err) {
      console.log(err);
    }
  }
  await getProducts();
  await getReviews();

  const sendComment = () => {
    if (token) {
      isShowAlert.value = true
      textarea.value = ''
    }else {
      alert('You have to Sign In for leaving comment')
    }
  }
  const isHaveToken = localStorage.getItem('token')
  const logout = () => {
    localStorage.clear()
    window.location.pathname = ('sign-in')
  }
  const signIn = () => {
    window.location.pathname = ('sign-in')
  }
</script>

<template>
  <span style="text-align: center" v-if="isLoading">Loading...</span>
  <div class="header">
    <strong>Products</strong>
    <el-button @click="logout" v-if="isHaveToken">Logout</el-button>
    <el-button @click="signIn" v-else>Sign In</el-button>
  </div>
<el-row :gutter="12">
  <el-col :span="12">
    <img :src="data.thumbnail" class="image">
  </el-col>
  <el-col :span="12">
    <h1 class="title">
      {{data.title}}
    </h1>
    <div>{{data.description}}</div>
    <strong class="text-bold product-brand-label">{{data.brand}}</strong>
    <div class="text-bold">{{data.price}} $</div>
    <div class="text-bold">
      <el-rate
        v-model="data.rating"
        disabled
        show-score
        text-color="#ff9900"
        score-template="{value} points"
      />
    </div>
  </el-col>
  <el-col :span="12">
    <h1 class="reviews-title">Reviews</h1>
    <div class="review-list" v-for="item of reviews" :key="item.id">
      <el-avatar :icon="UserFilled" class="image-reviewer"/>
      <div style="margin-left: 20px">
        <h3 class="reviews-title">{{item.user.username}}</h3>
        <span>{{item.body}}</span>
      </div>
    </div>
  </el-col>
  <el-col :span="12">
    <h2>Leave comment about product and rate it.</h2>
    <el-alert type="success" show-icon :closable="false" style="margin: 10px 0" v-if="isShowAlert">
      <p>Message successfully sent!</p>
    </el-alert>
    <div style="display: flex">
      <el-input
        v-model="textarea"
        placeholder="Type..."
        type="textarea"
      />
      <el-button @click="sendComment">
        Submit
      </el-button>
    </div>
    <el-rate
      v-model="setRating"
      show-score
      text-color="#ff9900"
      score-template="{value} points"
    />
  </el-col>
</el-row>
</template>

<style scoped lang="scss">
.el-row{
  margin-top: 50px;
  .image {
    width: 90%;
    height: 450px;
    object-fit: cover;
  }
  .review-list {
    display: flex;
    margin-bottom: 10px;
    .image-reviewer {
      object-fit: cover;
      width: 60px;
      height: 60px;
      border-radius: 50%;
    }
  }
  .reviews-title {
    font-weight: bold;
  }
}

.text-bold {
  font-weight: bold!important;
}
</style>
