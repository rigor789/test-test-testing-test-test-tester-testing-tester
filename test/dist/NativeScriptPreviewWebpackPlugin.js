var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var NativeScriptPreviewWebpackPlugin_exports = {};
__export(NativeScriptPreviewWebpackPlugin_exports, {
  NativeScriptPreviewWebpackPlugin: () => NativeScriptPreviewWebpackPlugin
});
module.exports = __toCommonJS(NativeScriptPreviewWebpackPlugin_exports);
var import_memfs = require("memfs");
var import_mime_types = require("mime-types");
var import_path = __toESM(require("path"));
function tapProcessSend(callback) {
  const currentSend = process.send.bind(process);
  if (!currentSend) {
    return;
  }
  process.send = (...args) => {
    let res;
    try {
      console.log(...args);
      res = currentSend(...args);
    } catch (err) {
      console.log("Error in tapProcessSend", err);
    }
    try {
      callback(currentSend, ...args);
    } catch (err) {
      console.log("Error in tapProcessSend callback.", err);
    }
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  NativeScriptPreviewWebpackPlugin
});
//# sourceMappingURL=NativeScriptPreviewWebpackPlugin.js.map
