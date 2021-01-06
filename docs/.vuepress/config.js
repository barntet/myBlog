module.exports = {
  title: "笔记",
  description: "barnett的blog",
  themeConfig: {
    sidebar: [
      {
        title: "Js", // 必要的
        path: "/noteBooks/", // 可选的, 标题的跳转链接，应为绝对路径且必须存在
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 1, // 可选的, 默认值是 1
        children: [
          "noteBooks/Promise.md",
          "noteBooks/Async.md",
          "noteBooks/Numbers.md",
          "noteBooks/Arr.md",
          "noteBooks/Electron.md",
        ],
      },
    ],
    nav: [{ text: "笔记", link: "/noteBooks/" }],
  },
};
