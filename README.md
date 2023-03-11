# Node-Server 使用方法

## TODO
> 1. git上传
> 2. 设置界面
> 3. 多写几个例子
> 4. 初次设置还没解决要手动重开的问题
> 5. 跨域检查，还有一些连接错误cros库修改
> 6. 

## 项目介绍
通过使用nodejs进行轻量化的后端程序编写，剥离了依赖java实现的javaweb厚重且效率低的状况，适用于多数轻量化网站，实现了直接设置config即可增添api接口以及复杂接口可以单独开辟js程序进行执行的方式。
### 项目结构
>node_modules---   项目依赖包   
>function    ---   存放主体函数功能   
>>api        ---   复杂api存放路径   
>>config.json---   项目配置文件   
>  
>src         ---   显示的界面   
>app.js      ---   入口文件   
>package.json ---  包管理文件！！（勿动，也别乱npm i）   

### 安装方法
拿到项目后，执行`npm install`进行恢复依赖
初次安装按照提示进行数据库的账户密码和调用库的安装配置，按着提示来就行了，如果不行就自己进config进行修改   
初次设置完之后，请手动关闭一次服务端再开启
提示：项目运行时，会自动先向数据库进行连接，如果自动退出就去检查数据库状况

### config.json介绍
例子：  
```
{
    "dataBase": {
        "user": "root",
        "password": "Mysqlroot",
        "database": "myGrade",
        "Eligibility": true
    },
    "port":8081,
    "apis":[
        {
            "id":1,
            "port":"/getClass",
            "sql":"select * from classes",
            "keyValue":"",
            "limit_flag":false
        },
        {
            "id":2,
            "port":"/getStudent",
            "sql":"select * from students",
            "keyValue":"studentid",
            "limit_flag":true
        }
    ]
}
```
#### dataBase
存放数据库连接数据，只会在第一次运行时配置，剩下情况请手动修改
#### port
后端服务器运行端口，默认8081
#### apis
这里存放着简易api设置端口，id和请求端口请勿重复，有重复性检查，如果开不起服务器也请检查是否重复。   
sql则是存放运行的sql代码   
keyValue存放的是，可以通过地址栏传参的键，`/getStudent?studentid=xxx`这类用法中，传入的值必须标记，否则无效    
limit_flag标记是否可以分页的方式，可以多传入offset和limit两个参数，分别代表位移量和数据长度。   