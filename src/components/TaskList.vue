<template>
  <div>
    <TaskInput @task-added="addTask" />
    <div class="task-input">
      <button @click="changeSortKey('dueDate')" class="task-add-button">Sort by Due Date</button>
      <button @click="changeSortKey('priority')" class="task-add-button">Sort by Priority</button>
    </div>
    <div v-if="tasks.length === 0" class="task-list-container">No tasks yet. Add one above!</div>
    <div v-else class="task-list-container">
      <TaskItem
        v-for="task in sortedTasks"
        :key="task.id"
        :task="task"
        @toggle-task="toggleTask"
        @delete-task="deleteTask"
        @toggle-priority="togglePriority"
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
      sortKey: 'priority' // default sort key
    };
  },
  computed: {
    sortedTasks() {
      return [...this.tasks].sort((a, b) => {
        if (this.sortKey === 'dueDate') {
          return new Date(a.dueDate) - new Date(b.dueDate);
        } else {
          return b.priority - a.priority;
        }
      });
    }
  },
  methods: {
    addTask(taskText, dueDate, category) {
      const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false,
        priority: false,
        dueDate: dueDate,
        category: category
      };
      this.tasks.push(newTask);
      this.saveTasksToLocalStorage();
    },
    changeSortKey(key) {
      this.sortKey = key;
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
    saveTasksToLocalStorage() {
      const serializedTasks = JSON.stringify(this.tasks);
      localStorage.setItem('tasks', serializedTasks);
    }
  },
  mounted() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      this.tasks = JSON.parse(savedTasks);
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
  max-width: 280px; /* Adjust the max-width as needed */
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
