// Entrypoint for d3

const article = d3.select("body").append("article");

article
    .append("h1").text("Wow for en stor og fin hovedtittel!");

article
    .append("p").text("Datavisualisering med D3 er ")
    .append("i").text("kjempegøy!");

article
    .append("h2").text("Hvorfor er undertitler mindre enn hovedtitler?");

article
    .append("p").text("Wubba Lubba Dub Dub!");