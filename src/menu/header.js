// 菜单 顶栏
export default [
  { path: '/index', title: '首页', icon: 'home' },
  {
    title: '管理',
    icon: 'folder-o',
    children: [
      {icon: 'address-card-o', path: '/page1', title: '用户管理' },
      { icon: 'user ',path: '/page2', title: '会员管理' },
      {icon: 'reorder ', path: '/page3', title: '文章管理' }
    ]
  },
  {
    title: '数据统计',
    icon: 'line-chart ',
    path: '/total'
  },
  {
    title: '发送消息',
    icon: 'line-chart ',
    path: '/sendmsg'
  },
  {
    title: '设计师',
    icon: 'folder-o',
    children: [
      {icon: 'address-card-o', path: '/design1', title: '设计师管理' },
      { icon: 'user ',path: '/design2', title: '设计师审批' },
    ]
  }
]
