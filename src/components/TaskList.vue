<template>
  <div>
    <TaskInput @task-added="addTask" />
    <div class="task-input">
      <button @click="changeSortKey('dueDate')" class="task-add-button">Sort by Due Date</button>
      <button @click="changeSortKey('priority')" class="task-add-button">Sort by Priority</button>
      <select v-model="selectedCategory" @change="filterByCategory" class="task-add-button">
        <option value="">All Categories</option>
        <option v-for="category in uniqueCategories" :key="category" :value="category">{{ category }}</option>
      </select>
    </div>
    <div v-if="filteredTasks.length === 0" class="task-list-container">No tasks yet. Add one above!</div>
    <div v-else class="task-list-container">
      <TaskItem
        v-for="task in sortedTasks"
        :key="task.id"
        :task="task"
        @toggle-task="toggleTask"
        @delete-task="deleteTask"
        @toggle-priority="togglePriority"
        @edit-task="editTask"
      />
    </div>
  </div>
</template>

<script>
import TaskInput from './TaskInput.vue';
import TaskItem from './TaskItem.vue';

export default {
  components: {
    TaskInput,
    TaskItem
  },
  data() {
    return {
      tasks: [],
      sortKey: 'priority', // default sort key
      selectedCategory: ''
    };
  },
  computed: {
    sortedTasks() {
      return [...this.filteredTasks].sort((a, b) => {
        if (this.sortKey === 'dueDate') {
          return new Date(a.dueDate) - new Date(b.dueDate);
        } else {
          return b.priority - a.priority;
        }
      });
    },
    filteredTasks() {
      if (this.selectedCategory === '') {
        return this.tasks;
      }
      return this.tasks.filter(task => task.category === this.selectedCategory);
    },
    uniqueCategories() {
      return [...new Set(this.tasks.map(task => task.category))];
    }
  },
  methods: {
    addTask(taskText, dueDate, category) {
      const colors = {
        Work: '#FFCCCB',
        Personal: '#CCFFCC',
        Hobby: '#CCCCFF',
        Other: '#FFFF99'
      };

      const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false,
        priority: false,
        dueDate: dueDate,
        category: category,
        color: colors[category] || '#DDDDDD'
      };
      this.tasks.push(newTask);
      this.saveTasksToLocalStorage();
    },
    changeSortKey(key) {
      this.sortKey = key;
    },
    filterByCategory() {
      // This method is intentionally empty; the computed property handles the filtering
    },
    toggleTask(taskId) {
      const task = this.tasks.find(task => task.id === taskId);
      if (task) {
        task.completed = !task.completed;
        this.saveTasksToLocalStorage();
      }
    },
    deleteTask(taskId) {
      this.tasks = this.tasks.filter(task => task.id !== taskId);
      this.saveTasksToLocalStorage();
    },
    togglePriority(taskId) {
      const task = this.tasks.find(task => task.id === taskId);
      if (task) {
        task.priority = !task.priority;
        this.saveTasksToLocalStorage();
      }
    },
    editTask(editedTask) {
      const taskIndex = this.tasks.findIndex(task => task.id === editedTask.id);
      if (taskIndex !== -1) {
        this.tasks.splice(taskIndex, 1, { ...this.tasks[taskIndex], ...editedTask });
        this.saveTasksToLocalStorage();
      }
    },
    saveTasksToLocalStorage() {
      try {
        const serializedTasks = JSON.stringify(this.tasks);
        localStorage.setItem('tasks', serializedTasks);
      } catch (error) {
        console.error('Error saving tasks to localStorage:', error);
      }
    }
  },
  mounted() {
    try {
      const savedTasks = localStorage.getItem('tasks');
      if (savedTasks) {
        this.tasks = JSON.parse(savedTasks);
      }
    } catch (error) {
      console.error('Error loading tasks from localStorage:', error);
    }
  }
};
</script>

<style scoped>
.task-input {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  padding: 10px;
  background-color: #a1bedb;
  border-radius: 5px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  max-width: 450px; /* Adjust the max-width as needed */
  margin: 0 auto; /* Center the container horizontally */
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

.task-list-container {
  margin-top: 20px;
}
</style>
