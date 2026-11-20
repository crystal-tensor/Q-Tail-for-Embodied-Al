"use strict";

function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var _React = React,
  useState = _React.useState,
  useEffect = _React.useEffect,
  useRef = _React.useRef;

// --- Icons (using inline SVG for standalone reliability) ---
var IconChevronRight = function IconChevronRight(_ref) {
  var _ref$className = _ref.className,
    className = _ref$className === void 0 ? "w-5 h-5" : _ref$className;
  return /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/polaris/svg",
    className: className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "9 18 15 12 9 6"
  }));
};
var IconArrowRight = function IconArrowRight(_ref2) {
  var _ref2$className = _ref2.className,
    className = _ref2$className === void 0 ? "w-5 h-5" : _ref2$className;
  return /*#__PURE__*/React.createElement("svg", {
    className: className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "5",
    y1: "12",
    x2: "19",
    y2: "12"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "12 5 19 12 12 19"
  }));
};
var IconAtom = function IconAtom(_ref3) {
  var _ref3$className = _ref3.className,
    className = _ref3$className === void 0 ? "w-6 h-6" : _ref3$className;
  return /*#__PURE__*/React.createElement("svg", {
    className: className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
  }));
};
var IconBrain = function IconBrain(_ref4) {
  var _ref4$className = _ref4.className,
    className = _ref4$className === void 0 ? "w-6 h-6" : _ref4$className;
  return /*#__PURE__*/React.createElement("svg", {
    className: className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"
  }));
};
var IconNetwork = function IconNetwork(_ref5) {
  var _ref5$className = _ref5.className,
    className = _ref5$className === void 0 ? "w-6 h-6" : _ref5$className;
  return /*#__PURE__*/React.createElement("svg", {
    className: className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "16",
    y: "16",
    width: "6",
    height: "6",
    rx: "1"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "2",
    y: "16",
    width: "6",
    height: "6",
    rx: "1"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "9",
    y: "2",
    width: "6",
    height: "6",
    rx: "1"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 12V8"
  }));
};
var IconChart = function IconChart(_ref6) {
  var _ref6$className = _ref6.className,
    className = _ref6$className === void 0 ? "w-6 h-6" : _ref6$className;
  return /*#__PURE__*/React.createElement("svg", {
    className: className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "18",
    y1: "20",
    x2: "18",
    y2: "10"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "20",
    x2: "12",
    y2: "4"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "6",
    y1: "20",
    x2: "6",
    y2: "14"
  }));
};
var IconCheck = function IconCheck(_ref7) {
  var _ref7$className = _ref7.className,
    className = _ref7$className === void 0 ? "w-5 h-5" : _ref7$className;
  return /*#__PURE__*/React.createElement("svg", {
    className: className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "20 6 9 17 4 12"
  }));
};
var IconPlay = function IconPlay(_ref8) {
  var _ref8$className = _ref8.className,
    className = _ref8$className === void 0 ? "w-5 h-5" : _ref8$className;
  return /*#__PURE__*/React.createElement("svg", {
    className: className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("polygon", {
    points: "5 3 19 12 5 21 5 3"
  }));
};
var IconDownload = function IconDownload(_ref9) {
  var _ref9$className = _ref9.className,
    className = _ref9$className === void 0 ? "w-5 h-5" : _ref9$className;
  return /*#__PURE__*/React.createElement("svg", {
    className: className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "7 10 12 15 17 10"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "15",
    x2: "12",
    y2: "3"
  }));
};
var IconUpload = function IconUpload(_ref0) {
  var _ref0$className = _ref0.className,
    className = _ref0$className === void 0 ? "w-5 h-5" : _ref0$className;
  return /*#__PURE__*/React.createElement("svg", {
    className: className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "17 8 12 3 7 8"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "3",
    x2: "12",
    y2: "15"
  }));
};
var IconDatabase = function IconDatabase(_ref1) {
  var _ref1$className = _ref1.className,
    className = _ref1$className === void 0 ? "w-5 h-5" : _ref1$className;
  return /*#__PURE__*/React.createElement("svg", {
    className: className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("ellipse", {
    cx: "12",
    cy: "5",
    rx: "9",
    ry: "3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"
  }));
};
var IconCpu = function IconCpu(_ref10) {
  var _ref10$className = _ref10.className,
    className = _ref10$className === void 0 ? "w-5 h-5" : _ref10$className;
  return /*#__PURE__*/React.createElement("svg", {
    className: className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "4",
    y: "4",
    width: "16",
    height: "16",
    rx: "2",
    ry: "2"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "9",
    y: "9",
    width: "6",
    height: "6"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "9",
    y1: "1",
    x2: "9",
    y2: "4"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "15",
    y1: "1",
    x2: "15",
    y2: "4"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "9",
    y1: "20",
    x2: "9",
    y2: "23"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "15",
    y1: "20",
    x2: "15",
    y2: "23"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "20",
    y1: "9",
    x2: "23",
    y2: "9"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "20",
    y1: "14",
    x2: "23",
    y2: "14"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "1",
    y1: "9",
    x2: "4",
    y2: "9"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "1",
    y1: "14",
    x2: "4",
    y2: "14"
  }));
};

// --- Components ---

