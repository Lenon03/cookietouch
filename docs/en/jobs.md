# CookieTouch API Documentation
[Summary](SUMMARY.md) | [Single page summary](singlepage.md)

<hr>

## Table of Contents
- [Jobs](#jobs)
  - [hasJob](#jobshasjobjobid-number)
  - [name](#jobsnamejobid-number)
  - [level](#jobsleveljobid-number)
  - [getCollectSkills](#jobsgetcollectskillsjobid-number)
  - [allCollectSkills](#jobsallcollectskills)

# Jobs
All functions related to jobs.

**The jobId list is in [jobs.txt](https://github.com/yovanoc/cookietouch/blob/master/resources/identifiants/jobs.txt).**
**The ressourceIds list is in [resources.txt](https://github.com/yovanoc/cookietouch/blob/master/resources/identifiants/resources.txt)**

## jobs.hasJob(<code>jobId</code>: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type">number</a>)
- Return type: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type">boolean</a>
Returns true if the character has the job, false if he doesn't.

**Example:**
```js
const isPaysan = jobs.hasJob(28); // Checks if the character has the peasant job.
```
  
## jobs.name(<code>jobId</code>: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type">number</a>)
- Return type: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type">string</a>

Returns the job name.

**Example:**
```js
const peasantName = jobs.name(28); // peasantName = "Peasant"
```
  
## jobs.level(<code>jobId</code>: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type">number</a>)
- Return type: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type">number</a>

Returns the job level.

**Example:**
```js
const lvlPeasant = jobs.level(28);
```

## jobs.getCollectSkills(<code>jobId: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type">number</a>)
- Return type: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array">number[]</a>

Returns an array of all the resources of a given job with which the bot can interact.

**Example:**
```js
const paysanSkills = jobs.getCollectSkills(28); // Returns [38, 39]: bot can gather Wheat and Hops.
```

## jobs.allCollectSkills
- Return type: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array">number[]</a>

Returns an array of all the resources that the bot can harvest.

**Example:**
```js
const skills = jobs.allCollectSkills; // Returns [38, 39, 1]: The bot can gather Wheat and Hops and Ash.
```
