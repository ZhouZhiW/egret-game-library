本源码基于EgretWing和D5Power游戏框架。是赛车类游戏的基础触控模拟，采用了无限地图，另外增加了行驶中的粒子效果。支持一键导出微信小程序

游戏框架GitHub地址：http://www.github.com/D5PowerStudio/D5Power

使用方法

1.下载附件，并解压

2.使用Egret Wing，通过顶部菜单的“文件”>>“打开文件夹”。选择解压出来的文件中 GameTemplate目录

3.直接运行程序即可。

4.如何操作
点击屏幕任意位置拖拽即可控制小车转向

5.如何导出微信小游戏
1) 启动Egret Launcher，在“项目”菜单中找到本项目
2) 点击项目的“发布设置”图标，设置小程序的发布方式（会自动生成一个小程序的appid）
3) 回到Egret Wing，在顶部菜单中，通过“查看”>>“终端”进入终端界面，输入命令：egret publish -target wxgame，即可发布为微信小程序版本
4) 打开微信开发者工具，导入小程序项目（GameTemplate_wxgame）即可
5) 本例采用的是旧版的RES库，并未启用微信小程序的缓存机制，导出后请将game.js中的require('./library/image.js');和require('./library/text.js');两句代码注释掉。否则会报错
通过微信小程序开发工具调试项目即可。

有其他问题，请回复本帖或提交到微信小游戏开发者社区
http://www.webgamei.com

