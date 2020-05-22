<template>
  <el-calendar v-model="value"></el-calendar>
</template>
<script>
import {test} from '../api/home';
export default {
  name: "Home",
  data() {
    return {
      value: new Date()
    };
  },
  mounted() {this.init()},
  beforeDestroy() {},
  created() {
    
  },
  methods:{
    init(){
      let that=this;
      test().then(response=>{
        that.$message(response.data);
      });
    }
  }
};
</script>

<style scoped>
</style>