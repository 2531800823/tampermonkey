(function () {
  "use strict";
  // 账号
  const username = document.getElementById("inputUsername");
  username.value = "dev_liushipeng";

  //   密码
  const password = document.getElementById("inputPassword");
  password.value = "123456";

  //   同意
  const check = document.getElementById("approve-privacy");
  check.checked = true;

  //   登录
  const submit = document.querySelector(".submit-btn[type='submit']");

  const timer = setTimeout(() => {
    submit.click();
  }, 1000);

  //   创建取消登录
  createStopBtn(() => {
    clearTimeout(timer);
  });
})();

function createStopBtn(fn) {
  // 创建容器元素
  const container = document.createElement("div");
  container.className = "container";
  container.addEventListener("click", () => {
    fn?.();
  });

  // 创建按钮元素
  const button = document.createElement("button");
  button.className = "button";
  button.textContent = "stop";

  // 将按钮添加到容器中
  container.appendChild(button);

  const style = document.createElement("style");
  const theHead = document.head || document.getElementsByTagName("head")[0];
  style.appendChild(
    document.createTextNode(
      ".container{position:fixed;left:50%;top:50px;width:72px;height:64px;background-color:#644dff;overflow:hidden;border-radius:100%;display:flex;justify-content:center;align-items:center;transform:scale(1.5) translateX(-25%);box-shadow:0 8px 2px #4836bb;transition:all .1s ease;filter:drop-shadow(0 6px 2px rgba(72,54,187,0.22));border:1px solid #4836bb}.button{font-weight:800;cursor:pointer;position:absolute;text-transform:uppercase;height:110%;width:110%;background-color:#644dff;color:white}.container:has(.button:active){box-shadow:none;margin-top:32px;filter:drop-shadow(0 3px 1px rgba(72,54,187,0.75))}"
    )
  );
  theHead.appendChild(style);

  // 将容器添加到文档中的适当位置
  document.body.appendChild(container);
}
