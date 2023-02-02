<script setup>
import { computed, reactive, ref, watch } from "vue";
import TasksHeader from "../components/Tasks/TasksHeader.vue";
import AddTaskDialog from "../components/Tasks/AddTaskDialog.vue";
import TasksList from "../components/Tasks/TasksList.vue";
import {v4 as uuidv4} from 'uuid';

const dialogVisible = ref(false);
const textarea = ref("");
const editingTaskItem = ref({});

const tasksType = reactive({
  items: [{
    status: "created",
    label: "Created",
    },
    {
      status: "failed",
      label: "Failed",
    },
    {
      status: "completed",
      label: "Completed",
    },],
})
let tasksData = reactive({
  items: [{
    id: 1,
    title: 'hey',
    status: 'created'
  }]
})

const getData = computed(() => {
  return tasksData.items
})
const clickAddOrEdit = function (data) {
  const uniqueId = uuidv4()
  if (editingTaskItem.value.id){
      const {id, title, status} = data
      const updatingObj = tasksData.items.find((obj) => obj.id === data.id)
      updatingObj.id = id
      updatingObj.title = title
      updatingObj.status = status
  }else{
    tasksData.items.push({
      id: uniqueId,
      ...data
    })
  }
  closeDialog()
  editingTaskItem.value.id = ''
};

const closeDialog = () => {
  dialogVisible.value = false
  editingTaskItem.value = {}
}

const openDialog = () => {
  dialogVisible.value = true
}
const editTask = (data) => {
  editingTaskItem.value = data
  openDialog()
}

watch(
  () => dialogVisible.value, // store value in currentPosts when the posts.value is updated (get data from api)
  () => {
    if(!dialogVisible.value){
      editingTaskItem.value = {}
    }
  }
)

</script>

<template>
  <el-row :gutter="12">
    <TasksHeader @openDialog="openDialog" />
    <AddTaskDialog
      v-if="dialogVisible"
      v-model="dialogVisible"
      @closeDialog="closeDialog"
      :tasksType="tasksType.items"
      @clickButton="clickAddOrEdit"
      :editingData="editingTaskItem"
    />
    <TasksList
      v-for="(task, index) of tasksType.items"
      :key="index"
      :title="task.label"
      :status="task.status"
      :tasks="getData"
      @clickItem="editTask"
    />
  </el-row>
</template>

<style lang="scss">
.el-row {
  padding: 50px 0;
  width: 1280px !important;
}
.title-colspan {
  display: flex !important;
  justify-content: space-between !important;

  .title {
    font-size: 24px;
    font-weight: bold;
  }
}
.el-card {
  margin-bottom: 10px;
  &:hover{
    cursor: pointer!important;
  }
  .task-label {
    float: right;
    padding: 2px 5px;
    margin-bottom: 5px;
    border-radius: 5px;
    font-size: 12px;
    font-weight: bold;
  }

  .tasks-list {
    height: 80vh !important;
    overflow: auto;
  }
}

.bg-primary {
  background-color: blue;
  color: #ffffff;
}

.bg-danger {
  background-color: red;
  color: #ffffff;
}

.bg-success {
  background-color: green;
  color: #ffffff;
}

.border-l-primary {
  border-left: 3px solid blue !important;
}

.border-l-danger {
  border-left: 3px solid red !important;
}

.border-l-success {
  border-left: 3px solid green !important;
}
</style>
