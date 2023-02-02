<script setup>
import { ref } from "vue";
const props = defineProps(["tasksType", "editingData"]);
const emits = defineEmits(["clickButton", 'closeDialog']);

const taskContent = ref('');
const taskType = ref('created');
const isLoading = ref(false);

if (props.editingData.id) {
  taskContent.value = props.editingData.title;
  taskType.value = props.editingData.status;
}

const addTask = () => {
  isLoading.value = true
  setTimeout(() => {
    emits('clickButton', { title: taskContent.value, status: taskType.value, id: props.editingData.id  })
    isLoading.value = false
    taskType.value = ''
    taskContent.value = ''
  }, 100)
}
</script>
<template>
  <el-dialog width="30%">
    <template #header>
      <span>Add task aggag</span>
    </template>
    <el-input
      v-model="taskContent"
      :rows="2"
      type="textarea"
      placeholder="Type..."
    />
    <el-select v-model="taskType" size="large" style="margin-top: 10px">
      <el-option
        v-for="item in tasksType"
        :key="item.status"
        :label="item.label"
        :value="item.status"
      />
    </el-select>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="$emit('closeDialog')">Cancel</el-button>
        <el-button type="primary" @click="addTask" :loading="isLoading" :disabled="!taskType || !taskContent">
           {{ editingData.id ? 'Edit' : 'Add'}}
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