var Navbar = function Navbar() {
  return /*#__PURE__*/React.createElement("nav", {
    className: "fixed top-0 left-0 right-0 z-50 glass-card border-x-0 border-t-0 rounded-none bg-qbg/80"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-7xl mx-auto px-6 h-16 flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "flex items-center gap-2 hover:opacity-80 transition-opacity"
  }, /*#__PURE__*/React.createElement(IconAtom, {
    className: "text-qcyan w-7 h-7"
  }), /*#__PURE__*/React.createElement("span", {
    className: "font-bold tracking-widest text-white"
  }, "Q-TAIL")), /*#__PURE__*/React.createElement("div", {
    className: "hidden lg:flex items-center gap-6 text-sm text-slate-300"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#latest",
    className: "hover:text-qcyan"
  }, "\u6700\u65B0\u8FDB\u5C55"), /*#__PURE__*/React.createElement("a", {
    href: "#results",
    className: "hover:text-qcyan"
  }, "\u9010\u4EFB\u52A1\u6307\u6807"), /*#__PURE__*/React.createElement("a", {
    href: "#hardware",
    className: "hover:text-qcyan"
  }, "Baihua\u771F\u673A"), /*#__PURE__*/React.createElement("a", {
    href: "#architecture",
    className: "hover:text-qcyan"
  }, "\u6280\u672F\u67B6\u6784"), /*#__PURE__*/React.createElement("a", {
    href: "#research",
    className: "hover:text-qcyan"
  }, "\u75DB\u89C9\u4E0EVLA/WAM"), /*#__PURE__*/React.createElement("a", {
    href: "qtail-data-engine.html",
    className: "hover:text-qcyan"
  }, "\u6570\u636E\u5F15\u64CE")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("a", {
    href: "https://github.com/crystal-tensor/Q-Tail-for-Embodied-Al",
    rel: "noopener noreferrer",
    target: "_blank",
    className: "text-sm font-medium px-4 py-2 rounded-full border border-slate-700 hover:border-qcyan hover:text-qcyan transition-colors"
  }, "GitHub"))));
};
var Hero = function Hero() {
  return /*#__PURE__*/React.createElement("section", {
    className: "relative pt-32 pb-24 overflow-hidden min-h-[90vh] flex flex-col justify-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 bg-grid-pattern bg-grid opacity-[0.05] pointer-events-none"
  }), /*#__PURE__*/React.createElement("div", {
    className: "absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-hero-glow rounded-full opacity-60 pointer-events-none blur-3xl"
  }), /*#__PURE__*/React.createElement("div", {
    className: "max-w-7xl mx-auto px-6 relative z-10 w-full"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-center max-w-4xl mx-auto animate-slide-up"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight"
  }, /*#__PURE__*/React.createElement("span", {
    className: "gradient-text"
  }, "From QRCS to Embodied AI")), /*#__PURE__*/React.createElement("p", {
    className: "text-2xl md:text-3xl font-medium text-white mb-12 leading-relaxed max-w-3xl mx-auto text-balance"
  }, "\u7528\u91CF\u5B50\u5206\u5E03\u91CD\u65B0\u8BBE\u8BA1\u5177\u8EAB\u667A\u80FD\u8BAD\u7EC3\u5206\u5E03\uFF0C", /*#__PURE__*/React.createElement("br", {
    className: "hidden md:block"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-slate-300"
  }, "\u8BA9\u6A21\u578B\u66F4\u65E9\u770B\u5230\u771F\u6B63\u91CD\u8981\u7684"), /*#__PURE__*/React.createElement("span", {
    className: "text-qcyan"
  }, "\u957F\u5C3E\u4EFB\u52A1"), "\u3002"), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#architecture",
    className: "w-full sm:w-auto px-8 py-4 rounded-full bg-white text-black font-semibold hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
  }, "\u67E5\u770B\u6838\u5FC3\u67B6\u6784"), /*#__PURE__*/React.createElement("a", {
    href: "#latest",
    className: "w-full sm:w-auto px-8 py-4 rounded-full glass-card text-white font-semibold hover:bg-white/5 transition-colors gradient-border"
  }, "\u67E5\u770B50\u4EFB\u52A1\u4E0E54q\u65B0\u8FDB\u5C55"))), /*#__PURE__*/React.createElement("div", {
    className: "max-w-5xl mx-auto glass-card p-6 md:p-8 rounded-2xl animate-slide-up delay-200"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col md:flex-row items-center justify-between gap-4 text-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex-1 flex flex-col items-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-12 h-12 rounded-full bg-qpurple/20 flex items-center justify-center text-qpurple mb-3"
  }, /*#__PURE__*/React.createElement(IconAtom, null)), /*#__PURE__*/React.createElement("div", {
    className: "font-bold text-white text-sm md:text-base"
  }, "\u91CF\u5B50\u6E90\u5206\u5E03"), /*#__PURE__*/React.createElement("div", {
    className: "text-xs text-slate-400 mt-1 font-mono"
  }, "\u975E\u5747\u5300\u5148\u9A8C")), /*#__PURE__*/React.createElement("div", {
    className: "text-slate-600 hidden md:block"
  }, /*#__PURE__*/React.createElement(IconChevronRight, null)), /*#__PURE__*/React.createElement("div", {
    className: "text-slate-600 md:hidden my-2 rotate-90"
  }, /*#__PURE__*/React.createElement(IconChevronRight, null)), /*#__PURE__*/React.createElement("div", {
    className: "flex-1 flex flex-col items-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 mb-3"
  }, /*#__PURE__*/React.createElement(IconNetwork, null)), /*#__PURE__*/React.createElement("div", {
    className: "font-bold text-white text-sm md:text-base"
  }, "\u8BED\u4E49\u6620\u5C04"), /*#__PURE__*/React.createElement("div", {
    className: "text-xs text-slate-400 mt-1 font-mono"
  }, "\u4EFB\u52A1\u7A00\u6709\u5EA6")), /*#__PURE__*/React.createElement("div", {
    className: "text-slate-600 hidden md:block"
  }, /*#__PURE__*/React.createElement(IconChevronRight, null)), /*#__PURE__*/React.createElement("div", {
    className: "text-slate-600 md:hidden my-2 rotate-90"
  }, /*#__PURE__*/React.createElement(IconChevronRight, null)), /*#__PURE__*/React.createElement("div", {
    className: "flex-1 flex flex-col items-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-12 h-12 rounded-full bg-qcyan/20 flex items-center justify-center text-qcyan mb-3"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "w-6 h-6",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "3.27 6.96 12 12.01 20.73 6.96"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "22.08",
    x2: "12",
    y2: "12"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "font-bold text-white text-sm md:text-base"
  }, "\u4EFB\u52A1\u8C03\u5EA6"), /*#__PURE__*/React.createElement("div", {
    className: "text-xs text-slate-400 mt-1 font-mono"
  }, "q=(1-\u03B7)b+\u03B7Ps")), /*#__PURE__*/React.createElement("div", {
    className: "text-slate-600 hidden md:block"
  }, /*#__PURE__*/React.createElement(IconChevronRight, null)), /*#__PURE__*/React.createElement("div", {
    className: "text-slate-600 md:hidden my-2 rotate-90"
  }, /*#__PURE__*/React.createElement(IconChevronRight, null)), /*#__PURE__*/React.createElement("div", {
    className: "flex-1 flex flex-col items-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 mb-3"
  }, /*#__PURE__*/React.createElement(IconBrain, null)), /*#__PURE__*/React.createElement("div", {
    className: "font-bold text-white text-sm md:text-base"
  }, "Meta-World"), /*#__PURE__*/React.createElement("div", {
    className: "text-xs text-slate-400 mt-1 font-mono"
  }, "\u5177\u8EAB\u8BAD\u7EC3\u73AF\u5883")), /*#__PURE__*/React.createElement("div", {
    className: "text-slate-600 hidden md:block"
  }, /*#__PURE__*/React.createElement(IconChevronRight, null)), /*#__PURE__*/React.createElement("div", {
    className: "text-slate-600 md:hidden my-2 rotate-90"
  }, /*#__PURE__*/React.createElement(IconChevronRight, null)), /*#__PURE__*/React.createElement("div", {
    className: "flex-1 flex flex-col items-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-12 h-12 rounded-full bg-rose-500/20 flex items-center justify-center text-rose-400 mb-3"
  }, /*#__PURE__*/React.createElement(IconChart, null)), /*#__PURE__*/React.createElement("div", {
    className: "font-bold text-white text-sm md:text-base"
  }, "\u957F\u5C3E\u8BC4\u6D4B"), /*#__PURE__*/React.createElement("div", {
    className: "text-xs text-slate-400 mt-1 font-mono"
  }, "\u8BEF\u5DEE\u4E0E\u6700\u574F\u4EFB\u52A1")))), /*#__PURE__*/React.createElement("div", {
    className: "max-w-4xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 animate-slide-up delay-300"
  }, /*#__PURE__*/React.createElement("div", {
    className: "glass-card py-3 px-5 rounded-xl flex items-center justify-between border-l-2 border-l-qpurple"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-sm font-medium text-slate-300"
  }, "\u91CF\u5B50\u6E90\u6570\u636E"), /*#__PURE__*/React.createElement("span", {
    className: "text-qpurple font-mono text-xs px-2 py-1 bg-qpurple/10 rounded flex items-center gap-1"
  }, /*#__PURE__*/React.createElement(IconCheck, {
    className: "w-3 h-3"
  }), " \u5DF2\u63A5\u5165")), /*#__PURE__*/React.createElement("div", {
    className: "glass-card py-3 px-5 rounded-xl flex items-center justify-between border-l-2 border-l-emerald-500"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-sm font-medium text-slate-300"
  }, "50\u4EFB\u52A1 / 42\u573A\u666F"), /*#__PURE__*/React.createElement("span", {
    className: "text-emerald-400 font-mono text-xs px-2 py-1 bg-emerald-500/10 rounded flex items-center gap-1"
  }, /*#__PURE__*/React.createElement(IconCheck, {
    className: "w-3 h-3"
  }), " \u72B6\u6001\u8F68\u8FF9\u5DF2\u6821\u9A8C")), /*#__PURE__*/React.createElement("div", {
    className: "glass-card py-3 px-5 rounded-xl flex items-center justify-between border-l-2 border-l-qcyan"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-sm font-medium text-slate-300"
  }, "Baihua 54q"), /*#__PURE__*/React.createElement("span", {
    className: "text-qcyan font-mono text-xs px-2 py-1 bg-qcyan/10 rounded animate-pulse"
  }, "4,096 shots \xB7 Finished")))));
};
var ValueProps = function ValueProps() {
  return /*#__PURE__*/React.createElement("section", {
    className: "py-20 border-y border-white/5 bg-black/40"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-7xl mx-auto px-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-center mb-16"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "text-sm font-mono text-qcyan tracking-widest uppercase mb-3"
  }, "Core Value"), /*#__PURE__*/React.createElement("p", {
    className: "text-3xl font-bold text-white"
  }, "Turning QRCS into Rare Data Engine for Every Intelligent System.")), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-3 gap-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-8 rounded-2xl bg-gradient-to-b from-white/[0.03] to-transparent border border-white/5 hover:border-white/10 transition-colors"
  }, /*#__PURE__*/React.createElement(IconAtom, {
    className: "w-8 h-8 text-qpurple mb-6"
  }), /*#__PURE__*/React.createElement("h3", {
    className: "text-xl font-bold text-white mb-3"
  }, "\u91CF\u5B50\u975E\u5747\u5300\u6E90"), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-400 leading-relaxed"
  }, "\u7814\u7A76\u91CF\u5B50\u968F\u673A\u7535\u8DEF\u91C7\u6837\u7684\u975E\u5747\u5300\u8BA1\u6570\uFF0C\u6784\u5EFA\u5019\u9009\u4EFB\u52A1\u5206\u914D\u5148\u9A8C\uFF0C\u5E76\u4E0E\u7ECF\u5178\u98CE\u9669\u52A0\u6743\u548C\u7406\u60F3\u91C7\u6837\u8FDB\u884C\u5BF9\u7167\u3002")), /*#__PURE__*/React.createElement("div", {
    className: "p-8 rounded-2xl bg-gradient-to-b from-white/[0.03] to-transparent border border-white/5 hover:border-white/10 transition-colors"
  }, /*#__PURE__*/React.createElement(IconNetwork, {
    className: "w-8 h-8 text-blue-400 mb-6"
  }), /*#__PURE__*/React.createElement("h3", {
    className: "text-xl font-bold text-white mb-3"
  }, "\u8BED\u4E49\u957F\u5C3E\u6620\u5C04"), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-400 leading-relaxed"
  }, "\u5C06\u62BD\u8C61\u7684\u91CF\u5B50\u6001\u6982\u7387\u6620\u5C04\u5230\u5177\u8EAB\u667A\u80FD\u7684\u5177\u4F53\u4EFB\u52A1\u4E2D\uFF0C\u901A\u8FC7\u4EFB\u52A1\u7A00\u6709\u5EA6\u4E0E\u98CE\u9669\u5206\u6570\uFF0C\u6784\u9020\u53EF\u5BA1\u8BA1\u7684\u4EFB\u52A1\u9884\u7B97\u6620\u5C04\u3002")), /*#__PURE__*/React.createElement("div", {
    className: "p-8 rounded-2xl bg-gradient-to-b from-white/[0.03] to-transparent border border-white/5 hover:border-white/10 transition-colors"
  }, /*#__PURE__*/React.createElement(IconBrain, {
    className: "w-8 h-8 text-qcyan mb-6"
  }), /*#__PURE__*/React.createElement("h3", {
    className: "text-xl font-bold text-white mb-3"
  }, "\u8BAD\u7EC3\u5206\u5E03\u5F15\u64CE"), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-400 leading-relaxed"
  }, "\u5728\u4E0D\u4FEE\u6539\u5E95\u5C42\u7B56\u7565\u7F51\u7EDC\u7684\u524D\u63D0\u4E0B\uFF0C\u901A\u8FC7\u667A\u80FD\u8C03\u5EA6\u5206\u914D\u56FA\u5B9A\u8BAD\u7EC3\u9884\u7B97\uFF0C\u8BC4\u4F30\u957F\u5C3E\u8BEF\u5DEE\u3001\u6270\u52A8\u9C81\u68D2\u6027\u53CA\u6700\u574F\u4EFB\u52A1\u8868\u73B0\u3002")))));
};
var CoreAdvantages = function CoreAdvantages() {
  return /*#__PURE__*/React.createElement("section", {
    id: "advantages",
    className: "py-24 relative"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-7xl mx-auto px-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mb-20"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "text-4xl font-bold text-white mb-6"
  }, "\u4E09\u5927\u6838\u5FC3\u4F18\u52BF"), /*#__PURE__*/React.createElement("div", {
    className: "w-20 h-1 bg-gradient-to-r from-qcyan to-qpurple"
  })), /*#__PURE__*/React.createElement("div", {
    className: "space-y-24"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "inline-flex items-center gap-2 px-3 py-1 rounded-md bg-qpurple/10 text-qpurple text-sm font-mono mb-6"
  }, /*#__PURE__*/React.createElement(IconAtom, {
    className: "w-4 h-4"
  }), " \u6A21\u5757 A"), /*#__PURE__*/React.createElement("h3", {
    className: "text-3xl font-bold text-white mb-6"
  }, "\u91CF\u5B50\u6E90\u6570\u636E\uFF1A", /*#__PURE__*/React.createElement("br", null), "\u4E0D\u662F\u968F\u673A\u6570\uFF0C\u800C\u662F\u8BAD\u7EC3\u5148\u9A8C"), /*#__PURE__*/React.createElement("p", {
    className: "text-lg text-slate-400 leading-relaxed mb-8"
  }, "\u771F\u5B9E\u4E16\u754C\u4E0D\u662F\u5747\u5300\u5206\u5E03\u7684\u3002\u7406\u60F3\u968F\u673A\u7535\u8DEF\u53EF\u5448\u73B0Porter\u2013Thomas\u7EDF\u8BA1\uFF1B\u5B9E\u9645\u786C\u4EF6\u5206\u5E03\u987B\u53E6\u884C\u6D4B\u91CF\u4E0E\u68C0\u9A8C\u3002\u8FD9\u79CD\u7ED3\u6784\u5316\u968F\u673A\u6027\u53EF\u76F4\u63A5\u4F5C\u4E3A\u5177\u8EAB\u667A\u80FD\u8BAD\u7EC3\u5206\u5E03\u8BBE\u8BA1\u7684\u6E90\u5934\u3002"), /*#__PURE__*/React.createElement("ul", {
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("li", {
    className: "flex items-start gap-3 text-slate-300"
  }, /*#__PURE__*/React.createElement(IconCheck, {
    className: "w-5 h-5 text-qcyan shrink-0 mt-0.5"
  }), " \u771F\u5B9E\u91CF\u5B50\u786C\u4EF6\u6570\u636E (CSV) \u5B8C\u6574\u63A5\u5165\u9A8C\u8BC1"), /*#__PURE__*/React.createElement("li", {
    className: "flex items-start gap-3 text-slate-300"
  }, /*#__PURE__*/React.createElement(IconCheck, {
    className: "w-5 h-5 text-qcyan shrink-0 mt-0.5"
  }), " \u81EA\u52A8\u8BA1\u7B97\u652F\u6301\u96C6\u3001\u4FE1\u606F\u71B5\u3001CV \u4E0E Gini \u7CFB\u6570"))), /*#__PURE__*/React.createElement("div", {
    className: "glass-card rounded-2xl p-2 aspect-[4/3] flex flex-col gradient-border relative group overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 bg-qpurple/5 group-hover:bg-qpurple/10 transition-colors"
  }), /*#__PURE__*/React.createElement("div", {
    className: "flex-1 flex items-center justify-center border border-white/5 rounded-xl bg-[#050508] relative overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 flex items-center justify-center bg-black/40 p-2"
  }, /*#__PURE__*/React.createElement("img", {
    src: "docs/assets/finals_50tasks_20261120/dark_baihua54_topology.png",
    alt: "PT Distribution",
    className: "w-full h-full object-contain opacity-90 hover:opacity-100 transition-opacity rounded"
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "order-2 lg:order-1 glass-card rounded-2xl p-2 aspect-[4/3] flex flex-col gradient-border relative group overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 bg-emerald-500/5 group-hover:bg-emerald-500/10 transition-colors"
  }), /*#__PURE__*/React.createElement("div", {
    className: "flex-1 flex items-center justify-center border border-white/5 rounded-xl bg-[#050508] relative overflow-hidden"
  }, /*#__PURE__*/React.createElement("img", {
    src: "docs/assets/finals_50tasks_20261120/dark_aggregate_errors.png",
    alt: "50\u4EFB\u52A1\u59FF\u6001\u9884\u6D4B\u540C\u9884\u7B97\u5BF9\u7167",
    className: "w-full h-full object-contain p-2",
    loading: "lazy"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "order-1 lg:order-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 text-emerald-400 text-sm font-mono mb-6"
  }, /*#__PURE__*/React.createElement(IconBrain, {
    className: "w-4 h-4"
  }), " \u6A21\u5757 B"), /*#__PURE__*/React.createElement("h3", {
    className: "text-3xl font-bold text-white mb-6"
  }, "\u5177\u8EAB\u667A\u80FD\uFF1A", /*#__PURE__*/React.createElement("br", null), "\u91CF\u5B50\u9A71\u52A8\u7684\u5177\u8EAB\u667A\u80FD\u957F\u5C3E\u6570\u636E\u5F15\u64CE"), /*#__PURE__*/React.createElement("p", {
    className: "text-lg text-slate-400 leading-relaxed mb-8"
  }, "\u666E\u901A RL \u8BAD\u7EC3\u503E\u5411\u4E8E\u201C\u5265\u524A\u201D\u5BB9\u6613\u5F97\u5206\u7684\u5934\u90E8\u4EFB\u52A1\uFF08\u5982 reach, push\uFF09\uFF0C\u5BFC\u81F4\u957F\u5C3E\u4EFB\u52A1\uFF08\u5982 peg-insert, basketball\uFF09\u906D\u9047\u707E\u96BE\u6027\u5931\u8D25\u3002From QRCS to Embodied AI \u76F4\u63A5\u9488\u5BF9 tail task success \u4E0E\u6700\u574F\u60C5\u51B5\u98CE\u9669\uFF08CVaR@20\uFF09\u8FDB\u884C\u5E95\u5C42\u4F18\u5316\u3002"), /*#__PURE__*/React.createElement("ul", {
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("li", {
    className: "flex items-start gap-3 text-slate-300"
  }, /*#__PURE__*/React.createElement(IconCheck, {
    className: "w-5 h-5 text-emerald-400 shrink-0 mt-0.5"
  }), " \u4E0D\u4FEE\u6539 Meta-World \u6E90\u7801\uFF0C\u7EAF\u8C03\u5EA6\u5C42\u5E72\u9884"), /*#__PURE__*/React.createElement("li", {
    className: "flex items-start gap-3 text-slate-300"
  }, /*#__PURE__*/React.createElement(IconCheck, {
    className: "w-5 h-5 text-emerald-400 shrink-0 mt-0.5"
  }), " \u5728\u540C\u9884\u7B97\u5BF9\u7167\u4E2D\u6D4B\u91CF\u6837\u672C\u6548\u7387\u4E0E\u6270\u52A8\u9C81\u68D2\u6027")))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-500/10 text-blue-400 text-sm font-mono mb-6"
  }, /*#__PURE__*/React.createElement(IconNetwork, {
    className: "w-4 h-4"
  }), " \u6A21\u5757 C"), /*#__PURE__*/React.createElement("h3", {
    className: "text-3xl font-bold text-white mb-6"
  }, "\u591A\u667A\u80FD\u4F53\uFF1A", /*#__PURE__*/React.createElement("br", null), "\u628A\u590D\u6742\u6D41\u7A0B\u62C6\u6210\u53EF\u9A8C\u8BC1\u7684\u6A21\u5757"), /*#__PURE__*/React.createElement("p", {
    className: "text-lg text-slate-400 leading-relaxed mb-8"
  }, "\u4ECE\u6570\u636E\u89E3\u6790\u5230\u73AF\u5883\u8BAD\u7EC3\u94FE\u8DEF\u6781\u957F\u3002\u9879\u76EE\u5C06\u91C7\u6837\u3001\u6620\u5C04\u3001\u6570\u636E\u751F\u6210\u3001\u8BAD\u7EC3\u548C\u8BC4\u4F30\u5212\u5206\u4E3A\u53EF\u590D\u73B0\u6A21\u5757\uFF0C\u4FDD\u7559\u8F93\u5165\u3001\u914D\u7F6E\u4E0E\u7ED3\u679C\u8BB0\u5F55\u3002"), /*#__PURE__*/React.createElement("ul", {
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("li", {
    className: "flex items-start gap-3 text-slate-300"
  }, /*#__PURE__*/React.createElement(IconCheck, {
    className: "w-5 h-5 text-blue-400 shrink-0 mt-0.5"
  }), " \u804C\u8D23\u5355\u4E00\uFF1A\u5206\u522B\u8D1F\u8D23\u6570\u636E\u3001\u6620\u5C04\u3001\u8C03\u5EA6\u3001\u8BAD\u7EC3\u4E0E\u8BC4\u4F30"), /*#__PURE__*/React.createElement("li", {
    className: "flex items-start gap-3 text-slate-300"
  }, /*#__PURE__*/React.createElement(IconCheck, {
    className: "w-5 h-5 text-blue-400 shrink-0 mt-0.5"
  }), " Orchestrator \u4E3B\u63A7\u534F\u8C03\uFF0C\u5168\u6D41\u7A0B\u4E00\u952E\u81EA\u52A8\u5316"))), /*#__PURE__*/React.createElement("div", {
    className: "glass-card rounded-2xl p-6 aspect-[4/3] flex flex-col justify-center gradient-border relative"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-3 rounded border border-white/10 bg-white/5 flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-mono text-sm text-slate-300"
  }, "1. quantum_source_agent"), /*#__PURE__*/React.createElement("span", {
    className: "text-xs text-qpurple"
  }, "\u6570\u636E\u6807\u51C6\u5316")), /*#__PURE__*/React.createElement("div", {
    className: "p-3 rounded border border-white/10 bg-white/5 flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-mono text-sm text-slate-300"
  }, "2. semantic_mapper_agent"), /*#__PURE__*/React.createElement("span", {
    className: "text-xs text-blue-400"
  }, "\u957F\u5C3E\u8BED\u4E49\u5212\u5206")), /*#__PURE__*/React.createElement("div", {
    className: "p-3 rounded border border-qcyan/30 bg-qcyan/10 flex items-center justify-between relative overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute left-0 top-0 bottom-0 w-1 bg-qcyan"
  }), /*#__PURE__*/React.createElement("span", {
    className: "font-mono text-sm text-white font-medium pl-2"
  }, "3. quantum_scheduler_agent"), /*#__PURE__*/React.createElement("span", {
    className: "text-xs text-qcyan font-bold"
  }, "\u6838\u5FC3\uFF1A\u751F\u6210 q \u5206\u5E03")), /*#__PURE__*/React.createElement("div", {
    className: "p-3 rounded border border-white/10 bg-white/5 flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-mono text-sm text-slate-300"
  }, "4. training_agent"), /*#__PURE__*/React.createElement("span", {
    className: "text-xs text-emerald-400"
  }, "\u6267\u884C Meta-World")), /*#__PURE__*/React.createElement("div", {
    className: "p-3 rounded border border-white/10 bg-white/5 flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-mono text-sm text-slate-300"
  }, "5. evaluation_agent"), /*#__PURE__*/React.createElement("span", {
    className: "text-xs text-rose-400"
  }, "\u6307\u6807\u4E0E\u53EF\u89C6\u5316"))))))));
};
var QuantumAILoop = function QuantumAILoop() {
  return /*#__PURE__*/React.createElement("section", {
    className: "py-24 relative overflow-hidden bg-[#020617] border-y border-white/5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-qcyan/5 rounded-full blur-[100px] pointer-events-none"
  }), /*#__PURE__*/React.createElement("div", {
    className: "max-w-7xl mx-auto px-6 relative z-10"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-center mb-20"
  }, /*#__PURE__*/React.createElement("span", {
    className: "inline-block px-4 py-1 rounded-full bg-qcyan/10 border border-qcyan/30 text-qcyan text-sm font-bold tracking-widest mb-4 shadow-[0_0_15px_rgba(69,243,255,0.2)]"
  }, "BUSINESS MODEL / \u5546\u4E1A\u6A21\u5F0F\u6F14\u8FDB"), /*#__PURE__*/React.createElement("h2", {
    className: "text-4xl md:text-5xl font-extrabold text-white mb-6"
  }, "\u4ECE\u5355\u4E00\u7B97\u6CD5\u5230 ", /*#__PURE__*/React.createElement("span", {
    className: "text-transparent bg-clip-text bg-gradient-to-r from-qcyan to-emerald-400"
  }, "\u91CF\u5B50-AI \u95ED\u73AF\u6570\u636E\u5F15\u64CE")), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-400 text-lg max-w-3xl mx-auto font-light"
  }, "\u201C\u91CF\u5B50\u968F\u673A\u7535\u8DEF\u91C7\u6837\u4EA7\u751F\u53EF\u63A7\u5206\u5E03\uFF0CAI Agent \u8D1F\u8D23\u6821\u51C6\u3001\u89E3\u91CA\u3001\u8C03\u53C2\u548C\u6570\u636E\u670D\u52A1\u5316\uFF0C\u6700\u7EC8\u5F62\u6210\u91CF\u5B50-AI\u95ED\u73AF\u6570\u636E\u5F15\u64CE\u3002\u201D")), /*#__PURE__*/React.createElement("div", {
    className: "relative max-w-5xl mx-auto mt-12"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hidden md:block absolute top-1/2 left-1/4 right-1/4 h-64 border-y-2 border-dashed border-white/10 rounded-[100px] -translate-y-1/2 animate-[spin_30s_linear_infinite] opacity-30"
  }), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col md:flex-row items-center justify-between gap-8 relative z-10"
  }, /*#__PURE__*/React.createElement("div", {
    className: "glass-card w-full md:w-5/12 rounded-3xl p-8 border-2 border-qcyan/30 bg-black/60 backdrop-blur-xl relative group"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 bg-gradient-to-br from-qcyan/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl"
  }), /*#__PURE__*/React.createElement("div", {
    className: "text-center mb-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-20 h-20 mx-auto rounded-full bg-qcyan/10 flex items-center justify-center mb-4 border border-qcyan/30 shadow-[0_0_30px_rgba(69,243,255,0.2)]"
  }, /*#__PURE__*/React.createElement(IconAtom, {
    className: "w-10 h-10 text-qcyan"
  })), /*#__PURE__*/React.createElement("h3", {
    className: "text-2xl font-bold text-white mb-2"
  }, "\u91CF\u5B50\u5F15\u64CE\u5C42 (Quantum)"), /*#__PURE__*/React.createElement("div", {
    className: "text-qcyan text-sm font-mono"
  }, "\u7A33\u5B9A\u6D4B\u91CF\u4E0E\u6620\u5C04\u91C7\u6837\u5206\u5E03")), /*#__PURE__*/React.createElement("ul", {
    className: "space-y-3 text-slate-300 text-sm"
  }, /*#__PURE__*/React.createElement("li", {
    className: "flex items-start gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-qcyan mt-0.5"
  }, "\u25B9"), " \u771F\u5B9E Quafu \u786C\u4EF6\u91C7\u6837\uFF0C\u63D0\u53D6\u7269\u7406\u968F\u673A\u6027"), /*#__PURE__*/React.createElement("li", {
    className: "flex items-start gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-qcyan mt-0.5"
  }, "\u25B9"), " \u63D0\u4F9B\u5177\u5907\u6781\u7AEF\u957F\u5C3E\u7279\u6027\u7684\u9AD8\u7EF4\u6570\u5B66\u5148\u9A8C"))), /*#__PURE__*/React.createElement("div", {
    className: "flex md:flex-col items-center justify-center gap-4 py-8 md:py-0 w-full md:w-2/12"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col items-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-xs text-slate-400 mb-2 font-mono"
  }, "\u6570\u636E\u5206\u53D1"), /*#__PURE__*/React.createElement("svg", {
    className: "w-8 h-8 text-qcyan animate-pulse",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M17 8l4 4m0 0l-4 4m4-4H3"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col items-center mt-4"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "w-8 h-8 text-emerald-400 animate-pulse delay-75",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M7 16l-4-4m0 0l4-4m-4 4h18"
  })), /*#__PURE__*/React.createElement("div", {
    className: "text-xs text-slate-400 mt-2 font-mono"
  }, "\u53CD\u9988\u5BFB\u4F18"))), /*#__PURE__*/React.createElement("div", {
    className: "glass-card w-full md:w-5/12 rounded-3xl p-8 border-2 border-emerald-500/30 bg-black/60 backdrop-blur-xl relative group"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 bg-gradient-to-bl from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl"
  }), /*#__PURE__*/React.createElement("div", {
    className: "text-center mb-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-20 h-20 mx-auto rounded-full bg-emerald-500/10 flex items-center justify-center mb-4 border border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.2)]"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "w-10 h-10 text-emerald-400",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
  }))), /*#__PURE__*/React.createElement("h3", {
    className: "text-2xl font-bold text-white mb-2"
  }, "AI \u667A\u80FD\u4F53\u5C42 (Agent)"), /*#__PURE__*/React.createElement("div", {
    className: "text-emerald-400 text-sm font-mono"
  }, "\u8D1F\u8D23\u6821\u51C6\u3001\u89E3\u91CA\u4E0E\u670D\u52A1\u5316")), /*#__PURE__*/React.createElement("ul", {
    className: "space-y-3 text-slate-300 text-sm"
  }, /*#__PURE__*/React.createElement("li", {
    className: "flex items-start gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-emerald-400 mt-0.5"
  }, "\u25B9"), " \u63A5\u5165\u673A\u5668\u4EBA\u3001\u4F20\u611F\u5668\u4E0E\u591A\u6A21\u6001\u6821\u51C6\u573A\u666F"), /*#__PURE__*/React.createElement("li", {
    className: "flex items-start gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-emerald-400 mt-0.5"
  }, "\u25B9"), " \u81EA\u52A8\u8C03\u53C2 (Auto-Tune \u03B7) \u4E0E\u6700\u4F18\u4F20\u8F93 (OT) \u5BF9\u9F50")))), /*#__PURE__*/React.createElement("div", {
    className: "mt-12 text-center relative z-10"
  }, /*#__PURE__*/React.createElement("div", {
    className: "inline-flex flex-col items-center justify-center p-6 glass-card rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent min-w-[300px]"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-sm text-slate-400 mb-2"
  }, "\u6700\u7EC8\u5F62\u6001\u4EA4\u4ED8"), /*#__PURE__*/React.createElement("div", {
    className: "text-xl font-bold text-white"
  }, "\u89C4\u6A21\u5316\u8F93\u51FA\u9AD8\u8D28\u91CF\u3001\u591A\u6837\u3001\u53EF\u63A7\u6570\u636E\u96C6"), /*#__PURE__*/React.createElement("div", {
    className: "mt-3 flex gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "px-2 py-1 bg-white/5 rounded text-xs text-slate-300 border border-white/10"
  }, "\u6301\u7EED\u670D\u52A1"), /*#__PURE__*/React.createElement("span", {
    className: "px-2 py-1 bg-white/5 rounded text-xs text-slate-300 border border-white/10"
  }, "\u5546\u4E1A\u53D8\u73B0")))))));
};
var DataEngineArchitecture = function DataEngineArchitecture() {
  return /*#__PURE__*/React.createElement("section", {
    id: "architecture",
    className: "py-24 relative overflow-hidden bg-[#020617] border-y border-white/5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute top-0 left-1/4 w-96 h-96 bg-qcyan/10 rounded-full blur-[120px] pointer-events-none"
  }), /*#__PURE__*/React.createElement("div", {
    className: "absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"
  }), /*#__PURE__*/React.createElement("div", {
    className: "max-w-7xl mx-auto px-6 relative z-10"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-center mb-16"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-qcyan to-emerald-400 mb-6"
  }, "\u91CF\u5B50\u9A71\u52A8\u7684\u5177\u8EAB\u667A\u80FD\u6570\u636E\u751F\u6210\u5F15\u64CE"), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-400 text-lg max-w-3xl mx-auto font-light tracking-wide"
  }, "\u6570\u636E\u9769\u65B0 \xB7 \u667A\u80FD\u8DC3\u8FC1 \xB7 \u6301\u7EED\u53EF\u8BBE\u8BA1\u7684\u6570\u636E\u670D\u52A1\u5546")), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col gap-12 relative"
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-center mb-6"
  }, /*#__PURE__*/React.createElement("span", {
    className: "inline-block px-4 py-1 rounded-full bg-qcyan/10 border border-qcyan/30 text-qcyan text-sm font-bold tracking-widest shadow-[0_0_15px_rgba(69,243,255,0.2)]"
  }, "LAYER 01 / \u91CF\u5B50\u6E90\u5F15\u64CE")), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10"
  }, /*#__PURE__*/React.createElement("div", {
    className: "glass-card rounded-2xl p-8 border border-white/10 hover:border-qcyan/50 transition-all group bg-black/40 backdrop-blur-xl relative overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-qcyan to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
  }), /*#__PURE__*/React.createElement("div", {
    className: "w-16 h-16 rounded-xl bg-qcyan/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
  }, /*#__PURE__*/React.createElement(IconAtom, {
    className: "text-qcyan w-8 h-8"
  })), /*#__PURE__*/React.createElement("h3", {
    className: "text-xl font-bold text-white mb-3"
  }, "\u91CF\u5B50\u968F\u673A\u7535\u8DEF\u91C7\u6837"), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-400 text-sm leading-relaxed"
  }, "\u4F9D\u6258Quafu Baihua\u771F\u5B9E\u8D85\u5BFC\u91CF\u5B50\u82AF\u7247\uFF0C\u6267\u884C5q\u53C2\u8003\u7EBF\u8DEF\u53CA54q\u6D45\u6811\u4EA4\u4E92\u7EBF\u8DEF\uFF0C\u5F52\u6863\u8BA1\u6570\u4E0E\u7F16\u8BD1\u7ED3\u679C\u3002")), /*#__PURE__*/React.createElement("div", {
    className: "glass-card rounded-2xl p-8 border border-white/10 hover:border-blue-400/50 transition-all group bg-black/40 backdrop-blur-xl relative overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
  }), /*#__PURE__*/React.createElement("div", {
    className: "w-16 h-16 rounded-xl bg-blue-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "w-8 h-8 text-blue-400",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
  }))), /*#__PURE__*/React.createElement("h3", {
    className: "text-xl font-bold text-white mb-3"
  }, "\u6D4B\u91CF\u4E0E\u6620\u5C04\u91C7\u6837\u5206\u5E03"), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-400 text-sm leading-relaxed"
  }, "\u4F9D\u636E\u5B9E\u9645\u6D4B\u91CF\u8BA1\u6570\u6784\u9020\u4EFB\u52A1\u5148\u9A8C\uFF1B\u7406\u60F3PT\u7EDF\u8BA1\u4E0E\u786C\u4EF6\u566A\u58F0\u5206\u522B\u68C0\u9A8C\uFF0C\u4E0D\u9884\u8BBE\u786C\u4EF6\u91C7\u6837\u65E0\u504F\u3002")), /*#__PURE__*/React.createElement("div", {
    className: "glass-card rounded-2xl p-8 border border-white/10 hover:border-emerald-400/50 transition-all group bg-black/40 backdrop-blur-xl relative overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
  }), /*#__PURE__*/React.createElement("div", {
    className: "w-16 h-16 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "w-8 h-8 text-emerald-400",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
  }))), /*#__PURE__*/React.createElement("h3", {
    className: "text-xl font-bold text-white mb-3"
  }, "\u5177\u8EAB\u6570\u636E\u751F\u6210\u4E2D\u67A2"), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-400 text-sm leading-relaxed"
  }, "\u5229\u7528\u591A\u7EF4\u6700\u4F18\u4F20\u8F93\u4E0E Copula \u6280\u672F\uFF0C\u7528\u5206\u4F4D\u6570\u6620\u5C04\u6784\u5EFA\u76EE\u6807\u6270\u52A8\uFF0C\u5E76\u68C0\u67E5\u6620\u5C04\u504F\u5DEE\u4E0E\u4E0B\u6E38\u6548\u679C\u3002")))), /*#__PURE__*/React.createElement("div", {
    className: "hidden md:flex justify-center -my-8 relative z-0"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-px h-24 bg-gradient-to-b from-blue-500/50 to-transparent relative"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute top-0 left-1/2 -translate-x-1/2 w-2 h-8 bg-blue-400 rounded-full blur-[2px] animate-pulse"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "relative"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-center mb-6 mt-8 md:mt-0"
  }, /*#__PURE__*/React.createElement("span", {
    className: "inline-block px-4 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-sm font-bold tracking-widest shadow-[0_0_15px_rgba(59,130,246,0.2)]"
  }, "LAYER 02 / \u6821\u51C6\u573A\u666F\u63A5\u5165")), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 md:grid-cols-5 gap-4 relative z-10"
  }, [{
    name: "机器人操作",
    desc: "扭矩/摩擦力",
    icon: "🦾"
  }, {
    name: "传感器标定",
    desc: "噪点/畸变漂移",
    icon: "📷"
  }, {
    name: "环境建模",
    desc: "光照/材质突变",
    icon: "🌍"
  }, {
    name: "运动控制",
    desc: "复杂地形平衡",
    icon: "🏃"
  }, {
    name: "多模态对齐",
    desc: "时空对齐偏移",
    icon: "🧠"
  }].map(function (scene, i) {
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      className: "glass-card rounded-xl p-5 border border-white/5 hover:bg-white/10 hover:border-blue-400/30 transition-all text-center group cursor-default bg-black/40"
    }, /*#__PURE__*/React.createElement("div", {
      className: "text-3xl mb-3 grayscale group-hover:grayscale-0 transition-all scale-90 group-hover:scale-110"
    }, scene.icon), /*#__PURE__*/React.createElement("h4", {
      className: "text-white font-bold text-sm mb-1 group-hover:text-blue-400 transition-colors"
    }, scene.name), /*#__PURE__*/React.createElement("div", {
      className: "text-xs text-slate-500"
    }, scene.desc));
  }))), /*#__PURE__*/React.createElement("div", {
    className: "hidden md:flex justify-center -my-8 relative z-0"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-px h-24 bg-gradient-to-b from-emerald-500/50 to-transparent relative"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute top-0 left-1/2 -translate-x-1/2 w-2 h-8 bg-emerald-400 rounded-full blur-[2px] animate-pulse",
    style: {
      animationDelay: '150ms'
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "relative mt-12 md:mt-0"
  }, /*#__PURE__*/React.createElement("div", {
    className: "glass-card rounded-3xl p-1 relative overflow-hidden bg-gradient-to-b from-white/10 to-transparent"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 bg-gradient-to-r from-qcyan/20 via-blue-500/20 to-emerald-500/20 blur-xl"
  }), /*#__PURE__*/React.createElement("div", {
    className: "bg-black/80 backdrop-blur-2xl rounded-[23px] p-10 relative z-10 border border-white/10 text-center"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-2xl md:text-3xl font-extrabold text-white mb-10 tracking-wide"
  }, "\u9AD8\u8D28\u91CF\u5177\u8EAB\u6570\u636E\u96C6\u6301\u7EED\u8F93\u51FA"), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 md:grid-cols-4 gap-6"
  }, [{
    title: "高效生成",
    subtitle: "突破采集瓶颈",
    color: "text-qcyan",
    icon: "⚡"
  }, {
    title: "分布可控",
    subtitle: "精确调比先验",
    color: "text-blue-400",
    icon: "🎯"
  }, {
    title: "场景多样",
    subtitle: "MT50+任务族",
    color: "text-purple-400",
    icon: "🌌"
  }, {
    title: "泛化增强",
    subtitle: "攻克 CVaR@20",
    color: "text-emerald-400",
    icon: "🛡️"
  }].map(function (badge, i) {
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      className: "flex flex-col items-center group cursor-default"
    }, /*#__PURE__*/React.createElement("div", {
      className: "text-3xl mb-3 group-hover:scale-110 transition-transform"
    }, badge.icon), /*#__PURE__*/React.createElement("div", {
      className: "font-bold text-lg ".concat(badge.color)
    }, badge.title), /*#__PURE__*/React.createElement("div", {
      className: "text-xs text-slate-400 mt-1"
    }, badge.subtitle));
  }))))))));
};
var REPORT_HTML = "\n<h1 class=\"report-title\">50任务先导与Baihua真机进展<\/h1><p class=\"lead\">真实状态轨迹、同预算合成对照，以及5q与54q的新真机结果。更新于2026年11月20日。<\/p>\n<p class=\"data\">50任务 · 42场景 · 24次模型训练 · 63万合成窗口<\/p>\n<p>已校验50任务状态轨迹：270.11MB、161,692帧、约1.50小时；50条完整EgoStand LeRobot episode共450文件、11.295GB正在补齐双目视频、标注及元数据。下载完成与全量校验通过后更新状态。 现有24次训练使用状态坐标；多模态包完成下载不等于完成视觉训练。本次是10万小时计划的先导样本。<\/p>\n<div class=\"actions\"><a href=\"results/finals_50tasks_20261120/ablation/per_task_metrics.csv\">逐任务原始指标CSV<\/a><a href=\"https://github.com/crystal-tensor/Q-Tail-for-Embodied-Al/blob/main/docs/finals_50tasks_20261120.md\">方法与运行说明<\/a><\/div>\n<h2>同预算预测结果<\/h2><p>用3帧双手42关节坐标预测5帧后的状态。8个学习对照各3组重复；每个训练库60,000行，模型、1,200次更新和评测划分一致。按episode时间留出，边界隔离。增强包括刚体变换与PT-OT分位数噪声；量子计数控制任务采样分配。<\/p>\n<p class=\"data\">10 mm噪声：3.746 → 3.556 cm，误差降低5.09%<\/p><p>新Baihua5q先验加增强使45/50任务平均误差改善；最少训练窗口的10个任务误差降低9.04%，预测误差≤5cm帧占比提高1.61个百分点。固定50条episode和3组已观察配对重复下，任务bootstrap95%降低区间为3.68%–6.63%。<\/p>\n<p class=\"note\">相对经典风险加权仅降低0.22%，差异区间跨零。保持上一帧姿态为3.331cm，仍优于当前神经网络。干净条件下，阈值占比下降0.54pp。这里是姿态预测，未建立量子优势、机器人任务成功率或安全收益；每任务仅1条episode，不能据此推断跨episode泛化。<\/p>\n<figure><img alt=\"全部方法在干净、3mm及10mm观测噪声下的平均位置误差\" loading=\"lazy\" src=\"docs/assets/finals_50tasks_20261120/dark_aggregate_errors.png\"/><figcaption>误差越低越好。图中须线为3个训练种子的最小至最大值；新5q臂每个训练种子分别配一次硬件运行。<\/figcaption><\/figure>\n<h2 id=\"results\">50个任务逐项比较<\/h2><p>默认比较新Baihua5q分配加增强与原始神经网络。正的“误差降低”表示改善；负数保留。5cm指标是预测帧误差阈值占比，不能称为机器人成功率。<\/p>\n<label>观测条件 <select id=\"condition\"><option value=\"noise10mm\">10 mm噪声<\/option><option value=\"noise3mm\">3 mm噪声<\/option><option value=\"clean\">干净<\/option><\/select><\/label>\n<label>比较方法 <select id=\"arm\"><option value=\"baihua_rcs_aug\">新Baihua5q + 增强<\/option><option value=\"classical_risk_aug\">经典风险 + 增强<\/option><option value=\"uniform_aug\">均匀任务 + 增强<\/option><option value=\"natural_aug\">仅增强 / 原比例<\/option><option value=\"ideal_rcs_aug\">理想5q + 增强<\/option><option value=\"baihua_archive_aug\">历史Baihua15q + 增强<\/option><option value=\"ideal_archive_aug\">历史15q同shots理想 + 增强<\/option><\/select><\/label>\n<label>任务检索 <input id=\"filter\" placeholder=\"输入任务关键词\" type=\"search\"/><\/label><p aria-live=\"polite\" id=\"count\"><\/p><div class=\"scroll\"><table><thead><tr><th>任务<\/th><th>原始cm<\/th><th>比较cm<\/th><th>误差降低<\/th><th>P95降低<\/th><th>≤5cm变化<\/th><\/tr><\/thead><tbody id=\"tasks\"><\/tbody><\/table><\/div>\n<details><summary>完整50任务热图<\/summary><figure><img alt=\"50任务对各增强方法的误差降低百分比热图\" loading=\"lazy\" src=\"docs/assets/finals_50tasks_20261120/dark_per_task_noise10mm.png\"/><figcaption>10mm条件。绿色表示误差降低，红色表示变差；完整数字亦可下载CSV。<\/figcaption><\/figure><\/details>\n<h2 id=\"hardware\">Baihua：本次4个新任务均Finished<\/h2><div class=\"scroll\"><table><thead><tr><th>Task ID<\/th><th>芯片<\/th><th>活跃比特<\/th><th>shots<\/th><th>状态<\/th><\/tr><\/thead><tbody><tr><td>2611201314459691297<\/td><td>Baihua<\/td><td>5<\/td><td>2,048<\/td><td>Finished<\/td><\/tr><tr><td>2611201318089732111<\/td><td>Baihua<\/td><td>5<\/td><td>2,048<\/td><td>Finished<\/td><\/tr><tr><td>2611201318096790351<\/td><td>Baihua<\/td><td>5<\/td><td>2,048<\/td><td>Finished<\/td><\/tr><tr><td>2611201432184387939<\/td><td>Baihua<\/td><td>54<\/td><td>4,096<\/td><td>Finished<\/td><\/tr><\/tbody><\/table><\/div>\n<p>三次5q沿用seed7参考线路，实际各2,048 shots；原始24CX编译为24CZ+49U，QASM依赖层22→30。三份CSV共96个态概率均精确还原API计数。原始与编译线路、回执、散列和计数均已归档。<\/p>\n<figure><img alt=\"依据当日Baihua校准图选择的54个活跃物理比特连通子树\" loading=\"lazy\" src=\"docs/assets/finals_50tasks_20261120/dark_baihua54_topology.png\"/><figcaption>54q规模扩展：54个活跃物理比特均测量，编译162U+106CZ，QASM依赖层11→10。qreg[88]来自最大物理编号87，不代表使用88个活跃比特。校准边含低至0.89的保真度，未声称全部边达到高保真阈值。<\/figcaption><\/figure>\n<p class=\"note\">54q共4,096条不同54-bit串，每串1count。等高观测柱图符合稀疏高维采样，不证明真实分布均匀、全线路保真度或量子优势。54q是浅树交互线路的规模验证；前述5.09%增益来自5q对照，未套用到54q。<\/p>\n<h2 id=\"storage\">10万小时需要多大硬盘<\/h2><p>按50任务的文件清单字节/时长外推：状态约18TB，单左目约362TB，完整一份LeRobot约754TB；加20%工作空间约905TB，建议约1PB可用主存储，冗余和独立备份另计。50任务完整包仅11.295GB；下载后的实时可用空间见公开校验摘要。<\/p><p>50任务非随机，完整包任务bootstrap区间约705–810TB仅反映样本变化；不能覆盖全量不同SKU码率的选择偏差。LeRobot与MCAP是同episode的备选表示，不能重复累计小时；全量准确大小仍需提供方清单。<\/p>\n<h2 id=\"research\">痛觉记忆与VLA/WAM<\/h2><p>痛觉方向已完成公开连接组的结构审计及事故记忆接口设计，单次学习、复发率和误阻断尚待验证。VAL+WAM可复用手型扰动环境、模型运行时、动作投影和回归门禁；现有局部仿真结果不等于VLA/WAM融合收益。人到机器人映射、伤害标签和真实执行仍待完成。<\/p>\n<p class=\"report-footnote\">源轨迹与合成训练库保存在用户SSD，公开页只发布元数据、方法、量子计数与评测指标。平台CSV、原始QASM、编译QASM和运行说明见开源库。比赛材料以已核查的实测、模拟与推断分层陈述。<\/p>\n";
var LatestProgress = function LatestProgress() {
  var area = useRef(null);
  useEffect(function () {
    var cancelled = false;
    var node = area.current,
      $ = function $(id) {
        return node.querySelector('#' + id);
      };
    var controls = ['condition', 'arm', 'filter'].map($);
    var rows = [];
    var avg = function avg(rs, k) {
      return rs.reduce(function (s, x) {
        return s + x[k];
      }, 0) / rs.length;
    };
    var esc = function esc(s) {
      return s.replace(/[&<>"']/g, function (c) {
        return {
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          '"': '&quot;',
          "'": '&#39;'
        }[c];
      });
    };
    var render = function render() {
      var cond = $('condition').value,
        arm = $('arm').value,
        filter = $('filter').value.toLowerCase(),
        out = [];
      var _loop = function _loop(k) {
        var b = rows.filter(function (x) {
            return x.arm === 'original_only' && x.condition === cond && x.task_index === k;
          }),
          a = rows.filter(function (x) {
            return x.arm === arm && x.condition === cond && x.task_index === k;
          });
        if (!a.length || !b.length || !b[0].task.toLowerCase().includes(filter)) return 1; // continue
        var e0 = avg(b, 'mpjpe_cm'),
          e1 = avg(a, 'mpjpe_cm'),
          gain = 100 * (e0 - e1) / e0,
          p95 = 100 * (avg(b, 'p95_frame_error_cm') - avg(a, 'p95_frame_error_cm')) / avg(b, 'p95_frame_error_cm'),
          pp = 100 * (avg(a, 'forecast_within5cm') - avg(b, 'forecast_within5cm'));
        out.push("<tr><td>".concat(String(k + 1).padStart(2, '0'), " ").concat(esc(b[0].task), "</td><td>").concat(e0.toFixed(3), "</td><td>").concat(e1.toFixed(3), "</td><td class=\"").concat(gain >= 0 ? 'positive' : 'negative', "\">").concat(gain >= 0 ? '+' : '').concat(gain.toFixed(2), "%</td><td>").concat(p95 >= 0 ? '+' : '').concat(p95.toFixed(2), "%</td><td>").concat(pp >= 0 ? '+' : '').concat(pp.toFixed(2), " pp</td></tr>"));
      };
      for (var k = 0; k < 50; k++) {
        if (_loop(k)) continue;
      }
      $('tasks').innerHTML = out.join('');
      $('count').textContent = "\u663E\u793A".concat(out.length, "/50\u4E2A\u4EFB\u52A1\uFF1B3\u7EC4\u91CD\u590D\u5747\u503C");
    };
    $('count').textContent = '正在载入逐任务指标…';
    fetch('results/finals_50tasks_20261120/ablation/per_task_metrics.json').then(function (r) {
      if (!r.ok) throw new Error();
      return r.json();
    }).then(function (x) {
      if (!cancelled) {
        rows = x;
        render();
        controls.forEach(function (e) {
          return e.addEventListener('input', render);
        });
      }
    })["catch"](function () {
      if (!cancelled) $('count').textContent = '指标暂未载入，请使用逐任务CSV或稍后刷新。';
    });
    return function () {
      cancelled = true;
      controls.forEach(function (e) {
        return e.removeEventListener('input', render);
      });
    };
  }, []);
  return /*#__PURE__*/React.createElement("section", {
    id: "latest",
    className: "border-y border-white/5 bg-gradient-to-b from-qpurple/5 to-transparent"
  }, /*#__PURE__*/React.createElement("div", {
    ref: area,
    className: "latest-report",
    dangerouslySetInnerHTML: {
      __html: REPORT_HTML
    }
  }));
};
var MethodBridge = function MethodBridge() {
  return /*#__PURE__*/React.createElement("section", {
    id: "methods",
    className: "max-w-7xl mx-auto px-6 py-20"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-qcyan font-mono tracking-widest mb-3"
  }, "RESEARCH TO ENGINEERING"), /*#__PURE__*/React.createElement("h2", {
    className: "text-3xl md:text-4xl font-bold mb-8"
  }, "\u4ECE\u91CF\u5B50\u5148\u9A8C\u5230\u8BAD\u7EC3\u9884\u7B97"), /*#__PURE__*/React.createElement("div", {
    className: "grid md:grid-cols-3 gap-6"
  }, [['PT-rank / PT-OT', '用任务稀有度排序建立分配先验；用分位数最优传输构造目标扰动。实际对照让各增强方法共享同一变换，仅改变任务预算。'], ['同预算验证', '混合采样 q=(1−η)b+ηPs。固定训练库、模型和更新数，比较均匀任务、经典风险、理想采样和Baihua计数。保留变差任务与强基线。'], ['数据服务闭环', '已有数据引擎、合成数据服务及DROID研究模块。下一步接入跨episode划分、视觉模型与真实机器人回归评测。']].map(function (_ref11) {
    var _ref12 = _slicedToArray(_ref11, 2),
      h = _ref12[0],
      p = _ref12[1];
    return /*#__PURE__*/React.createElement("article", {
      key: h,
      className: "glass-card rounded-2xl p-7"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "text-xl text-white mb-4"
    }, h), /*#__PURE__*/React.createElement("p", {
      className: "text-slate-300 leading-relaxed"
    }, p));
  })), /*#__PURE__*/React.createElement("div", {
    className: "mt-8 flex flex-wrap gap-6 text-qcyan"
  }, /*#__PURE__*/React.createElement("a", {
    href: "qtail-data-engine.html"
  }, "\u6570\u636E\u5F15\u64CE"), /*#__PURE__*/React.createElement("a", {
    href: "quantum-embodied-data-service.html"
  }, "\u5408\u6210\u6570\u636E\u670D\u52A1"), /*#__PURE__*/React.createElement("a", {
    href: "qtail-droid-full-training.html"
  }, "DROID\u8BAD\u7EC3\u7814\u7A76")));
};
var Footer = function Footer() {
  return /*#__PURE__*/React.createElement("footer", {
    className: "py-12 border-t border-white/10 bg-[#050508] text-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-4xl mx-auto px-6"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-2xl font-bold gradient-text mb-4"
  }, "From QRCS to Embodied AI"), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-400 mb-7"
  }, "\u91CF\u5B50\u91C7\u6837 \xB7 \u957F\u5C3E\u6570\u636E \xB7 \u53EF\u590D\u73B0\u8BC4\u6D4B"), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap justify-center gap-6 text-qcyan"
  }, /*#__PURE__*/React.createElement("a", {
    href: "https://github.com/crystal-tensor/Q-Tail-for-Embodied-Al"
  }, "GitHub Repository"), /*#__PURE__*/React.createElement("a", {
    href: "#latest"
  }, "\u6700\u65B0\u8FDB\u5C55"), /*#__PURE__*/React.createElement("a", {
    href: "https://huggingface.co/datasets/LightwheelAI/EgoDemo"
  }, "\u6570\u636E\u6765\u6E90")), /*#__PURE__*/React.createElement("p", {
    className: "mt-8 text-sm text-slate-500"
  }, "\xA9 2026 Q-TAIL \xB7 \u6240\u7F57\u89C2\u97F3 \xB7 \u66FE\u7965\u6D2A\u3001\u6768\u68A6\u8FEA \xB7 \u76F8\u5E72\u79D1\u6280")));
};
var App = function App() {
  return /*#__PURE__*/React.createElement("div", {
    className: "font-sans"
  }, /*#__PURE__*/React.createElement(Navbar, null), /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement(Hero, null), /*#__PURE__*/React.createElement(LatestProgress, null), /*#__PURE__*/React.createElement(ValueProps, null), /*#__PURE__*/React.createElement(CoreAdvantages, null), /*#__PURE__*/React.createElement(QuantumAILoop, null), /*#__PURE__*/React.createElement(DataEngineArchitecture, null), /*#__PURE__*/React.createElement(MethodBridge, null)), /*#__PURE__*/React.createElement(Footer, null));
};
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));