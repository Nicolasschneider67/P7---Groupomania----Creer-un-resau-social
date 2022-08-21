//Nous permet de faire les redirections correspondantes comme avec l'Aside
export const reload = (target) => {
  document.location.href = target;
};

//Lorsque nous souhaitons afficher des données comme pour les posts en page pprincipale, si la valeure est indéfnie affiche mmoi ça comme 0
export const isEmpty = (value) => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
  );
};

export const dateParser = (num) => {
  let options = {
    hour: "2-digit",
    minute: "2-digit",
    //second: "2-digit",
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  let timestamp = Date.parse(num);

  let date = new Date(timestamp).toLocaleDateString("fr-FR", options);

  return date.toString();
};