# CookieTouch API Documentation
[Summary](SUMMARY.md) | [Single page summary](singlepage.md)

<hr>

## Sommaire
- [Jobs](#jobs)
  - [hasJob](#jobshasjobjobid-number)
  - [name](#jobsnamejobid-number)
  - [level](#jobsleveljobid-number)
  - [getCollectSkills](#jobsgetcollectskillsjobid-number)
  - [allCollectSkills](#jobsallcollectskills)

# Jobs
Toutes les fonctions relatives aux métiers.

**La liste des jobId se trouve dans [jobs.txt](https://github.com/yovanoc/cookietouch/blob/master/resources/identifiants/jobs.txt).**

## jobs.hasJob(<code>jobId</code>: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Number_type">number</a>)
- Return type: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Boolean_type">boolean</a>
Retourne true si le personnage a le métier, false si il ne l'a pas.

**Exemple:**
```js
const isPaysan = jobs.hasJob(28); // vérifie si le personnage a le métier paysan.
```
  
## jobs.name(<code>jobId</code>: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Number_type">number</a>)
- Return type: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#String_type">string</a>

Retourne le nom d'un métier.

**Exemple:**
```js
const paysanName = jobs.name(28); // paysanName = "Paysan"
```
  
## jobs.level(<code>jobId</code>: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Number_type">number</a>)
- Return type: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Number_type">number</a>

Retourne le niveau d'un métier.

**Exemple:**
```js
const nivPaysan = jobs.level(28);
```

## jobs.getCollectSkills(<code>jobId</code>: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Number_type">number</a>)
- Return type: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Reference/Global_Objects/Array">number[]</a>

Retourne un array de toutes les ressources d'un métier donné avec lesquelles le bot peut interagir.

**Exemple:**
```js
const paysanSkills = jobs.getCollectSkills(28); // Retourne [38, 39]: le bot peut faucher le Blé et le Houblon.
```
La liste des ressources se trouve dans [resources.txt](https://github.com/yovanoc/cookietouch/blob/master/resources/identifiants/resources.txt)

## jobs.allCollectSkills
- Return type: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Reference/Global_Objects/Array">number[]</a>

Retourne un array de toutes les ressources que le bot peut récolter.

**Exemple:**
```js
const skills = jobs.allCollectSkills; // Retourne [38, 39, 1]: le bot peut faucher le Blé et le Houblon et couper du Frene.
```
