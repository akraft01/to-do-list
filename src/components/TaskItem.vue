<template>
  <div class="task-list-container">
    <div class="task-item">
      <input type="checkbox" :checked="task.completed" @change="toggleTask" class="task-checkbox">
      <span :class="{ 'completed': task.completed, 'priority': task.priority, 'task-text': true }">{{ task.text }}</span>
      <span class="task-due-date">{{ task.dueDate }}</span>
      <span class="task-category">{{ task.category }}</span>
      <button @click="togglePriority" class="task-button">{{ task.priority ? 'Unmark as Priority' : 'Mark as Priority' }}</button>
      <button @click="deleteTask" class="task-button task-button-delete">Delete</button>
    </div>
  </div>
</template>

<script>
export default {
  
  props: ['task'],
  methods: {
    toggleTask() {
      this.$emit('toggle-task', this.task.id);
    },
    togglePriority() {
      this.$emit('toggle-priority', this.task.id);
    },
    deleteTask() {
      this.$emit('delete-task', this.task.id);
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
  align-items: center; /* align items vertically */
  margin-bottom: 10px;
  padding: 10px;
  background-color: #a1bedb;
  border-radius: 5px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  
}

.task-checkbox {
  width: 20px; /* fixed width for checkbox */
  margin-right: 15px;
}

.task-text, .task-due-date, .task-category {
  flex: 1; /* distribute remaining space equally */
  margin-right: 15px;
}

.completed {
  text-decoration: line-through;
}

.priority {
  font-weight: bold;
  color: red;
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
</style>
