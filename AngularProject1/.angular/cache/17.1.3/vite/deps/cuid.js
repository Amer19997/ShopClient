import {
  __commonJS
} from "./chunk-WKYGNSYM.js";

// ../node_modules/cuid/lib/pad.js
var require_pad = __commonJS({
  "../node_modules/cuid/lib/pad.js"(exports, module) {
    module.exports = function pad(num, size) {
      var s = "000000000" + num;
      return s.substr(s.length - size);
    };
  }
});

// ../node_modules/cuid/lib/fingerprint.browser.js
var require_fingerprint_browser = __commonJS({
  "../node_modules/cuid/lib/fingerprint.browser.js"(exports, module) {
    var pad = require_pad();
    var env = typeof window === "object" ? window : self;
    var globalCount = Object.keys(env).length;
    var mimeTypesLength = navigator.mimeTypes ? navigator.mimeTypes.length : 0;
    var clientId = pad((mimeTypesLength + navigator.userAgent.length).toString(36) + globalCount.toString(36), 4);
    module.exports = function fingerprint() {
      return clientId;
    };
  }
});

// ../node_modules/cuid/lib/getRandomValue.browser.js
var require_getRandomValue_browser = __commonJS({
  "../node_modules/cuid/lib/getRandomValue.browser.js"(exports, module) {
    var getRandomValue;
    var crypto = typeof window !== "undefined" && (window.crypto || window.msCrypto) || typeof self !== "undefined" && self.crypto;
    if (crypto) {
      lim = Math.pow(2, 32) - 1;
      getRandomValue = function() {
        return Math.abs(crypto.getRandomValues(new Uint32Array(1))[0] / lim);
      };
    } else {
      getRandomValue = Math.random;
    }
    var lim;
    module.exports = getRandomValue;
  }
});

// ../node_modules/cuid/index.js
var require_cuid = __commonJS({
  "../node_modules/cuid/index.js"(exports, module) {
    var fingerprint = require_fingerprint_browser();
    var pad = require_pad();
    var getRandomValue = require_getRandomValue_browser();
    var c = 0;
    var blockSize = 4;
    var base = 36;
    var discreteValues = Math.pow(base, blockSize);
    function randomBlock() {
      return pad((getRandomValue() * discreteValues << 0).toString(base), blockSize);
    }
    function safeCounter() {
      c = c < discreteValues ? c : 0;
      c++;
      return c - 1;
    }
    function cuid() {
      var letter = "c", timestamp = (/* @__PURE__ */ new Date()).getTime().toString(base), counter = pad(safeCounter().toString(base), blockSize), print = fingerprint(), random = randomBlock() + randomBlock();
      return letter + timestamp + counter + print + random;
    }
    cuid.slug = function slug() {
      var date = (/* @__PURE__ */ new Date()).getTime().toString(36), counter = safeCounter().toString(36).slice(-4), print = fingerprint().slice(0, 1) + fingerprint().slice(-1), random = randomBlock().slice(-2);
      return date.slice(-2) + counter + print + random;
    };
    cuid.isCuid = function isCuid(stringToCheck) {
      if (typeof stringToCheck !== "string")
        return false;
      if (stringToCheck.startsWith("c"))
        return true;
      return false;
    };
    cuid.isSlug = function isSlug(stringToCheck) {
      if (typeof stringToCheck !== "string")
        return false;
      var stringLength = stringToCheck.length;
      if (stringLength >= 7 && stringLength <= 10)
        return true;
      return false;
    };
    cuid.fingerprint = fingerprint;
    module.exports = cuid;
  }
});
export default require_cuid();
//# sourceMappingURL=cuid.js.map
