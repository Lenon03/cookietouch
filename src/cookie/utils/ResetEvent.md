#ResetEvent

## What is a ResetEvent?
The reset event is somewhat based on the C# [AutoResetEvent](http://msdn.microsoft.com/en-us/library/system.threading.autoresetevent(v=vs.110).aspx) and [ManualResetEvent](http://msdn.microsoft.com/en-us/library/system.threading.manualresetevent.aspx) classes.
It is similar to a promise only it can be used multiple times.
When a function begins an activity that must complete before other functions proceed, it calls _reset_ to put the ResetEvent in the non-signaled state.
Functions that call _wait_ on the reset event will not execute immediately, awaiting the signal. When the running function completes the activity, it calls _set_ to signal that the waiting functions can proceed.
All waiting functions are executed until the event becomes non-signaled.
Once it has been signaled, a reset event remains signaled until it is manually reset using the _reset_ function. That is, calls to _wait_ execute immediately.

### Basic Usage

```js
var ResetEvent = require('node-async-locks').ResetEvent;
```

```js

     var resetEvent = new ResetEvent();
      var x = 0;
      resetEvent.wait(function(){
          x+=1;
       });

      resetEvent.wait(function(){
          console.log(x); //2
       });
       x++;
       resetEvent.set();
}]
```

### Helper Functions

ResetEvent uses several helper functions (on the **prototype**) which can be overridden to provide custom functionality.

#### ResetEvent#createToken(callback) -> token

A function that creates the token which will be used in this reset event.
The token has the following fields:

* **id** - A unique id for each token, must be comparable using === operator.
* **isCanceled** - A boolean representing the cancellation state of the token.
* **callback** - The callback to be called when the token is ready to execute.
* **elapsed** - [optional] A function which returns the elapsed time between the creation of the token and now.
* **start** - [optional] The start time of when this token was created.
* **resetEvent** - [optional] A reference to the reset event that created this token.

#### ResetEvent#executeCallback(token)

A function which is used to execute the callback on the token.
The default implementation will execute the callback synchronously.

#### ResetEvent#reduceQueue(queue, options)

A function which is used to reduce the reset event queue size when a call to _wait_ is made.
If the options are changed pragmatically after an instance was created, it is up to the user to call this function to adjust the queue size.
Override this function to create different queuing logic.

### ResetEvent API

The main API of the ResetEvent object instance.
_ResetEventInstance_ represents an instance created by calling ````new ResetEvent()````

#### ResetEvent#constructor(isSignaled, options) -> ResetEventInstance

Creates a new ResetEventInstance using the given signaled state and options.
If no options are provided the default options are used.
The default options defined as ````ResetEvent.defaultOptions```` :
```js
{
        maxQueueSize: Infinity,
        overflowStrategy: 'this',
        autoResetCount: Infinity
}
```
Override any default option to make all future reset event instance created with the new defaults.

##### Supported Options
See AsyncLock [Supported Options](#supported-options) and:

* **autoResetCount** (number) [default Infinity] - The number of callbacks to call before the event is auto reset (becomes non-signaled).


#### ResetEventInstance#reset()

Marks the reset event as not signaled. All further calls to _wait_ will not execute immediately.

```js
 var resetEvent = new ResetEvent(true);
 resetEvent.wait(function(){
    //This is executed
 });
 resetEvent.reset();
 resetEvent.wait(function(){
    //This is not executed
 });
```

#### ResetEventInstance#set()

Marks the reset event as signaled and executes all pending callbacks. All further calls to _wait_ will execute immediately.
if _autoResetCount_ count option was passed, it will execute only the given number of callbacks (excluding canceled callbacks)
and then mark the event as non-signaled.

```js
 var resetEvent = new ResetEvent(false);
 var x;
 resetEvent.wait(function(){
    console.log(x); // 10
 });
 x = 10;
 resetEvent.set();
 resetEvent.wait(function(){
    console.log(x); // 10
 });
 x = 20;
 resetEvent.wait(function(){
    console.log(x); // 20
 });
```

#### ResetEventInstance#wait(callback,[timeout]) -> token

Waits until the reset event becomes signaled then executes the callback function.
If the reset event is already signaled when wait is called, the callback is executed immediately.
The callback function signature is _callback(token)_, it will receive the token returned by the _wait_ function.
If _timeout_ is provided will wait only the given amount of milliseconds and then cancel the call.
If _timeout_ is not provided will wait indefinitely.
Returns a token which can be used to track the elapsed time.

```js
 var resetEvent = new ResetEvent(false);
 var x;
 resetEvent.wait(function(){
    console.log(x); // This is never called
 },100);

 x = 10;

 setTimeout(function(){
    resetEvent.set();
  },1000);

 resetEvent.wait(function(){
    console.log(x); // 20
 });

 x = 20;

 resetEvent.wait(function(){
    console.log(x); // 20
 });
```

#### ResetEventInstance#isSignaled() -> boolean

Returns true if the reset event is currently signaled and false otherwise.

```js
 var resetEvent = new ResetEvent();
 resetEvent.isSignaled(); //false;
 resetEvent.set();
 resetEvent.isSignaled(); //true;
 resetEvent.reset();
 resetEvent.isSignaled(); //false;

```

#### ResetEventInstance#queueSize() -> number

Returns the number of callbacks currently pending on the reset event.
Note than inside a callback that callback is not considered pending.

```js
 var resetEvent = new ResetEvent(false);

 resetEvent.wait(function(){
    console.log(resetEvent.queueSize()); // 0
 });

 console.log(resetEvent.queueSize()); // 1
 resetEvent.set();
```
