# Oppgave 1 - Helt grunnleggende databinding

Første oppgave går ut på å ta disse dataene:

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

![Resultat oppgave 1](../../img/1-table.png)

Legg merke til nummerformateringen og fargene. Oppgaven er ferdig når du synes at ditt resultat er likt nok.

## Tips

* D3 trenger ikke å nødvendigvis å binde til svg-elementer. I denne oppgaven skal de bindes til en vanlig ![HTML-tabell](https://developer.mozilla.org/en-US/docs/Learn/HTML/Tables/Basics) `<table>`

* For å lage en `<tr>` i tabellen for hvert innslag i dataene gjør man altså:

```javascript
const dataTR = d3
  .select(table)
  .selectAll("tr")
  .data(data)
  .enter()
  .append("tr");
```

* For å appende bare tekst, og ikke et DOM-element, bruk `.text((d, i) => "en tekst")`

* D3 kommer med mange nyttige verktøy for datavisualiseringsrelaterte oppgaver. F.eks. `format(<format>)`: https://github.com/d3/d3-format#d3-format

* Måten man bruker `.append påvirker hierarkiet av elementer:

```javascript
dataTR
  .append("foo")
  .append("foo")
  .append("foo");

/* resultat:
<tr>
    <foo>
        <foo>
            <foo />
        </foo>
    </foo>
</tr>
*/
```

```javascript
dataTR.append("foo");
dataTR.append("foo");
dataTR.append("foo");

/* resultat:
<tr>
    <foo />
    <foo />
    <foo />
</tr>
*/
```

## Fasit

Se `fasit.js` for en mulig løsning og ekstra hint. Det er viktig å huske at det er som regel veldig mange forskjellige måter å lage samme visualisering på.
