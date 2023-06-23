import {
  mdiMenu,
  mdiClockOutline,
  mdiCloud,
  mdiCrop,
  mdiAccount,
  mdiCogOutline,
  mdiEmail,
  mdiLogout,
  mdiThemeLightDark,
  mdiGithub,

  mdiFullscreen

} from "@mdi/js";

export default [
  // {
  //   icon: mdiMenu,
  //   label: "Sample menu",
  //   menu: [
  //     {
  //       icon: mdiClockOutline,
  //       label: "Item One",
  //     },
  //     {
  //       icon: mdiCloud,
  //       label: "Item Two",
  //     },
  //     {
  //       isDivider: true,
  //     },
  //     {
  //       icon: mdiCrop,
  //       label: "Item Last",
  //     },
  //   ],
  // },
  {
    isCurrentUser: true,
    menu: [
      {
        icon: mdiAccount,
        label: "My Profile",
        to: "/profile",
      },
      {
        icon: mdiCogOutline,
        label: "Settings",
        to: '/setting'
      },
      {
        icon: mdiEmail,
        label: "Messages",
      },
      {
        isDivider: true,
      },
      {
        icon: mdiLogout,
        label: "Log Out",
        isLogout: true,
        to: "/login",
      },
    ],
  },
  {
    icon: mdiThemeLightDark,
    label: "Light/Dark",
    isDesktopNoLabel: true,
    isToggleLightDark: true,
  },
  {
    icon: mdiGithub,
    label: "GitHub",
    isDesktopNoLabel: true,
    href: "https://github.com/kerwin-yang-yang/vue3",
    target: "_blank",
  },
  {
    icon: mdiFullscreen,
    label: "Full Screen",
    isDesktopNoLabel: true,
    // href: "https://github.com/kerwin-yang-yang/vue3",
    target: "_blank",
    isFullscreen: true,

  },
  {
    icon: mdiLogout,
    label: "Log out",
    isDesktopNoLabel: true,
    isLogout: true,
    to: "/login",
  },
];
