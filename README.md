# SmsForwarder Helper Chrome插件

## 简介

SmsForwarder Helper是一个Chrome浏览器插件，用于配合[SmsForwarder](https://github.com/pppscn/SmsForwarder)应用发送和查询短信。通过此插件，您可以直接在浏览器中管理短信，无需频繁打开手机应用。

## 功能特点

- 直接在浏览器中发送短信
- 支持查询已发送和接收的短信记录
- 支持选中网页文本快速发送
- 简洁美观的用户界面
- 安全的通信机制，支持HMAC-SHA256签名验证
- 支持SIM卡槽位选择（双卡用户）

## 安装方法

### 开发者模式安装

1. 下载本项目代码
2. 打开Chrome浏览器，进入扩展程序页面 (chrome://extensions/)
3. 开启「开发者模式」
4. 点击「加载已解压的扩展程序」
5. 选择本项目文件夹

## 使用前提

1. 已安装并配置好[SmsForwarder](https://github.com/pppscn/SmsForwarder)应用
2. 在SmsForwarder中已设置好主动控制服务端

## 使用指南

### 初始配置

1. 点击Chrome工具栏中的插件图标
2. 点击「设置」链接
3. 填写SmsForwarder中配置的Webhook URL和签名密钥
4. 点击「保存设置」
5. 点击「刷新」按钮获取最新API配置信息

### 发送短信

#### 方法一：通过插件弹窗发送

1. 点击Chrome工具栏中的插件图标
2. 切换到「发送短信」标签页
3. 选择SIM卡槽位（如有多个）
4. 填写接收手机号码和短信内容
5. 点击「发送短信」按钮

#### 方法二：通过右键菜单发送

1. 在网页中选中要发送的文本
2. 右键点击，选择「发送选中文本为短信」
3. 在弹出的窗口中填写接收手机号码
4. 点击「发送短信」按钮

### 查询短信

1. 点击Chrome工具栏中的插件图标
2. 切换到「查询短信」标签页
3. 选择查询类型（接收/发送）
4. 可选：输入关键字进行筛选
5. 查看短信列表，支持滚动加载更多

## 安全说明

- 本插件使用HMAC-SHA256算法对请求进行签名验证
- 所有配置信息仅保存在本地浏览器中，不会上传到任何服务器
- 不收集任何用户隐私数据
- 通信过程采用HTTPS加密传输
- 仅请求HTTPS安全连接，不支持HTTP明文传输
- 遵循最小权限原则，仅请求必要的权限

## 注意事项

- 请确保SmsForwarder应用已正确配置并运行
- 短信功能依赖于SmsForwarder应用的正常运行
- 使用前请先在设置页面配置服务器URL和签名密钥
- 如果遇到CORS（跨域资源共享）问题，请确保：
  1. 服务器端已配置正确的CORS响应头
  2. 插件的manifest.json中已添加对应域名的host_permissions

## 技术实现

- 使用Chrome Extension Manifest V3开发
- 使用WebCrypto API进行安全签名
- 使用Chrome Storage API保存配置
- 使用Fetch API进行网络请求
- 支持请求超时处理和错误重试
- 采用模块化设计，便于扩展和维护

## API接口说明

### 发送短信接口

#### 请求方式

- 请求方法：POST
- Content-Type：application/json

#### 请求参数

```json
{
  "data": {
    "from": "手机号码",
    "content": "短信内容",
    "simSlot": 0  // 可选，SIM卡槽位，0或1
  },
  "timestamp": "时间戳",
  "sign": "签名"
}
```

### 查询短信接口

#### 请求方式

- 请求方法：POST
- Content-Type：application/json

#### 请求参数

```json
{
  "data": {
    "type": "receive",  // 或 "send"
    "keyword": "关键字",  // 可选
    "page": 1,  // 页码
    "pageSize": 20  // 每页条数
  },
  "timestamp": "时间戳",
  "sign": "签名"
}
```

### 签名规则

1. 签名字符串格式：`timestamp + "\n" + 密钥`
2. 使用HMAC-SHA256算法计算签名
3. 对计算结果进行Base64编码
4. 对Base64编码结果进行URL编码

## 许可证

本项目采用MIT许可证。
