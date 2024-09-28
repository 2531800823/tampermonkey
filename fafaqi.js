let config;
(function () {
  "use strict";
  config = document.createElement("div");
  config.className = "aaa";
  document.body.appendChild(config);

  const downLoad = () => {
    let imgSrcs = [];
    document.querySelectorAll("img").forEach((img) => imgSrcs.push(img.src));
    imgSrcs = imgSrcs
      .filter((item) => {
        return !["bat.bing.com"].includes(new URL(item).hostname);
      })
      .map((item) => {
        return item.replace("_480", "_2048");
      });

    fetch("http://localhost:3000", {
      method: "POST", // 请求方法
      headers: {
        "Content-Type": "application/json", // 设置请求头，说明是 JSON 数据
      },
      body: JSON.stringify(imgSrcs), // 将数据序列化为 JSON 格式并放入请求体
    }).then((res) =>
      res.json().then((res) => {
        if (res.code === 200) {
          // 获取 button 跳转页面
          document.querySelector("a.ltr-nlzw0a")?.click();

          setTimeout(() => {
            // scrollToBottom();
          }, 3000);
        }
      })
    );
  };

  createStopBtn("下载", downLoad);

  function scrollToBottom(height = 3000) {
    setTimeout(() => {
      window.scrollTo({
        top: height,
        behavior: "smooth",
      });
      if (height > 18000) {
        downLoad();
        return;
      }
      scrollToBottom(height + 3000);
    }, 800);
  }

  createStopBtn("滚动", () => {
    scrollToBottom();
  });

  setTimeout(() => {
    // scrollToBottom();
  }, 2000);
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
