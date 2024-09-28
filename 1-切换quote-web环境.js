// ==UserScript==
// @name       dm跳转环境
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description   悬浮到 username 跳转各种环境
// @author       You
// @match        https://web.innodealing.com/dashboard/
// @match       https://webqa.innodealing.com/dashboard/
// @match       https://web.uat.innodealing.com/dashboard/
// @match       https://webgamma.innodealing.com/dashboard/
// @match       https://webbeta.innodealing.com/dashboard/
// @match       https://webzeta.innodealing.com/dashboard/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=innodealing.com
// @grant        none
// @require     file:///D:\desktop\my\tampermonkey\1-切换quote-web环境.js
// ==/UserScript==

(function () {
  window.addEventListener("load", () => {
    const iframe = document.getElementById("new-dashboard-frame");
    var innerDoc = iframe.contentDocument || iframe.contentWindow.document; // 获取 iframe 内部的文档对象
    var element = innerDoc.getElementById("dm-matrix-header-global"); // 根据元素的 id 获取元素

    console.log(element, "element");

    const observer = registerObserver();

    observer.observe(element, {
      childList: true,
      subtree: true,
    });
  });
})();

const createEnv = (function addEnv() {
  const env = {
    prod: "https://web.innodealing.com/dashboard/",
    qa: "https://webqa.innodealing.com/dashboard/",
    uat: "https://web.uat.innodealing.com/dashboard/",
    gamma: "https://webgamma.innodealing.com/dashboard/",
    zeta: "https://webzeta.innodealing.com/dashboard/",
    beta: "https://webbeta.innodealing.com/dashboard/",
    delta: "https://webdelta.innodealing.com/dashboard/",
    alpha: "https://webalpha.innodealing.com/dashboard/",
  };
  // 创建 dom 跳转
  const Fragment = document.createDocumentFragment();
  Object.keys(env).forEach((keys) => {
    const li = document.createElement("li");
    li.className = "ant-dropdown-menu-item";
    li.innerText = keys;
    li.onclick = () => {
      window.location.href = env[keys];
    };
    Fragment.appendChild(li);
  });
  return (container) => {
    container.appendChild(Fragment);
  };
})();

/** 监听 dom 变化，鼠标选入到 username 时 添加元素 */
function registerObserver() {
  const matrixObserver = new MutationObserver((mutationsList, observer) => {
    for (let mutation of mutationsList) {
      if (mutation.type === "childList") {
        for (const node of mutation.addedNodes) {
          if (node.nodeName.toLocaleLowerCase() === "div") {
            const ul = node.querySelector("ul.ant-dropdown-menu");
            if (ul) {
              createEnv(ul);
              observer.disconnect();
              console.log("添加 环境切换", ul);
            }
          }
        }
      }
    }
  });

  return matrixObserver;
}
