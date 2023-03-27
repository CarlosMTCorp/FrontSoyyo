export const changeBackground = (fondo) => {
  const reader = new FileReader();
  reader.onload = (event) => {
    document.getElementById("img").src = event.target.result;
  };
  reader.readAsDataURL(fondo);
};
