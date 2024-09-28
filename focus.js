(function () {
  setTimeout(() => {
    document.querySelector("#search > div > div > input")?.focus();
    const textarea = document.querySelector("textarea");
    console.log(textarea);
    textarea?.focus();
  }, 300);
})();
