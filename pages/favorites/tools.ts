//动态图片用本地相对路径访问有问题，暂时改用线上地址
const remoteImg = (name: string | number) => {
  return `https://web-abin.github.io/abinWeb/icons/${name}.png`;
};

const tools = [
  {
    id: 'commonly',
    name: '常用',
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
    ],
  },
  {
    id: 'blog',
    name: '博客',
    collection: [
      {
        icon: 'https://besticon-demo.herokuapp.com/icon?url=https://www.beyondxin.top/&size=80..120..200',
        name: 'BeyondXin',
        link: 'http://www.beyondxin.top/',
      },
      {
        icon: 'https://picx.xpoet.cn/logo.png',
        name: 'Picx',
        link: 'https://picx.xpoet.cn/#/upload',
      },
      {
        icon: 'https://github.com/apple-touch-icon.png',
        name: '阮一峰',
        link: 'https://github.com/ruanyf/weekly',
      },
      {
        icon: 'https://www.haroldserrano.com/favicon.ico',
        name: '游戏开发',
        link: 'https://www.haroldserrano.com/blog/best-books-to-develop-a-game-engine',
      },
      {
        icon: 'https://besticon-demo.herokuapp.com/icon?url=https://martinopilia.com/&size=80..120..200',
        name: '影像学',
        link: 'https://martinopilia.com/',
      },
      {
        icon: 'https://besticon-demo.herokuapp.com/icon?url=https://tavianator.com/index.html&size=80..120..200',
        name: '图形学',
        link: 'https://tavianator.com/index.html',
      },
      {
        icon: 'https://blog.csdn.net/favicon.ico',
        name: 'CSDN',
        link: 'https://blog.csdn.net/a15005784320',
      },
    ],
  },
  {
    id: 'ai',
    name: 'AI',
    collection: [
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
      {
        icon: 'http://ttsmaker.com/favicon.ico',
        name: 'TTSMaker',
        link: 'https://ttsmaker.com/zh-cn',
      },
      {
        icon: 'https://www.bing.com/sa/simg/favicon-2x.ico',
        name: 'DALL·E 3',
        link: 'https://cn.bing.com/images/create?FORM=GENEXP',
      },
    ],
  },
  {
    id: 'front',
    name: '前端',
    collection: [
      {
        icon: 'https://besticon-demo.herokuapp.com/icon?url=www.zdzn.net&size=80..120..200',
        link: 'https://tool.zdzn.net/',
        name: 'ZDZN在线工具',
      },
      {
        icon: 'https://www.runoob.com/favicon.ico',
        link: 'https://www.runoob.com/',
        name: '菜鸟教程',
      },
      { icon: 'https://juejin.cn/favicon.ico', link: 'https://juejin.cn/', name: '稀土掘金' },
      { icon: 'https://www.openi.cn/favicon.ico', link: 'https://www.openi.cn/', name: '上网导航 - OpenI' },
    ],
  },
  {
    id: 'code',
    name: '编程',
    collection: [],
  },
  {
    id: 'serve',
    name: '服务器',
    collection: [
      {
        icon: 'https://mail.qq.com/zh_CN/htmledition/images/favicon/qqmail_favicon_32h.png',
        link: 'https://wx.mail.qq.com/list/readtemplate?name=account_list.html#/',
        name: 'QQ邮箱',
      },
      {
        icon: 'https://www.alibabacloud.com/favicon.ico',
        link: 'https://ecs.console.aliyun.com/home#/',
        name: '阿里云',
      },
      { icon: 'https://www.bt.cn/favicon.ico', link: 'https://101.200.221.236:29149/', name: '宝塔' },
      { icon: 'http://flwebcf20240205.fastlinkyj.co/favicon.ico', link: 'http://www.fastlink9.cc/', name: 'FASTLINK' },
      { icon: 'https://www.google.com/favicon.ico', link: 'https://drive.google.com/', name: 'Google 云端硬盘' },
      { icon: 'https://dashi.163.com/favicon.ico', link: 'https://dashi.163.com/', name: '邮箱大师' },
    ],
  },
  {
    id: 'entertainment',
    name: '娱乐',
    collection: [
      { icon: 'https://www.bilibili.com/favicon.ico', link: 'https://www.bilibili.com/', name: '哔哩哔哩' },
      { icon: 'https://v.qq.com/favicon.ico', link: 'https://v.qq.com/', name: '腾讯视频' },
    ],
  },
  {
    id: 'art',
    name: '美术资源',
    collection: [
      { icon: '', link: 'https://itch.io/', name: 'itch.io' },
      { icon: '', link: 'https://opengameart.org/', name: 'OpenGameArt.org' },
      { icon: '', link: 'https://www.pinterest.com/', name: 'Pinterest' },
      { icon: '', link: 'https://assetstore.unity.com/zh?locale=zh_CN&force=true', name: 'Unity 资源商店' },
      { icon: '', link: 'https://game-icons.net/', name: '游戏SVG图标' },
      { icon: '', link: 'https://www.gamedeveloperstudio.com/', name: 'gamedeveloperstudio' },
      { icon: '', link: 'https://quaternius.com/', name: '低面片三维模型' },
      { icon: '', link: 'https://www.kenney.nl/assets', name: 'Assets · Kenney' },
      { icon: '', link: 'https://learningmusic.ableton.com/index.html', name: 'Learning Music' },
      { icon: '', link: 'https://incompetech.com/wordpress/', name: 'incompetech' },
      { icon: '', link: 'https://bz.zzzmh.cn/index', name: '极简壁纸' },
      { icon: '', link: 'https://unsplash.com/', name: 'Unsplash' },
      { icon: '', link: 'https://wallhaven.cc/', name: 'wallhaven' },
      { icon: '', link: 'https://freephotos.cc/search/nature', name: 'freephotos' },
      { icon: '', link: 'https://pixabay.com/zh/', name: 'pixabay' },
      { icon: '', link: 'https://yesicon.app/', name: 'yesicon' },
    ],
  },
  {
    id: 'game',
    name: '游戏开发',
    collection: [
      { icon: 'https://godotengine.org/favicon.ico', link: 'https://godotengine.org/', name: 'Godot官网' },
      { icon: 'https://www.gameui.net/favicon.ico', link: 'https://www.gameui.net/', name: 'GameUI.net' },

      {
        icon: 'https://magic-games.itch.io/favicon.ico',
        link: 'https://magic-games.itch.io/crazy-monster-shooter',
        name: 'crazy-monster-shooter',
      },
      {
        icon: 'https://www.gamedeveloperstudio.com/img/ico.png',
        link: 'https://www.gamedeveloperstudio.com/',
        name: 'Game Developer Studio',
      },
      { icon: 'https://www.gameui.net/favicon.ico', link: 'https://www.gameui.net/', name: 'GameUI.net' },
    ],
  },
];

export default tools;
