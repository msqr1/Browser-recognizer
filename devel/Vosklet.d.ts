// TypeScript bindings for emscripten-generated code.  Automatically generated at compile time.
interface WasmModule {
  _pthread_self(): number;
  _malloc(_0: number): number;
  __emscripten_tls_init(): number;
  __embind_initialize_bindings(): void;
  __emscripten_thread_init(_0: number, _1: number, _2: number, _3: number, _4: number, _5: number): void;
  __emscripten_thread_crashed(): void;
  __emscripten_thread_exit(_0: number): void;
  ___set_stack_limits(_0: number, _1: number): void;
}

export interface model {
  checkModel(): void;
  afterFetch(): void;
  load(_0: boolean): void;
  delete(): void;
}

export interface spkModel {
  checkModel(): void;
  afterFetch(): void;
  load(_0: boolean): void;
  delete(): void;
}

export interface recognizer {
  setSpkModel(_0: spkModel): void;
  acceptWaveForm(): void;
  setWords(_0: boolean): void;
  setPartialWords(_0: boolean): void;
  setNLSML(_0: boolean): void;
  setMaxAlternatives(_0: number): void;
  setGrm(_0: ArrayBuffer|Uint8Array|Uint8ClampedArray|Int8Array|string): void;
  delete(): void;
}

interface EmbindModule {
  model: {new(_0: ArrayBuffer|Uint8Array|Uint8ClampedArray|Int8Array|string, _1: ArrayBuffer|Uint8Array|Uint8ClampedArray|Int8Array|string, _2: number): model};
  spkModel: {new(_0: ArrayBuffer|Uint8Array|Uint8ClampedArray|Int8Array|string, _1: ArrayBuffer|Uint8Array|Uint8ClampedArray|Int8Array|string, _2: number): spkModel};
  recognizer: {new(_0: model, _1: number, _2: number): recognizer; new(_0: model, _1: spkModel, _2: number, _3: number): recognizer; new(_0: model, _1: ArrayBuffer|Uint8Array|Uint8ClampedArray|Int8Array|string, _2: number, _3: number, _4: number): recognizer};
  setLogLevel(_0: number): void;
}
export type MainModule = WasmModule & EmbindModule;
