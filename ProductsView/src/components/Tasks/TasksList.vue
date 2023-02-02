<script setup>
const props = defineProps({
  title: String,
  status: String,
  tasks: Array,
});
const emits = defineEmits(['clickItem'])

const editTask = (data) => {
  emits('clickItem', data)
}

</script>
<template>
  <el-col :span="8">
    <h4>{{ title }} Tasks</h4>
    <div class="tasks-list">
      <el-card
        v-if="status === 'created'"
        shadow="hover"
        class="border-l-primary"
        v-for="taskItem of tasks.filter((item) => item.status === status)"
        :key="taskItem.id"
        @click="editTask(taskItem)"
      >
        <h4>{{ taskItem.title }}</h4>
        <span class="task-label bg-primary"> {{ status }} </span>
      </el-card>
      <el-card
        v-else-if="status === 'failed'"
        shadow="hover"
        class="border-l-danger"
        v-for="taskItem of tasks.filter((item) => item.status === status)"
        :key="taskItem.id"
        @click="editTask(taskItem)"
      >
        <h4>{{ taskItem.title }}</h4>
        <span class="task-label bg-danger"> {{ status }} </span>
      </el-card>
      <el-card
        v-else
        shadow="hover"
        class="border-l-success"
        v-for="taskItem of tasks.filter((item) => item.status === status)"
        :key="taskItem.id"
        @click="editTask(taskItem)"
      >
        <h4>{{ taskItem.title }}</h4>
        <span class="task-label bg-success"> {{ status }} </span>
      </el-card>
    </div>
  </el-col>
</template>
