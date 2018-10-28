### Emmm, Demo for npm cli 

简而言之 用 npm 生成一个命令行插件的 helloworld 插件

#### 说明
npm link 或 npm ln 均可, 实际上是会在当前安装的 node bin 目录下全局生成一个指向本项目的 package.json 中 bin 里指向的可执行文件的软链

```
    1. 当前目录下执行 npm install && npm link 
    2. helloworld --name [yourname]
```

#### 相关文档
[npm link](https://docs.npmjs.com/cli/link)

