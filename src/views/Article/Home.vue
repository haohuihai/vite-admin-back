<template>
  <div class="bg-gray-50">
    <div class="container-article">
      <Nav :isLogin="isLogin" :selfUserInfo="selfUserInfo" />
      <div class="global-nav-bottom" :class="isShowNav ? 'global-nav-bottom-hide' : ''">
        <ul>
          <li
            :class="item.active ? 'changeActive' : ''"
            v-for="(item, index) in navBotList"
            :key="index"
            @click="chooseItem(index)"
          >
            {{ item.articleName }}
          </li>
        </ul>
        <ul class="fullter">
          <li
            :class="currentIndex == index ? 'active' : ''"
            @click="switchHotType(index)"
            v-for="(item, index) in maxType"
            :key="index"
          >
            {{ item.type }}
          </li>
        </ul>
      </div>
      <div class="mainContent" v-loading="isMoreData">
        <div ref="scrollDomActive">
          <ArticItem :articItem="articItem.list" @to-preview="toPreview" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Nav, ArticItem } from './components'
import { getArticleList } from '@/api/article'
import { onMounted, ref, reactive, ObjectDirective, onUnmounted  } from 'vue'
const scrollDomActive = ref<ElRef>(null)
let navBotList = ref([
  {
    articleName: '前端',
    id: '1'
  },
  {
    articleName: '后端',
    id: '21'
  },
  {
    articleName: 'python',
    id: '31'
  }
])
let page = 1
let articItem = reactive({ list: [] })
let isLogin = ref(false)
let isShowNav = ref(false)
let currentIndex = ref(0)
let isMoreData = ref(false)
let selfUserInfo = ref({})
let maxType = ref([
  {
    type: '热门',
    id: 1
  },
  {
    type: '最新',
    id: 2
  },
  {
    type: '热榜',
    id: 3
  }
])
onMounted(async () => {
  scrollDomActive.value.addEventListener('scroll', handleScroll, true)
  const res = await getArticleList({ page: 1 })
  articItem.list = res
  console.log('res', res)
})
onUnmounted(() => {
  scrollDomActive.value?.removeEventListener('scroll', handleScroll)
})
const chooseItem = () => {}
const switchHotType = () => {}
const toPreview = () => {}
const handleScroll = (e) => {
  if (e.target.scrollTop + e.target.clientHeight >= e.target.scrollHeight) {
    isMoreData.value = true
    setTimeout(() => {
      isMoreData.value = false
    }, 1000)
  }
}
</script>

<style scoped lang="less">
.container-article {
  position: relative;
  margin: 0 auto;
  max-width: 1080px;
  height: 100vh;
  .mainContent {
    background: #fff;
    margin: 0 20px;
    border-radius: 2px;
    div:first-child {
      width: 100%;
      height: calc(100vh - 126px);
      overflow-y: overlay;
      &::-webkit-scrollbar {
        width: 4px;
      }
      &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        background: rgba(0, 0, 0, 0.1);
      }
      &::-webkit-scrollbar-track {
        box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);
        border-radius: 0;
        background: rgba(0, 0, 0, 0.1);
      }
    }
  }
}

#captcha {
  margin: 0 auto;
  margin-top: 260px;
  --width: 400px;
  --height: 260px;
  --puzzle-width: 80px;
  --puzzle-height: 80px;
  --offset-left: var(--width) * -1;
  --moved: 0px;

  display: block;
  width: var(--width);
  height: var(--height);
  border-radius: 4px;
  background-image: url(https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2700&q=80);
  background-size: cover;
  background-position: center;
  position: relative;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);
}

