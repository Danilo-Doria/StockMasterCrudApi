export function showView(viewId) {
  const allSection = document.querySelectorAll("section");

  allSection.forEach(section => {
    section.classList.add("hidden");
  });

  document.getElementById(viewId).classList.remove("hidden");
}