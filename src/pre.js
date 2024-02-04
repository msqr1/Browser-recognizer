let objs = [] 
Module.cleanUp = () => {
  objs.forEach(obj => obj.delete())
  URL.revokeObjectURL(pthreadUrl)
  URL.revokeObjectURL(processorUrl)
}
class Recognizer extends EventTarget {
  constructor() {
    super()
  }
  _init(model, sampleRate) {
    this.obj = new Module.recognizer(model, sampleRate, objs.length)
    objs.push(this)
    this.ptr = Module._malloc(512)
  }
  async getNode(ctx, channelIndex = 0) {
    if(typeof this.node === "undefined") {
      let msgChannel = new MessageChannel()
      await ctx.audioWorklet.addModule(processorUrl)
      this.node = new AudioWorkletNode(ctx, 'BRProcessor', { channelCountMode: "max", numberOfInputs: 1, numberOfOutputs: 1 })
      this.node.port.postMessage({cmd : "init", ptr: this.ptr, channel: channelIndex}, [msgChannel.port1])
      msgChannel.port1.onmessage = (ev) => {
        this.obj.acceptWaveForm()
      } 
    }
    return this.node
  }
  recognize(buf, channelIndex = 0) {
    Module.HEAPF32.set(buf.getChannelData(channelIndex).subarray(0, 512), this.ptr);
    this.obj.acceptWaveForm()
  }
  delete() {
    this.obj.delete()
    if(typeof this.node !== "undefined") {
      this.node.port.postMessage({cmd : "deinit"})
    }
  }
  setWords(words) {
    this.obj.setWords(words)
  }
  setPartialWords(partialWords) {
    this.obj.setPartialWords(partialWords)
  }
  setGrm(grm) {
    this.obj.setGrm(grm)
  }
  setSpkModel(model) {
    this.obj.setSpkModel(model.obj)
  }
  setNLSML(nlsml) {
    this.obj.setNLSML(nlsml)
  }
  setMaxAlternatives(alts) {
    this.obj.setMaxAlternatives(alts)
  }
}
class Model extends EventTarget {
  constructor(storepath, id) {
    super()
    this.obj = new Module.model(storepath, id, objs.length)
    objs.push(this)
  }
  delete() {
    this.obj.delete()
  }
}
class SpkModel extends EventTarget {
  constructor(storepath, id) {
    super()
    this.obj = new Module.spkModel(storepath, id, objs.length)
    objs.push(this)
  }
  delete() {
    this.obj.delete()
  }
}
Module.makeModel = async (url, storepath, id) => {
  try {
    let mdl = new Model(storepath, id)
  }
  catch(e) {
    return Promise.reject(e)
  }
  return new Promise((resolve, reject) => {
    mdl.addEventListener("_continue", (ev) => {
      if(ev.detail === ".") {
        return resolve(mdl)
      }
      mdl.delete()
      return reject(ev.detail)
    }, {once : true})
    if(mdl.obj.checkModel()) {
      mdl.obj.load(true)
      return;
    }
    (async () => {
      let res = await fetch(url)
      if(!res.ok) {
        return reject("Unable to download model")
      }
      await (await (await root.getFileHandle("m0dEl.tzst", {create : true})).createWritable()).write(await res.arrayBuffer()) 
      mdl.obj.afterFetch()
    })()
  })
}
Module.makeSpkModel = async (url, storepath, id) => {
  try {
    let mdl = new SpkModel(storepath, id)
  }
  catch(e) {
    return Promise.reject(e)
  }
  return new Promise((resolve, reject) => {
    mdl.addEventListener("_continue", (ev) => {
      if(ev.detail === ".") {
        return resolve(mdl)
      }
      mdl.delete()
      reject(ev.detail)
    }, {once : true})
    if(mdl.obj.checkModel()) {
      mdl.obj.load(true)
      return
    }
    (async () => {
      let res = await fetch(url)
      if(!res.ok) {
        return reject("Unable to download model")
      }
      let arr = await res.arrayBuffer()
      let mdlMem = Module._malloc(arr.byteLength) // Will free in C++
      Module.HEAP8.set(new Int8Array(arr), mdlMem)
      mdl.obj.afterFetch(mdlMem, arr.byteLength)
    })()
  })
}
Module.makeRecognizer = (model, sampleRate) => {
  let rec = new Recognizer()
  let retval = new Promise((resolve, reject) => {
    rec.addEventListener("_continue", (ev) => {
      if(ev.detail == ".") {
        objs.push(rec)
        return resolve(rec)
      }
      rec.delete()
      reject(ev.detail)
    }, {once : true})
  })
  rec._init(model.obj, sampleRate)
  return retval
}
let processorUrl = URL.createObjectURL(new Blob([
  (() => {
    registerProcessor("BRProcessor", class extends AudioWorkletProcessor {
      constructor(options) {
        super(options)
        this.done = false
        this.port.onmessage = (ev) => {
          if(ev.cmd === "deinit") this.done = false
        }
        this.ptr = options.processorOptions.ptr 
      }
      process(inputs, outputs, params) {
        if(this.done) return false;
        this.wasmMem.set(inputs[0].getChannelData(this.channel));
        this.recognizerPort.postMessage(".") 
        outputs = inputs
        return true
      }
    })
  }).toString()
], {type : "text/javascript"}))
// Taken from the worker.js file
let pthreadUrl = URL.createObjectURL(new Blob([
  (() => {
    /**
     * @license
     * Copyright 2015 The Emscripten Authors
     * SPDX-License-Identifier: MIT
     */

    // Pthread Web Worker startup routine:
    // This is the entry point file that is loaded first by each Web Worker
    // that executes pthreads on the Emscripten application.
    'use strict';

    var Module = {};

    // Thread-local guard variable for one-time init of the JS state
    var initializedJS = false;

    function assert(condition, text) {
      if (!condition) abort('Assertion failed: ' + text);
    }

    function threadPrintErr() {
      var text = Array.prototype.slice.call(arguments).join(' ');
      console.error(text);
    }
    function threadAlert() {
      var text = Array.prototype.slice.call(arguments).join(' ');
      postMessage({cmd: 'alert', text, threadId: Module['_pthread_self']()});
    }
    // We don't need out() for now, but may need to add it if we want to use it
    // here. Or, if this code all moves into the main JS, that problem will go
    // away. (For now, adding it here increases code size for no benefit.)
    var out = () => { throw 'out() is not defined in worker.js.'; }
    var err = threadPrintErr;
    self.alert = threadAlert;
    var dbg = threadPrintErr;

    Module['instantiateWasm'] = (info, receiveInstance) => {
      // Instantiate from the module posted from the main thread.
      // We can just use sync instantiation in the worker.
      var module = Module['wasmModule'];
      // We don't need the module anymore; new threads will be spawned from the main thread.
      Module['wasmModule'] = null;
      var instance = new WebAssembly.Instance(module, info);
      // TODO: Due to Closure regression https://github.com/google/closure-compiler/issues/3193,
      // the above line no longer optimizes out down to the following line.
      // When the regression is fixed, we can remove this if/else.
      return receiveInstance(instance);
    }

    // Turn unhandled rejected promises into errors so that the main thread will be
    // notified about them.
    self.onunhandledrejection = (e) => {
      throw e.reason || e;
    };

    function handleMessage(e) {
      try {
        if (e.data.cmd === 'load') { // Preload command that is called once per worker to parse and load the Emscripten code.

        // Until we initialize the runtime, queue up any further incoming messages.
        let messageQueue = [];
        self.onmessage = (e) => messageQueue.push(e);

        // And add a callback for when the runtime is initialized.
        self.startWorker = (instance) => {
          Module = instance;
          // Notify the main thread that this thread has loaded.
          postMessage({ 'cmd': 'loaded' });
          // Process any messages that were queued before the thread was ready.
          for (let msg of messageQueue) {
            handleMessage(msg);
          }
          // Restore the real message handler.
          self.onmessage = handleMessage;
        };

          // Module and memory were sent from main thread
          Module['wasmModule'] = e.data.wasmModule;

          // Use `const` here to ensure that the variable is scoped only to
          // that iteration, allowing safe reference from a closure.
          for (const handler of e.data.handlers) {
            Module[handler] = (...args) => {
              postMessage({ cmd: 'callHandler', handler, args: args });
            }
          }

          Module['wasmMemory'] = e.data.wasmMemory;

          Module['buffer'] = Module['wasmMemory'].buffer;

          Module['workerID'] = e.data.workerID;

          Module['ENVIRONMENT_IS_PTHREAD'] = true;

          if (typeof e.data.urlOrBlob == 'string') {
            if (typeof self.trustedTypes != 'undefined' && self.trustedTypes.createPolicy) {
              var p = self.trustedTypes.createPolicy('emscripten#workerPolicy3', { createScriptURL: (ignored) => e.data.urlOrBlob });
              importScripts(p.createScriptURL('ignored'));
            } else
            importScripts(e.data.urlOrBlob);
          } else {
            var objectUrl = URL.createObjectURL(e.data.urlOrBlob);
            if (typeof self.trustedTypes != 'undefined' && self.trustedTypes.createPolicy) {
              var p = self.trustedTypes.createPolicy('emscripten#workerPolicy3', { createScriptURL: (ignored) => objectUrl });
              importScripts(p.createScriptURL('ignored'));
            } else
            importScripts(objectUrl);
            URL.revokeObjectURL(objectUrl);
          }
          loadBR(Module);
        } else if (e.data.cmd === 'run') {
          // Pass the thread address to wasm to store it for fast access.
          Module['__emscripten_thread_init'](e.data.pthread_ptr, /*is_main=*/0, /*is_runtime=*/0, /*can_block=*/1);

          // Await mailbox notifications with `Atomics.waitAsync` so we can start
          // using the fast `Atomics.notify` notification path.
          Module['__emscripten_thread_mailbox_await'](e.data.pthread_ptr);

          assert(e.data.pthread_ptr);
          // Also call inside JS module to set up the stack frame for this pthread in JS module scope
          Module['establishStackSpace']();
          Module['PThread'].receiveObjectTransfer(e.data);
          Module['PThread'].threadInitTLS();

          if (!initializedJS) {
            // Embind must initialize itself on all threads, as it generates support JS.
            // We only do this once per worker since they get reused
            Module['__embind_initialize_bindings']();
            initializedJS = true;
          }

          try {
            Module['invokeEntryPoint'](e.data.start_routine, e.data.arg);
          } catch(ex) {
            if (ex != 'unwind') {
              // The pthread "crashed".  Do not call `_emscripten_thread_exit` (which
              // would make this thread joinable).  Instead, re-throw the exception
              // and let the top level handler propagate it back to the main thread.
              throw ex;
            }
          }
        } else if (e.data.cmd === 'cancel') { // Main thread is asking for a pthread_cancel() on this thread.
          if (Module['_pthread_self']()) {
            Module['__emscripten_thread_exit'](-1);
          }
        } else if (e.data.target === 'setimmediate') {
          // no-op
        } else if (e.data.cmd === 'checkMailbox') {
          if (initializedJS) {
            Module['checkMailbox']();
          }
        } else if (e.data.cmd) {
          // The received message looks like something that should be handled by this message
          // handler, (since there is a e.data.cmd field present), but is not one of the
          // recognized commands:
          err(`worker.js received unknown command ${e.data.cmd}`);
          err(e.data);
        }
      } catch(ex) {
        err(`worker.js onmessage() captured an uncaught exception: ${ex}`);
        if (ex?.stack) err(ex.stack);
        Module['__emscripten_thread_crashed']?.();
        throw ex;
      }
    };

    self.onmessage = handleMessage;
  }).toString()
], {type : "text/javascript"}))
