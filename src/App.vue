<template>
  <div id="app">
  
    <graph ref="graph" style="width:600px; height400px;">
    </graph>
  </div>
</template>

<script>
import Hello from './components/Hello'
import graph from '@/graph';

export default {
  name: 'app',
  components: {
    Hello,
    graph
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
