// 插件安装或更新时触发
chrome.runtime.onInstalled.addListener(function() {
  // 初始化默认设置
  chrome.storage.sync.get(['serverUrl', 'secret'], function(items) {
    if (!items.serverUrl) {
      chrome.storage.sync.set({serverUrl: ''});
    }
    if (!items.secret) {
      chrome.storage.sync.set({secret: ''});
    }
  });
  // 创建右键菜单
  chrome.contextMenus.create({
    id: 'sendSelectedTextAsSms',
    title: '发送选中文本为短信',
    contexts: ['selection']
  });
});

// 处理右键菜单点击
chrome.contextMenus.onClicked.addListener(function(info, tab) {
  if (info.menuItemId === 'sendSelectedTextAsSms') {
    // 打开弹窗并填充选中的文本
    chrome.storage.local.set({selectedText: info.selectionText}, function() {
      chrome.action.openPopup();
    });
  }
});