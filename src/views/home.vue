<template>
  <div id="mainDiv">
    <el-calendar v-model="value">
      <!-- <template slot="dateCell" slot-scope="{date, data}">
        <div @click="add(date,day)">
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
      </template>-->
      <!-- <template slot="dateCell" slot-scope="{date, data}"> -->
      <template v-slot:dateCell="{date, data}">
        <div>
          <div class="calendar-day">
            {{ data.day.split('-').slice(2).join('-') }}
            <el-button type="primary" icon="el-icon-plus" circle @click.stop="add(data.day)"></el-button>
          </div>
          <div v-for="(item,index) in calendarData" v-bind:key="index">
            <div v-if="data.day==item.time">
              <!-- <div class="is-selected">{{item.time}}</div> -->
              <div
                :class="[item.type==1?'is-finished':'is-unfinished']"
                class="is-selected"
                @click="update(item)"
                @mouseover="item.showi=true"
                @mouseout="item.showi=false"
              >
                <!-- {{item.thing}} -->
                <i>{{item.thing}}</i>
                <i
                  v-show="item.showi&&item.type==0"
                  class="el-icon-check"
                  @click.stop="operate(item,1)"
                ></i>
                <i
                  v-show="item.showi&&item.type==1"
                  class="el-icon-close"
                  @click.stop="operate(item,0)"
                ></i>
                <i v-show="item.showi" class="el-icon-delete" @click.stop="operate(item,2)"></i>
              </div>
            </div>
          </div>
        </div>
      </template>
    </el-calendar>

    <el-dialog title="事件" :visible.sync="dialogFormVisible" width="30%">
      <el-form :model="form" :label-width="formLabelWidth" label-position="right">
        <el-row>
          <el-col :span="16">
            <el-form-item label="活动名称">
              <el-input v-model="form.thing" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <el-form-item>
          <el-radio v-model="form.type" label="0">未完成</el-radio>
          <el-radio v-model="form.type" label="1">已完成</el-radio>
        </el-form-item>-->
        <el-row>
          <el-col :span="16">
            <el-form-item label="是否完成">
              <el-radio-group v-model="form.type" size="medium">
                <el-radio :label="0">未完成</el-radio>
                <el-radio :label="1">已完成</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addSure">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { test } from "../api/home";
import { add, del, update, getCurr } from "../api/calendar";
export default {
  name: "Home",
  data() {
    return {
      // calendarData: [
      //   { months: ["05", "11"], days: ["24"], things: "看电影" },
      //   { months: ["05", "11"], days: ["24"], things: "去公园野炊" },
      //   { months: ["05"], days: ["24"], things: "看星星" },
      //   { months: ["05"], days: ["24"], things: "看月亮" }
      // ],
      calendarData: [],
      value: new Date(),
      dialogFormVisible: false,
      form: {},
      formLabelWidth: "120px"
    };
  },
  mounted() {
    this.init();
    this.refreshCalendarData();
    // this.$nextTick(() => {
    //   // 点击前一个月
    //   let prevBtn = document.querySelector(
    //     ".el-calendar__button-group .el-button-group>button:nth-child(1)"
    //   );
    //   prevBtn.addEventListener("click", () => {
    //     console.log(
    //       this.value.getFullYear() + "-" + (this.value.getMonth() + 1)
    //     );
    //   });
    // });

    // this.$nextTick(() => {
    //   // 点击后一个月
    //   let prevBtn = document.querySelector(
    //     ".el-calendar__button-group .el-button-group>button:last-child"
    //   );
    //   prevBtn.addEventListener("click", () => {
    //     console.log(
    //       this.value.getFullYear() + "-" + (this.value.getMonth() + 1)
    //     );
    //   });
    // });

    // this.$nextTick(() => {
    //   // 点击今天
    //   let prevBtn = document.querySelector(
    //     ".el-calendar__button-group .el-button-group>button:nth-child(2)"
    //   );
    //   prevBtn.addEventListener("click", () => {
    //     console.log(
    //       this.value.getFullYear() + "-" + (this.value.getMonth() + 1)
    //     );
    //   });
    // });

    this.$nextTick(() => {
      // 点击今天
      let prevBtn = document.querySelector(
        ".el-calendar__button-group .el-button-group"
      );
      prevBtn.addEventListener("click", () => {
        this.refreshCalendarData();
        console.log(
          this.value.getFullYear() + "-" + (this.value.getMonth() + 1)
        );
      });
    });
  },
  beforeDestroy() {},
  created() {},
  methods: {
    init() {
      // let that = this;
      // test().then(response => {
      //   that.$message(response.data);
      // });
    },
    operate(item, type) {
      if (type == 0) {
        item.type = 0;
      } else if (type == 1) {
        item.type = 1;
      } else if (type == 2) {
        del(item.id).then(response => {
          this.refreshCalendarData();
        });
        return;
      }
      add(item).then(response => {
        // that.$message(response.data);
        this.refreshCalendarData();
      });
    },
    add(day) {
      // console.log(item);
      let that = this;
      that.dialogFormVisible = true;
      that.form = {
        time: null,
        thing: "",
        type: 0
      };
      that.form.time = day;
    },
    addSure() {
      let that = this;
      that.dialogFormVisible = false;
      add(that.form).then(response => {
        // that.$message(response.data);
        that.refreshCalendarData();
      });
    },
    refreshCalendarData() {
      let that = this;
      let year = that.value.getFullYear();
      let month = that.value.getMonth() + 1;
      let param = { year: year, month: month };
      getCurr(param).then(response => {
        //   that.calendarData=[
        //   { months: ["05", "11"], days: ["24"], things: "看电影" },
        //   { months: ["05", "11"], days: ["24"], things: "去公园野炊" },
        //   { months: ["05"], days: ["24"], things: "看星星" },
        //   { months: ["05"], days: ["24"], things: "看月亮" }
        // ];
        that.calendarData = response.data;
      });
    },
    update(item) {
      let that = this;
      that.dialogFormVisible = true;
      that.form = item;
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

.calendar-day .el-button {
  float: right;
  margin-top: 5px;
}
.is-finished {
  color: #136af1;
}
.is-unfinished {
  color: #f8a535;
}

.is-selected {
  /* color: #f8a535; */
  font-size: 10px;
  margin-top: 5px;
  text-align: left;
}

.is-selected i {
  margin-left: 10px;
}

#calendar
  .el-button-group
  > .el-button:not(:first-child):not(:last-child):after {
  content: "当月";
}

.el-button.is-circle {
  border-radius: 50%;
  padding: 0px;
}

#mainDiv {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
/* #app {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
} */
.el-calendar-table__row {
  height: 100px;
}
/* html,
body {
  height: 100%;
  width: 100%;
  border: hidden;
  overflow: hidden;
} */
</style>