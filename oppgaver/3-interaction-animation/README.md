# Oppgave 3 - Interaksjon og animasjon

Denne oppgaven går ut på å ta disse dataene:

```javascript
const data = [
  { name: "a" },
  { name: "b" },
  { name: "c" },
  { name: "e" },
  { name: "f" },
  { name: "g" },
  { name: "h" },
  { name: "i" },
  { name: "j" },
  { name: "k" },
  { name: "l" },
  { name: "m" }
];
```

og lage en animert visualisering man kan interagere med:

![Resultat interaction animation](../../img/3-interaction-animation.gif)

Når musen kommer over en sirkel utvider den seg sakte og viser navnet sitt. Når musen går ut forsvinner navnet og sirkelen går sakte tilbake til sin gamle størrelse.

## Tips

* Overganger fra en tilstand til en annen gjøres altså med å legge ting etter `.transition()`. For å f.eks. endre farge fra svart til rød over et halvt sekund:

```javascript
element
  .attr("fill", "#000000")
  .transition()
  .duration(500)
  .attr("fill", "#ff0000");
```

* Man kan lytte på handlinger som ´mouseover´og ´mouseout´ ved å bruke `.on()`. Se dokumentasjonen på https://github.com/d3/d3-selection#handling-events

```javascript
element.on("mouseover", handleMouseOver).on("mouseout", handleMouseOut);
```

* Callback-funksjonen til `.on()` tar data og indeks som parametere, og `this` er selve elementet som hadde eventet:

```javascript
function handleMouseOver(d, i) {
  d3
    .select(this) // this er dom-elementet som hadde mouse over
    .style("fill", "red");
}
```
