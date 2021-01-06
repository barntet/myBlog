module.exports = {
  title: "笔记",
  base: "/",
  themeConfig: {
    sidebar: [
      {
        title: "Js",
        initialOpenGroupIndex: -1,
        children: [
          "noteBooks/Promise.md",
          "noteBooks/Async.md",
          "noteBooks/Numbers.md",
          "noteBooks/Arr.md",
          "noteBooks/Electron.md",
        ],
      },
    ],
    nav: [
      { text: "Home", link: "/" },
      { text: "JS", link: "/noteBooks/Promise.md" },
      { text: "Github", link: "https://github.com/barntet" },
    ],
  },
};
