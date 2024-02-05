//动态图片用本地相对路径访问有问题，暂时改用线上地址
const remoteImg = (name: string | number) => {
  return `https://web-abin.github.io/abinWeb/icons/${name}.png`;
};

const tools = [
  {
    id: 'tool',
    name: '实用工具',
    collection: [
      { icon: 'https://besticon-demo.herokuapp.com/icon?size=80..120..200&url=www.gaituya.com', link: 'https://www.gaituya.com/bianji/', name: '在线图片编辑' },
      { icon: 'https://gregstoll.com/favicon.ico', link: 'https://gregstoll.com/~gregstoll/floattohex/', name: '浮点转十六进制' },
      { icon: 'https://www.toolhelper.cn/favicon.ico', link: 'https://www.toolhelper.cn/', name: '在线工具合集' },
      { icon: 'https://raw.githubusercontent.com/gaschler/rotationconverter/aa5e60843c83ca2cb54626bbf84983684d9f1ff2/rotation-icon.svg', link: 'https://www.andre-gaschler.com/rotationconverter/', name: '旋转坐标转换' },
      { icon: 'https://pudding.cool/apple-touch-icon.png', link: 'https://pudding.cool/2018/02/waveforms/', name: '声波可视化' },
      { icon: 'https://www.ilovepdf.com/favicon.ico', link: 'https://www.ilovepdf.com/zh-cn/split_pdf#split,range', name: '拆分PDF文件' },
      { icon: 'https://besticon-demo.herokuapp.com/favicon.ico', link: 'https://besticon-demo.herokuapp.com/', name: '网站图标提取' },
    ],
  },
];

export default tools;
