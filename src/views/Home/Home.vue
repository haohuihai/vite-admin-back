<template>
  <div class="height-100vh">
    <div class="input-search">
      <ElInput v-model="input" placeholder="请输入你想搜的">
        <template #suffix>搜索</template>
      </ElInput>
    </div>
    <div class="container-box">
      <ElSkeleton
        style="width: 210px; margin-right: 20px"
        :loading="loading"
        animated
        v-for="i in 5"
        :key="i"
      >
        <template #template>
          <ElSkeletonItem variant="image" style="height: 190px" />
          <div style="padding: 14px 0">
            <ElSkeletonItem variant="h3" class="w-60%" />
            <div class="flex h-16px items-center">
              <ElSkeletonItem variant="text" class="mr-10px" />
              <ElSkeletonItem variant="text" style="width: 100%" />
            </div>
          </div>
        </template>
      </ElSkeleton>
      <Card :appList="appList.list" @to-detail="toDetailPage" v-if="!!appList.list.length" />
      <ElEmpty v-if="!loading && !appList.list.length" :image-size="200" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ElInput, ElSkeleton, ElSkeletonItem, ElEmpty } from 'element-plus'
import { reactive, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Card } from './components'
import { getAppListApi } from '@/api/common'
const router = useRouter()
interface List {
  name: string
  id: string
  img: string
  desc: string
} 
let input = ref('')
const loading = ref(true)
const appList = reactive<{list: List[]}>({
  list: []
})

onMounted(async () => {
  const result = await getAppListApi()
  loading.value = false
  appList.list = result
})

const toggleCollapse = () => {
  console.log(123)
}
const toDetailPage = (item) => {
  console.log(item)
  router.push({
    path: item.path
  })
}
</script>
<style lang="less">
.input-search {
  width: 100vw;
  display: flex;
  justify-content: center;
  padding-top: 60px;

  .el-input {
    width: 55%;
    border-radius: 0px 4px 4px 0px;

    .el-input__wrapper {
      padding-right: 0;

      .el-input__suffix {
        width: 90px;
        height: 40px;
        display: flex;
        justify-content: center;
        color: #fff;
        border-radius: 0px 4px 4px 0px;
        background: rgba(42, 130, 228, 1);
        cursor: pointer;

        &:hover {
          opacity: 0.8;
        }

        &:active {
          background: rgb(16, 95, 185);
        }

        .el-input__suffix-inner {
          width: 100%;
        }
      }
    }
  }
}

.container-box {
  width: 74%;
  display: flex;
  flex-wrap: wrap;
  margin: 100px auto 0;
}
</style>
