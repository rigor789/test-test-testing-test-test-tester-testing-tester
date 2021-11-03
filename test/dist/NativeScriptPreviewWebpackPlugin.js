var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
__export(exports, {
  NativeScriptPreviewWebpackPlugin: () => NativeScriptPreviewWebpackPlugin
});
var import_memfs = __toModule(require("memfs"));
var import_mime_types = __toModule(require("mime-types"));
var import_path = __toModule(require("path"));
function tapProcessSend(callback) {
  const currentSend = process.send;
  if (!currentSend) {
    return;
  }
  process.send = (...args) => {
    const res = currentSend.apply(process, args);
    callback(currentSend.bind(process), ...args);
    return res;
  };
}
class NativeScriptPreviewWebpackPlugin {
  constructor(fs = (0, import_memfs.createFsFromVolume)(new import_memfs.Volume())) {
    this.fs = fs;
  }
  apply(compiler) {
    const outPath = compiler.options.output.path;
    compiler.outputFileSystem = this.fs;
    tapProcessSend((send, message) => {
      if (!message) {
        return;
      }
      try {
        if (message.type !== "compilation") {
          return;
        }
        const { emittedAssets, staleAssets } = message.data;
        const dataToSend = {
          type: "files",
          data: {
            emittedAssets: emittedAssets.map((asset) => {
              const assetPath = `${outPath}/${asset}`;
              const { size } = this.fs.statSync(assetPath);
              return {
                path: asset,
                type: (0, import_mime_types.lookup)(import_path.default.extname(asset)),
                size,
                contents: this.fs.readFileSync(`${outPath}/${asset}`)
              };
            }),
            staleAssets
          }
        };
        send(dataToSend);
      } catch (err) {
        console.log(err);
      }
    });
  }
}
//# sourceMappingURL=NativeScriptPreviewWebpackPlugin.js.map
