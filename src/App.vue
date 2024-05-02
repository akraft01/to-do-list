<template>
  <div id="app">
    <h1>My To-Do List</h1>
    <TaskList />
  </div>
</template>

<script>
import TaskList from './components/TaskList.vue';

export default {
  name: 'App',
  components: {
    TaskList
  }
};
</script>

<style>
#app {
  font-family: Arial, sans-serif;
  text-align: center;
  margin-top: 30px;
  
}
body {
  background-color: #ddedfa;
}
</style>
