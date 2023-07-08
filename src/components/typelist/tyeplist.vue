<template>
  <div class="searchList">
    <div class="first"><slot>默认标题</slot></div>
    <div class="content">
      <div
        class="list"
        :style="{
          overflow: 'hidden',
          height: isMore ? 'auto' : '40px',
        }"
      >
        <!-- <div class="last active">不限</div> -->
        <div
          class="item"
          v-for="(item, index) in list"
          :key="item.id"
          @click="itemClick(item, index)"
          :class="index === currentIndex ? 'active' : ''"
        >
          {{ item.name ? item.name : item.value }}
        </div>
      </div>
    </div>
    <div class="more" v-show="!isMore" @click="moreClick">
      <span>更多</span>
      <el-icon><ArrowDown /></el-icon>
    </div>
    <div class="more" v-show="isMore" @click="moreClick">
      <span>收起</span>
      <el-icon><ArrowUp /></el-icon>
    </div>
  </div>
  <el-divider border-style="dashed" class="divider" />
</template>

<script setup>
import { defineProps, ref, defineEmits } from "vue";
const pors = defineProps({
  list: {
    type: Array,
    default: () => [],
  },
  type: {
    type: String,
    default: "",
  },
  currentIndex: {
    type: Number,
    default: 0,
  },
  isMore: {
    type: Boolean,
    default: false,
  },
  moreClick: {
    type: Function,
    default: () => {},
  },
  itemClick: {
    type: Function,
    default: () => {},
  },
});

// 是否展开
let isMore = ref(false);
// 点击展开跟多数据
function moreClick() {
  isMore.value = !isMore.value;
}

//
// 记录活跃
let currentIndex = ref(0);
const emits = defineEmits(["getIdClick"]);
function itemClick(item, index) {
  // console.log(item.id);
  // console.log(pors.type);
  currentIndex.value = index;
  console.log(item);
  emits("getIdClick", { ...item, type: pors.type });
}
</script>
<style lang="less" scoped>
.search-card {
  --el-card-padding: 0px 20px 10px;
}
.searchList {
  display: flex;
  font-size: 14px;

  .first {
    width: 120px;
    margin-top: 10px;
    line-height: 30px;
    color: #909399;
    text-align: left;
  }
  .content {
    display: flex;
    margin-right: 74px;
    width: 890px;
  }
  .list {
    display: flex;
    flex-wrap: wrap;

    .item,
    .last {
      cursor: pointer;
      padding: 5px 10px;
      margin-top: 10px;
      margin-right: 10px;
      line-height: 20px;
      border-radius: 2px;
      color: #303133;
      box-sizing: border-box;

      &:hover {
        color: #fff !important;
        background-color: #3473e6;
      }
    }
  }
}
.more {
  display: flex;
  margin-top: 10px;
  cursor: pointer;
  width: 48px;
  line-height: 30px;
  color: #3473e6;
  .el-icon {
    margin-top: 8px;
  }
}

.divider {
  margin: 12px 0;
}
.active {
  color: #fff !important;
  background-color: #3473e6;
}
</style>
