<template>
  <el-calendar v-model="value">
    <template slot="dateCell" slot-scope="{date, data}">
      <!--自定义内容-->
      <div @click="add(date)">
        <div class="calendar-day">{{ data.day.split('-').slice(2).join('-') }}</div>
        <div v-for="(item,index) in calendarData" v-bind:key="index">
          <div v-if="(item.months).indexOf(data.day.split('-').slice(1)[0])!=-1">
            <div v-if="(item.days).indexOf(data.day.split('-').slice(2).join('-'))!=-1">
              <el-tooltip class="item" effect="dark" :content="item.things" placement="right">
                <div class="is-selected">{{item.things}}</div>
              </el-tooltip>
            </div>
            <div v-else></div>
          </div>
          <div v-else></div>
        </div>
      </div>
    </template>
  </el-calendar>
</template>
<script>
import { test } from "../api/home";
export default {
  name: "Home",
  data() {
    return {
      calendarData: [
        { months: ["05", "11"], days: ["24"], things: "看电影" },
        { months: ["05", "11"], days: ["24"], things: "去公园野炊" },
        { months: ["05"], days: ["24"], things: "看星星" },
        { months: ["05"], days: ["24"], things: "看月亮" }
      ],
      value: new Date()
    };
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {},
  created() {},
  methods: {
    init() {
      let that = this;
      test().then(response => {
        that.$message(response.data);
      });
    },
    add(item){
      console.log(item);
    }
  }
};
</script>

<style scoped>
.calendar-day {
  text-align: center;
  color: #202535;
  line-height: 30px;
  font-size: 12px;
}
.is-selected {
  color: #f8a535;
  font-size: 10px;
  margin-top: 5px;
}
#calendar
  .el-button-group
  > .el-button:not(:first-child):not(:last-child):after {
  content: "当月";
}
</style>