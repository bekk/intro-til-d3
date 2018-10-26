# Oppgave 1 - Å lage elementer

I forrige oppgave lærte vi å bruke `d3.select` til å få tak i elementer i html-strukturen slik at vi kunne endre egenskapene på dem. Med d3 er det også mulig å _legge til_ nye elementer, og det er det vi skal leke oss med i denne oppgaven!

## Append
La oss si vi har et html-dokument med en tom `<body>`:
```html
...
<body>
    // ønsker å legge til noe greier her
</body>
...
``` 
 
 
 Hvis vi ønsker å fylle `<body>`-en med spennende ting kan vi oppnå dette med funksjonen `d3.append()`! Hvis vi for eksempel vil legge til en `<article>` kan vi for eksempel skrive 

```javascript
d3.select('body').append('article');
```

Resultatet blir at vi nå får en `<article>` inne i `<body>`-en slik som dette:

```html
<body>
    <article></article>
</body>
```

Pretty sweet! Vi kan legge til så mange elementer vi vil. For å appende tekst på et element kan vi bruke `.text("Din tekst")`, for eksempel slik som dette:

```javascript
d3.select('article').text('Litt tekst inni artikkelen vår');

/* resultat:
<body>
    <article>Litt tekst inni artikkelen vår</article>
</body>
```

Måten man bruker `.append()` påvirker hierarkiet av elementer:

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

## :trophy: Din oppgave

En artikkel på web er typisk strukturert med en `<article>`-tag ytterst som omslutter innholdet i artikkelen. Innholdet deles gjerne inn i hovedoverskrift (`<h1>`), ulike seksjoner (`<section>`), underoverskrifter (`<h2>`, `<h3>` osv.), paragrafer (`<p>`), uthevet tekst i bold eller italic (`<b>` eller `<i>`) osv..

Din oppgave blir å konstruere en simpel artikkel med d3 og oppnå et resultat ca sånn som dette:

<img src="../../img/1-simple-article.png" width="200" />