import { config } from '@/config/axios/config'
import { MockMethod } from 'vite-plugin-mock'

const { result_code } = config

const timeout = 1000

const List: {
  username: string
  password: string
  role: string
  roleId: string
  permissions: string | string[]
}[] = [
  {
    username: 'admin',
    password: 'admin',
    role: 'admin',
    roleId: '1',
    permissions: ['*.*.*']
  },
  {
    username: 'test',
    password: 'test',
    role: 'test',
    roleId: '2',
    permissions: ['example:dialog:create', 'example:dialog:delete']
  }
]

const applist: {
  name: string
  id: string
  img: string
  desc: string
}[] = [
  {
    name: '文章领域',
    id: '123',
    img: '',
    path: '/article',
    desc: '一款强大的视频播放器'
  },
  {
    name: '玩玩游戏',
    id: '123',
    img: '',
    path: '/game/index',
    desc: '一款强大的视频播放器'
  },
  {
    name: '大屏可视化',
    id: '123',
    img: '',
    path: '/visualization',
    desc: '一款强大的视频播放器'
  },
  {
    name: '后台页面',
    id: '123',
    img: '/backmanage',
    path: '/backmanage',
    desc: '一款强大的视频播放器'
  }
]
export default [
  // 列表接口
  {
    url: '/user/list',
    method: 'get',
    response: ({ query }) => {
      const { username, pageIndex, pageSize } = query

      const mockList = List.filter((item) => {
        if (username && item.username.indexOf(username) < 0) return false
        return true
      })
      const pageList = mockList.filter(
        (_, index) => index < pageSize * pageIndex && index >= pageSize * (pageIndex - 1)
      )

      return {
        code: result_code,
        data: {
          total: mockList.length,
          list: pageList
        }
      }
    }
  },
  // 登录接口
  {
    url: '/user/login',
    method: 'post',
    timeout,
    response: ({ body }) => {
      console.log(body);
      const data = body
      let hasUser = false
      for (const user of List) {
        if (user.username === data.username && user.password === data.password) {
          hasUser = true
          return {
            code: result_code,
            data: user
          }
        }
      }
      if (!hasUser) {
        return {
          code: '500',
          message: '账号或密码错误'
        }
      }
    }
  },
  // 退出接口
  {
    url: '/user/loginOut',
    method: 'get',
    timeout,
    response: () => {
      return {
        code: result_code,
        data: null
      }
    }
  },
  {
    url: '/user/appList',
    method: 'get',
    timeout,
    response: () => {
      return {
        code: result_code,
        data: applist
      }
    }
  }
] as MockMethod[]
