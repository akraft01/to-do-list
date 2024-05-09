<template>
  <div class="task-list-container">
    <div :class="{ 'task-item': true, 'priority-border': task.priority }" :style="{ backgroundColor: task.color }">
      <input type="checkbox" :checked="task.completed" @change="toggleTask" class="task-checkbox">
      <span :class="{ 'completed': task.completed, 'task-text': true }">{{ task.text }}</span>
      <span class="task-due-date">{{ task.dueDate }}</span>
      <span class="task-category">{{ task.category }}</span>
      <button @click="togglePriority" class="task-button">{{ task.priority ? '★' : '☆' }}</button>
      <button @click="startEdit" class="task-button">Edit</button>
      <button @click="deleteTask" class="task-button task-button-delete">Delete</button>
    </div>
    
    <!-- Editing form (shown only if editing) -->
    <div v-if="editing" class="task-edit-form">
      <input v-model="editTaskText" class="task-input-field" />
      <input v-model="editTaskDueDate" type="date" class="task-input-field" />
      <select v-model="editTaskCategory" class="task-input-field">
        <option>Work</option>
        <option>Personal</option>
        <option>Hobby</option>
        <option>Other</option>
      </select>
      <button @click="saveEdit" class="task-add-button">Save</button>
      <button @click="cancelEdit" class="task-button">Cancel</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['task'],
  data() {
    return {
      editing: false,
      editTaskText: '',
      editTaskDueDate: '',
      editTaskCategory: ''
    };
  },
  methods: {
    toggleTask() {
      this.$emit('toggle-task', this.task.id);
    },
    togglePriority() {
      this.$emit('toggle-priority', this.task.id);
    },
    deleteTask() {
      this.$emit('delete-task', this.task.id);
    },
    startEdit() {
      this.editTaskText = this.task.text;
      this.editTaskDueDate = this.task.dueDate;
      this.editTaskCategory = this.task.category;
      this.editing = true;
    },
    saveEdit() {
      this.$emit('edit-task', {
        id: this.task.id,
        text: this.editTaskText,
        dueDate: this.editTaskDueDate,
        category: this.editTaskCategory
      });
      this.editing = false;
    },
    cancelEdit() {
      this.editing = false;
    }
  }
};
</script>

<style scoped>
.task-list-container {
  margin: 0 auto;
  max-width: 1000px;
}

.task-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.priority-border {
  border: 2px solid rgb(0, 0, 0);
}

.task-checkbox {
  width: 20px;
  margin-right: 15px;
}

.task-text, .task-due-date, .task-category {
  flex: 1;
  margin-right: 15px;
}

.completed {
  text-decoration: line-through;
}

.task-button, .task-button-delete {
  padding: 5px 10px;
  margin-left: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.task-button {
  background-color: #007BFF;
  color: white;
}

.task-button:hover {
  background-color: #0056b3;
}

.task-button-delete {
  background-color: #dc3545;
}

.task-button-delete:hover {
  background-color: #c82333;
}

.task-edit-form {
  display: flex;
  align-items: center;
  margin-top: 10px;
  padding: 10px;
  background-color: #f0f8ff;
  border-radius: 5px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.task-input-field {
  flex: 1;
  margin-right: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.task-add-button {
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 10px;
}

.task-add-button:hover {
  background-color: #218838;
}
</style>
