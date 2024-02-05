const notes = [
  {
    id: 'c++',
    name: 'C++',
    subclass: [
      {
        id: 'qt',
        name: 'Qt',
        document: [
          {
            link: 'https://doc.qt.io/',
            name: 'Qt文档',
          },
          {
            link: 'https://download.qt.io/archive/qt/',
            name: 'QT下载',
          },
        ],
        article: [
          {
            link: 'https://martinopilia.com/posts/2018/09/17/volume-raycasting.html',
            name: 'GPU在Qt和OpenGL中加速的单程体积光线投射',
          },
        ],
      },
      {
        id: 'vtk',
        name: 'VTK',
        document: [
          {
            link: 'https://examples.vtk.org/site/Cxx/',
            name: 'VTK Examples',
          },
          {
            link: 'https://gitlab.kitware.com/explore',
            name: 'VTK GitLab',
          },
          {
            link: 'https://vtk.org/doc/nightly/html/classes.html',
            name: 'VTK Class Index',
          },
        ],
        article: [],
      },
      {
        id: 'opengl',
        name: 'OpenGL',
        document: [
          {
            link: 'https://learnopengl-cn.github.io/intro/',
            name: 'Learn OpenGL',
          },
        ],
        article: [
          {
            link: 'https://www.codeproject.com/Articles/352270/Getting-Started-with-Volume-Rendering-using-OpenGL',
            name: '使用OpenGL进行体绘制入门',
          },
          {
            link: 'https://gamemath.com/',
            name: '图形与游戏开发3D数学入门',
          },
          {
            link: 'https://ncase.me/sight-and-light/',
            name: '视线与灯光',
          },
        ],
      },
      {
        id: 'mitk',
        name: 'Mitk',
        document: [
          {
            link: 'https://docs.mitk.org/2016.11/index.html',
            name: 'Mitk Doc',
          },
        ],
        article: [],
      },
      {
        id: 'rcf',
        name: 'RCF',
        document: [
          {
            link: 'https://www.deltavsoft.com/doc/_tutorial.html',
            name: 'RCF Doc',
          },
        ],
        article: [],
      },
    ],
  },
  {
    id: 'game',
    name: '独立游戏',
    subclass: [
      {
        id: 'godot',
        name: 'Godot',
        document: [
          {
            link: 'https://docs.godotengine.org/zh-cn/4.x/',
            name: 'Godot文档',
          },
        ],
        article: [
          {
            link: 'https://kidscancode.org/godot_recipes/4.x/',
            name: 'Godot Recipes',
          },
          {
            link: 'https://godotshaders.com/shader/',
            name: 'Godot Shaders',
          },
        ],
      },
    ],
  },
  {
    id: 'front',
    name: '前端',
    subclass: [],
  },
];

export default notes;
