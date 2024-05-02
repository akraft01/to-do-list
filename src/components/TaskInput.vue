<template>
  <div class="task-list-container">
    <div class="task-input">
      <input v-model="newTaskText" placeholder="New task" class="task-input-field"/>
      <input v-model="newTaskDueDate" type="date" placeholder="Due date (YYYY-MM-DD)" class="task-input-field"/>
      <select v-model="newTaskCategory" class="task-input-field"> <!-- select for category -->
        <option disabled value="">Please select a category</option>
        <option>Work</option>
        <option>Personal</option>
        <option>Other</option>
      </select>
      <button @click="addTask" class="task-add-button">Add task</button>
    </div>
    
  </div>
</template>

<script>
export default {
  
  data() {
    return {
      newTaskText: '',
      newTaskDueDate: '',
      newTaskCategory: '' // data property for category
    };
  },
  methods: {
    addTask() {
      this.$emit('task-added', this.newTaskText, this.newTaskDueDate, this.newTaskCategory); // emit category
      this.newTaskText = '';
      this.newTaskDueDate = '';
      this.newTaskCategory = ''; // reset category
    }
  },
};
</script>


<style scoped>
.task-list-container {
  margin: 0 auto; /* Center the container horizontally */
  max-width: 1000px; /* Set the maximum width */
  width: 100%; /* Ensure full width within parent */
}

.task-input {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  padding: 10px;
  background-color: #a1bedb;
  border-radius: 5px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
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
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.task-add-button:hover {
  background-color: #0056b3;
}
</style>