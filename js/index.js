// For mobiles, close offcanvas when links clicked
document.querySelectorAll("a.list-group-item").forEach((item) => {
  item.addEventListener("click", () => {
    if (window.innerWidth < 450) {
      var bsOffcanvas = bootstrap.Offcanvas.getInstance(
        document.getElementById("sidebardiv")
      );
      bsOffcanvas.hide();
    }
  });
});

// Scrollspy stuff for smooth sidebar
document
  .getElementById("coursecontentdiv")
  .addEventListener("activate.bs.scrollspy", (event) => {
    updateBreadCrumbs(event.relatedTarget);
    new bootstrap.Collapse(event.relatedTarget.parentNode.parentNode, {
      toggle: false,
    }).show();
  });

function updateBreadCrumbs(subsectionNode) {
  const sectionBreadCrumb = document.getElementById("sectionbreadcrumb");
  const subsectionBreadCrumb = document.getElementById("subsectionbreadcrumb");

  let sectionName =
    subsectionNode.parentElement.parentElement.parentElement.innerText.split(
      "\n"
    )[0];
  sectionBreadCrumb.innerHTML = `<a href="#s${sectionName.at(
    -1
  )}">${sectionName}</a>`;

  subsectionBreadCrumb.textContent = subsectionNode.textContent;
}

// Language switching
window.onload = () => {
  updateLang("eng");

  document.getElementById("languagebtn").addEventListener("click", () => {
    let lang = document.getElementById("langselector").value;
    updateLang(lang);
  });
};

function updateLang(language) {
  const subsections = [
    "s1s1",
    "s1s2",
    "s1s3",
    "s1s4",
    "s2s1",
    "s2s2",
    "s3s1",
    "s3s2",
    "s3s3",
  ];

  fetch(`../lang/${language}.json`)
    .then((response) => response.json())
    .then((json) => {
      for (ss of subsections) {
        document.querySelector(`#${ss} p`).innerHTML =
          json["content"]["placeholder"];
      }
    });
}
