// ==UserScript==
// @name         学成在线
// @namespace    http://tampermonkey.net/
// @version      2024-09-28
// @description  try to take over the world!
// @author       You
// @match        https://www.mxdxedu.com/onlineStudy
// @icon         https://www.google.com/s2/favicons?sz=64&domain=mxdxedu.com
// @require     file:///C:\Users\25318\Desktop\my\tampermonkey\xuechengzaixian.js
// @grant        none
// ==/UserScript==
let config;

(function () {
  config = document.createElement("div");
  config.className = "aaa";
  document.body.appendChild(config);
  var textContent = "";

  createStopBtn("作业", () => {
    textContent = "";

    const elForm = document.querySelectorAll(".el-form");
    if (elForm) {
      getText(elForm[0]);
      console.log(textContent);
      const regex = /(\d+)、[\s\S]*?\n\s*([A-D])\s*\n/g;
      const matches = [...textContent.matchAll(regex)];

      // 提取题号和答案
      const result = matches.map(
        (match) => `题号: ${match[1]}, 答案: ${match[2]}`
      );

      // 将结果分为每 5 个一组
      for (let i = 0; i < result.length; i += 5) {
        console.log(result.slice(i, i + 5).join("\n"));
        console.log("----------------------------"); // 分隔线
      }
    } else {
      console.log("未找到带有类名 el-form 的元素。");
    }
  });

  createStopBtn("考试", () => {
    textContent = "";
    const elForm = document.querySelectorAll(".el-form");
    if (elForm) {
      getText(elForm[1]);
      console.log(textContent);
      const regex = /(\d+)、[\s\S]*?\n\s*([A-D])\s*\n/g;
      const matches = [...textContent.matchAll(regex)];

      // 提取题号和答案
      const result = matches.map(
        (match) => `题号: ${match[1]}, 答案: ${match[2]}`
      );

      // 将结果分为每 5 个一组
      for (let i = 0; i < result.length; i += 5) {
        console.log(result.slice(i, i + 5).join("\n"));
        console.log("----------------------------"); // 分隔线
      }
    } else {
      console.log("未找到带有类名 el-form 的元素。");
    }
  });

  createStopBtn("作业-多选", () => {
    textContent = "";

    const elForm = document.querySelectorAll(".el-form");
    if (elForm) {
      getText(elForm[0]);
      console.log(textContent);
      const regex = /(\d+)、[\s\S]*?\n\s*([A-D](?:\s*[A-D])*)\s*\n/g;
      const matches = [...textContent.matchAll(regex)];

      // 提取题号和答案
      const result = matches.map((match) => ({
        题号: match[1],
        答案: match[2].trim().split(/\s+/), // 使用空格分割答案
      }));

      // 将结果分为每 5 个一组
      for (let i = 0; i < result.length; i += 5) {
        console.log(
          result
            .slice(i, i + 5)
            .map((item) => `${item["题号"]}： ${item["答案"].join("、")}`)
            .join("\n")
        );
        console.log("----------------------------"); // 分隔线
      }
    } else {
      console.log("未找到带有类名 el-form 的元素。");
    }
  });

  createStopBtn("考试-多选", () => {
    textContent = "";
    const elForm = document.querySelectorAll(".el-form");
    if (elForm) {
      getText(elForm[1]);
      console.log(textContent);
      const regex = /(\d+)、[\s\S]*?\n\s*([A-D](?:\s*[A-D])*)\s*\n/g;
      const matches = [...textContent.matchAll(regex)];

      // 提取题号和答案
      const result = matches.map((match) => ({
        题号: match[1],
        答案: match[2].trim().split(/\s+/), // 使用空格分割答案
      }));

      // 将结果分为每 5 个一组
      for (let i = 0; i < result.length; i += 5) {
        console.log(
          result
            .slice(i, i + 5)
            .map((item) => `${item["题号"]}： ${item["答案"].join("、")}`)
            .join("\n")
        );
        console.log("----------------------------"); // 分隔线
      }
    } else {
      console.log("未找到带有类名 el-form 的元素。");
    }
  });

  function getText(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      textContent += node.textContent;
    } else {
      for (let i = 0; i < node.childNodes.length; i++) {
        getText(node.childNodes[i]);
      }
    }
  }
})();

function createStopBtn(str, fn) {
  // 创建容器元素
  const container = document.createElement("div");
  container.className = "containerLiu";
  container.addEventListener("click", () => {
    fn?.();
  });

  // 创建按钮元素
  const button = document.createElement("button");
  button.className = "button";
  button.textContent = str ?? "stop";

  // 将按钮添加到容器中
  container.appendChild(button);

  const style = document.createElement("style");
  const theHead = document.head || document.getElementsByTagName("head")[0];
  style.appendChild(
    document.createTextNode(
      `.aaa{display:flex;gap:40px;position:fixed;right:12%;top:225px;z-index:999;flex-direction:column;}.containerLiu{font-size:12px;width:46px;height:42px;background-color:#644dff;overflow:hidden;border-radius:100%;display:flex;justify-content:center;align-items:center;transform:scale(1.5) translateX(-25%);box-shadow:0 8px 2px #4836bb;transition:all .1s ease;filter:drop-shadow(0 6px 2px rgba(72,54,187,0.22));border:1px solid #4836bb}.button{padding:0; cursor:pointer;position:absolute;height:110%;width:110%;background-color:#644dff;color:white}.container:has(.button:active){box-shadow:none;margin-top:32px;filter:drop-shadow(0 3px 1px rgba(72,54,187,0.75))}`
    )
  );
  theHead.appendChild(style);

  // 将容器添加到文档中的适当位置
  config.appendChild(container);
}
