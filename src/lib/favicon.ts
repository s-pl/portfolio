/* funcion residual que cambiaba el favicon, la dejo por si acaso quiero usarla en el futuro, 
pero no es importante, ahora lo dejo para que se setee el favicon de la estrella.
*/
const ICONS = ["/star.ico"]; // aquí habría más íconos para animar el favicon, pero por ahora solo tengo uno.

export function animateFavicon(): () => void {
  // let index = 0; 

  let link = document.querySelector<HTMLLinkElement>("link[rel='icon']");
  if (!link) {
    link = document.createElement("link");
    link.rel = "icon";
    document.head.appendChild(link);
  }

  const el = link;
  el.href = ICONS[0];
  return () => {};
  /* const interval = setInterval(() => {
    el.href = ICONS[index];
    index = (index + 1) % ICONS.length;
  }, 300); */

  // return () => clearInterval(interval);
}
