# traficlight-project




### Komponentit

**Frontend (React)**
- **TrafficLight.js**: Tämä komponentti edustaa liikennevaloja ja niiden ohjauspaneelia. Se hallitsee liikennevalojen näyttöä, värin vaihtamista, tilan valintaa (manuaalinen, normaali, vilkkuminen, aikaperusteinen) ja viestintää taustajärjestelmän kanssa tilan päivittämiseksi.

**Taustajärjestelmä (Node.js Expressillä)**
- **server.js**: Tämä on taustajärjestelmäpalvelin, joka vastaa HTTP-pyyntöjen käsittelystä ja vuorovaikutuksesta tietokannan kanssa. Se tarjoaa API-päätöspisteet viimeksi tallennetun tilan hakemiseen, liikennevalon tilan päivittämiseen ja aikaperusteisen tilan asettamiseen.

**Tietokanta (MongoDB)**
- MongoDB:ta käytetään tietokantana liikennevalojen tilan tallentamiseen. Se tallentaa tietoja, kuten nykyisen värin, tilan (manuaalinen, normaali, vilkkuminen, aikaperusteinen) ja aikasetukset aikaperusteiselle tilalle.

### Käytetyt ohjelmistot

- **Node.js**: Node.jsia käytetään palvelinpuolen skriptaukseen ja taustapalvelimen suorittamiseen.
- **Express.js**: Express.js on Node.js-verkkosovelluskehys, jota käytetään taustan API-päätöspisteiden luomiseen.
- **React**: React on JavaScript-kirjasto, jota käytetään frontend-käyttöliittymän rakentamiseen.
- **MongoDB**: MongoDB on NoSQL-tietokanta, jota käytetään liikennevalojen tilan tallentamiseen ja hallintaan.
- **Mongoose**: Mongoose on objektien tiedonmallinnus (ODM) -kirjasto MongoDB:lle, ja sitä käytetään tietoskeeman määrittämiseen ja tietokannan kanssa vuorovaikutukseen.








![IMG_0380](https://github.com/BestoEpe/traficlight-project/assets/91182619/7b8ae435-a593-480f-96c3-bfc9fe095a65)

a ballpark idea of the project
