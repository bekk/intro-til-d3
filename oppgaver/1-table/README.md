# Oppgave 1 - Helt grunnleggende databinding

Oppgaven går ut på å ta disse dataene:

```javascript
const data = [
  { name: "diamond", hardness: 10, color: "white" },
  { name: "ruby", hardness: 9, color: "red" },
  { name: "sapphire", hardness: 9, color: "blue" },
  { name: "topaz", hardness: 8, color: "yellow" },
  { name: "emerald", hardness: 7.5, color: "green" },
  { name: "amethyst", hardness: 7, color: "purple" },
  { name: "opal", hardness: 6, color: "black" }
];
```

og få dette resultatet:

<img src="../../img/1-table.png" width="200" />

Dette virker kanskje litt overveldende, men vi tar det steg for steg sammen.

## HTML table

I denne oppgaven skal vi bruke en vanlig [HTML-tabell](https://developer.mozilla.org/en-US/docs/Learn/HTML/Tables/Basics). Et eksempel på en slik tabell er:

```html
<table>
  <thead>
    <tr>
      <th>Navn</th>
      <th>Alder</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Svein</td>
      <td>27</td>
    </tr>
    <tr>
      <td>Kjetil</td>
      <td>27</td>
    </tr>
  </tbody>
</table>
```
- `<table>` - definerer HTML tabellen.
- `<tr>` - definerer en rad i tabellen.
- `<thead>` - brukes til å gruppere header innholdet (typisk overskrifter)
- `<th>` - definerer en header celle i tabellen.
- `<tbody>` - brukes til å gruppere selve innholdet i tabellen.
- `<td>` - definerer en vanlig celle i tabellen.

:trophy: Bruk `select` til å hente ut tabellen med id `#table` og legg til et `thead`-element. Lagre dette i en variabel (feks. `header`).

:trophy: Gjør det samme med et `tbody`-element og lagre dette i en ny variabel (feks. `body`).

Du skal nå ha en tabell som ser slik ut:

```html
<table id="table">
  <thead></thead>
  <tbody></tbody>
</table>
```

Fikk du det til? Sweet! :muscle:

Det neste vi skal gjøre er å legge til innhold i headeren.

:trophy: Legg til en rad i headeren (`thead`) med tre celler. Cellene skal henholdsvis ha tekstene `Name`, `Hardness` og `Color`.

Du skal ende opp med tabellen under.

```html
<table id="table">
  <thead>
    <tr>
      <th>Name</th>
      <th>Hardness</th>
      <th>Color</th>
    </tr>
  </thead>
  <tbody></tbody>
</table>
```

:bulb: Man kan bruke funksjonen `.text("Din tekst her")` til å sette teksten til et element.

## Databinding

Vanligvis når man ønsker å lagre en verdi i et programmeringsspråk blir det gjort ved å tilordne en verdi til en variabel.

Hvis man ønsker å lagre verdiene 1, 2, 3 og 4 i et array initialiserer man variabelen og tilordner verdien på følgende måte:

```javascript
const myArray = [1, 2, 3, 4];
```

I d3 lagrer man ikke data i variabler. Istedenfor lagrer d3 data i DOM-selectorer ved å kalle på `selection.data()`-metoden.

`.data()`-metoden må bli kalt på en selection og tar et array av verdier som argument.

```javascript
selection.data([array]);
```

Når `.data()` blir kalt slår den sammen arrayet av verdier med arrayet av elementer (selection) som den blir kalt på. Første verdien i arrayet vil bli slått sammen med første element i selection.

> _En selection vil alltid være et array av elementer. Dette gjelder for både `select()` og `selectAll()`_

`.data()` returnerer et d3-objekt som representerer verdiene fra arrayet som blir gitt som argument. Dette kan man bruke til å endre attributter og styling på elementer ved å kjede metoder.

Det som kan være litt forvirrende når man binder med `.data()` er at man kan binde data til et selection som ikke er laget enda.

Feks. hvis man har følgende html.

```html
<svg id="circles" />
```

og gjør følgende selection og databinding.  

```javascript

const radiuses = [100, 200, 300];
const circles = d3.select("#circles").selectAll("circle").data(radiuses);
```

Så har man gjort en databinding på sirkler som ikke finnes enda.

Det er her `.enter()` kommer inn i bildet. Dette er grovt forklart et datasett med dataverdiene som mangler et tilhørende element. Man kan da bruke `enter()` til å legge til de manglende elementene.

```javascript
function getRadius(radius) {
  return radius;
}

circles.enter()
  .append("circle")
  .attr("r", getRadius);
```

Dette vil resultere i følgende html.

```html
<svg id="circles">
  <circle r="100"/>
  <circle r="200"/>
  <circle r="300"/>
</svg>
```

> På samme måte kan man bruke `.exit()` til å få tak i de elementen som ikke har en tilhørende dataverdi.


I `src/index.js` har vi gitt en liste med data.

:trophy: Bruk denne listen til å legge til et `tr`-element i `tbody` for hver dataverdi i listen. Lagre denne databindingen i en variabel (feks. `bodyTr`)

:bulb: Brukt først `selectAll("tr")` til å velge alle _potensielle_ `tr`-elementer i `tbody`. Bruker deretter `.data()` til å binde verdiene, for så bruke `.enter()` og `.append()` for å legge til elementene.

Du skal nå ha følgende html struktur.

```html
<table id="table">
  <thead>
    <tr>
      <th>Name</th>
      <th>Hardness</th>
      <th>Color</th>
    </tr>
  </thead>
  <tbody>
    <tr />
    <tr />
    <tr />
    <tr />
    <tr />
    <tr />
    <tr />
  </tbody>
</table>
```

Som du ser er det et `tr`-element for hver dataverdi i listen vår.

:trophy: Legg til et `td`-element med navnet i dataverdiene til hver tabellrad.

:bulb: Man kan gi `.text()` en funksjon som argument for å hente ut verdier fra den tilhørende dataverdien.

```javascript
function getName(value) {
  return value.name;
}

const selectionWithData = // ditt element med bundet data.

selectionWithData.text(getName);

```

:trophy: Legg til en celle i hver rad for `hardness` og `color` også.

:trophy: Bruk `.style(property, value)` til å gi `td`-elmentene for `color` verdien som tekstfarge.

:bulb: Man bestemmer tekstfarge med css property-en [color](https://developer.mozilla.org/en-US/docs/Web/CSS/color)

:bulb: `.style()` aksepterer både en verdi og en funksjon som andre argument. På samme måte som vi lagde funskjonen `getName` over.


Når din tabell er lik nok denne er du ferdig.

<img src="../../img/1-table.png" width="200" />

:school_satchel: Se [fasit](https://github.com/bekk/intro-til-d3/blob/master/oppgaver/1-table/src/fasit.js) for en mulig løsning og ekstra hint. Det er viktig å huske at det er som regel veldig mange forskjellige måter å lage samme visualisering på.