#captcha::before,
#captcha::after {
  position: absolute;
  content: '';
  display: block;
  width: inherit;
  height: inherit;
  background-image: inherit;
  background-size: inherit;
  background-position: inherit;

  clip-path: inset(
    calc((var(--height) - var(--puzzle-height)) / 2) /* 90px */ var(--puzzle-width) /* 90px */
      calc((var(--height) - var(--puzzle-height)) / 2) /* 90px */
      calc(var(--width) - var(--puzzle-width) * 2) /* 230px */
  );
  -webkit-clip-path: inset(
    calc((var(--height) - var(--puzzle-height)) / 2) /* 90px */ var(--puzzle-width) /* 90px */
      calc((var(--height) - var(--puzzle-height)) / 2) /* 90px */
      calc(var(--width) - var(--puzzle-width) * 2) /* 230px */
  );
}

#captcha::after {
  transform: translatex(
    clamp(
      calc(var(--width) * -1),
      calc((var(--width) * -1) + var(--moved)),
      calc(var(--puzzle-width))
    )
  );
  transition: 0.25s all ease-in-out;
}

#captcha:active::after {
  transition: none;
}

#captcha::before {
  background-color: rgba(0, 0, 0, 0.6);
  background-blend-mode: multiply;
}

#handle {
  width: calc(var(--width) + var(--puzzle-width) * 2);
  height: 30px;
  border-radius: 18px;
  background-color: #eee;
  position: absolute;
  bottom: -50px;
  left: calc(var(--puzzle-width) * 2 * -1);
  box-shadow: inset 0px 0px 12px rgba(0, 0, 0, 0.2);
  border: 3px solid #ccc;
}

#handle span {
  display: block;
  width: var(--puzzle-width);
  height: inherit;
  border-radius: inherit;
  background-color: #fff;
  box-shadow: inset 0px 0px 6px rgba(0, 0, 0, 0.25), 0px 2px 4px rgba(0, 0, 0, 0.3);
  position: absolute;
  cursor: move;
  transform: translatex(clamp(0px, var(--moved), calc(var(--width) + var(--puzzle-width))));

  transition: 0.25s all ease-in-out;
}

#captcha:active #handle span {
  transition: none;
}

.container-article {
  position: relative;
  margin: 0 auto;
  max-width: 1080px;
}

.global-nav-bottom ul li:hover,
.container-article .mainContent .fullter ul li:hover {
  color: #007fff;
}

.global-nav-bottom ul {
  display: flex;
  align-items: center;
  max-width: 1020px;
}
.fullter .active {
  color: #007fff;
}
.fullter {
  display: flex;
  li {
    padding: 0 1rem;
    cursor: pointer;
    font-size: 1.27rem;
    color: #909090;
    border-right: 1px solid hsla(0, 0%, 59.2%, 0.2);
  }
  li:last-child {
    border-right: none;
  }
}
.global-nav-bottom {
  border-top: 1px solid #f1f1f1;
  transition: all 0.2s;
  transform: translateZ(0);
  border-bottom: 1px solid #f1f1f1;
  background: #fff;
  color: #909090;
  z-index: 1600;
  display: flex;
  justify-content: space-between;
  box-shadow: 0px 5px 12px 0px rgba(0, 0, 0, 0.04);
  margin-bottom: 10px;
  padding: 0 10px;
}
/* .global-nav-bottom ul li:first-child{
    padding-left: 0;
    color: #007fff;
} */
.global-nav-bottom ul li {
  height: 100%;
  flex-shrink: 0;
  font-size: 16px;
  color: #71777c;
  padding: 5px 10px;
  border-right: 1px #f1f1f1 solid;
  &:first-child {
    padding-left: 0;
  }
}
@media (max-width: 1090px) {
  /* .global-nav,.mainContent{
        width: 100%;
        margin: 0 auto;
    }
    .container .mainContent {
        width: 100%;
        margin-right: 0;
    } */
  .container-article .mainContent {
    width: 84rem !important;
    margin: 0 auto;
  }
  .container-article .mainContent .main-right {
    display: none;
  }
}
@media screen and (min-width: 1090) {
  .container-article .mainContent {
    width: 710px;
    margin-right: 0;
  }
}
</style>
