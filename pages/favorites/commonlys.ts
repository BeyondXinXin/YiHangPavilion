//动态图片用本地相对路径访问有问题，暂时改用线上地址
const remoteImg = (name: string | number) => {
  return `https://web-abin.github.io/abinWeb/icons/${name}.png`;
};

const commonlys = [
  {
    id: 'commonlys',
    collection: [
      {
        icon: 'https://www.baidu.com/favicon.ico',
        name: '百度',
        link: 'https://www.baidu.com/',
      },
      {
        icon: 'http://www.google.com/favicon.ico',
        name: '谷歌',
        link: 'http://www.google.com/',
      },
      {
        icon: 'https://github.com/apple-touch-icon.png',
        name: 'GitHub',
        link: 'https://github.com/BeyondXinXin',
      },
      {
        icon: 'https://fanyi.baidu.com/favicon.ico',
        name: '百度翻译',
        link: 'https://fanyi.baidu.com/',
      },
      {
        icon: 'https://nlp-eb.cdn.bcebos.com/logo/favicon.ico',
        name: '文心一言',
        link: 'https://yiyan.baidu.com/',
      },
      {
        icon: 'https://chat.openai.com/favicon.ico',
        name: 'ChatGPT',
        link: 'https://chat.openai.com/',
      },
      { icon: 'https://www.bilibili.com/favicon.ico', link: 'https://www.bilibili.com/', name: '哔哩哔哩' },
      { icon: 'https://m.youtube.com/favicon.ico', link: 'https://www.youtube.com/', name: 'YouTube' },
    ],
  },
];

export default commonlys;
