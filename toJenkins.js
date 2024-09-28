// ==UserScript==
// @name         跳转 Jenkins
// @version      2024.04.22
// @author       刘士朋
// @match        http://git.innodealing.cn/front-end/*
// @match        http://192.168.9.10:8082/job/*
// @grant        none
// ==/UserScript==

(function () {
  "use strict";
  let url = window.location.href;
  if (url.startsWith("http://192.168.9.10:8082/")) {
    debugger;
    let param0 = url.replace("http://192.168.9.10:8082/job/", "").split("/")[0];
    // if (param0.search("-deploy") !== -1) {
    //   let project_name = param0.replace("-deploy", "");
    //   let image_tag = getUrlParam("image_tag");
    //   if (!image_tag) {
    //     image_tag = "latest";
    //   }
    //   // 说明是部署按钮
    //   // 如果有image_tag则自动填充
    //   let list = document.getElementsByTagName("input");
    //   let set = false;
    //   for (let i = 0; i < list.length && list[i]; i++) {
    //     console.log(list[i]);
    //     if (list[i].value === "IMAGE_TAG") {
    //       set = true;
    //       continue;
    //     }
    //     if (set) {
    //       list[i].value = image_tag;
    //       break;
    //     }
    //   }
    //   apendBuild(project_name);
    //   return;
    // }
    if (param0.search("-build") !== -1) {
      let project_name = param0.replace("-build", "");
      // 如果是jenkins的话 则直接自动填充值
      let branchval = getUrlParam("build-branch");
      if (!branchval) {
        branchval = "master";
      }
      // 如果有分支参数则自动填充
      let list = document.getElementsByTagName("input");
      let set = false;
      for (var i = 0; i < list.length && list[i]; i++) {
        console.log(list[i]);
        if (list[i].value === "BUILD_BRANCH") {
          set = true;
          continue;
        }
        if (set) {
          list[i].value = branchval;
          break;
        }
      }
      // 添加自己的邮箱
      const select = document.getElementsByTagName("select");

      if (!select) {
        return;
      }
      for (let i = 0; i < select.length; i++) {
        const element = select[i];
        if (element.previousElementSibling.value === "PREVIEW_FOLDER_NAME") {
          element.value = "quote-web-preview";
        }
        if (element.previousElementSibling.value === "EMAIL_ADDRESS") {
          element.value = "shipeng.liu";
        }
      }

      // 添加deploy按钮
      apendDeploy(project_name);
      return;
    }
    return;
  }

  if (url.startsWith("http://git.innodealing.cn/")) {
    debugger;
    let git_url = url.replaceAll("http://git.innodealing.cn/", "");
    // gitlab的项目名称
    let project_name = git_url.split("/")[1];
    if (
      project_name.search("-sql") != -1 ||
      project_name.search("-metadata") != -1
    ) {
      return;
    }
    //jenkins build的项目名称
    let build_project_name = project_name;
    if (project_name === "dm-web-react") {
      build_project_name = "quote-web";
    }
    let branch;
    // 优先获取merge的分支
    try {
      branch = document
        .getElementsByClassName("js-target-branch")[0]
        .innerHTML.trim();
      // if( document.getElementsByClassName("d-none d-sm-block")[4].innerHTML.trim() == 'Merged'){
      //     branch = document.getElementsByClassName("js-target-branch")[0].innerHTML.trim()
      // }
    } catch (exception_var_2) {
      console.log("get merge branch error", exception_var_2);
    }

    createDom($(".breadcrumbs-container"), branch, build_project_name);
    return;
  }

  //获取url中的参数
  function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg); //匹配目标参数
    if (r != null) return unescape(r[2]);
    return null; //返回参数值
  }

  function apendBuild(project_name) {
    let a = document.createElement("a");
    let link = document.createTextNode("Build");
    a.appendChild(link);
    a.href = `http://192.168.9.10:8082/job/${project_name}-build`;
    //a.class="yui-button yui-submit-button submit-button primary"
    // 将锚元素附加到body
    document.body.appendChild(a);
    document.getElementById("breadcrumbs").appendChild(a);
  }

  function apendDeploy(project_name) {
    let image_tag;
    try {
      image_tag = document.getElementsByClassName(
        "tip model-link inside build-link display-name"
      )[0].innerHTML;
    } catch (exception_var_2) {
      image_tag =
        document.getElementsByClassName("model-link inside")[3].innerHTML;
    }
    if (image_tag) {
      image_tag = image_tag.replace("#", "");
    }
    let a = document.createElement("a");
    let link = document.createTextNode("Deploy");
    a.appendChild(link);
    a.href = `http://192.168.9.10:8082/job/${project_name}-deploy/build?delay=0sec&image_tag=${image_tag}`;
    a.title = `Deploy Image Tag is ${image_tag}`;
    //a.class="yui-button yui-submit-button submit-button primary"
    // 将锚元素附加到body
    document.body.appendChild(a);
    document.getElementById("breadcrumbs").appendChild(a);
  }

  function createDom(container, branch, build_project_name) {
    // 创建外层的<div>元素
    var outerDiv = document.createElement("div");
    outerDiv.style.display = "flex";
    outerDiv.style.justifyContent = "center";
    outerDiv.style.alignItems = "center";

    const copyButton = createBtn("copy", () => {
      copyToClipboard(branch);
    });
    const createIssueButton = createBtn("创建 issue", () => {
      window.open(
        "http://git.innodealing.cn/front-end/dm-web-react/issues/new?issue%5Bassignee_id%5D=&issue%5Bmilestone_id%5D=",
        "_blank"
      );
    });

    const jenkinsBuildLink = createBtn("跳转 Jenkins", () => {
      let param = "";
      let proName = build_project_name;
      if (branch.includes("preview")) {
        proName = build_project_name + "-preview";
        param = "&PREVIEW_FOLDER_NAME=quote-web-preview";
      }
      window.open(
        `http://192.168.9.10:8082/job/${proName}-build/build?delay=0sec&EMAIL_ADDRESS=shipeng.liu&build-branch=${
          branch ?? ""
        }${param}`,
        "_blank"
      );
    });

    // 将两个元素添加到外层<div>中
    outerDiv.appendChild(copyButton);
    outerDiv.appendChild(createIssueButton);
    outerDiv.appendChild(jenkinsBuildLink);

    // 将外层<div>添加到容器中
    container.append(outerDiv);
  }

  function copyToClipboard(str) {
    // 创建一个临时textarea元素
    var textarea = document.createElement("textarea");
    textarea.value = str;

    // 将textarea元素添加到DOM中
    document.body.appendChild(textarea);

    // 选中textarea中的文本
    textarea.select();

    try {
      // 复制文本到剪贴板
      var successful = document.execCommand("copy");
      var msg = successful ? "复制成功！" : "复制失败！";
      console.log(msg);
    } catch (err) {
      console.error("复制失败:", err);
    }

    // 删除临时创建的textarea元素
    document.body.removeChild(textarea);
  }
})();

function createBtn(name, fn) {
  const btn = document.createElement("button");
  btn.innerHTML = name;
  btn.classList.add("append-right-10", "btn", "btn-success");
  btn.setAttribute("data-original-title", "Build Branch ${branch}");
  btn.onclick = () => {
    fn();
  };
  return btn;
}
