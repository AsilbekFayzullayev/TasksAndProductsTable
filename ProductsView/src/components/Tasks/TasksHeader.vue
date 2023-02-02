<template>
  <el-col :span="24" class="title-colspan">
    <strong class="title">Tasks</strong>
    <el-button
      type="primary"
      plain size="large"
      @click="$emit('openDialog')">
      Add task</el-button>
  </el-col>
</template>
