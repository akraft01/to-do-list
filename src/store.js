// store.js

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tasks: []
  },
  mutations: {
    addTask(state, newTask) {
      state.tasks.push(newTask);
    },
    deleteTask(state, taskId) {
      state.tasks = state.tasks.filter(task => task.id !== taskId);
    },
    toggleTask(state, taskId) {
      const task = state.tasks.find(task => task.id === taskId);
      if (task) {
        task.completed = !task.completed;
      }
    },
    togglePriority(state, taskId) {
      const task = state.tasks.find(task => task.id === taskId);
      if (task) {
        task.priority = !task.priority;
      }
    },
    loadTasks(state, savedTasks) {
      state.tasks = savedTasks;
    }
  },
  actions: {
    addTask({ commit, dispatch, state }, newTask) {
      commit('addTask', newTask);
      dispatch('saveTasksToLocal');
    },
    deleteTask({ commit, dispatch, state }, taskId) {
      commit('deleteTask', taskId);
      dispatch('saveTasksToLocal');
    },
    toggleTask({ commit, dispatch, state }, taskId) {
      commit('toggleTask', taskId);
      dispatch('saveTasksToLocal');
    },
    togglePriority({ commit, dispatch, state }, taskId) {
      commit('togglePriority', taskId);
      dispatch('saveTasksToLocal');
    },
    saveTasksToLocal({ state }) {
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    loadTasksFromLocal({ commit }) {
      const savedTasks = localStorage.getItem('tasks');
      if (savedTasks) {
        commit('loadTasks', JSON.parse(savedTasks));
      }
    }
  }
});
