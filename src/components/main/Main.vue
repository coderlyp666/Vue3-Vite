<template>
  <div class="main">
    <el-card class="box-card">
      <div class="search">
        <div class="left">
          <img
            class="img"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAVCAYAAABc6S4mAAAABHNCSVQICAgIfAhkiAAAAUhJREFUOE/tlL9Kw1AYxc9JCyIodLKLID5Bi6MI/kFdipgOtmP7JtY3SUd1aKR1UdEO4ijtE4jgUqeCgghJjyRaiMQ0qVJcmuly8/vOuTn3y0ckeMyGMjPpQUVE1cMpWO+OUbeL7MeVcxRQasoE3ApJ8ydOkk0jZR0XeBalEzI4OFeeGlQgVElk4k7ovZfQB2GJRv20wE6wxjcIRkAgn0Q0ihHQCUbIcsuxAe7/RTTSzIuw3HI1CfGhZugOSk23RuLwK9ujk71UzVuPux8yuO4pR8C8un8rPvWcnN+OjvvIgR58M4PLSqeWRu0vZtPd7ZXZhgB7K8uuzw6dbp7ldY51cfuCy7vXX6W2szqH3bV5T7W6ucD61CAU4zSi2M7634gm/qMNv3/ckRDFfxsVQSg26ISABH+O8VNc6wA3EtYmxNQW2Z74uP4A+kAQbn8IYmUAAAAASUVORK5CYII="
            alt=""
          />
          <div class="text">资源大厅</div>
        </div>
        <div class="right">
          <!-- 搜索框 -->
          <el-input
            v-model="searchKeywords"
            placeholder="请输入用户名称和资源名称"
            class="input-with-select"
            style="width: 550px"
            size="large"
          >
            <template #append>
              <el-button
                icon="Search"
                type="primary"
                size="large"
                @click="searchBtn"
                >搜索</el-button
              >
            </template>
          </el-input>
        </div>
      </div>
      <el-tabs model-value="first" class="demo-tabs">
        <el-tab-pane label="服务" name="first">
          <el-card class="search-card">
            <!--服务类型  -->
            <TypeList :list="TechnologList" @get-id-click="getIdClick">
              <template #default>服务类型</template>
            </TypeList>
            <TypeList :list="childrenList" v-if="childrenList.length">
              <template #default>二级菜单</template>
            </TypeList>
            <!--技术领域  -->
            <TypeList
              :list="severList"
              type="技术领域"
              @get-id-click="getIdClick"
            >
              <template #default>技术领域</template>
            </TypeList>
            <!--数据来源  -->
            <TypeList :list="dataList" @get-id-click="getIdClick">
              <template #default>数据来源</template>
            </TypeList>
            <!--地区  -->
            <TypeList :list="cityData">
              <template #default>地区</template>
            </TypeList>
          </el-card>
        </el-tab-pane>
      </el-tabs>

      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="title" label="服务名称" width="300px">
          <template #default="scope">
            <div
              style="
                margin-left: 6px;
                font-weight: 700;
                font-size: 16px;
                color: #000;
                padding: 15px 10px;
              "
            >
              {{ scope.row.title }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="orgName" label="发布用户" width="300px">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <img
                style="width: 40px; height: 40px"
                v-if="scope.row.avatarUrl"
                :src="scope.row.avatarUrl"
                alt=""
              />
              <img
                style="width: 40px; height: 40px"
                v-else
                src="https://test.nttcc.com.cn/_nuxt/img/default_avatar.442622a.png"
                alt=""
              />

              <span
                style="
                  margin-left: 6px;
                  font-weight: 700;
                  font-size: 16px;
                  color: #000;
                "
              >
                {{ scope.row.orgName }}</span
              >
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="serviceTypeName" label="服务类型" />
        <el-table-column prop="totalDeal" label="成功成交数">
          <template #default="scope">
            <span
              style="
                margin-left: 6px;
                font-weight: 700;
                font-size: 16px;
                color: #f1b221;
              "
            >
              {{ scope.row.totalDeal }}</span
            >
          </template>
        </el-table-column>
        <el-table-column prop="avgScore" label="信用评价">
          <template #default="scope">
            <span
              style="
                margin-left: 6px;
                font-weight: 700;
                font-size: 16px;
                color: #3473e6;
              "
            >
              {{ scope.row.avgScore }}</span
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="demo-pagination-block">
        <el-pagination
          v-model:current-page="pageNum"
          v-model:page-size="lastPage"
          small="small"
          :background="true"
          layout="prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          @next-click="nextClick"
          @prev-click="PrevClick"
        />
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import {
  getList,
  getLadderList,
  getAddrList,
} from "../../servers/search/index";
import cityData from "../../servers/citydata/citydata";
import TypeList from "../typelist/tyeplist.vue";

// 获取技术领域数据
let TechnologList = ref([]);
getLadderList().then(res => {
  TechnologList.value = res.data.data;
  TechnologList.value.unshift({ name: "不限" });
});

// 获取服务类型
let severList = ref([]);
getList().then(res => {
  severList.value = res.data.data.list;
  severList.value.unshift({ name: "不限" });
});

// 搜索关键字
let searchKeywords = ref("");

// 搜索
function searchBtn() {
  FetchAddrList(pageNum, "", searchKeywords.value);
}

// 省份数据列表
let cityDataList = ref([]);
cityDataList.value = cityData;
cityDataList.value.unshift({ value: "不限" });

// 数据来源列表
let dataList = reactive([
  { name: "不限", id: "" },
  { name: "共创云", id: "", dataOrigin: "nttcc" },
  { name: "科惠网", id: "", dataOrigin: "51kehui" },
  { name: "江西省网上常设技术市场", id: "", dataOrigin: "jxstc" },
  { name: "潇湘科技要素大市场", id: "", dataOrigin: "hntpe" },
]);

// 表格数据
let tableData = ref([]);

let total = ref(0);
let pageNum = ref(1);
let lastPage = ref(0);

function FetchAddrList(
  pageNum,
  id = "",
  id2 = "",
  keywords = "",
  dataOrigin = ""
) {
  console.log("1");
  getAddrList(pageNum.value, id, keywords, id2, dataOrigin).then(res => {
    total.value = res.data.data.total;
    pageNum.value = res.data.data.pageNum;
    lastPage.value = 10;
    tableData.value = res.data.data.list;
  });
}
FetchAddrList(pageNum);
function nextClick() {
  FetchAddrList(pageNum);
}

// https://service.test.nttcc.com.cn/api/v1/service/list?pageNum=1&pageSize=10&keywords=&serviceTypeId=097bcb6e056b65e386f5003fdbf0f1a9&serviceTypeId2=&technicalId=&province=&dataOrigin=&logicStatus=1
function PrevClick() {
  FetchAddrList(pageNum);
}
// 当前页面发生改变
function handleCurrentChange() {
  FetchAddrList(pageNum);
}

function handleSizeChange() {
  FetchAddrList(pageNum);
}

const childrenList = ref([]);
function getIdClick(item) {
  console.log(item);
  childrenList.value = item.children;
  // if (childrenList?.value[0]?.name !== "不限") {
  //   childrenList.value.unshift({ name: "不限" });
  // }

  if (item.id === "") {
    // FetchAddrList(pageNum.value, "", "", "", item.dataOrigin);
    getAddrList(pageNum.value, "", "", "", item.dataOrigin).then(res => {
      total.value = res.data.data.total;
      pageNum.value = res.data.data.pageNum;
      lastPage.value = 10;
      tableData.value = res.data.data.list;
    });
  } else if (item.type === "技术领域") {
    console.log("item.id");
    getAddrList(pageNum.value, "", item.id).then(res => {
      total.value = res.data.data.total;
      pageNum.value = res.data.data.pageNum;
      lastPage.value = 10;
      tableData.value = res.data.data.list;
    });
  } else {
    const id = item.id;
    FetchAddrList(pageNum, item.id);
  }
}
</script>
<style lang="less" scoped>
.main {
  width: 1200px;
  margin: 0 auto;

  .box-card {
    width: 100%;
    padding: 20px;
  }

  .search {
    display: flex;
    justify-content: space-between;

    .left {
      display: flex;
      align-items: center;

      .img {
        width: 24px;
        height: 21px;
        margin-right: 10px;
      }

      .text {
        font-size: 16px;
        font-weight: 700;
        line-height: 22px;
        color: #303133;
      }
    }

    .right {
      .el-input {
        width: 200px;
      }
    }
  }

  // .demo-tabs {
  //   background-color: rgb(246, 247, 248);
  //   padding: 14px 6px;
  // }
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
}
.divider {
  margin: 12px 0 24px 0;
}
.active {
  color: #fff !important;
  background-color: #3473e6;
}

.demo-pagination-block {
  .el-pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
  }
}

.el-table {
  .el-table-column {
    height: 80px;
    font-weight: 700;
  }
}
</style>
