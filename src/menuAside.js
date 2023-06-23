import {
  mdiAccountCircle,
  mdiMonitor,
  mdiGithub,
  mdiLock,
  mdiAlertCircle,
  mdiSquareEditOutline,
  mdiTable,
  mdiViewList,
  mdiTelevisionGuide,
  mdiResponsive,
  mdiPalette,
  mdiReact,

} from "@mdi/js";

export default [
  {
    to: "/dashboard",
    icon: mdiMonitor,
    label: "后台统计",
  },
  {
    to: "/project",
    label: "项目管理",
    icon: mdiAlertCircle,
  },
  {
    to: "/testManage",
    label: "测评管理",
    icon: mdiTable,
  },
  {
    to: "/organization",
    label: "组织管理",
    icon: mdiSquareEditOutline,
  },
  {
    to: "/user",
    label: "人员管理",
    icon: mdiTelevisionGuide,
  },
  // {
  //   to: "/client",
  //   label: "客户管理",
  //   icon: mdiResponsive,
  // },
  // {
  //   to: "/phishing",
  //   label: "中招管理",
  //   icon: mdiResponsive,
  // },
  {
    to: "/log",
    label: "日志管理",
    icon: mdiPalette,
  },
  {
    to: "/blacklist",
    label: "中招管理",
    icon: mdiAccountCircle,
  },

  {
    label: "项目资源管理",
    icon: mdiViewList,
    menu: [
      {
        label: "邮件服务器管理",
        to: '/server'
      },
      {
        label: "邮件模板管理",
        to: '/template'
      },
      {
        label: "响应服务器管理",
        to: '/catch'
      },


    ],
  },
  {
    label: "web UI 资源",
    icon: mdiViewList,
    menu: [
      {
        label: "ui",
        to: "/ui",
      },
      {
        label: "展示",
        to: '/responsive'
      },
      {
        label: "选择风格",
        to: '/'
      },
      {
        label: "其他资源",
        to: '/other'
      },

    ],
  },
  // {
  //   href: "https://github.com/justboil/admin-one-vue-tailwind",
  //   label: "GitHub",
  //   icon: mdiGithub,
  //   target: "_blank",
  // },
  // {
  //   href: "https://github.com/justboil/admin-one-react-tailwind",
  //   label: "React version",
  //   icon: mdiReact,
  //   target: "_blank",
  // },
];
