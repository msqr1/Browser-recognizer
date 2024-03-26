let objs = [] 
Module.cleanUp = () => {
  objs.forEach(obj => obj.delete())
  URL.revokeObjectURL(pthreadUrl)
  URL.revokeObjectURL(processorUrl)
}
Module.locateFile = (path, scriptDir) => {
  if(path === "Vosklet.js") return pthreadUrl
  return scriptDir+path
}
async function getFileHandle(path, create = false) {
  let components = path.split("/")
  let prevDir = await navigator.storage.getDirectory()
  for(let component of components.slice(0, -1)) {
    prevDir = await prevDir.getDirectoryHandle(component, { create : create })
  }
  return prevDir.getFileHandle(components[components.length - 1], { create : create })
}
class genericModel extends EventTarget {
  constructor(url, storepath, id, normalMdl) {
    super()
    objs.push(this)
    this.url = url
    this.storepath = storepath
    this.id = id
    this.normalMdl = normalMdl
  }
  static async _init(url, storepath, id, normalMdl) {
    let mdl = new genericModel(url, storepath, id, normalMdl)
    let result = new Promise((resolve, reject) => {
      mdl.addEventListener("0", ev => {
        if(ev.detail === "0") return resolve(mdl)
        mdl.delete()
        reject(ev.detail)
      }, { once : true })
    })
    let tar
    mdl.obj = new Module.genericModel(objs.length - 1, normalMdl, "/" + storepath, id)
    try {
      console.log("Getting Data file")
      let dataFile = await (await getFileHandle(storepath + "/model.tgz")).getFile()
      console.log("Getting ID file")
      let idFile = await (await getFileHandle(storepath + "/id")).getFile()
      if(await idFile.text() !== id) throw ""
      tar = dataFile.stream()  
    }
    catch {
      try {
        let res = await fetch(url)
        if(!res.ok) {
          throw "Unable to download model"
        }
        let teedBody = res.body.tee()
        let newDataFile = await (await getFileHandle(storepath + "/model.tgz", true)).createWritable()
        await newDataFile.write(await new Response(teedBody[0]).arrayBuffer())
        await newDataFile.close()
        let newIDFile = await (await getFileHandle(storepath + "/id", true)).createWritable()
        await newIDFile.write(id)
        await newIDFile.close()
        tar = teedBody[1]
      }
      catch(e) {
        mdl.obj.delete()
        throw e
      }
    }
    tar = await new Response(tar.pipeThrough(new DecompressionStream("gzip"))).arrayBuffer()
    let tarStart = Module._malloc(tar.byteLength)
    Module.HEAPU8.set(new Uint8Array(tar), tarStart)
    mdl.obj.extractAndLoad(tarStart, tar.byteLength)
    return result
  }
  delete() {
    if (this.obj) this.obj.delete()
  }
}
Module.makeModel = async (url, storepath, id) => {
  return genericModel._init(url, storepath, id, true)
}
Module.makeSpkModel = async (url, storepath, id) => {
  return genericModel._init(url, storepath, id, false)
}
class Recognizer extends EventTarget {
  constructor() {
    super()
    objs.push(this)
  }
  static async _init(model, sampleRate, mode, grammar, spkModel) {
    let rec = new Recognizer()
    let result = new Promise((resolve, reject) => {
      rec.addEventListener("0", ev => {
        if(ev.detail === "0") return resolve(rec)
        rec.delete()
        reject(ev.detail)
      }, { once : true })
    })
    switch(mode) {
      case 1:
        rec.obj = new Module.recognizer(objs.length - 1, sampleRate, model)
        break
      case 2:
        rec.obj = new Module.recognizer(objs.length -1, sampleRate, model, spkModel) 
        break
      default:
        rec.obj = new Module.recognizer(objs.length - 1, sampleRate, grammar, 0)  
    }
    return result
  } 
  async getNode(ctx) {
    if(typeof this.node === "undefined") {
      await ctx.audioWorklet.addModule("../src/processor.js", { credentials : "omit"})
      this.node = new AudioWorkletNode(ctx, 'VoskletProcessor', { channelCountMode: "explicit", channelCount: 1, numberOfInputs: 1, numberOfOutputs: 1, processorOptions: { dataBuf: this.dataBuf, state: this.state }})
    }
    return this.node
  }
  recognize(buf) {
    Module.HEAPF32.set(buf.getChannelData(0).subarray(0, 512), this.ptr)
  }
  delete() {
    if (this.obj) this.obj.delete()
    if(this.node) this.node.postMessage(0)
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
  setSpkModel(spkModel) {
    this.obj.setSpkModel(spkModel.obj)
  }
  setNLSML(nlsml) {
    this.obj.setNLSML(nlsml)
  }
  setMaxAlternatives(alts) {
    this.obj.setMaxAlternatives(alts)
  }
}
Module.makeRecognizer = (model, sampleRate) => {
  return Recognizer._init(model.obj, sampleRate, 1)
}
Module.makeRecognizerWithSpkModel = (model, sampleRate, spkModel) => {
  return Recognizer._init(model.obj, sampleRate, 2, null, spkModel)
} 
Module.makeRecognizerWithGrm = (model, sampleRate, grammar) => {
  return Recognizer._init(model.obj, sampleRate, 3, grammar, null)
} 
/*let processorURL = URL.createObjectURL(new Blob(['(',
  (() => {
    registerProcessor("VoskletProcessor", class extends AudioWorkletProcessor {
      constructor(options) {
        this.channelIndex = options.processorOptions.channelIndex
        this.dataBuf = options.processorOptions.dataBuf
        this.state = options.processorOptions.state
      }
      process(inputs, outputs, params) {
        while(state[0])
        inputs.copyFromChannel(this.dataBuf, 0)
        return true
      }
    })
  }).toString(),
  ')()'], {type : "text/javascript"}))
let pthreadURL = URL.createObjectURL(new Blob(['(',
  (() => {
    { PTHREAD_SCRIPT }
  }).toString()
, ')()'], {type : "text/javascript"})) */