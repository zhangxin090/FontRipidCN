!
function(e) {
	function t(r) {
		if (n[r]) return n[r].exports;
		var a = n[r] = {
			i: r,
			l: !1,
			exports: {}
		};
		return e[r].call(a.exports, a, a.exports, t),
		a.l = !0,
		a.exports
	}
	var n = {};
	t.m = e,
	t.c = n,
	t.d = function(e, n, r) {
		t.o(e, n) || Object.defineProperty(e, n, {
			configurable: !1,
			enumerable: !0,
			get: r
		})
	},
	t.n = function(e) {
		var n = e && e.__esModule ?
		function() {
			return e.
		default
		}:
		function() {
			return e
		};
		return t.d(n, "a", n),
		n
	},
	t.o = function(e, t) {
		return Object.prototype.hasOwnProperty.call(e, t)
	},
	t.p = "",
	t(t.s = 78)
} ([function(e, t, n) {
	"use strict";
	function r(e) {
		return e && e.__esModule ? e: {
		default:
			e
		}
	}
	function a(e, t) {
		return e.getUint8(t)
	}
	function i(e, t) {
		return e.getUint16(t, !1)
	}
	function o(e, t) {
		return e.getUint32(t, !1)
	}
	function l(e, t) {
		return e.getInt16(t, !1) + e.getUint16(t + 2, !1) / 65535
	}
	function s(e, t) {
		this.data = e,
		this.offset = t,
		this.relativeOffset = 0
	}
	Object.defineProperty(t, "__esModule", {
		value: !0
	}),
	t.Parser = void 0;
	var u = r(n(11)),
	c = r(n(1)),
	f = {
		byte: 1,
		uShort: 2,
		short: 2,
		uLong: 4,
		fixed: 4,
		longDateTime: 8,
		tag: 4
	};
	s.prototype.parseByte = function() {
		var e = this.data.getUint8(this.offset + this.relativeOffset);
		return this.relativeOffset += 1,
		e
	},
	s.prototype.parseChar = function() {
		var e = this.data.getInt8(this.offset + this.relativeOffset);
		return this.relativeOffset += 1,
		e
	},
	s.prototype.parseCard8 = s.prototype.parseByte,
	s.prototype.parseUShort = function() {
		var e = this.data.getUint16(this.offset + this.relativeOffset);
		return this.relativeOffset += 2,
		e
	},
	s.prototype.parseCard16 = s.prototype.parseUShort,
	s.prototype.parseSID = s.prototype.parseUShort,
	s.prototype.parseOffset16 = s.prototype.parseUShort,
	s.prototype.parseShort = function() {
		var e = this.data.getInt16(this.offset + this.relativeOffset);
		return this.relativeOffset += 2,
		e
	},
	s.prototype.parseF2Dot14 = function() {
		var e = this.data.getInt16(this.offset + this.relativeOffset) / 16384;
		return this.relativeOffset += 2,
		e
	},
	s.prototype.parseULong = function() {
		var e = o(this.data, this.offset + this.relativeOffset);
		return this.relativeOffset += 4,
		e
	},
	s.prototype.parseFixed = function() {
		var e = l(this.data, this.offset + this.relativeOffset);
		return this.relativeOffset += 4,
		e
	},
	s.prototype.parseString = function(e) {
		var t = this.data,
		n = this.offset + this.relativeOffset,
		r = "";
		this.relativeOffset += e;
		for (var a = 0; a < e; a++) r += String.fromCharCode(t.getUint8(n + a));
		return r
	},
	s.prototype.parseTag = function() {
		return this.parseString(4)
	},
	s.prototype.parseLongDateTime = function() {
		var e = o(this.data, this.offset + this.relativeOffset + 4);
		return e -= 2082844800,
		this.relativeOffset += 8,
		e
	},
	s.prototype.parseVersion = function() {
		var e = i(this.data, this.offset + this.relativeOffset),
		t = i(this.data, this.offset + this.relativeOffset + 2);
		return this.relativeOffset += 4,
		e + t / 4096 / 10
	},
	s.prototype.skip = function(e, t) {
		void 0 === t && (t = 1),
		this.relativeOffset += f[e] * t
	},
	s.prototype.parseOffset16List = s.prototype.parseUShortList = function(e) {
		void 0 === e && (e = this.parseUShort());
		for (var t = new Array(e), n = this.data, r = this.offset + this.relativeOffset, a = 0; a < e; a++) t[a] = n.getUint16(r),
		r += 2;
		return this.relativeOffset += 2 * e,
		t
	},
	s.prototype.parseShortList = function(e) {
		for (var t = new Array(e), n = this.data, r = this.offset + this.relativeOffset, a = 0; a < e; a++) t[a] = n.getInt16(r),
		r += 2;
		return this.relativeOffset += 2 * e,
		t
	},
	s.prototype.parseByteList = function(e) {
		for (var t = new Array(e), n = this.data, r = this.offset + this.relativeOffset, a = 0; a < e; a++) t[a] = n.getUint8(r++);
		return this.relativeOffset += e,
		t
	},
	s.prototype.parseList = function(e, t) {
		t || (t = e, e = this.parseUShort());
		for (var n = new Array(e), r = 0; r < e; r++) n[r] = t.call(this);
		return n
	},
	s.prototype.parseRecordList = function(e, t) {
		t || (t = e, e = this.parseUShort());
		for (var n = new Array(e), r = (0, u.
	default)(t), a = 0; a < e; a++) {
			for (var i = {},
			o = 0; o < r.length; o++) {
				var l = r[o],
				s = t[l];
				i[l] = s.call(this)
			}
			n[a] = i
		}
		return n
	},
	s.prototype.parseStruct = function(e) {
		if ("function" == typeof e) return e.call(this);
		for (var t = (0, u.
	default)(e), n = {},
		r = 0; r < t.length; r++) {
			var a = t[r],
			i = e[a];
			n[a] = i.call(this)
		}
		return n
	},
	s.prototype.parsePointer = function(e) {
		var t = this.parseOffset16();
		if (t > 0) return new s(this.data, this.offset + t).parseStruct(e)
	},
	s.prototype.parseListOfLists = function(e) {
		for (var t = this.parseOffset16List(), n = t.length, r = this.relativeOffset, a = new Array(n), i = 0; i < n; i++) {
			var o = t[i];
			if (0 !== o) if (this.relativeOffset = o, e) {
				for (var l = this.parseOffset16List(), s = new Array(l.length), u = 0; u < l.length; u++) this.relativeOffset = o + l[u],
				s[u] = e.call(this);
				a[i] = s
			} else a[i] = this.parseUShortList();
			else a[i] = void 0
		}
		return this.relativeOffset = r,
		a
	},
	s.prototype.parseCoverage = function() {
		var e = this.offset + this.relativeOffset,
		t = this.parseUShort(),
		n = this.parseUShort();
		if (1 === t) return {
			format: 1,
			glyphs: this.parseUShortList(n)
		};
		if (2 === t) {
			for (var r = new Array(n), a = 0; a < n; a++) r[a] = {
				start: this.parseUShort(),
				end: this.parseUShort(),
				index: this.parseUShort()
			};
			return {
				format: 2,
				ranges: r
			}
		}
		throw new Error("0x" + e.toString(16) + ": Coverage format must be 1 or 2.")
	},
	s.prototype.parseClassDef = function() {
		var e = this.offset + this.relativeOffset,
		t = this.parseUShort();
		if (1 === t) return {
			format: 1,
			startGlyph: this.parseUShort(),
			classes: this.parseUShortList()
		};
		if (2 === t) return {
			format: 2,
			ranges: this.parseRecordList({
				start: s.uShort,
				end: s.uShort,
				classId: s.uShort
			})
		};
		throw new Error("0x" + e.toString(16) + ": ClassDef format must be 1 or 2.")
	},
	s.list = function(e, t) {
		return function() {
			return this.parseList(e, t)
		}
	},
	s.recordList = function(e, t) {
		return function() {
			return this.parseRecordList(e, t)
		}
	},
	s.pointer = function(e) {
		return function() {
			return this.parsePointer(e)
		}
	},
	s.tag = s.prototype.parseTag,
	s.byte = s.prototype.parseByte,
	s.uShort = s.offset16 = s.prototype.parseUShort,
	s.uShortList = s.prototype.parseUShortList,
	s.struct = s.prototype.parseStruct,
	s.coverage = s.prototype.parseCoverage,
	s.classDef = s.prototype.parseClassDef;
	var p = {
		reserved: s.uShort,
		reqFeatureIndex: s.uShort,
		featureIndexes: s.uShortList
	};
	s.prototype.parseScriptList = function() {
		return this.parsePointer(s.recordList({
			tag: s.tag,
			script: s.pointer({
				defaultLangSys: s.pointer(p),
				langSysRecords: s.recordList({
					tag: s.tag,
					langSys: s.pointer(p)
				})
			})
		}))
	},
	s.prototype.parseFeatureList = function() {
		return this.parsePointer(s.recordList({
			tag: s.tag,
			feature: s.pointer({
				featureParams: s.offset16,
				lookupListIndexes: s.uShortList
			})
		}))
	},
	s.prototype.parseLookupList = function(e) {
		return this.parsePointer(s.list(s.pointer(function() {
			var t = this.parseUShort();
			c.
		default.argument(1 <= t && t <= 8, "GSUB lookup type " + t + " unknown.");
			var n = this.parseUShort(),
			r = 16 & n;
			return {
				lookupType: t,
				lookupFlag: n,
				subtables: this.parseList(s.pointer(e[t])),
				markFilteringSet: r ? this.parseUShort() : void 0
			}
		})))
	},
	t.
default = {
		getByte: a,
		getCard8: a,
		getUShort: i,
		getCard16: i,
		getShort: function(e, t) {
			return e.getInt16(t, !1)
		},
		getULong: o,
		getFixed: l,
		getTag: function(e, t) {
			for (var n = "",
			r = t; r < t + 4; r += 1) n += String.fromCharCode(e.getInt8(r));
			return n
		},
		getOffset: function(e, t, n) {
			for (var r = 0,
			a = 0; a < n; a += 1) r <<= 8,
			r += e.getUint8(t + a);
			return r
		},
		getBytes: function(e, t, n) {
			for (var r = [], a = t; a < n; a += 1) r.push(e.getUint8(a));
			return r
		},
		bytesToString: function(e) {
			for (var t = "",
			n = 0; n < e.length; n += 1) t += String.fromCharCode(e[n]);
			return t
		},
		Parser: s
	},
	t.Parser = s
},
function(e, t, n) {
	"use strict";
	function r(e) {
		throw new Error(e)
	}
	function a(e, t) {
		e || r(t)
	}
	Object.defineProperty(t, "__esModule", {
		value: !0
	}),
	t.fail = r,
	t.argument = a,
	t.assert = a,
	t.
default = {
		fail: r,
		argument: a,
		assert: a
	}
},
function(e, t, n) {
	"use strict";
	function r(e) {
		return e && e.__esModule ? e: {
		default:
			e
		}
	}
	function a(e, t, n) {
		for (var r = 0; r < t.length; r += 1) {
			var a = t[r];
			this[a.name] = a.value
		}
		if (this.tableName = e, this.fields = t, n) for (var i = (0, d.
	default)(n), o = 0; o < i.length; o += 1) {
			var l = i[o],
			s = n[l];
			void 0 !== this[l] && (this[l] = s)
		}
	}
	function i(e, t, n) {
		void 0 === n && (n = t.length);
		var r = new Array(t.length + 1);
		r[0] = {
			name: e + "Count",
			type: "USHORT",
			value: n
		};
		for (var a = 0; a < t.length; a++) r[a + 1] = {
			name: e + a,
			type: "USHORT",
			value: t[a]
		};
		return r
	}
	function o(e, t, n) {
		var r = t.length,
		a = new Array(r + 1);
		a[0] = {
			name: e + "Count",
			type: "USHORT",
			value: r
		};
		for (var i = 0; i < r; i++) a[i + 1] = {
			name: e + i,
			type: "TABLE",
			value: n(t[i], i)
		};
		return a
	}
	function l(e, t, n) {
		var r = t.length,
		a = [];
		a[0] = {
			name: e + "Count",
			type: "USHORT",
			value: r
		};
		for (var i = 0; i < r; i++) a = a.concat(n(t[i], i));
		return a
	}
	function s(e) {
		1 === e.format ? a.call(this, "coverageTable", [{
			name: "coverageFormat",
			type: "USHORT",
			value: 1
		}].concat(i("glyph", e.glyphs))) : h.
	default.assert(!1, "Can't create coverage table format 2 yet.")
	}
	function u(e) {
		a.call(this, "scriptListTable", l("scriptRecord", e,
		function(e, t) {
			var n = e.script,
			r = n.defaultLangSys;
			return h.
		default.assert( !! r, "Unable to write GSUB: script " + e.tag + " has no default language system."),
			[{
				name: "scriptTag" + t,
				type: "TAG",
				value: e.tag
			},
			{
				name: "script" + t,
				type: "TABLE",
				value: new a("scriptTable", [{
					name: "defaultLangSys",
					type: "TABLE",
					value: new a("defaultLangSys", [{
						name: "lookupOrder",
						type: "USHORT",
						value: 0
					},
					{
						name: "reqFeatureIndex",
						type: "USHORT",
						value: r.reqFeatureIndex
					}].concat(i("featureIndex", r.featureIndexes)))
				}].concat(l("langSys", n.langSysRecords,
				function(e, t) {
					var n = e.langSys;
					return [{
						name: "langSysTag" + t,
						type: "TAG",
						value: e.tag
					},
					{
						name: "langSys" + t,
						type: "TABLE",
						value: new a("langSys", [{
							name: "lookupOrder",
							type: "USHORT",
							value: 0
						},
						{
							name: "reqFeatureIndex",
							type: "USHORT",
							value: n.reqFeatureIndex
						}].concat(i("featureIndex", n.featureIndexes)))
					}]
				})))
			}]
		}))
	}
	function c(e) {
		a.call(this, "featureListTable", l("featureRecord", e,
		function(e, t) {
			var n = e.feature;
			return [{
				name: "featureTag" + t,
				type: "TAG",
				value: e.tag
			},
			{
				name: "feature" + t,
				type: "TABLE",
				value: new a("featureTable", [{
					name: "featureParams",
					type: "USHORT",
					value: n.featureParams
				}].concat(i("lookupListIndex", n.lookupListIndexes)))
			}]
		}))
	}
	function f(e, t) {
		a.call(this, "lookupListTable", o("lookup", e,
		function(e) {
			var n = t[e.lookupType];
			return h.
		default.assert( !! n, "Unable to write GSUB lookup type " + e.lookupType + " tables."),
			new a("lookupTable", [{
				name: "lookupType",
				type: "USHORT",
				value: e.lookupType
			},
			{
				name: "lookupFlag",
				type: "USHORT",
				value: e.lookupFlag
			}].concat(o("subtable", e.subtables, n)))
		}))
	}
	Object.defineProperty(t, "__esModule", {
		value: !0
	});
	var p = r(n(119)),
	d = r(n(11)),
	h = r(n(1)),
	m = n(23);
	a.prototype.encode = function() {
		return m.encode.TABLE(this)
	},
	a.prototype.sizeOf = function() {
		return m.sizeOf.TABLE(this)
	},
	(s.prototype = (0, p.
default)(a.prototype)).constructor = s,
	(u.prototype = (0, p.
default)(a.prototype)).constructor = u,
	(c.prototype = (0, p.
default)(a.prototype)).constructor = c,
	(f.prototype = (0, p.
default)(a.prototype)).constructor = f,
	t.
default = {
		Table: a,
		Record: a,
		Coverage: s,
		ScriptList: u,
		FeatureList: c,
		LookupList: f,
		ushortList: i,
		tableList: o,
		recordList: l
	}
},
function(e, t) {
	var n = e.exports = {
		version: "2.5.3"
	};
	"number" == typeof __e && (__e = n)
},
function(e, t) {
	e.exports = function(e) {
		return "object" == typeof e ? null !== e: "function" == typeof e
	}
},
function(e, t, n) {
	var r = n(7),
	a = n(3),
	i = n(18),
	o = n(8),
	l = "prototype",
	s = function(e, t, n) {
		var u, c, f, p = e & s.F,
		d = e & s.G,
		h = e & s.S,
		m = e & s.P,
		g = e & s.B,
		v = e & s.W,
		y = d ? a: a[t] || (a[t] = {}),
		b = y[l],
		x = d ? r: h ? r[t] : (r[t] || {})[l];
		d && (n = t);
		for (u in n)(c = !p && x && void 0 !== x[u]) && u in y || (f = c ? x[u] : n[u], y[u] = d && "function" != typeof x[u] ? n[u] : g && c ? i(f, r) : v && x[u] == f ?
		function(e) {
			var t = function(t, n, r) {
				if (this instanceof e) {
					switch (arguments.length) {
					case 0:
						return new e;
					case 1:
						return new e(t);
					case 2:
						return new e(t, n)
					}
					return new e(t, n, r)
				}
				return e.apply(this, arguments)
			};
			return t[l] = e[l],
			t
		} (f) : m && "function" == typeof f ? i(Function.call, f) : f, m && ((y.virtual || (y.virtual = {}))[u] = f, e & s.R && b && !b[u] && o(b, u, f)))
	};
	s.F = 1,
	s.G = 2,
	s.S = 4,
	s.P = 8,
	s.B = 16,
	s.W = 32,
	s.U = 64,
	s.R = 128,
	e.exports = s
},
function(e, t, n) {
	var r = n(48)("wks"),
	a = n(33),
	i = n(7).Symbol,
	o = "function" == typeof i; (e.exports = function(e) {
		return r[e] || (r[e] = o && i[e] || (o ? i: a)("Symbol." + e))
	}).store = r
},
function(e, t) {
	var n = e.exports = "undefined" != typeof window && window.Math == Math ? window: "undefined" != typeof self && self.Math == Math ? self: Function("return this")();
	"number" == typeof __g && (__g = n)
},
function(e, t, n) {
	var r = n(12),
	a = n(46);
	e.exports = n(13) ?
	function(e, t, n) {
		return r.f(e, t, a(1, n))
	}: function(e, t, n) {
		return e[t] = n,
		e
	}
},
function(e, t, n) {
	var r = n(4);
	e.exports = function(e) {
		if (!r(e)) throw TypeError(e + " is not an object!");
		return e
	}
},
function(e, t) {
	e.exports = function(e) {
		try {
			return !! e()
		} catch(e) {
			return ! 0
		}
	}
},
function(e, t, n) {
	e.exports = {
	default:
		n(117),
		__esModule: !0
	}
},
function(e, t, n) {
	var r = n(9),
	a = n(84),
	i = n(85),
	o = Object.defineProperty;
	t.f = n(13) ? Object.defineProperty: function(e, t, n) {
		if (r(e), t = i(t, !0), r(n), a) try {
			return o(e, t, n)
		} catch(e) {}
		if ("get" in n || "set" in n) throw TypeError("Accessors not supported!");
		return "value" in n && (e[t] = n.value),
		e
	}
},
function(e, t, n) {
	e.exports = !n(10)(function() {
		return 7 != Object.defineProperty({},
		"a", {
			get: function() {
				return 7
			}
		}).a
	})
},
function(e, t) {
	var n = {}.hasOwnProperty;
	e.exports = function(e, t) {
		return n.call(e, t)
	}
},
function(e, t) {
	e.exports = {}
},
function(e, t, n) {
	"use strict";
	function r() {
		this.commands = [],
		this.fill = "black",
		this.stroke = null,
		this.strokeWidth = 1
	}
	Object.defineProperty(t, "__esModule", {
		value: !0
	});
	var a = function(e) {
		return e && e.__esModule ? e: {
		default:
			e
		}
	} (n(56));
	r.prototype.moveTo = function(e, t) {
		this.commands.push({
			type: "M",
			x: e,
			y: t
		})
	},
	r.prototype.lineTo = function(e, t) {
		this.commands.push({
			type: "L",
			x: e,
			y: t
		})
	},
	r.prototype.curveTo = r.prototype.bezierCurveTo = function(e, t, n, r, a, i) {
		this.commands.push({
			type: "C",
			x1: e,
			y1: t,
			x2: n,
			y2: r,
			x: a,
			y: i
		})
	},
	r.prototype.quadTo = r.prototype.quadraticCurveTo = function(e, t, n, r) {
		this.commands.push({
			type: "Q",
			x1: e,
			y1: t,
			x: n,
			y: r
		})
	},
	r.prototype.close = r.prototype.closePath = function() {
		this.commands.push({
			type: "Z"
		})
	},
	r.prototype.extend = function(e) {
		if (e.commands) e = e.commands;
		else if (e instanceof a.
	default) {
			var t = e;
			return this.moveTo(t.x1, t.y1),
			this.lineTo(t.x2, t.y1),
			this.lineTo(t.x2, t.y2),
			this.lineTo(t.x1, t.y2),
			void this.close()
		}
		Array.prototype.push.apply(this.commands, e)
	},
	r.prototype.getBoundingBox = function() {
		for (var e = new a.
	default,
		t = 0,
		n = 0,
		r = 0,
		i = 0,
		o = 0; o < this.commands.length; o++) {
			var l = this.commands[o];
			switch (l.type) {
			case "M":
				e.addPoint(l.x, l.y),
				t = r = l.x,
				n = i = l.y;
				break;
			case "L":
				e.addPoint(l.x, l.y),
				r = l.x,
				i = l.y;
				break;
			case "Q":
				e.addQuad(r, i, l.x1, l.y1, l.x, l.y),
				r = l.x,
				i = l.y;
				break;
			case "C":
				e.addBezier(r, i, l.x1, l.y1, l.x2, l.y2, l.x, l.y),
				r = l.x,
				i = l.y;
				break;
			case "Z":
				r = t,
				i = n;
				break;
			default:
				throw new Error("Unexpected path command " + l.type)
			}
		}
		return e.isEmpty() && e.addPoint(0, 0),
		e
	},
	r.prototype.draw = function(e) {
		e.beginPath();
		for (var t = 0; t < this.commands.length; t += 1) {
			var n = this.commands[t];
			"M" === n.type ? e.moveTo(n.x, n.y) : "L" === n.type ? e.lineTo(n.x, n.y) : "C" === n.type ? e.bezierCurveTo(n.x1, n.y1, n.x2, n.y2, n.x, n.y) : "Q" === n.type ? e.quadraticCurveTo(n.x1, n.y1, n.x, n.y) : "Z" === n.type && e.closePath()
		}
		this.fill && (e.fillStyle = this.fill, e.fill()),
		this.stroke && (e.strokeStyle = this.stroke, e.lineWidth = this.strokeWidth, e.stroke())
	},
	r.prototype.toPathData = function(e) {
		function t(t) {
			return Math.round(t) === t ? "" + Math.round(t) : t.toFixed(e)
		}
		function n() {
			for (var e = "",
			n = 0; n < arguments.length; n += 1) {
				var r = arguments[n];
				r >= 0 && n > 0 && (e += " "),
				e += t(r)
			}
			return e
		}
		e = void 0 !== e ? e: 2;
		for (var r = "",
		a = 0; a < this.commands.length; a += 1) {
			var i = this.commands[a];
			"M" === i.type ? r += "M" + n(i.x, i.y) : "L" === i.type ? r += "L" + n(i.x, i.y) : "C" === i.type ? r += "C" + n(i.x1, i.y1, i.x2, i.y2, i.x, i.y) : "Q" === i.type ? r += "Q" + n(i.x1, i.y1, i.x, i.y) : "Z" === i.type && (r += "Z")
		}
		return r
	},
	r.prototype.toSVG = function(e) {
		var t = '<path d="';
		return t += this.toPathData(e),
		t += '"',
		this.fill && "black" !== this.fill && (null === this.fill ? t += ' fill="none"': t += ' fill="' + this.fill + '"'),
		this.stroke && (t += ' stroke="' + this.stroke + '" stroke-width="' + this.strokeWidth + '"'),
		t += "/>"
	},
	r.prototype.toDOMElement = function(e) {
		var t = this.toPathData(e),
		n = document.createElementNS("http://www.w3.org/2000/svg", "path");
		return n.setAttribute("d", t),
		n
	},
	t.
default = r
},
function(e, t, n) {
	var r = n(33)("meta"),
	a = n(4),
	i = n(14),
	o = n(12).f,
	l = 0,
	s = Object.isExtensible ||
	function() {
		return ! 0
	},
	u = !n(10)(function() {
		return s(Object.preventExtensions({}))
	}),
	c = function(e) {
		o(e, r, {
			value: {
				i: "O" + ++l,
				w: {}
			}
		})
	},
	f = e.exports = {
		KEY: r,
		NEED: !1,
		fastKey: function(e, t) {
			if (!a(e)) return "symbol" == typeof e ? e: ("string" == typeof e ? "S": "P") + e;
			if (!i(e, r)) {
				if (!s(e)) return "F";
				if (!t) return "E";
				c(e)
			}
			return e[r].i
		},
		getWeak: function(e, t) {
			if (!i(e, r)) {
				if (!s(e)) return ! 0;
				if (!t) return ! 1;
				c(e)
			}
			return e[r].w
		},
		onFreeze: function(e) {
			return u && f.NEED && s(e) && !i(e, r) && c(e),
			e
		}
	}
},
function(e, t, n) {
	var r = n(44);
	e.exports = function(e, t, n) {
		if (r(e), void 0 === t) return e;
		switch (n) {
		case 1:
			return function(n) {
				return e.call(t, n)
			};
		case 2:
			return function(n, r) {
				return e.call(t, n, r)
			};
		case 3:
			return function(n, r, a) {
				return e.call(t, n, r, a)
			}
		}
		return function() {
			return e.apply(t, arguments)
		}
	}
},
function(e, t, n) {
	var r = n(29);
	e.exports = function(e) {
		return Object(r(e))
	}
},
function(e, t, n) {
	e.exports = {
	default:
		n(92),
		__esModule: !0
	}
},
function(e, t, n) {
	"use strict";
	t.__esModule = !0,
	t.
default = function(e, t) {
		if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
	}
},
function(e, t, n) {
	"use strict";
	t.__esModule = !0;
	var r = function(e) {
		return e && e.__esModule ? e: {
		default:
			e
		}
	} (n(36));
	t.
default = function() {
		function e(e, t) {
			for (var n = 0; n < t.length; n++) {
				var a = t[n];
				a.enumerable = a.enumerable || !1,
				a.configurable = !0,
				"value" in a && (a.writable = !0),
				(0, r.
			default)(e, a.key, a)
			}
		}
		return function(t, n, r) {
			return n && e(t.prototype, n),
			r && e(t, r),
			t
		}
	} ()
},
function(e, t, n) {
	"use strict";
	function r(e) {
		return e && e.__esModule ? e: {
		default:
			e
		}
	}
	function a(e) {
		return function() {
			return e
		}
	}
	function i(e) {
		return e >= -128 && e <= 127
	}
	function o(e, t, n) {
		for (var r = 0,
		a = e.length; t < a && r < 64 && 0 === e[t];)++t,
		++r;
		return n.push(128 | r - 1),
		t
	}
	function l(e, t, n) {
		for (var r = 0,
		a = e.length,
		o = t; o < a && r < 64;) {
			var l = e[o];
			if (!i(l)) break;
			if (0 === l && o + 1 < a && 0 === e[o + 1]) break; ++o,
			++r
		}
		n.push(r - 1);
		for (var s = t; s < o; ++s) n.push(e[s] + 256 & 255);
		return o
	}
	function s(e, t, n) {
		for (var r = 0,
		a = e.length,
		o = t; o < a && r < 64;) {
			var l = e[o];
			if (0 === l) break;
			if (i(l) && o + 1 < a && i(e[o + 1])) break; ++o,
			++r
		}
		n.push(64 | r - 1);
		for (var s = t; s < o; ++s) {
			var u = e[s];
			n.push(u + 65536 >> 8 & 255, u + 256 & 255)
		}
		return o
	}
	Object.defineProperty(t, "__esModule", {
		value: !0
	}),
	t.sizeOf = t.encode = t.decode = void 0;
	var u = r(n(11)),
	c = r(n(122)),
	f = r(n(1)),
	p = {},
	d = {},
	h = {};
	d.BYTE = function(e) {
		return f.
	default.argument(e >= 0 && e <= 255, "Byte value should be between 0 and 255."),
		[e]
	},
	h.BYTE = a(1),
	d.CHAR = function(e) {
		return [e.charCodeAt(0)]
	},
	h.CHAR = a(1),
	d.CHARARRAY = function(e) {
		for (var t = [], n = 0; n < e.length; n += 1) t[n] = e.charCodeAt(n);
		return t
	},
	h.CHARARRAY = function(e) {
		return e.length
	},
	d.USHORT = function(e) {
		return [e >> 8 & 255, 255 & e]
	},
	h.USHORT = a(2),
	d.SHORT = function(e) {
		return e >= 32768 && (e = -(65536 - e)),
		[e >> 8 & 255, 255 & e]
	},
	h.SHORT = a(2),
	d.UINT24 = function(e) {
		return [e >> 16 & 255, e >> 8 & 255, 255 & e]
	},
	h.UINT24 = a(3),
	d.ULONG = function(e) {
		return [e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, 255 & e]
	},
	h.ULONG = a(4),
	d.LONG = function(e) {
		return e >= 2147483648 && (e = -(4294967296 - e)),
		[e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, 255 & e]
	},
	h.LONG = a(4),
	d.FIXED = d.ULONG,
	h.FIXED = h.ULONG,
	d.FWORD = d.SHORT,
	h.FWORD = h.SHORT,
	d.UFWORD = d.USHORT,
	h.UFWORD = h.USHORT,
	d.LONGDATETIME = function(e) {
		return [0, 0, 0, 0, e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, 255 & e]
	},
	h.LONGDATETIME = a(8),
	d.TAG = function(e) {
		return f.
	default.argument(4 === e.length, "Tag should be exactly 4 ASCII characters."),
		[e.charCodeAt(0), e.charCodeAt(1), e.charCodeAt(2), e.charCodeAt(3)]
	},
	h.TAG = a(4),
	d.Card8 = d.BYTE,
	h.Card8 = h.BYTE,
	d.Card16 = d.USHORT,
	h.Card16 = h.USHORT,
	d.OffSize = d.BYTE,
	h.OffSize = h.BYTE,
	d.SID = d.USHORT,
	h.SID = h.USHORT,
	d.NUMBER = function(e) {
		return e >= -107 && e <= 107 ? [e + 139] : e >= 108 && e <= 1131 ? (e -= 108, [247 + (e >> 8), 255 & e]) : e >= -1131 && e <= -108 ? (e = -e - 108, [251 + (e >> 8), 255 & e]) : e >= -32768 && e <= 32767 ? d.NUMBER16(e) : d.NUMBER32(e)
	},
	h.NUMBER = function(e) {
		return d.NUMBER(e).length
	},
	d.NUMBER16 = function(e) {
		return [28, e >> 8 & 255, 255 & e]
	},
	h.NUMBER16 = a(3),
	d.NUMBER32 = function(e) {
		return [29, e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, 255 & e]
	},
	h.NUMBER32 = a(5),
	d.REAL = function(e) {
		var t = e.toString(),
		n = /\.(\d*?)(?:9{5,20}|0{5,20})\d{0,2}(?:e(.+)|$)/.exec(t);
		if (n) {
			var r = parseFloat("1e" + ((n[2] ? +n[2] : 0) + n[1].length));
			t = (Math.round(e * r) / r).toString()
		}
		for (var a = "",
		i = 0,
		o = t.length; i < o; i += 1) {
			var l = t[i];
			a += "e" === l ? "-" === t[++i] ? "c": "b": "." === l ? "a": "-" === l ? "e": l
		}
		for (var s = [30], u = 0, c = (a += 1 & a.length ? "f": "ff").length; u < c; u += 2) s.push(parseInt(a.substr(u, 2), 16));
		return s
	},
	h.REAL = function(e) {
		return d.REAL(e).length
	},
	d.NAME = d.CHARARRAY,
	h.NAME = h.CHARARRAY,
	d.STRING = d.CHARARRAY,
	h.STRING = h.CHARARRAY,
	p.UTF8 = function(e, t, n) {
		for (var r = [], a = n, i = 0; i < a; i++, t += 1) r[i] = e.getUint8(t);
		return String.fromCharCode.apply(null, r)
	},
	p.UTF16 = function(e, t, n) {
		for (var r = [], a = n / 2, i = 0; i < a; i++, t += 2) r[i] = e.getUint16(t);
		return String.fromCharCode.apply(null, r)
	},
	d.UTF16 = function(e) {
		for (var t = [], n = 0; n < e.length; n += 1) {
			var r = e.charCodeAt(n);
			t[t.length] = r >> 8 & 255,
			t[t.length] = 255 & r
		}
		return t
	},
	h.UTF16 = function(e) {
		return 2 * e.length
	};
	var m = {
		"x-mac-croatian": "ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®Š™´¨≠ŽØ∞±≤≥∆µ∂∑∏š∫ªºΩžø¿¡¬√ƒ≈Ć«Č… ÀÃÕŒœĐ—“”‘’÷◊©⁄€‹›Æ»–·‚„‰ÂćÁčÈÍÎÏÌÓÔđÒÚÛÙıˆ˜¯πË˚¸Êæˇ",
		"x-mac-cyrillic": "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ†°Ґ£§•¶І®©™Ђђ≠Ѓѓ∞±≤≥іµґЈЄєЇїЉљЊњјЅ¬√ƒ≈∆«»… ЋћЌќѕ–—“”‘’÷„ЎўЏџ№Ёёяабвгдежзийклмнопрстуфхцчшщъыьэю",
		"x-mac-gaelic": "ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ÆØḂ±≤≥ḃĊċḊḋḞḟĠġṀæøṁṖṗɼƒſṠ«»… ÀÃÕŒœ–—“”‘’ṡẛÿŸṪ€‹›Ŷŷṫ·Ỳỳ⁊ÂÊÁËÈÍÎÏÌÓÔ♣ÒÚÛÙıÝýŴŵẄẅẀẁẂẃ",
		"x-mac-greek": "Ä¹²É³ÖÜ΅àâä΄¨çéèêë£™îï•½‰ôö¦€ùûü†ΓΔΘΛΞΠß®©ΣΪ§≠°·Α±≤≥¥ΒΕΖΗΙΚΜΦΫΨΩάΝ¬ΟΡ≈Τ«»… ΥΧΆΈœ–―“”‘’÷ΉΊΌΎέήίόΏύαβψδεφγηιξκλμνοπώρστθωςχυζϊϋΐΰ­",
		"x-mac-icelandic": "ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûüÝ°¢£§•¶ß®©™´¨≠ÆØ∞±≤≥¥µ∂∑∏π∫ªºΩæø¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸ⁄€ÐðÞþý·‚„‰ÂÊÁËÈÍÎÏÌÓÔÒÚÛÙıˆ˜¯˘˙˚¸˝˛ˇ",
		"x-mac-inuit": "ᐃᐄᐅᐆᐊᐋᐱᐲᐳᐴᐸᐹᑉᑎᑏᑐᑑᑕᑖᑦᑭᑮᑯᑰᑲᑳᒃᒋᒌᒍᒎᒐᒑ°ᒡᒥᒦ•¶ᒧ®©™ᒨᒪᒫᒻᓂᓃᓄᓅᓇᓈᓐᓯᓰᓱᓲᓴᓵᔅᓕᓖᓗᓘᓚᓛᓪᔨᔩᔪᔫᔭ… ᔮᔾᕕᕖᕗ–—“”‘’ᕘᕙᕚᕝᕆᕇᕈᕉᕋᕌᕐᕿᖀᖁᖂᖃᖄᖅᖏᖐᖑᖒᖓᖔᖕᙱᙲᙳᙴᙵᙶᖖᖠᖡᖢᖣᖤᖥᖦᕼŁł",
		"x-mac-ce": "ÄĀāÉĄÖÜáąČäčĆćéŹźĎíďĒēĖóėôöõúĚěü†°Ę£§•¶ß®©™ę¨≠ģĮįĪ≤≥īĶ∂∑łĻļĽľĹĺŅņŃ¬√ńŇ∆«»… ňŐÕőŌ–—“”‘’÷◊ōŔŕŘ‹›řŖŗŠ‚„šŚśÁŤťÍŽžŪÓÔūŮÚůŰűŲųÝýķŻŁżĢˇ",
		macintosh: "ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ÆØ∞±≤≥¥µ∂∑∏π∫ªºΩæø¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸ⁄€‹›ﬁﬂ‡·‚„‰ÂÊÁËÈÍÎÏÌÓÔÒÚÛÙıˆ˜¯˘˙˚¸˝˛ˇ",
		"x-mac-romanian": "ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ĂȘ∞±≤≥¥µ∂∑∏π∫ªºΩăș¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸ⁄€‹›Țț‡·‚„‰ÂÊÁËÈÍÎÏÌÓÔÒÚÛÙıˆ˜¯˘˙˚¸˝˛ˇ",
		"x-mac-turkish": "ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ÆØ∞±≤≥¥µ∂∑∏π∫ªºΩæø¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸĞğİıŞş‡·‚„‰ÂÊÁËÈÍÎÏÌÓÔÒÚÛÙˆ˜¯˘˙˚¸˝˛ˇ"
	};
	p.MACSTRING = function(e, t, n, r) {
		var a = m[r];
		if (void 0 !== a) {
			for (var i = "",
			o = 0; o < n; o++) {
				var l = e.getUint8(t + o);
				i += l <= 127 ? String.fromCharCode(l) : a[127 & l]
			}
			return i
		}
	};
	var g = "function" == typeof c.
default && new c.
default,
	v = void 0;
	d.MACSTRING = function(e, t) {
		var n = function(e) {
			if (!v) {
				v = {};
				for (var t in m) v[t] = new String(t)
			}
			var n = v[e];
			if (void 0 !== n) {
				if (g) {
					var r = g.get(n);
					if (void 0 !== r) return r
				}
				var a = m[e];
				if (void 0 !== a) {
					for (var i = {},
					o = 0; o < a.length; o++) i[a.charCodeAt(o)] = o + 128;
					return g && g.set(n, i),
					i
				}
			}
		} (t);
		if (void 0 !== n) {
			for (var r = [], a = 0; a < e.length; a++) {
				var i = e.charCodeAt(a);
				if (i >= 128 && void 0 === (i = n[i])) return;
				r[a] = i
			}
			return r
		}
	},
	h.MACSTRING = function(e, t) {
		var n = d.MACSTRING(e, t);
		return void 0 !== n ? n.length: 0
	},
	d.VARDELTAS = function(e) {
		for (var t = 0,
		n = []; t < e.length;) {
			var r = e[t];
			t = 0 === r ? o(e, t, n) : r >= -128 && r <= 127 ? l(e, t, n) : s(e, t, n)
		}
		return n
	},
	d.INDEX = function(e) {
		for (var t = 1,
		n = [t], r = [], a = 0; a < e.length; a += 1) {
			var i = d.OBJECT(e[a]);
			Array.prototype.push.apply(r, i),
			t += i.length,
			n.push(t)
		}
		if (0 === r.length) return [0, 0];
		for (var o = [], l = 1 + Math.floor(Math.log(t) / Math.log(2)) / 8 | 0, s = [void 0, d.BYTE, d.USHORT, d.UINT24, d.ULONG][l], u = 0; u < n.length; u += 1) {
			var c = s(n[u]);
			Array.prototype.push.apply(o, c)
		}
		return Array.prototype.concat(d.Card16(e.length), d.OffSize(l), o, r)
	},
	h.INDEX = function(e) {
		return d.INDEX(e).length
	},
	d.DICT = function(e) {
		for (var t = [], n = (0, u.
	default)(e), r = n.length, a = 0; a < r; a += 1) {
			var i = parseInt(n[a], 0),
			o = e[i];
			t = (t = t.concat(d.OPERAND(o.value, o.type))).concat(d.OPERATOR(i))
		}
		return t
	},
	h.DICT = function(e) {
		return d.DICT(e).length
	},
	d.OPERATOR = function(e) {
		return e < 1200 ? [e] : [12, e - 1200]
	},
	d.OPERAND = function(e, t) {
		var n = [];
		if (Array.isArray(t)) for (var r = 0; r < t.length; r += 1) f.
	default.argument(e.length === t.length, "Not enough arguments given for type" + t),
		n = n.concat(d.OPERAND(e[r], t[r]));
		else if ("SID" === t) n = n.concat(d.NUMBER(e));
		else if ("offset" === t) n = n.concat(d.NUMBER32(e));
		else if ("number" === t) n = n.concat(d.NUMBER(e));
		else {
			if ("real" !== t) throw new Error("Unknown operand type " + t);
			n = n.concat(d.REAL(e))
		}
		return n
	},
	d.OP = d.BYTE,
	h.OP = h.BYTE;
	var y = "function" == typeof c.
default && new c.
default;
	d.CHARSTRING = function(e) {
		if (y) {
			var t = y.get(e);
			if (void 0 !== t) return t
		}
		for (var n = [], r = e.length, a = 0; a < r; a += 1) {
			var i = e[a];
			n = n.concat(d[i.type](i.value))
		}
		return y && y.set(e, n),
		n
	},
	h.CHARSTRING = function(e) {
		return d.CHARSTRING(e).length
	},
	d.FIXEDCHARSTRING = function(e) {
		return e = Math.round(65536 * e),
		[255, e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, 255 & e]
	},
	h.FIXEDCHARSTRING = a(5),
	d.OBJECT = function(e) {
		var t = d[e.type];
		return f.
	default.argument(void 0 !== t, "No encoding function for type " + e.type),
		t(e.value)
	},
	h.OBJECT = function(e) {
		var t = h[e.type];
		return f.
	default.argument(void 0 !== t, "No sizeOf function for type " + e.type),
		t(e.value)
	},
	d.TABLE = function(e) {
		for (var t = [], n = e.fields.length, r = [], a = [], i = 0; i < n; i += 1) {
			var o = e.fields[i],
			l = d[o.type];
			f.
		default.argument(void 0 !== l, "No encoding function for field type " + o.type + " (" + o.name + ")");
			var s = e[o.name];
			void 0 === s && (s = o.value);
			var u = l(s);
			"TABLE" === o.type ? (a.push(t.length), t = t.concat([0, 0]), r.push(u)) : t = t.concat(u)
		}
		for (var c = 0; c < r.length; c += 1) {
			var p = a[c],
			h = t.length;
			f.
		default.argument(h < 65536, "Table " + e.tableName + " too big."),
			t[p] = h >> 8,
			t[p + 1] = 255 & h,
			t = t.concat(r[c])
		}
		return t
	},
	h.TABLE = function(e) {
		for (var t = 0,
		n = e.fields.length,
		r = 0; r < n; r += 1) {
			var a = e.fields[r],
			i = h[a.type];
			f.
		default.argument(void 0 !== i, "No sizeOf function for field type " + a.type + " (" + a.name + ")");
			var o = e[a.name];
			void 0 === o && (o = a.value),
			t += i(o),
			"TABLE" === a.type && (t += 2)
		}
		return t
	},
	d.RECORD = d.TABLE,
	h.RECORD = h.TABLE,
	d.LITERAL = function(e) {
		return e
	},
	h.LITERAL = function(e) {
		return e.length
	},
	t.decode = p,
	t.encode = d,
	t.sizeOf = h
},
function(e, t, n) {
	"use strict";
	function r(e) {
		this.font = e
	}
	function a(e) {
		this.cmap = e
	}
	function i(e, t) {
		this.encoding = e,
		this.charset = t
	}
	function o(e) {
		switch (e.version) {
		case 1:
			this.names = s.slice();
			break;
		case 2:
			this.names = new Array(e.numberOfGlyphs);
			for (var t = 0; t < e.numberOfGlyphs; t++) e.glyphNameIndex[t] < s.length ? this.names[t] = s[e.glyphNameIndex[t]] : this.names[t] = e.names[e.glyphNameIndex[t] - s.length];
			break;
		case 2.5:
			this.names = new Array(e.numberOfGlyphs);
			for (var n = 0; n < e.numberOfGlyphs; n++) this.names[n] = s[n + e.glyphNameIndex[n]];
			break;
		case 3:
		default:
			this.names = []
		}
	}
	Object.defineProperty(t, "__esModule", {
		value: !0
	}),
	t.addGlyphNames = t.GlyphNames = t.CffEncoding = t.CmapEncoding = t.DefaultEncoding = t.standardNames = t.cffExpertEncoding = t.cffStandardEncoding = t.cffStandardStrings = void 0;
	var l = function(e) {
		return e && e.__esModule ? e: {
		default:
			e
		}
	} (n(11)),
	s = [".notdef", ".null", "nonmarkingreturn", "space", "exclam", "quotedbl", "numbersign", "dollar", "percent", "ampersand", "quotesingle", "parenleft", "parenright", "asterisk", "plus", "comma", "hyphen", "period", "slash", "zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "colon", "semicolon", "less", "equal", "greater", "question", "at", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "bracketleft", "backslash", "bracketright", "asciicircum", "underscore", "grave", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "braceleft", "bar", "braceright", "asciitilde", "Adieresis", "Aring", "Ccedilla", "Eacute", "Ntilde", "Odieresis", "Udieresis", "aacute", "agrave", "acircumflex", "adieresis", "atilde", "aring", "ccedilla", "eacute", "egrave", "ecircumflex", "edieresis", "iacute", "igrave", "icircumflex", "idieresis", "ntilde", "oacute", "ograve", "ocircumflex", "odieresis", "otilde", "uacute", "ugrave", "ucircumflex", "udieresis", "dagger", "degree", "cent", "sterling", "section", "bullet", "paragraph", "germandbls", "registered", "copyright", "trademark", "acute", "dieresis", "notequal", "AE", "Oslash", "infinity", "plusminus", "lessequal", "greaterequal", "yen", "mu", "partialdiff", "summation", "product", "pi", "integral", "ordfeminine", "ordmasculine", "Omega", "ae", "oslash", "questiondown", "exclamdown", "logicalnot", "radical", "florin", "approxequal", "Delta", "guillemotleft", "guillemotright", "ellipsis", "nonbreakingspace", "Agrave", "Atilde", "Otilde", "OE", "oe", "endash", "emdash", "quotedblleft", "quotedblright", "quoteleft", "quoteright", "divide", "lozenge", "ydieresis", "Ydieresis", "fraction", "currency", "guilsinglleft", "guilsinglright", "fi", "fl", "daggerdbl", "periodcentered", "quotesinglbase", "quotedblbase", "perthousand", "Acircumflex", "Ecircumflex", "Aacute", "Edieresis", "Egrave", "Iacute", "Icircumflex", "Idieresis", "Igrave", "Oacute", "Ocircumflex", "apple", "Ograve", "Uacute", "Ucircumflex", "Ugrave", "dotlessi", "circumflex", "tilde", "macron", "breve", "dotaccent", "ring", "cedilla", "hungarumlaut", "ogonek", "caron", "Lslash", "lslash", "Scaron", "scaron", "Zcaron", "zcaron", "brokenbar", "Eth", "eth", "Yacute", "yacute", "Thorn", "thorn", "minus", "multiply", "onesuperior", "twosuperior", "threesuperior", "onehalf", "onequarter", "threequarters", "franc", "Gbreve", "gbreve", "Idotaccent", "Scedilla", "scedilla", "Cacute", "cacute", "Ccaron", "ccaron", "dcroat"];
	r.prototype.charToGlyphIndex = function(e) {
		var t = e.charCodeAt(0),
		n = this.font.glyphs;
		if (n) for (var r = 0; r < n.length; r += 1) for (var a = n.get(r), i = 0; i < a.unicodes.length; i += 1) if (a.unicodes[i] === t) return r;
		return null
	},
	a.prototype.charToGlyphIndex = function(e) {
		return this.cmap.glyphIndexMap[e.charCodeAt(0)] || 0
	},
	i.prototype.charToGlyphIndex = function(e) {
		var t = e.charCodeAt(0),
		n = this.encoding[t];
		return this.charset.indexOf(n)
	},
	o.prototype.nameToGlyphIndex = function(e) {
		return this.names.indexOf(e)
	},
	o.prototype.glyphIndexToName = function(e) {
		return this.names[e]
	},
	t.cffStandardStrings = [".notdef", "space", "exclam", "quotedbl", "numbersign", "dollar", "percent", "ampersand", "quoteright", "parenleft", "parenright", "asterisk", "plus", "comma", "hyphen", "period", "slash", "zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "colon", "semicolon", "less", "equal", "greater", "question", "at", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "bracketleft", "backslash", "bracketright", "asciicircum", "underscore", "quoteleft", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "braceleft", "bar", "braceright", "asciitilde", "exclamdown", "cent", "sterling", "fraction", "yen", "florin", "section", "currency", "quotesingle", "quotedblleft", "guillemotleft", "guilsinglleft", "guilsinglright", "fi", "fl", "endash", "dagger", "daggerdbl", "periodcentered", "paragraph", "bullet", "quotesinglbase", "quotedblbase", "quotedblright", "guillemotright", "ellipsis", "perthousand", "questiondown", "grave", "acute", "circumflex", "tilde", "macron", "breve", "dotaccent", "dieresis", "ring", "cedilla", "hungarumlaut", "ogonek", "caron", "emdash", "AE", "ordfeminine", "Lslash", "Oslash", "OE", "ordmasculine", "ae", "dotlessi", "lslash", "oslash", "oe", "germandbls", "onesuperior", "logicalnot", "mu", "trademark", "Eth", "onehalf", "plusminus", "Thorn", "onequarter", "divide", "brokenbar", "degree", "thorn", "threequarters", "twosuperior", "registered", "minus", "eth", "multiply", "threesuperior", "copyright", "Aacute", "Acircumflex", "Adieresis", "Agrave", "Aring", "Atilde", "Ccedilla", "Eacute", "Ecircumflex", "Edieresis", "Egrave", "Iacute", "Icircumflex", "Idieresis", "Igrave", "Ntilde", "Oacute", "Ocircumflex", "Odieresis", "Ograve", "Otilde", "Scaron", "Uacute", "Ucircumflex", "Udieresis", "Ugrave", "Yacute", "Ydieresis", "Zcaron", "aacute", "acircumflex", "adieresis", "agrave", "aring", "atilde", "ccedilla", "eacute", "ecircumflex", "edieresis", "egrave", "iacute", "icircumflex", "idieresis", "igrave", "ntilde", "oacute", "ocircumflex", "odieresis", "ograve", "otilde", "scaron", "uacute", "ucircumflex", "udieresis", "ugrave", "yacute", "ydieresis", "zcaron", "exclamsmall", "Hungarumlautsmall", "dollaroldstyle", "dollarsuperior", "ampersandsmall", "Acutesmall", "parenleftsuperior", "parenrightsuperior", "266 ff", "onedotenleader", "zerooldstyle", "oneoldstyle", "twooldstyle", "threeoldstyle", "fouroldstyle", "fiveoldstyle", "sixoldstyle", "sevenoldstyle", "eightoldstyle", "nineoldstyle", "commasuperior", "threequartersemdash", "periodsuperior", "questionsmall", "asuperior", "bsuperior", "centsuperior", "dsuperior", "esuperior", "isuperior", "lsuperior", "msuperior", "nsuperior", "osuperior", "rsuperior", "ssuperior", "tsuperior", "ff", "ffi", "ffl", "parenleftinferior", "parenrightinferior", "Circumflexsmall", "hyphensuperior", "Gravesmall", "Asmall", "Bsmall", "Csmall", "Dsmall", "Esmall", "Fsmall", "Gsmall", "Hsmall", "Ismall", "Jsmall", "Ksmall", "Lsmall", "Msmall", "Nsmall", "Osmall", "Psmall", "Qsmall", "Rsmall", "Ssmall", "Tsmall", "Usmall", "Vsmall", "Wsmall", "Xsmall", "Ysmall", "Zsmall", "colonmonetary", "onefitted", "rupiah", "Tildesmall", "exclamdownsmall", "centoldstyle", "Lslashsmall", "Scaronsmall", "Zcaronsmall", "Dieresissmall", "Brevesmall", "Caronsmall", "Dotaccentsmall", "Macronsmall", "figuredash", "hypheninferior", "Ogoneksmall", "Ringsmall", "Cedillasmall", "questiondownsmall", "oneeighth", "threeeighths", "fiveeighths", "seveneighths", "onethird", "twothirds", "zerosuperior", "foursuperior", "fivesuperior", "sixsuperior", "sevensuperior", "eightsuperior", "ninesuperior", "zeroinferior", "oneinferior", "twoinferior", "threeinferior", "fourinferior", "fiveinferior", "sixinferior", "seveninferior", "eightinferior", "nineinferior", "centinferior", "dollarinferior", "periodinferior", "commainferior", "Agravesmall", "Aacutesmall", "Acircumflexsmall", "Atildesmall", "Adieresissmall", "Aringsmall", "AEsmall", "Ccedillasmall", "Egravesmall", "Eacutesmall", "Ecircumflexsmall", "Edieresissmall", "Igravesmall", "Iacutesmall", "Icircumflexsmall", "Idieresissmall", "Ethsmall", "Ntildesmall", "Ogravesmall", "Oacutesmall", "Ocircumflexsmall", "Otildesmall", "Odieresissmall", "OEsmall", "Oslashsmall", "Ugravesmall", "Uacutesmall", "Ucircumflexsmall", "Udieresissmall", "Yacutesmall", "Thornsmall", "Ydieresissmall", "001.000", "001.001", "001.002", "001.003", "Black", "Bold", "Book", "Light", "Medium", "Regular", "Roman", "Semibold"],
	t.cffStandardEncoding = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "space", "exclam", "quotedbl", "numbersign", "dollar", "percent", "ampersand", "quoteright", "parenleft", "parenright", "asterisk", "plus", "comma", "hyphen", "period", "slash", "zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "colon", "semicolon", "less", "equal", "greater", "question", "at", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "bracketleft", "backslash", "bracketright", "asciicircum", "underscore", "quoteleft", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "braceleft", "bar", "braceright", "asciitilde", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "exclamdown", "cent", "sterling", "fraction", "yen", "florin", "section", "currency", "quotesingle", "quotedblleft", "guillemotleft", "guilsinglleft", "guilsinglright", "fi", "fl", "", "endash", "dagger", "daggerdbl", "periodcentered", "", "paragraph", "bullet", "quotesinglbase", "quotedblbase", "quotedblright", "guillemotright", "ellipsis", "perthousand", "", "questiondown", "", "grave", "acute", "circumflex", "tilde", "macron", "breve", "dotaccent", "dieresis", "", "ring", "cedilla", "", "hungarumlaut", "ogonek", "caron", "emdash", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "AE", "", "ordfeminine", "", "", "", "", "Lslash", "Oslash", "OE", "ordmasculine", "", "", "", "", "", "ae", "", "", "", "dotlessi", "", "", "lslash", "oslash", "oe", "germandbls"],
	t.cffExpertEncoding = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "space", "exclamsmall", "Hungarumlautsmall", "", "dollaroldstyle", "dollarsuperior", "ampersandsmall", "Acutesmall", "parenleftsuperior", "parenrightsuperior", "twodotenleader", "onedotenleader", "comma", "hyphen", "period", "fraction", "zerooldstyle", "oneoldstyle", "twooldstyle", "threeoldstyle", "fouroldstyle", "fiveoldstyle", "sixoldstyle", "sevenoldstyle", "eightoldstyle", "nineoldstyle", "colon", "semicolon", "commasuperior", "threequartersemdash", "periodsuperior", "questionsmall", "", "asuperior", "bsuperior", "centsuperior", "dsuperior", "esuperior", "", "", "isuperior", "", "", "lsuperior", "msuperior", "nsuperior", "osuperior", "", "", "rsuperior", "ssuperior", "tsuperior", "", "ff", "fi", "fl", "ffi", "ffl", "parenleftinferior", "", "parenrightinferior", "Circumflexsmall", "hyphensuperior", "Gravesmall", "Asmall", "Bsmall", "Csmall", "Dsmall", "Esmall", "Fsmall", "Gsmall", "Hsmall", "Ismall", "Jsmall", "Ksmall", "Lsmall", "Msmall", "Nsmall", "Osmall", "Psmall", "Qsmall", "Rsmall", "Ssmall", "Tsmall", "Usmall", "Vsmall", "Wsmall", "Xsmall", "Ysmall", "Zsmall", "colonmonetary", "onefitted", "rupiah", "Tildesmall", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "exclamdownsmall", "centoldstyle", "Lslashsmall", "", "", "Scaronsmall", "Zcaronsmall", "Dieresissmall", "Brevesmall", "Caronsmall", "", "Dotaccentsmall", "", "", "Macronsmall", "", "", "figuredash", "hypheninferior", "", "", "Ogoneksmall", "Ringsmall", "Cedillasmall", "", "", "", "onequarter", "onehalf", "threequarters", "questiondownsmall", "oneeighth", "threeeighths", "fiveeighths", "seveneighths", "onethird", "twothirds", "", "", "zerosuperior", "onesuperior", "twosuperior", "threesuperior", "foursuperior", "fivesuperior", "sixsuperior", "sevensuperior", "eightsuperior", "ninesuperior", "zeroinferior", "oneinferior", "twoinferior", "threeinferior", "fourinferior", "fiveinferior", "sixinferior", "seveninferior", "eightinferior", "nineinferior", "centinferior", "dollarinferior", "periodinferior", "commainferior", "Agravesmall", "Aacutesmall", "Acircumflexsmall", "Atildesmall", "Adieresissmall", "Aringsmall", "AEsmall", "Ccedillasmall", "Egravesmall", "Eacutesmall", "Ecircumflexsmall", "Edieresissmall", "Igravesmall", "Iacutesmall", "Icircumflexsmall", "Idieresissmall", "Ethsmall", "Ntildesmall", "Ogravesmall", "Oacutesmall", "Ocircumflexsmall", "Otildesmall", "Odieresissmall", "OEsmall", "Oslashsmall", "Ugravesmall", "Uacutesmall", "Ucircumflexsmall", "Udieresissmall", "Yacutesmall", "Thornsmall", "Ydieresissmall"],
	t.standardNames = s,
	t.DefaultEncoding = r,
	t.CmapEncoding = a,
	t.CffEncoding = i,
	t.GlyphNames = o,
	t.addGlyphNames = function(e) {
		for (var t = void 0,
		n = e.tables.cmap.glyphIndexMap,
		r = (0, l.
	default)(n), a = 0; a < r.length; a += 1) {
			var i = r[a],
			o = n[i]; (t = e.glyphs.get(o)).addUnicode(parseInt(i))
		}
		for (var s = 0; s < e.glyphs.length; s += 1) t = e.glyphs.get(s),
		e.cffEncoding ? e.isCIDFont ? t.name = "gid" + s: t.name = e.cffEncoding.charset[s] : e.glyphNames.names && (t.name = e.glyphNames.glyphIndexToName(s))
	}
},
function(e, t, n) {
	var r = n(86),
	a = n(49);
	e.exports = Object.keys ||
	function(e) {
		return r(e, a)
	}
},
function(e, t, n) {
	var r = n(27),
	a = n(29);
	e.exports = function(e) {
		return r(a(e))
	}
},
function(e, t, n) {
	var r = n(28);
	e.exports = Object("z").propertyIsEnumerable(0) ? Object: function(e) {
		return "String" == r(e) ? e.split("") : Object(e)
	}
},
function(e, t) {
	var n = {}.toString;
	e.exports = function(e) {
		return n.call(e).slice(8, -1)
	}
},
function(e, t) {
	e.exports = function(e) {
		if (void 0 == e) throw TypeError("Can't call method on  " + e);
		return e
	}
},
function(e, t, n) {
	var r = n(31),
	a = Math.min;
	e.exports = function(e) {
		return e > 0 ? a(r(e), 9007199254740991) : 0
	}
},
function(e, t) {
	var n = Math.ceil,
	r = Math.floor;
	e.exports = function(e) {
		return isNaN(e = +e) ? 0 : (e > 0 ? r: n)(e)
	}
},
function(e, t, n) {
	var r = n(48)("keys"),
	a = n(33);
	e.exports = function(e) {
		return r[e] || (r[e] = a(e))
	}
},
function(e, t) {
	var n = 0,
	r = Math.random();
	e.exports = function(e) {
		return "Symbol(".concat(void 0 === e ? "": e, ")_", (++n + r).toString(36))
	}
},
function(e, t, n) {
	e.exports = {
	default:
		n(91),
		__esModule: !0
	}
},
function(e, t, n) {
	var r = n(12).f,
	a = n(14),
	i = n(6)("toStringTag");
	e.exports = function(e, t, n) {
		e && !a(e = n ? e: e.prototype, i) && r(e, i, {
			configurable: !0,
			value: t
		})
	}
},
function(e, t, n) {
	e.exports = {
	default:
		n(107),
		__esModule: !0
	}
},
function(e, t, n) {
	var r = n(5),
	a = n(3),
	i = n(10);
	e.exports = function(e, t) {
		var n = (a.Object || {})[e] || Object[e],
		o = {};
		o[e] = t(n),
		r(r.S + r.F * i(function() {
			n(1)
		}), "Object", o)
	}
},
function(e, t, n) {
	var r = n(18),
	a = n(27),
	i = n(19),
	o = n(30),
	l = n(126);
	e.exports = function(e, t) {
		var n = 1 == e,
		s = 2 == e,
		u = 3 == e,
		c = 4 == e,
		f = 6 == e,
		p = 5 == e || f,
		d = t || l;
		return function(t, l, h) {
			for (var m, g, v = i(t), y = a(v), b = r(l, h, 3), x = o(y.length), S = 0, w = n ? d(t, x) : s ? d(t, 0) : void 0; x > S; S++) if ((p || S in y) && (m = y[S], g = b(m, S, v), e)) if (n) w[S] = g;
			else if (g) switch (e) {
			case 3:
				return ! 0;
			case 5:
				return m;
			case 6:
				return S;
			case 2:
				w.push(m)
			} else if (c) return ! 1;
			return f ? -1 : u || c ? c: w
		}
	}
},
function(e, t, n) {
	var r = n(18),
	a = n(130),
	i = n(131),
	o = n(9),
	l = n(30),
	s = n(54),
	u = {},
	c = {}; (t = e.exports = function(e, t, n, f, p) {
		var d, h, m, g, v = p ?
		function() {
			return e
		}: s(e),
		y = r(n, f, t ? 2 : 1),
		b = 0;
		if ("function" != typeof v) throw TypeError(e + " is not iterable!");
		if (i(v)) {
			for (d = l(e.length); d > b; b++) if ((g = t ? y(o(h = e[b])[0], h[1]) : y(e[b])) === u || g === c) return g
		} else for (m = v.call(e); ! (h = m.next()).done;) if ((g = a(m, y, h.value, t)) === u || g === c) return g
	}).BREAK = u,
	t.RETURN = c
},
function(e, t, n) {
	"use strict";
	function r(e) {
		return e && e.__esModule ? e: {
		default:
			e
		}
	}
	function a(e, t, n) { (0, o.
	default)(e, t, {
			get: function() {
				return e.path,
				e[n]
			},
			set: function(t) {
				e[n] = t
			},
			enumerable: !0,
			configurable: !0
		})
	}
	function i(e, t) {
		if (this.font = e, this.glyphs = {},
		Array.isArray(t)) for (var n = 0; n < t.length; n++) this.glyphs[n] = t[n];
		this.length = t && t.length || 0
	}
	Object.defineProperty(t, "__esModule", {
		value: !0
	});
	var o = r(n(36)),
	l = r(n(62));
	i.prototype.get = function(e) {
		return "function" == typeof this.glyphs[e] && (this.glyphs[e] = this.glyphs[e]()),
		this.glyphs[e]
	},
	i.prototype.push = function(e, t) {
		this.glyphs[e] = t,
		this.length++
	},
	t.
default = {
		GlyphSet: i,
		glyphLoader: function(e, t) {
			return new l.
		default({
				index:
				t,
				font: e
			})
		},
		ttfGlyphLoader: function(e, t, n, r, i, o) {
			return function() {
				var s = new l.
			default({
					index:
					t,
					font: e
				});
				return s.path = function() {
					n(s, r, i);
					var t = o(e.glyphs, s);
					return t.unitsPerEm = e.unitsPerEm,
					t
				},
				a(s, "xMin", "_xMin"),
				a(s, "xMax", "_xMax"),
				a(s, "yMin", "_yMin"),
				a(s, "yMax", "_yMax"),
				s
			}
		},
		cffGlyphLoader: function(e, t, n, r) {
			return function() {
				var a = new l.
			default({
					index:
					t,
					font: e
				});
				return a.path = function() {
					var t = n(e, a, r);
					return t.unitsPerEm = e.unitsPerEm,
					t
				},
				a
			}
		}
	}
},
function(e, t) {
	e.exports = require("fs")
},
function(e, t) {
	function n(e, t) {
		var n = e[1] || "",
		r = e[3];
		if (!r) return n;
		if (t && "function" == typeof btoa) {
			var a = function(e) {
				return "/*# sourceMappingURL=data:application/json;charset=utf-8;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(e)))) + " */"
			} (r),
			i = r.sources.map(function(e) {
				return "/*# sourceURL=" + r.sourceRoot + e + " */"
			});
			return [n].concat(i).concat([a]).join("\n")
		}
		return [n].join("\n")
	}
	e.exports = function(e) {
		var t = [];
		return t.toString = function() {
			return this.map(function(t) {
				var r = n(t, e);
				return t[2] ? "@media " + t[2] + "{" + r + "}": r
			}).join("")
		},
		t.i = function(e, n) {
			"string" == typeof e && (e = [[null, e, ""]]);
			for (var r = {},
			a = 0; a < this.length; a++) {
				var i = this[a][0];
				"number" == typeof i && (r[i] = !0)
			}
			for (a = 0; a < e.length; a++) {
				var o = e[a];
				"number" == typeof o[0] && r[o[0]] || (n && !o[2] ? o[2] = n: n && (o[2] = "(" + o[2] + ") and (" + n + ")"), t.push(o))
			}
		},
		t
	}
},
function(e, t, n) {
	"use strict";
	t.__esModule = !0;
	var r = function(e) {
		return e && e.__esModule ? e: {
		default:
			e
		}
	} (n(81));
	t.
default = r.
default ||
	function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
		}
		return e
	}
},
function(e, t) {
	e.exports = function(e) {
		if ("function" != typeof e) throw TypeError(e + " is not a function!");
		return e
	}
},
function(e, t, n) {
	var r = n(4),
	a = n(7).document,
	i = r(a) && r(a.createElement);
	e.exports = function(e) {
		return i ? a.createElement(e) : {}
	}
},
function(e, t) {
	e.exports = function(e, t) {
		return {
			enumerable: !(1 & e),
			configurable: !(2 & e),
			writable: !(4 & e),
			value: t
		}
	}
},
function(e, t, n) {
	"use strict";
	var r = n(25),
	a = n(89),
	i = n(90),
	o = n(19),
	l = n(27),
	s = Object.assign;
	e.exports = !s || n(10)(function() {
		var e = {},
		t = {},
		n = Symbol(),
		r = "abcdefghijklmnopqrst";
		return e[n] = 7,
		r.split("").forEach(function(e) {
			t[e] = e
		}),
		7 != s({},
		e)[n] || Object.keys(s({},
		t)).join("") != r
	}) ?
	function(e, t) {
		for (var n = o(e), s = arguments.length, u = 1, c = a.f, f = i.f; s > u;) for (var p, d = l(arguments[u++]), h = c ? r(d).concat(c(d)) : r(d), m = h.length, g = 0; m > g;) f.call(d, p = h[g++]) && (n[p] = d[p]);
		return n
	}: s
},
function(e, t, n) {
	var r = n(7),
	a = "__core-js_shared__",
	i = r[a] || (r[a] = {});
	e.exports = function(e) {
		return i[e] || (i[e] = {})
	}
},
function(e, t) {
	e.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")
},
function(e, t, n) {
	n(93);
	for (var r = n(7), a = n(8), i = n(15), o = n(6)("toStringTag"), l = "CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,TextTrackList,TouchList".split(","), s = 0; s < l.length; s++) {
		var u = l[s],
		c = r[u],
		f = c && c.prototype;
		f && !f[o] && a(f, o, u),
		i[u] = i.Array
	}
},
function(e, t, n) {
	"use strict";
	var r = n(96),
	a = n(5),
	i = n(52),
	o = n(8),
	l = n(14),
	s = n(15),
	u = n(97),
	c = n(35),
	f = n(100),
	p = n(6)("iterator"),
	d = !([].keys && "next" in [].keys()),
	h = function() {
		return this
	};
	e.exports = function(e, t, n, m, g, v, y) {
		u(n, t, m);
		var b, x, S, w = function(e) {
			if (!d && e in E) return E[e];
			switch (e) {
			case "keys":
			case "values":
				return function() {
					return new n(this, e)
				}
			}
			return function() {
				return new n(this, e)
			}
		},
		L = t + " Iterator",
		k = "values" == g,
		D = !1,
		E = e.prototype,
		C = E[p] || E["@@iterator"] || g && E[g],
		A = !d && C || w(g),
		T = g ? k ? w("entries") : A: void 0,
		U = "Array" == t ? E.entries || C: C;
		if (U && (S = f(U.call(new e))) !== Object.prototype && S.next && (c(S, L, !0), r || l(S, p) || o(S, p, h)), k && C && "values" !== C.name && (D = !0, A = function() {
			return C.call(this)
		}), r && !y || !d && !D && E[p] || o(E, p, A), s[t] = A, s[L] = h, g) if (b = {
			values: k ? A: w("values"),
			keys: v ? A: w("keys"),
			entries: T
		},
		y) for (x in b) x in E || i(E, x, b[x]);
		else a(a.P + a.F * (d || D), t, b);
		return b
	}
},
function(e, t, n) {
	e.exports = n(8)
},
function(e, t, n) {
	var r = n(9),
	a = n(98),
	i = n(49),
	o = n(32)("IE_PROTO"),
	l = function() {},
	s = function() {
		var e, t = n(45)("iframe"),
		r = i.length;
		for (t.style.display = "none", n(99).appendChild(t), t.src = "javascript:", (e = t.contentWindow.document).open(), e.write("<script>document.F=Object<\/script>"), e.close(), s = e.F; r--;) delete s.prototype[i[r]];
		return s()
	};
	e.exports = Object.create ||
	function(e, t) {
		var n;
		return null !== e ? (l.prototype = r(e), n = new l, l.prototype = null, n[o] = e) : n = s(),
		void 0 === t ? n: a(n, t)
	}
},
function(e, t, n) {
	var r = n(104),
	a = n(6)("iterator"),
	i = n(15);
	e.exports = n(3).getIteratorMethod = function(e) {
		if (void 0 != e) return e[a] || e["@@iterator"] || i[r(e)]
	}
},
function(e, t, n) {
	"use strict";
	function r(e) {
		return e && e.__esModule ? e: {
		default:
			e
		}
	}
	function a(e, t) {
		n(41).readFile(e,
		function(e, n) {
			if (e) return t(e.message);
			t(null, (0, g.nodeBufferToArrayBuffer)(n))
		})
	}
	function i(e, t) {
		var n = new XMLHttpRequest;
		n.open("get", e, !0),
		n.responseType = "arraybuffer",
		n.onload = function() {
			return n.response ? t(null, n.response) : t("Font could not be loaded: " + n.statusText)
		},
		n.onerror = function() {
			t("Font could not be loaded")
		},
		n.send()
	}
	function o(e, t) {
		for (var n = [], r = 12, a = 0; a < t; a += 1) {
			var i = d.
		default.getTag(e, r),
			o = d.
		default.getULong(e, r + 4),
			l = d.
		default.getULong(e, r + 8),
			s = d.
		default.getULong(e, r + 12);
			n.push({
				tag: i,
				checksum: o,
				offset: l,
				length: s,
				compression: !1
			}),
			r += 16
		}
		return n
	}
	function l(e, t) {
		if ("WOFF" === t.compression) {
			var n = new Uint8Array(e.buffer, t.offset + 2, t.compressedLength - 2),
			r = new Uint8Array(t.length);
			if ((0, u.
		default)(n, r), r.byteLength !== t.length) throw new Error("Decompression error: " + t.tag + " decompressed length doesn't match recorded length");
			return {
				data: new DataView(r.buffer, 0),
				offset: 0
			}
		}
		return {
			data: e,
			offset: t.offset
		}
	}
	function s(e) {
		var t = void 0,
		n = void 0,
		r = new c.
	default({
			empty:
			!0
		}),
		a = new DataView(e, 0),
		i = void 0,
		s = [],
		u = d.
	default.getTag(a, 0);
		if (u === String.fromCharCode(0, 1, 0, 0) || "true" === u || "typ1" === u) r.outlinesFormat = "truetype",
		s = o(a, i = d.
	default.getUShort(a, 4));
		else if ("OTTO" === u) r.outlinesFormat = "cff",
		s = o(a, i = d.
	default.getUShort(a, 4));
		else {
			if ("wOFF" !== u) throw new Error("Unsupported OpenType signature " + u);
			var f = d.
		default.getTag(a, 4);
			if (f === String.fromCharCode(0, 1, 0, 0)) r.outlinesFormat = "truetype";
			else {
				if ("OTTO" !== f) throw new Error("Unsupported OpenType flavor " + u);
				r.outlinesFormat = "cff"
			}
			s = function(e, t) {
				for (var n = [], r = 44, a = 0; a < t; a += 1) {
					var i = d.
				default.getTag(e, r),
					o = d.
				default.getULong(e, r + 4),
					l = d.
				default.getULong(e, r + 8),
					s = d.
				default.getULong(e, r + 12),
					u = void 0;
					u = l < s && "WOFF",
					n.push({
						tag: i,
						offset: o,
						compression: u,
						compressedLength: l,
						length: s
					}),
					r += 20
				}
				return n
			} (a, i = d.
		default.getUShort(a, 12))
		}
		for (var h = void 0,
		m = void 0,
		g = void 0,
		F = void 0,
		N = void 0,
		M = void 0,
		G = void 0,
		I = void 0,
		P = void 0,
		_ = void 0,
		q = void 0,
		W = 0; W < i; W += 1) {
			var H = s[W],
			z = void 0;
			switch (H.tag) {
			case "cmap":
				z = l(a, H),
				r.tables.cmap = v.
			default.parse(z.data, z.offset),
				r.encoding = new p.CmapEncoding(r.tables.cmap);
				break;
			case "cvt ":
				z = l(a, H),
				q = new d.
			default.Parser(z.data, z.offset),
				r.tables.cvt = q.parseShortList(H.length / 2);
				break;
			case "fvar":
				m = H;
				break;
			case "fpgm":
				z = l(a, H),
				q = new d.
			default.Parser(z.data, z.offset),
				r.tables.fpgm = q.parseByteList(H.length);
				break;
			case "head":
				z = l(a, H),
				r.tables.head = L.
			default.parse(z.data, z.offset),
				r.unitsPerEm = r.tables.head.unitsPerEm,
				t = r.tables.head.indexToLocFormat;
				break;
			case "hhea":
				z = l(a, H),
				r.tables.hhea = k.
			default.parse(z.data, z.offset),
				r.ascender = r.tables.hhea.ascender,
				r.descender = r.tables.hhea.descender,
				r.numberOfHMetrics = r.tables.hhea.numberOfHMetrics;
				break;
			case "hmtx":
				M = H;
				break;
			case "ltag":
				z = l(a, H),
				n = C.
			default.parse(z.data, z.offset);
				break;
			case "maxp":
				z = l(a, H),
				r.tables.maxp = T.
			default.parse(z.data, z.offset),
				r.numGlyphs = r.tables.maxp.numGlyphs;
				break;
			case "name":
				P = H;
				break;
			case "OS/2":
				z = l(a, H),
				r.tables.os2 = O.
			default.parse(z.data, z.offset);
				break;
			case "post":
				z = l(a, H),
				r.tables.post = B.
			default.parse(z.data, z.offset),
				r.glyphNames = new p.GlyphNames(r.tables.post);
				break;
			case "prep":
				z = l(a, H),
				q = new d.
			default.Parser(z.data, z.offset),
				r.tables.prep = q.parseByteList(H.length);
				break;
			case "glyf":
				g = H;
				break;
			case "loca":
				I = H;
				break;
			case "CFF ":
				h = H;
				break;
			case "kern":
				G = H;
				break;
			case "GPOS":
				F = H;
				break;
			case "GSUB":
				N = H;
				break;
			case "meta":
				_ = H
			}
		}
		var j = l(a, P);
		if (r.tables.name = U.
	default.parse(j.data, j.offset, n), r.names = r.tables.name, g && I) {
			var V = 0 === t,
			Y = l(a, I),
			X = A.
		default.parse(Y.data, Y.offset, r.numGlyphs, V),
			Z = l(a, g);
			r.glyphs = x.
		default.parse(Z.data, Z.offset, X, r)
		} else {
			if (!h) throw new Error("Font doesn't contain TrueType or CFF outlines.");
			var J = l(a, h);
			y.
		default.parse(J.data, J.offset, r)
		}
		var Q = l(a, M);
		if (D.
	default.parse(Q.data, Q.offset, r.numberOfHMetrics, r.numGlyphs, r.glyphs), (0, p.addGlyphNames)(r), G) {
			var K = l(a, G);
			r.kerningPairs = E.
		default.parse(K.data, K.offset)
		} else r.kerningPairs = {};
		if (F) {
			var $ = l(a, F);
			S.
		default.parse($.data, $.offset, r)
		}
		if (N) {
			var ee = l(a, N);
			r.tables.gsub = w.
		default.parse(ee.data, ee.offset)
		}
		if (m) {
			var te = l(a, m);
			r.tables.fvar = b.
		default.parse(te.data, te.offset, r.names)
		}
		if (_) {
			var ne = l(a, _);
			r.tables.meta = R.
		default.parse(ne.data, ne.offset),
			r.metas = r.tables.meta
		}
		return r
	}
	Object.defineProperty(t, "__esModule", {
		value: !0
	}),
	t.loadSync = t.load = t.parse = t._parse = t.BoundingBox = t.Path = t.Glyph = t.Font = void 0;
	var u = r(n(114)),
	c = r(n(115)),
	f = r(n(62)),
	p = n(24),
	d = r(n(0)),
	h = r(n(56)),
	m = r(n(16)),
	g = n(75),
	v = r(n(60)),
	y = r(n(61)),
	b = r(n(154)),
	x = r(n(63)),
	S = r(n(73)),
	w = r(n(72)),
	L = r(n(64)),
	k = r(n(65)),
	D = r(n(66)),
	E = r(n(155)),
	C = r(n(67)),
	A = r(n(156)),
	T = r(n(68)),
	U = r(n(69)),
	O = r(n(70)),
	B = r(n(71)),
	R = r(n(74));
	t.Font = c.
default,
	t.Glyph = f.
default,
	t.Path = m.
default,
	t.BoundingBox = h.
default,
	t._parse = d.
default,
	t.parse = s,
	t.load = function(e, t) { ("undefined" == typeof window ? a: i)(e,
		function(e, n) {
			if (e) return t(e);
			var r = void 0;
			try {
				r = s(n)
			} catch(e) {
				return t(e, null)
			}
			return t(null, r)
		})
	},
	t.loadSync = function(e) {
		var t = n(41).readFileSync(e);
		return s((0, g.nodeBufferToArrayBuffer)(t))
	}
},
function(e, t, n) {
	"use strict";
	function r(e, t, n, r, a) {
		return Math.pow(1 - a, 3) * e + 3 * Math.pow(1 - a, 2) * a * t + 3 * (1 - a) * Math.pow(a, 2) * n + Math.pow(a, 3) * r
	}
	function a() {
		this.x1 = Number.NaN,
		this.y1 = Number.NaN,
		this.x2 = Number.NaN,
		this.y2 = Number.NaN
	}
	Object.defineProperty(t, "__esModule", {
		value: !0
	}),
	a.prototype.isEmpty = function() {
		return isNaN(this.x1) || isNaN(this.y1) || isNaN(this.x2) || isNaN(this.y2)
	},
	a.prototype.addPoint = function(e, t) {
		"number" == typeof e && ((isNaN(this.x1) || isNaN(this.x2)) && (this.x1 = e, this.x2 = e), e < this.x1 && (this.x1 = e), e > this.x2 && (this.x2 = e)),
		"number" == typeof t && ((isNaN(this.y1) || isNaN(this.y2)) && (this.y1 = t, this.y2 = t), t < this.y1 && (this.y1 = t), t > this.y2 && (this.y2 = t))
	},
	a.prototype.addX = function(e) {
		this.addPoint(e, null)
	},
	a.prototype.addY = function(e) {
		this.addPoint(null, e)
	},
	a.prototype.addBezier = function(e, t, n, a, i, o, l, s) {
		var u = [e, t],
		c = [n, a],
		f = [i, o],
		p = [l, s];
		this.addPoint(e, t),
		this.addPoint(l, s);
		for (var d = 0; d <= 1; d++) {
			var h = 6 * u[d] - 12 * c[d] + 6 * f[d],
			m = -3 * u[d] + 9 * c[d] - 9 * f[d] + 3 * p[d],
			g = 3 * c[d] - 3 * u[d];
			if (0 !== m) {
				var v = Math.pow(h, 2) - 4 * g * m;
				if (! (v < 0)) {
					var y = ( - h + Math.sqrt(v)) / (2 * m);
					0 < y && y < 1 && (0 === d && this.addX(r(u[d], c[d], f[d], p[d], y)), 1 === d && this.addY(r(u[d], c[d], f[d], p[d], y)));
					var b = ( - h - Math.sqrt(v)) / (2 * m);
					0 < b && b < 1 && (0 === d && this.addX(r(u[d], c[d], f[d], p[d], b)), 1 === d && this.addY(r(u[d], c[d], f[d], p[d], b)))
				}
			} else {
				if (0 === h) continue;
				var x = -g / h;
				0 < x && x < 1 && (0 === d && this.addX(r(u[d], c[d], f[d], p[d], x)), 1 === d && this.addY(r(u[d], c[d], f[d], p[d], x)))
			}
		}
	},
	a.prototype.addQuad = function(e, t, n, r, a, i) {
		var o = e + 2 / 3 * (n - e),
		l = t + 2 / 3 * (r - t),
		s = o + 1 / 3 * (a - e),
		u = l + 1 / 3 * (i - t);
		this.addBezier(e, t, o, l, s, u, a, i)
	},
	t.
default = a
},
function(e, t, n) {
	var r = n(8);
	e.exports = function(e, t, n) {
		for (var a in t) n && e[a] ? e[a] = t[a] : r(e, a, t[a]);
		return e
	}
},
function(e, t) {
	e.exports = function(e, t, n, r) {
		if (! (e instanceof t) || void 0 !== r && r in e) throw TypeError(n + ": incorrect invocation!");
		return e
	}
},
function(e, t, n) {
	var r = n(4);
	e.exports = function(e, t) {
		if (!r(e) || e._t !== t) throw TypeError("Incompatible receiver, " + t + " required!");
		return e
	}
},
function(e, t, n) {
	"use strict";
	function r(e) {
		return e && e.__esModule ? e: {
		default:
			e
		}
	}
	function a(e, t, n) {
		e.segments.push({
			end: t,
			start: t,
			delta: -(t - n),
			offset: 0,
			glyphIndex: n
		})
	}
	Object.defineProperty(t, "__esModule", {
		value: !0
	});
	var i = r(n(1)),
	o = r(n(0)),
	l = r(n(2));
	t.
default = {
		parse: function(e, t) {
			var n = {};
			n.version = o.
		default.getUShort(e, t),
			i.
		default.argument(0 === n.version, "cmap table version should be 0."),
			n.numTables = o.
		default.getUShort(e, t + 2);
			for (var r = -1,
			a = n.numTables - 1; a >= 0; a -= 1) {
				var l = o.
			default.getUShort(e, t + 4 + 8 * a),
				s = o.
			default.getUShort(e, t + 4 + 8 * a + 2);
				if (3 === l && (0 === s || 1 === s || 10 === s)) {
					r = o.
				default.getULong(e, t + 4 + 8 * a + 4);
					break
				}
			}
			if ( - 1 === r) throw new Error("No valid cmap sub-tables found.");
			var u = new o.
		default.Parser(e, t + r);
			if (n.format = u.parseUShort(), 12 === n.format) !
			function(e, t) {
				t.parseUShort(),
				e.length = t.parseULong(),
				e.language = t.parseULong();
				var n = void 0;
				e.groupCount = n = t.parseULong(),
				e.glyphIndexMap = {};
				for (var r = 0; r < n; r += 1) for (var a = t.parseULong(), i = t.parseULong(), o = t.parseULong(), l = a; l <= i; l += 1) e.glyphIndexMap[l] = o,
				o++
			} (n, u);
			else {
				if (4 !== n.format) throw new Error("Only format 4 and 12 cmap tables are supported (found format " + n.format + ")."); !
				function(e, t, n, r, a) {
					e.length = t.parseUShort(),
					e.language = t.parseUShort();
					var i = void 0;
					e.segCount = i = t.parseUShort() >> 1,
					t.skip("uShort", 3),
					e.glyphIndexMap = {};
					for (var l = new o.
				default.Parser(n, r + a + 14), s = new o.
				default.Parser(n, r + a + 16 + 2 * i), u = new o.
				default.Parser(n, r + a + 16 + 4 * i), c = new o.
				default.Parser(n, r + a + 16 + 6 * i), f = r + a + 16 + 8 * i, p = 0; p < i - 1; p += 1) for (var d = void 0,
					h = l.parseUShort(), m = s.parseUShort(), g = u.parseShort(), v = c.parseUShort(), y = m; y <= h; y += 1) 0 !== v ? (f = c.offset + c.relativeOffset - 2, f += v, f += 2 * (y - m), 0 !== (d = o.
				default.getUShort(n, f)) && (d = d + g & 65535)) : d = y + g & 65535,
					e.glyphIndexMap[y] = d
				} (n, u, e, t, r)
			}
			return n
		},
		make: function(e) {
			var t = !0,
			n = void 0;
			for (n = e.length - 1; n > 0; n -= 1) if (e.get(n).unicode > 65535) {
				t = !1;
				break
			}
			var r = [{
				name: "version",
				type: "USHORT",
				value: 0
			},
			{
				name: "numTables",
				type: "USHORT",
				value: t ? 1 : 2
			},
			{
				name: "platformID",
				type: "USHORT",
				value: 3
			},
			{
				name: "encodingID",
				type: "USHORT",
				value: 1
			},
			{
				name: "offset",
				type: "ULONG",
				value: t ? 12 : 20
			}];
			t || (r = r.concat([{
				name: "cmap12PlatformID",
				type: "USHORT",
				value: 3
			},
			{
				name: "cmap12EncodingID",
				type: "USHORT",
				value: 10
			},
			{
				name: "cmap12Offset",
				type: "ULONG",
				value: 0
			}])),
			r = r.concat([{
				name: "format",
				type: "USHORT",
				value: 4
			},
			{
				name: "cmap4Length",
				type: "USHORT",
				value: 0
			},
			{
				name: "language",
				type: "USHORT",
				value: 0
			},
			{
				name: "segCountX2",
				type: "USHORT",
				value: 0
			},
			{
				name: "searchRange",
				type: "USHORT",
				value: 0
			},
			{
				name: "entrySelector",
				type: "USHORT",
				value: 0
			},
			{
				name: "rangeShift",
				type: "USHORT",
				value: 0
			}]);
			var i = new l.
		default.Table("cmap", r);
			for (i.segments = [], n = 0; n < e.length; n += 1) {
				for (var o = e.get(n), s = 0; s < o.unicodes.length; s += 1) a(i, o.unicodes[s], n);
				i.segments = i.segments.sort(function(e, t) {
					return e.start - t.start
				})
			} !
			function(e) {
				e.segments.push({
					end: 65535,
					start: 65535,
					delta: 1,
					offset: 0
				})
			} (i);
			var u = i.segments.length,
			c = 0,
			f = [],
			p = [],
			d = [],
			h = [],
			m = [],
			g = [];
			for (n = 0; n < u; n += 1) {
				var v = i.segments[n];
				v.end <= 65535 && v.start <= 65535 ? (f = f.concat({
					name: "end_" + n,
					type: "USHORT",
					value: v.end
				}), p = p.concat({
					name: "start_" + n,
					type: "USHORT",
					value: v.start
				}), d = d.concat({
					name: "idDelta_" + n,
					type: "SHORT",
					value: v.delta
				}), h = h.concat({
					name: "idRangeOffset_" + n,
					type: "USHORT",
					value: v.offset
				}), void 0 !== v.glyphId && (m = m.concat({
					name: "glyph_" + n,
					type: "USHORT",
					value: v.glyphId
				}))) : c += 1,
				t || void 0 === v.glyphIndex || (g = (g = (g = g.concat({
					name: "cmap12Start_" + n,
					type: "ULONG",
					value: v.start
				})).concat({
					name: "cmap12End_" + n,
					type: "ULONG",
					value: v.end
				})).concat({
					name: "cmap12Glyph_" + n,
					type: "ULONG",
					value: v.glyphIndex
				}))
			}
			if (i.segCountX2 = 2 * (u - c), i.searchRange = 2 * Math.pow(2, Math.floor(Math.log(u - c) / Math.log(2))), i.entrySelector = Math.log(i.searchRange / 2) / Math.log(2), i.rangeShift = i.segCountX2 - i.searchRange, i.fields = i.fields.concat(f), i.fields.push({
				name: "reservedPad",
				type: "USHORT",
				value: 0
			}), i.fields = i.fields.concat(p), i.fields = i.fields.concat(d), i.fields = i.fields.concat(h), i.fields = i.fields.concat(m), i.cmap4Length = 14 + 2 * f.length + 2 + 2 * p.length + 2 * d.length + 2 * h.length + 2 * m.length, !t) {
				var y = 16 + 4 * g.length;
				i.cmap12Offset = 20 + i.cmap4Length,
				i.fields = i.fields.concat([{
					name: "cmap12Format",
					type: "USHORT",
					value: 12
				},
				{
					name: "cmap12Reserved",
					type: "USHORT",
					value: 0
				},
				{
					name: "cmap12Length",
					type: "ULONG",
					value: y
				},
				{
					name: "cmap12Language",
					type: "ULONG",
					value: 0
				},
				{
					name: "cmap12nGroups",
					type: "ULONG",
					value: g.length / 3
				}]),
				i.fields = i.fields.concat(g)
			}
			return i
		}
	}
},
function(e, t, n) {
	"use strict";
	function r(e) {
		return e && e.__esModule ? e: {
		default:
			e
		}
	}
	function a(e, t) {
		if (e === t) return ! 0;
		if (Array.isArray(e) && Array.isArray(t)) {
			if (e.length !== t.length) return ! 1;
			for (var n = 0; n < e.length; n += 1) if (!a(e[n], t[n])) return ! 1;
			return ! 0
		}
		return ! 1
	}
	function i(e) {
		return e.length < 1240 ? 107 : e.length < 33900 ? 1131 : 32768
	}
	function o(e, t, n) {
		var r = [],
		a = [],
		i = L.
	default.getCard16(e, t),
		o = void 0,
		l = void 0;
		if (0 !== i) {
			var s = L.
		default.getByte(e, t + 2);
			o = t + (i + 1) * s + 2;
			for (var u = t + 3,
			c = 0; c < i + 1; c += 1) r.push(L.
		default.getOffset(e, u, s)),
			u += s;
			l = o + r[i]
		} else l = t + 2;
		for (var f = 0; f < r.length - 1; f += 1) {
			var p = L.
		default.getBytes(e, o + r[f], o + r[f + 1]);
			n && (p = n(p)),
			a.push(p)
		}
		return {
			objects: a,
			startOffset: t,
			endOffset: l
		}
	}
	function l(e, t) {
		var n = void 0,
		r = void 0,
		a = void 0,
		i = void 0;
		if (28 === t) return n = e.parseByte(),
		r = e.parseByte(),
		n << 8 | r;
		if (29 === t) return n = e.parseByte(),
		r = e.parseByte(),
		a = e.parseByte(),
		i = e.parseByte(),
		n << 24 | r << 16 | a << 8 | i;
		if (30 === t) return function(e) {
			for (var t = "",
			n = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "E", "E-", null, "-"];;) {
				var r = e.parseByte(),
				a = r >> 4,
				i = 15 & r;
				if (15 === a) break;
				if (t += n[a], 15 === i) break;
				t += n[i]
			}
			return parseFloat(t)
		} (e);
		if (t >= 32 && t <= 246) return t - 139;
		if (t >= 247 && t <= 250) return n = e.parseByte(),
		256 * (t - 247) + n + 108;
		if (t >= 251 && t <= 254) return n = e.parseByte(),
		256 * -(t - 251) - n - 108;
		throw new Error("Invalid b0 " + t)
	}
	function s(e, t, n) {
		t = void 0 !== t ? t: 0;
		var r = new L.
	default.Parser(e, t),
		a = [],
		i = [];
		for (n = void 0 !== n ? n: e.length; r.relativeOffset < n;) {
			var o = r.parseByte();
			o <= 21 ? (12 === o && (o = 1200 + r.parseByte()), a.push([o, i]), i = []) : i.push(l(r, o))
		}
		return function(e) {
			for (var t = {},
			n = 0; n < e.length; n += 1) {
				var r = e[n][0],
				a = e[n][1],
				i = void 0;
				if (i = 1 === a.length ? a[0] : a, t.hasOwnProperty(r) && !isNaN(t[r])) throw new Error("Object " + t + " already has key " + r);
				t[r] = i
			}
			return t
		} (a)
	}
	function u(e, t) {
		return t = t <= 390 ? S.cffStandardStrings[t] : e[t - 391]
	}
	function c(e, t, n) {
		for (var r = {},
		a = void 0,
		i = 0; i < t.length; i += 1) {
			var o = t[i];
			if (Array.isArray(o.type)) {
				var l = [];
				l.length = o.type.length;
				for (var s = 0; s < o.type.length; s++) void 0 === (a = void 0 !== e[o.op] ? e[o.op][s] : void 0) && (a = void 0 !== o.value && void 0 !== o.value[s] ? o.value[s] : null),
				"SID" === o.type[s] && (a = u(n, a)),
				l[s] = a;
				r[o.name] = l
			} else void 0 === (a = e[o.op]) && (a = void 0 !== o.value ? o.value: null),
			"SID" === o.type && (a = u(n, a)),
			r[o.name] = a
		}
		return r
	}
	function f(e, t) {
		return c(s(e, 0, e.byteLength), E, t)
	}
	function p(e, t, n, r) {
		return c(s(e, t, n), C, r)
	}
	function d(e, t, n, r) {
		for (var a = [], l = 0; l < n.length; l += 1) {
			var s = f(new DataView(new Uint8Array(n[l]).buffer), r);
			s._subrs = [],
			s._subrsBias = 0;
			var u = s.private[0],
			c = s.private[1];
			if (0 !== u && 0 !== c) {
				var d = p(e, c + t, u, r);
				if (s._defaultWidthX = d.defaultWidthX, s._nominalWidthX = d.nominalWidthX, 0 !== d.subrs) {
					var h = o(e, c + d.subrs + t);
					s._subrs = h.objects,
					s._subrsBias = i(s._subrs)
				}
				s._privateDict = d
			}
			a.push(s)
		}
		return a
	}
	function h(e, t, n) {
		function r(e, t) {
			h && c.closePath(),
			c.moveTo(e, t),
			h = !0
		}
		function a() {
			f.length % 2 != 0 && !d && (L = f.shift() + x),
			p += f.length >> 1,
			f.length = 0,
			d = !0
		}
		function i(t) {
			for (var n = void 0,
			b = void 0,
			S = void 0,
			w = void 0,
			k = void 0,
			D = void 0,
			E = void 0,
			C = void 0,
			A = void 0,
			T = void 0,
			U = void 0,
			O = void 0,
			B = 0; B < t.length;) {
				var R = t[B];
				switch (B += 1, R) {
				case 1:
				case 3:
					a();
					break;
				case 4:
					f.length > 1 && !d && (L = f.shift() + x, d = !0),
					g += f.pop(),
					r(m, g);
					break;
				case 5:
					for (; f.length > 0;) m += f.shift(),
					g += f.shift(),
					c.lineTo(m, g);
					break;
				case 6:
					for (; f.length > 0 && (m += f.shift(), c.lineTo(m, g), 0 !== f.length);) g += f.shift(),
					c.lineTo(m, g);
					break;
				case 7:
					for (; f.length > 0 && (g += f.shift(), c.lineTo(m, g), 0 !== f.length);) m += f.shift(),
					c.lineTo(m, g);
					break;
				case 8:
					for (; f.length > 0;) o = m + f.shift(),
					l = g + f.shift(),
					s = o + f.shift(),
					u = l + f.shift(),
					m = s + f.shift(),
					g = u + f.shift(),
					c.curveTo(o, l, s, u, m, g);
					break;
				case 10:
					k = f.pop() + y,
					(D = v[k]) && i(D);
					break;
				case 11:
					return;
				case 12:
					switch (R = t[B], B += 1, R) {
					case 35:
						o = m + f.shift(),
						l = g + f.shift(),
						s = o + f.shift(),
						u = l + f.shift(),
						E = s + f.shift(),
						C = u + f.shift(),
						A = E + f.shift(),
						T = C + f.shift(),
						U = A + f.shift(),
						O = T + f.shift(),
						m = U + f.shift(),
						g = O + f.shift(),
						f.shift(),
						c.curveTo(o, l, s, u, E, C),
						c.curveTo(A, T, U, O, m, g);
						break;
					case 34:
						o = m + f.shift(),
						l = g,
						s = o + f.shift(),
						u = l + f.shift(),
						E = s + f.shift(),
						C = u,
						A = E + f.shift(),
						T = u,
						U = A + f.shift(),
						O = g,
						m = U + f.shift(),
						c.curveTo(o, l, s, u, E, C),
						c.curveTo(A, T, U, O, m, g);
						break;
					case 36:
						o = m + f.shift(),
						l = g + f.shift(),
						s = o + f.shift(),
						u = l + f.shift(),
						E = s + f.shift(),
						C = u,
						A = E + f.shift(),
						T = u,
						U = A + f.shift(),
						O = T + f.shift(),
						m = U + f.shift(),
						c.curveTo(o, l, s, u, E, C),
						c.curveTo(A, T, U, O, m, g);
						break;
					case 37:
						o = m + f.shift(),
						l = g + f.shift(),
						s = o + f.shift(),
						u = l + f.shift(),
						E = s + f.shift(),
						C = u + f.shift(),
						A = E + f.shift(),
						T = C + f.shift(),
						U = A + f.shift(),
						O = T + f.shift(),
						Math.abs(U - m) > Math.abs(O - g) ? m = U + f.shift() : g = O + f.shift(),
						c.curveTo(o, l, s, u, E, C),
						c.curveTo(A, T, U, O, m, g);
						break;
					default:
						f.length = 0
					}
					break;
				case 14:
					f.length > 0 && !d && (L = f.shift() + x, d = !0),
					h && (c.closePath(), h = !1);
					break;
				case 18:
					a();
					break;
				case 19:
				case 20:
					a(),
					B += p + 7 >> 3;
					break;
				case 21:
					f.length > 2 && !d && (L = f.shift() + x, d = !0),
					g += f.pop(),
					r(m += f.pop(), g);
					break;
				case 22:
					f.length > 1 && !d && (L = f.shift() + x, d = !0),
					r(m += f.pop(), g);
					break;
				case 23:
					a();
					break;
				case 24:
					for (; f.length > 2;) o = m + f.shift(),
					l = g + f.shift(),
					s = o + f.shift(),
					u = l + f.shift(),
					m = s + f.shift(),
					g = u + f.shift(),
					c.curveTo(o, l, s, u, m, g);
					m += f.shift(),
					g += f.shift(),
					c.lineTo(m, g);
					break;
				case 25:
					for (; f.length > 6;) m += f.shift(),
					g += f.shift(),
					c.lineTo(m, g);
					o = m + f.shift(),
					l = g + f.shift(),
					s = o + f.shift(),
					u = l + f.shift(),
					m = s + f.shift(),
					g = u + f.shift(),
					c.curveTo(o, l, s, u, m, g);
					break;
				case 26:
					for (f.length % 2 && (m += f.shift()); f.length > 0;) o = m,
					l = g + f.shift(),
					s = o + f.shift(),
					u = l + f.shift(),
					m = s,
					g = u + f.shift(),
					c.curveTo(o, l, s, u, m, g);
					break;
				case 27:
					for (f.length % 2 && (g += f.shift()); f.length > 0;) o = m + f.shift(),
					l = g,
					s = o + f.shift(),
					u = l + f.shift(),
					m = s + f.shift(),
					g = u,
					c.curveTo(o, l, s, u, m, g);
					break;
				case 28:
					n = t[B],
					b = t[B + 1],
					f.push((n << 24 | b << 16) >> 16),
					B += 2;
					break;
				case 29:
					k = f.pop() + e.gsubrsBias,
					(D = e.gsubrs[k]) && i(D);
					break;
				case 30:
					for (; f.length > 0 && (o = m, l = g + f.shift(), s = o + f.shift(), u = l + f.shift(), m = s + f.shift(), g = u + (1 === f.length ? f.shift() : 0), c.curveTo(o, l, s, u, m, g), 0 !== f.length);) o = m + f.shift(),
					l = g,
					s = o + f.shift(),
					u = l + f.shift(),
					g = u + f.shift(),
					m = s + (1 === f.length ? f.shift() : 0),
					c.curveTo(o, l, s, u, m, g);
					break;
				case 31:
					for (; f.length > 0 && (o = m + f.shift(), l = g, s = o + f.shift(), u = l + f.shift(), g = u + f.shift(), m = s + (1 === f.length ? f.shift() : 0), c.curveTo(o, l, s, u, m, g), 0 !== f.length);) o = m,
					l = g + f.shift(),
					s = o + f.shift(),
					u = l + f.shift(),
					m = s + f.shift(),
					g = u + (1 === f.length ? f.shift() : 0),
					c.curveTo(o, l, s, u, m, g);
					break;
				default:
					R < 32 || (R < 247 ? f.push(R - 139) : R < 251 ? (n = t[B], B += 1, f.push(256 * (R - 247) + n + 108)) : R < 255 ? (n = t[B], B += 1, f.push(256 * -(R - 251) - n - 108)) : (n = t[B], b = t[B + 1], S = t[B + 2], w = t[B + 3], B += 4, f.push((n << 24 | b << 16 | S << 8 | w) / 65536)))
				}
			}
		}
		var o = void 0,
		l = void 0,
		s = void 0,
		u = void 0,
		c = new k.
	default,
		f = [],
		p = 0,
		d = !1,
		h = !1,
		m = 0,
		g = 0,
		v = void 0,
		y = void 0,
		b = void 0,
		x = void 0;
		if (e.isCIDFont) {
			var S = e.tables.cff.topDict._fdSelect[t.index],
			w = e.tables.cff.topDict._fdArray[S];
			v = w._subrs,
			y = w._subrsBias,
			b = w._defaultWidthX,
			x = w._nominalWidthX
		} else v = e.tables.cff.topDict._subrs,
		y = e.tables.cff.topDict._subrsBias,
		b = e.tables.cff.topDict._defaultWidthX,
		x = e.tables.cff.topDict._nominalWidthX;
		var L = b;
		return i(n),
		t.advanceWidth = L,
		c
	}
	function m(e, t) {
		var n = void 0,
		r = S.cffStandardStrings.indexOf(e);
		return r >= 0 && (n = r),
		(r = t.indexOf(e)) >= 0 ? n = r + S.cffStandardStrings.length: (n = S.cffStandardStrings.length + t.length, t.push(e)),
		n
	}
	function g(e, t, n) {
		for (var r = {},
		i = 0; i < e.length; i += 1) {
			var o = e[i],
			l = t[o.name];
			void 0 === l || a(l, o.value) || ("SID" === o.type && (l = m(l, n)), r[o.op] = {
				name: o.name,
				type: o.type,
				value: l
			})
		}
		return r
	}
	function v(e, t) {
		var n = new D.
	default.Record("Top DICT", [{
			name: "dict",
			type: "DICT",
			value: {}
		}]);
		return n.dict = g(E, e, t),
		n
	}
	function y(e) {
		var t = new D.
	default.Record("Top DICT INDEX", [{
			name: "topDicts",
			type: "INDEX",
			value: []
		}]);
		return t.topDicts = [{
			name: "topDict_0",
			type: "TABLE",
			value: e
		}],
		t
	}
	function b(e) {
		var t = [],
		n = e.path;
		t.push({
			name: "width",
			type: "NUMBER",
			value: e.advanceWidth
		});
		for (var r = 0,
		a = 0,
		i = 0; i < n.commands.length; i += 1) {
			var o = void 0,
			l = void 0,
			s = n.commands[i];
			if ("Q" === s.type) {
				s = {
					type: "C",
					x: s.x,
					y: s.y,
					x1: 1 / 3 * r + 2 / 3 * s.x1,
					y1: 1 / 3 * a + 2 / 3 * s.y1,
					x2: 1 / 3 * s.x + 2 / 3 * s.x1,
					y2: 1 / 3 * s.y + 2 / 3 * s.y1
				}
			}
			if ("M" === s.type) o = s.x - r,
			l = s.y - a,
			t.push(x("dx", o)),
			t.push(x("dy", l)),
			t.push({
				name: "rmoveto",
				type: "OP",
				value: 21
			}),
			r = s.x,
			a = s.y;
			else if ("L" === s.type) o = s.x - r,
			l = s.y - a,
			t.push(x("dx", o)),
			t.push(x("dy", l)),
			t.push({
				name: "rlineto",
				type: "OP",
				value: 5
			}),
			r = s.x,
			a = s.y;
			else if ("C" === s.type) {
				var u = s.x1 - r,
				c = s.y1 - a,
				f = s.x2 - s.x1,
				p = s.y2 - s.y1;
				o = s.x - s.x2,
				l = s.y - s.y2,
				t.push(x("dx1", u)),
				t.push(x("dy1", c)),
				t.push(x("dx2", f)),
				t.push(x("dy2", p)),
				t.push(x("dx", o)),
				t.push(x("dy", l)),
				t.push({
					name: "rrcurveto",
					type: "OP",
					value: 8
				}),
				r = s.x,
				a = s.y
			}
		}
		return t.push({
			name: "endchar",
			type: "OP",
			value: 14
		}),
		t
	}
	function x(e, t) {
		var n = "FIXEDCHARSTRING";
		return t === Math.round(t) && (n = "NUMBER"),
		{
			name: e,
			type: n,
			value: t
		}
	}
	Object.defineProperty(t, "__esModule", {
		value: !0
	});
	var S = n(24),
	w = r(n(40)),
	L = (r(n(23)), r(n(0))),
	k = r(n(16)),
	D = r(n(2)),
	E = [{
		name: "version",
		op: 0,
		type: "SID"
	},
	{
		name: "notice",
		op: 1,
		type: "SID"
	},
	{
		name: "copyright",
		op: 1200,
		type: "SID"
	},
	{
		name: "fullName",
		op: 2,
		type: "SID"
	},
	{
		name: "familyName",
		op: 3,
		type: "SID"
	},
	{
		name: "weight",
		op: 4,
		type: "SID"
	},
	{
		name: "isFixedPitch",
		op: 1201,
		type: "number",
		value: 0
	},
	{
		name: "italicAngle",
		op: 1202,
		type: "number",
		value: 0
	},
	{
		name: "underlinePosition",
		op: 1203,
		type: "number",
		value: -100
	},
	{
		name: "underlineThickness",
		op: 1204,
		type: "number",
		value: 50
	},
	{
		name: "paintType",
		op: 1205,
		type: "number",
		value: 0
	},
	{
		name: "charstringType",
		op: 1206,
		type: "number",
		value: 2
	},
	{
		name: "fontMatrix",
		op: 1207,
		type: ["real", "real", "real", "real", "real", "real"],
		value: [.001, 0, 0, .001, 0, 0]
	},
	{
		name: "uniqueId",
		op: 13,
		type: "number"
	},
	{
		name: "fontBBox",
		op: 5,
		type: ["number", "number", "number", "number"],
		value: [0, 0, 0, 0]
	},
	{
		name: "strokeWidth",
		op: 1208,
		type: "number",
		value: 0
	},
	{
		name: "xuid",
		op: 14,
		type: [],
		value: null
	},
	{
		name: "charset",
		op: 15,
		type: "offset",
		value: 0
	},
	{
		name: "encoding",
		op: 16,
		type: "offset",
		value: 0
	},
	{
		name: "charStrings",
		op: 17,
		type: "offset",
		value: 0
	},
	{
		name: "private",
		op: 18,
		type: ["number", "offset"],
		value: [0, 0]
	},
	{
		name: "ros",
		op: 1230,
		type: ["SID", "SID", "number"]
	},
	{
		name: "cidFontVersion",
		op: 1231,
		type: "number",
		value: 0
	},
	{
		name: "cidFontRevision",
		op: 1232,
		type: "number",
		value: 0
	},
	{
		name: "cidFontType",
		op: 1233,
		type: "number",
		value: 0
	},
	{
		name: "cidCount",
		op: 1234,
		type: "number",
		value: 8720
	},
	{
		name: "uidBase",
		op: 1235,
		type: "number"
	},
	{
		name: "fdArray",
		op: 1236,
		type: "offset"
	},
	{
		name: "fdSelect",
		op: 1237,
		type: "offset"
	},
	{
		name: "fontName",
		op: 1238,
		type: "SID"
	}],
	C = [{
		name: "subrs",
		op: 19,
		type: "offset",
		value: 0
	},
	{
		name: "defaultWidthX",
		op: 20,
		type: "number",
		value: 0
	},
	{
		name: "nominalWidthX",
		op: 21,
		type: "number",
		value: 0
	}];
	t.
default = {
		parse: function(e, t, n) {
			n.tables.cff = {};
			var r = o(e, o(e,
			function(e, t) {
				var n = {};
				return n.formatMajor = L.
			default.getCard8(e, t),
				n.formatMinor = L.
			default.getCard8(e, t + 1),
				n.size = L.
			default.getCard8(e, t + 2),
				n.offsetSize = L.
			default.getCard8(e, t + 3),
				n.startOffset = t,
				n.endOffset = t + 4,
				n
			} (e, t).endOffset, L.
		default.bytesToString).endOffset),
			a = o(e, r.endOffset, L.
		default.bytesToString),
			l = o(e, a.endOffset);
			n.gsubrs = l.objects,
			n.gsubrsBias = i(n.gsubrs);
			var s = d(e, t, r.objects, a.objects);
			if (1 !== s.length) throw new Error("CFF table has too many fonts in 'FontSet' - count of fonts NameIndex.length = " + s.length);
			var c = s[0];
			if (n.tables.cff.topDict = c, c._privateDict && (n.defaultWidthX = c._privateDict.defaultWidthX, n.nominalWidthX = c._privateDict.nominalWidthX), void 0 !== c.ros[0] && void 0 !== c.ros[1] && (n.isCIDFont = !0), n.isCIDFont) {
				var f = c.fdArray,
				m = c.fdSelect;
				if (0 === f || 0 === m) throw new Error("Font is marked as a CID font, but FDArray and/or FDSelect information is missing");
				var g = d(e, t, o(e, f += t).objects, a.objects);
				c._fdArray = g,
				m += t,
				c._fdSelect = function(e, t, n, r) {
					var a = [],
					i = void 0,
					o = new L.
				default.Parser(e, t),
					l = o.parseCard8();
					if (0 === l) for (var s = 0; s < n; s++) {
						if ((i = o.parseCard8()) >= r) throw new Error("CFF table CID Font FDSelect has bad FD index value " + i + " (FD count " + r + ")");
						a.push(i)
					} else {
						if (3 !== l) throw new Error("CFF Table CID Font FDSelect table has unsupported format " + l);
						var u = o.parseCard16(),
						c = o.parseCard16();
						if (0 !== c) throw new Error("CFF Table CID Font FDSelect format 3 range has bad initial GID " + c);
						for (var f = void 0,
						p = 0; p < u; p++) {
							if (i = o.parseCard8(), f = o.parseCard16(), i >= r) throw new Error("CFF table CID Font FDSelect has bad FD index value " + i + " (FD count " + r + ")");
							if (f > n) throw new Error("CFF Table CID Font FDSelect format 3 range has bad GID " + f);
							for (; c < f; c++) a.push(i);
							c = f
						}
						if (f !== n) throw new Error("CFF Table CID Font FDSelect format 3 range has bad final GID " + f)
					}
					return a
				} (e, m, n.numGlyphs, g.length)
			}
			var v = t + c.private[1],
			y = p(e, v, c.private[0], a.objects);
			if (n.defaultWidthX = y.defaultWidthX, n.nominalWidthX = y.nominalWidthX, 0 !== y.subrs) {
				var b = o(e, v + y.subrs);
				n.subrs = b.objects,
				n.subrsBias = i(n.subrs)
			} else n.subrs = [],
			n.subrsBias = 0;
			var x = o(e, t + c.charStrings);
			n.nGlyphs = x.objects.length;
			var k = function(e, t, n, r) {
				var a = void 0,
				i = void 0,
				o = new L.
			default.Parser(e, t);
				n -= 1;
				var l = [".notdef"],
				s = o.parseCard8();
				if (0 === s) for (var c = 0; c < n; c += 1) a = o.parseSID(),
				l.push(u(r, a));
				else if (1 === s) for (; l.length <= n;) {
					a = o.parseSID(),
					i = o.parseCard8();
					for (var f = 0; f <= i; f += 1) l.push(u(r, a)),
					a += 1
				} else {
					if (2 !== s) throw new Error("Unknown charset format " + s);
					for (; l.length <= n;) {
						a = o.parseSID(),
						i = o.parseCard16();
						for (var p = 0; p <= i; p += 1) l.push(u(r, a)),
						a += 1
					}
				}
				return l
			} (e, t + c.charset, n.nGlyphs, a.objects);
			0 === c.encoding ? n.cffEncoding = new S.CffEncoding(S.cffStandardEncoding, k) : 1 === c.encoding ? n.cffEncoding = new S.CffEncoding(S.cffExpertEncoding, k) : n.cffEncoding = function(e, t, n) {
				var r = void 0,
				a = {},
				i = new L.
			default.Parser(e, t),
				o = i.parseCard8();
				if (0 === o) for (var l = i.parseCard8(), s = 0; s < l; s += 1) a[r = i.parseCard8()] = s;
				else {
					if (1 !== o) throw new Error("Unknown encoding format " + o);
					var u = i.parseCard8();
					r = 1;
					for (var c = 0; c < u; c += 1) for (var f = i.parseCard8(), p = i.parseCard8(), d = f; d <= f + p; d += 1) a[d] = r,
					r += 1
				}
				return new S.CffEncoding(a, n)
			} (e, t + c.encoding, k),
			n.encoding = n.encoding || n.cffEncoding,
			n.glyphs = new w.
		default.GlyphSet(n);
			for (var D = 0; D < n.nGlyphs; D += 1) {
				var E = x.objects[D];
				n.glyphs.push(D, w.
			default.cffGlyphLoader(n, D, h, E))
			}
		},
		make: function(e, t) {
			for (var n = new D.
		default.Table("CFF ", [{
				name: "header",
				type: "RECORD"
			},
			{
				name: "nameIndex",
				type: "RECORD"
			},
			{
				name: "topDictIndex",
				type: "RECORD"
			},
			{
				name: "stringIndex",
				type: "RECORD"
			},
			{
				name: "globalSubrIndex",
				type: "RECORD"
			},
			{
				name: "charsets",
				type: "RECORD"
			},
			{
				name: "charStringsIndex",
				type: "RECORD"
			},
			{
				name: "privateDict",
				type: "RECORD"
			}]), r = 1 / t.unitsPerEm, a = {
				version: t.version,
				fullName: t.fullName,
				familyName: t.familyName,
				weight: t.weightName,
				fontBBox: t.fontBBox || [0, 0, 0, 0],
				fontMatrix: [r, 0, 0, r, 0, 0],
				charset: 999,
				encoding: 0,
				charStrings: 999,
				private: [0, 999]
			},
			i = [], o = void 0, l = 1; l < e.length; l += 1) o = e.get(l),
			i.push(o.name);
			var s = [];
			n.header = new D.
		default.Record("Header", [{
				name: "major",
				type: "Card8",
				value: 1
			},
			{
				name: "minor",
				type: "Card8",
				value: 0
			},
			{
				name: "hdrSize",
				type: "Card8",
				value: 4
			},
			{
				name: "major",
				type: "Card8",
				value: 1
			}]),
			n.nameIndex = function(e) {
				var t = new D.
			default.Record("Name INDEX", [{
					name: "names",
					type: "INDEX",
					value: []
				}]);
				t.names = [];
				for (var n = 0; n < e.length; n += 1) t.names.push({
					name: "name_" + n,
					type: "NAME",
					value: e[n]
				});
				return t
			} ([t.postScriptName]);
			var u = v(a, s);
			n.topDictIndex = y(u),
			n.globalSubrIndex = new D.
		default.Record("Global Subr INDEX", [{
				name: "subrs",
				type: "INDEX",
				value: []
			}]),
			n.charsets = function(e, t) {
				for (var n = new D.
			default.Record("Charsets", [{
					name: "format",
					type: "Card8",
					value: 0
				}]), r = 0; r < e.length; r += 1) {
					var a = m(e[r], t);
					n.fields.push({
						name: "glyph_" + r,
						type: "SID",
						value: a
					})
				}
				return n
			} (i, s),
			n.charStringsIndex = function(e) {
				for (var t = new D.
			default.Record("CharStrings INDEX", [{
					name: "charStrings",
					type: "INDEX",
					value: []
				}]), n = 0; n < e.length; n += 1) {
					var r = e.get(n),
					a = b(r);
					t.charStrings.push({
						name: r.name,
						type: "CHARSTRING",
						value: a
					})
				}
				return t
			} (e),
			n.privateDict = function(e, t) {
				var n = new D.
			default.Record("Private DICT", [{
					name: "dict",
					type: "DICT",
					value: {}
				}]);
				return n.dict = g(C, e, t),
				n
			} ({},
			s),
			n.stringIndex = function(e) {
				var t = new D.
			default.Record("String INDEX", [{
					name: "strings",
					type: "INDEX",
					value: []
				}]);
				t.strings = [];
				for (var n = 0; n < e.length; n += 1) t.strings.push({
					name: "string_" + n,
					type: "STRING",
					value: e[n]
				});
				return t
			} (s);
			var c = n.header.sizeOf() + n.nameIndex.sizeOf() + n.topDictIndex.sizeOf() + n.stringIndex.sizeOf() + n.globalSubrIndex.sizeOf();
			return a.charset = c,
			a.encoding = 0,
			a.charStrings = a.charset + n.charsets.sizeOf(),
			a.private[1] = a.charStrings + n.charStringsIndex.sizeOf(),
			u = v(a, s),
			n.topDictIndex = y(u),
			n
		}
	}
},
function(e, t, n) {
	"use strict";
	function r(e) {
		return e && e.__esModule ? e: {
		default:
			e
		}
	}
	function a(e) {
		this.bindConstructorValues(e)
	}
	Object.defineProperty(t, "__esModule", {
		value: !0
	});
	var i = r(n(1)),
	o = r(n(137)),
	l = r(n(16)),
	s = r(n(63));
	a.prototype.bindConstructorValues = function(e) {
		this.index = e.index || 0,
		this.name = e.name || null,
		this.unicode = e.unicode || void 0,
		this.unicodes = e.unicodes || void 0 !== e.unicode ? [e.unicode] : [],
		e.xMin && (this.xMin = e.xMin),
		e.yMin && (this.yMin = e.yMin),
		e.xMax && (this.xMax = e.xMax),
		e.yMax && (this.yMax = e.yMax),
		e.advanceWidth && (this.advanceWidth = e.advanceWidth),
		Object.defineProperty(this, "path",
		function(e, t) {
			var n = t || {
				commands: []
			};
			return {
				configurable: !0,
				get: function() {
					return "function" == typeof n && (n = n()),
					n
				},
				set: function(e) {
					n = e
				}
			}
		} (0, e.path))
	},
	a.prototype.addUnicode = function(e) {
		0 === this.unicodes.length && (this.unicode = e),
		this.unicodes.push(e)
	},
	a.prototype.getBoundingBox = function() {
		return this.path.getBoundingBox()
	},
	a.prototype.getPath = function(e, t, n, r, a) {
		e = void 0 !== e ? e: 0,
		t = void 0 !== t ? t: 0,
		n = void 0 !== n ? n: 72;
		var i = void 0,
		o = void 0;
		r || (r = {});
		var u = r.xScale,
		c = r.yScale;
		if (r.hinting && a && a.hinting && (o = this.path && a.hinting.exec(this, n)), o) i = s.
	default.getPath(o).commands,
		e = Math.round(e),
		t = Math.round(t),
		u = c = 1;
		else {
			i = this.path.commands;
			var f = 1 / this.path.unitsPerEm * n;
			void 0 === u && (u = f),
			void 0 === c && (c = f)
		}
		for (var p = new l.
	default,
		d = 0; d < i.length; d += 1) {
			var h = i[d];
			"M" === h.type ? p.moveTo(e + h.x * u, t + -h.y * c) : "L" === h.type ? p.lineTo(e + h.x * u, t + -h.y * c) : "Q" === h.type ? p.quadraticCurveTo(e + h.x1 * u, t + -h.y1 * c, e + h.x * u, t + -h.y * c) : "C" === h.type ? p.curveTo(e + h.x1 * u, t + -h.y1 * c, e + h.x2 * u, t + -h.y2 * c, e + h.x * u, t + -h.y * c) : "Z" === h.type && p.closePath()
		}
		return p
	},
	a.prototype.getContours = function() {
		if (void 0 === this.points) return [];
		for (var e = [], t = [], n = 0; n < this.points.length; n += 1) {
			var r = this.points[n];
			t.push(r),
			r.lastPointOfContour && (e.push(t), t = [])
		}
		return i.
	default.argument(0 === t.length, "There are still points left in the current contour."),
		e
	},
	a.prototype.getMetrics = function() {
		for (var e = this.path.commands,
		t = [], n = [], r = 0; r < e.length; r += 1) {
			var a = e[r];
			"Z" !== a.type && (t.push(a.x), n.push(a.y)),
			"Q" !== a.type && "C" !== a.type || (t.push(a.x1), n.push(a.y1)),
			"C" === a.type && (t.push(a.x2), n.push(a.y2))
		}
		var i = {
			xMin: Math.min.apply(null, t),
			yMin: Math.min.apply(null, n),
			xMax: Math.max.apply(null, t),
			yMax: Math.max.apply(null, n),
			leftSideBearing: this.leftSideBearing
		};
		return isFinite(i.xMin) || (i.xMin = 0),
		isFinite(i.xMax) || (i.xMax = this.advanceWidth),
		isFinite(i.yMin) || (i.yMin = 0),
		isFinite(i.yMax) || (i.yMax = 0),
		i.rightSideBearing = this.advanceWidth - i.leftSideBearing - (i.xMax - i.xMin),
		i
	},
	a.prototype.draw = function(e, t, n, r, a) {
		this.getPath(t, n, r, a).draw(e)
	},
	a.prototype.drawPoints = function(e, t, n, r) {
		function a(t, n, r, a) {
			var i = 2 * Math.PI;
			e.beginPath();
			for (var o = 0; o < t.length; o += 1) e.moveTo(n + t[o].x * a, r + t[o].y * a),
			e.arc(n + t[o].x * a, r + t[o].y * a, 2, 0, i, !1);
			e.closePath(),
			e.fill()
		}
		t = void 0 !== t ? t: 0,
		n = void 0 !== n ? n: 0,
		r = void 0 !== r ? r: 24;
		for (var i = 1 / this.path.unitsPerEm * r,
		o = [], l = [], s = this.path, u = 0; u < s.commands.length; u += 1) {
			var c = s.commands[u];
			void 0 !== c.x && o.push({
				x: c.x,
				y: -c.y
			}),
			void 0 !== c.x1 && l.push({
				x: c.x1,
				y: -c.y1
			}),
			void 0 !== c.x2 && l.push({
				x: c.x2,
				y: -c.y2
			})
		}
		e.fillStyle = "blue",
		a(o, t, n, i),
		e.fillStyle = "red",
		a(l, t, n, i)
	},
	a.prototype.drawMetrics = function(e, t, n, r) {
		var a = void 0;
		t = void 0 !== t ? t: 0,
		n = void 0 !== n ? n: 0,
		r = void 0 !== r ? r: 24,
		a = 1 / this.path.unitsPerEm * r,
		e.lineWidth = 1,
		e.strokeStyle = "black",
		o.
	default.line(e, t, -1e4, t, 1e4),
		o.
	default.line(e, -1e4, n, 1e4, n);
		var i = this.xMin || 0,
		l = this.yMin || 0,
		s = this.xMax || 0,
		u = this.yMax || 0,
		c = this.advanceWidth || 0;
		e.strokeStyle = "blue",
		o.
	default.line(e, t + i * a, -1e4, t + i * a, 1e4),
		o.
	default.line(e, t + s * a, -1e4, t + s * a, 1e4),
		o.
	default.line(e, -1e4, n + -l * a, 1e4, n + -l * a),
		o.
	default.line(e, -1e4, n + -u * a, 1e4, n + -u * a),
		e.strokeStyle = "green",
		o.
	default.line(e, t + c * a, -1e4, t + c * a, 1e4)
	},
	t.
default = a
},
function(e, t, n) {
	"use strict";
	function r(e) {
		return e && e.__esModule ? e: {
		default:
			e
		}
	}
	function a(e, t, n, r, a) {
		var i = void 0;
		return (t & r) > 0 ? (i = e.parseByte(), 0 == (t & a) && (i = -i), i = n + i) : i = (t & a) > 0 ? n: n + e.parseShort(),
		i
	}
	function i(e, t, n) {
		var r = new f.
	default.Parser(t, n);
		e.numberOfContours = r.parseShort(),
		e._xMin = r.parseShort(),
		e._yMin = r.parseShort(),
		e._xMax = r.parseShort(),
		e._yMax = r.parseShort();
		var i = void 0,
		o = void 0;
		if (e.numberOfContours > 0) {
			for (var l = e.endPointIndices = [], s = 0; s < e.numberOfContours; s += 1) l.push(r.parseUShort());
			e.instructionLength = r.parseUShort(),
			e.instructions = [];
			for (var c = 0; c < e.instructionLength; c += 1) e.instructions.push(r.parseByte());
			var p = l[l.length - 1] + 1;
			i = [];
			for (var d = 0; d < p; d += 1) if (o = r.parseByte(), i.push(o), (8 & o) > 0) for (var h = r.parseByte(), m = 0; m < h; m += 1) i.push(o),
			d += 1;
			if (u.
		default.argument(i.length === p, "Bad flags."), l.length > 0) {
				var g = [],
				v = void 0;
				if (p > 0) {
					for (var y = 0; y < p; y += 1) o = i[y],
					(v = {}).onCurve = !!(1 & o),
					v.lastPointOfContour = l.indexOf(y) >= 0,
					g.push(v);
					for (var b = 0,
					x = 0; x < p; x += 1) o = i[x],
					(v = g[x]).x = a(r, o, b, 2, 16),
					b = v.x;
					for (var S = 0,
					w = 0; w < p; w += 1) o = i[w],
					(v = g[w]).y = a(r, o, S, 4, 32),
					S = v.y
				}
				e.points = g
			} else e.points = []
		} else if (0 === e.numberOfContours) e.points = [];
		else {
			e.isComposite = !0,
			e.points = [],
			e.components = [];
			for (var L = !0; L;) {
				i = r.parseUShort();
				var k = {
					glyphIndex: r.parseUShort(),
					xScale: 1,
					scale01: 0,
					scale10: 0,
					yScale: 1,
					dx: 0,
					dy: 0
				}; (1 & i) > 0 ? (2 & i) > 0 ? (k.dx = r.parseShort(), k.dy = r.parseShort()) : k.matchedPoints = [r.parseUShort(), r.parseUShort()] : (2 & i) > 0 ? (k.dx = r.parseChar(), k.dy = r.parseChar()) : k.matchedPoints = [r.parseByte(), r.parseByte()],
				(8 & i) > 0 ? k.xScale = k.yScale = r.parseF2Dot14() : (64 & i) > 0 ? (k.xScale = r.parseF2Dot14(), k.yScale = r.parseF2Dot14()) : (128 & i) > 0 && (k.xScale = r.parseF2Dot14(), k.scale01 = r.parseF2Dot14(), k.scale10 = r.parseF2Dot14(), k.yScale = r.parseF2Dot14()),
				e.components.push(k),
				L = !!(32 & i)
			}
			if (256 & i) {
				e.instructionLength = r.parseUShort(),
				e.instructions = [];
				for (var D = 0; D < e.instructionLength; D += 1) e.instructions.push(r.parseByte())
			}
		}
	}
	function o(e, t) {
		for (var n = [], r = 0; r < e.length; r += 1) {
			var a = e[r],
			i = {
				x: t.xScale * a.x + t.scale01 * a.y + t.dx,
				y: t.scale10 * a.x + t.yScale * a.y + t.dy,
				onCurve: a.onCurve,
				lastPointOfContour: a.lastPointOfContour
			};
			n.push(i)
		}
		return n
	}
	function l(e) {
		var t = new p.
	default;
		if (!e) return t;
		for (var n = function(e) {
			for (var t = [], n = [], r = 0; r < e.length; r += 1) {
				var a = e[r];
				n.push(a),
				a.lastPointOfContour && (t.push(n), n = [])
			}
			return u.
		default.argument(0 === n.length, "There are still points left in the current contour."),
			t
		} (e), r = 0; r < n.length; ++r) {
			var a = n[r],
			i = null,
			o = a[a.length - 1],
			l = a[0];
			if (o.onCurve) t.moveTo(o.x, o.y);
			else if (l.onCurve) t.moveTo(l.x, l.y);
			else {
				var s = {
					x: .5 * (o.x + l.x),
					y: .5 * (o.y + l.y)
				};
				t.moveTo(s.x, s.y)
			}
			for (var c = 0; c < a.length; ++c) if (i = o, o = l, l = a[(c + 1) % a.length], o.onCurve) t.lineTo(o.x, o.y);
			else {
				var f = i,
				d = l;
				i.onCurve || (f = {
					x: .5 * (o.x + i.x),
					y: .5 * (o.y + i.y)
				},
				t.lineTo(f.x, f.y)),
				l.onCurve || (d = {
					x: .5 * (o.x + l.x),
					y: .5 * (o.y + l.y)
				}),
				t.lineTo(f.x, f.y),
				t.quadraticCurveTo(o.x, o.y, d.x, d.y)
			}
			t.closePath()
		}
		return t
	}
	function s(e, t) {
		if (t.isComposite) for (var n = 0; n < t.components.length; n += 1) {
			var r = t.components[n],
			a = e.get(r.glyphIndex);
			if (a.getPath(), a.points) {
				var i = void 0;
				if (void 0 === r.matchedPoints) i = o(a.points, r);
				else {
					if (r.matchedPoints[0] > t.points.length - 1 || r.matchedPoints[1] > a.points.length - 1) throw Error("Matched points out of range in " + t.name);
					var s = t.points[r.matchedPoints[0]],
					u = a.points[r.matchedPoints[1]],
					c = {
						xScale: r.xScale,
						scale01: r.scale01,
						scale10: r.scale10,
						yScale: r.yScale,
						dx: 0,
						dy: 0
					};
					u = o([u], c)[0],
					c.dx = s.x - u.x,
					c.dy = s.y - u.y,
					i = o(a.points, c)
				}
				t.points = t.points.concat(i)
			}
		}
		return l(t.points)
	}
	Object.defineProperty(t, "__esModule", {
		value: !0
	});
	var u = r(n(1)),
	c = r(n(40)),
	f = r(n(0)),
	p = r(n(16));
	t.
default = {
		getPath: l,
		parse: function(e, t, n, r) {
			for (var a = new c.
		default.GlyphSet(r), o = 0; o < n.length - 1; o += 1) {
				var l = n[o];
				l !== n[o + 1] ? a.push(o, c.
			default.ttfGlyphLoader(r, o, i, e, t + l, s)) : a.push(o, c.
			default.glyphLoader(r, o))
			}
			return a
		}
	}
},
function(e, t, n) {
	"use strict";
	function r(e) {
		return e && e.__esModule ? e: {
		default:
			e
		}
	}
	Object.defineProperty(t, "__esModule", {
		value: !0
	});
	var a = r(n(1)),
	i = r(n(0)),
	o = r(n(2));
	t.
default = {
		parse: function(e, t) {
			var n = {},
			r = new i.
		default.Parser(e, t);
			return n.version = r.parseVersion(),
			n.fontRevision = Math.round(1e3 * r.parseFixed()) / 1e3,
			n.checkSumAdjustment = r.parseULong(),
			n.magicNumber = r.parseULong(),
			a.
		default.argument(1594834165 === n.magicNumber, "Font header has wrong magic number."),
			n.flags = r.parseUShort(),
			n.unitsPerEm = r.parseUShort(),
			n.created = r.parseLongDateTime(),
			n.modified = r.parseLongDateTime(),
			n.xMin = r.parseShort(),
			n.yMin = r.parseShort(),
			n.xMax = r.parseShort(),
			n.yMax = r.parseShort(),
			n.macStyle = r.parseUShort(),
			n.lowestRecPPEM = r.parseUShort(),
			n.fontDirectionHint = r.parseShort(),
			n.indexToLocFormat = r.parseShort(),
			n.glyphDataFormat = r.parseShort(),
			n
		},
		make: function(e) {
			var t = Math.round((new Date).getTime() / 1e3) + 2082844800,
			n = t;
			return e.createdTimestamp && (n = e.createdTimestamp + 2082844800),
			new o.
		default.Table("head", [{
				name: "version",
				type: "FIXED",
				value: 65536
			},
			{
				name: "fontRevision",
				type: "FIXED",
				value: 65536
			},
			{
				name: "checkSumAdjustment",
				type: "ULONG",
				value: 0
			},
			{
				name: "magicNumber",
				type: "ULONG",
				value: 1594834165
			},
			{
				name: "flags",
				type: "USHORT",
				value: 0
			},
			{
				name: "unitsPerEm",
				type: "USHORT",
				value: 1e3
			},
			{
				name: "created",
				type: "LONGDATETIME",
				value: n
			},
			{
				name: "modified",
				type: "LONGDATETIME",
				value: t
			},
			{
				name: "xMin",
				type: "SHORT",
				value: 0
			},
			{
				name: "yMin",
				type: "SHORT",
				value: 0
			},
			{
				name: "xMax",
				type: "SHORT",
				value: 0
			},
			{
				name: "yMax",
				type: "SHORT",
				value: 0
			},
			{
				name: "macStyle",
				type: "USHORT",
				value: 0
			},
			{
				name: "lowestRecPPEM",
				type: "USHORT",
				value: 0
			},
			{
				name: "fontDirectionHint",
				type: "SHORT",
				value: 2
			},
			{
				name: "indexToLocFormat",
				type: "SHORT",
				value: 0
			},
			{
				name: "glyphDataFormat",
				type: "SHORT",
				value: 0
			}], e)
		}
	}
},
function(e, t, n) {
	"use strict";
	function r(e) {
		return e && e.__esModule ? e: {
		default:
			e
		}
	}
	Object.defineProperty(t, "__esModule", {
		value: !0
	});
	var a = r(n(0)),
	i = r(n(2));
	t.
default = {
		parse: function(e, t) {
			var n = {},
			r = new a.
		default.Parser(e, t);
			return n.version = r.parseVersion(),
			n.ascender = r.parseShort(),
			n.descender = r.parseShort(),
			n.lineGap = r.parseShort(),
			n.advanceWidthMax = r.parseUShort(),
			n.minLeftSideBearing = r.parseShort(),
			n.minRightSideBearing = r.parseShort(),
			n.xMaxExtent = r.parseShort(),
			n.caretSlopeRise = r.parseShort(),
			n.caretSlopeRun = r.parseShort(),
			n.caretOffset = r.parseShort(),
			r.relativeOffset += 8,
			n.metricDataFormat = r.parseShort(),
			n.numberOfHMetrics = r.parseUShort(),
			n
		},
		make: function(e) {
			return new i.
		default.Table("hhea", [{
				name: "version",
				type: "FIXED",
				value: 65536
			},
			{
				name: "ascender",
				type: "FWORD",
				value: 0
			},
			{
				name: "descender",
				type: "FWORD",
				value: 0
			},
			{
				name: "lineGap",
				type: "FWORD",
				value: 0
			},
			{
				name: "advanceWidthMax",
				type: "UFWORD",
				value: 0
			},
			{
				name: "minLeftSideBearing",
				type: "FWORD",
				value: 0
			},
			{
				name: "minRightSideBearing",
				type: "FWORD",
				value: 0
			},
			{
				name: "xMaxExtent",
				type: "FWORD",
				value: 0
			},
			{
				name: "caretSlopeRise",
				type: "SHORT",
				value: 1
			},
			{
				name: "caretSlopeRun",
				type: "SHORT",
				value: 0
			},
			{
				name: "caretOffset",
				type: "SHORT",
				value: 0
			},
			{
				name: "reserved1",
				type: "SHORT",
				value: 0
			},
			{
				name: "reserved2",
				type: "SHORT",
				value: 0
			},
			{
				name: "reserved3",
				type: "SHORT",
				value: 0
			},
			{
				name: "reserved4",
				type: "SHORT",
				value: 0
			},
			{
				name: "metricDataFormat",
				type: "SHORT",
				value: 0
			},
			{
				name: "numberOfHMetrics",
				type: "USHORT",
				value: 0
			}], e)
		}
	}
},
function(e, t, n) {
	"use strict";
	function r(e) {
		return e && e.__esModule ? e: {
		default:
			e
		}
	}
	Object.defineProperty(t, "__esModule", {
		value: !0
	});
	var a = r(n(0)),
	i = r(n(2));
	t.
default = {
		parse: function(e, t, n, r, i) {
			for (var o = void 0,
			l = void 0,
			s = new a.
		default.Parser(e, t), u = 0; u < r; u += 1) {
				u < n && (o = s.parseUShort(), l = s.parseShort());
				var c = i.get(u);
				c.advanceWidth = o,
				c.leftSideBearing = l
			}
		},
		make: function(e) {
			for (var t = new i.
		default.Table("hmtx", []), n = 0; n < e.length; n += 1) {
				var r = e.get(n),
				a = r.advanceWidth || 0,
				o = r.leftSideBearing || 0;
				t.fields.push({
					name: "advanceWidth_" + n,
					type: "USHORT",
					value: a
				}),
				t.fields.push({
					name: "leftSideBearing_" + n,
					type: "SHORT",
					value: o
				})
			}
			return t
		}
	}
},
function(e, t, n) {
	"use strict";
	function r(e) {
		return e && e.__esModule ? e: {
		default:
			e
		}
	}
	Object.defineProperty(t, "__esModule", {
		value: !0
	});
	var a = r(n(1)),
	i = r(n(0)),
	o = r(n(2));
	t.
default = {
		make: function(e) {
			for (var t = new o.
		default.Table("ltag", [{
				name: "version",
				type: "ULONG",
				value: 1
			},
			{
				name: "flags",
				type: "ULONG",
				value: 0
			},
			{
				name: "numTags",
				type: "ULONG",
				value: e.length
			}]), n = "", r = 12 + 4 * e.length, a = 0; a < e.length; ++a) {
				var i = n.indexOf(e[a]);
				i < 0 && (i = n.length, n += e[a]),
				t.fields.push({
					name: "offset " + a,
					type: "USHORT",
					value: r + i
				}),
				t.fields.push({
					name: "length " + a,
					type: "USHORT",
					value: e[a].length
				})
			}
			return t.fields.push({
				name: "stringPool",
				type: "CHARARRAY",
				value: n
			}),
			t
		},
		parse: function(e, t) {
			var n = new i.
		default.Parser(e, t),
			r = n.parseULong();
			a.
		default.argument(1 === r, "Unsupported ltag table version."),
			n.skip("uLong", 1);
			for (var o = n.parseULong(), l = [], s = 0; s < o; s++) {
				for (var u = "",
				c = t + n.parseUShort(), f = n.parseUShort(), p = c; p < c + f; ++p) u += String.fromCharCode(e.getInt8(p));
				l.push(u)
			}
			return l
		}
	}
},
function(e, t, n) {
	"use strict";
	function r(e) {
		return e && e.__esModule ? e: {
		default:
			e
		}
	}
	Object.defineProperty(t, "__esModule", {
		value: !0
	});
	var a = r(n(0)),
	i = r(n(2));
	t.
default = {
		parse: function(e, t) {
			var n = {},
			r = new a.
		default.Parser(e, t);
			return n.version = r.parseVersion(),
			n.numGlyphs = r.parseUShort(),
			1 === n.version && (n.maxPoints = r.parseUShort(), n.maxContours = r.parseUShort(), n.maxCompositePoints = r.parseUShort(), n.maxCompositeContours = r.parseUShort(), n.maxZones = r.parseUShort(), n.maxTwilightPoints = r.parseUShort(), n.maxStorage = r.parseUShort(), n.maxFunctionDefs = r.parseUShort(), n.maxInstructionDefs = r.parseUShort(), n.maxStackElements = r.parseUShort(), n.maxSizeOfInstructions = r.parseUShort(), n.maxComponentElements = r.parseUShort(), n.maxComponentDepth = r.parseUShort()),
			n
		},
		make: function(e) {
			return new i.
		default.Table("maxp", [{
				name: "version",
				type: "FIXED",
				value: 20480
			},
			{
				name: "numGlyphs",
				type: "USHORT",
				value: e
			}])
		}
	}
},
function(e, t, n) {
	"use strict";
	function r(e) {
		return e && e.__esModule ? e: {
		default:
			e
		}
	}
	function a(e, t, n) {
		switch (e) {
		case 0:
			if (65535 === t) return "und";
			if (n) return n[t];
			break;
		case 1:
			return d[t];
		case 3:
			return m[t]
		}
	}
	function i(e, t, n) {
		switch (e) {
		case 0:
			return g;
		case 1:
			return y[n] || v[t];
		case 3:
			if (1 === t || 10 === t) return g
		}
	}
	function o(e) {
		var t = {};
		for (var n in e) t[e[n]] = parseInt(n);
		return t
	}
	function l(e, t, n, r, a, i) {
		return new f.
	default.Record("NameRecord", [{
			name: "platformID",
			type: "USHORT",
			value: e
		},
		{
			name: "encodingID",
			type: "USHORT",
			value: t
		},
		{
			name: "languageID",
			type: "USHORT",
			value: n
		},
		{
			name: "nameID",
			type: "USHORT",
			value: r
		},
		{
			name: "length",
			type: "USHORT",
			value: a
		},
		{
			name: "offset",
			type: "USHORT",
			value: i
		}])
	}
	function s(e, t) {
		var n = function(e, t) {
			var n = e.length,
			r = t.length - n + 1;
			e: for (var a = 0; a < r; a++) for (; a < r; a++) {
				for (var i = 0; i < n; i++) if (t[a + i] !== e[i]) continue e;
				return a
			}
			return - 1
		} (e, t);
		if (n < 0) {
			n = t.length;
			for (var r = 0,
			a = e.length; r < a; ++r) t.push(e[r])
		}
		return n
	}
	Object.defineProperty(t, "__esModule", {
		value: !0
	});
	var u = n(23),
	c = r(n(0)),
	f = r(n(2)),
	p = ["copyright", "fontFamily", "fontSubfamily", "uniqueID", "fullName", "version", "postScriptName", "trademark", "manufacturer", "designer", "description", "manufacturerURL", "designerURL", "license", "licenseURL", "reserved", "preferredFamily", "preferredSubfamily", "compatibleFullName", "sampleText", "postScriptFindFontName", "wwsFamily", "wwsSubfamily"],
	d = {
		0 : "en",
		1 : "fr",
		2 : "de",
		3 : "it",
		4 : "nl",
		5 : "sv",
		6 : "es",
		7 : "da",
		8 : "pt",
		9 : "no",
		10 : "he",
		11 : "ja",
		12 : "ar",
		13 : "fi",
		14 : "el",
		15 : "is",
		16 : "mt",
		17 : "tr",
		18 : "hr",
		19 : "zh-Hant",
		20 : "ur",
		21 : "hi",
		22 : "th",
		23 : "ko",
		24 : "lt",
		25 : "pl",
		26 : "hu",
		27 : "es",
		28 : "lv",
		29 : "se",
		30 : "fo",
		31 : "fa",
		32 : "ru",
		33 : "zh",
		34 : "nl-BE",
		35 : "ga",
		36 : "sq",
		37 : "ro",
		38 : "cz",
		39 : "sk",
		40 : "si",
		41 : "yi",
		42 : "sr",
		43 : "mk",
		44 : "bg",
		45 : "uk",
		46 : "be",
		47 : "uz",
		48 : "kk",
		49 : "az-Cyrl",
		50 : "az-Arab",
		51 : "hy",
		52 : "ka",
		53 : "mo",
		54 : "ky",
		55 : "tg",
		56 : "tk",
		57 : "mn-CN",
		58 : "mn",
		59 : "ps",
		60 : "ks",
		61 : "ku",
		62 : "sd",
		63 : "bo",
		64 : "ne",
		65 : "sa",
		66 : "mr",
		67 : "bn",
		68 : "as",
		69 : "gu",
		70 : "pa",
		71 : "or",
		72 : "ml",
		73 : "kn",
		74 : "ta",
		75 : "te",
		76 : "si",
		77 : "my",
		78 : "km",
		79 : "lo",
		80 : "vi",
		81 : "id",
		82 : "tl",
		83 : "ms",
		84 : "ms-Arab",
		85 : "am",
		86 : "ti",
		87 : "om",
		88 : "so",
		89 : "sw",
		90 : "rw",
		91 : "rn",
		92 : "ny",
		93 : "mg",
		94 : "eo",
		128 : "cy",
		129 : "eu",
		130 : "ca",
		131 : "la",
		132 : "qu",
		133 : "gn",
		134 : "ay",
		135 : "tt",
		136 : "ug",
		137 : "dz",
		138 : "jv",
		139 : "su",
		140 : "gl",
		141 : "af",
		142 : "br",
		143 : "iu",
		144 : "gd",
		145 : "gv",
		146 : "ga",
		147 : "to",
		148 : "el-polyton",
		149 : "kl",
		150 : "az",
		151 : "nn"
	},
	h = {
		0 : 0,
		1 : 0,
		2 : 0,
		3 : 0,
		4 : 0,
		5 : 0,
		6 : 0,
		7 : 0,
		8 : 0,
		9 : 0,
		10 : 5,
		11 : 1,
		12 : 4,
		13 : 0,
		14 : 6,
		15 : 0,
		16 : 0,
		17 : 0,
		18 : 0,
		19 : 2,
		20 : 4,
		21 : 9,
		22 : 21,
		23 : 3,
		24 : 29,
		25 : 29,
		26 : 29,
		27 : 29,
		28 : 29,
		29 : 0,
		30 : 0,
		31 : 4,
		32 : 7,
		33 : 25,
		34 : 0,
		35 : 0,
		36 : 0,
		37 : 0,
		38 : 29,
		39 : 29,
		40 : 0,
		41 : 5,
		42 : 7,
		43 : 7,
		44 : 7,
		45 : 7,
		46 : 7,
		47 : 7,
		48 : 7,
		49 : 7,
		50 : 4,
		51 : 24,
		52 : 23,
		53 : 7,
		54 : 7,
		55 : 7,
		56 : 7,
		57 : 27,
		58 : 7,
		59 : 4,
		60 : 4,
		61 : 4,
		62 : 4,
		63 : 26,
		64 : 9,
		65 : 9,
		66 : 9,
		67 : 13,
		68 : 13,
		69 : 11,
		70 : 10,
		71 : 12,
		72 : 17,
		73 : 16,
		74 : 14,
		75 : 15,
		76 : 18,
		77 : 19,
		78 : 20,
		79 : 22,
		80 : 30,
		81 : 0,
		82 : 0,
		83 : 0,
		84 : 4,
		85 : 28,
		86 : 28,
		87 : 28,
		88 : 0,
		89 : 0,
		90 : 0,
		91 : 0,
		92 : 0,
		93 : 0,
		94 : 0,
		128 : 0,
		129 : 0,
		130 : 0,
		131 : 0,
		132 : 0,
		133 : 0,
		134 : 0,
		135 : 7,
		136 : 4,
		137 : 26,
		138 : 0,
		139 : 0,
		140 : 0,
		141 : 0,
		142 : 0,
		143 : 28,
		144 : 0,
		145 : 0,
		146 : 0,
		147 : 0,
		148 : 6,
		149 : 0,
		150 : 0,
		151 : 0
	},
	m = {
		1078 : "af",
		1052 : "sq",
		1156 : "gsw",
		1118 : "am",
		5121 : "ar-DZ",
		15361 : "ar-BH",
		3073 : "ar",
		2049 : "ar-IQ",
		11265 : "ar-JO",
		13313 : "ar-KW",
		12289 : "ar-LB",
		4097 : "ar-LY",
		6145 : "ary",
		8193 : "ar-OM",
		16385 : "ar-QA",
		1025 : "ar-SA",
		10241 : "ar-SY",
		7169 : "aeb",
		14337 : "ar-AE",
		9217 : "ar-YE",
		1067 : "hy",
		1101 : "as",
		2092 : "az-Cyrl",
		1068 : "az",
		1133 : "ba",
		1069 : "eu",
		1059 : "be",
		2117 : "bn",
		1093 : "bn-IN",
		8218 : "bs-Cyrl",
		5146 : "bs",
		1150 : "br",
		1026 : "bg",
		1027 : "ca",
		3076 : "zh-HK",
		5124 : "zh-MO",
		2052 : "zh",
		4100 : "zh-SG",
		1028 : "zh-TW",
		1155 : "co",
		1050 : "hr",
		4122 : "hr-BA",
		1029 : "cs",
		1030 : "da",
		1164 : "prs",
		1125 : "dv",
		2067 : "nl-BE",
		1043 : "nl",
		3081 : "en-AU",
		10249 : "en-BZ",
		4105 : "en-CA",
		9225 : "en-029",
		16393 : "en-IN",
		6153 : "en-IE",
		8201 : "en-JM",
		17417 : "en-MY",
		5129 : "en-NZ",
		13321 : "en-PH",
		18441 : "en-SG",
		7177 : "en-ZA",
		11273 : "en-TT",
		2057 : "en-GB",
		1033 : "en",
		12297 : "en-ZW",
		1061 : "et",
		1080 : "fo",
		1124 : "fil",
		1035 : "fi",
		2060 : "fr-BE",
		3084 : "fr-CA",
		1036 : "fr",
		5132 : "fr-LU",
		6156 : "fr-MC",
		4108 : "fr-CH",
		1122 : "fy",
		1110 : "gl",
		1079 : "ka",
		3079 : "de-AT",
		1031 : "de",
		5127 : "de-LI",
		4103 : "de-LU",
		2055 : "de-CH",
		1032 : "el",
		1135 : "kl",
		1095 : "gu",
		1128 : "ha",
		1037 : "he",
		1081 : "hi",
		1038 : "hu",
		1039 : "is",
		1136 : "ig",
		1057 : "id",
		1117 : "iu",
		2141 : "iu-Latn",
		2108 : "ga",
		1076 : "xh",
		1077 : "zu",
		1040 : "it",
		2064 : "it-CH",
		1041 : "ja",
		1099 : "kn",
		1087 : "kk",
		1107 : "km",
		1158 : "quc",
		1159 : "rw",
		1089 : "sw",
		1111 : "kok",
		1042 : "ko",
		1088 : "ky",
		1108 : "lo",
		1062 : "lv",
		1063 : "lt",
		2094 : "dsb",
		1134 : "lb",
		1071 : "mk",
		2110 : "ms-BN",
		1086 : "ms",
		1100 : "ml",
		1082 : "mt",
		1153 : "mi",
		1146 : "arn",
		1102 : "mr",
		1148 : "moh",
		1104 : "mn",
		2128 : "mn-CN",
		1121 : "ne",
		1044 : "nb",
		2068 : "nn",
		1154 : "oc",
		1096 : "or",
		1123 : "ps",
		1045 : "pl",
		1046 : "pt",
		2070 : "pt-PT",
		1094 : "pa",
		1131 : "qu-BO",
		2155 : "qu-EC",
		3179 : "qu",
		1048 : "ro",
		1047 : "rm",
		1049 : "ru",
		9275 : "smn",
		4155 : "smj-NO",
		5179 : "smj",
		3131 : "se-FI",
		1083 : "se",
		2107 : "se-SE",
		8251 : "sms",
		6203 : "sma-NO",
		7227 : "sms",
		1103 : "sa",
		7194 : "sr-Cyrl-BA",
		3098 : "sr",
		6170 : "sr-Latn-BA",
		2074 : "sr-Latn",
		1132 : "nso",
		1074 : "tn",
		1115 : "si",
		1051 : "sk",
		1060 : "sl",
		11274 : "es-AR",
		16394 : "es-BO",
		13322 : "es-CL",
		9226 : "es-CO",
		5130 : "es-CR",
		7178 : "es-DO",
		12298 : "es-EC",
		17418 : "es-SV",
		4106 : "es-GT",
		18442 : "es-HN",
		2058 : "es-MX",
		19466 : "es-NI",
		6154 : "es-PA",
		15370 : "es-PY",
		10250 : "es-PE",
		20490 : "es-PR",
		3082 : "es",
		1034 : "es",
		21514 : "es-US",
		14346 : "es-UY",
		8202 : "es-VE",
		2077 : "sv-FI",
		1053 : "sv",
		1114 : "syr",
		1064 : "tg",
		2143 : "tzm",
		1097 : "ta",
		1092 : "tt",
		1098 : "te",
		1054 : "th",
		1105 : "bo",
		1055 : "tr",
		1090 : "tk",
		1152 : "ug",
		1058 : "uk",
		1070 : "hsb",
		1056 : "ur",
		2115 : "uz-Cyrl",
		1091 : "uz",
		1066 : "vi",
		1106 : "cy",
		1160 : "wo",
		1157 : "sah",
		1144 : "ii",
		1130 : "yo"
	},
	g = "utf-16",
	v = {
		0 : "macintosh",
		1 : "x-mac-japanese",
		2 : "x-mac-chinesetrad",
		3 : "x-mac-korean",
		6 : "x-mac-greek",
		7 : "x-mac-cyrillic",
		9 : "x-mac-devanagai",
		10 : "x-mac-gurmukhi",
		11 : "x-mac-gujarati",
		12 : "x-mac-oriya",
		13 : "x-mac-bengali",
		14 : "x-mac-tamil",
		15 : "x-mac-telugu",
		16 : "x-mac-kannada",
		17 : "x-mac-malayalam",
		18 : "x-mac-sinhalese",
		19 : "x-mac-burmese",
		20 : "x-mac-khmer",
		21 : "x-mac-thai",
		22 : "x-mac-lao",
		23 : "x-mac-georgian",
		24 : "x-mac-armenian",
		25 : "x-mac-chinesesimp",
		26 : "x-mac-tibetan",
		27 : "x-mac-mongolian",
		28 : "x-mac-ethiopic",
		29 : "x-mac-ce",
		30 : "x-mac-vietnamese",
		31 : "x-mac-extarabic"
	},
	y = {
		15 : "x-mac-icelandic",
		17 : "x-mac-turkish",
		18 : "x-mac-croatian",
		24 : "x-mac-ce",
		25 : "x-mac-ce",
		26 : "x-mac-ce",
		27 : "x-mac-ce",
		28 : "x-mac-ce",
		30 : "x-mac-icelandic",
		37 : "x-mac-romanian",
		38 : "x-mac-ce",
		39 : "x-mac-ce",
		40 : "x-mac-ce",
		143 : "x-mac-inuit",
		146 : "x-mac-gaelic"
	};
	t.
default = {
		parse: function(e, t, n) {
			for (var r = {},
			o = new c.
		default.Parser(e, t), l = o.parseUShort(), s = o.parseUShort(), f = o.offset + o.parseUShort(), d = 0; d < s; d++) {
				var h = o.parseUShort(),
				m = o.parseUShort(),
				v = o.parseUShort(),
				y = o.parseUShort(),
				b = p[y] || y,
				x = o.parseUShort(),
				S = o.parseUShort(),
				w = a(h, v, n),
				L = i(h, m, v);
				if (void 0 !== L && void 0 !== w) {
					var k = void 0;
					if (k = L === g ? u.decode.UTF16(e, f + S, x) : u.decode.MACSTRING(e, f + S, x, L)) {
						var D = r[b];
						void 0 === D && (D = r[b] = {}),
						D[w] = k
					}
				}
			}
			return 1 === l && o.parseUShort(),
			r
		},
		make: function(e, t) {
			var n = void 0,
			r = [],
			a = {},
			c = o(p);
			for (var g in e) {
				var v = c[g];
				if (void 0 === v && (v = g), n = parseInt(v), isNaN(n)) throw new Error('Name table entry "' + g + '" does not exist, see nameTableNames for complete list.');
				a[n] = e[g],
				r.push(n)
			}
			for (var y = o(d), b = o(m), x = [], S = [], w = 0; w < r.length; w++) {
				var L = a[n = r[w]];
				for (var k in L) {
					var D = L[k],
					E = 1,
					C = y[k],
					A = h[C],
					T = i(E, A, C),
					U = u.encode.MACSTRING(D, T);
					void 0 === U && (E = 0, (C = t.indexOf(k)) < 0 && (C = t.length, t.push(k)), A = 4, U = u.encode.UTF16(D));
					var O = s(U, S);
					x.push(l(E, A, C, n, U.length, O));
					var B = b[k];
					if (void 0 !== B) {
						var R = u.encode.UTF16(D),
						F = s(R, S);
						x.push(l(3, 1, B, n, R.length, F))
					}
				}
			}
			x.sort(function(e, t) {
				return e.platformID - t.platformID || e.encodingID - t.encodingID || e.languageID - t.languageID || e.nameID - t.nameID
			});
			for (var N = new f.
		default.Table("name", [{
				name: "format",
				type: "USHORT",
				value: 0
			},
			{
				name: "count",
				type: "USHORT",
				value: x.length
			},
			{
				name: "stringOffset",
				type: "USHORT",
				value: 6 + 12 * x.length
			}]), M = 0; M < x.length; M++) N.fields.push({
				name: "record_" + M,
				type: "RECORD",
				value: x[M]
			});
			return N.fields.push({
				name: "strings",
				type: "LITERAL",
				value: S
			}),
			N
		}
	}
},
function(e, t, n) {
	"use strict";
	function r(e) {
		return e && e.__esModule ? e: {
		default:
			e
		}
	}
	Object.defineProperty(t, "__esModule", {
		value: !0
	});
	var a = r(n(0)),
	i = r(n(2)),
	o = [{
		begin: 0,
		end: 127
	},
	{
		begin: 128,
		end: 255
	},
	{
		begin: 256,
		end: 383
	},
	{
		begin: 384,
		end: 591
	},
	{
		begin: 592,
		end: 687
	},
	{
		begin: 688,
		end: 767
	},
	{
		begin: 768,
		end: 879
	},
	{
		begin: 880,
		end: 1023
	},
	{
		begin: 11392,
		end: 11519
	},
	{
		begin: 1024,
		end: 1279
	},
	{
		begin: 1328,
		end: 1423
	},
	{
		begin: 1424,
		end: 1535
	},
	{
		begin: 42240,
		end: 42559
	},
	{
		begin: 1536,
		end: 1791
	},
	{
		begin: 1984,
		end: 2047
	},
	{
		begin: 2304,
		end: 2431
	},
	{
		begin: 2432,
		end: 2559
	},
	{
		begin: 2560,
		end: 2687
	},
	{
		begin: 2688,
		end: 2815
	},
	{
		begin: 2816,
		end: 2943
	},
	{
		begin: 2944,
		end: 3071
	},
	{
		begin: 3072,
		end: 3199
	},
	{
		begin: 3200,
		end: 3327
	},
	{
		begin: 3328,
		end: 3455
	},
	{
		begin: 3584,
		end: 3711
	},
	{
		begin: 3712,
		end: 3839
	},
	{
		begin: 4256,
		end: 4351
	},
	{
		begin: 6912,
		end: 7039
	},
	{
		begin: 4352,
		end: 4607
	},
	{
		begin: 7680,
		end: 7935
	},
	{
		begin: 7936,
		end: 8191
	},
	{
		begin: 8192,
		end: 8303
	},
	{
		begin: 8304,
		end: 8351
	},
	{
		begin: 8352,
		end: 8399
	},
	{
		begin: 8400,
		end: 8447
	},
	{
		begin: 8448,
		end: 8527
	},
	{
		begin: 8528,
		end: 8591
	},
	{
		begin: 8592,
		end: 8703
	},
	{
		begin: 8704,
		end: 8959
	},
	{
		begin: 8960,
		end: 9215
	},
	{
		begin: 9216,
		end: 9279
	},
	{
		begin: 9280,
		end: 9311
	},
	{
		begin: 9312,
		end: 9471
	},
	{
		begin: 9472,
		end: 9599
	},
	{
		begin: 9600,
		end: 9631
	},
	{
		begin: 9632,
		end: 9727
	},
	{
		begin: 9728,
		end: 9983
	},
	{
		begin: 9984,
		end: 10175
	},
	{
		begin: 12288,
		end: 12351
	},
	{
		begin: 12352,
		end: 12447
	},
	{
		begin: 12448,
		end: 12543
	},
	{
		begin: 12544,
		end: 12591
	},
	{
		begin: 12592,
		end: 12687
	},
	{
		begin: 43072,
		end: 43135
	},
	{
		begin: 12800,
		end: 13055
	},
	{
		begin: 13056,
		end: 13311
	},
	{
		begin: 44032,
		end: 55215
	},
	{
		begin: 55296,
		end: 57343
	},
	{
		begin: 67840,
		end: 67871
	},
	{
		begin: 19968,
		end: 40959
	},
	{
		begin: 57344,
		end: 63743
	},
	{
		begin: 12736,
		end: 12783
	},
	{
		begin: 64256,
		end: 64335
	},
	{
		begin: 64336,
		end: 65023
	},
	{
		begin: 65056,
		end: 65071
	},
	{
		begin: 65040,
		end: 65055
	},
	{
		begin: 65104,
		end: 65135
	},
	{
		begin: 65136,
		end: 65279
	},
	{
		begin: 65280,
		end: 65519
	},
	{
		begin: 65520,
		end: 65535
	},
	{
		begin: 3840,
		end: 4095
	},
	{
		begin: 1792,
		end: 1871
	},
	{
		begin: 1920,
		end: 1983
	},
	{
		begin: 3456,
		end: 3583
	},
	{
		begin: 4096,
		end: 4255
	},
	{
		begin: 4608,
		end: 4991
	},
	{
		begin: 5024,
		end: 5119
	},
	{
		begin: 5120,
		end: 5759
	},
	{
		begin: 5760,
		end: 5791
	},
	{
		begin: 5792,
		end: 5887
	},
	{
		begin: 6016,
		end: 6143
	},
	{
		begin: 6144,
		end: 6319
	},
	{
		begin: 10240,
		end: 10495
	},
	{
		begin: 40960,
		end: 42127
	},
	{
		begin: 5888,
		end: 5919
	},
	{
		begin: 66304,
		end: 66351
	},
	{
		begin: 66352,
		end: 66383
	},
	{
		begin: 66560,
		end: 66639
	},
	{
		begin: 118784,
		end: 119039
	},
	{
		begin: 119808,
		end: 120831
	},
	{
		begin: 1044480,
		end: 1048573
	},
	{
		begin: 65024,
		end: 65039
	},
	{
		begin: 917504,
		end: 917631
	},
	{
		begin: 6400,
		end: 6479
	},
	{
		begin: 6480,
		end: 6527
	},
	{
		begin: 6528,
		end: 6623
	},
	{
		begin: 6656,
		end: 6687
	},
	{
		begin: 11264,
		end: 11359
	},
	{
		begin: 11568,
		end: 11647
	},
	{
		begin: 19904,
		end: 19967
	},
	{
		begin: 43008,
		end: 43055
	},
	{
		begin: 65536,
		end: 65663
	},
	{
		begin: 65856,
		end: 65935
	},
	{
		begin: 66432,
		end: 66463
	},
	{
		begin: 66464,
		end: 66527
	},
	{
		begin: 66640,
		end: 66687
	},
	{
		begin: 66688,
		end: 66735
	},
	{
		begin: 67584,
		end: 67647
	},
	{
		begin: 68096,
		end: 68191
	},
	{
		begin: 119552,
		end: 119647
	},
	{
		begin: 73728,
		end: 74751
	},
	{
		begin: 119648,
		end: 119679
	},
	{
		begin: 7040,
		end: 7103
	},
	{
		begin: 7168,
		end: 7247
	},
	{
		begin: 7248,
		end: 7295
	},
	{
		begin: 43136,
		end: 43231
	},
	{
		begin: 43264,
		end: 43311
	},
	{
		begin: 43312,
		end: 43359
	},
	{
		begin: 43520,
		end: 43615
	},
	{
		begin: 65936,
		end: 65999
	},
	{
		begin: 66e3,
		end: 66047
	},
	{
		begin: 66208,
		end: 66271
	},
	{
		begin: 127024,
		end: 127135
	}];
	t.
default = {
		parse: function(e, t) {
			var n = {},
			r = new a.
		default.Parser(e, t);
			n.version = r.parseUShort(),
			n.xAvgCharWidth = r.parseShort(),
			n.usWeightClass = r.parseUShort(),
			n.usWidthClass = r.parseUShort(),
			n.fsType = r.parseUShort(),
			n.ySubscriptXSize = r.parseShort(),
			n.ySubscriptYSize = r.parseShort(),
			n.ySubscriptXOffset = r.parseShort(),
			n.ySubscriptYOffset = r.parseShort(),
			n.ySuperscriptXSize = r.parseShort(),
			n.ySuperscriptYSize = r.parseShort(),
			n.ySuperscriptXOffset = r.parseShort(),
			n.ySuperscriptYOffset = r.parseShort(),
			n.yStrikeoutSize = r.parseShort(),
			n.yStrikeoutPosition = r.parseShort(),
			n.sFamilyClass = r.parseShort(),
			n.panose = [];
			for (var i = 0; i < 10; i++) n.panose[i] = r.parseByte();
			return n.ulUnicodeRange1 = r.parseULong(),
			n.ulUnicodeRange2 = r.parseULong(),
			n.ulUnicodeRange3 = r.parseULong(),
			n.ulUnicodeRange4 = r.parseULong(),
			n.achVendID = String.fromCharCode(r.parseByte(), r.parseByte(), r.parseByte(), r.parseByte()),
			n.fsSelection = r.parseUShort(),
			n.usFirstCharIndex = r.parseUShort(),
			n.usLastCharIndex = r.parseUShort(),
			n.sTypoAscender = r.parseShort(),
			n.sTypoDescender = r.parseShort(),
			n.sTypoLineGap = r.parseShort(),
			n.usWinAscent = r.parseUShort(),
			n.usWinDescent = r.parseUShort(),
			n.version >= 1 && (n.ulCodePageRange1 = r.parseULong(), n.ulCodePageRange2 = r.parseULong()),
			n.version >= 2 && (n.sxHeight = r.parseShort(), n.sCapHeight = r.parseShort(), n.usDefaultChar = r.parseUShort(), n.usBreakChar = r.parseUShort(), n.usMaxContent = r.parseUShort()),
			n
		},
		make: function(e) {
			return new i.
		default.Table("OS/2", [{
				name: "version",
				type: "USHORT",
				value: 3
			},
			{
				name: "xAvgCharWidth",
				type: "SHORT",
				value: 0
			},
			{
				name: "usWeightClass",
				type: "USHORT",
				value: 0
			},
			{
				name: "usWidthClass",
				type: "USHORT",
				value: 0
			},
			{
				name: "fsType",
				type: "USHORT",
				value: 0
			},
			{
				name: "ySubscriptXSize",
				type: "SHORT",
				value: 650
			},
			{
				name: "ySubscriptYSize",
				type: "SHORT",
				value: 699
			},
			{
				name: "ySubscriptXOffset",
				type: "SHORT",
				value: 0
			},
			{
				name: "ySubscriptYOffset",
				type: "SHORT",
				value: 140
			},
			{
				name: "ySuperscriptXSize",
				type: "SHORT",
				value: 650
			},
			{
				name: "ySuperscriptYSize",
				type: "SHORT",
				value: 699
			},
			{
				name: "ySuperscriptXOffset",
				type: "SHORT",
				value: 0
			},
			{
				name: "ySuperscriptYOffset",
				type: "SHORT",
				value: 479
			},
			{
				name: "yStrikeoutSize",
				type: "SHORT",
				value: 49
			},
			{
				name: "yStrikeoutPosition",
				type: "SHORT",
				value: 258
			},
			{
				name: "sFamilyClass",
				type: "SHORT",
				value: 0
			},
			{
				name: "bFamilyType",
				type: "BYTE",
				value: 0
			},
			{
				name: "bSerifStyle",
				type: "BYTE",
				value: 0
			},
			{
				name: "bWeight",
				type: "BYTE",
				value: 0
			},
			{
				name: "bProportion",
				type: "BYTE",
				value: 0
			},
			{
				name: "bContrast",
				type: "BYTE",
				value: 0
			},
			{
				name: "bStrokeVariation",
				type: "BYTE",
				value: 0
			},
			{
				name: "bArmStyle",
				type: "BYTE",
				value: 0
			},
			{
				name: "bLetterform",
				type: "BYTE",
				value: 0
			},
			{
				name: "bMidline",
				type: "BYTE",
				value: 0
			},
			{
				name: "bXHeight",
				type: "BYTE",
				value: 0
			},
			{
				name: "ulUnicodeRange1",
				type: "ULONG",
				value: 0
			},
			{
				name: "ulUnicodeRange2",
				type: "ULONG",
				value: 0
			},
			{
				name: "ulUnicodeRange3",
				type: "ULONG",
				value: 0
			},
			{
				name: "ulUnicodeRange4",
				type: "ULONG",
				value: 0
			},
			{
				name: "achVendID",
				type: "CHARARRAY",
				value: "XXXX"
			},
			{
				name: "fsSelection",
				type: "USHORT",
				value: 0
			},
			{
				name: "usFirstCharIndex",
				type: "USHORT",
				value: 0
			},
			{
				name: "usLastCharIndex",
				type: "USHORT",
				value: 0
			},
			{
				name: "sTypoAscender",
				type: "SHORT",
				value: 0
			},
			{
				name: "sTypoDescender",
				type: "SHORT",
				value: 0
			},
			{
				name: "sTypoLineGap",
				type: "SHORT",
				value: 0
			},
			{
				name: "usWinAscent",
				type: "USHORT",
				value: 0
			},
			{
				name: "usWinDescent",
				type: "USHORT",
				value: 0
			},
			{
				name: "ulCodePageRange1",
				type: "ULONG",
				value: 0
			},
			{
				name: "ulCodePageRange2",
				type: "ULONG",
				value: 0
			},
			{
				name: "sxHeight",
				type: "SHORT",
				value: 0
			},
			{
				name: "sCapHeight",
				type: "SHORT",
				value: 0
			},
			{
				name: "usDefaultChar",
				type: "USHORT",
				value: 0
			},
			{
				name: "usBreakChar",
				type: "USHORT",
				value: 0
			},
			{
				name: "usMaxContext",
				type: "USHORT",
				value: 0
			}], e)
		},
		unicodeRanges: o,
		getUnicodeRange: function(e) {
			for (var t = 0; t < o.length; t += 1) {
				var n = o[t];
				if (e >= n.begin && e < n.end) return t
			}
			return - 1
		}
	}
},
function(e, t, n) {
	"use strict";
	function r(e) {
		return e && e.__esModule ? e: {
		default:
			e
		}
	}
	Object.defineProperty(t, "__esModule", {
		value: !0
	});
	var a = n(24),
	i = r(n(0)),
	o = r(n(2));
	t.
default = {
		parse: function(e, t) {
			var n = {},
			r = new i.
		default.Parser(e, t);
			switch (n.version = r.parseVersion(), n.italicAngle = r.parseFixed(), n.underlinePosition = r.parseShort(), n.underlineThickness = r.parseShort(), n.isFixedPitch = r.parseULong(), n.minMemType42 = r.parseULong(), n.maxMemType42 = r.parseULong(), n.minMemType1 = r.parseULong(), n.maxMemType1 = r.parseULong(), n.version) {
			case 1:
				n.names = a.standardNames.slice();
				break;
			case 2:
				n.numberOfGlyphs = r.parseUShort(),
				n.glyphNameIndex = new Array(n.numberOfGlyphs);
				for (var o = 0; o < n.numberOfGlyphs; o++) n.glyphNameIndex[o] = r.parseUShort();
				n.names = [];
				for (var l = 0; l < n.numberOfGlyphs; l++) if (n.glyphNameIndex[l] >= a.standardNames.length) {
					var s = r.parseChar();
					n.names.push(r.parseString(s))
				}
				break;
			case 2.5:
				n.numberOfGlyphs = r.parseUShort(),
				n.offset = new Array(n.numberOfGlyphs);
				for (var u = 0; u < n.numberOfGlyphs; u++) n.offset[u] = r.parseChar()
			}
			return n
		},
		make: function() {
			return new o.
		default.Table("post", [{
				name: "version",
				type: "FIXED",
				value: 196608
			},
			{
				name: "italicAngle",
				type: "FIXED",
				value: 0
			},
			{
				name: "underlinePosition",
				type: "FWORD",
				value: 0
			},
			{
				name: "underlineThickness",
				type: "FWORD",
				value: 0
			},
			{
				name: "isFixedPitch",
				type: "ULONG",
				value: 0
			},
			{
				name: "minMemType42",
				type: "ULONG",
				value: 0
			},
			{
				name: "maxMemType42",
				type: "ULONG",
				value: 0
			},
			{
				name: "minMemType1",
				type: "ULONG",
				value: 0
			},
			{
				name: "maxMemType1",
				type: "ULONG",
				value: 0
			}])
		}
	}
},
function(e, t, n) {
	"use strict";
	function r(e) {
		return e && e.__esModule ? e: {
		default:
			e
		}
	}
	Object.defineProperty(t, "__esModule", {
		value: !0
	});
	var a = r(n(1)),
	i = n(0),
	o = r(n(2)),
	l = new Array(9);
	l[1] = function() {
		var e = this.offset + this.relativeOffset,
		t = this.parseUShort();
		return 1 === t ? {
			substFormat: 1,
			coverage: this.parsePointer(i.Parser.coverage),
			deltaGlyphId: this.parseUShort()
		}: 2 === t ? {
			substFormat: 2,
			coverage: this.parsePointer(i.Parser.coverage),
			substitute: this.parseOffset16List()
		}: void a.
	default.assert(!1, "0x" + e.toString(16) + ": lookup type 1 format must be 1 or 2.")
	},
	l[2] = function() {
		var e = this.parseUShort();
		return a.
	default.argument(1 === e, "GSUB Multiple Substitution Subtable identifier-format must be 1"),
		{
			substFormat: e,
			coverage: this.parsePointer(i.Parser.coverage),
			sequences: this.parseListOfLists()
		}
	},
	l[3] = function() {
		var e = this.parseUShort();
		return a.
	default.argument(1 === e, "GSUB Alternate Substitution Subtable identifier-format must be 1"),
		{
			substFormat: e,
			coverage: this.parsePointer(i.Parser.coverage),
			alternateSets: this.parseListOfLists()
		}
	},
	l[4] = function() {
		var e = this.parseUShort();
		return a.
	default.argument(1 === e, "GSUB ligature table identifier-format must be 1"),
		{
			substFormat: e,
			coverage: this.parsePointer(i.Parser.coverage),
			ligatureSets: this.parseListOfLists(function() {
				return {
					ligGlyph: this.parseUShort(),
					components: this.parseUShortList(this.parseUShort() - 1)
				}
			})
		}
	};
	var s = {
		sequenceIndex: i.Parser.uShort,
		lookupListIndex: i.Parser.uShort
	};
	l[5] = function() {
		var e = this.offset + this.relativeOffset,
		t = this.parseUShort();
		if (1 === t) return {
			substFormat: t,
			coverage: this.parsePointer(i.Parser.coverage),
			ruleSets: this.parseListOfLists(function() {
				var e = this.parseUShort(),
				t = this.parseUShort();
				return {
					input: this.parseUShortList(e - 1),
					lookupRecords: this.parseRecordList(t, s)
				}
			})
		};
		if (2 === t) return {
			substFormat: t,
			coverage: this.parsePointer(i.Parser.coverage),
			classDef: this.parsePointer(i.Parser.classDef),
			classSets: this.parseListOfLists(function() {
				var e = this.parseUShort(),
				t = this.parseUShort();
				return {
					classes: this.parseUShortList(e - 1),
					lookupRecords: this.parseRecordList(t, s)
				}
			})
		};
		if (3 === t) {
			var n = this.parseUShort(),
			r = this.parseUShort();
			return {
				substFormat: t,
				coverages: this.parseList(n, i.Parser.pointer(i.Parser.coverage)),
				lookupRecords: this.parseRecordList(r, s)
			}
		}
		a.
	default.assert(!1, "0x" + e.toString(16) + ": lookup type 5 format must be 1, 2 or 3.")
	},
	l[6] = function() {
		var e = this.offset + this.relativeOffset,
		t = this.parseUShort();
		return 1 === t ? {
			substFormat: 1,
			coverage: this.parsePointer(i.Parser.coverage),
			chainRuleSets: this.parseListOfLists(function() {
				return {
					backtrack: this.parseUShortList(),
					input: this.parseUShortList(this.parseShort() - 1),
					lookahead: this.parseUShortList(),
					lookupRecords: this.parseRecordList(s)
				}
			})
		}: 2 === t ? {
			substFormat: 2,
			coverage: this.parsePointer(i.Parser.coverage),
			backtrackClassDef: this.parsePointer(i.Parser.classDef),
			inputClassDef: this.parsePointer(i.Parser.classDef),
			lookaheadClassDef: this.parsePointer(i.Parser.classDef),
			chainClassSet: this.parseListOfLists(function() {
				return {
					backtrack: this.parseUShortList(),
					input: this.parseUShortList(this.parseShort() - 1),
					lookahead: this.parseUShortList(),
					lookupRecords: this.parseRecordList(s)
				}
			})
		}: 3 === t ? {
			substFormat: 3,
			backtrackCoverage: this.parseList(i.Parser.pointer(i.Parser.coverage)),
			inputCoverage: this.parseList(i.Parser.pointer(i.Parser.coverage)),
			lookaheadCoverage: this.parseList(i.Parser.pointer(i.Parser.coverage)),
			lookupRecords: this.parseRecordList(s)
		}: void a.
	default.assert(!1, "0x" + e.toString(16) + ": lookup type 6 format must be 1, 2 or 3.")
	},
	l[7] = function() {
		var e = this.parseUShort();
		a.
	default.argument(1 === e, "GSUB Extension Substitution subtable identifier-format must be 1");
		var t = this.parseUShort(),
		n = new i.Parser(this.data, this.offset + this.parseULong());
		return {
			substFormat: 1,
			lookupType: t,
			extension: l[t].call(n)
		}
	},
	l[8] = function() {
		var e = this.parseUShort();
		return a.
	default.argument(1 === e, "GSUB Reverse Chaining Contextual Single Substitution Subtable identifier-format must be 1"),
		{
			substFormat: e,
			coverage: this.parsePointer(i.Parser.coverage),
			backtrackCoverage: this.parseList(i.Parser.pointer(i.Parser.coverage)),
			lookaheadCoverage: this.parseList(i.Parser.pointer(i.Parser.coverage)),
			substitutes: this.parseUShortList()
		}
	};
	var u = new Array(9);
	u[1] = function(e) {
		return 1 === e.substFormat ? new o.
	default.Table("substitutionTable", [{
			name: "substFormat",
			type: "USHORT",
			value: 1
		},
		{
			name: "coverage",
			type: "TABLE",
			value: new o.
		default.Coverage(e.coverage)
		},
		{
			name: "deltaGlyphID",
			type: "USHORT",
			value: e.deltaGlyphId
		}]) : new o.
	default.Table("substitutionTable", [{
			name: "substFormat",
			type: "USHORT",
			value: 2
		},
		{
			name: "coverage",
			type: "TABLE",
			value: new o.
		default.Coverage(e.coverage)
		}].concat(o.
	default.ushortList("substitute", e.substitute)))
	},
	u[3] = function(e) {
		return a.
	default.assert(1 === e.substFormat, "Lookup type 3 substFormat must be 1."),
		new o.
	default.Table("substitutionTable", [{
			name: "substFormat",
			type: "USHORT",
			value: 1
		},
		{
			name: "coverage",
			type: "TABLE",
			value: new o.
		default.Coverage(e.coverage)
		}].concat(o.
	default.tableList("altSet", e.alternateSets,
		function(e) {
			return new o.
		default.Table("alternateSetTable", o.
		default.ushortList("alternate", e))
		})))
	},
	u[4] = function(e) {
		return a.
	default.assert(1 === e.substFormat, "Lookup type 4 substFormat must be 1."),
		new o.
	default.Table("substitutionTable", [{
			name: "substFormat",
			type: "USHORT",
			value: 1
		},
		{
			name: "coverage",
			type: "TABLE",
			value: new o.
		default.Coverage(e.coverage)
		}].concat(o.
	default.tableList("ligSet", e.ligatureSets,
		function(e) {
			return new o.
		default.Table("ligatureSetTable", o.
		default.tableList("ligature", e,
			function(e) {
				return new o.
			default.Table("ligatureTable", [{
					name: "ligGlyph",
					type: "USHORT",
					value: e.ligGlyph
				}].concat(o.
			default.ushortList("component", e.components, e.components.length + 1)))
			}))
		})))
	},
	t.
default = {
		parse: function(e, t) {
			t = t || 0;
			var n = new i.Parser(e, t),
			r = n.parseVersion();
			return a.
		default.argument(1 === r, "Unsupported GSUB table version."),
			{
				version: r,
				scripts: n.parseScriptList(),
				features: n.parseFeatureList(),
				lookups: n.parseLookupList(l)
			}
		},
		make: function(e) {
			return new o.
		default.Table("GSUB", [{
				name: "version",
				type: "ULONG",
				value: 65536
			},
			{
				name: "scripts",
				type: "TABLE",
				value: new o.
			default.ScriptList(e.scripts)
			},
			{
				name: "features",
				type: "TABLE",
				value: new o.
			default.FeatureList(e.features)
			},
			{
				name: "lookups",
				type: "TABLE",
				value: new o.
			default.LookupList(e.lookups, u)
			}])
		}
	}
},
function(e, t, n) {
	"use strict";
	function r(e) {
		return e && e.__esModule ? e: {
		default:
			e
		}
	}
	function a(e, t) {
		for (var n = new c.
	default.Parser(e, t), r = n.parseUShort(), a = [], i = 0; i < r; i++) a[n.parseTag()] = {
			offset: n.parseUShort()
		};
		return a
	}
	function i(e, t) {
		var n = new c.
	default.Parser(e, t),
		r = n.parseUShort();
		if (1 === r) {
			var a = n.parseUShort(),
			i = n.parseUShort(),
			o = n.parseUShortList(i);
			return function(e) {
				return o[e - a] || 0
			}
		}
		if (2 === r) {
			for (var l = n.parseUShort(), s = [], u = [], f = [], p = 0; p < l; p++) s[p] = n.parseUShort(),
			u[p] = n.parseUShort(),
			f[p] = n.parseUShort();
			return function(e) {
				for (var t = 0,
				n = s.length - 1; t < n;) {
					var r = t + n + 1 >> 1;
					e < s[r] ? n = r - 1 : t = r
				}
				return s[t] <= e && e <= u[t] ? f[t] || 0 : 0
			}
		}
	}
	function o(e, t) {
		var n = new c.
	default.Parser(e, t),
		r = n.parseUShort(),
		a = function(e, t) {
			var n = new c.
		default.Parser(e, t),
			r = n.parseUShort(),
			a = n.parseUShort();
			if (1 === r) return n.parseUShortList(a);
			if (2 === r) {
				for (var i = []; a--;) for (var o = n.parseUShort(), l = n.parseUShort(), s = n.parseUShort(), u = o; u <= l; u++) i[s++] = u;
				return i
			}
		} (e, t + n.parseUShort()),
		o = n.parseUShort(),
		l = n.parseUShort(),
		s = void 0;
		if (4 === o && 0 === l) {
			var u = {};
			if (1 === r) {
				for (var f = n.parseUShort(), p = [], d = n.parseOffset16List(f), h = 0; h < f; h++) {
					var m = d[h],
					g = u[m];
					if (!g) {
						g = {},
						n.relativeOffset = m;
						for (var v = n.parseUShort(); v--;) {
							var y = n.parseUShort();
							o && (s = n.parseShort()),
							l && n.parseShort(),
							g[y] = s
						}
					}
					p[a[h]] = g
				}
				return function(e, t) {
					var n = p[e];
					if (n) return n[t]
				}
			}
			if (2 === r) {
				for (var b = n.parseUShort(), x = n.parseUShort(), S = n.parseUShort(), w = n.parseUShort(), L = i(e, t + b), k = i(e, t + x), D = [], E = 0; E < S; E++) for (var C = D[E] = [], A = 0; A < w; A++) o && (s = n.parseShort()),
				l && n.parseShort(),
				C[A] = s;
				for (var T = {},
				U = 0; U < a.length; U++) T[a[U]] = 1;
				return function(e, t) {
					if (T[e]) {
						var n = L(e),
						r = k(t),
						a = D[n];
						return a ? a[r] : void 0
					}
				}
			}
		}
	}
	function l(e, t) {
		var n = new c.
	default.Parser(e, t),
		r = n.parseUShort(),
		a = n.parseUShort(),
		i = 16 & a,
		l = n.parseUShort(),
		s = n.parseOffset16List(l),
		u = {
			lookupType: r,
			lookupFlag: a,
			markFilteringSet: i ? n.parseUShort() : -1
		};
		if (2 === r) {
			for (var f = [], p = 0; p < l; p++) {
				var d = o(e, t + s[p]);
				d && f.push(d)
			}
			u.getKerningValue = function(e, t) {
				for (var n = f.length; n--;) {
					var r = f[n](e, t);
					if (void 0 !== r) return r
				}
				return 0
			}
		}
		return u
	}
	Object.defineProperty(t, "__esModule", {
		value: !0
	});
	var s = r(n(11)),
	u = r(n(1)),
	c = r(n(0)),
	f = r(n(2)),
	p = new Array(10);
	p[2] = function(e) {
		return u.
	default.assert(1 === e.pairposFormat, "Lookup type 2 posFormat must be 1."),
		new f.
	default.Table("papTable", [{
			name: "posFormat",
			type: "USHORT",
			value: 1
		},
		{
			name: "coverage",
			type: "TABLE",
			value: new f.
		default.Coverage(e.coverage)
		},
		{
			name: "ValueFormat1",
			type: "USHORT",
			value: 4
		},
		{
			name: "ValueFormat2",
			type: "USHORT",
			value: 0
		}].concat(f.
	default.tableList("pairSets", e.pairSets,
		function(e, t) {
			return new f.
		default.Table("pairSetTable", f.
		default.recordList("pairRecord", e,
			function(e, n) {
				return [{
					name: "secondGlyphId" + t + n,
					type: "USHORT",
					value: e.secondGlyphId
				},
				{
					name: "Value1" + t + n,
					type: "SHORT",
					value: e.value1
				}]
			}))
		})))
	},
	t.
default = {
		parse: function(e, t, n) {
			var r = new c.
		default.Parser(e, t),
			i = r.parseFixed();
			u.
		default.argument(1 === i, "Unsupported GPOS table version."),
			a(e, t + r.parseUShort()),
			a(e, t + r.parseUShort());
			var o = r.parseUShort();
			r.relativeOffset = o;
			for (var s = r.parseUShort(), f = r.parseOffset16List(s), p = t + o, d = 0; d < s; d++) {
				var h = l(e, p + f[d]);
				2 !== h.lookupType || n.getGposKerningValue || (n.getGposKerningValue = h.getKerningValue)
			}
		},
		make: function(e) {
			var t = [{
				lookupFlag: 0,
				lookupType: 2,
				subtables: [{
					pairposFormat: 1,
					coverage: {
						format: 1,
						glyphs: []
					},
					pairSets: []
				}]
			}],
			n = function(e) {
				var t = (0, s.
			default)(e);
				t.sort();
				for (var n = {},
				r = 0; r < t.length; r++) {
					var a = t[r].split(","),
					i = a[0],
					o = a[1],
					l = e[t[r]];
					n[i] || (n[i] = []),
					n[i].push({
						secondGlyphId: parseInt(o),
						value1: l
					})
				}
				return n
			} (e.kerningPairs),
			r = (0, s.
		default)(n);
			r.sort(function(e, t) {
				return parseInt(e) - parseInt(t)
			});
			for (var a = 0; a < r.length; a++) {
				var i = r[a];
				t[0].subtables[0].coverage.glyphs.push(parseInt(i));
				var o = n[i];
				o.sort(function(e, t) {
					return e.secondGlyphId - t.secondGlyphId
				}),
				t[0].subtables[0].pairSets.push(o)
			}
			return new f.
		default.Table("GPOS", [{
				name: "version",
				type: "ULONG",
				value: 65536
			},
			{
				name: "scripts",
				type: "TABLE",
				value: new f.
			default.ScriptList([{
					tag:
					"latn",
					script: {
						defaultLangSys: {
							reserved: 0,
							reqFeatureIndex: 65535,
							featureIndexes: [0]
						},
						langSysRecords: []
					}
				}])
			},
			{
				name: "features",
				type: "TABLE",
				value: new f.
			default.FeatureList([{
					tag:
					"kern",
					feature: {
						params: 0,
						lookupListIndexes: [0]
					}
				}])
			},
			{
				name: "lookups",
				type: "TABLE",
				value: new f.
			default.LookupList(t, p)
			}])
		}
	}
},
function(e, t, n) {
	"use strict";
	function r(e) {
		return e && e.__esModule ? e: {
		default:
			e
		}
	}
	Object.defineProperty(t, "__esModule", {
		value: !0
	});
	var a = r(n(11)),
	i = r(n(1)),
	o = n(23),
	l = r(n(0)),
	s = r(n(2));
	t.
default = {
		parse: function(e, t) {
			var n = new l.
		default.Parser(e, t),
			r = n.parseULong();
			i.
		default.argument(1 === r, "Unsupported META table version."),
			n.parseULong(),
			n.parseULong();
			for (var a = n.parseULong(), s = {},
			u = 0; u < a; u++) {
				var c = n.parseTag(),
				f = n.parseULong(),
				p = n.parseULong(),
				d = o.decode.UTF8(e, t + f, p);
				s[c] = d
			}
			return s
		},
		make: function(e) {
			var t = (0, a.
		default)(e).length,
			n = "",
			r = 16 + 12 * t,
			i = new s.
		default.Table("meta", [{
				name: "version",
				type: "ULONG",
				value: 1
			},
			{
				name: "flags",
				type: "ULONG",
				value: 0
			},
			{
				name: "offset",
				type: "ULONG",
				value: r
			},
			{
				name: "numTags",
				type: "ULONG",
				value: t
			}]);
			for (var o in e) {
				var l = n.length;
				n += e[o],
				i.fields.push({
					name: "tag " + o,
					type: "TAG",
					value: o
				}),
				i.fields.push({
					name: "offset " + o,
					type: "ULONG",
					value: r + l
				}),
				i.fields.push({
					name: "length " + o,
					type: "ULONG",
					value: e[o].length
				})
			}
			return i.fields.push({
				name: "stringPool",
				type: "CHARARRAY",
				value: n
			}),
			i
		}
	}
},
function(e, t, n) {
	"use strict";
	Object.defineProperty(t, "__esModule", {
		value: !0
	}),
	t.isBrowser = function() {
		return "undefined" != typeof window
	},
	t.isNode = function() {
		return "undefined" == typeof window
	},
	t.nodeBufferToArrayBuffer = function(e) {
		for (var t = new ArrayBuffer(e.length), n = new Uint8Array(t), r = 0; r < e.length; ++r) n[r] = e[r];
		return t
	},
	t.arrayBufferToNodeBuffer = function(e) {
		for (var t = new Buffer(e.byteLength), n = new Uint8Array(e), r = 0; r < t.length; ++r) t[r] = n[r];
		return t
	},
	t.checkArgument = function(e, t) {
		if (!e) throw t
	}
},
function(e, t, n) {
	"use strict";
	t.__esModule = !0;
	var r = function(e) {
		return e && e.__esModule ? e: {
		default:
			e
		}
	} (n(36));
	t.
default = function(e, t, n) {
		return t in e ? (0, r.
	default)(e, t, {
			value: n,
			enumerable: !0,
			configurable: !0,
			writable: !0
		}) : e[t] = n,
		e
	}
},
function(e, t, n) {
	function r(e, t) {
		for (var n = 0; n < e.length; n++) {
			var r = e[n],
			a = f[r.id];
			if (a) {
				a.refs++;
				for (var i = 0; i < a.parts.length; i++) a.parts[i](r.parts[i]);
				for (; i < r.parts.length; i++) a.parts.push(u(r.parts[i], t))
			} else {
				var o = [];
				for (i = 0; i < r.parts.length; i++) o.push(u(r.parts[i], t));
				f[r.id] = {
					id: r.id,
					refs: 1,
					parts: o
				}
			}
		}
	}
	function a(e, t) {
		for (var n = [], r = {},
		a = 0; a < e.length; a++) {
			var i = e[a],
			o = t.base ? i[0] + t.base: i[0],
			l = {
				css: i[1],
				media: i[2],
				sourceMap: i[3]
			};
			r[o] ? r[o].parts.push(l) : n.push(r[o] = {
				id: o,
				parts: [l]
			})
		}
		return n
	}
	function i(e, t) {
		var n = d(e.insertInto);
		if (!n) throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
		var r = g[g.length - 1];
		if ("top" === e.insertAt) r ? r.nextSibling ? n.insertBefore(t, r.nextSibling) : n.appendChild(t) : n.insertBefore(t, n.firstChild),
		g.push(t);
		else if ("bottom" === e.insertAt) n.appendChild(t);
		else {
			if ("object" != typeof e.insertAt || !e.insertAt.before) throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
			var a = d(e.insertInto + " " + e.insertAt.before);
			n.insertBefore(t, a)
		}
	}
	function o(e) {
		if (null === e.parentNode) return ! 1;
		e.parentNode.removeChild(e);
		var t = g.indexOf(e);
		t >= 0 && g.splice(t, 1)
	}
	function l(e) {
		var t = document.createElement("style");
		return e.attrs.type = "text/css",
		s(t, e.attrs),
		i(e, t),
		t
	}
	function s(e, t) {
		Object.keys(t).forEach(function(n) {
			e.setAttribute(n, t[n])
		})
	}
	function u(e, t) {
		var n, r, a, u;
		if (t.transform && e.css) {
			if (! (u = t.transform(e.css))) return function() {};
			e.css = u
		}
		if (t.singleton) {
			var f = m++;
			n = h || (h = l(t)),
			r = c.bind(null, n, f, !1),
			a = c.bind(null, n, f, !0)
		} else e.sourceMap && "function" == typeof URL && "function" == typeof URL.createObjectURL && "function" == typeof URL.revokeObjectURL && "function" == typeof Blob && "function" == typeof btoa ? (n = function(e) {
			var t = document.createElement("link");
			return e.attrs.type = "text/css",
			e.attrs.rel = "stylesheet",
			s(t, e.attrs),
			i(e, t),
			t
		} (t), r = function(e, t, n) {
			var r = n.css,
			a = n.sourceMap,
			i = void 0 === t.convertToAbsoluteUrls && a; (t.convertToAbsoluteUrls || i) && (r = v(r));
			a && (r += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(a)))) + " */");
			var o = new Blob([r], {
				type: "text/css"
			}),
			l = e.href;
			e.href = URL.createObjectURL(o),
			l && URL.revokeObjectURL(l)
		}.bind(null, n, t), a = function() {
			o(n),
			n.href && URL.revokeObjectURL(n.href)
		}) : (n = l(t), r = function(e, t) {
			var n = t.css,
			r = t.media;
			r && e.setAttribute("media", r);
			if (e.styleSheet) e.styleSheet.cssText = n;
			else {
				for (; e.firstChild;) e.removeChild(e.firstChild);
				e.appendChild(document.createTextNode(n))
			}
		}.bind(null, n), a = function() {
			o(n)
		});
		return r(e),
		function(t) {
			if (t) {
				if (t.css === e.css && t.media === e.media && t.sourceMap === e.sourceMap) return;
				r(e = t)
			} else a()
		}
	}
	function c(e, t, n, r) {
		var a = n ? "": r.css;
		if (e.styleSheet) e.styleSheet.cssText = y(t, a);
		else {
			var i = document.createTextNode(a),
			o = e.childNodes;
			o[t] && e.removeChild(o[t]),
			o.length ? e.insertBefore(i, o[t]) : e.appendChild(i)
		}
	}
	var f = {},
	p = function(e) {
		var t;
		return function() {
			return void 0 === t && (t = e.apply(this, arguments)),
			t
		}
	} (function() {
		return window && document && document.all && !window.atob
	}),
	d = function(e) {
		var t = {};
		return function(e) {
			if (void 0 === t[e]) {
				var n = function(e) {
					return document.querySelector(e)
				}.call(this, e);
				if (n instanceof window.HTMLIFrameElement) try {
					n = n.contentDocument.head
				} catch(e) {
					n = null
				}
				t[e] = n
			}
			return t[e]
		}
	} (),
	h = null,
	m = 0,
	g = [],
	v = n(179);
	e.exports = function(e, t) {
		if ("undefined" != typeof DEBUG && DEBUG && "object" != typeof document) throw new Error("The style-loader cannot be used in a non-browser environment"); (t = t || {}).attrs = "object" == typeof t.attrs ? t.attrs: {},
		t.singleton || "boolean" == typeof t.singleton || (t.singleton = p()),
		t.insertInto || (t.insertInto = "head"),
		t.insertAt || (t.insertAt = "bottom");
		var n = a(e, t);
		return r(n, t),
		function(e) {
			for (var i = [], o = 0; o < n.length; o++) {
				var l = n[o]; (s = f[l.id]).refs--,
				i.push(s)
			}
			if (e) {
				r(a(e, t), t)
			}
			for (o = 0; o < i.length; o++) {
				var s;
				if (0 === (s = i[o]).refs) {
					for (var u = 0; u < s.parts.length; u++) s.parts[u]();
					delete f[s.id]
				}
			}
		}
	};
	var y = function() {
		var e = [];
		return function(t, n) {
			return e[t] = n,
			e.filter(Boolean).join("\n")
		}
	} ()
},
function(e, t, n) {
	e.exports = n(79)
},
function(e, t, n) {
	"use strict";
	function r(e) {
		return e && e.__esModule ? e: {
		default:
			e
		}
	}
	n(80);
	var a = r(n(105)),
	i = r(n(158));
	window.m = n(174),
	n(175),
	n(180);
	window.addEventListener("dragover",
	function(e) {
		e.preventDefault()
	},
	!1),
	window.addEventListener("drop",
	function(e) {
		e.preventDefault(),
		window._actions_.importByDrop(e)
	},
	!1),
	window.addEventListener("resize",
	function(e) {
		e.preventDefault(),
		a.
	default.preview.height >= window.innerHeight - 85 && (a.
	default.preview.height = window.innerHeight - 85),
		m.redraw()
	},
	!1),
	document.onselectstart = function(e) {
		var t = e.target;
		return ! (!t || "TEXTAREA" !== t.tagName && "INPUT" !== t.tagName)
	},
	n(182),
	document.oncontextmenu = function(e) {
		var t = e.target;
		return ! (!t || "TEXTAREA" !== t.tagName && ("INPUT" !== t.tagName || "range" === t.type))
	},
	m.mount(document.body, i.
default)
},
function(e, t, n) {
	"use strict";
	function r(e) {
		return e && e.__esModule ? e: {
		default:
			e
		}
	}
	function a(e) {
		location.hash = e + "?" + (new Date).getTime()
	}
	function i() {
		var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
		t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
		try {
			t = JSON.parse(t)
		} catch(e) {}
		t ? state.font.import({
			glyphs: e.glyphs,
			data: (0, o.
		default)({},
			e.data, {
				glyphMetrics: t
			})
		}) : state.font.import(e),
		state.font.preview(),
		m.redraw(),
		amplitude.getInstance().logEvent("Sketch Import", {
			App: "Sketch",
			Version: "1.5.0"
		})
	}
	var o = r(n(43)),
	l = r(n(34)),
	s = r(n(20));
	window._actions_ = {
		import: function(e, t) {
			t ? i(e) : a("IMPORT")
		},
		importByDrop: function(e) {
			var t = !1,
			n = e.dataTransfer.files,
			r = !0,
			i = !1,
			o = void 0;
			try {
				for (var l, u = (0, s.
			default)(n); ! (r = (l = u.next()).done); r = !0) if (l.value.name.includes(".png")) {
					t = !0;
					break
				}
			} catch(e) {
				i = !0,
				o = e
			} finally {
				try { ! r && u.
					return && u.
					return ()
				} finally {
					if (i) throw o
				}
			}
			t && a("IMPORT")
		},
		export: function(e) {
			if (e) return state.font.export();
			a("EXPORT"),
			amplitude.getInstance().logEvent("Sketch Export", {
				App: "Sketch",
				Version: "1.5.0"
			})
		},
		openURL: function(e) {
			a("OPENURL?" + encodeURIComponent(e))
		},
		showFont: function() {
			a("SHOWFONT")
		},
		openMenu: function() {
			a("MENU")
		},
		save: function(e) {
			var t = state.font;
			if (!t.isEmpty) {
				if (e) return (0, l.
			default)(t.data);
				a("SAVE")
			}
		},
		reset: function() {
			state.reset(),
			m.redraw()
		}
	}
},
function(e, t, n) {
	e.exports = {
	default:
		n(82),
		__esModule: !0
	}
},
function(e, t, n) {
	n(83),
	e.exports = n(3).Object.assign
},
function(e, t, n) {
	var r = n(5);
	r(r.S + r.F, "Object", {
		assign: n(47)
	})
},
function(e, t, n) {
	e.exports = !n(13) && !n(10)(function() {
		return 7 != Object.defineProperty(n(45)("div"), "a", {
			get: function() {
				return 7
			}
		}).a
	})
},
function(e, t, n) {
	var r = n(4);
	e.exports = function(e, t) {
		if (!r(e)) return e;
		var n, a;
		if (t && "function" == typeof(n = e.toString) && !r(a = n.call(e))) return a;
		if ("function" == typeof(n = e.valueOf) && !r(a = n.call(e))) return a;
		if (!t && "function" == typeof(n = e.toString) && !r(a = n.call(e))) return a;
		throw TypeError("Can't convert object to primitive value")
	}
},
function(e, t, n) {
	var r = n(14),
	a = n(26),
	i = n(87)(!1),
	o = n(32)("IE_PROTO");
	e.exports = function(e, t) {
		var n, l = a(e),
		s = 0,
		u = [];
		for (n in l) n != o && r(l, n) && u.push(n);
		for (; t.length > s;) r(l, n = t[s++]) && (~i(u, n) || u.push(n));
		return u
	}
},
function(e, t, n) {
	var r = n(26),
	a = n(30),
	i = n(88);
	e.exports = function(e) {
		return function(t, n, o) {
			var l, s = r(t),
			u = a(s.length),
			c = i(o, u);
			if (e && n != n) {
				for (; u > c;) if ((l = s[c++]) != l) return ! 0
			} else for (; u > c; c++) if ((e || c in s) && s[c] === n) return e || c || 0;
			return ! e && -1
		}
	}
},
function(e, t, n) {
	var r = n(31),
	a = Math.max,
	i = Math.min;
	e.exports = function(e, t) {
		return (e = r(e)) < 0 ? a(e + t, 0) : i(e, t)
	}
},
function(e, t) {
	t.f = Object.getOwnPropertySymbols
},
function(e, t) {
	t.f = {}.propertyIsEnumerable
},
function(e, t, n) {
	var r = n(3),
	a = r.JSON || (r.JSON = {
		stringify: JSON.stringify
	});
	e.exports = function(e) {
		return a.stringify.apply(a, arguments)
	}
},
function(e, t, n) {
	n(50),
	n(101),
	e.exports = n(103)
},
function(e, t, n) {
	"use strict";
	var r = n(94),
	a = n(95),
	i = n(15),
	o = n(26);
	e.exports = n(51)(Array, "Array",
	function(e, t) {
		this._t = o(e),
		this._i = 0,
		this._k = t
	},
	function() {
		var e = this._t,
		t = this._k,
		n = this._i++;
		return ! e || n >= e.length ? (this._t = void 0, a(1)) : a(0, "keys" == t ? n: "values" == t ? e[n] : [n, e[n]])
	},
	"values"),
	i.Arguments = i.Array,
	r("keys"),
	r("values"),
	r("entries")
},
function(e, t) {
	e.exports = function() {}
},
function(e, t) {
	e.exports = function(e, t) {
		return {
			value: t,
			done: !!e
		}
	}
},
function(e, t) {
	e.exports = !0
},
function(e, t, n) {
	"use strict";
	var r = n(53),
	a = n(46),
	i = n(35),
	o = {};
	n(8)(o, n(6)("iterator"),
	function() {
		return this
	}),
	e.exports = function(e, t, n) {
		e.prototype = r(o, {
			next: a(1, n)
		}),
		i(e, t + " Iterator")
	}
},
function(e, t, n) {
	var r = n(12),
	a = n(9),
	i = n(25);
	e.exports = n(13) ? Object.defineProperties: function(e, t) {
		a(e);
		for (var n, o = i(t), l = o.length, s = 0; l > s;) r.f(e, n = o[s++], t[n]);
		return e
	}
},
function(e, t, n) {
	var r = n(7).document;
	e.exports = r && r.documentElement
},
function(e, t, n) {
	var r = n(14),
	a = n(19),
	i = n(32)("IE_PROTO"),
	o = Object.prototype;
	e.exports = Object.getPrototypeOf ||
	function(e) {
		return e = a(e),
		r(e, i) ? e[i] : "function" == typeof e.constructor && e instanceof e.constructor ? e.constructor.prototype: e instanceof Object ? o: null
	}
},
function(e, t, n) {
	"use strict";
	var r = n(102)(!0);
	n(51)(String, "String",
	function(e) {
		this._t = String(e),
		this._i = 0
	},
	function() {
		var e, t = this._t,
		n = this._i;
		return n >= t.length ? {
			value: void 0,
			done: !0
		}: (e = r(t, n), this._i += e.length, {
			value: e,
			done: !1
		})
	})
},
function(e, t, n) {
	var r = n(31),
	a = n(29);
	e.exports = function(e) {
		return function(t, n) {
			var i, o, l = String(a(t)),
			s = r(n),
			u = l.length;
			return s < 0 || s >= u ? e ? "": void 0 : (i = l.charCodeAt(s)) < 55296 || i > 56319 || s + 1 === u || (o = l.charCodeAt(s + 1)) < 56320 || o > 57343 ? e ? l.charAt(s) : i: e ? l.slice(s, s + 2) : o - 56320 + (i - 55296 << 10) + 65536
		}
	}
},
function(e, t, n) {
	var r = n(9),
	a = n(54);
	e.exports = n(3).getIterator = function(e) {
		var t = a(e);
		if ("function" != typeof t) throw TypeError(e + " is not iterable!");
		return r(t.call(e))
	}
},
function(e, t, n) {
	var r = n(28),
	a = n(6)("toStringTag"),
	i = "Arguments" == r(function() {
		return arguments
	} ());
	e.exports = function(e) {
		var t, n, o;
		return void 0 === e ? "Undefined": null === e ? "Null": "string" == typeof(n = function(e, t) {
			try {
				return e[t]
			} catch(e) {}
		} (t = Object(e), a)) ? n: i ? r(t) : "Object" == (o = r(t)) && "function" == typeof t.callee ? "Arguments": o
	}
},
function(e, t, n) {
	"use strict";
	Object.defineProperty(t, "__esModule", {
		value: !0
	});
	var r = function(e) {
		return e && e.__esModule ? e: {
		default:
			e
		}
	} (n(106)),
	a = {
		theme: "sketch-theme",
		tab: "editor",
		jsx: null,
		preview: {
			font: null,
			text: "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz",
			size: 30,
			height: 180,
			theme: {
				fg: "#000",
				bg: "#fff"
			}
		},
		font: new r.
	default,
		editor: {
			size: 150,
			glyph: null
		},
		selectedGlyphs: {},
		resizing: !1,
		searchText: ""
	};
	a.reset = function() {
		this.font._previewFont && document.fonts.delete(this.font._previewFont),
		this.font = new r.
	default,
		this.editor.glyph = null,
		this.selectedGlyphs = {}
	},
	t.
default = window.state = a
},
function(e, t, n) {
	"use strict";
	function r(e) {
		return e && e.__esModule ? e: {
		default:
			e
		}
	}
	Object.defineProperty(t, "__esModule", {
		value: !0
	});
	var a = r(n(34)),
	i = r(n(43)),
	o = r(n(20)),
	l = r(n(21)),
	s = r(n(22)),
	u = r(n(109)),
	c = r(n(157)),
	f = n(55),
	p = function() {
		function e() {
			var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}; (0, l.
		default)(this, e),
			this.type = "Font",
			this.metrics = {
				upm: 1e3,
				ascender: 800,
				descender: -200,
				width: 650,
				height: 750
			},
			this.css = {
				embed: !1,
				selector: "i",
				prefix: "icon-",
				postfix: ""
			},
			this.metadata = {
				familyName: "",
				styleName: "Regular",
				italic: !1,
				weightClass: 400,
				widthClass: 5,
				version: "0.0.1",
				designer: "",
				designerURL: "",
				manufacturer: "",
				manufacturerURL: "",
				copyright: "",
				trademark: "",
				license: "",
				licenseURL: ""
			},
			this.glyphs = t.glyphs || [],
			this._previewFont = null,
			this.categories = [new c.
		default({
				name:
				"Uppercase",
				filters: ["Lu"]
			}), new c.
		default({
				name:
				"Lowercase",
				filters: ["Ll"]
			}), new c.
		default({
				name:
				"Other letter",
				filters: ["Lt", "Lm", "Lo"]
			}), new c.
		default({
				name:
				"Mark",
				filters: ["Mn", "Mc", "Me"]
			}), new c.
		default({
				name:
				"Number",
				filters: ["Nd", "Nl", "No"]
			}), new c.
		default({
				name:
				"Punctuation",
				filters: ["Pc", "Pd", "Ps", "Pe", "Pi", "Pf", "Po"]
			}), new c.
		default({
				name:
				"Symbol",
				filters: ["Sm", "Sc", "Sk", "So"]
			}), new c.
		default({
				name:
				"Ligature"
			}), new c.
		default({
				name:
				"Alternate"
			}), new c.
		default({
				name:
				"Separator",
				filters: ["Zs", "Zl", "Zp"]
			}), new c.
		default({
				name:
				"Other",
				filters: ["Cc", "Cf", "Cs", "Co", "Cn"]
			})]
		}
		return (0, s.
	default)(e, [{
			key: "import",
			value: function() {
				var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
				this.removeSpace();
				var t = e.data || {};
				void 0 !== t.type && (this.type = t.type),
				void 0 !== t.metrics && (this.metrics = {
					upm: Number(t.metrics.upm) || this.metrics.upm,
					ascender: Number(t.metrics.ascender) || this.metrics.ascender,
					descender: Number(t.metrics.descender) || this.metrics.descender,
					width: Number(t.metrics.width) || this.metrics.width,
					height: Number(t.metrics.height) || this.metrics.height
				}),
				void 0 !== t.metadata && (this.metadata = t.metadata);
				var n = t.glyphMetrics || {},
				r = e.glyphs || [],
				a = this.getScale(r),
				l = !0,
				s = !1,
				c = void 0;
				try {
					for (var f, p = (0, o.
				default)(r); ! (l = (f = p.next()).done); l = !0) {
						var d = f.value,
						h = new u.
					default((0, i.
					default)({},
						d, {
							scale: a,
							metrics: n[d.name]
						}));
						this.addOrReplaceGlyph(h)
					}
				} catch(e) {
					s = !0,
					c = e
				} finally {
					try { ! l && p.
						return && p.
						return ()
					} finally {
						if (s) throw c
					}
				}
				var m = new u.
			default({
					name:
					"space",
					scale: a,
					metrics: n.space
				});
				this.addGlyph(m),
				this.updateCategories()
			}
		},
		{
			key: "getScale",
			value: function(e) {
				var t = this.metrics.width / this.maxWidth(e),
				n = this.metrics.height / this.maxHeight(e);
				return isNaN(t) || isNaN(n) ? 1 : t >= n ? n: t
			}
		},
		{
			key: "_buildFont",
			value: function(e) {
				var t = [new u.
			default({
					name:
					".notdef"
				}).data],
				n = [],
				r = {},
				a = !0,
				l = !1,
				s = void 0;
				try {
					for (var c, p = (0, o.
				default)(this.glyphs); ! (a = (c = p.next()).done); a = !0) {
						var d = c.value;
						t.push(d.data);
						var h = d.alternate;
						if (h) {
							var m = r[h.sub];
							void 0 !== m ? m.includes(h.by) || r[h.sub].push(h.by) : r[h.sub] = [h.by]
						}
						var g = d.ligature;
						g && n.push(g)
					}
				} catch(e) {
					l = !0,
					s = e
				} finally {
					try { ! a && p.
						return && p.
						return ()
					} finally {
						if (l) throw s
					}
				}
				for (var v in r) n.unshift({
					type: "aalt",
					data: {
						by: r[v],
						sub: Number(v)
					}
				});
				return new f.Font((0, i.
			default)({},
				e, {
					unitsPerEm: this.metrics.upm,
					ascender: this.metrics.ascender,
					descender: this.metrics.descender,
					createdTimestamp: (new Date).getTime(),
					substitutions: n,
					kerningPairs: {
						"2,3": 520
					},
					glyphs: t
				}))
			}
		},
		{
			key: "preview",
			value: function() {
				var e = this.previewFont.toArrayBuffer();
				if (void 0 !== document.fonts && "undefined" != typeof FontFace) this._previewFont && document.fonts.delete(this._previewFont),
				this._previewFont = new FontFace("fontrapid-preview", e),
				document.fonts.add(this._previewFont);
				else {
					var t = this._arrayBufferToBase64(e),
					n = document.getElementById("oldschool-preview"),
					r = '\n        @font-face {\n          font-family: "fontrapid-preview";\n          src: url(data:font/truetype;charset=utf-8;base64,' + t + ")  format('opentype');\n        ";
					if (n) n.styleSheet ? n.styleSheet.cssText = r: n.replaceChild(document.createTextNode(r), n.childNodes[0]);
					else {
						var a = document.createElement("style"),
						i = document.head || document.getElementsByTagName("head")[0];
						a.styleSheet ? a.styleSheet.cssText = r: a.appendChild(document.createTextNode(r)),
						a.setAttribute("id", "oldschool-preview"),
						i.appendChild(a)
					}
				}
				m.redraw()
			}
		},
		{
			key: "export",
			value: function() {
				var e = this.metadata,
				t = "Regular",
				n = "FontRapid",
				r = "1.0",
				o = e.familyName && e.familyName.replace(/\s/g, "") ? e.familyName.trim() : "Untitled",
				l = "";
				if ("Regular" === e.styleName) l = e.italic ? "-Italic": "",
				t = e.italic ? "Italic": "Regular";
				else {
					var s = e.italic ? "Italic": "";
					l = "-" + e.styleName + s;
					var u = e.italic ? " Italic": "";
					t = e.styleName + u
				}
				n = o.replace(/\s/g, "") + l,
				r = e.version + ";FontRapid 1.5.0";
				var c = o.replace(/\s/g, "") + "-" + t.replace(/\s/g, ""),
				f = (0, i.
			default)({},
				e, {
					familyName: o,
					styleName: t,
					postScriptName: c,
					version: r
				}),
				p = this._buildFont(f).toArrayBuffer(),
				d = {
					fileName: n,
					data: this._arrayBufferToBase64(p)
				};
				return void 0 === window.__adobe_cep__ && (d = (0, a.
			default)(d)),
				d
			}
		},
		{
			key: "maxWidth",
			value: function() {
				var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
				t = 1,
				n = !0,
				r = !1,
				a = void 0;
				try {
					for (var i, l = (0, o.
				default)(this.glyphs); ! (n = (i = l.next()).done); n = !0) {
						var s = i.value;
						"space" !== s.name && (s.frame && s.frame.w > t && (t = s.frame.w))
					}
				} catch(e) {
					r = !0,
					a = e
				} finally {
					try { ! n && l.
						return && l.
						return ()
					} finally {
						if (r) throw a
					}
				}
				var u = !0,
				c = !1,
				f = void 0;
				try {
					for (var p, d = (0, o.
				default)(e); ! (u = (p = d.next()).done); u = !0) {
						var h = p.value;
						h.frame && h.frame.w > t && (t = h.frame.w)
					}
				} catch(e) {
					c = !0,
					f = e
				} finally {
					try { ! u && d.
						return && d.
						return ()
					} finally {
						if (c) throw f
					}
				}
				return t
			}
		},
		{
			key: "maxHeight",
			value: function() {
				var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
				t = 1,
				n = !0,
				r = !1,
				a = void 0;
				try {
					for (var i, l = (0, o.
				default)(this.glyphs); ! (n = (i = l.next()).done); n = !0) {
						var s = i.value;
						"space" !== s.name && (s.frame && s.frame.h > t && (t = s.frame.h))
					}
				} catch(e) {
					r = !0,
					a = e
				} finally {
					try { ! n && l.
						return && l.
						return ()
					} finally {
						if (r) throw a
					}
				}
				var u = !0,
				c = !1,
				f = void 0;
				try {
					for (var p, d = (0, o.
				default)(e); ! (u = (p = d.next()).done); u = !0) {
						var h = p.value;
						h.frame && h.frame.h > t && (t = h.frame.h)
					}
				} catch(e) {
					c = !0,
					f = e
				} finally {
					try { ! u && d.
						return && d.
						return ()
					} finally {
						if (c) throw f
					}
				}
				return t
			}
		},
		{
			key: "updateCategories",
			value: function() {
				for (var e = [], t = 61440, n = 0; n < this.categories.length; n++) {
					var r = this.categories[n],
					a = !0,
					i = !1,
					l = void 0;
					try {
						for (var s, u = (0, o.
					default)(this.glyphs); ! (a = (s = u.next()).done); a = !0) {
							var c = s.value,
							f = r.filters.includes(c.catKey) && !c.isLigature && !c.isAlternate,
							p = "ligature" === r.id && c.isLigature,
							d = "alternate" === r.id && c.isAlternate; (p || d) && c.charcode < 64256 && (c.charcode = t, t++),
							(f || p || d) && r.addGlyph(c)
						}
					} catch(e) {
						i = !0,
						l = e
					} finally {
						try { ! a && u.
							return && u.
							return ()
						} finally {
							if (i) throw l
						}
					}
					r.sortBy("name"),
					e = e.concat(r.glyphs)
				}
				this.glyphs = e
			}
		},
		{
			key: "findById",
			value: function(e) {
				var t = !0,
				n = !1,
				r = void 0;
				try {
					for (var a, i = (0, o.
				default)(this.glyphs); ! (t = (a = i.next()).done); t = !0) {
						var l = a.value;
						if ("space" === l.name && " " === e) return l;
						if (l.id === e) return l
					}
				} catch(e) {
					n = !0,
					r = e
				} finally {
					try { ! t && i.
						return && i.
						return ()
					} finally {
						if (n) throw r
					}
				}
				return null
			}
		},
		{
			key: "findByName",
			value: function(e) {
				var t = !0,
				n = !1,
				r = void 0;
				try {
					for (var a, i = (0, o.
				default)(this.glyphs); ! (t = (a = i.next()).done); t = !0) {
						var l = a.value;
						if ("space" === l.name && "space" === e.toLowerCase()) return l;
						if ( - 1 !== l.name.toLowerCase().indexOf(e.toLowerCase())) return l
					}
				} catch(e) {
					n = !0,
					r = e
				} finally {
					try { ! t && i.
						return && i.
						return ()
					} finally {
						if (n) throw r
					}
				}
				return null
			}
		},
		{
			key: "clear",
			value: function() {
				return this.glyphs = [],
				this
			}
		},
		{
			key: "sort",
			value: function(e) {
				return "name" === e ? this._sortByName() : this.glyphs
			}
		},
		{
			key: "_sortByName",
			value: function() {
				return this.glyphs.sort(function(e, t) {
					var n = e.name.toUpperCase(),
					r = t.name.toUpperCase();
					return n < r ? -1 : n > r ? 1 : 0
				})
			}
		},
		{
			key: "reverse",
			value: function() {
				return this.glyphs.reverse()
			}
		},
		{
			key: "addOrReplaceGlyph",
			value: function(e) {
				var t = this.findById(e.id);
				t ? (t.path = e.path, e = null) : (e.font = this, this.glyphs.push(e))
			}
		},
		{
			key: "addGlyph",
			value: function(e, t) {
				this.findById(e.id) || (e.font = this, t ? this.glyphs.unshift(e) : this.glyphs.push(e))
			}
		},
		{
			key: "replaceGlyph",
			value: function(e, t) {
				var n = e.index; - 1 !== n && (t.font = this, this.glyphs[n] = t)
			}
		},
		{
			key: "insertGlyph",
			value: function(e, t) {
				e.font = this,
				t >= 0 && t < this.glyphs.length ? this.glyphs.splice(t, 0, e) : this.glyphs.push(e)
			}
		},
		{
			key: "addGlyphs",
			value: function() {
				var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
				t = !0,
				n = !1,
				r = void 0;
				try {
					for (var a, i = (0, o.
				default)(e); ! (t = (a = i.next()).done); t = !0) {
						var l = a.value;
						this.addGlyph(l)
					}
				} catch(e) {
					n = !0,
					r = e
				} finally {
					try { ! t && i.
						return && i.
						return ()
					} finally {
						if (n) throw r
					}
				}
			}
		},
		{
			key: "removeGlyph",
			value: function(e) {
				if ("space" !== e.name) {
					var t = this.glyphs,
					n = e.index; - 1 !== n && t.splice(n, 1),
					e.category.removeGlyph(e),
					e = null
				}
			}
		},
		{
			key: "removeSpace",
			value: function() {
				var e = this.findById("space");
				e && this.removeGlyph(e)
			}
		},
		{
			key: "_arrayBufferToBase64",
			value: function(e) {
				for (var t = "",
				n = new Uint8Array(e), r = n.byteLength, a = 0; a < r; a++) t += String.fromCharCode(n[a]);
				return window.btoa(t)
			}
		},
		{
			key: "count",
			get: function() {
				return this.glyphs.length
			}
		},
		{
			key: "data",
			get: function() {
				var e = {},
				t = !0,
				n = !1,
				r = void 0;
				try {
					for (var a, i = (0, o.
				default)(this.glyphs); ! (t = (a = i.next()).done); t = !0) {
						var l = a.value;
						e[l.name] = l.metrics
					}
				} catch(e) {
					n = !0,
					r = e
				} finally {
					try { ! t && i.
						return && i.
						return ()
					} finally {
						if (n) throw r
					}
				}
				return {
					metadata: this.metadata,
					metrics: this.metrics,
					glyphMetrics: e,
					modified: (new Date).getTime(),
					version: "1.5.0",
					type: this.type
				}
			}
		},
		{
			key: "scale",
			get: function() {
				return this.getScale()
			}
		},
		{
			key: "previewFont",
			get: function() {
				return this._buildFont({
					familyName: "FontRapid",
					styleName: "Regular",
					version: "1.0",
					postScriptName: "FontRapid-Regular"
				})
			}
		},
		{
			key: "firstChild",
			get: function() {
				return this.isEmpty ? null: this.glyphs[0]
			}
		},
		{
			key: "lastChild",
			get: function() {
				return this.isEmpty ? null: this.glyphs[this.glyphs.length - 1]
			}
		},
		{
			key: "isEmpty",
			get: function() {
				var e = this.glyphs;
				return ! e || e.length <= 1
			}
		}]),
		e
	} ();
	t.
default = p
},
function(e, t, n) {
	n(108);
	var r = n(3).Object;
	e.exports = function(e, t, n) {
		return r.defineProperty(e, t, n)
	}
},
function(e, t, n) {
	var r = n(5);
	r(r.S + r.F * !n(13), "Object", {
		defineProperty: n(12).f
	})
},
function(e, t, n) {
	"use strict";
	function r(e) {
		return e && e.__esModule ? e: {
		default:
			e
		}
	}
	Object.defineProperty(t, "__esModule", {
		value: !0
	});
	var a = r(n(20)),
	i = r(n(21)),
	o = r(n(22)),
	l = r(n(110)),
	s = r(n(111)),
	u = r(n(112)),
	c = n(55),
	f = function() {
		function e() {
			var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
			if ((0, i.
		default)(this, e), this.name = t.name, this.charcode = t.charcode || this.name.charCodeAt(0) || 0, ".notdef" === this.name ? this.charcode = 0 : "space" === this.name && (this.charcode = 32), this.name.includes(".alt")) this.isAlternate = !0;
			else if (this.name.includes(".liga") || this.name.includes(".dlig")) {
				this.isLigature = !0,
				this.ligatureType = this.name.split(".").pop();
				var n = this.name.split(".").shift();
				switch (n = n.replace(/_/g, "")) {
				case "ff":
					this.charcode = 64256;
					break;
				case "fi":
					this.charcode = 64257;
					break;
				case "fl":
					this.charcode = 64258;
					break;
				case "ffi":
					this.charcode = 64259;
					break;
				case "ffl":
					this.charcode = 64260;
					break;
				case "ft":
					this.charcode = 64261;
					break;
				case "st":
					this.charcode = 64262
				}
			}
			this.catKey = "Cn";
			for (var r in s.
		default) if (s.
		default[r].includes(this.charcode)) {
				this.catKey = r;
				break
			}
			var a = t.scale || 1;
			this.frame = t.frame || {
				x: 0,
				y: 0,
				w: 400 / a,
				h: 600 / a
			};
			this.path = t.path || {
				points: []
			},
			this.font = t.font || null;
			var o = void 0 !== t.metrics ? t.metrics: {},
			l = o.left,
			u = o.right,
			c = o.bottom,
			f = void 0 !== l && !isNaN(Number(l)),
			p = void 0 !== u && !isNaN(Number(u)),
			d = void 0 !== c && !isNaN(Number(c));
			switch (this.metrics = {
				left: f ? Number(l) : 50,
				right: p ? Number(u) : 50,
				bottom: d ? Number(c) : 0
			},
			this.name) {
			case "j":
				d && (this.metrics.bottom -= this.frame.h * a / 5);
				break;
			case "g":
			case "p":
			case "q":
			case "y":
				d && (this.metrics.bottom -= this.frame.h * a / 3)
			}
		}
		return (0, o.
	default)(e, [{
			key: "_createPath",
			value: function(e, t) {
				var n = new c.Path,
				r = t ? 0 : this.metrics.left,
				i = t ? 0 : this.metrics.bottom,
				o = !0,
				l = !1,
				s = void 0;
				try {
					for (var u, f = (0, a.
				default)(this.path.points); ! (o = (u = f.next()).done); o = !0) {
						var p = u.value;
						"M" === p.t ? n.moveTo(p.x * e + r, p.y * e + i) : "L" === p.t ? n.lineTo(p.x * e + r, p.y * e + i) : "C" === p.t ? n.curveTo(p.x1 * e + r, p.y1 * e + i, p.x2 * e + r, p.y2 * e + i, p.x * e + r, p.y * e + i) : "Z" === p.t && n.close()
					}
				} catch(e) {
					l = !0,
					s = e
				} finally {
					try { ! o && f.
						return && f.
						return ()
					} finally {
						if (l) throw s
					}
				}
				return n
			}
		},
		{
			key: "remove",
			value: function() {
				this.font && this.font.removeChild(this)
			}
		},
		{
			key: "id",
			get: function() {
				return this.name
			}
		},
		{
			key: "glyphId",
			get: function() {
				return this.index + 1
			}
		},
		{
			key: "css",
			get: function() {
				return "." + (this.font.prefix || "") + this.name + ':before {\n              content: "\\' + this.unicode.toLowerCase() + '";\n            }'
			}
		},
		{
			key: "html",
			get: function() {
				return u.
			default.encode(this.character).toLowerCase()
			}
		},
		{
			key: "div",
			get: function() {
				return '<span class="' + (this.font.prefix || "") + this.name + '"></span>'
			}
		},
		{
			key: "character",
			get: function() {
				return String.fromCharCode(this.charcode)
			}
		},
		{
			key: "unicode",
			get: function() {
				for (var e = this.charcode.toString(16).toUpperCase(); e.length < 4;) e = "0" + e;
				return e
			}
		},
		{
			key: "fullname",
			get: function() {
				var e = this.unicode;
				return l.
			default[e] && l.
			default[e].name || this.name || ""
			}
		},
		{
			key: "alternate",
			get: function() {
				if (!this.isAlternate) return null;
				var e = this.name.split(".").shift(),
				t = this.font.findById(e);
				return t ? {
					by: this.glyphId,
					sub: t.glyphId
				}: null
			}
		},
		{
			key: "ligature",
			get: function() {
				if (!this.isLigature || !this.ligatureType) return null;
				var e = [],
				t = this.name.split(".").shift();
				t = t.replace(/_/g, "");
				var n = !0,
				r = !1,
				i = void 0;
				try {
					for (var o, l = (0, a.
				default)(t); ! (n = (o = l.next()).done); n = !0) {
						var s = o.value,
						u = this.font.findById(s);
						if (!u) return null;
						e.push(u.glyphId)
					}
				} catch(e) {
					r = !0,
					i = e
				} finally {
					try { ! n && l.
						return && l.
						return ()
					} finally {
						if (r) throw i
					}
				}
				return {
					type: this.ligatureType,
					data: {
						sub: e,
						by: this.glyphId
					}
				}
			}
		},
		{
			key: "otPath",
			get: function() {
				var e = this.font && this.font.scale > 0 ? this.font.scale: 1;
				return this._createPath(e)
			}
		},
		{
			key: "svgPath",
			get: function() {
				if ("space" === this.name) return "";
				return this._createPath(1, !0).toPathData()
			}
		},
		{
			key: "advanceWidth",
			get: function() {
				var e = this.font && this.font.scale > 0 ? this.font.scale: 1;
				return this.metrics.left + parseInt(this.frame.w * e) + this.metrics.right
			}
		},
		{
			key: "data",
			get: function() {
				var e = new c.Path;
				return ".notdef" !== this.name && "space" !== this.name && (e = this.otPath),
				new c.Glyph({
					index: this.glyphId,
					name: this.fullname,
					unicode: this.charcode,
					path: e,
					advanceWidth: this.advanceWidth
				})
			}
		},
		{
			key: "index",
			get: function() {
				var e = -1;
				if (this.font) for (var t = this.font.glyphs,
				n = 0; n < t.length; n++) if (t[n].id === this.id) {
					e = n;
					break
				}
				return e
			}
		},
		{
			key: "nextSibling",
			get: function() {
				if (this.font) {
					var e = this.index;
					return e < this.font.count - 1 ? this.font.glyphs[e + 1] : null
				}
				return null
			}
		},
		{
			key: "previousSibling",
			get: function() {
				if (this.font) {
					var e = this.index;
					return e > 0 ? this.font.glyphs[e - 1] : null
				}
				return null
			}
		}]),
		e
	} ();
	t.
default = f
},
function(e, t) {
	e.exports = {
		2012 : {
			name: "figuredash",
			fullname: "Figure Dash"
		},
		2013 : {
			name: "endash",
			fullname: "En Dash"
		},
		2014 : {
			name: "emdash",
			fullname: "Em Dash"
		},
		2017 : {
			name: "underscoredbl",
			fullname: "Double Low Line"
		},
		2018 : {
			name: "quoteleft",
			fullname: "Left Single Quotation Mark"
		},
		2019 : {
			name: "quoteright",
			fullname: "Right Single Quotation Mark"
		},
		2020 : {
			name: "dagger",
			fullname: "Dagger"
		},
		2021 : {
			name: "daggerdbl",
			fullname: "Double Dagger"
		},
		2022 : {
			name: "bullet",
			fullname: "Bullet"
		},
		2024 : {
			name: "onedotenleader",
			fullname: "One Dot Leader"
		},
		2025 : {
			name: "twodotenleader",
			fullname: "Two Dot Leader"
		},
		2026 : {
			name: "ellipsis",
			fullname: "Horizontal Ellipsis"
		},
		2030 : {
			name: "perthousand",
			fullname: "Per Mille Sign"
		},
		2032 : {
			name: "minute",
			fullname: "Prime"
		},
		2033 : {
			name: "second",
			fullname: "Double Prime"
		},
		2039 : {
			name: "guilsinglleft",
			fullname: "Single Left-pointing Angle Quotation Mark"
		},
		2044 : {
			name: "fraction",
			fullname: "Fraction Slash"
		},
		2111 : {
			name: "Ifraktur",
			fullname: "Black-letter Capital I"
		},
		2118 : {
			name: "weierstrass",
			fullname: "Script Capital P"
		},
		2122 : {
			name: "trademark",
			fullname: "Trade Mark Sign"
		},
		2126 : {
			name: "Omega",
			fullname: "Ohm Sign"
		},
		2135 : {
			name: "aleph",
			fullname: "Alef Symbol"
		},
		2153 : {
			name: "onethird",
			fullname: "Vulgar Fraction One Third"
		},
		2154 : {
			name: "twothirds",
			fullname: "Vulgar Fraction Two Thirds"
		},
		2190 : {
			name: "arrowleft",
			fullname: "Leftwards Arrow"
		},
		2191 : {
			name: "arrowup",
			fullname: "Upwards Arrow"
		},
		2192 : {
			name: "arrowright",
			fullname: "Rightwards Arrow"
		},
		2193 : {
			name: "arrowdown",
			fullname: "Downwards Arrow"
		},
		2194 : {
			name: "arrowboth",
			fullname: "Left Right Arrow"
		},
		2195 : {
			name: "arrowupdn",
			fullname: "Up Down Arrow"
		},
		2200 : {
			name: "universal",
			fullname: "For All"
		},
		2202 : {
			name: "partialdiff",
			fullname: "Partial Differential"
		},
		2203 : {
			name: "existential",
			fullname: "There Exists"
		},
		2205 : {
			name: "emptyset",
			fullname: "Empty Set"
		},
		2206 : {
			name: "Delta",
			fullname: "Increment"
		},
		2207 : {
			name: "gradient",
			fullname: "Nabla"
		},
		2208 : {
			name: "element",
			fullname: "Element Of"
		},
		2209 : {
			name: "notelement",
			fullname: "Not An Element Of"
		},
		2211 : {
			name: "summation",
			fullname: "N-ary Summation"
		},
		2212 : {
			name: "minus",
			fullname: "Minus Sign"
		},
		2217 : {
			name: "asteriskmath",
			fullname: "Asterisk Operator"
		},
		2220 : {
			name: "angle",
			fullname: "Angle"
		},
		2227 : {
			name: "logicaland",
			fullname: "Logical And"
		},
		2228 : {
			name: "logicalor",
			fullname: "Logical Or"
		},
		2229 : {
			name: "intersection",
			fullname: "Intersection"
		},
		2234 : {
			name: "therefore",
			fullname: "Therefore"
		},
		2245 : {
			name: "congruent",
			fullname: "Approximately Equal To"
		},
		2248 : {
			name: "approxequal",
			fullname: "Almost Equal To"
		},
		2260 : {
			name: "notequal",
			fullname: "Not Equal To"
		},
		2261 : {
			name: "equivalence",
			fullname: "Identical To"
		},
		2264 : {
			name: "lessequal",
			fullname: "Less-than Or Equal To"
		},
		2265 : {
			name: "greaterequal",
			fullname: "Greater-than Or Equal To"
		},
		2282 : {
			name: "propersubset",
			fullname: "Subset Of"
		},
		2283 : {
			name: "propersuperset",
			fullname: "Superset Of"
		},
		2284 : {
			name: "notsubset",
			fullname: "Not A Subset Of"
		},
		2286 : {
			name: "reflexsubset",
			fullname: "Subset Of Or Equal To"
		},
		2287 : {
			name: "reflexsuperset",
			fullname: "Superset Of Or Equal To"
		},
		2295 : {
			name: "circleplus",
			fullname: "Circled Plus"
		},
		2297 : {
			name: "circlemultiply",
			fullname: "Circled Times"
		},
		2302 : {
			name: "house",
			fullname: "House"
		},
		2310 : {
			name: "revlogicalnot",
			fullname: "Reversed Not Sign"
		},
		2320 : {
			name: "integraltp",
			fullname: "Top Half Integral"
		},
		2321 : {
			name: "integralbt",
			fullname: "Bottom Half Integral"
		},
		2329 : {
			name: "angleleft",
			fullname: "Left-pointing Angle Bracket"
		},
		2500 : {
			name: "SF100000",
			fullname: "Box Drawings Light Horizontal"
		},
		2502 : {
			name: "SF110000",
			fullname: "Box Drawings Light Vertical"
		},
		2510 : {
			name: "SF030000",
			fullname: "Box Drawings Light Down And Left"
		},
		2514 : {
			name: "SF020000",
			fullname: "Box Drawings Light Up And Right"
		},
		2518 : {
			name: "SF040000",
			fullname: "Box Drawings Light Up And Left"
		},
		2524 : {
			name: "SF090000",
			fullname: "Box Drawings Light Vertical And Left"
		},
		2534 : {
			name: "SF070000",
			fullname: "Box Drawings Light Up And Horizontal"
		},
		2550 : {
			name: "SF430000",
			fullname: "Box Drawings Double Horizontal"
		},
		2551 : {
			name: "SF240000",
			fullname: "Box Drawings Double Vertical"
		},
		2552 : {
			name: "SF510000",
			fullname: "Box Drawings Down Single And Right Double"
		},
		2553 : {
			name: "SF520000",
			fullname: "Box Drawings Down Double And Right Single"
		},
		2554 : {
			name: "SF390000",
			fullname: "Box Drawings Double Down And Right"
		},
		2555 : {
			name: "SF220000",
			fullname: "Box Drawings Down Single And Left Double"
		},
		2556 : {
			name: "SF210000",
			fullname: "Box Drawings Down Double And Left Single"
		},
		2557 : {
			name: "SF250000",
			fullname: "Box Drawings Double Down And Left"
		},
		2558 : {
			name: "SF500000",
			fullname: "Box Drawings Up Single And Right Double"
		},
		2559 : {
			name: "SF490000",
			fullname: "Box Drawings Up Double And Right Single"
		},
		2560 : {
			name: "SF420000",
			fullname: "Box Drawings Double Vertical And Right"
		},
		2561 : {
			name: "SF190000",
			fullname: "Box Drawings Vertical Single And Left Double"
		},
		2562 : {
			name: "SF200000",
			fullname: "Box Drawings Vertical Double And Left Single"
		},
		2563 : {
			name: "SF230000",
			fullname: "Box Drawings Double Vertical And Left"
		},
		2564 : {
			name: "SF470000",
			fullname: "Box Drawings Down Single And Horizontal Double"
		},
		2565 : {
			name: "SF480000",
			fullname: "Box Drawings Down Double And Horizontal Single"
		},
		2566 : {
			name: "SF410000",
			fullname: "Box Drawings Double Down And Horizontal"
		},
		2567 : {
			name: "SF450000",
			fullname: "Box Drawings Up Single And Horizontal Double"
		},
		2568 : {
			name: "SF460000",
			fullname: "Box Drawings Up Double And Horizontal Single"
		},
		2569 : {
			name: "SF400000",
			fullname: "Box Drawings Double Up And Horizontal"
		},
		2580 : {
			name: "upblock",
			fullname: "Upper Half Block"
		},
		2584 : {
			name: "dnblock",
			fullname: "Lower Half Block"
		},
		2588 : {
			name: "block",
			fullname: "Full Block"
		},
		2590 : {
			name: "rtblock",
			fullname: "Right Half Block"
		},
		2591 : {
			name: "ltshade",
			fullname: "Light Shade"
		},
		2592 : {
			name: "shade",
			fullname: "Medium Shade"
		},
		2593 : {
			name: "dkshade",
			fullname: "Dark Shade"
		},
		2640 : {
			name: "female",
			fullname: "Female Sign"
		},
		2642 : {
			name: "male",
			fullname: "Male Sign"
		},
		2660 : {
			name: "spade",
			fullname: "Black Spade Suit"
		},
		2663 : {
			name: "club",
			fullname: "Black Club Suit"
		},
		2665 : {
			name: "heart",
			fullname: "Black Heart Suit"
		},
		2666 : {
			name: "diamond",
			fullname: "Black Diamond Suit"
		},
		"0041": {
			name: "A",
			fullname: "Latin Capital Letter A"
		},
		"00C6": {
			name: "AE",
			fullname: "Latin Capital Letter Ae"
		},
		"01FC": {
			name: "AEacute",
			fullname: "Latin Capital Letter Ae With Acute"
		},
		"00C1": {
			name: "Aacute",
			fullname: "Latin Capital Letter A With Acute"
		},
		"0102": {
			name: "Abreve",
			fullname: "Latin Capital Letter A With Breve"
		},
		"00C2": {
			name: "Acircumflex",
			fullname: "Latin Capital Letter A With Circumflex"
		},
		"00C4": {
			name: "Adieresis",
			fullname: "Latin Capital Letter A With Diaeresis"
		},
		"00C0": {
			name: "Agrave",
			fullname: "Latin Capital Letter A With Grave"
		},
		"0391": {
			name: "Alpha",
			fullname: "Greek Capital Letter Alpha"
		},
		"0386": {
			name: "Alphatonos",
			fullname: "Greek Capital Letter Alpha With Tonos"
		},
		"0100": {
			name: "Amacron",
			fullname: "Latin Capital Letter A With Macron"
		},
		"0104": {
			name: "Aogonek",
			fullname: "Latin Capital Letter A With Ogonek"
		},
		"00C5": {
			name: "Aring",
			fullname: "Latin Capital Letter A With Ring Above"
		},
		"01FA": {
			name: "Aringacute",
			fullname: "Latin Capital Letter A With Ring Above And Acute"
		},
		"00C3": {
			name: "Atilde",
			fullname: "Latin Capital Letter A With Tilde"
		},
		"0042": {
			name: "B",
			fullname: "Latin Capital Letter B"
		},
		"0392": {
			name: "Beta",
			fullname: "Greek Capital Letter Beta"
		},
		"0043": {
			name: "C",
			fullname: "Latin Capital Letter C"
		},
		"0106": {
			name: "Cacute",
			fullname: "Latin Capital Letter C With Acute"
		},
		"010C": {
			name: "Ccaron",
			fullname: "Latin Capital Letter C With Caron"
		},
		"00C7": {
			name: "Ccedilla",
			fullname: "Latin Capital Letter C With Cedilla"
		},
		"0108": {
			name: "Ccircumflex",
			fullname: "Latin Capital Letter C With Circumflex"
		},
		"010A": {
			name: "Cdotaccent",
			fullname: "Latin Capital Letter C With Dot Above"
		},
		"03A7": {
			name: "Chi",
			fullname: "Greek Capital Letter Chi"
		},
		"0044": {
			name: "D",
			fullname: "Latin Capital Letter D"
		},
		"010E": {
			name: "Dcaron",
			fullname: "Latin Capital Letter D With Caron"
		},
		"0110": {
			name: "Dcroat",
			fullname: "Latin Capital Letter D With Stroke"
		},
		"0045": {
			name: "E",
			fullname: "Latin Capital Letter E"
		},
		"00C9": {
			name: "Eacute",
			fullname: "Latin Capital Letter E With Acute"
		},
		"0114": {
			name: "Ebreve",
			fullname: "Latin Capital Letter E With Breve"
		},
		"011A": {
			name: "Ecaron",
			fullname: "Latin Capital Letter E With Caron"
		},
		"00CA": {
			name: "Ecircumflex",
			fullname: "Latin Capital Letter E With Circumflex"
		},
		"00CB": {
			name: "Edieresis",
			fullname: "Latin Capital Letter E With Diaeresis"
		},
		"0116": {
			name: "Edotaccent",
			fullname: "Latin Capital Letter E With Dot Above"
		},
		"00C8": {
			name: "Egrave",
			fullname: "Latin Capital Letter E With Grave"
		},
		"0112": {
			name: "Emacron",
			fullname: "Latin Capital Letter E With Macron"
		},
		"014A": {
			name: "Eng",
			fullname: "Latin Capital Letter Eng"
		},
		"0118": {
			name: "Eogonek",
			fullname: "Latin Capital Letter E With Ogonek"
		},
		"0395": {
			name: "Epsilon",
			fullname: "Greek Capital Letter Epsilon"
		},
		"0388": {
			name: "Epsilontonos",
			fullname: "Greek Capital Letter Epsilon With Tonos"
		},
		"0397": {
			name: "Eta",
			fullname: "Greek Capital Letter Eta"
		},
		"0389": {
			name: "Etatonos",
			fullname: "Greek Capital Letter Eta With Tonos"
		},
		"00D0": {
			name: "Eth",
			fullname: "Latin Capital Letter Eth"
		},
		"20AC": {
			name: "Euro",
			fullname: "Euro Sign"
		},
		"0046": {
			name: "F",
			fullname: "Latin Capital Letter F"
		},
		"0047": {
			name: "G",
			fullname: "Latin Capital Letter G"
		},
		"0393": {
			name: "Gamma",
			fullname: "Greek Capital Letter Gamma"
		},
		"011E": {
			name: "Gbreve",
			fullname: "Latin Capital Letter G With Breve"
		},
		"01E6": {
			name: "Gcaron",
			fullname: "Latin Capital Letter G With Caron"
		},
		"011C": {
			name: "Gcircumflex",
			fullname: "Latin Capital Letter G With Circumflex"
		},
		"0120": {
			name: "Gdotaccent",
			fullname: "Latin Capital Letter G With Dot Above"
		},
		"0048": {
			name: "H",
			fullname: "Latin Capital Letter H"
		},
		"25CF": {
			name: "H18533",
			fullname: "Black Circle"
		},
		"25AA": {
			name: "H18543",
			fullname: "Black Small Square"
		},
		"25AB": {
			name: "H18551",
			fullname: "White Small Square"
		},
		"25A1": {
			name: "H22073",
			fullname: "White Square"
		},
		"0126": {
			name: "Hbar",
			fullname: "Latin Capital Letter H With Stroke"
		},
		"0124": {
			name: "Hcircumflex",
			fullname: "Latin Capital Letter H With Circumflex"
		},
		"0049": {
			name: "I",
			fullname: "Latin Capital Letter I"
		},
		"0132": {
			name: "IJ",
			fullname: "Latin Capital Ligature Ij"
		},
		"00CD": {
			name: "Iacute",
			fullname: "Latin Capital Letter I With Acute"
		},
		"012C": {
			name: "Ibreve",
			fullname: "Latin Capital Letter I With Breve"
		},
		"00CE": {
			name: "Icircumflex",
			fullname: "Latin Capital Letter I With Circumflex"
		},
		"00CF": {
			name: "Idieresis",
			fullname: "Latin Capital Letter I With Diaeresis"
		},
		"0130": {
			name: "Idotaccent",
			fullname: "Latin Capital Letter I With Dot Above"
		},
		"00CC": {
			name: "Igrave",
			fullname: "Latin Capital Letter I With Grave"
		},
		"012A": {
			name: "Imacron",
			fullname: "Latin Capital Letter I With Macron"
		},
		"012E": {
			name: "Iogonek",
			fullname: "Latin Capital Letter I With Ogonek"
		},
		"0399": {
			name: "Iota",
			fullname: "Greek Capital Letter Iota"
		},
		"03AA": {
			name: "Iotadieresis",
			fullname: "Greek Capital Letter Iota With Dialytika"
		},
		"038A": {
			name: "Iotatonos",
			fullname: "Greek Capital Letter Iota With Tonos"
		},
		"0128": {
			name: "Itilde",
			fullname: "Latin Capital Letter I With Tilde"
		},
		"004A": {
			name: "J",
			fullname: "Latin Capital Letter J"
		},
		"0134": {
			name: "Jcircumflex",
			fullname: "Latin Capital Letter J With Circumflex"
		},
		"004B": {
			name: "K",
			fullname: "Latin Capital Letter K"
		},
		"039A": {
			name: "Kappa",
			fullname: "Greek Capital Letter Kappa"
		},
		"004C": {
			name: "L",
			fullname: "Latin Capital Letter L"
		},
		"0139": {
			name: "Lacute",
			fullname: "Latin Capital Letter L With Acute"
		},
		"039B": {
			name: "Lambda",
			fullname: "Greek Capital Letter Lamda"
		},
		"013D": {
			name: "Lcaron",
			fullname: "Latin Capital Letter L With Caron"
		},
		"013F": {
			name: "Ldot",
			fullname: "Latin Capital Letter L With Middle Dot"
		},
		"0141": {
			name: "Lslash",
			fullname: "Latin Capital Letter L With Stroke"
		},
		"004D": {
			name: "M",
			fullname: "Latin Capital Letter M"
		},
		"039C": {
			name: "Mu",
			fullname: "Greek Capital Letter Mu"
		},
		"004E": {
			name: "N",
			fullname: "Latin Capital Letter N"
		},
		"0143": {
			name: "Nacute",
			fullname: "Latin Capital Letter N With Acute"
		},
		"0147": {
			name: "Ncaron",
			fullname: "Latin Capital Letter N With Caron"
		},
		"00D1": {
			name: "Ntilde",
			fullname: "Latin Capital Letter N With Tilde"
		},
		"039D": {
			name: "Nu",
			fullname: "Greek Capital Letter Nu"
		},
		"004F": {
			name: "O",
			fullname: "Latin Capital Letter O"
		},
		"0152": {
			name: "OE",
			fullname: "Latin Capital Ligature Oe"
		},
		"00D3": {
			name: "Oacute",
			fullname: "Latin Capital Letter O With Acute"
		},
		"014E": {
			name: "Obreve",
			fullname: "Latin Capital Letter O With Breve"
		},
		"00D4": {
			name: "Ocircumflex",
			fullname: "Latin Capital Letter O With Circumflex"
		},
		"00D6": {
			name: "Odieresis",
			fullname: "Latin Capital Letter O With Diaeresis"
		},
		"00D2": {
			name: "Ograve",
			fullname: "Latin Capital Letter O With Grave"
		},
		"01A0": {
			name: "Ohorn",
			fullname: "Latin Capital Letter O With Horn"
		},
		"0150": {
			name: "Ohungarumlaut",
			fullname: "Latin Capital Letter O With Double Acute"
		},
		"014C": {
			name: "Omacron",
			fullname: "Latin Capital Letter O With Macron"
		},
		"038F": {
			name: "Omegatonos",
			fullname: "Greek Capital Letter Omega With Tonos"
		},
		"039F": {
			name: "Omicron",
			fullname: "Greek Capital Letter Omicron"
		},
		"038C": {
			name: "Omicrontonos",
			fullname: "Greek Capital Letter Omicron With Tonos"
		},
		"00D8": {
			name: "Oslash",
			fullname: "Latin Capital Letter O With Stroke"
		},
		"01FE": {
			name: "Oslashacute",
			fullname: "Latin Capital Letter O With Stroke And Acute"
		},
		"00D5": {
			name: "Otilde",
			fullname: "Latin Capital Letter O With Tilde"
		},
		"0050": {
			name: "P",
			fullname: "Latin Capital Letter P"
		},
		"03A6": {
			name: "Phi",
			fullname: "Greek Capital Letter Phi"
		},
		"03A0": {
			name: "Pi",
			fullname: "Greek Capital Letter Pi"
		},
		"03A8": {
			name: "Psi",
			fullname: "Greek Capital Letter Psi"
		},
		"0051": {
			name: "Q",
			fullname: "Latin Capital Letter Q"
		},
		"0052": {
			name: "R",
			fullname: "Latin Capital Letter R"
		},
		"0154": {
			name: "Racute",
			fullname: "Latin Capital Letter R With Acute"
		},
		"0158": {
			name: "Rcaron",
			fullname: "Latin Capital Letter R With Caron"
		},
		"211C": {
			name: "Rfraktur",
			fullname: "Black-letter Capital R"
		},
		"03A1": {
			name: "Rho",
			fullname: "Greek Capital Letter Rho"
		},
		"0053": {
			name: "S",
			fullname: "Latin Capital Letter S"
		},
		"250C": {
			name: "SF010000",
			fullname: "Box Drawings Light Down And Right"
		},
		"253C": {
			name: "SF050000",
			fullname: "Box Drawings Light Vertical And Horizontal"
		},
		"252C": {
			name: "SF060000",
			fullname: "Box Drawings Light Down And Horizontal"
		},
		"251C": {
			name: "SF080000",
			fullname: "Box Drawings Light Vertical And Right"
		},
		"255D": {
			name: "SF260000",
			fullname: "Box Drawings Double Up And Left"
		},
		"255C": {
			name: "SF270000",
			fullname: "Box Drawings Up Double And Left Single"
		},
		"255B": {
			name: "SF280000",
			fullname: "Box Drawings Up Single And Left Double"
		},
		"255E": {
			name: "SF360000",
			fullname: "Box Drawings Vertical Single And Right Double"
		},
		"255F": {
			name: "SF370000",
			fullname: "Box Drawings Vertical Double And Right Single"
		},
		"255A": {
			name: "SF380000",
			fullname: "Box Drawings Double Up And Right"
		},
		"256C": {
			name: "SF440000",
			fullname: "Box Drawings Double Vertical And Horizontal"
		},
		"256B": {
			name: "SF530000",
			fullname: "Box Drawings Vertical Double And Horizontal Single"
		},
		"256A": {
			name: "SF540000",
			fullname: "Box Drawings Vertical Single And Horizontal Double"
		},
		"015A": {
			name: "Sacute",
			fullname: "Latin Capital Letter S With Acute"
		},
		"0160": {
			name: "Scaron",
			fullname: "Latin Capital Letter S With Caron"
		},
		"015E": {
			name: "Scedilla",
			fullname: "Latin Capital Letter S With Cedilla"
		},
		"015C": {
			name: "Scircumflex",
			fullname: "Latin Capital Letter S With Circumflex"
		},
		"03A3": {
			name: "Sigma",
			fullname: "Greek Capital Letter Sigma"
		},
		"0054": {
			name: "T",
			fullname: "Latin Capital Letter T"
		},
		"03A4": {
			name: "Tau",
			fullname: "Greek Capital Letter Tau"
		},
		"0166": {
			name: "Tbar",
			fullname: "Latin Capital Letter T With Stroke"
		},
		"0164": {
			name: "Tcaron",
			fullname: "Latin Capital Letter T With Caron"
		},
		"0398": {
			name: "Theta",
			fullname: "Greek Capital Letter Theta"
		},
		"00DE": {
			name: "Thorn",
			fullname: "Latin Capital Letter Thorn"
		},
		"0055": {
			name: "U",
			fullname: "Latin Capital Letter U"
		},
		"00DA": {
			name: "Uacute",
			fullname: "Latin Capital Letter U With Acute"
		},
		"016C": {
			name: "Ubreve",
			fullname: "Latin Capital Letter U With Breve"
		},
		"00DB": {
			name: "Ucircumflex",
			fullname: "Latin Capital Letter U With Circumflex"
		},
		"00DC": {
			name: "Udieresis",
			fullname: "Latin Capital Letter U With Diaeresis"
		},
		"00D9": {
			name: "Ugrave",
			fullname: "Latin Capital Letter U With Grave"
		},
		"01AF": {
			name: "Uhorn",
			fullname: "Latin Capital Letter U With Horn"
		},
		"0170": {
			name: "Uhungarumlaut",
			fullname: "Latin Capital Letter U With Double Acute"
		},
		"016A": {
			name: "Umacron",
			fullname: "Latin Capital Letter U With Macron"
		},
		"0172": {
			name: "Uogonek",
			fullname: "Latin Capital Letter U With Ogonek"
		},
		"03A5": {
			name: "Upsilon",
			fullname: "Greek Capital Letter Upsilon"
		},
		"03D2": {
			name: "Upsilon1",
			fullname: "Greek Upsilon With Hook Symbol"
		},
		"03AB": {
			name: "Upsilondieresis",
			fullname: "Greek Capital Letter Upsilon With Dialytika"
		},
		"038E": {
			name: "Upsilontonos",
			fullname: "Greek Capital Letter Upsilon With Tonos"
		},
		"016E": {
			name: "Uring",
			fullname: "Latin Capital Letter U With Ring Above"
		},
		"0168": {
			name: "Utilde",
			fullname: "Latin Capital Letter U With Tilde"
		},
		"0056": {
			name: "V",
			fullname: "Latin Capital Letter V"
		},
		"0057": {
			name: "W",
			fullname: "Latin Capital Letter W"
		},
		"1E82": {
			name: "Wacute",
			fullname: "Latin Capital Letter W With Acute"
		},
		"0174": {
			name: "Wcircumflex",
			fullname: "Latin Capital Letter W With Circumflex"
		},
		"1E84": {
			name: "Wdieresis",
			fullname: "Latin Capital Letter W With Diaeresis"
		},
		"1E80": {
			name: "Wgrave",
			fullname: "Latin Capital Letter W With Grave"
		},
		"0058": {
			name: "X",
			fullname: "Latin Capital Letter X"
		},
		"039E": {
			name: "Xi",
			fullname: "Greek Capital Letter Xi"
		},
		"0059": {
			name: "Y",
			fullname: "Latin Capital Letter Y"
		},
		"00DD": {
			name: "Yacute",
			fullname: "Latin Capital Letter Y With Acute"
		},
		"0176": {
			name: "Ycircumflex",
			fullname: "Latin Capital Letter Y With Circumflex"
		},
		"0178": {
			name: "Ydieresis",
			fullname: "Latin Capital Letter Y With Diaeresis"
		},
		"1EF2": {
			name: "Ygrave",
			fullname: "Latin Capital Letter Y With Grave"
		},
		"005A": {
			name: "Z",
			fullname: "Latin Capital Letter Z"
		},
		"0179": {
			name: "Zacute",
			fullname: "Latin Capital Letter Z With Acute"
		},
		"017D": {
			name: "Zcaron",
			fullname: "Latin Capital Letter Z With Caron"
		},
		"017B": {
			name: "Zdotaccent",
			fullname: "Latin Capital Letter Z With Dot Above"
		},
		"0396": {
			name: "Zeta",
			fullname: "Greek Capital Letter Zeta"
		},
		"0061": {
			name: "a",
			fullname: "Latin Small Letter A"
		},
		"00E1": {
			name: "aacute",
			fullname: "Latin Small Letter A With Acute"
		},
		"0103": {
			name: "abreve",
			fullname: "Latin Small Letter A With Breve"
		},
		"00E2": {
			name: "acircumflex",
			fullname: "Latin Small Letter A With Circumflex"
		},
		"00B4": {
			name: "acute",
			fullname: "Acute Accent"
		},
		"0301": {
			name: "acutecomb",
			fullname: "Combining Acute Accent"
		},
		"00E4": {
			name: "adieresis",
			fullname: "Latin Small Letter A With Diaeresis"
		},
		"00E6": {
			name: "ae",
			fullname: "Latin Small Letter Ae"
		},
		"01FD": {
			name: "aeacute",
			fullname: "Latin Small Letter Ae With Acute"
		},
		"00E0": {
			name: "agrave",
			fullname: "Latin Small Letter A With Grave"
		},
		"03B1": {
			name: "alpha",
			fullname: "Greek Small Letter Alpha"
		},
		"03AC": {
			name: "alphatonos",
			fullname: "Greek Small Letter Alpha With Tonos"
		},
		"0101": {
			name: "amacron",
			fullname: "Latin Small Letter A With Macron"
		},
		"0026": {
			name: "ampersand",
			fullname: "Ampersand"
		},
		"232A": {
			name: "angleright",
			fullname: "Right-pointing Angle Bracket"
		},
		"0387": {
			name: "anoteleia",
			fullname: "Greek Ano Teleia"
		},
		"0105": {
			name: "aogonek",
			fullname: "Latin Small Letter A With Ogonek"
		},
		"00E5": {
			name: "aring",
			fullname: "Latin Small Letter A With Ring Above"
		},
		"01FB": {
			name: "aringacute",
			fullname: "Latin Small Letter A With Ring Above And Acute"
		},
		"21D4": {
			name: "arrowdblboth",
			fullname: "Left Right Double Arrow"
		},
		"21D3": {
			name: "arrowdbldown",
			fullname: "Downwards Double Arrow"
		},
		"21D0": {
			name: "arrowdblleft",
			fullname: "Leftwards Double Arrow"
		},
		"21D2": {
			name: "arrowdblright",
			fullname: "Rightwards Double Arrow"
		},
		"21D1": {
			name: "arrowdblup",
			fullname: "Upwards Double Arrow"
		},
		"21A8": {
			name: "arrowupdnbse",
			fullname: "Up Down Arrow With Base"
		},
		"005E": {
			name: "asciicircum",
			fullname: "Circumflex Accent"
		},
		"007E": {
			name: "asciitilde",
			fullname: "Tilde"
		},
		"002A": {
			name: "asterisk",
			fullname: "Asterisk"
		},
		"0040": {
			name: "at",
			fullname: "Commercial At"
		},
		"00E3": {
			name: "atilde",
			fullname: "Latin Small Letter A With Tilde"
		},
		"0062": {
			name: "b",
			fullname: "Latin Small Letter B"
		},
		"005C": {
			name: "backslash",
			fullname: "Reverse Solidus"
		},
		"007C": {
			name: "bar",
			fullname: "Vertical Line"
		},
		"03B2": {
			name: "beta",
			fullname: "Greek Small Letter Beta"
		},
		"007B": {
			name: "braceleft",
			fullname: "Left Curly Bracket"
		},
		"007D": {
			name: "braceright",
			fullname: "Right Curly Bracket"
		},
		"005B": {
			name: "bracketleft",
			fullname: "Left Square Bracket"
		},
		"005D": {
			name: "bracketright",
			fullname: "Right Square Bracket"
		},
		"02D8": {
			name: "breve",
			fullname: "Breve"
		},
		"00A6": {
			name: "brokenbar",
			fullname: "Broken Bar"
		},
		"0063": {
			name: "c",
			fullname: "Latin Small Letter C"
		},
		"0107": {
			name: "cacute",
			fullname: "Latin Small Letter C With Acute"
		},
		"02C7": {
			name: "caron",
			fullname: "Caron"
		},
		"21B5": {
			name: "carriagereturn",
			fullname: "Downwards Arrow With Corner Leftwards"
		},
		"010D": {
			name: "ccaron",
			fullname: "Latin Small Letter C With Caron"
		},
		"00E7": {
			name: "ccedilla",
			fullname: "Latin Small Letter C With Cedilla"
		},
		"0109": {
			name: "ccircumflex",
			fullname: "Latin Small Letter C With Circumflex"
		},
		"010B": {
			name: "cdotaccent",
			fullname: "Latin Small Letter C With Dot Above"
		},
		"00B8": {
			name: "cedilla",
			fullname: "Cedilla"
		},
		"00A2": {
			name: "cent",
			fullname: "Cent Sign"
		},
		"03C7": {
			name: "chi",
			fullname: "Greek Small Letter Chi"
		},
		"25CB": {
			name: "circle",
			fullname: "White Circle"
		},
		"02C6": {
			name: "circumflex",
			fullname: "Modifier Letter Circumflex Accent"
		},
		"003A": {
			name: "colon",
			fullname: "Colon"
		},
		"20A1": {
			name: "colonmonetary",
			fullname: "Colon Sign"
		},
		"002C": {
			name: "comma",
			fullname: "Comma"
		},
		"00A9": {
			name: "copyright",
			fullname: "Copyright Sign"
		},
		"00A4": {
			name: "currency",
			fullname: "Currency Sign"
		},
		"0064": {
			name: "d",
			fullname: "Latin Small Letter D"
		},
		"010F": {
			name: "dcaron",
			fullname: "Latin Small Letter D With Caron"
		},
		"0111": {
			name: "dcroat",
			fullname: "Latin Small Letter D With Stroke"
		},
		"00B0": {
			name: "degree",
			fullname: "Degree Sign"
		},
		"03B4": {
			name: "delta",
			fullname: "Greek Small Letter Delta"
		},
		"00A8": {
			name: "dieresis",
			fullname: "Diaeresis"
		},
		"0385": {
			name: "dieresistonos",
			fullname: "Greek Dialytika Tonos"
		},
		"00F7": {
			name: "divide",
			fullname: "Division Sign"
		},
		"0024": {
			name: "dollar",
			fullname: "Dollar Sign"
		},
		"20AB": {
			name: "dong",
			fullname: "Dong Sign"
		},
		"02D9": {
			name: "dotaccent",
			fullname: "Dot Above"
		},
		"0323": {
			name: "dotbelowcomb",
			fullname: "Combining Dot Below"
		},
		"0131": {
			name: "dotlessi",
			fullname: "Latin Small Letter Dotless I"
		},
		"22C5": {
			name: "dotmath",
			fullname: "Dot Operator"
		},
		"0065": {
			name: "e",
			fullname: "Latin Small Letter E"
		},
		"00E9": {
			name: "eacute",
			fullname: "Latin Small Letter E With Acute"
		},
		"0115": {
			name: "ebreve",
			fullname: "Latin Small Letter E With Breve"
		},
		"011B": {
			name: "ecaron",
			fullname: "Latin Small Letter E With Caron"
		},
		"00EA": {
			name: "ecircumflex",
			fullname: "Latin Small Letter E With Circumflex"
		},
		"00EB": {
			name: "edieresis",
			fullname: "Latin Small Letter E With Diaeresis"
		},
		"0117": {
			name: "edotaccent",
			fullname: "Latin Small Letter E With Dot Above"
		},
		"00E8": {
			name: "egrave",
			fullname: "Latin Small Letter E With Grave"
		},
		"0038": {
			name: "eight",
			fullname: "Digit Eight"
		},
		"0113": {
			name: "emacron",
			fullname: "Latin Small Letter E With Macron"
		},
		"014B": {
			name: "eng",
			fullname: "Latin Small Letter Eng"
		},
		"0119": {
			name: "eogonek",
			fullname: "Latin Small Letter E With Ogonek"
		},
		"03B5": {
			name: "epsilon",
			fullname: "Greek Small Letter Epsilon"
		},
		"03AD": {
			name: "epsilontonos",
			fullname: "Greek Small Letter Epsilon With Tonos"
		},
		"003D": {
			name: "equal",
			fullname: "Equals Sign"
		},
		"212E": {
			name: "estimated",
			fullname: "Estimated Symbol"
		},
		"03B7": {
			name: "eta",
			fullname: "Greek Small Letter Eta"
		},
		"03AE": {
			name: "etatonos",
			fullname: "Greek Small Letter Eta With Tonos"
		},
		"00F0": {
			name: "eth",
			fullname: "Latin Small Letter Eth"
		},
		"0021": {
			name: "exclam",
			fullname: "Exclamation Mark"
		},
		"203C": {
			name: "exclamdbl",
			fullname: "Double Exclamation Mark"
		},
		"00A1": {
			name: "exclamdown",
			fullname: "Inverted Exclamation Mark"
		},
		"0066": {
			name: "f",
			fullname: "Latin Small Letter F"
		},
		"25A0": {
			name: "filledbox",
			fullname: "Black Square"
		},
		"25AC": {
			name: "filledrect",
			fullname: "Black Rectangle"
		},
		"0035": {
			name: "five",
			fullname: "Digit Five"
		},
		"215D": {
			name: "fiveeighths",
			fullname: "Vulgar Fraction Five Eighths"
		},
		"0192": {
			name: "florin",
			fullname: "Latin Small Letter F With Hook"
		},
		"0034": {
			name: "four",
			fullname: "Digit Four"
		},
		"20A3": {
			name: "franc",
			fullname: "French Franc Sign"
		},
		"0067": {
			name: "g",
			fullname: "Latin Small Letter G"
		},
		"03B3": {
			name: "gamma",
			fullname: "Greek Small Letter Gamma"
		},
		"011F": {
			name: "gbreve",
			fullname: "Latin Small Letter G With Breve"
		},
		"01E7": {
			name: "gcaron",
			fullname: "Latin Small Letter G With Caron"
		},
		"011D": {
			name: "gcircumflex",
			fullname: "Latin Small Letter G With Circumflex"
		},
		"0121": {
			name: "gdotaccent",
			fullname: "Latin Small Letter G With Dot Above"
		},
		"00DF": {
			name: "germandbls",
			fullname: "Latin Small Letter Sharp S"
		},
		"0060": {
			name: "grave",
			fullname: "Grave Accent"
		},
		"0300": {
			name: "gravecomb",
			fullname: "Combining Grave Accent"
		},
		"003E": {
			name: "greater",
			fullname: "Greater-than Sign"
		},
		"00AB": {
			name: "guillemotleft",
			fullname: "Left-pointing Double Angle Quotation Mark"
		},
		"00BB": {
			name: "guillemotright",
			fullname: "Right-pointing Double Angle Quotation Mark"
		},
		"203A": {
			name: "guilsinglright",
			fullname: "Single Right-pointing Angle Quotation Mark"
		},
		"0068": {
			name: "h",
			fullname: "Latin Small Letter H"
		},
		"0127": {
			name: "hbar",
			fullname: "Latin Small Letter H With Stroke"
		},
		"0125": {
			name: "hcircumflex",
			fullname: "Latin Small Letter H With Circumflex"
		},
		"0309": {
			name: "hookabovecomb",
			fullname: "Combining Hook Above"
		},
		"02DD": {
			name: "hungarumlaut",
			fullname: "Double Acute Accent"
		},
		"002D": {
			name: "hyphen",
			fullname: "Hyphen-minus"
		},
		"0069": {
			name: "i",
			fullname: "Latin Small Letter I"
		},
		"00ED": {
			name: "iacute",
			fullname: "Latin Small Letter I With Acute"
		},
		"012D": {
			name: "ibreve",
			fullname: "Latin Small Letter I With Breve"
		},
		"00EE": {
			name: "icircumflex",
			fullname: "Latin Small Letter I With Circumflex"
		},
		"00EF": {
			name: "idieresis",
			fullname: "Latin Small Letter I With Diaeresis"
		},
		"00EC": {
			name: "igrave",
			fullname: "Latin Small Letter I With Grave"
		},
		"0133": {
			name: "ij",
			fullname: "Latin Small Ligature Ij"
		},
		"012B": {
			name: "imacron",
			fullname: "Latin Small Letter I With Macron"
		},
		"221E": {
			name: "infinity",
			fullname: "Infinity"
		},
		"222B": {
			name: "integral",
			fullname: "Integral"
		},
		"25D8": {
			name: "invbullet",
			fullname: "Inverse Bullet"
		},
		"25D9": {
			name: "invcircle",
			fullname: "Inverse White Circle"
		},
		"263B": {
			name: "invsmileface",
			fullname: "Black Smiling Face"
		},
		"012F": {
			name: "iogonek",
			fullname: "Latin Small Letter I With Ogonek"
		},
		"03B9": {
			name: "iota",
			fullname: "Greek Small Letter Iota"
		},
		"03CA": {
			name: "iotadieresis",
			fullname: "Greek Small Letter Iota With Dialytika"
		},
		"0390": {
			name: "iotadieresistonos",
			fullname: "Greek Small Letter Iota With Dialytika And Tonos"
		},
		"03AF": {
			name: "iotatonos",
			fullname: "Greek Small Letter Iota With Tonos"
		},
		"0129": {
			name: "itilde",
			fullname: "Latin Small Letter I With Tilde"
		},
		"006A": {
			name: "j",
			fullname: "Latin Small Letter J"
		},
		"0135": {
			name: "jcircumflex",
			fullname: "Latin Small Letter J With Circumflex"
		},
		"006B": {
			name: "k",
			fullname: "Latin Small Letter K"
		},
		"03BA": {
			name: "kappa",
			fullname: "Greek Small Letter Kappa"
		},
		"0138": {
			name: "kgreenlandic",
			fullname: "Latin Small Letter Kra"
		},
		"006C": {
			name: "l",
			fullname: "Latin Small Letter L"
		},
		"013A": {
			name: "lacute",
			fullname: "Latin Small Letter L With Acute"
		},
		"03BB": {
			name: "lambda",
			fullname: "Greek Small Letter Lamda"
		},
		"013E": {
			name: "lcaron",
			fullname: "Latin Small Letter L With Caron"
		},
		"0140": {
			name: "ldot",
			fullname: "Latin Small Letter L With Middle Dot"
		},
		"003C": {
			name: "less",
			fullname: "Less-than Sign"
		},
		"258C": {
			name: "lfblock",
			fullname: "Left Half Block"
		},
		"20A4": {
			name: "lira",
			fullname: "Lira Sign"
		},
		"00AC": {
			name: "logicalnot",
			fullname: "Not Sign"
		},
		"017F": {
			name: "longs",
			fullname: "Latin Small Letter Long S"
		},
		"25CA": {
			name: "lozenge",
			fullname: "Lozenge"
		},
		"0142": {
			name: "lslash",
			fullname: "Latin Small Letter L With Stroke"
		},
		"006D": {
			name: "m",
			fullname: "Latin Small Letter M"
		},
		"00AF": {
			name: "macron",
			fullname: "Macron"
		},
		"00B5": {
			name: "mu",
			fullname: "Micro Sign"
		},
		"00D7": {
			name: "multiply",
			fullname: "Multiplication Sign"
		},
		"266A": {
			name: "musicalnote",
			fullname: "Eighth Note"
		},
		"266B": {
			name: "musicalnotedbl",
			fullname: "Beamed Eighth Notes"
		},
		"006E": {
			name: "n",
			fullname: "Latin Small Letter N"
		},
		"0144": {
			name: "nacute",
			fullname: "Latin Small Letter N With Acute"
		},
		"0149": {
			name: "napostrophe",
			fullname: "Latin Small Letter N Preceded By Apostrophe"
		},
		"0148": {
			name: "ncaron",
			fullname: "Latin Small Letter N With Caron"
		},
		"0039": {
			name: "nine",
			fullname: "Digit Nine"
		},
		"00F1": {
			name: "ntilde",
			fullname: "Latin Small Letter N With Tilde"
		},
		"03BD": {
			name: "nu",
			fullname: "Greek Small Letter Nu"
		},
		"0023": {
			name: "numbersign",
			fullname: "Number Sign"
		},
		"006F": {
			name: "o",
			fullname: "Latin Small Letter O"
		},
		"00F3": {
			name: "oacute",
			fullname: "Latin Small Letter O With Acute"
		},
		"014F": {
			name: "obreve",
			fullname: "Latin Small Letter O With Breve"
		},
		"00F4": {
			name: "ocircumflex",
			fullname: "Latin Small Letter O With Circumflex"
		},
		"00F6": {
			name: "odieresis",
			fullname: "Latin Small Letter O With Diaeresis"
		},
		"0153": {
			name: "oe",
			fullname: "Latin Small Ligature Oe"
		},
		"02DB": {
			name: "ogonek",
			fullname: "Ogonek"
		},
		"00F2": {
			name: "ograve",
			fullname: "Latin Small Letter O With Grave"
		},
		"01A1": {
			name: "ohorn",
			fullname: "Latin Small Letter O With Horn"
		},
		"0151": {
			name: "ohungarumlaut",
			fullname: "Latin Small Letter O With Double Acute"
		},
		"014D": {
			name: "omacron",
			fullname: "Latin Small Letter O With Macron"
		},
		"03C9": {
			name: "omega",
			fullname: "Greek Small Letter Omega"
		},
		"03D6": {
			name: "omega1",
			fullname: "Greek Pi Symbol"
		},
		"03CE": {
			name: "omegatonos",
			fullname: "Greek Small Letter Omega With Tonos"
		},
		"03BF": {
			name: "omicron",
			fullname: "Greek Small Letter Omicron"
		},
		"03CC": {
			name: "omicrontonos",
			fullname: "Greek Small Letter Omicron With Tonos"
		},
		"0031": {
			name: "one",
			fullname: "Digit One"
		},
		"215B": {
			name: "oneeighth",
			fullname: "Vulgar Fraction One Eighth"
		},
		"00BD": {
			name: "onehalf",
			fullname: "Vulgar Fraction One Half"
		},
		"00BC": {
			name: "onequarter",
			fullname: "Vulgar Fraction One Quarter"
		},
		"25E6": {
			name: "openbullet",
			fullname: "White Bullet"
		},
		"00AA": {
			name: "ordfeminine",
			fullname: "Feminine Ordinal Indicator"
		},
		"00BA": {
			name: "ordmasculine",
			fullname: "Masculine Ordinal Indicator"
		},
		"221F": {
			name: "orthogonal",
			fullname: "Right Angle"
		},
		"00F8": {
			name: "oslash",
			fullname: "Latin Small Letter O With Stroke"
		},
		"01FF": {
			name: "oslashacute",
			fullname: "Latin Small Letter O With Stroke And Acute"
		},
		"00F5": {
			name: "otilde",
			fullname: "Latin Small Letter O With Tilde"
		},
		"0070": {
			name: "p",
			fullname: "Latin Small Letter P"
		},
		"00B6": {
			name: "paragraph",
			fullname: "Pilcrow Sign"
		},
		"0028": {
			name: "parenleft",
			fullname: "Left Parenthesis"
		},
		"0029": {
			name: "parenright",
			fullname: "Right Parenthesis"
		},
		"0025": {
			name: "percent",
			fullname: "Percent Sign"
		},
		"002E": {
			name: "period",
			fullname: "Full Stop"
		},
		"00B7": {
			name: "periodcentered",
			fullname: "Middle Dot"
		},
		"22A5": {
			name: "perpendicular",
			fullname: "Up Tack"
		},
		"20A7": {
			name: "peseta",
			fullname: "Peseta Sign"
		},
		"03C6": {
			name: "phi",
			fullname: "Greek Small Letter Phi"
		},
		"03D5": {
			name: "phi1",
			fullname: "Greek Phi Symbol"
		},
		"03C0": {
			name: "pi",
			fullname: "Greek Small Letter Pi"
		},
		"002B": {
			name: "plus",
			fullname: "Plus Sign"
		},
		"00B1": {
			name: "plusminus",
			fullname: "Plus-minus Sign"
		},
		"211E": {
			name: "prescription",
			fullname: "Prescription Take"
		},
		"220F": {
			name: "product",
			fullname: "N-ary Product"
		},
		"221D": {
			name: "proportional",
			fullname: "Proportional To"
		},
		"03C8": {
			name: "psi",
			fullname: "Greek Small Letter Psi"
		},
		"0071": {
			name: "q",
			fullname: "Latin Small Letter Q"
		},
		"003F": {
			name: "question",
			fullname: "Question Mark"
		},
		"00BF": {
			name: "questiondown",
			fullname: "Inverted Question Mark"
		},
		"0022": {
			name: "quotedbl",
			fullname: "Quotation Mark"
		},
		"201E": {
			name: "quotedblbase",
			fullname: "Double Low-9 Quotation Mark"
		},
		"201C": {
			name: "quotedblleft",
			fullname: "Left Double Quotation Mark"
		},
		"201D": {
			name: "quotedblright",
			fullname: "Right Double Quotation Mark"
		},
		"201B": {
			name: "quotereversed",
			fullname: "Single High-reversed-9 Quotation Mark"
		},
		"201A": {
			name: "quotesinglbase",
			fullname: "Single Low-9 Quotation Mark"
		},
		"0027": {
			name: "quotesingle",
			fullname: "Apostrophe"
		},
		"0072": {
			name: "r",
			fullname: "Latin Small Letter R"
		},
		"0155": {
			name: "racute",
			fullname: "Latin Small Letter R With Acute"
		},
		"221A": {
			name: "radical",
			fullname: "Square Root"
		},
		"0159": {
			name: "rcaron",
			fullname: "Latin Small Letter R With Caron"
		},
		"00AE": {
			name: "registered",
			fullname: "Registered Sign"
		},
		"03C1": {
			name: "rho",
			fullname: "Greek Small Letter Rho"
		},
		"02DA": {
			name: "ring",
			fullname: "Ring Above"
		},
		"0073": {
			name: "s",
			fullname: "Latin Small Letter S"
		},
		"015B": {
			name: "sacute",
			fullname: "Latin Small Letter S With Acute"
		},
		"0161": {
			name: "scaron",
			fullname: "Latin Small Letter S With Caron"
		},
		"015F": {
			name: "scedilla",
			fullname: "Latin Small Letter S With Cedilla"
		},
		"015D": {
			name: "scircumflex",
			fullname: "Latin Small Letter S With Circumflex"
		},
		"00A7": {
			name: "section",
			fullname: "Section Sign"
		},
		"003B": {
			name: "semicolon",
			fullname: "Semicolon"
		},
		"0037": {
			name: "seven",
			fullname: "Digit Seven"
		},
		"215E": {
			name: "seveneighths",
			fullname: "Vulgar Fraction Seven Eighths"
		},
		"03C3": {
			name: "sigma",
			fullname: "Greek Small Letter Sigma"
		},
		"03C2": {
			name: "sigma1",
			fullname: "Greek Small Letter Final Sigma"
		},
		"223C": {
			name: "similar",
			fullname: "Tilde Operator"
		},
		"0036": {
			name: "six",
			fullname: "Digit Six"
		},
		"002F": {
			name: "slash",
			fullname: "Solidus"
		},
		"263A": {
			name: "smileface",
			fullname: "White Smiling Face"
		},
		"0020": {
			name: "space",
			fullname: "Space"
		},
		"00A3": {
			name: "sterling",
			fullname: "Pound Sign"
		},
		"220B": {
			name: "suchthat",
			fullname: "Contains As Member"
		},
		"263C": {
			name: "sun",
			fullname: "White Sun With Rays"
		},
		"0074": {
			name: "t",
			fullname: "Latin Small Letter T"
		},
		"03C4": {
			name: "tau",
			fullname: "Greek Small Letter Tau"
		},
		"0167": {
			name: "tbar",
			fullname: "Latin Small Letter T With Stroke"
		},
		"0165": {
			name: "tcaron",
			fullname: "Latin Small Letter T With Caron"
		},
		"03B8": {
			name: "theta",
			fullname: "Greek Small Letter Theta"
		},
		"03D1": {
			name: "theta1",
			fullname: "Greek Theta Symbol"
		},
		"00FE": {
			name: "thorn",
			fullname: "Latin Small Letter Thorn"
		},
		"0033": {
			name: "three",
			fullname: "Digit Three"
		},
		"215C": {
			name: "threeeighths",
			fullname: "Vulgar Fraction Three Eighths"
		},
		"00BE": {
			name: "threequarters",
			fullname: "Vulgar Fraction Three Quarters"
		},
		"02DC": {
			name: "tilde",
			fullname: "Small Tilde"
		},
		"0303": {
			name: "tildecomb",
			fullname: "Combining Tilde"
		},
		"0384": {
			name: "tonos",
			fullname: "Greek Tonos"
		},
		"25BC": {
			name: "triagdn",
			fullname: "Black Down-pointing Triangle"
		},
		"25C4": {
			name: "triaglf",
			fullname: "Black Left-pointing Pointer"
		},
		"25BA": {
			name: "triagrt",
			fullname: "Black Right-pointing Pointer"
		},
		"25B2": {
			name: "triagup",
			fullname: "Black Up-pointing Triangle"
		},
		"0032": {
			name: "two",
			fullname: "Digit Two"
		},
		"0075": {
			name: "u",
			fullname: "Latin Small Letter U"
		},
		"00FA": {
			name: "uacute",
			fullname: "Latin Small Letter U With Acute"
		},
		"016D": {
			name: "ubreve",
			fullname: "Latin Small Letter U With Breve"
		},
		"00FB": {
			name: "ucircumflex",
			fullname: "Latin Small Letter U With Circumflex"
		},
		"00FC": {
			name: "udieresis",
			fullname: "Latin Small Letter U With Diaeresis"
		},
		"00F9": {
			name: "ugrave",
			fullname: "Latin Small Letter U With Grave"
		},
		"01B0": {
			name: "uhorn",
			fullname: "Latin Small Letter U With Horn"
		},
		"0171": {
			name: "uhungarumlaut",
			fullname: "Latin Small Letter U With Double Acute"
		},
		"016B": {
			name: "umacron",
			fullname: "Latin Small Letter U With Macron"
		},
		"005F": {
			name: "underscore",
			fullname: "Low Line"
		},
		"222A": {
			name: "union",
			fullname: "Union"
		},
		"0173": {
			name: "uogonek",
			fullname: "Latin Small Letter U With Ogonek"
		},
		"03C5": {
			name: "upsilon",
			fullname: "Greek Small Letter Upsilon"
		},
		"03CB": {
			name: "upsilondieresis",
			fullname: "Greek Small Letter Upsilon With Dialytika"
		},
		"03B0": {
			name: "upsilondieresistonos",
			fullname: "Greek Small Letter Upsilon With Dialytika And Tonos"
		},
		"03CD": {
			name: "upsilontonos",
			fullname: "Greek Small Letter Upsilon With Tonos"
		},
		"016F": {
			name: "uring",
			fullname: "Latin Small Letter U With Ring Above"
		},
		"0169": {
			name: "utilde",
			fullname: "Latin Small Letter U With Tilde"
		},
		"0076": {
			name: "v",
			fullname: "Latin Small Letter V"
		},
		"0077": {
			name: "w",
			fullname: "Latin Small Letter W"
		},
		"1E83": {
			name: "wacute",
			fullname: "Latin Small Letter W With Acute"
		},
		"0175": {
			name: "wcircumflex",
			fullname: "Latin Small Letter W With Circumflex"
		},
		"1E85": {
			name: "wdieresis",
			fullname: "Latin Small Letter W With Diaeresis"
		},
		"1E81": {
			name: "wgrave",
			fullname: "Latin Small Letter W With Grave"
		},
		"0078": {
			name: "x",
			fullname: "Latin Small Letter X"
		},
		"03BE": {
			name: "xi",
			fullname: "Greek Small Letter Xi"
		},
		"0079": {
			name: "y",
			fullname: "Latin Small Letter Y"
		},
		"00FD": {
			name: "yacute",
			fullname: "Latin Small Letter Y With Acute"
		},
		"0177": {
			name: "ycircumflex",
			fullname: "Latin Small Letter Y With Circumflex"
		},
		"00FF": {
			name: "ydieresis",
			fullname: "Latin Small Letter Y With Diaeresis"
		},
		"00A5": {
			name: "yen",
			fullname: "Yen Sign"
		},
		"1EF3": {
			name: "ygrave",
			fullname: "Latin Small Letter Y With Grave"
		},
		"007A": {
			name: "z",
			fullname: "Latin Small Letter Z"
		},
		"017A": {
			name: "zacute",
			fullname: "Latin Small Letter Z With Acute"
		},
		"017E": {
			name: "zcaron",
			fullname: "Latin Small Letter Z With Caron"
		},
		"017C": {
			name: "zdotaccent",
			fullname: "Latin Small Letter Z With Dot Above"
		},
		"0030": {
			name: "zero",
			fullname: "Digit Zero"
		},
		"03B6": {
			name: "zeta",
			fullname: "Greek Small Letter Zeta"
		}
	}
},
function(e, t) {
	e.exports = {
		Cc: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159],
		Zs: [32, 160, 5760, 8192, 8193, 8194, 8195, 8196, 8197, 8198, 8199, 8200, 8201, 8202, 8239, 8287, 12288],
		Po: [33, 34, 35, 37, 38, 39, 42, 44, 46, 47, 58, 59, 63, 64, 92, 161, 167, 182, 183, 191, 894, 903, 1370, 1371, 1372, 1373, 1374, 1375, 1417, 1472, 1475, 1478, 1523, 1524, 1545, 1546, 1548, 1549, 1563, 1566, 1567, 1642, 1643, 1644, 1645, 1748, 1792, 1793, 1794, 1795, 1796, 1797, 1798, 1799, 1800, 1801, 1802, 1803, 1804, 1805, 2039, 2040, 2041, 2096, 2097, 2098, 2099, 2100, 2101, 2102, 2103, 2104, 2105, 2106, 2107, 2108, 2109, 2110, 2142, 2404, 2405, 2416, 2557, 2800, 3572, 3663, 3674, 3675, 3844, 3845, 3846, 3847, 3848, 3849, 3850, 3851, 3852, 3853, 3854, 3855, 3856, 3857, 3858, 3860, 3973, 4048, 4049, 4050, 4051, 4052, 4057, 4058, 4170, 4171, 4172, 4173, 4174, 4175, 4347, 4960, 4961, 4962, 4963, 4964, 4965, 4966, 4967, 4968, 5741, 5742, 5867, 5868, 5869, 5941, 5942, 6100, 6101, 6102, 6104, 6105, 6106, 6144, 6145, 6146, 6147, 6148, 6149, 6151, 6152, 6153, 6154, 6468, 6469, 6686, 6687, 6816, 6817, 6818, 6819, 6820, 6821, 6822, 6824, 6825, 6826, 6827, 6828, 6829, 7002, 7003, 7004, 7005, 7006, 7007, 7008, 7164, 7165, 7166, 7167, 7227, 7228, 7229, 7230, 7231, 7294, 7295, 7360, 7361, 7362, 7363, 7364, 7365, 7366, 7367, 7379, 8214, 8215, 8224, 8225, 8226, 8227, 8228, 8229, 8230, 8231, 8240, 8241, 8242, 8243, 8244, 8245, 8246, 8247, 8248, 8251, 8252, 8253, 8254, 8257, 8258, 8259, 8263, 8264, 8265, 8266, 8267, 8268, 8269, 8270, 8271, 8272, 8273, 8275, 8277, 8278, 8279, 8280, 8281, 8282, 8283, 8284, 8285, 8286, 11513, 11514, 11515, 11516, 11518, 11519, 11632, 11776, 11777, 11782, 11783, 11784, 11787, 11790, 11791, 11792, 11793, 11794, 11795, 11796, 11797, 11798, 11800, 11801, 11803, 11806, 11807, 11818, 11819, 11820, 11821, 11822, 11824, 11825, 11826, 11827, 11828, 11829, 11830, 11831, 11832, 11833, 11836, 11837, 11838, 11839, 11841, 11843, 11844, 11845, 11846, 11847, 11848, 11849, 12289, 12290, 12291, 12349, 12539, 42238, 42239, 42509, 42510, 42511, 42611, 42622, 42738, 42739, 42740, 42741, 42742, 42743, 43124, 43125, 43126, 43127, 43214, 43215, 43256, 43257, 43258, 43260, 43310, 43311, 43359, 43457, 43458, 43459, 43460, 43461, 43462, 43463, 43464, 43465, 43466, 43467, 43468, 43469, 43486, 43487, 43612, 43613, 43614, 43615, 43742, 43743, 43760, 43761, 44011, 65040, 65041, 65042, 65043, 65044, 65045, 65046, 65049, 65072, 65093, 65094, 65097, 65098, 65099, 65100, 65104, 65105, 65106, 65108, 65109, 65110, 65111, 65119, 65120, 65121, 65128, 65130, 65131, 65281, 65282, 65283, 65285, 65286, 65287, 65290, 65292, 65294, 65295, 65306, 65307, 65311, 65312, 65340, 65377, 65380, 65381, 65792, 65793, 65794, 66463, 66512, 66927, 67671, 67871, 67903, 68176, 68177, 68178, 68179, 68180, 68181, 68182, 68183, 68184, 68223, 68336, 68337, 68338, 68339, 68340, 68341, 68342, 68409, 68410, 68411, 68412, 68413, 68414, 68415, 68505, 68506, 68507, 68508, 69703, 69704, 69705, 69706, 69707, 69708, 69709, 69819, 69820, 69822, 69823, 69824, 69825, 69952, 69953, 69954, 69955, 70004, 70005, 70085, 70086, 70087, 70088, 70089, 70093, 70107, 70109, 70110, 70111, 70200, 70201, 70202, 70203, 70204, 70205, 70313, 70731, 70732, 70733, 70734, 70735, 70747, 70749, 70854, 71105, 71106, 71107, 71108, 71109, 71110, 71111, 71112, 71113, 71114, 71115, 71116, 71117, 71118, 71119, 71120, 71121, 71122, 71123, 71124, 71125, 71126, 71127, 71233, 71234, 71235, 71264, 71265, 71266, 71267, 71268, 71269, 71270, 71271, 71272, 71273, 71274, 71275, 71276, 71484, 71485, 71486, 72255, 72256, 72257, 72258, 72259, 72260, 72261, 72262, 72346, 72347, 72348, 72350, 72351, 72352, 72353, 72354, 72769, 72770, 72771, 72772, 72773, 72816, 72817, 74864, 74865, 74866, 74867, 74868, 92782, 92783, 92917, 92983, 92984, 92985, 92986, 92987, 92996, 113823, 121479, 121480, 121481, 121482, 121483, 125278, 125279],
		Sc: [36, 162, 163, 164, 165, 1423, 1547, 2546, 2547, 2555, 2801, 3065, 3647, 6107, 8352, 8353, 8354, 8355, 8356, 8357, 8358, 8359, 8360, 8361, 8362, 8363, 8364, 8365, 8366, 8367, 8368, 8369, 8370, 8371, 8372, 8373, 8374, 8375, 8376, 8377, 8378, 8379, 8380, 8381, 8382, 8383, 43064, 65020, 65129, 65284, 65504, 65505, 65509, 65510],
		Ps: [40, 91, 123, 3898, 3900, 5787, 8218, 8222, 8261, 8317, 8333, 8968, 8970, 9001, 10088, 10090, 10092, 10094, 10096, 10098, 10100, 10181, 10214, 10216, 10218, 10220, 10222, 10627, 10629, 10631, 10633, 10635, 10637, 10639, 10641, 10643, 10645, 10647, 10712, 10714, 10748, 11810, 11812, 11814, 11816, 11842, 12296, 12298, 12300, 12302, 12304, 12308, 12310, 12312, 12314, 12317, 64831, 65047, 65077, 65079, 65081, 65083, 65085, 65087, 65089, 65091, 65095, 65113, 65115, 65117, 65288, 65339, 65371, 65375, 65378],
		Pe: [41, 93, 125, 3899, 3901, 5788, 8262, 8318, 8334, 8969, 8971, 9002, 10089, 10091, 10093, 10095, 10097, 10099, 10101, 10182, 10215, 10217, 10219, 10221, 10223, 10628, 10630, 10632, 10634, 10636, 10638, 10640, 10642, 10644, 10646, 10648, 10713, 10715, 10749, 11811, 11813, 11815, 11817, 12297, 12299, 12301, 12303, 12305, 12309, 12311, 12313, 12315, 12318, 12319, 64830, 65048, 65078, 65080, 65082, 65084, 65086, 65088, 65090, 65092, 65096, 65114, 65116, 65118, 65289, 65341, 65373, 65376, 65379],
		Sm: [43, 60, 61, 62, 124, 126, 172, 177, 215, 247, 1014, 1542, 1543, 1544, 8260, 8274, 8314, 8315, 8316, 8330, 8331, 8332, 8472, 8512, 8513, 8514, 8515, 8516, 8523, 8592, 8593, 8594, 8595, 8596, 8602, 8603, 8608, 8611, 8614, 8622, 8654, 8655, 8658, 8660, 8692, 8693, 8694, 8695, 8696, 8697, 8698, 8699, 8700, 8701, 8702, 8703, 8704, 8705, 8706, 8707, 8708, 8709, 8710, 8711, 8712, 8713, 8714, 8715, 8716, 8717, 8718, 8719, 8720, 8721, 8722, 8723, 8724, 8725, 8726, 8727, 8728, 8729, 8730, 8731, 8732, 8733, 8734, 8735, 8736, 8737, 8738, 8739, 8740, 8741, 8742, 8743, 8744, 8745, 8746, 8747, 8748, 8749, 8750, 8751, 8752, 8753, 8754, 8755, 8756, 8757, 8758, 8759, 8760, 8761, 8762, 8763, 8764, 8765, 8766, 8767, 8768, 8769, 8770, 8771, 8772, 8773, 8774, 8775, 8776, 8777, 8778, 8779, 8780, 8781, 8782, 8783, 8784, 8785, 8786, 8787, 8788, 8789, 8790, 8791, 8792, 8793, 8794, 8795, 8796, 8797, 8798, 8799, 8800, 8801, 8802, 8803, 8804, 8805, 8806, 8807, 8808, 8809, 8810, 8811, 8812, 8813, 8814, 8815, 8816, 8817, 8818, 8819, 8820, 8821, 8822, 8823, 8824, 8825, 8826, 8827, 8828, 8829, 8830, 8831, 8832, 8833, 8834, 8835, 8836, 8837, 8838, 8839, 8840, 8841, 8842, 8843, 8844, 8845, 8846, 8847, 8848, 8849, 8850, 8851, 8852, 8853, 8854, 8855, 8856, 8857, 8858, 8859, 8860, 8861, 8862, 8863, 8864, 8865, 8866, 8867, 8868, 8869, 8870, 8871, 8872, 8873, 8874, 8875, 8876, 8877, 8878, 8879, 8880, 8881, 8882, 8883, 8884, 8885, 8886, 8887, 8888, 8889, 8890, 8891, 8892, 8893, 8894, 8895, 8896, 8897, 8898, 8899, 8900, 8901, 8902, 8903, 8904, 8905, 8906, 8907, 8908, 8909, 8910, 8911, 8912, 8913, 8914, 8915, 8916, 8917, 8918, 8919, 8920, 8921, 8922, 8923, 8924, 8925, 8926, 8927, 8928, 8929, 8930, 8931, 8932, 8933, 8934, 8935, 8936, 8937, 8938, 8939, 8940, 8941, 8942, 8943, 8944, 8945, 8946, 8947, 8948, 8949, 8950, 8951, 8952, 8953, 8954, 8955, 8956, 8957, 8958, 8959, 8992, 8993, 9084, 9115, 9116, 9117, 9118, 9119, 9120, 9121, 9122, 9123, 9124, 9125, 9126, 9127, 9128, 9129, 9130, 9131, 9132, 9133, 9134, 9135, 9136, 9137, 9138, 9139, 9180, 9181, 9182, 9183, 9184, 9185, 9655, 9665, 9720, 9721, 9722, 9723, 9724, 9725, 9726, 9727, 9839, 10176, 10177, 10178, 10179, 10180, 10183, 10184, 10185, 10186, 10187, 10188, 10189, 10190, 10191, 10192, 10193, 10194, 10195, 10196, 10197, 10198, 10199, 10200, 10201, 10202, 10203, 10204, 10205, 10206, 10207, 10208, 10209, 10210, 10211, 10212, 10213, 10224, 10225, 10226, 10227, 10228, 10229, 10230, 10231, 10232, 10233, 10234, 10235, 10236, 10237, 10238, 10239, 10496, 10497, 10498, 10499, 10500, 10501, 10502, 10503, 10504, 10505, 10506, 10507, 10508, 10509, 10510, 10511, 10512, 10513, 10514, 10515, 10516, 10517, 10518, 10519, 10520, 10521, 10522, 10523, 10524, 10525, 10526, 10527, 10528, 10529, 10530, 10531, 10532, 10533, 10534, 10535, 10536, 10537, 10538, 10539, 10540, 10541, 10542, 10543, 10544, 10545, 10546, 10547, 10548, 10549, 10550, 10551, 10552, 10553, 10554, 10555, 10556, 10557, 10558, 10559, 10560, 10561, 10562, 10563, 10564, 10565, 10566, 10567, 10568, 10569, 10570, 10571, 10572, 10573, 10574, 10575, 10576, 10577, 10578, 10579, 10580, 10581, 10582, 10583, 10584, 10585, 10586, 10587, 10588, 10589, 10590, 10591, 10592, 10593, 10594, 10595, 10596, 10597, 10598, 10599, 10600, 10601, 10602, 10603, 10604, 10605, 10606, 10607, 10608, 10609, 10610, 10611, 10612, 10613, 10614, 10615, 10616, 10617, 10618, 10619, 10620, 10621, 10622, 10623, 10624, 10625, 10626, 10649, 10650, 10651, 10652, 10653, 10654, 10655, 10656, 10657, 10658, 10659, 10660, 10661, 10662, 10663, 10664, 10665, 10666, 10667, 10668, 10669, 10670, 10671, 10672, 10673, 10674, 10675, 10676, 10677, 10678, 10679, 10680, 10681, 10682, 10683, 10684, 10685, 10686, 10687, 10688, 10689, 10690, 10691, 10692, 10693, 10694, 10695, 10696, 10697, 10698, 10699, 10700, 10701, 10702, 10703, 10704, 10705, 10706, 10707, 10708, 10709, 10710, 10711, 10716, 10717, 10718, 10719, 10720, 10721, 10722, 10723, 10724, 10725, 10726, 10727, 10728, 10729, 10730, 10731, 10732, 10733, 10734, 10735, 10736, 10737, 10738, 10739, 10740, 10741, 10742, 10743, 10744, 10745, 10746, 10747, 10750, 10751, 10752, 10753, 10754, 10755, 10756, 10757, 10758, 10759, 10760, 10761, 10762, 10763, 10764, 10765, 10766, 10767, 10768, 10769, 10770, 10771, 10772, 10773, 10774, 10775, 10776, 10777, 10778, 10779, 10780, 10781, 10782, 10783, 10784, 10785, 10786, 10787, 10788, 10789, 10790, 10791, 10792, 10793, 10794, 10795, 10796, 10797, 10798, 10799, 10800, 10801, 10802, 10803, 10804, 10805, 10806, 10807, 10808, 10809, 10810, 10811, 10812, 10813, 10814, 10815, 10816, 10817, 10818, 10819, 10820, 10821, 10822, 10823, 10824, 10825, 10826, 10827, 10828, 10829, 10830, 10831, 10832, 10833, 10834, 10835, 10836, 10837, 10838, 10839, 10840, 10841, 10842, 10843, 10844, 10845, 10846, 10847, 10848, 10849, 10850, 10851, 10852, 10853, 10854, 10855, 10856, 10857, 10858, 10859, 10860, 10861, 10862, 10863, 10864, 10865, 10866, 10867, 10868, 10869, 10870, 10871, 10872, 10873, 10874, 10875, 10876, 10877, 10878, 10879, 10880, 10881, 10882, 10883, 10884, 10885, 10886, 10887, 10888, 10889, 10890, 10891, 10892, 10893, 10894, 10895, 10896, 10897, 10898, 10899, 10900, 10901, 10902, 10903, 10904, 10905, 10906, 10907, 10908, 10909, 10910, 10911, 10912, 10913, 10914, 10915, 10916, 10917, 10918, 10919, 10920, 10921, 10922, 10923, 10924, 10925, 10926, 10927, 10928, 10929, 10930, 10931, 10932, 10933, 10934, 10935, 10936, 10937, 10938, 10939, 10940, 10941, 10942, 10943, 10944, 10945, 10946, 10947, 10948, 10949, 10950, 10951, 10952, 10953, 10954, 10955, 10956, 10957, 10958, 10959, 10960, 10961, 10962, 10963, 10964, 10965, 10966, 10967, 10968, 10969, 10970, 10971, 10972, 10973, 10974, 10975, 10976, 10977, 10978, 10979, 10980, 10981, 10982, 10983, 10984, 10985, 10986, 10987, 10988, 10989, 10990, 10991, 10992, 10993, 10994, 10995, 10996, 10997, 10998, 10999, 11e3, 11001, 11002, 11003, 11004, 11005, 11006, 11007, 11056, 11057, 11058, 11059, 11060, 11061, 11062, 11063, 11064, 11065, 11066, 11067, 11068, 11069, 11070, 11071, 11072, 11073, 11074, 11075, 11076, 11079, 11080, 11081, 11082, 11083, 11084, 64297, 65122, 65124, 65125, 65126, 65291, 65308, 65309, 65310, 65372, 65374, 65506, 65513, 65514, 65515, 65516, 120513, 120539, 120571, 120597, 120629, 120655, 120687, 120713, 120745, 120771, 126704, 126705],
		Pd: [45, 1418, 1470, 5120, 6150, 8208, 8209, 8210, 8211, 8212, 8213, 11799, 11802, 11834, 11835, 11840, 12316, 12336, 12448, 65073, 65074, 65112, 65123, 65293],
		Nd: [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 1632, 1633, 1634, 1635, 1636, 1637, 1638, 1639, 1640, 1641, 1776, 1777, 1778, 1779, 1780, 1781, 1782, 1783, 1784, 1785, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 2406, 2407, 2408, 2409, 2410, 2411, 2412, 2413, 2414, 2415, 2534, 2535, 2536, 2537, 2538, 2539, 2540, 2541, 2542, 2543, 2662, 2663, 2664, 2665, 2666, 2667, 2668, 2669, 2670, 2671, 2790, 2791, 2792, 2793, 2794, 2795, 2796, 2797, 2798, 2799, 2918, 2919, 2920, 2921, 2922, 2923, 2924, 2925, 2926, 2927, 3046, 3047, 3048, 3049, 3050, 3051, 3052, 3053, 3054, 3055, 3174, 3175, 3176, 3177, 3178, 3179, 3180, 3181, 3182, 3183, 3302, 3303, 3304, 3305, 3306, 3307, 3308, 3309, 3310, 3311, 3430, 3431, 3432, 3433, 3434, 3435, 3436, 3437, 3438, 3439, 3558, 3559, 3560, 3561, 3562, 3563, 3564, 3565, 3566, 3567, 3664, 3665, 3666, 3667, 3668, 3669, 3670, 3671, 3672, 3673, 3792, 3793, 3794, 3795, 3796, 3797, 3798, 3799, 3800, 3801, 3872, 3873, 3874, 3875, 3876, 3877, 3878, 3879, 3880, 3881, 4160, 4161, 4162, 4163, 4164, 4165, 4166, 4167, 4168, 4169, 4240, 4241, 4242, 4243, 4244, 4245, 4246, 4247, 4248, 4249, 6112, 6113, 6114, 6115, 6116, 6117, 6118, 6119, 6120, 6121, 6160, 6161, 6162, 6163, 6164, 6165, 6166, 6167, 6168, 6169, 6470, 6471, 6472, 6473, 6474, 6475, 6476, 6477, 6478, 6479, 6608, 6609, 6610, 6611, 6612, 6613, 6614, 6615, 6616, 6617, 6784, 6785, 6786, 6787, 6788, 6789, 6790, 6791, 6792, 6793, 6800, 6801, 6802, 6803, 6804, 6805, 6806, 6807, 6808, 6809, 6992, 6993, 6994, 6995, 6996, 6997, 6998, 6999, 7e3, 7001, 7088, 7089, 7090, 7091, 7092, 7093, 7094, 7095, 7096, 7097, 7232, 7233, 7234, 7235, 7236, 7237, 7238, 7239, 7240, 7241, 7248, 7249, 7250, 7251, 7252, 7253, 7254, 7255, 7256, 7257, 42528, 42529, 42530, 42531, 42532, 42533, 42534, 42535, 42536, 42537, 43216, 43217, 43218, 43219, 43220, 43221, 43222, 43223, 43224, 43225, 43264, 43265, 43266, 43267, 43268, 43269, 43270, 43271, 43272, 43273, 43472, 43473, 43474, 43475, 43476, 43477, 43478, 43479, 43480, 43481, 43504, 43505, 43506, 43507, 43508, 43509, 43510, 43511, 43512, 43513, 43600, 43601, 43602, 43603, 43604, 43605, 43606, 43607, 43608, 43609, 44016, 44017, 44018, 44019, 44020, 44021, 44022, 44023, 44024, 44025, 65296, 65297, 65298, 65299, 65300, 65301, 65302, 65303, 65304, 65305, 66720, 66721, 66722, 66723, 66724, 66725, 66726, 66727, 66728, 66729, 69734, 69735, 69736, 69737, 69738, 69739, 69740, 69741, 69742, 69743, 69872, 69873, 69874, 69875, 69876, 69877, 69878, 69879, 69880, 69881, 69942, 69943, 69944, 69945, 69946, 69947, 69948, 69949, 69950, 69951, 70096, 70097, 70098, 70099, 70100, 70101, 70102, 70103, 70104, 70105, 70384, 70385, 70386, 70387, 70388, 70389, 70390, 70391, 70392, 70393, 70736, 70737, 70738, 70739, 70740, 70741, 70742, 70743, 70744, 70745, 70864, 70865, 70866, 70867, 70868, 70869, 70870, 70871, 70872, 70873, 71248, 71249, 71250, 71251, 71252, 71253, 71254, 71255, 71256, 71257, 71360, 71361, 71362, 71363, 71364, 71365, 71366, 71367, 71368, 71369, 71472, 71473, 71474, 71475, 71476, 71477, 71478, 71479, 71480, 71481, 71904, 71905, 71906, 71907, 71908, 71909, 71910, 71911, 71912, 71913, 72784, 72785, 72786, 72787, 72788, 72789, 72790, 72791, 72792, 72793, 73040, 73041, 73042, 73043, 73044, 73045, 73046, 73047, 73048, 73049, 92768, 92769, 92770, 92771, 92772, 92773, 92774, 92775, 92776, 92777, 93008, 93009, 93010, 93011, 93012, 93013, 93014, 93015, 93016, 93017, 120782, 120783, 120784, 120785, 120786, 120787, 120788, 120789, 120790, 120791, 120792, 120793, 120794, 120795, 120796, 120797, 120798, 120799, 120800, 120801, 120802, 120803, 120804, 120805, 120806, 120807, 120808, 120809, 120810, 120811, 120812, 120813, 120814, 120815, 120816, 120817, 120818, 120819, 120820, 120821, 120822, 120823, 120824, 120825, 120826, 120827, 120828, 120829, 120830, 120831, 125264, 125265, 125266, 125267, 125268, 125269, 125270, 125271, 125272, 125273],
		Lu: [65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 216, 217, 218, 219, 220, 221, 222, 256, 258, 260, 262, 264, 266, 268, 270, 272, 274, 276, 278, 280, 282, 284, 286, 288, 290, 292, 294, 296, 298, 300, 302, 304, 306, 308, 310, 313, 315, 317, 319, 321, 323, 325, 327, 330, 332, 334, 336, 338, 340, 342, 344, 346, 348, 350, 352, 354, 356, 358, 360, 362, 364, 366, 368, 370, 372, 374, 376, 377, 379, 381, 385, 386, 388, 390, 391, 393, 394, 395, 398, 399, 400, 401, 403, 404, 406, 407, 408, 412, 413, 415, 416, 418, 420, 422, 423, 425, 428, 430, 431, 433, 434, 435, 437, 439, 440, 444, 452, 455, 458, 461, 463, 465, 467, 469, 471, 473, 475, 478, 480, 482, 484, 486, 488, 490, 492, 494, 497, 500, 502, 503, 504, 506, 508, 510, 512, 514, 516, 518, 520, 522, 524, 526, 528, 530, 532, 534, 536, 538, 540, 542, 544, 546, 548, 550, 552, 554, 556, 558, 560, 562, 570, 571, 573, 574, 577, 579, 580, 581, 582, 584, 586, 588, 590, 880, 882, 886, 895, 902, 904, 905, 906, 908, 910, 911, 913, 914, 915, 916, 917, 918, 919, 920, 921, 922, 923, 924, 925, 926, 927, 928, 929, 931, 932, 933, 934, 935, 936, 937, 938, 939, 975, 978, 979, 980, 984, 986, 988, 990, 992, 994, 996, 998, 1e3, 1002, 1004, 1006, 1012, 1015, 1017, 1018, 1021, 1022, 1023, 1024, 1025, 1026, 1027, 1028, 1029, 1030, 1031, 1032, 1033, 1034, 1035, 1036, 1037, 1038, 1039, 1040, 1041, 1042, 1043, 1044, 1045, 1046, 1047, 1048, 1049, 1050, 1051, 1052, 1053, 1054, 1055, 1056, 1057, 1058, 1059, 1060, 1061, 1062, 1063, 1064, 1065, 1066, 1067, 1068, 1069, 1070, 1071, 1120, 1122, 1124, 1126, 1128, 1130, 1132, 1134, 1136, 1138, 1140, 1142, 1144, 1146, 1148, 1150, 1152, 1162, 1164, 1166, 1168, 1170, 1172, 1174, 1176, 1178, 1180, 1182, 1184, 1186, 1188, 1190, 1192, 1194, 1196, 1198, 1200, 1202, 1204, 1206, 1208, 1210, 1212, 1214, 1216, 1217, 1219, 1221, 1223, 1225, 1227, 1229, 1232, 1234, 1236, 1238, 1240, 1242, 1244, 1246, 1248, 1250, 1252, 1254, 1256, 1258, 1260, 1262, 1264, 1266, 1268, 1270, 1272, 1274, 1276, 1278, 1280, 1282, 1284, 1286, 1288, 1290, 1292, 1294, 1296, 1298, 1300, 1302, 1304, 1306, 1308, 1310, 1312, 1314, 1316, 1318, 1320, 1322, 1324, 1326, 1329, 1330, 1331, 1332, 1333, 1334, 1335, 1336, 1337, 1338, 1339, 1340, 1341, 1342, 1343, 1344, 1345, 1346, 1347, 1348, 1349, 1350, 1351, 1352, 1353, 1354, 1355, 1356, 1357, 1358, 1359, 1360, 1361, 1362, 1363, 1364, 1365, 1366, 4256, 4257, 4258, 4259, 4260, 4261, 4262, 4263, 4264, 4265, 4266, 4267, 4268, 4269, 4270, 4271, 4272, 4273, 4274, 4275, 4276, 4277, 4278, 4279, 4280, 4281, 4282, 4283, 4284, 4285, 4286, 4287, 4288, 4289, 4290, 4291, 4292, 4293, 4295, 4301, 5024, 5025, 5026, 5027, 5028, 5029, 5030, 5031, 5032, 5033, 5034, 5035, 5036, 5037, 5038, 5039, 5040, 5041, 5042, 5043, 5044, 5045, 5046, 5047, 5048, 5049, 5050, 5051, 5052, 5053, 5054, 5055, 5056, 5057, 5058, 5059, 5060, 5061, 5062, 5063, 5064, 5065, 5066, 5067, 5068, 5069, 5070, 5071, 5072, 5073, 5074, 5075, 5076, 5077, 5078, 5079, 5080, 5081, 5082, 5083, 5084, 5085, 5086, 5087, 5088, 5089, 5090, 5091, 5092, 5093, 5094, 5095, 5096, 5097, 5098, 5099, 5100, 5101, 5102, 5103, 5104, 5105, 5106, 5107, 5108, 5109, 7680, 7682, 7684, 7686, 7688, 7690, 7692, 7694, 7696, 7698, 7700, 7702, 7704, 7706, 7708, 7710, 7712, 7714, 7716, 7718, 7720, 7722, 7724, 7726, 7728, 7730, 7732, 7734, 7736, 7738, 7740, 7742, 7744, 7746, 7748, 7750, 7752, 7754, 7756, 7758, 7760, 7762, 7764, 7766, 7768, 7770, 7772, 7774, 7776, 7778, 7780, 7782, 7784, 7786, 7788, 7790, 7792, 7794, 7796, 7798, 7800, 7802, 7804, 7806, 7808, 7810, 7812, 7814, 7816, 7818, 7820, 7822, 7824, 7826, 7828, 7838, 7840, 7842, 7844, 7846, 7848, 7850, 7852, 7854, 7856, 7858, 7860, 7862, 7864, 7866, 7868, 7870, 7872, 7874, 7876, 7878, 7880, 7882, 7884, 7886, 7888, 7890, 7892, 7894, 7896, 7898, 7900, 7902, 7904, 7906, 7908, 7910, 7912, 7914, 7916, 7918, 7920, 7922, 7924, 7926, 7928, 7930, 7932, 7934, 7944, 7945, 7946, 7947, 7948, 7949, 7950, 7951, 7960, 7961, 7962, 7963, 7964, 7965, 7976, 7977, 7978, 7979, 7980, 7981, 7982, 7983, 7992, 7993, 7994, 7995, 7996, 7997, 7998, 7999, 8008, 8009, 8010, 8011, 8012, 8013, 8025, 8027, 8029, 8031, 8040, 8041, 8042, 8043, 8044, 8045, 8046, 8047, 8120, 8121, 8122, 8123, 8136, 8137, 8138, 8139, 8152, 8153, 8154, 8155, 8168, 8169, 8170, 8171, 8172, 8184, 8185, 8186, 8187, 8450, 8455, 8459, 8460, 8461, 8464, 8465, 8466, 8469, 8473, 8474, 8475, 8476, 8477, 8484, 8486, 8488, 8490, 8491, 8492, 8493, 8496, 8497, 8498, 8499, 8510, 8511, 8517, 8579, 11264, 11265, 11266, 11267, 11268, 11269, 11270, 11271, 11272, 11273, 11274, 11275, 11276, 11277, 11278, 11279, 11280, 11281, 11282, 11283, 11284, 11285, 11286, 11287, 11288, 11289, 11290, 11291, 11292, 11293, 11294, 11295, 11296, 11297, 11298, 11299, 11300, 11301, 11302, 11303, 11304, 11305, 11306, 11307, 11308, 11309, 11310, 11360, 11362, 11363, 11364, 11367, 11369, 11371, 11373, 11374, 11375, 11376, 11378, 11381, 11390, 11391, 11392, 11394, 11396, 11398, 11400, 11402, 11404, 11406, 11408, 11410, 11412, 11414, 11416, 11418, 11420, 11422, 11424, 11426, 11428, 11430, 11432, 11434, 11436, 11438, 11440, 11442, 11444, 11446, 11448, 11450, 11452, 11454, 11456, 11458, 11460, 11462, 11464, 11466, 11468, 11470, 11472, 11474, 11476, 11478, 11480, 11482, 11484, 11486, 11488, 11490, 11499, 11501, 11506, 42560, 42562, 42564, 42566, 42568, 42570, 42572, 42574, 42576, 42578, 42580, 42582, 42584, 42586, 42588, 42590, 42592, 42594, 42596, 42598, 42600, 42602, 42604, 42624, 42626, 42628, 42630, 42632, 42634, 42636, 42638, 42640, 42642, 42644, 42646, 42648, 42650, 42786, 42788, 42790, 42792, 42794, 42796, 42798, 42802, 42804, 42806, 42808, 42810, 42812, 42814, 42816, 42818, 42820, 42822, 42824, 42826, 42828, 42830, 42832, 42834, 42836, 42838, 42840, 42842, 42844, 42846, 42848, 42850, 42852, 42854, 42856, 42858, 42860, 42862, 42873, 42875, 42877, 42878, 42880, 42882, 42884, 42886, 42891, 42893, 42896, 42898, 42902, 42904, 42906, 42908, 42910, 42912, 42914, 42916, 42918, 42920, 42922, 42923, 42924, 42925, 42926, 42928, 42929, 42930, 42931, 42932, 42934, 65313, 65314, 65315, 65316, 65317, 65318, 65319, 65320, 65321, 65322, 65323, 65324, 65325, 65326, 65327, 65328, 65329, 65330, 65331, 65332, 65333, 65334, 65335, 65336, 65337, 65338, 66560, 66561, 66562, 66563, 66564, 66565, 66566, 66567, 66568, 66569, 66570, 66571, 66572, 66573, 66574, 66575, 66576, 66577, 66578, 66579, 66580, 66581, 66582, 66583, 66584, 66585, 66586, 66587, 66588, 66589, 66590, 66591, 66592, 66593, 66594, 66595, 66596, 66597, 66598, 66599, 66736, 66737, 66738, 66739, 66740, 66741, 66742, 66743, 66744, 66745, 66746, 66747, 66748, 66749, 66750, 66751, 66752, 66753, 66754, 66755, 66756, 66757, 66758, 66759, 66760, 66761, 66762, 66763, 66764, 66765, 66766, 66767, 66768, 66769, 66770, 66771, 68736, 68737, 68738, 68739, 68740, 68741, 68742, 68743, 68744, 68745, 68746, 68747, 68748, 68749, 68750, 68751, 68752, 68753, 68754, 68755, 68756, 68757, 68758, 68759, 68760, 68761, 68762, 68763, 68764, 68765, 68766, 68767, 68768, 68769, 68770, 68771, 68772, 68773, 68774, 68775, 68776, 68777, 68778, 68779, 68780, 68781, 68782, 68783, 68784, 68785, 68786, 71840, 71841, 71842, 71843, 71844, 71845, 71846, 71847, 71848, 71849, 71850, 71851, 71852, 71853, 71854, 71855, 71856, 71857, 71858, 71859, 71860, 71861, 71862, 71863, 71864, 71865, 71866, 71867, 71868, 71869, 71870, 71871, 119808, 119809, 119810, 119811, 119812, 119813, 119814, 119815, 119816, 119817, 119818, 119819, 119820, 119821, 119822, 119823, 119824, 119825, 119826, 119827, 119828, 119829, 119830, 119831, 119832, 119833, 119860, 119861, 119862, 119863, 119864, 119865, 119866, 119867, 119868, 119869, 119870, 119871, 119872, 119873, 119874, 119875, 119876, 119877, 119878, 119879, 119880, 119881, 119882, 119883, 119884, 119885, 119912, 119913, 119914, 119915, 119916, 119917, 119918, 119919, 119920, 119921, 119922, 119923, 119924, 119925, 119926, 119927, 119928, 119929, 119930, 119931, 119932, 119933, 119934, 119935, 119936, 119937, 119964, 119966, 119967, 119970, 119973, 119974, 119977, 119978, 119979, 119980, 119982, 119983, 119984, 119985, 119986, 119987, 119988, 119989, 120016, 120017, 120018, 120019, 120020, 120021, 120022, 120023, 120024, 120025, 120026, 120027, 120028, 120029, 120030, 120031, 120032, 120033, 120034, 120035, 120036, 120037, 120038, 120039, 120040, 120041, 120068, 120069, 120071, 120072, 120073, 120074, 120077, 120078, 120079, 120080, 120081, 120082, 120083, 120084, 120086, 120087, 120088, 120089, 120090, 120091, 120092, 120120, 120121, 120123, 120124, 120125, 120126, 120128, 120129, 120130, 120131, 120132, 120134, 120138, 120139, 120140, 120141, 120142, 120143, 120144, 120172, 120173, 120174, 120175, 120176, 120177, 120178, 120179, 120180, 120181, 120182, 120183, 120184, 120185, 120186, 120187, 120188, 120189, 120190, 120191, 120192, 120193, 120194, 120195, 120196, 120197, 120224, 120225, 120226, 120227, 120228, 120229, 120230, 120231, 120232, 120233, 120234, 120235, 120236, 120237, 120238, 120239, 120240, 120241, 120242, 120243, 120244, 120245, 120246, 120247, 120248, 120249, 120276, 120277, 120278, 120279, 120280, 120281, 120282, 120283, 120284, 120285, 120286, 120287, 120288, 120289, 120290, 120291, 120292, 120293, 120294, 120295, 120296, 120297, 120298, 120299, 120300, 120301, 120328, 120329, 120330, 120331, 120332, 120333, 120334, 120335, 120336, 120337, 120338, 120339, 120340, 120341, 120342, 120343, 120344, 120345, 120346, 120347, 120348, 120349, 120350, 120351, 120352, 120353, 120380, 120381, 120382, 120383, 120384, 120385, 120386, 120387, 120388, 120389, 120390, 120391, 120392, 120393, 120394, 120395, 120396, 120397, 120398, 120399, 120400, 120401, 120402, 120403, 120404, 120405, 120432, 120433, 120434, 120435, 120436, 120437, 120438, 120439, 120440, 120441, 120442, 120443, 120444, 120445, 120446, 120447, 120448, 120449, 120450, 120451, 120452, 120453, 120454, 120455, 120456, 120457, 120488, 120489, 120490, 120491, 120492, 120493, 120494, 120495, 120496, 120497, 120498, 120499, 120500, 120501, 120502, 120503, 120504, 120505, 120506, 120507, 120508, 120509, 120510, 120511, 120512, 120546, 120547, 120548, 120549, 120550, 120551, 120552, 120553, 120554, 120555, 120556, 120557, 120558, 120559, 120560, 120561, 120562, 120563, 120564, 120565, 120566, 120567, 120568, 120569, 120570, 120604, 120605, 120606, 120607, 120608, 120609, 120610, 120611, 120612, 120613, 120614, 120615, 120616, 120617, 120618, 120619, 120620, 120621, 120622, 120623, 120624, 120625, 120626, 120627, 120628, 120662, 120663, 120664, 120665, 120666, 120667, 120668, 120669, 120670, 120671, 120672, 120673, 120674, 120675, 120676, 120677, 120678, 120679, 120680, 120681, 120682, 120683, 120684, 120685, 120686, 120720, 120721, 120722, 120723, 120724, 120725, 120726, 120727, 120728, 120729, 120730, 120731, 120732, 120733, 120734, 120735, 120736, 120737, 120738, 120739, 120740, 120741, 120742, 120743, 120744, 120778, 125184, 125185, 125186, 125187, 125188, 125189, 125190, 125191, 125192, 125193, 125194, 125195, 125196, 125197, 125198, 125199, 125200, 125201, 125202, 125203, 125204, 125205, 125206, 125207, 125208, 125209, 125210, 125211, 125212, 125213, 125214, 125215, 125216, 125217],
		Sk: [94, 96, 168, 175, 180, 184, 706, 707, 708, 709, 722, 723, 724, 725, 726, 727, 728, 729, 730, 731, 732, 733, 734, 735, 741, 742, 743, 744, 745, 746, 747, 749, 751, 752, 753, 754, 755, 756, 757, 758, 759, 760, 761, 762, 763, 764, 765, 766, 767, 885, 900, 901, 8125, 8127, 8128, 8129, 8141, 8142, 8143, 8157, 8158, 8159, 8173, 8174, 8175, 8189, 8190, 12443, 12444, 42752, 42753, 42754, 42755, 42756, 42757, 42758, 42759, 42760, 42761, 42762, 42763, 42764, 42765, 42766, 42767, 42768, 42769, 42770, 42771, 42772, 42773, 42774, 42784, 42785, 42889, 42890, 43867, 64434, 64435, 64436, 64437, 64438, 64439, 64440, 64441, 64442, 64443, 64444, 64445, 64446, 64447, 64448, 64449, 65342, 65344, 65507, 127995, 127996, 127997, 127998, 127999],
		Pc: [95, 8255, 8256, 8276, 65075, 65076, 65101, 65102, 65103, 65343],
		Ll: [97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 181, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 248, 249, 250, 251, 252, 253, 254, 255, 257, 259, 261, 263, 265, 267, 269, 271, 273, 275, 277, 279, 281, 283, 285, 287, 289, 291, 293, 295, 297, 299, 301, 303, 305, 307, 309, 311, 312, 314, 316, 318, 320, 322, 324, 326, 328, 329, 331, 333, 335, 337, 339, 341, 343, 345, 347, 349, 351, 353, 355, 357, 359, 361, 363, 365, 367, 369, 371, 373, 375, 378, 380, 382, 383, 384, 387, 389, 392, 396, 397, 402, 405, 409, 410, 411, 414, 417, 419, 421, 424, 426, 427, 429, 432, 436, 438, 441, 442, 445, 446, 447, 454, 457, 460, 462, 464, 466, 468, 470, 472, 474, 476, 477, 479, 481, 483, 485, 487, 489, 491, 493, 495, 496, 499, 501, 505, 507, 509, 511, 513, 515, 517, 519, 521, 523, 525, 527, 529, 531, 533, 535, 537, 539, 541, 543, 545, 547, 549, 551, 553, 555, 557, 559, 561, 563, 564, 565, 566, 567, 568, 569, 572, 575, 576, 578, 583, 585, 587, 589, 591, 592, 593, 594, 595, 596, 597, 598, 599, 600, 601, 602, 603, 604, 605, 606, 607, 608, 609, 610, 611, 612, 613, 614, 615, 616, 617, 618, 619, 620, 621, 622, 623, 624, 625, 626, 627, 628, 629, 630, 631, 632, 633, 634, 635, 636, 637, 638, 639, 640, 641, 642, 643, 644, 645, 646, 647, 648, 649, 650, 651, 652, 653, 654, 655, 656, 657, 658, 659, 661, 662, 663, 664, 665, 666, 667, 668, 669, 670, 671, 672, 673, 674, 675, 676, 677, 678, 679, 680, 681, 682, 683, 684, 685, 686, 687, 881, 883, 887, 891, 892, 893, 912, 940, 941, 942, 943, 944, 945, 946, 947, 948, 949, 950, 951, 952, 953, 954, 955, 956, 957, 958, 959, 960, 961, 962, 963, 964, 965, 966, 967, 968, 969, 970, 971, 972, 973, 974, 976, 977, 981, 982, 983, 985, 987, 989, 991, 993, 995, 997, 999, 1001, 1003, 1005, 1007, 1008, 1009, 1010, 1011, 1013, 1016, 1019, 1020, 1072, 1073, 1074, 1075, 1076, 1077, 1078, 1079, 1080, 1081, 1082, 1083, 1084, 1085, 1086, 1087, 1088, 1089, 1090, 1091, 1092, 1093, 1094, 1095, 1096, 1097, 1098, 1099, 1100, 1101, 1102, 1103, 1104, 1105, 1106, 1107, 1108, 1109, 1110, 1111, 1112, 1113, 1114, 1115, 1116, 1117, 1118, 1119, 1121, 1123, 1125, 1127, 1129, 1131, 1133, 1135, 1137, 1139, 1141, 1143, 1145, 1147, 1149, 1151, 1153, 1163, 1165, 1167, 1169, 1171, 1173, 1175, 1177, 1179, 1181, 1183, 1185, 1187, 1189, 1191, 1193, 1195, 1197, 1199, 1201, 1203, 1205, 1207, 1209, 1211, 1213, 1215, 1218, 1220, 1222, 1224, 1226, 1228, 1230, 1231, 1233, 1235, 1237, 1239, 1241, 1243, 1245, 1247, 1249, 1251, 1253, 1255, 1257, 1259, 1261, 1263, 1265, 1267, 1269, 1271, 1273, 1275, 1277, 1279, 1281, 1283, 1285, 1287, 1289, 1291, 1293, 1295, 1297, 1299, 1301, 1303, 1305, 1307, 1309, 1311, 1313, 1315, 1317, 1319, 1321, 1323, 1325, 1327, 1377, 1378, 1379, 1380, 1381, 1382, 1383, 1384, 1385, 1386, 1387, 1388, 1389, 1390, 1391, 1392, 1393, 1394, 1395, 1396, 1397, 1398, 1399, 1400, 1401, 1402, 1403, 1404, 1405, 1406, 1407, 1408, 1409, 1410, 1411, 1412, 1413, 1414, 1415, 5112, 5113, 5114, 5115, 5116, 5117, 7296, 7297, 7298, 7299, 7300, 7301, 7302, 7303, 7304, 7424, 7425, 7426, 7427, 7428, 7429, 7430, 7431, 7432, 7433, 7434, 7435, 7436, 7437, 7438, 7439, 7440, 7441, 7442, 7443, 7444, 7445, 7446, 7447, 7448, 7449, 7450, 7451, 7452, 7453, 7454, 7455, 7456, 7457, 7458, 7459, 7460, 7461, 7462, 7463, 7464, 7465, 7466, 7467, 7531, 7532, 7533, 7534, 7535, 7536, 7537, 7538, 7539, 7540, 7541, 7542, 7543, 7545, 7546, 7547, 7548, 7549, 7550, 7551, 7552, 7553, 7554, 7555, 7556, 7557, 7558, 7559, 7560, 7561, 7562, 7563, 7564, 7565, 7566, 7567, 7568, 7569, 7570, 7571, 7572, 7573, 7574, 7575, 7576, 7577, 7578, 7681, 7683, 7685, 7687, 7689, 7691, 7693, 7695, 7697, 7699, 7701, 7703, 7705, 7707, 7709, 7711, 7713, 7715, 7717, 7719, 7721, 7723, 7725, 7727, 7729, 7731, 7733, 7735, 7737, 7739, 7741, 7743, 7745, 7747, 7749, 7751, 7753, 7755, 7757, 7759, 7761, 7763, 7765, 7767, 7769, 7771, 7773, 7775, 7777, 7779, 7781, 7783, 7785, 7787, 7789, 7791, 7793, 7795, 7797, 7799, 7801, 7803, 7805, 7807, 7809, 7811, 7813, 7815, 7817, 7819, 7821, 7823, 7825, 7827, 7829, 7830, 7831, 7832, 7833, 7834, 7835, 7836, 7837, 7839, 7841, 7843, 7845, 7847, 7849, 7851, 7853, 7855, 7857, 7859, 7861, 7863, 7865, 7867, 7869, 7871, 7873, 7875, 7877, 7879, 7881, 7883, 7885, 7887, 7889, 7891, 7893, 7895, 7897, 7899, 7901, 7903, 7905, 7907, 7909, 7911, 7913, 7915, 7917, 7919, 7921, 7923, 7925, 7927, 7929, 7931, 7933, 7935, 7936, 7937, 7938, 7939, 7940, 7941, 7942, 7943, 7952, 7953, 7954, 7955, 7956, 7957, 7968, 7969, 7970, 7971, 7972, 7973, 7974, 7975, 7984, 7985, 7986, 7987, 7988, 7989, 7990, 7991, 8e3, 8001, 8002, 8003, 8004, 8005, 8016, 8017, 8018, 8019, 8020, 8021, 8022, 8023, 8032, 8033, 8034, 8035, 8036, 8037, 8038, 8039, 8048, 8049, 8050, 8051, 8052, 8053, 8054, 8055, 8056, 8057, 8058, 8059, 8060, 8061, 8064, 8065, 8066, 8067, 8068, 8069, 8070, 8071, 8080, 8081, 8082, 8083, 8084, 8085, 8086, 8087, 8096, 8097, 8098, 8099, 8100, 8101, 8102, 8103, 8112, 8113, 8114, 8115, 8116, 8118, 8119, 8126, 8130, 8131, 8132, 8134, 8135, 8144, 8145, 8146, 8147, 8150, 8151, 8160, 8161, 8162, 8163, 8164, 8165, 8166, 8167, 8178, 8179, 8180, 8182, 8183, 8458, 8462, 8463, 8467, 8495, 8500, 8505, 8508, 8509, 8518, 8519, 8520, 8521, 8526, 8580, 11312, 11313, 11314, 11315, 11316, 11317, 11318, 11319, 11320, 11321, 11322, 11323, 11324, 11325, 11326, 11327, 11328, 11329, 11330, 11331, 11332, 11333, 11334, 11335, 11336, 11337, 11338, 11339, 11340, 11341, 11342, 11343, 11344, 11345, 11346, 11347, 11348, 11349, 11350, 11351, 11352, 11353, 11354, 11355, 11356, 11357, 11358, 11361, 11365, 11366, 11368, 11370, 11372, 11377, 11379, 11380, 11382, 11383, 11384, 11385, 11386, 11387, 11393, 11395, 11397, 11399, 11401, 11403, 11405, 11407, 11409, 11411, 11413, 11415, 11417, 11419, 11421, 11423, 11425, 11427, 11429, 11431, 11433, 11435, 11437, 11439, 11441, 11443, 11445, 11447, 11449, 11451, 11453, 11455, 11457, 11459, 11461, 11463, 11465, 11467, 11469, 11471, 11473, 11475, 11477, 11479, 11481, 11483, 11485, 11487, 11489, 11491, 11492, 11500, 11502, 11507, 11520, 11521, 11522, 11523, 11524, 11525, 11526, 11527, 11528, 11529, 11530, 11531, 11532, 11533, 11534, 11535, 11536, 11537, 11538, 11539, 11540, 11541, 11542, 11543, 11544, 11545, 11546, 11547, 11548, 11549, 11550, 11551, 11552, 11553, 11554, 11555, 11556, 11557, 11559, 11565, 42561, 42563, 42565, 42567, 42569, 42571, 42573, 42575, 42577, 42579, 42581, 42583, 42585, 42587, 42589, 42591, 42593, 42595, 42597, 42599, 42601, 42603, 42605, 42625, 42627, 42629, 42631, 42633, 42635, 42637, 42639, 42641, 42643, 42645, 42647, 42649, 42651, 42787, 42789, 42791, 42793, 42795, 42797, 42799, 42800, 42801, 42803, 42805, 42807, 42809, 42811, 42813, 42815, 42817, 42819, 42821, 42823, 42825, 42827, 42829, 42831, 42833, 42835, 42837, 42839, 42841, 42843, 42845, 42847, 42849, 42851, 42853, 42855, 42857, 42859, 42861, 42863, 42865, 42866, 42867, 42868, 42869, 42870, 42871, 42872, 42874, 42876, 42879, 42881, 42883, 42885, 42887, 42892, 42894, 42897, 42899, 42900, 42901, 42903, 42905, 42907, 42909, 42911, 42913, 42915, 42917, 42919, 42921, 42933, 42935, 43002, 43824, 43825, 43826, 43827, 43828, 43829, 43830, 43831, 43832, 43833, 43834, 43835, 43836, 43837, 43838, 43839, 43840, 43841, 43842, 43843, 43844, 43845, 43846, 43847, 43848, 43849, 43850, 43851, 43852, 43853, 43854, 43855, 43856, 43857, 43858, 43859, 43860, 43861, 43862, 43863, 43864, 43865, 43866, 43872, 43873, 43874, 43875, 43876, 43877, 43888, 43889, 43890, 43891, 43892, 43893, 43894, 43895, 43896, 43897, 43898, 43899, 43900, 43901, 43902, 43903, 43904, 43905, 43906, 43907, 43908, 43909, 43910, 43911, 43912, 43913, 43914, 43915, 43916, 43917, 43918, 43919, 43920, 43921, 43922, 43923, 43924, 43925, 43926, 43927, 43928, 43929, 43930, 43931, 43932, 43933, 43934, 43935, 43936, 43937, 43938, 43939, 43940, 43941, 43942, 43943, 43944, 43945, 43946, 43947, 43948, 43949, 43950, 43951, 43952, 43953, 43954, 43955, 43956, 43957, 43958, 43959, 43960, 43961, 43962, 43963, 43964, 43965, 43966, 43967, 64256, 64257, 64258, 64259, 64260, 64261, 64262, 64275, 64276, 64277, 64278, 64279, 65345, 65346, 65347, 65348, 65349, 65350, 65351, 65352, 65353, 65354, 65355, 65356, 65357, 65358, 65359, 65360, 65361, 65362, 65363, 65364, 65365, 65366, 65367, 65368, 65369, 65370, 66600, 66601, 66602, 66603, 66604, 66605, 66606, 66607, 66608, 66609, 66610, 66611, 66612, 66613, 66614, 66615, 66616, 66617, 66618, 66619, 66620, 66621, 66622, 66623, 66624, 66625, 66626, 66627, 66628, 66629, 66630, 66631, 66632, 66633, 66634, 66635, 66636, 66637, 66638, 66639, 66776, 66777, 66778, 66779, 66780, 66781, 66782, 66783, 66784, 66785, 66786, 66787, 66788, 66789, 66790, 66791, 66792, 66793, 66794, 66795, 66796, 66797, 66798, 66799, 66800, 66801, 66802, 66803, 66804, 66805, 66806, 66807, 66808, 66809, 66810, 66811, 68800, 68801, 68802, 68803, 68804, 68805, 68806, 68807, 68808, 68809, 68810, 68811, 68812, 68813, 68814, 68815, 68816, 68817, 68818, 68819, 68820, 68821, 68822, 68823, 68824, 68825, 68826, 68827, 68828, 68829, 68830, 68831, 68832, 68833, 68834, 68835, 68836, 68837, 68838, 68839, 68840, 68841, 68842, 68843, 68844, 68845, 68846, 68847, 68848, 68849, 68850, 71872, 71873, 71874, 71875, 71876, 71877, 71878, 71879, 71880, 71881, 71882, 71883, 71884, 71885, 71886, 71887, 71888, 71889, 71890, 71891, 71892, 71893, 71894, 71895, 71896, 71897, 71898, 71899, 71900, 71901, 71902, 71903, 119834, 119835, 119836, 119837, 119838, 119839, 119840, 119841, 119842, 119843, 119844, 119845, 119846, 119847, 119848, 119849, 119850, 119851, 119852, 119853, 119854, 119855, 119856, 119857, 119858, 119859, 119886, 119887, 119888, 119889, 119890, 119891, 119892, 119894, 119895, 119896, 119897, 119898, 119899, 119900, 119901, 119902, 119903, 119904, 119905, 119906, 119907, 119908, 119909, 119910, 119911, 119938, 119939, 119940, 119941, 119942, 119943, 119944, 119945, 119946, 119947, 119948, 119949, 119950, 119951, 119952, 119953, 119954, 119955, 119956, 119957, 119958, 119959, 119960, 119961, 119962, 119963, 119990, 119991, 119992, 119993, 119995, 119997, 119998, 119999, 12e4, 120001, 120002, 120003, 120005, 120006, 120007, 120008, 120009, 120010, 120011, 120012, 120013, 120014, 120015, 120042, 120043, 120044, 120045, 120046, 120047, 120048, 120049, 120050, 120051, 120052, 120053, 120054, 120055, 120056, 120057, 120058, 120059, 120060, 120061, 120062, 120063, 120064, 120065, 120066, 120067, 120094, 120095, 120096, 120097, 120098, 120099, 120100, 120101, 120102, 120103, 120104, 120105, 120106, 120107, 120108, 120109, 120110, 120111, 120112, 120113, 120114, 120115, 120116, 120117, 120118, 120119, 120146, 120147, 120148, 120149, 120150, 120151, 120152, 120153, 120154, 120155, 120156, 120157, 120158, 120159, 120160, 120161, 120162, 120163, 120164, 120165, 120166, 120167, 120168, 120169, 120170, 120171, 120198, 120199, 120200, 120201, 120202, 120203, 120204, 120205, 120206, 120207, 120208, 120209, 120210, 120211, 120212, 120213, 120214, 120215, 120216, 120217, 120218, 120219, 120220, 120221, 120222, 120223, 120250, 120251, 120252, 120253, 120254, 120255, 120256, 120257, 120258, 120259, 120260, 120261, 120262, 120263, 120264, 120265, 120266, 120267, 120268, 120269, 120270, 120271, 120272, 120273, 120274, 120275, 120302, 120303, 120304, 120305, 120306, 120307, 120308, 120309, 120310, 120311, 120312, 120313, 120314, 120315, 120316, 120317, 120318, 120319, 120320, 120321, 120322, 120323, 120324, 120325, 120326, 120327, 120354, 120355, 120356, 120357, 120358, 120359, 120360, 120361, 120362, 120363, 120364, 120365, 120366, 120367, 120368, 120369, 120370, 120371, 120372, 120373, 120374, 120375, 120376, 120377, 120378, 120379, 120406, 120407, 120408, 120409, 120410, 120411, 120412, 120413, 120414, 120415, 120416, 120417, 120418, 120419, 120420, 120421, 120422, 120423, 120424, 120425, 120426, 120427, 120428, 120429, 120430, 120431, 120458, 120459, 120460, 120461, 120462, 120463, 120464, 120465, 120466, 120467, 120468, 120469, 120470, 120471, 120472, 120473, 120474, 120475, 120476, 120477, 120478, 120479, 120480, 120481, 120482, 120483, 120484, 120485, 120514, 120515, 120516, 120517, 120518, 120519, 120520, 120521, 120522, 120523, 120524, 120525, 120526, 120527, 120528, 120529, 120530, 120531, 120532, 120533, 120534, 120535, 120536, 120537, 120538, 120540, 120541, 120542, 120543, 120544, 120545, 120572, 120573, 120574, 120575, 120576, 120577, 120578, 120579, 120580, 120581, 120582, 120583, 120584, 120585, 120586, 120587, 120588, 120589, 120590, 120591, 120592, 120593, 120594, 120595, 120596, 120598, 120599, 120600, 120601, 120602, 120603, 120630, 120631, 120632, 120633, 120634, 120635, 120636, 120637, 120638, 120639, 120640, 120641, 120642, 120643, 120644, 120645, 120646, 120647, 120648, 120649, 120650, 120651, 120652, 120653, 120654, 120656, 120657, 120658, 120659, 120660, 120661, 120688, 120689, 120690, 120691, 120692, 120693, 120694, 120695, 120696, 120697, 120698, 120699, 120700, 120701, 120702, 120703, 120704, 120705, 120706, 120707, 120708, 120709, 120710, 120711, 120712, 120714, 120715, 120716, 120717, 120718, 120719, 120746, 120747, 120748, 120749, 120750, 120751, 120752, 120753, 120754, 120755, 120756, 120757, 120758, 120759, 120760, 120761, 120762, 120763, 120764, 120765, 120766, 120767, 120768, 120769, 120770, 120772, 120773, 120774, 120775, 120776, 120777, 120779, 125218, 125219, 125220, 125221, 125222, 125223, 125224, 125225, 125226, 125227, 125228, 125229, 125230, 125231, 125232, 125233, 125234, 125235, 125236, 125237, 125238, 125239, 125240, 125241, 125242, 125243, 125244, 125245, 125246, 125247, 125248, 125249, 125250, 125251],
		So: [166, 169, 174, 176, 1154, 1421, 1422, 1550, 1551, 1758, 1769, 1789, 1790, 2038, 2554, 2928, 3059, 3060, 3061, 3062, 3063, 3064, 3066, 3199, 3407, 3449, 3841, 3842, 3843, 3859, 3861, 3862, 3863, 3866, 3867, 3868, 3869, 3870, 3871, 3892, 3894, 3896, 4030, 4031, 4032, 4033, 4034, 4035, 4036, 4037, 4039, 4040, 4041, 4042, 4043, 4044, 4046, 4047, 4053, 4054, 4055, 4056, 4254, 4255, 5008, 5009, 5010, 5011, 5012, 5013, 5014, 5015, 5016, 5017, 6464, 6622, 6623, 6624, 6625, 6626, 6627, 6628, 6629, 6630, 6631, 6632, 6633, 6634, 6635, 6636, 6637, 6638, 6639, 6640, 6641, 6642, 6643, 6644, 6645, 6646, 6647, 6648, 6649, 6650, 6651, 6652, 6653, 6654, 6655, 7009, 7010, 7011, 7012, 7013, 7014, 7015, 7016, 7017, 7018, 7028, 7029, 7030, 7031, 7032, 7033, 7034, 7035, 7036, 8448, 8449, 8451, 8452, 8453, 8454, 8456, 8457, 8468, 8470, 8471, 8478, 8479, 8480, 8481, 8482, 8483, 8485, 8487, 8489, 8494, 8506, 8507, 8522, 8524, 8525, 8527, 8586, 8587, 8597, 8598, 8599, 8600, 8601, 8604, 8605, 8606, 8607, 8609, 8610, 8612, 8613, 8615, 8616, 8617, 8618, 8619, 8620, 8621, 8623, 8624, 8625, 8626, 8627, 8628, 8629, 8630, 8631, 8632, 8633, 8634, 8635, 8636, 8637, 8638, 8639, 8640, 8641, 8642, 8643, 8644, 8645, 8646, 8647, 8648, 8649, 8650, 8651, 8652, 8653, 8656, 8657, 8659, 8661, 8662, 8663, 8664, 8665, 8666, 8667, 8668, 8669, 8670, 8671, 8672, 8673, 8674, 8675, 8676, 8677, 8678, 8679, 8680, 8681, 8682, 8683, 8684, 8685, 8686, 8687, 8688, 8689, 8690, 8691, 8960, 8961, 8962, 8963, 8964, 8965, 8966, 8967, 8972, 8973, 8974, 8975, 8976, 8977, 8978, 8979, 8980, 8981, 8982, 8983, 8984, 8985, 8986, 8987, 8988, 8989, 8990, 8991, 8994, 8995, 8996, 8997, 8998, 8999, 9e3, 9003, 9004, 9005, 9006, 9007, 9008, 9009, 9010, 9011, 9012, 9013, 9014, 9015, 9016, 9017, 9018, 9019, 9020, 9021, 9022, 9023, 9024, 9025, 9026, 9027, 9028, 9029, 9030, 9031, 9032, 9033, 9034, 9035, 9036, 9037, 9038, 9039, 9040, 9041, 9042, 9043, 9044, 9045, 9046, 9047, 9048, 9049, 9050, 9051, 9052, 9053, 9054, 9055, 9056, 9057, 9058, 9059, 9060, 9061, 9062, 9063, 9064, 9065, 9066, 9067, 9068, 9069, 9070, 9071, 9072, 9073, 9074, 9075, 9076, 9077, 9078, 9079, 9080, 9081, 9082, 9083, 9085, 9086, 9087, 9088, 9089, 9090, 9091, 9092, 9093, 9094, 9095, 9096, 9097, 9098, 9099, 9100, 9101, 9102, 9103, 9104, 9105, 9106, 9107, 9108, 9109, 9110, 9111, 9112, 9113, 9114, 9140, 9141, 9142, 9143, 9144, 9145, 9146, 9147, 9148, 9149, 9150, 9151, 9152, 9153, 9154, 9155, 9156, 9157, 9158, 9159, 9160, 9161, 9162, 9163, 9164, 9165, 9166, 9167, 9168, 9169, 9170, 9171, 9172, 9173, 9174, 9175, 9176, 9177, 9178, 9179, 9186, 9187, 9188, 9189, 9190, 9191, 9192, 9193, 9194, 9195, 9196, 9197, 9198, 9199, 9200, 9201, 9202, 9203, 9204, 9205, 9206, 9207, 9208, 9209, 9210, 9211, 9212, 9213, 9214, 9215, 9216, 9217, 9218, 9219, 9220, 9221, 9222, 9223, 9224, 9225, 9226, 9227, 9228, 9229, 9230, 9231, 9232, 9233, 9234, 9235, 9236, 9237, 9238, 9239, 9240, 9241, 9242, 9243, 9244, 9245, 9246, 9247, 9248, 9249, 9250, 9251, 9252, 9253, 9254, 9280, 9281, 9282, 9283, 9284, 9285, 9286, 9287, 9288, 9289, 9290, 9372, 9373, 9374, 9375, 9376, 9377, 9378, 9379, 9380, 9381, 9382, 9383, 9384, 9385, 9386, 9387, 9388, 9389, 9390, 9391, 9392, 9393, 9394, 9395, 9396, 9397, 9398, 9399, 9400, 9401, 9402, 9403, 9404, 9405, 9406, 9407, 9408, 9409, 9410, 9411, 9412, 9413, 9414, 9415, 9416, 9417, 9418, 9419, 9420, 9421, 9422, 9423, 9424, 9425, 9426, 9427, 9428, 9429, 9430, 9431, 9432, 9433, 9434, 9435, 9436, 9437, 9438, 9439, 9440, 9441, 9442, 9443, 9444, 9445, 9446, 9447, 9448, 9449, 9472, 9473, 9474, 9475, 9476, 9477, 9478, 9479, 9480, 9481, 9482, 9483, 9484, 9485, 9486, 9487, 9488, 9489, 9490, 9491, 9492, 9493, 9494, 9495, 9496, 9497, 9498, 9499, 9500, 9501, 9502, 9503, 9504, 9505, 9506, 9507, 9508, 9509, 9510, 9511, 9512, 9513, 9514, 9515, 9516, 9517, 9518, 9519, 9520, 9521, 9522, 9523, 9524, 9525, 9526, 9527, 9528, 9529, 9530, 9531, 9532, 9533, 9534, 9535, 9536, 9537, 9538, 9539, 9540, 9541, 9542, 9543, 9544, 9545, 9546, 9547, 9548, 9549, 9550, 9551, 9552, 9553, 9554, 9555, 9556, 9557, 9558, 9559, 9560, 9561, 9562, 9563, 9564, 9565, 9566, 9567, 9568, 9569, 9570, 9571, 9572, 9573, 9574, 9575, 9576, 9577, 9578, 9579, 9580, 9581, 9582, 9583, 9584, 9585, 9586, 9587, 9588, 9589, 9590, 9591, 9592, 9593, 9594, 9595, 9596, 9597, 9598, 9599, 9600, 9601, 9602, 9603, 9604, 9605, 9606, 9607, 9608, 9609, 9610, 9611, 9612, 9613, 9614, 9615, 9616, 9617, 9618, 9619, 9620, 9621, 9622, 9623, 9624, 9625, 9626, 9627, 9628, 9629, 9630, 9631, 9632, 9633, 9634, 9635, 9636, 9637, 9638, 9639, 9640, 9641, 9642, 9643, 9644, 9645, 9646, 9647, 9648, 9649, 9650, 9651, 9652, 9653, 9654, 9656, 9657, 9658, 9659, 9660, 9661, 9662, 9663, 9664, 9666, 9667, 9668, 9669, 9670, 9671, 9672, 9673, 9674, 9675, 9676, 9677, 9678, 9679, 9680, 9681, 9682, 9683, 9684, 9685, 9686, 9687, 9688, 9689, 9690, 9691, 9692, 9693, 9694, 9695, 9696, 9697, 9698, 9699, 9700, 9701, 9702, 9703, 9704, 9705, 9706, 9707, 9708, 9709, 9710, 9711, 9712, 9713, 9714, 9715, 9716, 9717, 9718, 9719, 9728, 9729, 9730, 9731, 9732, 9733, 9734, 9735, 9736, 9737, 9738, 9739, 9740, 9741, 9742, 9743, 9744, 9745, 9746, 9747, 9748, 9749, 9750, 9751, 9752, 9753, 9754, 9755, 9756, 9757, 9758, 9759, 9760, 9761, 9762, 9763, 9764, 9765, 9766, 9767, 9768, 9769, 9770, 9771, 9772, 9773, 9774, 9775, 9776, 9777, 9778, 9779, 9780, 9781, 9782, 9783, 9784, 9785, 9786, 9787, 9788, 9789, 9790, 9791, 9792, 9793, 9794, 9795, 9796, 9797, 9798, 9799, 9800, 9801, 9802, 9803, 9804, 9805, 9806, 9807, 9808, 9809, 9810, 9811, 9812, 9813, 9814, 9815, 9816, 9817, 9818, 9819, 9820, 9821, 9822, 9823, 9824, 9825, 9826, 9827, 9828, 9829, 9830, 9831, 9832, 9833, 9834, 9835, 9836, 9837, 9838, 9840, 9841, 9842, 9843, 9844, 9845, 9846, 9847, 9848, 9849, 9850, 9851, 9852, 9853, 9854, 9855, 9856, 9857, 9858, 9859, 9860, 9861, 9862, 9863, 9864, 9865, 9866, 9867, 9868, 9869, 9870, 9871, 9872, 9873, 9874, 9875, 9876, 9877, 9878, 9879, 9880, 9881, 9882, 9883, 9884, 9885, 9886, 9887, 9888, 9889, 9890, 9891, 9892, 9893, 9894, 9895, 9896, 9897, 9898, 9899, 9900, 9901, 9902, 9903, 9904, 9905, 9906, 9907, 9908, 9909, 9910, 9911, 9912, 9913, 9914, 9915, 9916, 9917, 9918, 9919, 9920, 9921, 9922, 9923, 9924, 9925, 9926, 9927, 9928, 9929, 9930, 9931, 9932, 9933, 9934, 9935, 9936, 9937, 9938, 9939, 9940, 9941, 9942, 9943, 9944, 9945, 9946, 9947, 9948, 9949, 9950, 9951, 9952, 9953, 9954, 9955, 9956, 9957, 9958, 9959, 9960, 9961, 9962, 9963, 9964, 9965, 9966, 9967, 9968, 9969, 9970, 9971, 9972, 9973, 9974, 9975, 9976, 9977, 9978, 9979, 9980, 9981, 9982, 9983, 9984, 9985, 9986, 9987, 9988, 9989, 9990, 9991, 9992, 9993, 9994, 9995, 9996, 9997, 9998, 9999, 1e4, 10001, 10002, 10003, 10004, 10005, 10006, 10007, 10008, 10009, 10010, 10011, 10012, 10013, 10014, 10015, 10016, 10017, 10018, 10019, 10020, 10021, 10022, 10023, 10024, 10025, 10026, 10027, 10028, 10029, 10030, 10031, 10032, 10033, 10034, 10035, 10036, 10037, 10038, 10039, 10040, 10041, 10042, 10043, 10044, 10045, 10046, 10047, 10048, 10049, 10050, 10051, 10052, 10053, 10054, 10055, 10056, 10057, 10058, 10059, 10060, 10061, 10062, 10063, 10064, 10065, 10066, 10067, 10068, 10069, 10070, 10071, 10072, 10073, 10074, 10075, 10076, 10077, 10078, 10079, 10080, 10081, 10082, 10083, 10084, 10085, 10086, 10087, 10132, 10133, 10134, 10135, 10136, 10137, 10138, 10139, 10140, 10141, 10142, 10143, 10144, 10145, 10146, 10147, 10148, 10149, 10150, 10151, 10152, 10153, 10154, 10155, 10156, 10157, 10158, 10159, 10160, 10161, 10162, 10163, 10164, 10165, 10166, 10167, 10168, 10169, 10170, 10171, 10172, 10173, 10174, 10175, 10240, 10241, 10242, 10243, 10244, 10245, 10246, 10247, 10248, 10249, 10250, 10251, 10252, 10253, 10254, 10255, 10256, 10257, 10258, 10259, 10260, 10261, 10262, 10263, 10264, 10265, 10266, 10267, 10268, 10269, 10270, 10271, 10272, 10273, 10274, 10275, 10276, 10277, 10278, 10279, 10280, 10281, 10282, 10283, 10284, 10285, 10286, 10287, 10288, 10289, 10290, 10291, 10292, 10293, 10294, 10295, 10296, 10297, 10298, 10299, 10300, 10301, 10302, 10303, 10304, 10305, 10306, 10307, 10308, 10309, 10310, 10311, 10312, 10313, 10314, 10315, 10316, 10317, 10318, 10319, 10320, 10321, 10322, 10323, 10324, 10325, 10326, 10327, 10328, 10329, 10330, 10331, 10332, 10333, 10334, 10335, 10336, 10337, 10338, 10339, 10340, 10341, 10342, 10343, 10344, 10345, 10346, 10347, 10348, 10349, 10350, 10351, 10352, 10353, 10354, 10355, 10356, 10357, 10358, 10359, 10360, 10361, 10362, 10363, 10364, 10365, 10366, 10367, 10368, 10369, 10370, 10371, 10372, 10373, 10374, 10375, 10376, 10377, 10378, 10379, 10380, 10381, 10382, 10383, 10384, 10385, 10386, 10387, 10388, 10389, 10390, 10391, 10392, 10393, 10394, 10395, 10396, 10397, 10398, 10399, 10400, 10401, 10402, 10403, 10404, 10405, 10406, 10407, 10408, 10409, 10410, 10411, 10412, 10413, 10414, 10415, 10416, 10417, 10418, 10419, 10420, 10421, 10422, 10423, 10424, 10425, 10426, 10427, 10428, 10429, 10430, 10431, 10432, 10433, 10434, 10435, 10436, 10437, 10438, 10439, 10440, 10441, 10442, 10443, 10444, 10445, 10446, 10447, 10448, 10449, 10450, 10451, 10452, 10453, 10454, 10455, 10456, 10457, 10458, 10459, 10460, 10461, 10462, 10463, 10464, 10465, 10466, 10467, 10468, 10469, 10470, 10471, 10472, 10473, 10474, 10475, 10476, 10477, 10478, 10479, 10480, 10481, 10482, 10483, 10484, 10485, 10486, 10487, 10488, 10489, 10490, 10491, 10492, 10493, 10494, 10495, 11008, 11009, 11010, 11011, 11012, 11013, 11014, 11015, 11016, 11017, 11018, 11019, 11020, 11021, 11022, 11023, 11024, 11025, 11026, 11027, 11028, 11029, 11030, 11031, 11032, 11033, 11034, 11035, 11036, 11037, 11038, 11039, 11040, 11041, 11042, 11043, 11044, 11045, 11046, 11047, 11048, 11049, 11050, 11051, 11052, 11053, 11054, 11055, 11077, 11078, 11085, 11086, 11087, 11088, 11089, 11090, 11091, 11092, 11093, 11094, 11095, 11096, 11097, 11098, 11099, 11100, 11101, 11102, 11103, 11104, 11105, 11106, 11107, 11108, 11109, 11110, 11111, 11112, 11113, 11114, 11115, 11116, 11117, 11118, 11119, 11120, 11121, 11122, 11123, 11126, 11127, 11128, 11129, 11130, 11131, 11132, 11133, 11134, 11135, 11136, 11137, 11138, 11139, 11140, 11141, 11142, 11143, 11144, 11145, 11146, 11147, 11148, 11149, 11150, 11151, 11152, 11153, 11154, 11155, 11156, 11157, 11160, 11161, 11162, 11163, 11164, 11165, 11166, 11167, 11168, 11169, 11170, 11171, 11172, 11173, 11174, 11175, 11176, 11177, 11178, 11179, 11180, 11181, 11182, 11183, 11184, 11185, 11186, 11187, 11188, 11189, 11190, 11191, 11192, 11193, 11197, 11198, 11199, 11200, 11201, 11202, 11203, 11204, 11205, 11206, 11207, 11208, 11210, 11211, 11212, 11213, 11214, 11215, 11216, 11217, 11218, 11244, 11245, 11246, 11247, 11493, 11494, 11495, 11496, 11497, 11498, 11904, 11905, 11906, 11907, 11908, 11909, 11910, 11911, 11912, 11913, 11914, 11915, 11916, 11917, 11918, 11919, 11920, 11921, 11922, 11923, 11924, 11925, 11926, 11927, 11928, 11929, 11931, 11932, 11933, 11934, 11935, 11936, 11937, 11938, 11939, 11940, 11941, 11942, 11943, 11944, 11945, 11946, 11947, 11948, 11949, 11950, 11951, 11952, 11953, 11954, 11955, 11956, 11957, 11958, 11959, 11960, 11961, 11962, 11963, 11964, 11965, 11966, 11967, 11968, 11969, 11970, 11971, 11972, 11973, 11974, 11975, 11976, 11977, 11978, 11979, 11980, 11981, 11982, 11983, 11984, 11985, 11986, 11987, 11988, 11989, 11990, 11991, 11992, 11993, 11994, 11995, 11996, 11997, 11998, 11999, 12e3, 12001, 12002, 12003, 12004, 12005, 12006, 12007, 12008, 12009, 12010, 12011, 12012, 12013, 12014, 12015, 12016, 12017, 12018, 12019, 12032, 12033, 12034, 12035, 12036, 12037, 12038, 12039, 12040, 12041, 12042, 12043, 12044, 12045, 12046, 12047, 12048, 12049, 12050, 12051, 12052, 12053, 12054, 12055, 12056, 12057, 12058, 12059, 12060, 12061, 12062, 12063, 12064, 12065, 12066, 12067, 12068, 12069, 12070, 12071, 12072, 12073, 12074, 12075, 12076, 12077, 12078, 12079, 12080, 12081, 12082, 12083, 12084, 12085, 12086, 12087, 12088, 12089, 12090, 12091, 12092, 12093, 12094, 12095, 12096, 12097, 12098, 12099, 12100, 12101, 12102, 12103, 12104, 12105, 12106, 12107, 12108, 12109, 12110, 12111, 12112, 12113, 12114, 12115, 12116, 12117, 12118, 12119, 12120, 12121, 12122, 12123, 12124, 12125, 12126, 12127, 12128, 12129, 12130, 12131, 12132, 12133, 12134, 12135, 12136, 12137, 12138, 12139, 12140, 12141, 12142, 12143, 12144, 12145, 12146, 12147, 12148, 12149, 12150, 12151, 12152, 12153, 12154, 12155, 12156, 12157, 12158, 12159, 12160, 12161, 12162, 12163, 12164, 12165, 12166, 12167, 12168, 12169, 12170, 12171, 12172, 12173, 12174, 12175, 12176, 12177, 12178, 12179, 12180, 12181, 12182, 12183, 12184, 12185, 12186, 12187, 12188, 12189, 12190, 12191, 12192, 12193, 12194, 12195, 12196, 12197, 12198, 12199, 12200, 12201, 12202, 12203, 12204, 12205, 12206, 12207, 12208, 12209, 12210, 12211, 12212, 12213, 12214, 12215, 12216, 12217, 12218, 12219, 12220, 12221, 12222, 12223, 12224, 12225, 12226, 12227, 12228, 12229, 12230, 12231, 12232, 12233, 12234, 12235, 12236, 12237, 12238, 12239, 12240, 12241, 12242, 12243, 12244, 12245, 12272, 12273, 12274, 12275, 12276, 12277, 12278, 12279, 12280, 12281, 12282, 12283, 12292, 12306, 12307, 12320, 12342, 12343, 12350, 12351, 12688, 12689, 12694, 12695, 12696, 12697, 12698, 12699, 12700, 12701, 12702, 12703, 12736, 12737, 12738, 12739, 12740, 12741, 12742, 12743, 12744, 12745, 12746, 12747, 12748, 12749, 12750, 12751, 12752, 12753, 12754, 12755, 12756, 12757, 12758, 12759, 12760, 12761, 12762, 12763, 12764, 12765, 12766, 12767, 12768, 12769, 12770, 12771, 12800, 12801, 12802, 12803, 12804, 12805, 12806, 12807, 12808, 12809, 12810, 12811, 12812, 12813, 12814, 12815, 12816, 12817, 12818, 12819, 12820, 12821, 12822, 12823, 12824, 12825, 12826, 12827, 12828, 12829, 12830, 12842, 12843, 12844, 12845, 12846, 12847, 12848, 12849, 12850, 12851, 12852, 12853, 12854, 12855, 12856, 12857, 12858, 12859, 12860, 12861, 12862, 12863, 12864, 12865, 12866, 12867, 12868, 12869, 12870, 12871, 12880, 12896, 12897, 12898, 12899, 12900, 12901, 12902, 12903, 12904, 12905, 12906, 12907, 12908, 12909, 12910, 12911, 12912, 12913, 12914, 12915, 12916, 12917, 12918, 12919, 12920, 12921, 12922, 12923, 12924, 12925, 12926, 12927, 12938, 12939, 12940, 12941, 12942, 12943, 12944, 12945, 12946, 12947, 12948, 12949, 12950, 12951, 12952, 12953, 12954, 12955, 12956, 12957, 12958, 12959, 12960, 12961, 12962, 12963, 12964, 12965, 12966, 12967, 12968, 12969, 12970, 12971, 12972, 12973, 12974, 12975, 12976, 12992, 12993, 12994, 12995, 12996, 12997, 12998, 12999, 13e3, 13001, 13002, 13003, 13004, 13005, 13006, 13007, 13008, 13009, 13010, 13011, 13012, 13013, 13014, 13015, 13016, 13017, 13018, 13019, 13020, 13021, 13022, 13023, 13024, 13025, 13026, 13027, 13028, 13029, 13030, 13031, 13032, 13033, 13034, 13035, 13036, 13037, 13038, 13039, 13040, 13041, 13042, 13043, 13044, 13045, 13046, 13047, 13048, 13049, 13050, 13051, 13052, 13053, 13054, 13056, 13057, 13058, 13059, 13060, 13061, 13062, 13063, 13064, 13065, 13066, 13067, 13068, 13069, 13070, 13071, 13072, 13073, 13074, 13075, 13076, 13077, 13078, 13079, 13080, 13081, 13082, 13083, 13084, 13085, 13086, 13087, 13088, 13089, 13090, 13091, 13092, 13093, 13094, 13095, 13096, 13097, 13098, 13099, 13100, 13101, 13102, 13103, 13104, 13105, 13106, 13107, 13108, 13109, 13110, 13111, 13112, 13113, 13114, 13115, 13116, 13117, 13118, 13119, 13120, 13121, 13122, 13123, 13124, 13125, 13126, 13127, 13128, 13129, 13130, 13131, 13132, 13133, 13134, 13135, 13136, 13137, 13138, 13139, 13140, 13141, 13142, 13143, 13144, 13145, 13146, 13147, 13148, 13149, 13150, 13151, 13152, 13153, 13154, 13155, 13156, 13157, 13158, 13159, 13160, 13161, 13162, 13163, 13164, 13165, 13166, 13167, 13168, 13169, 13170, 13171, 13172, 13173, 13174, 13175, 13176, 13177, 13178, 13179, 13180, 13181, 13182, 13183, 13184, 13185, 13186, 13187, 13188, 13189, 13190, 13191, 13192, 13193, 13194, 13195, 13196, 13197, 13198, 13199, 13200, 13201, 13202, 13203, 13204, 13205, 13206, 13207, 13208, 13209, 13210, 13211, 13212, 13213, 13214, 13215, 13216, 13217, 13218, 13219, 13220, 13221, 13222, 13223, 13224, 13225, 13226, 13227, 13228, 13229, 13230, 13231, 13232, 13233, 13234, 13235, 13236, 13237, 13238, 13239, 13240, 13241, 13242, 13243, 13244, 13245, 13246, 13247, 13248, 13249, 13250, 13251, 13252, 13253, 13254, 13255, 13256, 13257, 13258, 13259, 13260, 13261, 13262, 13263, 13264, 13265, 13266, 13267, 13268, 13269, 13270, 13271, 13272, 13273, 13274, 13275, 13276, 13277, 13278, 13279, 13280, 13281, 13282, 13283, 13284, 13285, 13286, 13287, 13288, 13289, 13290, 13291, 13292, 13293, 13294, 13295, 13296, 13297, 13298, 13299, 13300, 13301, 13302, 13303, 13304, 13305, 13306, 13307, 13308, 13309, 13310, 13311, 19904, 19905, 19906, 19907, 19908, 19909, 19910, 19911, 19912, 19913, 19914, 19915, 19916, 19917, 19918, 19919, 19920, 19921, 19922, 19923, 19924, 19925, 19926, 19927, 19928, 19929, 19930, 19931, 19932, 19933, 19934, 19935, 19936, 19937, 19938, 19939, 19940, 19941, 19942, 19943, 19944, 19945, 19946, 19947, 19948, 19949, 19950, 19951, 19952, 19953, 19954, 19955, 19956, 19957, 19958, 19959, 19960, 19961, 19962, 19963, 19964, 19965, 19966, 19967, 42128, 42129, 42130, 42131, 42132, 42133, 42134, 42135, 42136, 42137, 42138, 42139, 42140, 42141, 42142, 42143, 42144, 42145, 42146, 42147, 42148, 42149, 42150, 42151, 42152, 42153, 42154, 42155, 42156, 42157, 42158, 42159, 42160, 42161, 42162, 42163, 42164, 42165, 42166, 42167, 42168, 42169, 42170, 42171, 42172, 42173, 42174, 42175, 42176, 42177, 42178, 42179, 42180, 42181, 42182, 43048, 43049, 43050, 43051, 43062, 43063, 43065, 43639, 43640, 43641, 65021, 65508, 65512, 65517, 65518, 65532, 65533, 65847, 65848, 65849, 65850, 65851, 65852, 65853, 65854, 65855, 65913, 65914, 65915, 65916, 65917, 65918, 65919, 65920, 65921, 65922, 65923, 65924, 65925, 65926, 65927, 65928, 65929, 65932, 65933, 65934, 65936, 65937, 65938, 65939, 65940, 65941, 65942, 65943, 65944, 65945, 65946, 65947, 65952, 66e3, 66001, 66002, 66003, 66004, 66005, 66006, 66007, 66008, 66009, 66010, 66011, 66012, 66013, 66014, 66015, 66016, 66017, 66018, 66019, 66020, 66021, 66022, 66023, 66024, 66025, 66026, 66027, 66028, 66029, 66030, 66031, 66032, 66033, 66034, 66035, 66036, 66037, 66038, 66039, 66040, 66041, 66042, 66043, 66044, 67703, 67704, 68296, 71487, 92988, 92989, 92990, 92991, 92997, 113820, 118784, 118785, 118786, 118787, 118788, 118789, 118790, 118791, 118792, 118793, 118794, 118795, 118796, 118797, 118798, 118799, 118800, 118801, 118802, 118803, 118804, 118805, 118806, 118807, 118808, 118809, 118810, 118811, 118812, 118813, 118814, 118815, 118816, 118817, 118818, 118819, 118820, 118821, 118822, 118823, 118824, 118825, 118826, 118827, 118828, 118829, 118830, 118831, 118832, 118833, 118834, 118835, 118836, 118837, 118838, 118839, 118840, 118841, 118842, 118843, 118844, 118845, 118846, 118847, 118848, 118849, 118850, 118851, 118852, 118853, 118854, 118855, 118856, 118857, 118858, 118859, 118860, 118861, 118862, 118863, 118864, 118865, 118866, 118867, 118868, 118869, 118870, 118871, 118872, 118873, 118874, 118875, 118876, 118877, 118878, 118879, 118880, 118881, 118882, 118883, 118884, 118885, 118886, 118887, 118888, 118889, 118890, 118891, 118892, 118893, 118894, 118895, 118896, 118897, 118898, 118899, 118900, 118901, 118902, 118903, 118904, 118905, 118906, 118907, 118908, 118909, 118910, 118911, 118912, 118913, 118914, 118915, 118916, 118917, 118918, 118919, 118920, 118921, 118922, 118923, 118924, 118925, 118926, 118927, 118928, 118929, 118930, 118931, 118932, 118933, 118934, 118935, 118936, 118937, 118938, 118939, 118940, 118941, 118942, 118943, 118944, 118945, 118946, 118947, 118948, 118949, 118950, 118951, 118952, 118953, 118954, 118955, 118956, 118957, 118958, 118959, 118960, 118961, 118962, 118963, 118964, 118965, 118966, 118967, 118968, 118969, 118970, 118971, 118972, 118973, 118974, 118975, 118976, 118977, 118978, 118979, 118980, 118981, 118982, 118983, 118984, 118985, 118986, 118987, 118988, 118989, 118990, 118991, 118992, 118993, 118994, 118995, 118996, 118997, 118998, 118999, 119e3, 119001, 119002, 119003, 119004, 119005, 119006, 119007, 119008, 119009, 119010, 119011, 119012, 119013, 119014, 119015, 119016, 119017, 119018, 119019, 119020, 119021, 119022, 119023, 119024, 119025, 119026, 119027, 119028, 119029, 119040, 119041, 119042, 119043, 119044, 119045, 119046, 119047, 119048, 119049, 119050, 119051, 119052, 119053, 119054, 119055, 119056, 119057, 119058, 119059, 119060, 119061, 119062, 119063, 119064, 119065, 119066, 119067, 119068, 119069, 119070, 119071, 119072, 119073, 119074, 119075, 119076, 119077, 119078, 119081, 119082, 119083, 119084, 119085, 119086, 119087, 119088, 119089, 119090, 119091, 119092, 119093, 119094, 119095, 119096, 119097, 119098, 119099, 119100, 119101, 119102, 119103, 119104, 119105, 119106, 119107, 119108, 119109, 119110, 119111, 119112, 119113, 119114, 119115, 119116, 119117, 119118, 119119, 119120, 119121, 119122, 119123, 119124, 119125, 119126, 119127, 119128, 119129, 119130, 119131, 119132, 119133, 119134, 119135, 119136, 119137, 119138, 119139, 119140, 119146, 119147, 119148, 119171, 119172, 119180, 119181, 119182, 119183, 119184, 119185, 119186, 119187, 119188, 119189, 119190, 119191, 119192, 119193, 119194, 119195, 119196, 119197, 119198, 119199, 119200, 119201, 119202, 119203, 119204, 119205, 119206, 119207, 119208, 119209, 119214, 119215, 119216, 119217, 119218, 119219, 119220, 119221, 119222, 119223, 119224, 119225, 119226, 119227, 119228, 119229, 119230, 119231, 119232, 119233, 119234, 119235, 119236, 119237, 119238, 119239, 119240, 119241, 119242, 119243, 119244, 119245, 119246, 119247, 119248, 119249, 119250, 119251, 119252, 119253, 119254, 119255, 119256, 119257, 119258, 119259, 119260, 119261, 119262, 119263, 119264, 119265, 119266, 119267, 119268, 119269, 119270, 119271, 119272, 119296, 119297, 119298, 119299, 119300, 119301, 119302, 119303, 119304, 119305, 119306, 119307, 119308, 119309, 119310, 119311, 119312, 119313, 119314, 119315, 119316, 119317, 119318, 119319, 119320, 119321, 119322, 119323, 119324, 119325, 119326, 119327, 119328, 119329, 119330, 119331, 119332, 119333, 119334, 119335, 119336, 119337, 119338, 119339, 119340, 119341, 119342, 119343, 119344, 119345, 119346, 119347, 119348, 119349, 119350, 119351, 119352, 119353, 119354, 119355, 119356, 119357, 119358, 119359, 119360, 119361, 119365, 119552, 119553, 119554, 119555, 119556, 119557, 119558, 119559, 119560, 119561, 119562, 119563, 119564, 119565, 119566, 119567, 119568, 119569, 119570, 119571, 119572, 119573, 119574, 119575, 119576, 119577, 119578, 119579, 119580, 119581, 119582, 119583, 119584, 119585, 119586, 119587, 119588, 119589, 119590, 119591, 119592, 119593, 119594, 119595, 119596, 119597, 119598, 119599, 119600, 119601, 119602, 119603, 119604, 119605, 119606, 119607, 119608, 119609, 119610, 119611, 119612, 119613, 119614, 119615, 119616, 119617, 119618, 119619, 119620, 119621, 119622, 119623, 119624, 119625, 119626, 119627, 119628, 119629, 119630, 119631, 119632, 119633, 119634, 119635, 119636, 119637, 119638, 120832, 120833, 120834, 120835, 120836, 120837, 120838, 120839, 120840, 120841, 120842, 120843, 120844, 120845, 120846, 120847, 120848, 120849, 120850, 120851, 120852, 120853, 120854, 120855, 120856, 120857, 120858, 120859, 120860, 120861, 120862, 120863, 120864, 120865, 120866, 120867, 120868, 120869, 120870, 120871, 120872, 120873, 120874, 120875, 120876, 120877, 120878, 120879, 120880, 120881, 120882, 120883, 120884, 120885, 120886, 120887, 120888, 120889, 120890, 120891, 120892, 120893, 120894, 120895, 120896, 120897, 120898, 120899, 120900, 120901, 120902, 120903, 120904, 120905, 120906, 120907, 120908, 120909, 120910, 120911, 120912, 120913, 120914, 120915, 120916, 120917, 120918, 120919, 120920, 120921, 120922, 120923, 120924, 120925, 120926, 120927, 120928, 120929, 120930, 120931, 120932, 120933, 120934, 120935, 120936, 120937, 120938, 120939, 120940, 120941, 120942, 120943, 120944, 120945, 120946, 120947, 120948, 120949, 120950, 120951, 120952, 120953, 120954, 120955, 120956, 120957, 120958, 120959, 120960, 120961, 120962, 120963, 120964, 120965, 120966, 120967, 120968, 120969, 120970, 120971, 120972, 120973, 120974, 120975, 120976, 120977, 120978, 120979, 120980, 120981, 120982, 120983, 120984, 120985, 120986, 120987, 120988, 120989, 120990, 120991, 120992, 120993, 120994, 120995, 120996, 120997, 120998, 120999, 121e3, 121001, 121002, 121003, 121004, 121005, 121006, 121007, 121008, 121009, 121010, 121011, 121012, 121013, 121014, 121015, 121016, 121017, 121018, 121019, 121020, 121021, 121022, 121023, 121024, 121025, 121026, 121027, 121028, 121029, 121030, 121031, 121032, 121033, 121034, 121035, 121036, 121037, 121038, 121039, 121040, 121041, 121042, 121043, 121044, 121045, 121046, 121047, 121048, 121049, 121050, 121051, 121052, 121053, 121054, 121055, 121056, 121057, 121058, 121059, 121060, 121061, 121062, 121063, 121064, 121065, 121066, 121067, 121068, 121069, 121070, 121071, 121072, 121073, 121074, 121075, 121076, 121077, 121078, 121079, 121080, 121081, 121082, 121083, 121084, 121085, 121086, 121087, 121088, 121089, 121090, 121091, 121092, 121093, 121094, 121095, 121096, 121097, 121098, 121099, 121100, 121101, 121102, 121103, 121104, 121105, 121106, 121107, 121108, 121109, 121110, 121111, 121112, 121113, 121114, 121115, 121116, 121117, 121118, 121119, 121120, 121121, 121122, 121123, 121124, 121125, 121126, 121127, 121128, 121129, 121130, 121131, 121132, 121133, 121134, 121135, 121136, 121137, 121138, 121139, 121140, 121141, 121142, 121143, 121144, 121145, 121146, 121147, 121148, 121149, 121150, 121151, 121152, 121153, 121154, 121155, 121156, 121157, 121158, 121159, 121160, 121161, 121162, 121163, 121164, 121165, 121166, 121167, 121168, 121169, 121170, 121171, 121172, 121173, 121174, 121175, 121176, 121177, 121178, 121179, 121180, 121181, 121182, 121183, 121184, 121185, 121186, 121187, 121188, 121189, 121190, 121191, 121192, 121193, 121194, 121195, 121196, 121197, 121198, 121199, 121200, 121201, 121202, 121203, 121204, 121205, 121206, 121207, 121208, 121209, 121210, 121211, 121212, 121213, 121214, 121215, 121216, 121217, 121218, 121219, 121220, 121221, 121222, 121223, 121224, 121225, 121226, 121227, 121228, 121229, 121230, 121231, 121232, 121233, 121234, 121235, 121236, 121237, 121238, 121239, 121240, 121241, 121242, 121243, 121244, 121245, 121246, 121247, 121248, 121249, 121250, 121251, 121252, 121253, 121254, 121255, 121256, 121257, 121258, 121259, 121260, 121261, 121262, 121263, 121264, 121265, 121266, 121267, 121268, 121269, 121270, 121271, 121272, 121273, 121274, 121275, 121276, 121277, 121278, 121279, 121280, 121281, 121282, 121283, 121284, 121285, 121286, 121287, 121288, 121289, 121290, 121291, 121292, 121293, 121294, 121295, 121296, 121297, 121298, 121299, 121300, 121301, 121302, 121303, 121304, 121305, 121306, 121307, 121308, 121309, 121310, 121311, 121312, 121313, 121314, 121315, 121316, 121317, 121318, 121319, 121320, 121321, 121322, 121323, 121324, 121325, 121326, 121327, 121328, 121329, 121330, 121331, 121332, 121333, 121334, 121335, 121336, 121337, 121338, 121339, 121340, 121341, 121342, 121343, 121399, 121400, 121401, 121402, 121453, 121454, 121455, 121456, 121457, 121458, 121459, 121460, 121462, 121463, 121464, 121465, 121466, 121467, 121468, 121469, 121470, 121471, 121472, 121473, 121474, 121475, 121477, 121478, 126976, 126977, 126978, 126979, 126980, 126981, 126982, 126983, 126984, 126985, 126986, 126987, 126988, 126989, 126990, 126991, 126992, 126993, 126994, 126995, 126996, 126997, 126998, 126999, 127e3, 127001, 127002, 127003, 127004, 127005, 127006, 127007, 127008, 127009, 127010, 127011, 127012, 127013, 127014, 127015, 127016, 127017, 127018, 127019, 127024, 127025, 127026, 127027, 127028, 127029, 127030, 127031, 127032, 127033, 127034, 127035, 127036, 127037, 127038, 127039, 127040, 127041, 127042, 127043, 127044, 127045, 127046, 127047, 127048, 127049, 127050, 127051, 127052, 127053, 127054, 127055, 127056, 127057, 127058, 127059, 127060, 127061, 127062, 127063, 127064, 127065, 127066, 127067, 127068, 127069, 127070, 127071, 127072, 127073, 127074, 127075, 127076, 127077, 127078, 127079, 127080, 127081, 127082, 127083, 127084, 127085, 127086, 127087, 127088, 127089, 127090, 127091, 127092, 127093, 127094, 127095, 127096, 127097, 127098, 127099, 127100, 127101, 127102, 127103, 127104, 127105, 127106, 127107, 127108, 127109, 127110, 127111, 127112, 127113, 127114, 127115, 127116, 127117, 127118, 127119, 127120, 127121, 127122, 127123, 127136, 127137, 127138, 127139, 127140, 127141, 127142, 127143, 127144, 127145, 127146, 127147, 127148, 127149, 127150, 127153, 127154, 127155, 127156, 127157, 127158, 127159, 127160, 127161, 127162, 127163, 127164, 127165, 127166, 127167, 127169, 127170, 127171, 127172, 127173, 127174, 127175, 127176, 127177, 127178, 127179, 127180, 127181, 127182, 127183, 127185, 127186, 127187, 127188, 127189, 127190, 127191, 127192, 127193, 127194, 127195, 127196, 127197, 127198, 127199, 127200, 127201, 127202, 127203, 127204, 127205, 127206, 127207, 127208, 127209, 127210, 127211, 127212, 127213, 127214, 127215, 127216, 127217, 127218, 127219, 127220, 127221, 127248, 127249, 127250, 127251, 127252, 127253, 127254, 127255, 127256, 127257, 127258, 127259, 127260, 127261, 127262, 127263, 127264, 127265, 127266, 127267, 127268, 127269, 127270, 127271, 127272, 127273, 127274, 127275, 127276, 127277, 127278, 127280, 127281, 127282, 127283, 127284, 127285, 127286, 127287, 127288, 127289, 127290, 127291, 127292, 127293, 127294, 127295, 127296, 127297, 127298, 127299, 127300, 127301, 127302, 127303, 127304, 127305, 127306, 127307, 127308, 127309, 127310, 127311, 127312, 127313, 127314, 127315, 127316, 127317, 127318, 127319, 127320, 127321, 127322, 127323, 127324, 127325, 127326, 127327, 127328, 127329, 127330, 127331, 127332, 127333, 127334, 127335, 127336, 127337, 127338, 127339, 127344, 127345, 127346, 127347, 127348, 127349, 127350, 127351, 127352, 127353, 127354, 127355, 127356, 127357, 127358, 127359, 127360, 127361, 127362, 127363, 127364, 127365, 127366, 127367, 127368, 127369, 127370, 127371, 127372, 127373, 127374, 127375, 127376, 127377, 127378, 127379, 127380, 127381, 127382, 127383, 127384, 127385, 127386, 127387, 127388, 127389, 127390, 127391, 127392, 127393, 127394, 127395, 127396, 127397, 127398, 127399, 127400, 127401, 127402, 127403, 127404, 127462, 127463, 127464, 127465, 127466, 127467, 127468, 127469, 127470, 127471, 127472, 127473, 127474, 127475, 127476, 127477, 127478, 127479, 127480, 127481, 127482, 127483, 127484, 127485, 127486, 127487, 127488, 127489, 127490, 127504, 127505, 127506, 127507, 127508, 127509, 127510, 127511, 127512, 127513, 127514, 127515, 127516, 127517, 127518, 127519, 127520, 127521, 127522, 127523, 127524, 127525, 127526, 127527, 127528, 127529, 127530, 127531, 127532, 127533, 127534, 127535, 127536, 127537, 127538, 127539, 127540, 127541, 127542, 127543, 127544, 127545, 127546, 127547, 127552, 127553, 127554, 127555, 127556, 127557, 127558, 127559, 127560, 127568, 127569, 127584, 127585, 127586, 127587, 127588, 127589, 127744, 127745, 127746, 127747, 127748, 127749, 127750, 127751, 127752, 127753, 127754, 127755, 127756, 127757, 127758, 127759, 127760, 127761, 127762, 127763, 127764, 127765, 127766, 127767, 127768, 127769, 127770, 127771, 127772, 127773, 127774, 127775, 127776, 127777, 127778, 127779, 127780, 127781, 127782, 127783, 127784, 127785, 127786, 127787, 127788, 127789, 127790, 127791, 127792, 127793, 127794, 127795, 127796, 127797, 127798, 127799, 127800, 127801, 127802, 127803, 127804, 127805, 127806, 127807, 127808, 127809, 127810, 127811, 127812, 127813, 127814, 127815, 127816, 127817, 127818, 127819, 127820, 127821, 127822, 127823, 127824, 127825, 127826, 127827, 127828, 127829, 127830, 127831, 127832, 127833, 127834, 127835, 127836, 127837, 127838, 127839, 127840, 127841, 127842, 127843, 127844, 127845, 127846, 127847, 127848, 127849, 127850, 127851, 127852, 127853, 127854, 127855, 127856, 127857, 127858, 127859, 127860, 127861, 127862, 127863, 127864, 127865, 127866, 127867, 127868, 127869, 127870, 127871, 127872, 127873, 127874, 127875, 127876, 127877, 127878, 127879, 127880, 127881, 127882, 127883, 127884, 127885, 127886, 127887, 127888, 127889, 127890, 127891, 127892, 127893, 127894, 127895, 127896, 127897, 127898, 127899, 127900, 127901, 127902, 127903, 127904, 127905, 127906, 127907, 127908, 127909, 127910, 127911, 127912, 127913, 127914, 127915, 127916, 127917, 127918, 127919, 127920, 127921, 127922, 127923, 127924, 127925, 127926, 127927, 127928, 127929, 127930, 127931, 127932, 127933, 127934, 127935, 127936, 127937, 127938, 127939, 127940, 127941, 127942, 127943, 127944, 127945, 127946, 127947, 127948, 127949, 127950, 127951, 127952, 127953, 127954, 127955, 127956, 127957, 127958, 127959, 127960, 127961, 127962, 127963, 127964, 127965, 127966, 127967, 127968, 127969, 127970, 127971, 127972, 127973, 127974, 127975, 127976, 127977, 127978, 127979, 127980, 127981, 127982, 127983, 127984, 127985, 127986, 127987, 127988, 127989, 127990, 127991, 127992, 127993, 127994, 128e3, 128001, 128002, 128003, 128004, 128005, 128006, 128007, 128008, 128009, 128010, 128011, 128012, 128013, 128014, 128015, 128016, 128017, 128018, 128019, 128020, 128021, 128022, 128023, 128024, 128025, 128026, 128027, 128028, 128029, 128030, 128031, 128032, 128033, 128034, 128035, 128036, 128037, 128038, 128039, 128040, 128041, 128042, 128043, 128044, 128045, 128046, 128047, 128048, 128049, 128050, 128051, 128052, 128053, 128054, 128055, 128056, 128057, 128058, 128059, 128060, 128061, 128062, 128063, 128064, 128065, 128066, 128067, 128068, 128069, 128070, 128071, 128072, 128073, 128074, 128075, 128076, 128077, 128078, 128079, 128080, 128081, 128082, 128083, 128084, 128085, 128086, 128087, 128088, 128089, 128090, 128091, 128092, 128093, 128094, 128095, 128096, 128097, 128098, 128099, 128100, 128101, 128102, 128103, 128104, 128105, 128106, 128107, 128108, 128109, 128110, 128111, 128112, 128113, 128114, 128115, 128116, 128117, 128118, 128119, 128120, 128121, 128122, 128123, 128124, 128125, 128126, 128127, 128128, 128129, 128130, 128131, 128132, 128133, 128134, 128135, 128136, 128137, 128138, 128139, 128140, 128141, 128142, 128143, 128144, 128145, 128146, 128147, 128148, 128149, 128150, 128151, 128152, 128153, 128154, 128155, 128156, 128157, 128158, 128159, 128160, 128161, 128162, 128163, 128164, 128165, 128166, 128167, 128168, 128169, 128170, 128171, 128172, 128173, 128174, 128175, 128176, 128177, 128178, 128179, 128180, 128181, 128182, 128183, 128184, 128185, 128186, 128187, 128188, 128189, 128190, 128191, 128192, 128193, 128194, 128195, 128196, 128197, 128198, 128199, 128200, 128201, 128202, 128203, 128204, 128205, 128206, 128207, 128208, 128209, 128210, 128211, 128212, 128213, 128214, 128215, 128216, 128217, 128218, 128219, 128220, 128221, 128222, 128223, 128224, 128225, 128226, 128227, 128228, 128229, 128230, 128231, 128232, 128233, 128234, 128235, 128236, 128237, 128238, 128239, 128240, 128241, 128242, 128243, 128244, 128245, 128246, 128247, 128248, 128249, 128250, 128251, 128252, 128253, 128254, 128255, 128256, 128257, 128258, 128259, 128260, 128261, 128262, 128263, 128264, 128265, 128266, 128267, 128268, 128269, 128270, 128271, 128272, 128273, 128274, 128275, 128276, 128277, 128278, 128279, 128280, 128281, 128282, 128283, 128284, 128285, 128286, 128287, 128288, 128289, 128290, 128291, 128292, 128293, 128294, 128295, 128296, 128297, 128298, 128299, 128300, 128301, 128302, 128303, 128304, 128305, 128306, 128307, 128308, 128309, 128310, 128311, 128312, 128313, 128314, 128315, 128316, 128317, 128318, 128319, 128320, 128321, 128322, 128323, 128324, 128325, 128326, 128327, 128328, 128329, 128330, 128331, 128332, 128333, 128334, 128335, 128336, 128337, 128338, 128339, 128340, 128341, 128342, 128343, 128344, 128345, 128346, 128347, 128348, 128349, 128350, 128351, 128352, 128353, 128354, 128355, 128356, 128357, 128358, 128359, 128360, 128361, 128362, 128363, 128364, 128365, 128366, 128367, 128368, 128369, 128370, 128371, 128372, 128373, 128374, 128375, 128376, 128377, 128378, 128379, 128380, 128381, 128382, 128383, 128384, 128385, 128386, 128387, 128388, 128389, 128390, 128391, 128392, 128393, 128394, 128395, 128396, 128397, 128398, 128399, 128400, 128401, 128402, 128403, 128404, 128405, 128406, 128407, 128408, 128409, 128410, 128411, 128412, 128413, 128414, 128415, 128416, 128417, 128418, 128419, 128420, 128421, 128422, 128423, 128424, 128425, 128426, 128427, 128428, 128429, 128430, 128431, 128432, 128433, 128434, 128435, 128436, 128437, 128438, 128439, 128440, 128441, 128442, 128443, 128444, 128445, 128446, 128447, 128448, 128449, 128450, 128451, 128452, 128453, 128454, 128455, 128456, 128457, 128458, 128459, 128460, 128461, 128462, 128463, 128464, 128465, 128466, 128467, 128468, 128469, 128470, 128471, 128472, 128473, 128474, 128475, 128476, 128477, 128478, 128479, 128480, 128481, 128482, 128483, 128484, 128485, 128486, 128487, 128488, 128489, 128490, 128491, 128492, 128493, 128494, 128495, 128496, 128497, 128498, 128499, 128500, 128501, 128502, 128503, 128504, 128505, 128506, 128507, 128508, 128509, 128510, 128511, 128512, 128513, 128514, 128515, 128516, 128517, 128518, 128519, 128520, 128521, 128522, 128523, 128524, 128525, 128526, 128527, 128528, 128529, 128530, 128531, 128532, 128533, 128534, 128535, 128536, 128537, 128538, 128539, 128540, 128541, 128542, 128543, 128544, 128545, 128546, 128547, 128548, 128549, 128550, 128551, 128552, 128553, 128554, 128555, 128556, 128557, 128558, 128559, 128560, 128561, 128562, 128563, 128564, 128565, 128566, 128567, 128568, 128569, 128570, 128571, 128572, 128573, 128574, 128575, 128576, 128577, 128578, 128579, 128580, 128581, 128582, 128583, 128584, 128585, 128586, 128587, 128588, 128589, 128590, 128591, 128592, 128593, 128594, 128595, 128596, 128597, 128598, 128599, 128600, 128601, 128602, 128603, 128604, 128605, 128606, 128607, 128608, 128609, 128610, 128611, 128612, 128613, 128614, 128615, 128616, 128617, 128618, 128619, 128620, 128621, 128622, 128623, 128624, 128625, 128626, 128627, 128628, 128629, 128630, 128631, 128632, 128633, 128634, 128635, 128636, 128637, 128638, 128639, 128640, 128641, 128642, 128643, 128644, 128645, 128646, 128647, 128648, 128649, 128650, 128651, 128652, 128653, 128654, 128655, 128656, 128657, 128658, 128659, 128660, 128661, 128662, 128663, 128664, 128665, 128666, 128667, 128668, 128669, 128670, 128671, 128672, 128673, 128674, 128675, 128676, 128677, 128678, 128679, 128680, 128681, 128682, 128683, 128684, 128685, 128686, 128687, 128688, 128689, 128690, 128691, 128692, 128693, 128694, 128695, 128696, 128697, 128698, 128699, 128700, 128701, 128702, 128703, 128704, 128705, 128706, 128707, 128708, 128709, 128710, 128711, 128712, 128713, 128714, 128715, 128716, 128717, 128718, 128719, 128720, 128721, 128722, 128723, 128724, 128736, 128737, 128738, 128739, 128740, 128741, 128742, 128743, 128744, 128745, 128746, 128747, 128748, 128752, 128753, 128754, 128755, 128756, 128757, 128758, 128759, 128760, 128768, 128769, 128770, 128771, 128772, 128773, 128774, 128775, 128776, 128777, 128778, 128779, 128780, 128781, 128782, 128783, 128784, 128785, 128786, 128787, 128788, 128789, 128790, 128791, 128792, 128793, 128794, 128795, 128796, 128797, 128798, 128799, 128800, 128801, 128802, 128803, 128804, 128805, 128806, 128807, 128808, 128809, 128810, 128811, 128812, 128813, 128814, 128815, 128816, 128817, 128818, 128819, 128820, 128821, 128822, 128823, 128824, 128825, 128826, 128827, 128828, 128829, 128830, 128831, 128832, 128833, 128834, 128835, 128836, 128837, 128838, 128839, 128840, 128841, 128842, 128843, 128844, 128845, 128846, 128847, 128848, 128849, 128850, 128851, 128852, 128853, 128854, 128855, 128856, 128857, 128858, 128859, 128860, 128861, 128862, 128863, 128864, 128865, 128866, 128867, 128868, 128869, 128870, 128871, 128872, 128873, 128874, 128875, 128876, 128877, 128878, 128879, 128880, 128881, 128882, 128883, 128896, 128897, 128898, 128899, 128900, 128901, 128902, 128903, 128904, 128905, 128906, 128907, 128908, 128909, 128910, 128911, 128912, 128913, 128914, 128915, 128916, 128917, 128918, 128919, 128920, 128921, 128922, 128923, 128924, 128925, 128926, 128927, 128928, 128929, 128930, 128931, 128932, 128933, 128934, 128935, 128936, 128937, 128938, 128939, 128940, 128941, 128942, 128943, 128944, 128945, 128946, 128947, 128948, 128949, 128950, 128951, 128952, 128953, 128954, 128955, 128956, 128957, 128958, 128959, 128960, 128961, 128962, 128963, 128964, 128965, 128966, 128967, 128968, 128969, 128970, 128971, 128972, 128973, 128974, 128975, 128976, 128977, 128978, 128979, 128980, 129024, 129025, 129026, 129027, 129028, 129029, 129030, 129031, 129032, 129033, 129034, 129035, 129040, 129041, 129042, 129043, 129044, 129045, 129046, 129047, 129048, 129049, 129050, 129051, 129052, 129053, 129054, 129055, 129056, 129057, 129058, 129059, 129060, 129061, 129062, 129063, 129064, 129065, 129066, 129067, 129068, 129069, 129070, 129071, 129072, 129073, 129074, 129075, 129076, 129077, 129078, 129079, 129080, 129081, 129082, 129083, 129084, 129085, 129086, 129087, 129088, 129089, 129090, 129091, 129092, 129093, 129094, 129095, 129104, 129105, 129106, 129107, 129108, 129109, 129110, 129111, 129112, 129113, 129120, 129121, 129122, 129123, 129124, 129125, 129126, 129127, 129128, 129129, 129130, 129131, 129132, 129133, 129134, 129135, 129136, 129137, 129138, 129139, 129140, 129141, 129142, 129143, 129144, 129145, 129146, 129147, 129148, 129149, 129150, 129151, 129152, 129153, 129154, 129155, 129156, 129157, 129158, 129159, 129168, 129169, 129170, 129171, 129172, 129173, 129174, 129175, 129176, 129177, 129178, 129179, 129180, 129181, 129182, 129183, 129184, 129185, 129186, 129187, 129188, 129189, 129190, 129191, 129192, 129193, 129194, 129195, 129196, 129197, 129280, 129281, 129282, 129283, 129284, 129285, 129286, 129287, 129288, 129289, 129290, 129291, 129296, 129297, 129298, 129299, 129300, 129301, 129302, 129303, 129304, 129305, 129306, 129307, 129308, 129309, 129310, 129311, 129312, 129313, 129314, 129315, 129316, 129317, 129318, 129319, 129320, 129321, 129322, 129323, 129324, 129325, 129326, 129327, 129328, 129329, 129330, 129331, 129332, 129333, 129334, 129335, 129336, 129337, 129338, 129339, 129340, 129341, 129342, 129344, 129345, 129346, 129347, 129348, 129349, 129350, 129351, 129352, 129353, 129354, 129355, 129356, 129360, 129361, 129362, 129363, 129364, 129365, 129366, 129367, 129368, 129369, 129370, 129371, 129372, 129373, 129374, 129375, 129376, 129377, 129378, 129379, 129380, 129381, 129382, 129383, 129384, 129385, 129386, 129387, 129408, 129409, 129410, 129411, 129412, 129413, 129414, 129415, 129416, 129417, 129418, 129419, 129420, 129421, 129422, 129423, 129424, 129425, 129426, 129427, 129428, 129429, 129430, 129431, 129472, 129488, 129489, 129490, 129491, 129492, 129493, 129494, 129495, 129496, 129497, 129498, 129499, 129500, 129501, 129502, 129503, 129504, 129505, 129506, 129507, 129508, 129509, 129510],
		Lo: [170, 186, 443, 448, 449, 450, 451, 660, 1488, 1489, 1490, 1491, 1492, 1493, 1494, 1495, 1496, 1497, 1498, 1499, 1500, 1501, 1502, 1503, 1504, 1505, 1506, 1507, 1508, 1509, 1510, 1511, 1512, 1513, 1514, 1520, 1521, 1522, 1568, 1569, 1570, 1571, 1572, 1573, 1574, 1575, 1576, 1577, 1578, 1579, 1580, 1581, 1582, 1583, 1584, 1585, 1586, 1587, 1588, 1589, 1590, 1591, 1592, 1593, 1594, 1595, 1596, 1597, 1598, 1599, 1601, 1602, 1603, 1604, 1605, 1606, 1607, 1608, 1609, 1610, 1646, 1647, 1649, 1650, 1651, 1652, 1653, 1654, 1655, 1656, 1657, 1658, 1659, 1660, 1661, 1662, 1663, 1664, 1665, 1666, 1667, 1668, 1669, 1670, 1671, 1672, 1673, 1674, 1675, 1676, 1677, 1678, 1679, 1680, 1681, 1682, 1683, 1684, 1685, 1686, 1687, 1688, 1689, 1690, 1691, 1692, 1693, 1694, 1695, 1696, 1697, 1698, 1699, 1700, 1701, 1702, 1703, 1704, 1705, 1706, 1707, 1708, 1709, 1710, 1711, 1712, 1713, 1714, 1715, 1716, 1717, 1718, 1719, 1720, 1721, 1722, 1723, 1724, 1725, 1726, 1727, 1728, 1729, 1730, 1731, 1732, 1733, 1734, 1735, 1736, 1737, 1738, 1739, 1740, 1741, 1742, 1743, 1744, 1745, 1746, 1747, 1749, 1774, 1775, 1786, 1787, 1788, 1791, 1808, 1810, 1811, 1812, 1813, 1814, 1815, 1816, 1817, 1818, 1819, 1820, 1821, 1822, 1823, 1824, 1825, 1826, 1827, 1828, 1829, 1830, 1831, 1832, 1833, 1834, 1835, 1836, 1837, 1838, 1839, 1869, 1870, 1871, 1872, 1873, 1874, 1875, 1876, 1877, 1878, 1879, 1880, 1881, 1882, 1883, 1884, 1885, 1886, 1887, 1888, 1889, 1890, 1891, 1892, 1893, 1894, 1895, 1896, 1897, 1898, 1899, 1900, 1901, 1902, 1903, 1904, 1905, 1906, 1907, 1908, 1909, 1910, 1911, 1912, 1913, 1914, 1915, 1916, 1917, 1918, 1919, 1920, 1921, 1922, 1923, 1924, 1925, 1926, 1927, 1928, 1929, 1930, 1931, 1932, 1933, 1934, 1935, 1936, 1937, 1938, 1939, 1940, 1941, 1942, 1943, 1944, 1945, 1946, 1947, 1948, 1949, 1950, 1951, 1952, 1953, 1954, 1955, 1956, 1957, 1969, 1994, 1995, 1996, 1997, 1998, 1999, 2e3, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2048, 2049, 2050, 2051, 2052, 2053, 2054, 2055, 2056, 2057, 2058, 2059, 2060, 2061, 2062, 2063, 2064, 2065, 2066, 2067, 2068, 2069, 2112, 2113, 2114, 2115, 2116, 2117, 2118, 2119, 2120, 2121, 2122, 2123, 2124, 2125, 2126, 2127, 2128, 2129, 2130, 2131, 2132, 2133, 2134, 2135, 2136, 2144, 2145, 2146, 2147, 2148, 2149, 2150, 2151, 2152, 2153, 2154, 2208, 2209, 2210, 2211, 2212, 2213, 2214, 2215, 2216, 2217, 2218, 2219, 2220, 2221, 2222, 2223, 2224, 2225, 2226, 2227, 2228, 2230, 2231, 2232, 2233, 2234, 2235, 2236, 2237, 2308, 2309, 2310, 2311, 2312, 2313, 2314, 2315, 2316, 2317, 2318, 2319, 2320, 2321, 2322, 2323, 2324, 2325, 2326, 2327, 2328, 2329, 2330, 2331, 2332, 2333, 2334, 2335, 2336, 2337, 2338, 2339, 2340, 2341, 2342, 2343, 2344, 2345, 2346, 2347, 2348, 2349, 2350, 2351, 2352, 2353, 2354, 2355, 2356, 2357, 2358, 2359, 2360, 2361, 2365, 2384, 2392, 2393, 2394, 2395, 2396, 2397, 2398, 2399, 2400, 2401, 2418, 2419, 2420, 2421, 2422, 2423, 2424, 2425, 2426, 2427, 2428, 2429, 2430, 2431, 2432, 2437, 2438, 2439, 2440, 2441, 2442, 2443, 2444, 2447, 2448, 2451, 2452, 2453, 2454, 2455, 2456, 2457, 2458, 2459, 2460, 2461, 2462, 2463, 2464, 2465, 2466, 2467, 2468, 2469, 2470, 2471, 2472, 2474, 2475, 2476, 2477, 2478, 2479, 2480, 2482, 2486, 2487, 2488, 2489, 2493, 2510, 2524, 2525, 2527, 2528, 2529, 2544, 2545, 2556, 2565, 2566, 2567, 2568, 2569, 2570, 2575, 2576, 2579, 2580, 2581, 2582, 2583, 2584, 2585, 2586, 2587, 2588, 2589, 2590, 2591, 2592, 2593, 2594, 2595, 2596, 2597, 2598, 2599, 2600, 2602, 2603, 2604, 2605, 2606, 2607, 2608, 2610, 2611, 2613, 2614, 2616, 2617, 2649, 2650, 2651, 2652, 2654, 2674, 2675, 2676, 2693, 2694, 2695, 2696, 2697, 2698, 2699, 2700, 2701, 2703, 2704, 2705, 2707, 2708, 2709, 2710, 2711, 2712, 2713, 2714, 2715, 2716, 2717, 2718, 2719, 2720, 2721, 2722, 2723, 2724, 2725, 2726, 2727, 2728, 2730, 2731, 2732, 2733, 2734, 2735, 2736, 2738, 2739, 2741, 2742, 2743, 2744, 2745, 2749, 2768, 2784, 2785, 2809, 2821, 2822, 2823, 2824, 2825, 2826, 2827, 2828, 2831, 2832, 2835, 2836, 2837, 2838, 2839, 2840, 2841, 2842, 2843, 2844, 2845, 2846, 2847, 2848, 2849, 2850, 2851, 2852, 2853, 2854, 2855, 2856, 2858, 2859, 2860, 2861, 2862, 2863, 2864, 2866, 2867, 2869, 2870, 2871, 2872, 2873, 2877, 2908, 2909, 2911, 2912, 2913, 2929, 2947, 2949, 2950, 2951, 2952, 2953, 2954, 2958, 2959, 2960, 2962, 2963, 2964, 2965, 2969, 2970, 2972, 2974, 2975, 2979, 2980, 2984, 2985, 2986, 2990, 2991, 2992, 2993, 2994, 2995, 2996, 2997, 2998, 2999, 3e3, 3001, 3024, 3077, 3078, 3079, 3080, 3081, 3082, 3083, 3084, 3086, 3087, 3088, 3090, 3091, 3092, 3093, 3094, 3095, 3096, 3097, 3098, 3099, 3100, 3101, 3102, 3103, 3104, 3105, 3106, 3107, 3108, 3109, 3110, 3111, 3112, 3114, 3115, 3116, 3117, 3118, 3119, 3120, 3121, 3122, 3123, 3124, 3125, 3126, 3127, 3128, 3129, 3133, 3160, 3161, 3162, 3168, 3169, 3200, 3205, 3206, 3207, 3208, 3209, 3210, 3211, 3212, 3214, 3215, 3216, 3218, 3219, 3220, 3221, 3222, 3223, 3224, 3225, 3226, 3227, 3228, 3229, 3230, 3231, 3232, 3233, 3234, 3235, 3236, 3237, 3238, 3239, 3240, 3242, 3243, 3244, 3245, 3246, 3247, 3248, 3249, 3250, 3251, 3253, 3254, 3255, 3256, 3257, 3261, 3294, 3296, 3297, 3313, 3314, 3333, 3334, 3335, 3336, 3337, 3338, 3339, 3340, 3342, 3343, 3344, 3346, 3347, 3348, 3349, 3350, 3351, 3352, 3353, 3354, 3355, 3356, 3357, 3358, 3359, 3360, 3361, 3362, 3363, 3364, 3365, 3366, 3367, 3368, 3369, 3370, 3371, 3372, 3373, 3374, 3375, 3376, 3377, 3378, 3379, 3380, 3381, 3382, 3383, 3384, 3385, 3386, 3389, 3406, 3412, 3413, 3414, 3423, 3424, 3425, 3450, 3451, 3452, 3453, 3454, 3455, 3461, 3462, 3463, 3464, 3465, 3466, 3467, 3468, 3469, 3470, 3471, 3472, 3473, 3474, 3475, 3476, 3477, 3478, 3482, 3483, 3484, 3485, 3486, 3487, 3488, 3489, 3490, 3491, 3492, 3493, 3494, 3495, 3496, 3497, 3498, 3499, 3500, 3501, 3502, 3503, 3504, 3505, 3507, 3508, 3509, 3510, 3511, 3512, 3513, 3514, 3515, 3517, 3520, 3521, 3522, 3523, 3524, 3525, 3526, 3585, 3586, 3587, 3588, 3589, 3590, 3591, 3592, 3593, 3594, 3595, 3596, 3597, 3598, 3599, 3600, 3601, 3602, 3603, 3604, 3605, 3606, 3607, 3608, 3609, 3610, 3611, 3612, 3613, 3614, 3615, 3616, 3617, 3618, 3619, 3620, 3621, 3622, 3623, 3624, 3625, 3626, 3627, 3628, 3629, 3630, 3631, 3632, 3634, 3635, 3648, 3649, 3650, 3651, 3652, 3653, 3713, 3714, 3716, 3719, 3720, 3722, 3725, 3732, 3733, 3734, 3735, 3737, 3738, 3739, 3740, 3741, 3742, 3743, 3745, 3746, 3747, 3749, 3751, 3754, 3755, 3757, 3758, 3759, 3760, 3762, 3763, 3773, 3776, 3777, 3778, 3779, 3780, 3804, 3805, 3806, 3807, 3840, 3904, 3905, 3906, 3907, 3908, 3909, 3910, 3911, 3913, 3914, 3915, 3916, 3917, 3918, 3919, 3920, 3921, 3922, 3923, 3924, 3925, 3926, 3927, 3928, 3929, 3930, 3931, 3932, 3933, 3934, 3935, 3936, 3937, 3938, 3939, 3940, 3941, 3942, 3943, 3944, 3945, 3946, 3947, 3948, 3976, 3977, 3978, 3979, 3980, 4096, 4097, 4098, 4099, 4100, 4101, 4102, 4103, 4104, 4105, 4106, 4107, 4108, 4109, 4110, 4111, 4112, 4113, 4114, 4115, 4116, 4117, 4118, 4119, 4120, 4121, 4122, 4123, 4124, 4125, 4126, 4127, 4128, 4129, 4130, 4131, 4132, 4133, 4134, 4135, 4136, 4137, 4138, 4159, 4176, 4177, 4178, 4179, 4180, 4181, 4186, 4187, 4188, 4189, 4193, 4197, 4198, 4206, 4207, 4208, 4213, 4214, 4215, 4216, 4217, 4218, 4219, 4220, 4221, 4222, 4223, 4224, 4225, 4238, 4304, 4305, 4306, 4307, 4308, 4309, 4310, 4311, 4312, 4313, 4314, 4315, 4316, 4317, 4318, 4319, 4320, 4321, 4322, 4323, 4324, 4325, 4326, 4327, 4328, 4329, 4330, 4331, 4332, 4333, 4334, 4335, 4336, 4337, 4338, 4339, 4340, 4341, 4342, 4343, 4344, 4345, 4346, 4349, 4350, 4351, 4352, 4353, 4354, 4355, 4356, 4357, 4358, 4359, 4360, 4361, 4362, 4363, 4364, 4365, 4366, 4367, 4368, 4369, 4370, 4371, 4372, 4373, 4374, 4375, 4376, 4377, 4378, 4379, 4380, 4381, 4382, 4383, 4384, 4385, 4386, 4387, 4388, 4389, 4390, 4391, 4392, 4393, 4394, 4395, 4396, 4397, 4398, 4399, 4400, 4401, 4402, 4403, 4404, 4405, 4406, 4407, 4408, 4409, 4410, 4411, 4412, 4413, 4414, 4415, 4416, 4417, 4418, 4419, 4420, 4421, 4422, 4423, 4424, 4425, 4426, 4427, 4428, 4429, 4430, 4431, 4432, 4433, 4434, 4435, 4436, 4437, 4438, 4439, 4440, 4441, 4442, 4443, 4444, 4445, 4446, 4447, 4448, 4449, 4450, 4451, 4452, 4453, 4454, 4455, 4456, 4457, 4458, 4459, 4460, 4461, 4462, 4463, 4464, 4465, 4466, 4467, 4468, 4469, 4470, 4471, 4472, 4473, 4474, 4475, 4476, 4477, 4478, 4479, 4480, 4481, 4482, 4483, 4484, 4485, 4486, 4487, 4488, 4489, 4490, 4491, 4492, 4493, 4494, 4495, 4496, 4497, 4498, 4499, 4500, 4501, 4502, 4503, 4504, 4505, 4506, 4507, 4508, 4509, 4510, 4511, 4512, 4513, 4514, 4515, 4516, 4517, 4518, 4519, 4520, 4521, 4522, 4523, 4524, 4525, 4526, 4527, 4528, 4529, 4530, 4531, 4532, 4533, 4534, 4535, 4536, 4537, 4538, 4539, 4540, 4541, 4542, 4543, 4544, 4545, 4546, 4547, 4548, 4549, 4550, 4551, 4552, 4553, 4554, 4555, 4556, 4557, 4558, 4559, 4560, 4561, 4562, 4563, 4564, 4565, 4566, 4567, 4568, 4569, 4570, 4571, 4572, 4573, 4574, 4575, 4576, 4577, 4578, 4579, 4580, 4581, 4582, 4583, 4584, 4585, 4586, 4587, 4588, 4589, 4590, 4591, 4592, 4593, 4594, 4595, 4596, 4597, 4598, 4599, 4600, 4601, 4602, 4603, 4604, 4605, 4606, 4607, 4608, 4609, 4610, 4611, 4612, 4613, 4614, 4615, 4616, 4617, 4618, 4619, 4620, 4621, 4622, 4623, 4624, 4625, 4626, 4627, 4628, 4629, 4630, 4631, 4632, 4633, 4634, 4635, 4636, 4637, 4638, 4639, 4640, 4641, 4642, 4643, 4644, 4645, 4646, 4647, 4648, 4649, 4650, 4651, 4652, 4653, 4654, 4655, 4656, 4657, 4658, 4659, 4660, 4661, 4662, 4663, 4664, 4665, 4666, 4667, 4668, 4669, 4670, 4671, 4672, 4673, 4674, 4675, 4676, 4677, 4678, 4679, 4680, 4682, 4683, 4684, 4685, 4688, 4689, 4690, 4691, 4692, 4693, 4694, 4696, 4698, 4699, 4700, 4701, 4704, 4705, 4706, 4707, 4708, 4709, 4710, 4711, 4712, 4713, 4714, 4715, 4716, 4717, 4718, 4719, 4720, 4721, 4722, 4723, 4724, 4725, 4726, 4727, 4728, 4729, 4730, 4731, 4732, 4733, 4734, 4735, 4736, 4737, 4738, 4739, 4740, 4741, 4742, 4743, 4744, 4746, 4747, 4748, 4749, 4752, 4753, 4754, 4755, 4756, 4757, 4758, 4759, 4760, 4761, 4762, 4763, 4764, 4765, 4766, 4767, 4768, 4769, 4770, 4771, 4772, 4773, 4774, 4775, 4776, 4777, 4778, 4779, 4780, 4781, 4782, 4783, 4784, 4786, 4787, 4788, 4789, 4792, 4793, 4794, 4795, 4796, 4797, 4798, 4800, 4802, 4803, 4804, 4805, 4808, 4809, 4810, 4811, 4812, 4813, 4814, 4815, 4816, 4817, 4818, 4819, 4820, 4821, 4822, 4824, 4825, 4826, 4827, 4828, 4829, 4830, 4831, 4832, 4833, 4834, 4835, 4836, 4837, 4838, 4839, 4840, 4841, 4842, 4843, 4844, 4845, 4846, 4847, 4848, 4849, 4850, 4851, 4852, 4853, 4854, 4855, 4856, 4857, 4858, 4859, 4860, 4861, 4862, 4863, 4864, 4865, 4866, 4867, 4868, 4869, 4870, 4871, 4872, 4873, 4874, 4875, 4876, 4877, 4878, 4879, 4880, 4882, 4883, 4884, 4885, 4888, 4889, 4890, 4891, 4892, 4893, 4894, 4895, 4896, 4897, 4898, 4899, 4900, 4901, 4902, 4903, 4904, 4905, 4906, 4907, 4908, 4909, 4910, 4911, 4912, 4913, 4914, 4915, 4916, 4917, 4918, 4919, 4920, 4921, 4922, 4923, 4924, 4925, 4926, 4927, 4928, 4929, 4930, 4931, 4932, 4933, 4934, 4935, 4936, 4937, 4938, 4939, 4940, 4941, 4942, 4943, 4944, 4945, 4946, 4947, 4948, 4949, 4950, 4951, 4952, 4953, 4954, 4992, 4993, 4994, 4995, 4996, 4997, 4998, 4999, 5e3, 5001, 5002, 5003, 5004, 5005, 5006, 5007, 5121, 5122, 5123, 5124, 5125, 5126, 5127, 5128, 5129, 5130, 5131, 5132, 5133, 5134, 5135, 5136, 5137, 5138, 5139, 5140, 5141, 5142, 5143, 5144, 5145, 5146, 5147, 5148, 5149, 5150, 5151, 5152, 5153, 5154, 5155, 5156, 5157, 5158, 5159, 5160, 5161, 5162, 5163, 5164, 5165, 5166, 5167, 5168, 5169, 5170, 5171, 5172, 5173, 5174, 5175, 5176, 5177, 5178, 5179, 5180, 5181, 5182, 5183, 5184, 5185, 5186, 5187, 5188, 5189, 5190, 5191, 5192, 5193, 5194, 5195, 5196, 5197, 5198, 5199, 5200, 5201, 5202, 5203, 5204, 5205, 5206, 5207, 5208, 5209, 5210, 5211, 5212, 5213, 5214, 5215, 5216, 5217, 5218, 5219, 5220, 5221, 5222, 5223, 5224, 5225, 5226, 5227, 5228, 5229, 5230, 5231, 5232, 5233, 5234, 5235, 5236, 5237, 5238, 5239, 5240, 5241, 5242, 5243, 5244, 5245, 5246, 5247, 5248, 5249, 5250, 5251, 5252, 5253, 5254, 5255, 5256, 5257, 5258, 5259, 5260, 5261, 5262, 5263, 5264, 5265, 5266, 5267, 5268, 5269, 5270, 5271, 5272, 5273, 5274, 5275, 5276, 5277, 5278, 5279, 5280, 5281, 5282, 5283, 5284, 5285, 5286, 5287, 5288, 5289, 5290, 5291, 5292, 5293, 5294, 5295, 5296, 5297, 5298, 5299, 5300, 5301, 5302, 5303, 5304, 5305, 5306, 5307, 5308, 5309, 5310, 5311, 5312, 5313, 5314, 5315, 5316, 5317, 5318, 5319, 5320, 5321, 5322, 5323, 5324, 5325, 5326, 5327, 5328, 5329, 5330, 5331, 5332, 5333, 5334, 5335, 5336, 5337, 5338, 5339, 5340, 5341, 5342, 5343, 5344, 5345, 5346, 5347, 5348, 5349, 5350, 5351, 5352, 5353, 5354, 5355, 5356, 5357, 5358, 5359, 5360, 5361, 5362, 5363, 5364, 5365, 5366, 5367, 5368, 5369, 5370, 5371, 5372, 5373, 5374, 5375, 5376, 5377, 5378, 5379, 5380, 5381, 5382, 5383, 5384, 5385, 5386, 5387, 5388, 5389, 5390, 5391, 5392, 5393, 5394, 5395, 5396, 5397, 5398, 5399, 5400, 5401, 5402, 5403, 5404, 5405, 5406, 5407, 5408, 5409, 5410, 5411, 5412, 5413, 5414, 5415, 5416, 5417, 5418, 5419, 5420, 5421, 5422, 5423, 5424, 5425, 5426, 5427, 5428, 5429, 5430, 5431, 5432, 5433, 5434, 5435, 5436, 5437, 5438, 5439, 5440, 5441, 5442, 5443, 5444, 5445, 5446, 5447, 5448, 5449, 5450, 5451, 5452, 5453, 5454, 5455, 5456, 5457, 5458, 5459, 5460, 5461, 5462, 5463, 5464, 5465, 5466, 5467, 5468, 5469, 5470, 5471, 5472, 5473, 5474, 5475, 5476, 5477, 5478, 5479, 5480, 5481, 5482, 5483, 5484, 5485, 5486, 5487, 5488, 5489, 5490, 5491, 5492, 5493, 5494, 5495, 5496, 5497, 5498, 5499, 5500, 5501, 5502, 5503, 5504, 5505, 5506, 5507, 5508, 5509, 5510, 5511, 5512, 5513, 5514, 5515, 5516, 5517, 5518, 5519, 5520, 5521, 5522, 5523, 5524, 5525, 5526, 5527, 5528, 5529, 5530, 5531, 5532, 5533, 5534, 5535, 5536, 5537, 5538, 5539, 5540, 5541, 5542, 5543, 5544, 5545, 5546, 5547, 5548, 5549, 5550, 5551, 5552, 5553, 5554, 5555, 5556, 5557, 5558, 5559, 5560, 5561, 5562, 5563, 5564, 5565, 5566, 5567, 5568, 5569, 5570, 5571, 5572, 5573, 5574, 5575, 5576, 5577, 5578, 5579, 5580, 5581, 5582, 5583, 5584, 5585, 5586, 5587, 5588, 5589, 5590, 5591, 5592, 5593, 5594, 5595, 5596, 5597, 5598, 5599, 5600, 5601, 5602, 5603, 5604, 5605, 5606, 5607, 5608, 5609, 5610, 5611, 5612, 5613, 5614, 5615, 5616, 5617, 5618, 5619, 5620, 5621, 5622, 5623, 5624, 5625, 5626, 5627, 5628, 5629, 5630, 5631, 5632, 5633, 5634, 5635, 5636, 5637, 5638, 5639, 5640, 5641, 5642, 5643, 5644, 5645, 5646, 5647, 5648, 5649, 5650, 5651, 5652, 5653, 5654, 5655, 5656, 5657, 5658, 5659, 5660, 5661, 5662, 5663, 5664, 5665, 5666, 5667, 5668, 5669, 5670, 5671, 5672, 5673, 5674, 5675, 5676, 5677, 5678, 5679, 5680, 5681, 5682, 5683, 5684, 5685, 5686, 5687, 5688, 5689, 5690, 5691, 5692, 5693, 5694, 5695, 5696, 5697, 5698, 5699, 5700, 5701, 5702, 5703, 5704, 5705, 5706, 5707, 5708, 5709, 5710, 5711, 5712, 5713, 5714, 5715, 5716, 5717, 5718, 5719, 5720, 5721, 5722, 5723, 5724, 5725, 5726, 5727, 5728, 5729, 5730, 5731, 5732, 5733, 5734, 5735, 5736, 5737, 5738, 5739, 5740, 5743, 5744, 5745, 5746, 5747, 5748, 5749, 5750, 5751, 5752, 5753, 5754, 5755, 5756, 5757, 5758, 5759, 5761, 5762, 5763, 5764, 5765, 5766, 5767, 5768, 5769, 5770, 5771, 5772, 5773, 5774, 5775, 5776, 5777, 5778, 5779, 5780, 5781, 5782, 5783, 5784, 5785, 5786, 5792, 5793, 5794, 5795, 5796, 5797, 5798, 5799, 5800, 5801, 5802, 5803, 5804, 5805, 5806, 5807, 5808, 5809, 5810, 5811, 5812, 5813, 5814, 5815, 5816, 5817, 5818, 5819, 5820, 5821, 5822, 5823, 5824, 5825, 5826, 5827, 5828, 5829, 5830, 5831, 5832, 5833, 5834, 5835, 5836, 5837, 5838, 5839, 5840, 5841, 5842, 5843, 5844, 5845, 5846, 5847, 5848, 5849, 5850, 5851, 5852, 5853, 5854, 5855, 5856, 5857, 5858, 5859, 5860, 5861, 5862, 5863, 5864, 5865, 5866, 5873, 5874, 5875, 5876, 5877, 5878, 5879, 5880, 5888, 5889, 5890, 5891, 5892, 5893, 5894, 5895, 5896, 5897, 5898, 5899, 5900, 5902, 5903, 5904, 5905, 5920, 5921, 5922, 5923, 5924, 5925, 5926, 5927, 5928, 5929, 5930, 5931, 5932, 5933, 5934, 5935, 5936, 5937, 5952, 5953, 5954, 5955, 5956, 5957, 5958, 5959, 5960, 5961, 5962, 5963, 5964, 5965, 5966, 5967, 5968, 5969, 5984, 5985, 5986, 5987, 5988, 5989, 5990, 5991, 5992, 5993, 5994, 5995, 5996, 5998, 5999, 6e3, 6016, 6017, 6018, 6019, 6020, 6021, 6022, 6023, 6024, 6025, 6026, 6027, 6028, 6029, 6030, 6031, 6032, 6033, 6034, 6035, 6036, 6037, 6038, 6039, 6040, 6041, 6042, 6043, 6044, 6045, 6046, 6047, 6048, 6049, 6050, 6051, 6052, 6053, 6054, 6055, 6056, 6057, 6058, 6059, 6060, 6061, 6062, 6063, 6064, 6065, 6066, 6067, 6108, 6176, 6177, 6178, 6179, 6180, 6181, 6182, 6183, 6184, 6185, 6186, 6187, 6188, 6189, 6190, 6191, 6192, 6193, 6194, 6195, 6196, 6197, 6198, 6199, 6200, 6201, 6202, 6203, 6204, 6205, 6206, 6207, 6208, 6209, 6210, 6212, 6213, 6214, 6215, 6216, 6217, 6218, 6219, 6220, 6221, 6222, 6223, 6224, 6225, 6226, 6227, 6228, 6229, 6230, 6231, 6232, 6233, 6234, 6235, 6236, 6237, 6238, 6239, 6240, 6241, 6242, 6243, 6244, 6245, 6246, 6247, 6248, 6249, 6250, 6251, 6252, 6253, 6254, 6255, 6256, 6257, 6258, 6259, 6260, 6261, 6262, 6263, 6272, 6273, 6274, 6275, 6276, 6279, 6280, 6281, 6282, 6283, 6284, 6285, 6286, 6287, 6288, 6289, 6290, 6291, 6292, 6293, 6294, 6295, 6296, 6297, 6298, 6299, 6300, 6301, 6302, 6303, 6304, 6305, 6306, 6307, 6308, 6309, 6310, 6311, 6312, 6314, 6320, 6321, 6322, 6323, 6324, 6325, 6326, 6327, 6328, 6329, 6330, 6331, 6332, 6333, 6334, 6335, 6336, 6337, 6338, 6339, 6340, 6341, 6342, 6343, 6344, 6345, 6346, 6347, 6348, 6349, 6350, 6351, 6352, 6353, 6354, 6355, 6356, 6357, 6358, 6359, 6360, 6361, 6362, 6363, 6364, 6365, 6366, 6367, 6368, 6369, 6370, 6371, 6372, 6373, 6374, 6375, 6376, 6377, 6378, 6379, 6380, 6381, 6382, 6383, 6384, 6385, 6386, 6387, 6388, 6389, 6400, 6401, 6402, 6403, 6404, 6405, 6406, 6407, 6408, 6409, 6410, 6411, 6412, 6413, 6414, 6415, 6416, 6417, 6418, 6419, 6420, 6421, 6422, 6423, 6424, 6425, 6426, 6427, 6428, 6429, 6430, 6480, 6481, 6482, 6483, 6484, 6485, 6486, 6487, 6488, 6489, 6490, 6491, 6492, 6493, 6494, 6495, 6496, 6497, 6498, 6499, 6500, 6501, 6502, 6503, 6504, 6505, 6506, 6507, 6508, 6509, 6512, 6513, 6514, 6515, 6516, 6528, 6529, 6530, 6531, 6532, 6533, 6534, 6535, 6536, 6537, 6538, 6539, 6540, 6541, 6542, 6543, 6544, 6545, 6546, 6547, 6548, 6549, 6550, 6551, 6552, 6553, 6554, 6555, 6556, 6557, 6558, 6559, 6560, 6561, 6562, 6563, 6564, 6565, 6566, 6567, 6568, 6569, 6570, 6571, 6576, 6577, 6578, 6579, 6580, 6581, 6582, 6583, 6584, 6585, 6586, 6587, 6588, 6589, 6590, 6591, 6592, 6593, 6594, 6595, 6596, 6597, 6598, 6599, 6600, 6601, 6656, 6657, 6658, 6659, 6660, 6661, 6662, 6663, 6664, 6665, 6666, 6667, 6668, 6669, 6670, 6671, 6672, 6673, 6674, 6675, 6676, 6677, 6678, 6688, 6689, 6690, 6691, 6692, 6693, 6694, 6695, 6696, 6697, 6698, 6699, 6700, 6701, 6702, 6703, 6704, 6705, 6706, 6707, 6708, 6709, 6710, 6711, 6712, 6713, 6714, 6715, 6716, 6717, 6718, 6719, 6720, 6721, 6722, 6723, 6724, 6725, 6726, 6727, 6728, 6729, 6730, 6731, 6732, 6733, 6734, 6735, 6736, 6737, 6738, 6739, 6740, 6917, 6918, 6919, 6920, 6921, 6922, 6923, 6924, 6925, 6926, 6927, 6928, 6929, 6930, 6931, 6932, 6933, 6934, 6935, 6936, 6937, 6938, 6939, 6940, 6941, 6942, 6943, 6944, 6945, 6946, 6947, 6948, 6949, 6950, 6951, 6952, 6953, 6954, 6955, 6956, 6957, 6958, 6959, 6960, 6961, 6962, 6963, 6981, 6982, 6983, 6984, 6985, 6986, 6987, 7043, 7044, 7045, 7046, 7047, 7048, 7049, 7050, 7051, 7052, 7053, 7054, 7055, 7056, 7057, 7058, 7059, 7060, 7061, 7062, 7063, 7064, 7065, 7066, 7067, 7068, 7069, 7070, 7071, 7072, 7086, 7087, 7098, 7099, 7100, 7101, 7102, 7103, 7104, 7105, 7106, 7107, 7108, 7109, 7110, 7111, 7112, 7113, 7114, 7115, 7116, 7117, 7118, 7119, 7120, 7121, 7122, 7123, 7124, 7125, 7126, 7127, 7128, 7129, 7130, 7131, 7132, 7133, 7134, 7135, 7136, 7137, 7138, 7139, 7140, 7141, 7168, 7169, 7170, 7171, 7172, 7173, 7174, 7175, 7176, 7177, 7178, 7179, 7180, 7181, 7182, 7183, 7184, 7185, 7186, 7187, 7188, 7189, 7190, 7191, 7192, 7193, 7194, 7195, 7196, 7197, 7198, 7199, 7200, 7201, 7202, 7203, 7245, 7246, 7247, 7258, 7259, 7260, 7261, 7262, 7263, 7264, 7265, 7266, 7267, 7268, 7269, 7270, 7271, 7272, 7273, 7274, 7275, 7276, 7277, 7278, 7279, 7280, 7281, 7282, 7283, 7284, 7285, 7286, 7287, 7401, 7402, 7403, 7404, 7406, 7407, 7408, 7409, 7413, 7414, 8501, 8502, 8503, 8504, 11568, 11569, 11570, 11571, 11572, 11573, 11574, 11575, 11576, 11577, 11578, 11579, 11580, 11581, 11582, 11583, 11584, 11585, 11586, 11587, 11588, 11589, 11590, 11591, 11592, 11593, 11594, 11595, 11596, 11597, 11598, 11599, 11600, 11601, 11602, 11603, 11604, 11605, 11606, 11607, 11608, 11609, 11610, 11611, 11612, 11613, 11614, 11615, 11616, 11617, 11618, 11619, 11620, 11621, 11622, 11623, 11648, 11649, 11650, 11651, 11652, 11653, 11654, 11655, 11656, 11657, 11658, 11659, 11660, 11661, 11662, 11663, 11664, 11665, 11666, 11667, 11668, 11669, 11670, 11680, 11681, 11682, 11683, 11684, 11685, 11686, 11688, 11689, 11690, 11691, 11692, 11693, 11694, 11696, 11697, 11698, 11699, 11700, 11701, 11702, 11704, 11705, 11706, 11707, 11708, 11709, 11710, 11712, 11713, 11714, 11715, 11716, 11717, 11718, 11720, 11721, 11722, 11723, 11724, 11725, 11726, 11728, 11729, 11730, 11731, 11732, 11733, 11734, 11736, 11737, 11738, 11739, 11740, 11741, 11742, 12294, 12348, 12353, 12354, 12355, 12356, 12357, 12358, 12359, 12360, 12361, 12362, 12363, 12364, 12365, 12366, 12367, 12368, 12369, 12370, 12371, 12372, 12373, 12374, 12375, 12376, 12377, 12378, 12379, 12380, 12381, 12382, 12383, 12384, 12385, 12386, 12387, 12388, 12389, 12390, 12391, 12392, 12393, 12394, 12395, 12396, 12397, 12398, 12399, 12400, 12401, 12402, 12403, 12404, 12405, 12406, 12407, 12408, 12409, 12410, 12411, 12412, 12413, 12414, 12415, 12416, 12417, 12418, 12419, 12420, 12421, 12422, 12423, 12424, 12425, 12426, 12427, 12428, 12429, 12430, 12431, 12432, 12433, 12434, 12435, 12436, 12437, 12438, 12447, 12449, 12450, 12451, 12452, 12453, 12454, 12455, 12456, 12457, 12458, 12459, 12460, 12461, 12462, 12463, 12464, 12465, 12466, 12467, 12468, 12469, 12470, 12471, 12472, 12473, 12474, 12475, 12476, 12477, 12478, 12479, 12480, 12481, 12482, 12483, 12484, 12485, 12486, 12487, 12488, 12489, 12490, 12491, 12492, 12493, 12494, 12495, 12496, 12497, 12498, 12499, 12500, 12501, 12502, 12503, 12504, 12505, 12506, 12507, 12508, 12509, 12510, 12511, 12512, 12513, 12514, 12515, 12516, 12517, 12518, 12519, 12520, 12521, 12522, 12523, 12524, 12525, 12526, 12527, 12528, 12529, 12530, 12531, 12532, 12533, 12534, 12535, 12536, 12537, 12538, 12543, 12549, 12550, 12551, 12552, 12553, 12554, 12555, 12556, 12557, 12558, 12559, 12560, 12561, 12562, 12563, 12564, 12565, 12566, 12567, 12568, 12569, 12570, 12571, 12572, 12573, 12574, 12575, 12576, 12577, 12578, 12579, 12580, 12581, 12582, 12583, 12584, 12585, 12586, 12587, 12588, 12589, 12590, 12593, 12594, 12595, 12596, 12597, 12598, 12599, 12600, 12601, 12602, 12603, 12604, 12605, 12606, 12607, 12608, 12609, 12610, 12611, 12612, 12613, 12614, 12615, 12616, 12617, 12618, 12619, 12620, 12621, 12622, 12623, 12624, 12625, 12626, 12627, 12628, 12629, 12630, 12631, 12632, 12633, 12634, 12635, 12636, 12637, 12638, 12639, 12640, 12641, 12642, 12643, 12644, 12645, 12646, 12647, 12648, 12649, 12650, 12651, 12652, 12653, 12654, 12655, 12656, 12657, 12658, 12659, 12660, 12661, 12662, 12663, 12664, 12665, 12666, 12667, 12668, 12669, 12670, 12671, 12672, 12673, 12674, 12675, 12676, 12677, 12678, 12679, 12680, 12681, 12682, 12683, 12684, 12685, 12686, 12704, 12705, 12706, 12707, 12708, 12709, 12710, 12711, 12712, 12713, 12714, 12715, 12716, 12717, 12718, 12719, 12720, 12721, 12722, 12723, 12724, 12725, 12726, 12727, 12728, 12729, 12730, 12784, 12785, 12786, 12787, 12788, 12789, 12790, 12791, 12792, 12793, 12794, 12795, 12796, 12797, 12798, 12799, 13312, 19893, 19968, 40938, 40960, 40961, 40962, 40963, 40964, 40965, 40966, 40967, 40968, 40969, 40970, 40971, 40972, 40973, 40974, 40975, 40976, 40977, 40978, 40979, 40980, 40982, 40983, 40984, 40985, 40986, 40987, 40988, 40989, 40990, 40991, 40992, 40993, 40994, 40995, 40996, 40997, 40998, 40999, 41e3, 41001, 41002, 41003, 41004, 41005, 41006, 41007, 41008, 41009, 41010, 41011, 41012, 41013, 41014, 41015, 41016, 41017, 41018, 41019, 41020, 41021, 41022, 41023, 41024, 41025, 41026, 41027, 41028, 41029, 41030, 41031, 41032, 41033, 41034, 41035, 41036, 41037, 41038, 41039, 41040, 41041, 41042, 41043, 41044, 41045, 41046, 41047, 41048, 41049, 41050, 41051, 41052, 41053, 41054, 41055, 41056, 41057, 41058, 41059, 41060, 41061, 41062, 41063, 41064, 41065, 41066, 41067, 41068, 41069, 41070, 41071, 41072, 41073, 41074, 41075, 41076, 41077, 41078, 41079, 41080, 41081, 41082, 41083, 41084, 41085, 41086, 41087, 41088, 41089, 41090, 41091, 41092, 41093, 41094, 41095, 41096, 41097, 41098, 41099, 41100, 41101, 41102, 41103, 41104, 41105, 41106, 41107, 41108, 41109, 41110, 41111, 41112, 41113, 41114, 41115, 41116, 41117, 41118, 41119, 41120, 41121, 41122, 41123, 41124, 41125, 41126, 41127, 41128, 41129, 41130, 41131, 41132, 41133, 41134, 41135, 41136, 41137, 41138, 41139, 41140, 41141, 41142, 41143, 41144, 41145, 41146, 41147, 41148, 41149, 41150, 41151, 41152, 41153, 41154, 41155, 41156, 41157, 41158, 41159, 41160, 41161, 41162, 41163, 41164, 41165, 41166, 41167, 41168, 41169, 41170, 41171, 41172, 41173, 41174, 41175, 41176, 41177, 41178, 41179, 41180, 41181, 41182, 41183, 41184, 41185, 41186, 41187, 41188, 41189, 41190, 41191, 41192, 41193, 41194, 41195, 41196, 41197, 41198, 41199, 41200, 41201, 41202, 41203, 41204, 41205, 41206, 41207, 41208, 41209, 41210, 41211, 41212, 41213, 41214, 41215, 41216, 41217, 41218, 41219, 41220, 41221, 41222, 41223, 41224, 41225, 41226, 41227, 41228, 41229, 41230, 41231, 41232, 41233, 41234, 41235, 41236, 41237, 41238, 41239, 41240, 41241, 41242, 41243, 41244, 41245, 41246, 41247, 41248, 41249, 41250, 41251, 41252, 41253, 41254, 41255, 41256, 41257, 41258, 41259, 41260, 41261, 41262, 41263, 41264, 41265, 41266, 41267, 41268, 41269, 41270, 41271, 41272, 41273, 41274, 41275, 41276, 41277, 41278, 41279, 41280, 41281, 41282, 41283, 41284, 41285, 41286, 41287, 41288, 41289, 41290, 41291, 41292, 41293, 41294, 41295, 41296, 41297, 41298, 41299, 41300, 41301, 41302, 41303, 41304, 41305, 41306, 41307, 41308, 41309, 41310, 41311, 41312, 41313, 41314, 41315, 41316, 41317, 41318, 41319, 41320, 41321, 41322, 41323, 41324, 41325, 41326, 41327, 41328, 41329, 41330, 41331, 41332, 41333, 41334, 41335, 41336, 41337, 41338, 41339, 41340, 41341, 41342, 41343, 41344, 41345, 41346, 41347, 41348, 41349, 41350, 41351, 41352, 41353, 41354, 41355, 41356, 41357, 41358, 41359, 41360, 41361, 41362, 41363, 41364, 41365, 41366, 41367, 41368, 41369, 41370, 41371, 41372, 41373, 41374, 41375, 41376, 41377, 41378, 41379, 41380, 41381, 41382, 41383, 41384, 41385, 41386, 41387, 41388, 41389, 41390, 41391, 41392, 41393, 41394, 41395, 41396, 41397, 41398, 41399, 41400, 41401, 41402, 41403, 41404, 41405, 41406, 41407, 41408, 41409, 41410, 41411, 41412, 41413, 41414, 41415, 41416, 41417, 41418, 41419, 41420, 41421, 41422, 41423, 41424, 41425, 41426, 41427, 41428, 41429, 41430, 41431, 41432, 41433, 41434, 41435, 41436, 41437, 41438, 41439, 41440, 41441, 41442, 41443, 41444, 41445, 41446, 41447, 41448, 41449, 41450, 41451, 41452, 41453, 41454, 41455, 41456, 41457, 41458, 41459, 41460, 41461, 41462, 41463, 41464, 41465, 41466, 41467, 41468, 41469, 41470, 41471, 41472, 41473, 41474, 41475, 41476, 41477, 41478, 41479, 41480, 41481, 41482, 41483, 41484, 41485, 41486, 41487, 41488, 41489, 41490, 41491, 41492, 41493, 41494, 41495, 41496, 41497, 41498, 41499, 41500, 41501, 41502, 41503, 41504, 41505, 41506, 41507, 41508, 41509, 41510, 41511, 41512, 41513, 41514, 41515, 41516, 41517, 41518, 41519, 41520, 41521, 41522, 41523, 41524, 41525, 41526, 41527, 41528, 41529, 41530, 41531, 41532, 41533, 41534, 41535, 41536, 41537, 41538, 41539, 41540, 41541, 41542, 41543, 41544, 41545, 41546, 41547, 41548, 41549, 41550, 41551, 41552, 41553, 41554, 41555, 41556, 41557, 41558, 41559, 41560, 41561, 41562, 41563, 41564, 41565, 41566, 41567, 41568, 41569, 41570, 41571, 41572, 41573, 41574, 41575, 41576, 41577, 41578, 41579, 41580, 41581, 41582, 41583, 41584, 41585, 41586, 41587, 41588, 41589, 41590, 41591, 41592, 41593, 41594, 41595, 41596, 41597, 41598, 41599, 41600, 41601, 41602, 41603, 41604, 41605, 41606, 41607, 41608, 41609, 41610, 41611, 41612, 41613, 41614, 41615, 41616, 41617, 41618, 41619, 41620, 41621, 41622, 41623, 41624, 41625, 41626, 41627, 41628, 41629, 41630, 41631, 41632, 41633, 41634, 41635, 41636, 41637, 41638, 41639, 41640, 41641, 41642, 41643, 41644, 41645, 41646, 41647, 41648, 41649, 41650, 41651, 41652, 41653, 41654, 41655, 41656, 41657, 41658, 41659, 41660, 41661, 41662, 41663, 41664, 41665, 41666, 41667, 41668, 41669, 41670, 41671, 41672, 41673, 41674, 41675, 41676, 41677, 41678, 41679, 41680, 41681, 41682, 41683, 41684, 41685, 41686, 41687, 41688, 41689, 41690, 41691, 41692, 41693, 41694, 41695, 41696, 41697, 41698, 41699, 41700, 41701, 41702, 41703, 41704, 41705, 41706, 41707, 41708, 41709, 41710, 41711, 41712, 41713, 41714, 41715, 41716, 41717, 41718, 41719, 41720, 41721, 41722, 41723, 41724, 41725, 41726, 41727, 41728, 41729, 41730, 41731, 41732, 41733, 41734, 41735, 41736, 41737, 41738, 41739, 41740, 41741, 41742, 41743, 41744, 41745, 41746, 41747, 41748, 41749, 41750, 41751, 41752, 41753, 41754, 41755, 41756, 41757, 41758, 41759, 41760, 41761, 41762, 41763, 41764, 41765, 41766, 41767, 41768, 41769, 41770, 41771, 41772, 41773, 41774, 41775, 41776, 41777, 41778, 41779, 41780, 41781, 41782, 41783, 41784, 41785, 41786, 41787, 41788, 41789, 41790, 41791, 41792, 41793, 41794, 41795, 41796, 41797, 41798, 41799, 41800, 41801, 41802, 41803, 41804, 41805, 41806, 41807, 41808, 41809, 41810, 41811, 41812, 41813, 41814, 41815, 41816, 41817, 41818, 41819, 41820, 41821, 41822, 41823, 41824, 41825, 41826, 41827, 41828, 41829, 41830, 41831, 41832, 41833, 41834, 41835, 41836, 41837, 41838, 41839, 41840, 41841, 41842, 41843, 41844, 41845, 41846, 41847, 41848, 41849, 41850, 41851, 41852, 41853, 41854, 41855, 41856, 41857, 41858, 41859, 41860, 41861, 41862, 41863, 41864, 41865, 41866, 41867, 41868, 41869, 41870, 41871, 41872, 41873, 41874, 41875, 41876, 41877, 41878, 41879, 41880, 41881, 41882, 41883, 41884, 41885, 41886, 41887, 41888, 41889, 41890, 41891, 41892, 41893, 41894, 41895, 41896, 41897, 41898, 41899, 41900, 41901, 41902, 41903, 41904, 41905, 41906, 41907, 41908, 41909, 41910, 41911, 41912, 41913, 41914, 41915, 41916, 41917, 41918, 41919, 41920, 41921, 41922, 41923, 41924, 41925, 41926, 41927, 41928, 41929, 41930, 41931, 41932, 41933, 41934, 41935, 41936, 41937, 41938, 41939, 41940, 41941, 41942, 41943, 41944, 41945, 41946, 41947, 41948, 41949, 41950, 41951, 41952, 41953, 41954, 41955, 41956, 41957, 41958, 41959, 41960, 41961, 41962, 41963, 41964, 41965, 41966, 41967, 41968, 41969, 41970, 41971, 41972, 41973, 41974, 41975, 41976, 41977, 41978, 41979, 41980, 41981, 41982, 41983, 41984, 41985, 41986, 41987, 41988, 41989, 41990, 41991, 41992, 41993, 41994, 41995, 41996, 41997, 41998, 41999, 42e3, 42001, 42002, 42003, 42004, 42005, 42006, 42007, 42008, 42009, 42010, 42011, 42012, 42013, 42014, 42015, 42016, 42017, 42018, 42019, 42020, 42021, 42022, 42023, 42024, 42025, 42026, 42027, 42028, 42029, 42030, 42031, 42032, 42033, 42034, 42035, 42036, 42037, 42038, 42039, 42040, 42041, 42042, 42043, 42044, 42045, 42046, 42047, 42048, 42049, 42050, 42051, 42052, 42053, 42054, 42055, 42056, 42057, 42058, 42059, 42060, 42061, 42062, 42063, 42064, 42065, 42066, 42067, 42068, 42069, 42070, 42071, 42072, 42073, 42074, 42075, 42076, 42077, 42078, 42079, 42080, 42081, 42082, 42083, 42084, 42085, 42086, 42087, 42088, 42089, 42090, 42091, 42092, 42093, 42094, 42095, 42096, 42097, 42098, 42099, 42100, 42101, 42102, 42103, 42104, 42105, 42106, 42107, 42108, 42109, 42110, 42111, 42112, 42113, 42114, 42115, 42116, 42117, 42118, 42119, 42120, 42121, 42122, 42123, 42124, 42192, 42193, 42194, 42195, 42196, 42197, 42198, 42199, 42200, 42201, 42202, 42203, 42204, 42205, 42206, 42207, 42208, 42209, 42210, 42211, 42212, 42213, 42214, 42215, 42216, 42217, 42218, 42219, 42220, 42221, 42222, 42223, 42224, 42225, 42226, 42227, 42228, 42229, 42230, 42231, 42240, 42241, 42242, 42243, 42244, 42245, 42246, 42247, 42248, 42249, 42250, 42251, 42252, 42253, 42254, 42255, 42256, 42257, 42258, 42259, 42260, 42261, 42262, 42263, 42264, 42265, 42266, 42267, 42268, 42269, 42270, 42271, 42272, 42273, 42274, 42275, 42276, 42277, 42278, 42279, 42280, 42281, 42282, 42283, 42284, 42285, 42286, 42287, 42288, 42289, 42290, 42291, 42292, 42293, 42294, 42295, 42296, 42297, 42298, 42299, 42300, 42301, 42302, 42303, 42304, 42305, 42306, 42307, 42308, 42309, 42310, 42311, 42312, 42313, 42314, 42315, 42316, 42317, 42318, 42319, 42320, 42321, 42322, 42323, 42324, 42325, 42326, 42327, 42328, 42329, 42330, 42331, 42332, 42333, 42334, 42335, 42336, 42337, 42338, 42339, 42340, 42341, 42342, 42343, 42344, 42345, 42346, 42347, 42348, 42349, 42350, 42351, 42352, 42353, 42354, 42355, 42356, 42357, 42358, 42359, 42360, 42361, 42362, 42363, 42364, 42365, 42366, 42367, 42368, 42369, 42370, 42371, 42372, 42373, 42374, 42375, 42376, 42377, 42378, 42379, 42380, 42381, 42382, 42383, 42384, 42385, 42386, 42387, 42388, 42389, 42390, 42391, 42392, 42393, 42394, 42395, 42396, 42397, 42398, 42399, 42400, 42401, 42402, 42403, 42404, 42405, 42406, 42407, 42408, 42409, 42410, 42411, 42412, 42413, 42414, 42415, 42416, 42417, 42418, 42419, 42420, 42421, 42422, 42423, 42424, 42425, 42426, 42427, 42428, 42429, 42430, 42431, 42432, 42433, 42434, 42435, 42436, 42437, 42438, 42439, 42440, 42441, 42442, 42443, 42444, 42445, 42446, 42447, 42448, 42449, 42450, 42451, 42452, 42453, 42454, 42455, 42456, 42457, 42458, 42459, 42460, 42461, 42462, 42463, 42464, 42465, 42466, 42467, 42468, 42469, 42470, 42471, 42472, 42473, 42474, 42475, 42476, 42477, 42478, 42479, 42480, 42481, 42482, 42483, 42484, 42485, 42486, 42487, 42488, 42489, 42490, 42491, 42492, 42493, 42494, 42495, 42496, 42497, 42498, 42499, 42500, 42501, 42502, 42503, 42504, 42505, 42506, 42507, 42512, 42513, 42514, 42515, 42516, 42517, 42518, 42519, 42520, 42521, 42522, 42523, 42524, 42525, 42526, 42527, 42538, 42539, 42606, 42656, 42657, 42658, 42659, 42660, 42661, 42662, 42663, 42664, 42665, 42666, 42667, 42668, 42669, 42670, 42671, 42672, 42673, 42674, 42675, 42676, 42677, 42678, 42679, 42680, 42681, 42682, 42683, 42684, 42685, 42686, 42687, 42688, 42689, 42690, 42691, 42692, 42693, 42694, 42695, 42696, 42697, 42698, 42699, 42700, 42701, 42702, 42703, 42704, 42705, 42706, 42707, 42708, 42709, 42710, 42711, 42712, 42713, 42714, 42715, 42716, 42717, 42718, 42719, 42720, 42721, 42722, 42723, 42724, 42725, 42895, 42999, 43003, 43004, 43005, 43006, 43007, 43008, 43009, 43011, 43012, 43013, 43015, 43016, 43017, 43018, 43020, 43021, 43022, 43023, 43024, 43025, 43026, 43027, 43028, 43029, 43030, 43031, 43032, 43033, 43034, 43035, 43036, 43037, 43038, 43039, 43040, 43041, 43042, 43072, 43073, 43074, 43075, 43076, 43077, 43078, 43079, 43080, 43081, 43082, 43083, 43084, 43085, 43086, 43087, 43088, 43089, 43090, 43091, 43092, 43093, 43094, 43095, 43096, 43097, 43098, 43099, 43100, 43101, 43102, 43103, 43104, 43105, 43106, 43107, 43108, 43109, 43110, 43111, 43112, 43113, 43114, 43115, 43116, 43117, 43118, 43119, 43120, 43121, 43122, 43123, 43138, 43139, 43140, 43141, 43142, 43143, 43144, 43145, 43146, 43147, 43148, 43149, 43150, 43151, 43152, 43153, 43154, 43155, 43156, 43157, 43158, 43159, 43160, 43161, 43162, 43163, 43164, 43165, 43166, 43167, 43168, 43169, 43170, 43171, 43172, 43173, 43174, 43175, 43176, 43177, 43178, 43179, 43180, 43181, 43182, 43183, 43184, 43185, 43186, 43187, 43250, 43251, 43252, 43253, 43254, 43255, 43259, 43261, 43274, 43275, 43276, 43277, 43278, 43279, 43280, 43281, 43282, 43283, 43284, 43285, 43286, 43287, 43288, 43289, 43290, 43291, 43292, 43293, 43294, 43295, 43296, 43297, 43298, 43299, 43300, 43301, 43312, 43313, 43314, 43315, 43316, 43317, 43318, 43319, 43320, 43321, 43322, 43323, 43324, 43325, 43326, 43327, 43328, 43329, 43330, 43331, 43332, 43333, 43334, 43360, 43361, 43362, 43363, 43364, 43365, 43366, 43367, 43368, 43369, 43370, 43371, 43372, 43373, 43374, 43375, 43376, 43377, 43378, 43379, 43380, 43381, 43382, 43383, 43384, 43385, 43386, 43387, 43388, 43396, 43397, 43398, 43399, 43400, 43401, 43402, 43403, 43404, 43405, 43406, 43407, 43408, 43409, 43410, 43411, 43412, 43413, 43414, 43415, 43416, 43417, 43418, 43419, 43420, 43421, 43422, 43423, 43424, 43425, 43426, 43427, 43428, 43429, 43430, 43431, 43432, 43433, 43434, 43435, 43436, 43437, 43438, 43439, 43440, 43441, 43442, 43488, 43489, 43490, 43491, 43492, 43495, 43496, 43497, 43498, 43499, 43500, 43501, 43502, 43503, 43514, 43515, 43516, 43517, 43518, 43520, 43521, 43522, 43523, 43524, 43525, 43526, 43527, 43528, 43529, 43530, 43531, 43532, 43533, 43534, 43535, 43536, 43537, 43538, 43539, 43540, 43541, 43542, 43543, 43544, 43545, 43546, 43547, 43548, 43549, 43550, 43551, 43552, 43553, 43554, 43555, 43556, 43557, 43558, 43559, 43560, 43584, 43585, 43586, 43588, 43589, 43590, 43591, 43592, 43593, 43594, 43595, 43616, 43617, 43618, 43619, 43620, 43621, 43622, 43623, 43624, 43625, 43626, 43627, 43628, 43629, 43630, 43631, 43633, 43634, 43635, 43636, 43637, 43638, 43642, 43646, 43647, 43648, 43649, 43650, 43651, 43652, 43653, 43654, 43655, 43656, 43657, 43658, 43659, 43660, 43661, 43662, 43663, 43664, 43665, 43666, 43667, 43668, 43669, 43670, 43671, 43672, 43673, 43674, 43675, 43676, 43677, 43678, 43679, 43680, 43681, 43682, 43683, 43684, 43685, 43686, 43687, 43688, 43689, 43690, 43691, 43692, 43693, 43694, 43695, 43697, 43701, 43702, 43705, 43706, 43707, 43708, 43709, 43712, 43714, 43739, 43740, 43744, 43745, 43746, 43747, 43748, 43749, 43750, 43751, 43752, 43753, 43754, 43762, 43777, 43778, 43779, 43780, 43781, 43782, 43785, 43786, 43787, 43788, 43789, 43790, 43793, 43794, 43795, 43796, 43797, 43798, 43808, 43809, 43810, 43811, 43812, 43813, 43814, 43816, 43817, 43818, 43819, 43820, 43821, 43822, 43968, 43969, 43970, 43971, 43972, 43973, 43974, 43975, 43976, 43977, 43978, 43979, 43980, 43981, 43982, 43983, 43984, 43985, 43986, 43987, 43988, 43989, 43990, 43991, 43992, 43993, 43994, 43995, 43996, 43997, 43998, 43999, 44e3, 44001, 44002, 44032, 55203, 55216, 55217, 55218, 55219, 55220, 55221, 55222, 55223, 55224, 55225, 55226, 55227, 55228, 55229, 55230, 55231, 55232, 55233, 55234, 55235, 55236, 55237, 55238, 55243, 55244, 55245, 55246, 55247, 55248, 55249, 55250, 55251, 55252, 55253, 55254, 55255, 55256, 55257, 55258, 55259, 55260, 55261, 55262, 55263, 55264, 55265, 55266, 55267, 55268, 55269, 55270, 55271, 55272, 55273, 55274, 55275, 55276, 55277, 55278, 55279, 55280, 55281, 55282, 55283, 55284, 55285, 55286, 55287, 55288, 55289, 55290, 55291, 63744, 63745, 63746, 63747, 63748, 63749, 63750, 63751, 63752, 63753, 63754, 63755, 63756, 63757, 63758, 63759, 63760, 63761, 63762, 63763, 63764, 63765, 63766, 63767, 63768, 63769, 63770, 63771, 63772, 63773, 63774, 63775, 63776, 63777, 63778, 63779, 63780, 63781, 63782, 63783, 63784, 63785, 63786, 63787, 63788, 63789, 63790, 63791, 63792, 63793, 63794, 63795, 63796, 63797, 63798, 63799, 63800, 63801, 63802, 63803, 63804, 63805, 63806, 63807, 63808, 63809, 63810, 63811, 63812, 63813, 63814, 63815, 63816, 63817, 63818, 63819, 63820, 63821, 63822, 63823, 63824, 63825, 63826, 63827, 63828, 63829, 63830, 63831, 63832, 63833, 63834, 63835, 63836, 63837, 63838, 63839, 63840, 63841, 63842, 63843, 63844, 63845, 63846, 63847, 63848, 63849, 63850, 63851, 63852, 63853, 63854, 63855, 63856, 63857, 63858, 63859, 63860, 63861, 63862, 63863, 63864, 63865, 63866, 63867, 63868, 63869, 63870, 63871, 63872, 63873, 63874, 63875, 63876, 63877, 63878, 63879, 63880, 63881, 63882, 63883, 63884, 63885, 63886, 63887, 63888, 63889, 63890, 63891, 63892, 63893, 63894, 63895, 63896, 63897, 63898, 63899, 63900, 63901, 63902, 63903, 63904, 63905, 63906, 63907, 63908, 63909, 63910, 63911, 63912, 63913, 63914, 63915, 63916, 63917, 63918, 63919, 63920, 63921, 63922, 63923, 63924, 63925, 63926, 63927, 63928, 63929, 63930, 63931, 63932, 63933, 63934, 63935, 63936, 63937, 63938, 63939, 63940, 63941, 63942, 63943, 63944, 63945, 63946, 63947, 63948, 63949, 63950, 63951, 63952, 63953, 63954, 63955, 63956, 63957, 63958, 63959, 63960, 63961, 63962, 63963, 63964, 63965, 63966, 63967, 63968, 63969, 63970, 63971, 63972, 63973, 63974, 63975, 63976, 63977, 63978, 63979, 63980, 63981, 63982, 63983, 63984, 63985, 63986, 63987, 63988, 63989, 63990, 63991, 63992, 63993, 63994, 63995, 63996, 63997, 63998, 63999, 64e3, 64001, 64002, 64003, 64004, 64005, 64006, 64007, 64008, 64009, 64010, 64011, 64012, 64013, 64014, 64015, 64016, 64017, 64018, 64019, 64020, 64021, 64022, 64023, 64024, 64025, 64026, 64027, 64028, 64029, 64030, 64031, 64032, 64033, 64034, 64035, 64036, 64037, 64038, 64039, 64040, 64041, 64042, 64043, 64044, 64045, 64046, 64047, 64048, 64049, 64050, 64051, 64052, 64053, 64054, 64055, 64056, 64057, 64058, 64059, 64060, 64061, 64062, 64063, 64064, 64065, 64066, 64067, 64068, 64069, 64070, 64071, 64072, 64073, 64074, 64075, 64076, 64077, 64078, 64079, 64080, 64081, 64082, 64083, 64084, 64085, 64086, 64087, 64088, 64089, 64090, 64091, 64092, 64093, 64094, 64095, 64096, 64097, 64098, 64099, 64100, 64101, 64102, 64103, 64104, 64105, 64106, 64107, 64108, 64109, 64112, 64113, 64114, 64115, 64116, 64117, 64118, 64119, 64120, 64121, 64122, 64123, 64124, 64125, 64126, 64127, 64128, 64129, 64130, 64131, 64132, 64133, 64134, 64135, 64136, 64137, 64138, 64139, 64140, 64141, 64142, 64143, 64144, 64145, 64146, 64147, 64148, 64149, 64150, 64151, 64152, 64153, 64154, 64155, 64156, 64157, 64158, 64159, 64160, 64161, 64162, 64163, 64164, 64165, 64166, 64167, 64168, 64169, 64170, 64171, 64172, 64173, 64174, 64175, 64176, 64177, 64178, 64179, 64180, 64181, 64182, 64183, 64184, 64185, 64186, 64187, 64188, 64189, 64190, 64191, 64192, 64193, 64194, 64195, 64196, 64197, 64198, 64199, 64200, 64201, 64202, 64203, 64204, 64205, 64206, 64207, 64208, 64209, 64210, 64211, 64212, 64213, 64214, 64215, 64216, 64217, 64285, 64287, 64288, 64289, 64290, 64291, 64292, 64293, 64294, 64295, 64296, 64298, 64299, 64300, 64301, 64302, 64303, 64304, 64305, 64306, 64307, 64308, 64309, 64310, 64312, 64313, 64314, 64315, 64316, 64318, 64320, 64321, 64323, 64324, 64326, 64327, 64328, 64329, 64330, 64331, 64332, 64333, 64334, 64335, 64336, 64337, 64338, 64339, 64340, 64341, 64342, 64343, 64344, 64345, 64346, 64347, 64348, 64349, 64350, 64351, 64352, 64353, 64354, 64355, 64356, 64357, 64358, 64359, 64360, 64361, 64362, 64363, 64364, 64365, 64366, 64367, 64368, 64369, 64370, 64371, 64372, 64373, 64374, 64375, 64376, 64377, 64378, 64379, 64380, 64381, 64382, 64383, 64384, 64385, 64386, 64387, 64388, 64389, 64390, 64391, 64392, 64393, 64394, 64395, 64396, 64397, 64398, 64399, 64400, 64401, 64402, 64403, 64404, 64405, 64406, 64407, 64408, 64409, 64410, 64411, 64412, 64413, 64414, 64415, 64416, 64417, 64418, 64419, 64420, 64421, 64422, 64423, 64424, 64425, 64426, 64427, 64428, 64429, 64430, 64431, 64432, 64433, 64467, 64468, 64469, 64470, 64471, 64472, 64473, 64474, 64475, 64476, 64477, 64478, 64479, 64480, 64481, 64482, 64483, 64484, 64485, 64486, 64487, 64488, 64489, 64490, 64491, 64492, 64493, 64494, 64495, 64496, 64497, 64498, 64499, 64500, 64501, 64502, 64503, 64504, 64505, 64506, 64507, 64508, 64509, 64510, 64511, 64512, 64513, 64514, 64515, 64516, 64517, 64518, 64519, 64520, 64521, 64522, 64523, 64524, 64525, 64526, 64527, 64528, 64529, 64530, 64531, 64532, 64533, 64534, 64535, 64536, 64537, 64538, 64539, 64540, 64541, 64542, 64543, 64544, 64545, 64546, 64547, 64548, 64549, 64550, 64551, 64552, 64553, 64554, 64555, 64556, 64557, 64558, 64559, 64560, 64561, 64562, 64563, 64564, 64565, 64566, 64567, 64568, 64569, 64570, 64571, 64572, 64573, 64574, 64575, 64576, 64577, 64578, 64579, 64580, 64581, 64582, 64583, 64584, 64585, 64586, 64587, 64588, 64589, 64590, 64591, 64592, 64593, 64594, 64595, 64596, 64597, 64598, 64599, 64600, 64601, 64602, 64603, 64604, 64605, 64606, 64607, 64608, 64609, 64610, 64611, 64612, 64613, 64614, 64615, 64616, 64617, 64618, 64619, 64620, 64621, 64622, 64623, 64624, 64625, 64626, 64627, 64628, 64629, 64630, 64631, 64632, 64633, 64634, 64635, 64636, 64637, 64638, 64639, 64640, 64641, 64642, 64643, 64644, 64645, 64646, 64647, 64648, 64649, 64650, 64651, 64652, 64653, 64654, 64655, 64656, 64657, 64658, 64659, 64660, 64661, 64662, 64663, 64664, 64665, 64666, 64667, 64668, 64669, 64670, 64671, 64672, 64673, 64674, 64675, 64676, 64677, 64678, 64679, 64680, 64681, 64682, 64683, 64684, 64685, 64686, 64687, 64688, 64689, 64690, 64691, 64692, 64693, 64694, 64695, 64696, 64697, 64698, 64699, 64700, 64701, 64702, 64703, 64704, 64705, 64706, 64707, 64708, 64709, 64710, 64711, 64712, 64713, 64714, 64715, 64716, 64717, 64718, 64719, 64720, 64721, 64722, 64723, 64724, 64725, 64726, 64727, 64728, 64729, 64730, 64731, 64732, 64733, 64734, 64735, 64736, 64737, 64738, 64739, 64740, 64741, 64742, 64743, 64744, 64745, 64746, 64747, 64748, 64749, 64750, 64751, 64752, 64753, 64754, 64755, 64756, 64757, 64758, 64759, 64760, 64761, 64762, 64763, 64764, 64765, 64766, 64767, 64768, 64769, 64770, 64771, 64772, 64773, 64774, 64775, 64776, 64777, 64778, 64779, 64780, 64781, 64782, 64783, 64784, 64785, 64786, 64787, 64788, 64789, 64790, 64791, 64792, 64793, 64794, 64795, 64796, 64797, 64798, 64799, 64800, 64801, 64802, 64803, 64804, 64805, 64806, 64807, 64808, 64809, 64810, 64811, 64812, 64813, 64814, 64815, 64816, 64817, 64818, 64819, 64820, 64821, 64822, 64823, 64824, 64825, 64826, 64827, 64828, 64829, 64848, 64849, 64850, 64851, 64852, 64853, 64854, 64855, 64856, 64857, 64858, 64859, 64860, 64861, 64862, 64863, 64864, 64865, 64866, 64867, 64868, 64869, 64870, 64871, 64872, 64873, 64874, 64875, 64876, 64877, 64878, 64879, 64880, 64881, 64882, 64883, 64884, 64885, 64886, 64887, 64888, 64889, 64890, 64891, 64892, 64893, 64894, 64895, 64896, 64897, 64898, 64899, 64900, 64901, 64902, 64903, 64904, 64905, 64906, 64907, 64908, 64909, 64910, 64911, 64914, 64915, 64916, 64917, 64918, 64919, 64920, 64921, 64922, 64923, 64924, 64925, 64926, 64927, 64928, 64929, 64930, 64931, 64932, 64933, 64934, 64935, 64936, 64937, 64938, 64939, 64940, 64941, 64942, 64943, 64944, 64945, 64946, 64947, 64948, 64949, 64950, 64951, 64952, 64953, 64954, 64955, 64956, 64957, 64958, 64959, 64960, 64961, 64962, 64963, 64964, 64965, 64966, 64967, 65008, 65009, 65010, 65011, 65012, 65013, 65014, 65015, 65016, 65017, 65018, 65019, 65136, 65137, 65138, 65139, 65140, 65142, 65143, 65144, 65145, 65146, 65147, 65148, 65149, 65150, 65151, 65152, 65153, 65154, 65155, 65156, 65157, 65158, 65159, 65160, 65161, 65162, 65163, 65164, 65165, 65166, 65167, 65168, 65169, 65170, 65171, 65172, 65173, 65174, 65175, 65176, 65177, 65178, 65179, 65180, 65181, 65182, 65183, 65184, 65185, 65186, 65187, 65188, 65189, 65190, 65191, 65192, 65193, 65194, 65195, 65196, 65197, 65198, 65199, 65200, 65201, 65202, 65203, 65204, 65205, 65206, 65207, 65208, 65209, 65210, 65211, 65212, 65213, 65214, 65215, 65216, 65217, 65218, 65219, 65220, 65221, 65222, 65223, 65224, 65225, 65226, 65227, 65228, 65229, 65230, 65231, 65232, 65233, 65234, 65235, 65236, 65237, 65238, 65239, 65240, 65241, 65242, 65243, 65244, 65245, 65246, 65247, 65248, 65249, 65250, 65251, 65252, 65253, 65254, 65255, 65256, 65257, 65258, 65259, 65260, 65261, 65262, 65263, 65264, 65265, 65266, 65267, 65268, 65269, 65270, 65271, 65272, 65273, 65274, 65275, 65276, 65382, 65383, 65384, 65385, 65386, 65387, 65388, 65389, 65390, 65391, 65393, 65394, 65395, 65396, 65397, 65398, 65399, 65400, 65401, 65402, 65403, 65404, 65405, 65406, 65407, 65408, 65409, 65410, 65411, 65412, 65413, 65414, 65415, 65416, 65417, 65418, 65419, 65420, 65421, 65422, 65423, 65424, 65425, 65426, 65427, 65428, 65429, 65430, 65431, 65432, 65433, 65434, 65435, 65436, 65437, 65440, 65441, 65442, 65443, 65444, 65445, 65446, 65447, 65448, 65449, 65450, 65451, 65452, 65453, 65454, 65455, 65456, 65457, 65458, 65459, 65460, 65461, 65462, 65463, 65464, 65465, 65466, 65467, 65468, 65469, 65470, 65474, 65475, 65476, 65477, 65478, 65479, 65482, 65483, 65484, 65485, 65486, 65487, 65490, 65491, 65492, 65493, 65494, 65495, 65498, 65499, 65500, 65536, 65537, 65538, 65539, 65540, 65541, 65542, 65543, 65544, 65545, 65546, 65547, 65549, 65550, 65551, 65552, 65553, 65554, 65555, 65556, 65557, 65558, 65559, 65560, 65561, 65562, 65563, 65564, 65565, 65566, 65567, 65568, 65569, 65570, 65571, 65572, 65573, 65574, 65576, 65577, 65578, 65579, 65580, 65581, 65582, 65583, 65584, 65585, 65586, 65587, 65588, 65589, 65590, 65591, 65592, 65593, 65594, 65596, 65597, 65599, 65600, 65601, 65602, 65603, 65604, 65605, 65606, 65607, 65608, 65609, 65610, 65611, 65612, 65613, 65616, 65617, 65618, 65619, 65620, 65621, 65622, 65623, 65624, 65625, 65626, 65627, 65628, 65629, 65664, 65665, 65666, 65667, 65668, 65669, 65670, 65671, 65672, 65673, 65674, 65675, 65676, 65677, 65678, 65679, 65680, 65681, 65682, 65683, 65684, 65685, 65686, 65687, 65688, 65689, 65690, 65691, 65692, 65693, 65694, 65695, 65696, 65697, 65698, 65699, 65700, 65701, 65702, 65703, 65704, 65705, 65706, 65707, 65708, 65709, 65710, 65711, 65712, 65713, 65714, 65715, 65716, 65717, 65718, 65719, 65720, 65721, 65722, 65723, 65724, 65725, 65726, 65727, 65728, 65729, 65730, 65731, 65732, 65733, 65734, 65735, 65736, 65737, 65738, 65739, 65740, 65741, 65742, 65743, 65744, 65745, 65746, 65747, 65748, 65749, 65750, 65751, 65752, 65753, 65754, 65755, 65756, 65757, 65758, 65759, 65760, 65761, 65762, 65763, 65764, 65765, 65766, 65767, 65768, 65769, 65770, 65771, 65772, 65773, 65774, 65775, 65776, 65777, 65778, 65779, 65780, 65781, 65782, 65783, 65784, 65785, 65786, 66176, 66177, 66178, 66179, 66180, 66181, 66182, 66183, 66184, 66185, 66186, 66187, 66188, 66189, 66190, 66191, 66192, 66193, 66194, 66195, 66196, 66197, 66198, 66199, 66200, 66201, 66202, 66203, 66204, 66208, 66209, 66210, 66211, 66212, 66213, 66214, 66215, 66216, 66217, 66218, 66219, 66220, 66221, 66222, 66223, 66224, 66225, 66226, 66227, 66228, 66229, 66230, 66231, 66232, 66233, 66234, 66235, 66236, 66237, 66238, 66239, 66240, 66241, 66242, 66243, 66244, 66245, 66246, 66247, 66248, 66249, 66250, 66251, 66252, 66253, 66254, 66255, 66256, 66304, 66305, 66306, 66307, 66308, 66309, 66310, 66311, 66312, 66313, 66314, 66315, 66316, 66317, 66318, 66319, 66320, 66321, 66322, 66323, 66324, 66325, 66326, 66327, 66328, 66329, 66330, 66331, 66332, 66333, 66334, 66335, 66349, 66350, 66351, 66352, 66353, 66354, 66355, 66356, 66357, 66358, 66359, 66360, 66361, 66362, 66363, 66364, 66365, 66366, 66367, 66368, 66370, 66371, 66372, 66373, 66374, 66375, 66376, 66377, 66384, 66385, 66386, 66387, 66388, 66389, 66390, 66391, 66392, 66393, 66394, 66395, 66396, 66397, 66398, 66399, 66400, 66401, 66402, 66403, 66404, 66405, 66406, 66407, 66408, 66409, 66410, 66411, 66412, 66413, 66414, 66415, 66416, 66417, 66418, 66419, 66420, 66421, 66432, 66433, 66434, 66435, 66436, 66437, 66438, 66439, 66440, 66441, 66442, 66443, 66444, 66445, 66446, 66447, 66448, 66449, 66450, 66451, 66452, 66453, 66454, 66455, 66456, 66457, 66458, 66459, 66460, 66461, 66464, 66465, 66466, 66467, 66468, 66469, 66470, 66471, 66472, 66473, 66474, 66475, 66476, 66477, 66478, 66479, 66480, 66481, 66482, 66483, 66484, 66485, 66486, 66487, 66488, 66489, 66490, 66491, 66492, 66493, 66494, 66495, 66496, 66497, 66498, 66499, 66504, 66505, 66506, 66507, 66508, 66509, 66510, 66511, 66640, 66641, 66642, 66643, 66644, 66645, 66646, 66647, 66648, 66649, 66650, 66651, 66652, 66653, 66654, 66655, 66656, 66657, 66658, 66659, 66660, 66661, 66662, 66663, 66664, 66665, 66666, 66667, 66668, 66669, 66670, 66671, 66672, 66673, 66674, 66675, 66676, 66677, 66678, 66679, 66680, 66681, 66682, 66683, 66684, 66685, 66686, 66687, 66688, 66689, 66690, 66691, 66692, 66693, 66694, 66695, 66696, 66697, 66698, 66699, 66700, 66701, 66702, 66703, 66704, 66705, 66706, 66707, 66708, 66709, 66710, 66711, 66712, 66713, 66714, 66715, 66716, 66717, 66816, 66817, 66818, 66819, 66820, 66821, 66822, 66823, 66824, 66825, 66826, 66827, 66828, 66829, 66830, 66831, 66832, 66833, 66834, 66835, 66836, 66837, 66838, 66839, 66840, 66841, 66842, 66843, 66844, 66845, 66846, 66847, 66848, 66849, 66850, 66851, 66852, 66853, 66854, 66855, 66864, 66865, 66866, 66867, 66868, 66869, 66870, 66871, 66872, 66873, 66874, 66875, 66876, 66877, 66878, 66879, 66880, 66881, 66882, 66883, 66884, 66885, 66886, 66887, 66888, 66889, 66890, 66891, 66892, 66893, 66894, 66895, 66896, 66897, 66898, 66899, 66900, 66901, 66902, 66903, 66904, 66905, 66906, 66907, 66908, 66909, 66910, 66911, 66912, 66913, 66914, 66915, 67072, 67073, 67074, 67075, 67076, 67077, 67078, 67079, 67080, 67081, 67082, 67083, 67084, 67085, 67086, 67087, 67088, 67089, 67090, 67091, 67092, 67093, 67094, 67095, 67096, 67097, 67098, 67099, 67100, 67101, 67102, 67103, 67104, 67105, 67106, 67107, 67108, 67109, 67110, 67111, 67112, 67113, 67114, 67115, 67116, 67117, 67118, 67119, 67120, 67121, 67122, 67123, 67124, 67125, 67126, 67127, 67128, 67129, 67130, 67131, 67132, 67133, 67134, 67135, 67136, 67137, 67138, 67139, 67140, 67141, 67142, 67143, 67144, 67145, 67146, 67147, 67148, 67149, 67150, 67151, 67152, 67153, 67154, 67155, 67156, 67157, 67158, 67159, 67160, 67161, 67162, 67163, 67164, 67165, 67166, 67167, 67168, 67169, 67170, 67171, 67172, 67173, 67174, 67175, 67176, 67177, 67178, 67179, 67180, 67181, 67182, 67183, 67184, 67185, 67186, 67187, 67188, 67189, 67190, 67191, 67192, 67193, 67194, 67195, 67196, 67197, 67198, 67199, 67200, 67201, 67202, 67203, 67204, 67205, 67206, 67207, 67208, 67209, 67210, 67211, 67212, 67213, 67214, 67215, 67216, 67217, 67218, 67219, 67220, 67221, 67222, 67223, 67224, 67225, 67226, 67227, 67228, 67229, 67230, 67231, 67232, 67233, 67234, 67235, 67236, 67237, 67238, 67239, 67240, 67241, 67242, 67243, 67244, 67245, 67246, 67247, 67248, 67249, 67250, 67251, 67252, 67253, 67254, 67255, 67256, 67257, 67258, 67259, 67260, 67261, 67262, 67263, 67264, 67265, 67266, 67267, 67268, 67269, 67270, 67271, 67272, 67273, 67274, 67275, 67276, 67277, 67278, 67279, 67280, 67281, 67282, 67283, 67284, 67285, 67286, 67287, 67288, 67289, 67290, 67291, 67292, 67293, 67294, 67295, 67296, 67297, 67298, 67299, 67300, 67301, 67302, 67303, 67304, 67305, 67306, 67307, 67308, 67309, 67310, 67311, 67312, 67313, 67314, 67315, 67316, 67317, 67318, 67319, 67320, 67321, 67322, 67323, 67324, 67325, 67326, 67327, 67328, 67329, 67330, 67331, 67332, 67333, 67334, 67335, 67336, 67337, 67338, 67339, 67340, 67341, 67342, 67343, 67344, 67345, 67346, 67347, 67348, 67349, 67350, 67351, 67352, 67353, 67354, 67355, 67356, 67357, 67358, 67359, 67360, 67361, 67362, 67363, 67364, 67365, 67366, 67367, 67368, 67369, 67370, 67371, 67372, 67373, 67374, 67375, 67376, 67377, 67378, 67379, 67380, 67381, 67382, 67392, 67393, 67394, 67395, 67396, 67397, 67398, 67399, 67400, 67401, 67402, 67403, 67404, 67405, 67406, 67407, 67408, 67409, 67410, 67411, 67412, 67413, 67424, 67425, 67426, 67427, 67428, 67429, 67430, 67431, 67584, 67585, 67586, 67587, 67588, 67589, 67592, 67594, 67595, 67596, 67597, 67598, 67599, 67600, 67601, 67602, 67603, 67604, 67605, 67606, 67607, 67608, 67609, 67610, 67611, 67612, 67613, 67614, 67615, 67616, 67617, 67618, 67619, 67620, 67621, 67622, 67623, 67624, 67625, 67626, 67627, 67628, 67629, 67630, 67631, 67632, 67633, 67634, 67635, 67636, 67637, 67639, 67640, 67644, 67647, 67648, 67649, 67650, 67651, 67652, 67653, 67654, 67655, 67656, 67657, 67658, 67659, 67660, 67661, 67662, 67663, 67664, 67665, 67666, 67667, 67668, 67669, 67680, 67681, 67682, 67683, 67684, 67685, 67686, 67687, 67688, 67689, 67690, 67691, 67692, 67693, 67694, 67695, 67696, 67697, 67698, 67699, 67700, 67701, 67702, 67712, 67713, 67714, 67715, 67716, 67717, 67718, 67719, 67720, 67721, 67722, 67723, 67724, 67725, 67726, 67727, 67728, 67729, 67730, 67731, 67732, 67733, 67734, 67735, 67736, 67737, 67738, 67739, 67740, 67741, 67742, 67808, 67809, 67810, 67811, 67812, 67813, 67814, 67815, 67816, 67817, 67818, 67819, 67820, 67821, 67822, 67823, 67824, 67825, 67826, 67828, 67829, 67840, 67841, 67842, 67843, 67844, 67845, 67846, 67847, 67848, 67849, 67850, 67851, 67852, 67853, 67854, 67855, 67856, 67857, 67858, 67859, 67860, 67861, 67872, 67873, 67874, 67875, 67876, 67877, 67878, 67879, 67880, 67881, 67882, 67883, 67884, 67885, 67886, 67887, 67888, 67889, 67890, 67891, 67892, 67893, 67894, 67895, 67896, 67897, 67968, 67969, 67970, 67971, 67972, 67973, 67974, 67975, 67976, 67977, 67978, 67979, 67980, 67981, 67982, 67983, 67984, 67985, 67986, 67987, 67988, 67989, 67990, 67991, 67992, 67993, 67994, 67995, 67996, 67997, 67998, 67999, 68e3, 68001, 68002, 68003, 68004, 68005, 68006, 68007, 68008, 68009, 68010, 68011, 68012, 68013, 68014, 68015, 68016, 68017, 68018, 68019, 68020, 68021, 68022, 68023, 68030, 68031, 68096, 68112, 68113, 68114, 68115, 68117, 68118, 68119, 68121, 68122, 68123, 68124, 68125, 68126, 68127, 68128, 68129, 68130, 68131, 68132, 68133, 68134, 68135, 68136, 68137, 68138, 68139, 68140, 68141, 68142, 68143, 68144, 68145, 68146, 68147, 68192, 68193, 68194, 68195, 68196, 68197, 68198, 68199, 68200, 68201, 68202, 68203, 68204, 68205, 68206, 68207, 68208, 68209, 68210, 68211, 68212, 68213, 68214, 68215, 68216, 68217, 68218, 68219, 68220, 68224, 68225, 68226, 68227, 68228, 68229, 68230, 68231, 68232, 68233, 68234, 68235, 68236, 68237, 68238, 68239, 68240, 68241, 68242, 68243, 68244, 68245, 68246, 68247, 68248, 68249, 68250, 68251, 68252, 68288, 68289, 68290, 68291, 68292, 68293, 68294, 68295, 68297, 68298, 68299, 68300, 68301, 68302, 68303, 68304, 68305, 68306, 68307, 68308, 68309, 68310, 68311, 68312, 68313, 68314, 68315, 68316, 68317, 68318, 68319, 68320, 68321, 68322, 68323, 68324, 68352, 68353, 68354, 68355, 68356, 68357, 68358, 68359, 68360, 68361, 68362, 68363, 68364, 68365, 68366, 68367, 68368, 68369, 68370, 68371, 68372, 68373, 68374, 68375, 68376, 68377, 68378, 68379, 68380, 68381, 68382, 68383, 68384, 68385, 68386, 68387, 68388, 68389, 68390, 68391, 68392, 68393, 68394, 68395, 68396, 68397, 68398, 68399, 68400, 68401, 68402, 68403, 68404, 68405, 68416, 68417, 68418, 68419, 68420, 68421, 68422, 68423, 68424, 68425, 68426, 68427, 68428, 68429, 68430, 68431, 68432, 68433, 68434, 68435, 68436, 68437, 68448, 68449, 68450, 68451, 68452, 68453, 68454, 68455, 68456, 68457, 68458, 68459, 68460, 68461, 68462, 68463, 68464, 68465, 68466, 68480, 68481, 68482, 68483, 68484, 68485, 68486, 68487, 68488, 68489, 68490, 68491, 68492, 68493, 68494, 68495, 68496, 68497, 68608, 68609, 68610, 68611, 68612, 68613, 68614, 68615, 68616, 68617, 68618, 68619, 68620, 68621, 68622, 68623, 68624, 68625, 68626, 68627, 68628, 68629, 68630, 68631, 68632, 68633, 68634, 68635, 68636, 68637, 68638, 68639, 68640, 68641, 68642, 68643, 68644, 68645, 68646, 68647, 68648, 68649, 68650, 68651, 68652, 68653, 68654, 68655, 68656, 68657, 68658, 68659, 68660, 68661, 68662, 68663, 68664, 68665, 68666, 68667, 68668, 68669, 68670, 68671, 68672, 68673, 68674, 68675, 68676, 68677, 68678, 68679, 68680, 69635, 69636, 69637, 69638, 69639, 69640, 69641, 69642, 69643, 69644, 69645, 69646, 69647, 69648, 69649, 69650, 69651, 69652, 69653, 69654, 69655, 69656, 69657, 69658, 69659, 69660, 69661, 69662, 69663, 69664, 69665, 69666, 69667, 69668, 69669, 69670, 69671, 69672, 69673, 69674, 69675, 69676, 69677, 69678, 69679, 69680, 69681, 69682, 69683, 69684, 69685, 69686, 69687, 69763, 69764, 69765, 69766, 69767, 69768, 69769, 69770, 69771, 69772, 69773, 69774, 69775, 69776, 69777, 69778, 69779, 69780, 69781, 69782, 69783, 69784, 69785, 69786, 69787, 69788, 69789, 69790, 69791, 69792, 69793, 69794, 69795, 69796, 69797, 69798, 69799, 69800, 69801, 69802, 69803, 69804, 69805, 69806, 69807, 69840, 69841, 69842, 69843, 69844, 69845, 69846, 69847, 69848, 69849, 69850, 69851, 69852, 69853, 69854, 69855, 69856, 69857, 69858, 69859, 69860, 69861, 69862, 69863, 69864, 69891, 69892, 69893, 69894, 69895, 69896, 69897, 69898, 69899, 69900, 69901, 69902, 69903, 69904, 69905, 69906, 69907, 69908, 69909, 69910, 69911, 69912, 69913, 69914, 69915, 69916, 69917, 69918, 69919, 69920, 69921, 69922, 69923, 69924, 69925, 69926, 69968, 69969, 69970, 69971, 69972, 69973, 69974, 69975, 69976, 69977, 69978, 69979, 69980, 69981, 69982, 69983, 69984, 69985, 69986, 69987, 69988, 69989, 69990, 69991, 69992, 69993, 69994, 69995, 69996, 69997, 69998, 69999, 7e4, 70001, 70002, 70006, 70019, 70020, 70021, 70022, 70023, 70024, 70025, 70026, 70027, 70028, 70029, 70030, 70031, 70032, 70033, 70034, 70035, 70036, 70037, 70038, 70039, 70040, 70041, 70042, 70043, 70044, 70045, 70046, 70047, 70048, 70049, 70050, 70051, 70052, 70053, 70054, 70055, 70056, 70057, 70058, 70059, 70060, 70061, 70062, 70063, 70064, 70065, 70066, 70081, 70082, 70083, 70084, 70106, 70108, 70144, 70145, 70146, 70147, 70148, 70149, 70150, 70151, 70152, 70153, 70154, 70155, 70156, 70157, 70158, 70159, 70160, 70161, 70163, 70164, 70165, 70166, 70167, 70168, 70169, 70170, 70171, 70172, 70173, 70174, 70175, 70176, 70177, 70178, 70179, 70180, 70181, 70182, 70183, 70184, 70185, 70186, 70187, 70272, 70273, 70274, 70275, 70276, 70277, 70278, 70280, 70282, 70283, 70284, 70285, 70287, 70288, 70289, 70290, 70291, 70292, 70293, 70294, 70295, 70296, 70297, 70298, 70299, 70300, 70301, 70303, 70304, 70305, 70306, 70307, 70308, 70309, 70310, 70311, 70312, 70320, 70321, 70322, 70323, 70324, 70325, 70326, 70327, 70328, 70329, 70330, 70331, 70332, 70333, 70334, 70335, 70336, 70337, 70338, 70339, 70340, 70341, 70342, 70343, 70344, 70345, 70346, 70347, 70348, 70349, 70350, 70351, 70352, 70353, 70354, 70355, 70356, 70357, 70358, 70359, 70360, 70361, 70362, 70363, 70364, 70365, 70366, 70405, 70406, 70407, 70408, 70409, 70410, 70411, 70412, 70415, 70416, 70419, 70420, 70421, 70422, 70423, 70424, 70425, 70426, 70427, 70428, 70429, 70430, 70431, 70432, 70433, 70434, 70435, 70436, 70437, 70438, 70439, 70440, 70442, 70443, 70444, 70445, 70446, 70447, 70448, 70450, 70451, 70453, 70454, 70455, 70456, 70457, 70461, 70480, 70493, 70494, 70495, 70496, 70497, 70656, 70657, 70658, 70659, 70660, 70661, 70662, 70663, 70664, 70665, 70666, 70667, 70668, 70669, 70670, 70671, 70672, 70673, 70674, 70675, 70676, 70677, 70678, 70679, 70680, 70681, 70682, 70683, 70684, 70685, 70686, 70687, 70688, 70689, 70690, 70691, 70692, 70693, 70694, 70695, 70696, 70697, 70698, 70699, 70700, 70701, 70702, 70703, 70704, 70705, 70706, 70707, 70708, 70727, 70728, 70729, 70730, 70784, 70785, 70786, 70787, 70788, 70789, 70790, 70791, 70792, 70793, 70794, 70795, 70796, 70797, 70798, 70799, 70800, 70801, 70802, 70803, 70804, 70805, 70806, 70807, 70808, 70809, 70810, 70811, 70812, 70813, 70814, 70815, 70816, 70817, 70818, 70819, 70820, 70821, 70822, 70823, 70824, 70825, 70826, 70827, 70828, 70829, 70830, 70831, 70852, 70853, 70855, 71040, 71041, 71042, 71043, 71044, 71045, 71046, 71047, 71048, 71049, 71050, 71051, 71052, 71053, 71054, 71055, 71056, 71057, 71058, 71059, 71060, 71061, 71062, 71063, 71064, 71065, 71066, 71067, 71068, 71069, 71070, 71071, 71072, 71073, 71074, 71075, 71076, 71077, 71078, 71079, 71080, 71081, 71082, 71083, 71084, 71085, 71086, 71128, 71129, 71130, 71131, 71168, 71169, 71170, 71171, 71172, 71173, 71174, 71175, 71176, 71177, 71178, 71179, 71180, 71181, 71182, 71183, 71184, 71185, 71186, 71187, 71188, 71189, 71190, 71191, 71192, 71193, 71194, 71195, 71196, 71197, 71198, 71199, 71200, 71201, 71202, 71203, 71204, 71205, 71206, 71207, 71208, 71209, 71210, 71211, 71212, 71213, 71214, 71215, 71236, 71296, 71297, 71298, 71299, 71300, 71301, 71302, 71303, 71304, 71305, 71306, 71307, 71308, 71309, 71310, 71311, 71312, 71313, 71314, 71315, 71316, 71317, 71318, 71319, 71320, 71321, 71322, 71323, 71324, 71325, 71326, 71327, 71328, 71329, 71330, 71331, 71332, 71333, 71334, 71335, 71336, 71337, 71338, 71424, 71425, 71426, 71427, 71428, 71429, 71430, 71431, 71432, 71433, 71434, 71435, 71436, 71437, 71438, 71439, 71440, 71441, 71442, 71443, 71444, 71445, 71446, 71447, 71448, 71449, 71935, 72192, 72203, 72204, 72205, 72206, 72207, 72208, 72209, 72210, 72211, 72212, 72213, 72214, 72215, 72216, 72217, 72218, 72219, 72220, 72221, 72222, 72223, 72224, 72225, 72226, 72227, 72228, 72229, 72230, 72231, 72232, 72233, 72234, 72235, 72236, 72237, 72238, 72239, 72240, 72241, 72242, 72250, 72272, 72284, 72285, 72286, 72287, 72288, 72289, 72290, 72291, 72292, 72293, 72294, 72295, 72296, 72297, 72298, 72299, 72300, 72301, 72302, 72303, 72304, 72305, 72306, 72307, 72308, 72309, 72310, 72311, 72312, 72313, 72314, 72315, 72316, 72317, 72318, 72319, 72320, 72321, 72322, 72323, 72326, 72327, 72328, 72329, 72384, 72385, 72386, 72387, 72388, 72389, 72390, 72391, 72392, 72393, 72394, 72395, 72396, 72397, 72398, 72399, 72400, 72401, 72402, 72403, 72404, 72405, 72406, 72407, 72408, 72409, 72410, 72411, 72412, 72413, 72414, 72415, 72416, 72417, 72418, 72419, 72420, 72421, 72422, 72423, 72424, 72425, 72426, 72427, 72428, 72429, 72430, 72431, 72432, 72433, 72434, 72435, 72436, 72437, 72438, 72439, 72440, 72704, 72705, 72706, 72707, 72708, 72709, 72710, 72711, 72712, 72714, 72715, 72716, 72717, 72718, 72719, 72720, 72721, 72722, 72723, 72724, 72725, 72726, 72727, 72728, 72729, 72730, 72731, 72732, 72733, 72734, 72735, 72736, 72737, 72738, 72739, 72740, 72741, 72742, 72743, 72744, 72745, 72746, 72747, 72748, 72749, 72750, 72768, 72818, 72819, 72820, 72821, 72822, 72823, 72824, 72825, 72826, 72827, 72828, 72829, 72830, 72831, 72832, 72833, 72834, 72835, 72836, 72837, 72838, 72839, 72840, 72841, 72842, 72843, 72844, 72845, 72846, 72847, 72960, 72961, 72962, 72963, 72964, 72965, 72966, 72968, 72969, 72971, 72972, 72973, 72974, 72975, 72976, 72977, 72978, 72979, 72980, 72981, 72982, 72983, 72984, 72985, 72986, 72987, 72988, 72989, 72990, 72991, 72992, 72993, 72994, 72995, 72996, 72997, 72998, 72999, 73e3, 73001, 73002, 73003, 73004, 73005, 73006, 73007, 73008, 73030, 73728, 73729, 73730, 73731, 73732, 73733, 73734, 73735, 73736, 73737, 73738, 73739, 73740, 73741, 73742, 73743, 73744, 73745, 73746, 73747, 73748, 73749, 73750, 73751, 73752, 73753, 73754, 73755, 73756, 73757, 73758, 73759, 73760, 73761, 73762, 73763, 73764, 73765, 73766, 73767, 73768, 73769, 73770, 73771, 73772, 73773, 73774, 73775, 73776, 73777, 73778, 73779, 73780, 73781, 73782, 73783, 73784, 73785, 73786, 73787, 73788, 73789, 73790, 73791, 73792, 73793, 73794, 73795, 73796, 73797, 73798, 73799, 73800, 73801, 73802, 73803, 73804, 73805, 73806, 73807, 73808, 73809, 73810, 73811, 73812, 73813, 73814, 73815, 73816, 73817, 73818, 73819, 73820, 73821, 73822, 73823, 73824, 73825, 73826, 73827, 73828, 73829, 73830, 73831, 73832, 73833, 73834, 73835, 73836, 73837, 73838, 73839, 73840, 73841, 73842, 73843, 73844, 73845, 73846, 73847, 73848, 73849, 73850, 73851, 73852, 73853, 73854, 73855, 73856, 73857, 73858, 73859, 73860, 73861, 73862, 73863, 73864, 73865, 73866, 73867, 73868, 73869, 73870, 73871, 73872, 73873, 73874, 73875, 73876, 73877, 73878, 73879, 73880, 73881, 73882, 73883, 73884, 73885, 73886, 73887, 73888, 73889, 73890, 73891, 73892, 73893, 73894, 73895, 73896, 73897, 73898, 73899, 73900, 73901, 73902, 73903, 73904, 73905, 73906, 73907, 73908, 73909, 73910, 73911, 73912, 73913, 73914, 73915, 73916, 73917, 73918, 73919, 73920, 73921, 73922, 73923, 73924, 73925, 73926, 73927, 73928, 73929, 73930, 73931, 73932, 73933, 73934, 73935, 73936, 73937, 73938, 73939, 73940, 73941, 73942, 73943, 73944, 73945, 73946, 73947, 73948, 73949, 73950, 73951, 73952, 73953, 73954, 73955, 73956, 73957, 73958, 73959, 73960, 73961, 73962, 73963, 73964, 73965, 73966, 73967, 73968, 73969, 73970, 73971, 73972, 73973, 73974, 73975, 73976, 73977, 73978, 73979, 73980, 73981, 73982, 73983, 73984, 73985, 73986, 73987, 73988, 73989, 73990, 73991, 73992, 73993, 73994, 73995, 73996, 73997, 73998, 73999, 74e3, 74001, 74002, 74003, 74004, 74005, 74006, 74007, 74008, 74009, 74010, 74011, 74012, 74013, 74014, 74015, 74016, 74017, 74018, 74019, 74020, 74021, 74022, 74023, 74024, 74025, 74026, 74027, 74028, 74029, 74030, 74031, 74032, 74033, 74034, 74035, 74036, 74037, 74038, 74039, 74040, 74041, 74042, 74043, 74044, 74045, 74046, 74047, 74048, 74049, 74050, 74051, 74052, 74053, 74054, 74055, 74056, 74057, 74058, 74059, 74060, 74061, 74062, 74063, 74064, 74065, 74066, 74067, 74068, 74069, 74070, 74071, 74072, 74073, 74074, 74075, 74076, 74077, 74078, 74079, 74080, 74081, 74082, 74083, 74084, 74085, 74086, 74087, 74088, 74089, 74090, 74091, 74092, 74093, 74094, 74095, 74096, 74097, 74098, 74099, 74100, 74101, 74102, 74103, 74104, 74105, 74106, 74107, 74108, 74109, 74110, 74111, 74112, 74113, 74114, 74115, 74116, 74117, 74118, 74119, 74120, 74121, 74122, 74123, 74124, 74125, 74126, 74127, 74128, 74129, 74130, 74131, 74132, 74133, 74134, 74135, 74136, 74137, 74138, 74139, 74140, 74141, 74142, 74143, 74144, 74145, 74146, 74147, 74148, 74149, 74150, 74151, 74152, 74153, 74154, 74155, 74156, 74157, 74158, 74159, 74160, 74161, 74162, 74163, 74164, 74165, 74166, 74167, 74168, 74169, 74170, 74171, 74172, 74173, 74174, 74175, 74176, 74177, 74178, 74179, 74180, 74181, 74182, 74183, 74184, 74185, 74186, 74187, 74188, 74189, 74190, 74191, 74192, 74193, 74194, 74195, 74196, 74197, 74198, 74199, 74200, 74201, 74202, 74203, 74204, 74205, 74206, 74207, 74208, 74209, 74210, 74211, 74212, 74213, 74214, 74215, 74216, 74217, 74218, 74219, 74220, 74221, 74222, 74223, 74224, 74225, 74226, 74227, 74228, 74229, 74230, 74231, 74232, 74233, 74234, 74235, 74236, 74237, 74238, 74239, 74240, 74241, 74242, 74243, 74244, 74245, 74246, 74247, 74248, 74249, 74250, 74251, 74252, 74253, 74254, 74255, 74256, 74257, 74258, 74259, 74260, 74261, 74262, 74263, 74264, 74265, 74266, 74267, 74268, 74269, 74270, 74271, 74272, 74273, 74274, 74275, 74276, 74277, 74278, 74279, 74280, 74281, 74282, 74283, 74284, 74285, 74286, 74287, 74288, 74289, 74290, 74291, 74292, 74293, 74294, 74295, 74296, 74297, 74298, 74299, 74300, 74301, 74302, 74303, 74304, 74305, 74306, 74307, 74308, 74309, 74310, 74311, 74312, 74313, 74314, 74315, 74316, 74317, 74318, 74319, 74320, 74321, 74322, 74323, 74324, 74325, 74326, 74327, 74328, 74329, 74330, 74331, 74332, 74333, 74334, 74335, 74336, 74337, 74338, 74339, 74340, 74341, 74342, 74343, 74344, 74345, 74346, 74347, 74348, 74349, 74350, 74351, 74352, 74353, 74354, 74355, 74356, 74357, 74358, 74359, 74360, 74361, 74362, 74363, 74364, 74365, 74366, 74367, 74368, 74369, 74370, 74371, 74372, 74373, 74374, 74375, 74376, 74377, 74378, 74379, 74380, 74381, 74382, 74383, 74384, 74385, 74386, 74387, 74388, 74389, 74390, 74391, 74392, 74393, 74394, 74395, 74396, 74397, 74398, 74399, 74400, 74401, 74402, 74403, 74404, 74405, 74406, 74407, 74408, 74409, 74410, 74411, 74412, 74413, 74414, 74415, 74416, 74417, 74418, 74419, 74420, 74421, 74422, 74423, 74424, 74425, 74426, 74427, 74428, 74429, 74430, 74431, 74432, 74433, 74434, 74435, 74436, 74437, 74438, 74439, 74440, 74441, 74442, 74443, 74444, 74445, 74446, 74447, 74448, 74449, 74450, 74451, 74452, 74453, 74454, 74455, 74456, 74457, 74458, 74459, 74460, 74461, 74462, 74463, 74464, 74465, 74466, 74467, 74468, 74469, 74470, 74471, 74472, 74473, 74474, 74475, 74476, 74477, 74478, 74479, 74480, 74481, 74482, 74483, 74484, 74485, 74486, 74487, 74488, 74489, 74490, 74491, 74492, 74493, 74494, 74495, 74496, 74497, 74498, 74499, 74500, 74501, 74502, 74503, 74504, 74505, 74506, 74507, 74508, 74509, 74510, 74511, 74512, 74513, 74514, 74515, 74516, 74517, 74518, 74519, 74520, 74521, 74522, 74523, 74524, 74525, 74526, 74527, 74528, 74529, 74530, 74531, 74532, 74533, 74534, 74535, 74536, 74537, 74538, 74539, 74540, 74541, 74542, 74543, 74544, 74545, 74546, 74547, 74548, 74549, 74550, 74551, 74552, 74553, 74554, 74555, 74556, 74557, 74558, 74559, 74560, 74561, 74562, 74563, 74564, 74565, 74566, 74567, 74568, 74569, 74570, 74571, 74572, 74573, 74574, 74575, 74576, 74577, 74578, 74579, 74580, 74581, 74582, 74583, 74584, 74585, 74586, 74587, 74588, 74589, 74590, 74591, 74592, 74593, 74594, 74595, 74596, 74597, 74598, 74599, 74600, 74601, 74602, 74603, 74604, 74605, 74606, 74607, 74608, 74609, 74610, 74611, 74612, 74613, 74614, 74615, 74616, 74617, 74618, 74619, 74620, 74621, 74622, 74623, 74624, 74625, 74626, 74627, 74628, 74629, 74630, 74631, 74632, 74633, 74634, 74635, 74636, 74637, 74638, 74639, 74640, 74641, 74642, 74643, 74644, 74645, 74646, 74647, 74648, 74649, 74880, 74881, 74882, 74883, 74884, 74885, 74886, 74887, 74888, 74889, 74890, 74891, 74892, 74893, 74894, 74895, 74896, 74897, 74898, 74899, 74900, 74901, 74902, 74903, 74904, 74905, 74906, 74907, 74908, 74909, 74910, 74911, 74912, 74913, 74914, 74915, 74916, 74917, 74918, 74919, 74920, 74921, 74922, 74923, 74924, 74925, 74926, 74927, 74928, 74929, 74930, 74931, 74932, 74933, 74934, 74935, 74936, 74937, 74938, 74939, 74940, 74941, 74942, 74943, 74944, 74945, 74946, 74947, 74948, 74949, 74950, 74951, 74952, 74953, 74954, 74955, 74956, 74957, 74958, 74959, 74960, 74961, 74962, 74963, 74964, 74965, 74966, 74967, 74968, 74969, 74970, 74971, 74972, 74973, 74974, 74975, 74976, 74977, 74978, 74979, 74980, 74981, 74982, 74983, 74984, 74985, 74986, 74987, 74988, 74989, 74990, 74991, 74992, 74993, 74994, 74995, 74996, 74997, 74998, 74999, 75e3, 75001, 75002, 75003, 75004, 75005, 75006, 75007, 75008, 75009, 75010, 75011, 75012, 75013, 75014, 75015, 75016, 75017, 75018, 75019, 75020, 75021, 75022, 75023, 75024, 75025, 75026, 75027, 75028, 75029, 75030, 75031, 75032, 75033, 75034, 75035, 75036, 75037, 75038, 75039, 75040, 75041, 75042, 75043, 75044, 75045, 75046, 75047, 75048, 75049, 75050, 75051, 75052, 75053, 75054, 75055, 75056, 75057, 75058, 75059, 75060, 75061, 75062, 75063, 75064, 75065, 75066, 75067, 75068, 75069, 75070, 75071, 75072, 75073, 75074, 75075, 77824, 77825, 77826, 77827, 77828, 77829, 77830, 77831, 77832, 77833, 77834, 77835, 77836, 77837, 77838, 77839, 77840, 77841, 77842, 77843, 77844, 77845, 77846, 77847, 77848, 77849, 77850, 77851, 77852, 77853, 77854, 77855, 77856, 77857, 77858, 77859, 77860, 77861, 77862, 77863, 77864, 77865, 77866, 77867, 77868, 77869, 77870, 77871, 77872, 77873, 77874, 77875, 77876, 77877, 77878, 77879, 77880, 77881, 77882, 77883, 77884, 77885, 77886, 77887, 77888, 77889, 77890, 77891, 77892, 77893, 77894, 77895, 77896, 77897, 77898, 77899, 77900, 77901, 77902, 77903, 77904, 77905, 77906, 77907, 77908, 77909, 77910, 77911, 77912, 77913, 77914, 77915, 77916, 77917, 77918, 77919, 77920, 77921, 77922, 77923, 77924, 77925, 77926, 77927, 77928, 77929, 77930, 77931, 77932, 77933, 77934, 77935, 77936, 77937, 77938, 77939, 77940, 77941, 77942, 77943, 77944, 77945, 77946, 77947, 77948, 77949, 77950, 77951, 77952, 77953, 77954, 77955, 77956, 77957, 77958, 77959, 77960, 77961, 77962, 77963, 77964, 77965, 77966, 77967, 77968, 77969, 77970, 77971, 77972, 77973, 77974, 77975, 77976, 77977, 77978, 77979, 77980, 77981, 77982, 77983, 77984, 77985, 77986, 77987, 77988, 77989, 77990, 77991, 77992, 77993, 77994, 77995, 77996, 77997, 77998, 77999, 78e3, 78001, 78002, 78003, 78004, 78005, 78006, 78007, 78008, 78009, 78010, 78011, 78012, 78013, 78014, 78015, 78016, 78017, 78018, 78019, 78020, 78021, 78022, 78023, 78024, 78025, 78026, 78027, 78028, 78029, 78030, 78031, 78032, 78033, 78034, 78035, 78036, 78037, 78038, 78039, 78040, 78041, 78042, 78043, 78044, 78045, 78046, 78047, 78048, 78049, 78050, 78051, 78052, 78053, 78054, 78055, 78056, 78057, 78058, 78059, 78060, 78061, 78062, 78063, 78064, 78065, 78066, 78067, 78068, 78069, 78070, 78071, 78072, 78073, 78074, 78075, 78076, 78077, 78078, 78079, 78080, 78081, 78082, 78083, 78084, 78085, 78086, 78087, 78088, 78089, 78090, 78091, 78092, 78093, 78094, 78095, 78096, 78097, 78098, 78099, 78100, 78101, 78102, 78103, 78104, 78105, 78106, 78107, 78108, 78109, 78110, 78111, 78112, 78113, 78114, 78115, 78116, 78117, 78118, 78119, 78120, 78121, 78122, 78123, 78124, 78125, 78126, 78127, 78128, 78129, 78130, 78131, 78132, 78133, 78134, 78135, 78136, 78137, 78138, 78139, 78140, 78141, 78142, 78143, 78144, 78145, 78146, 78147, 78148, 78149, 78150, 78151, 78152, 78153, 78154, 78155, 78156, 78157, 78158, 78159, 78160, 78161, 78162, 78163, 78164, 78165, 78166, 78167, 78168, 78169, 78170, 78171, 78172, 78173, 78174, 78175, 78176, 78177, 78178, 78179, 78180, 78181, 78182, 78183, 78184, 78185, 78186, 78187, 78188, 78189, 78190, 78191, 78192, 78193, 78194, 78195, 78196, 78197, 78198, 78199, 78200, 78201, 78202, 78203, 78204, 78205, 78206, 78207, 78208, 78209, 78210, 78211, 78212, 78213, 78214, 78215, 78216, 78217, 78218, 78219, 78220, 78221, 78222, 78223, 78224, 78225, 78226, 78227, 78228, 78229, 78230, 78231, 78232, 78233, 78234, 78235, 78236, 78237, 78238, 78239, 78240, 78241, 78242, 78243, 78244, 78245, 78246, 78247, 78248, 78249, 78250, 78251, 78252, 78253, 78254, 78255, 78256, 78257, 78258, 78259, 78260, 78261, 78262, 78263, 78264, 78265, 78266, 78267, 78268, 78269, 78270, 78271, 78272, 78273, 78274, 78275, 78276, 78277, 78278, 78279, 78280, 78281, 78282, 78283, 78284, 78285, 78286, 78287, 78288, 78289, 78290, 78291, 78292, 78293, 78294, 78295, 78296, 78297, 78298, 78299, 78300, 78301, 78302, 78303, 78304, 78305, 78306, 78307, 78308, 78309, 78310, 78311, 78312, 78313, 78314, 78315, 78316, 78317, 78318, 78319, 78320, 78321, 78322, 78323, 78324, 78325, 78326, 78327, 78328, 78329, 78330, 78331, 78332, 78333, 78334, 78335, 78336, 78337, 78338, 78339, 78340, 78341, 78342, 78343, 78344, 78345, 78346, 78347, 78348, 78349, 78350, 78351, 78352, 78353, 78354, 78355, 78356, 78357, 78358, 78359, 78360, 78361, 78362, 78363, 78364, 78365, 78366, 78367, 78368, 78369, 78370, 78371, 78372, 78373, 78374, 78375, 78376, 78377, 78378, 78379, 78380, 78381, 78382, 78383, 78384, 78385, 78386, 78387, 78388, 78389, 78390, 78391, 78392, 78393, 78394, 78395, 78396, 78397, 78398, 78399, 78400, 78401, 78402, 78403, 78404, 78405, 78406, 78407, 78408, 78409, 78410, 78411, 78412, 78413, 78414, 78415, 78416, 78417, 78418, 78419, 78420, 78421, 78422, 78423, 78424, 78425, 78426, 78427, 78428, 78429, 78430, 78431, 78432, 78433, 78434, 78435, 78436, 78437, 78438, 78439, 78440, 78441, 78442, 78443, 78444, 78445, 78446, 78447, 78448, 78449, 78450, 78451, 78452, 78453, 78454, 78455, 78456, 78457, 78458, 78459, 78460, 78461, 78462, 78463, 78464, 78465, 78466, 78467, 78468, 78469, 78470, 78471, 78472, 78473, 78474, 78475, 78476, 78477, 78478, 78479, 78480, 78481, 78482, 78483, 78484, 78485, 78486, 78487, 78488, 78489, 78490, 78491, 78492, 78493, 78494, 78495, 78496, 78497, 78498, 78499, 78500, 78501, 78502, 78503, 78504, 78505, 78506, 78507, 78508, 78509, 78510, 78511, 78512, 78513, 78514, 78515, 78516, 78517, 78518, 78519, 78520, 78521, 78522, 78523, 78524, 78525, 78526, 78527, 78528, 78529, 78530, 78531, 78532, 78533, 78534, 78535, 78536, 78537, 78538, 78539, 78540, 78541, 78542, 78543, 78544, 78545, 78546, 78547, 78548, 78549, 78550, 78551, 78552, 78553, 78554, 78555, 78556, 78557, 78558, 78559, 78560, 78561, 78562, 78563, 78564, 78565, 78566, 78567, 78568, 78569, 78570, 78571, 78572, 78573, 78574, 78575, 78576, 78577, 78578, 78579, 78580, 78581, 78582, 78583, 78584, 78585, 78586, 78587, 78588, 78589, 78590, 78591, 78592, 78593, 78594, 78595, 78596, 78597, 78598, 78599, 78600, 78601, 78602, 78603, 78604, 78605, 78606, 78607, 78608, 78609, 78610, 78611, 78612, 78613, 78614, 78615, 78616, 78617, 78618, 78619, 78620, 78621, 78622, 78623, 78624, 78625, 78626, 78627, 78628, 78629, 78630, 78631, 78632, 78633, 78634, 78635, 78636, 78637, 78638, 78639, 78640, 78641, 78642, 78643, 78644, 78645, 78646, 78647, 78648, 78649, 78650, 78651, 78652, 78653, 78654, 78655, 78656, 78657, 78658, 78659, 78660, 78661, 78662, 78663, 78664, 78665, 78666, 78667, 78668, 78669, 78670, 78671, 78672, 78673, 78674, 78675, 78676, 78677, 78678, 78679, 78680, 78681, 78682, 78683, 78684, 78685, 78686, 78687, 78688, 78689, 78690, 78691, 78692, 78693, 78694, 78695, 78696, 78697, 78698, 78699, 78700, 78701, 78702, 78703, 78704, 78705, 78706, 78707, 78708, 78709, 78710, 78711, 78712, 78713, 78714, 78715, 78716, 78717, 78718, 78719, 78720, 78721, 78722, 78723, 78724, 78725, 78726, 78727, 78728, 78729, 78730, 78731, 78732, 78733, 78734, 78735, 78736, 78737, 78738, 78739, 78740, 78741, 78742, 78743, 78744, 78745, 78746, 78747, 78748, 78749, 78750, 78751, 78752, 78753, 78754, 78755, 78756, 78757, 78758, 78759, 78760, 78761, 78762, 78763, 78764, 78765, 78766, 78767, 78768, 78769, 78770, 78771, 78772, 78773, 78774, 78775, 78776, 78777, 78778, 78779, 78780, 78781, 78782, 78783, 78784, 78785, 78786, 78787, 78788, 78789, 78790, 78791, 78792, 78793, 78794, 78795, 78796, 78797, 78798, 78799, 78800, 78801, 78802, 78803, 78804, 78805, 78806, 78807, 78808, 78809, 78810, 78811, 78812, 78813, 78814, 78815, 78816, 78817, 78818, 78819, 78820, 78821, 78822, 78823, 78824, 78825, 78826, 78827, 78828, 78829, 78830, 78831, 78832, 78833, 78834, 78835, 78836, 78837, 78838, 78839, 78840, 78841, 78842, 78843, 78844, 78845, 78846, 78847, 78848, 78849, 78850, 78851, 78852, 78853, 78854, 78855, 78856, 78857, 78858, 78859, 78860, 78861, 78862, 78863, 78864, 78865, 78866, 78867, 78868, 78869, 78870, 78871, 78872, 78873, 78874, 78875, 78876, 78877, 78878, 78879, 78880, 78881, 78882, 78883, 78884, 78885, 78886, 78887, 78888, 78889, 78890, 78891, 78892, 78893, 78894, 82944, 82945, 82946, 82947, 82948, 82949, 82950, 82951, 82952, 82953, 82954, 82955, 82956, 82957, 82958, 82959, 82960, 82961, 82962, 82963, 82964, 82965, 82966, 82967, 82968, 82969, 82970, 82971, 82972, 82973, 82974, 82975, 82976, 82977, 82978, 82979, 82980, 82981, 82982, 82983, 82984, 82985, 82986, 82987, 82988, 82989, 82990, 82991, 82992, 82993, 82994, 82995, 82996, 82997, 82998, 82999, 83e3, 83001, 83002, 83003, 83004, 83005, 83006, 83007, 83008, 83009, 83010, 83011, 83012, 83013, 83014, 83015, 83016, 83017, 83018, 83019, 83020, 83021, 83022, 83023, 83024, 83025, 83026, 83027, 83028, 83029, 83030, 83031, 83032, 83033, 83034, 83035, 83036, 83037, 83038, 83039, 83040, 83041, 83042, 83043, 83044, 83045, 83046, 83047, 83048, 83049, 83050, 83051, 83052, 83053, 83054, 83055, 83056, 83057, 83058, 83059, 83060, 83061, 83062, 83063, 83064, 83065, 83066, 83067, 83068, 83069, 83070, 83071, 83072, 83073, 83074, 83075, 83076, 83077, 83078, 83079, 83080, 83081, 83082, 83083, 83084, 83085, 83086, 83087, 83088, 83089, 83090, 83091, 83092, 83093, 83094, 83095, 83096, 83097, 83098, 83099, 83100, 83101, 83102, 83103, 83104, 83105, 83106, 83107, 83108, 83109, 83110, 83111, 83112, 83113, 83114, 83115, 83116, 83117, 83118, 83119, 83120, 83121, 83122, 83123, 83124, 83125, 83126, 83127, 83128, 83129, 83130, 83131, 83132, 83133, 83134, 83135, 83136, 83137, 83138, 83139, 83140, 83141, 83142, 83143, 83144, 83145, 83146, 83147, 83148, 83149, 83150, 83151, 83152, 83153, 83154, 83155, 83156, 83157, 83158, 83159, 83160, 83161, 83162, 83163, 83164, 83165, 83166, 83167, 83168, 83169, 83170, 83171, 83172, 83173, 83174, 83175, 83176, 83177, 83178, 83179, 83180, 83181, 83182, 83183, 83184, 83185, 83186, 83187, 83188, 83189, 83190, 83191, 83192, 83193, 83194, 83195, 83196, 83197, 83198, 83199, 83200, 83201, 83202, 83203, 83204, 83205, 83206, 83207, 83208, 83209, 83210, 83211, 83212, 83213, 83214, 83215, 83216, 83217, 83218, 83219, 83220, 83221, 83222, 83223, 83224, 83225, 83226, 83227, 83228, 83229, 83230, 83231, 83232, 83233, 83234, 83235, 83236, 83237, 83238, 83239, 83240, 83241, 83242, 83243, 83244, 83245, 83246, 83247, 83248, 83249, 83250, 83251, 83252, 83253, 83254, 83255, 83256, 83257, 83258, 83259, 83260, 83261, 83262, 83263, 83264, 83265, 83266, 83267, 83268, 83269, 83270, 83271, 83272, 83273, 83274, 83275, 83276, 83277, 83278, 83279, 83280, 83281, 83282, 83283, 83284, 83285, 83286, 83287, 83288, 83289, 83290, 83291, 83292, 83293, 83294, 83295, 83296, 83297, 83298, 83299, 83300, 83301, 83302, 83303, 83304, 83305, 83306, 83307, 83308, 83309, 83310, 83311, 83312, 83313, 83314, 83315, 83316, 83317, 83318, 83319, 83320, 83321, 83322, 83323, 83324, 83325, 83326, 83327, 83328, 83329, 83330, 83331, 83332, 83333, 83334, 83335, 83336, 83337, 83338, 83339, 83340, 83341, 83342, 83343, 83344, 83345, 83346, 83347, 83348, 83349, 83350, 83351, 83352, 83353, 83354, 83355, 83356, 83357, 83358, 83359, 83360, 83361, 83362, 83363, 83364, 83365, 83366, 83367, 83368, 83369, 83370, 83371, 83372, 83373, 83374, 83375, 83376, 83377, 83378, 83379, 83380, 83381, 83382, 83383, 83384, 83385, 83386, 83387, 83388, 83389, 83390, 83391, 83392, 83393, 83394, 83395, 83396, 83397, 83398, 83399, 83400, 83401, 83402, 83403, 83404, 83405, 83406, 83407, 83408, 83409, 83410, 83411, 83412, 83413, 83414, 83415, 83416, 83417, 83418, 83419, 83420, 83421, 83422, 83423, 83424, 83425, 83426, 83427, 83428, 83429, 83430, 83431, 83432, 83433, 83434, 83435, 83436, 83437, 83438, 83439, 83440, 83441, 83442, 83443, 83444, 83445, 83446, 83447, 83448, 83449, 83450, 83451, 83452, 83453, 83454, 83455, 83456, 83457, 83458, 83459, 83460, 83461, 83462, 83463, 83464, 83465, 83466, 83467, 83468, 83469, 83470, 83471, 83472, 83473, 83474, 83475, 83476, 83477, 83478, 83479, 83480, 83481, 83482, 83483, 83484, 83485, 83486, 83487, 83488, 83489, 83490, 83491, 83492, 83493, 83494, 83495, 83496, 83497, 83498, 83499, 83500, 83501, 83502, 83503, 83504, 83505, 83506, 83507, 83508, 83509, 83510, 83511, 83512, 83513, 83514, 83515, 83516, 83517, 83518, 83519, 83520, 83521, 83522, 83523, 83524, 83525, 83526, 92160, 92161, 92162, 92163, 92164, 92165, 92166, 92167, 92168, 92169, 92170, 92171, 92172, 92173, 92174, 92175, 92176, 92177, 92178, 92179, 92180, 92181, 92182, 92183, 92184, 92185, 92186, 92187, 92188, 92189, 92190, 92191, 92192, 92193, 92194, 92195, 92196, 92197, 92198, 92199, 92200, 92201, 92202, 92203, 92204, 92205, 92206, 92207, 92208, 92209, 92210, 92211, 92212, 92213, 92214, 92215, 92216, 92217, 92218, 92219, 92220, 92221, 92222, 92223, 92224, 92225, 92226, 92227, 92228, 92229, 92230, 92231, 92232, 92233, 92234, 92235, 92236, 92237, 92238, 92239, 92240, 92241, 92242, 92243, 92244, 92245, 92246, 92247, 92248, 92249, 92250, 92251, 92252, 92253, 92254, 92255, 92256, 92257, 92258, 92259, 92260, 92261, 92262, 92263, 92264, 92265, 92266, 92267, 92268, 92269, 92270, 92271, 92272, 92273, 92274, 92275, 92276, 92277, 92278, 92279, 92280, 92281, 92282, 92283, 92284, 92285, 92286, 92287, 92288, 92289, 92290, 92291, 92292, 92293, 92294, 92295, 92296, 92297, 92298, 92299, 92300, 92301, 92302, 92303, 92304, 92305, 92306, 92307, 92308, 92309, 92310, 92311, 92312, 92313, 92314, 92315, 92316, 92317, 92318, 92319, 92320, 92321, 92322, 92323, 92324, 92325, 92326, 92327, 92328, 92329, 92330, 92331, 92332, 92333, 92334, 92335, 92336, 92337, 92338, 92339, 92340, 92341, 92342, 92343, 92344, 92345, 92346, 92347, 92348, 92349, 92350, 92351, 92352, 92353, 92354, 92355, 92356, 92357, 92358, 92359, 92360, 92361, 92362, 92363, 92364, 92365, 92366, 92367, 92368, 92369, 92370, 92371, 92372, 92373, 92374, 92375, 92376, 92377, 92378, 92379, 92380, 92381, 92382, 92383, 92384, 92385, 92386, 92387, 92388, 92389, 92390, 92391, 92392, 92393, 92394, 92395, 92396, 92397, 92398, 92399, 92400, 92401, 92402, 92403, 92404, 92405, 92406, 92407, 92408, 92409, 92410, 92411, 92412, 92413, 92414, 92415, 92416, 92417, 92418, 92419, 92420, 92421, 92422, 92423, 92424, 92425, 92426, 92427, 92428, 92429, 92430, 92431, 92432, 92433, 92434, 92435, 92436, 92437, 92438, 92439, 92440, 92441, 92442, 92443, 92444, 92445, 92446, 92447, 92448, 92449, 92450, 92451, 92452, 92453, 92454, 92455, 92456, 92457, 92458, 92459, 92460, 92461, 92462, 92463, 92464, 92465, 92466, 92467, 92468, 92469, 92470, 92471, 92472, 92473, 92474, 92475, 92476, 92477, 92478, 92479, 92480, 92481, 92482, 92483, 92484, 92485, 92486, 92487, 92488, 92489, 92490, 92491, 92492, 92493, 92494, 92495, 92496, 92497, 92498, 92499, 92500, 92501, 92502, 92503, 92504, 92505, 92506, 92507, 92508, 92509, 92510, 92511, 92512, 92513, 92514, 92515, 92516, 92517, 92518, 92519, 92520, 92521, 92522, 92523, 92524, 92525, 92526, 92527, 92528, 92529, 92530, 92531, 92532, 92533, 92534, 92535, 92536, 92537, 92538, 92539, 92540, 92541, 92542, 92543, 92544, 92545, 92546, 92547, 92548, 92549, 92550, 92551, 92552, 92553, 92554, 92555, 92556, 92557, 92558, 92559, 92560, 92561, 92562, 92563, 92564, 92565, 92566, 92567, 92568, 92569, 92570, 92571, 92572, 92573, 92574, 92575, 92576, 92577, 92578, 92579, 92580, 92581, 92582, 92583, 92584, 92585, 92586, 92587, 92588, 92589, 92590, 92591, 92592, 92593, 92594, 92595, 92596, 92597, 92598, 92599, 92600, 92601, 92602, 92603, 92604, 92605, 92606, 92607, 92608, 92609, 92610, 92611, 92612, 92613, 92614, 92615, 92616, 92617, 92618, 92619, 92620, 92621, 92622, 92623, 92624, 92625, 92626, 92627, 92628, 92629, 92630, 92631, 92632, 92633, 92634, 92635, 92636, 92637, 92638, 92639, 92640, 92641, 92642, 92643, 92644, 92645, 92646, 92647, 92648, 92649, 92650, 92651, 92652, 92653, 92654, 92655, 92656, 92657, 92658, 92659, 92660, 92661, 92662, 92663, 92664, 92665, 92666, 92667, 92668, 92669, 92670, 92671, 92672, 92673, 92674, 92675, 92676, 92677, 92678, 92679, 92680, 92681, 92682, 92683, 92684, 92685, 92686, 92687, 92688, 92689, 92690, 92691, 92692, 92693, 92694, 92695, 92696, 92697, 92698, 92699, 92700, 92701, 92702, 92703, 92704, 92705, 92706, 92707, 92708, 92709, 92710, 92711, 92712, 92713, 92714, 92715, 92716, 92717, 92718, 92719, 92720, 92721, 92722, 92723, 92724, 92725, 92726, 92727, 92728, 92736, 92737, 92738, 92739, 92740, 92741, 92742, 92743, 92744, 92745, 92746, 92747, 92748, 92749, 92750, 92751, 92752, 92753, 92754, 92755, 92756, 92757, 92758, 92759, 92760, 92761, 92762, 92763, 92764, 92765, 92766, 92880, 92881, 92882, 92883, 92884, 92885, 92886, 92887, 92888, 92889, 92890, 92891, 92892, 92893, 92894, 92895, 92896, 92897, 92898, 92899, 92900, 92901, 92902, 92903, 92904, 92905, 92906, 92907, 92908, 92909, 92928, 92929, 92930, 92931, 92932, 92933, 92934, 92935, 92936, 92937, 92938, 92939, 92940, 92941, 92942, 92943, 92944, 92945, 92946, 92947, 92948, 92949, 92950, 92951, 92952, 92953, 92954, 92955, 92956, 92957, 92958, 92959, 92960, 92961, 92962, 92963, 92964, 92965, 92966, 92967, 92968, 92969, 92970, 92971, 92972, 92973, 92974, 92975, 93027, 93028, 93029, 93030, 93031, 93032, 93033, 93034, 93035, 93036, 93037, 93038, 93039, 93040, 93041, 93042, 93043, 93044, 93045, 93046, 93047, 93053, 93054, 93055, 93056, 93057, 93058, 93059, 93060, 93061, 93062, 93063, 93064, 93065, 93066, 93067, 93068, 93069, 93070, 93071, 93952, 93953, 93954, 93955, 93956, 93957, 93958, 93959, 93960, 93961, 93962, 93963, 93964, 93965, 93966, 93967, 93968, 93969, 93970, 93971, 93972, 93973, 93974, 93975, 93976, 93977, 93978, 93979, 93980, 93981, 93982, 93983, 93984, 93985, 93986, 93987, 93988, 93989, 93990, 93991, 93992, 93993, 93994, 93995, 93996, 93997, 93998, 93999, 94e3, 94001, 94002, 94003, 94004, 94005, 94006, 94007, 94008, 94009, 94010, 94011, 94012, 94013, 94014, 94015, 94016, 94017, 94018, 94019, 94020, 94032, 94208, 100332, 100352, 100353, 100354, 100355, 100356, 100357, 100358, 100359, 100360, 100361, 100362, 100363, 100364, 100365, 100366, 100367, 100368, 100369, 100370, 100371, 100372, 100373, 100374, 100375, 100376, 100377, 100378, 100379, 100380, 100381, 100382, 100383, 100384, 100385, 100386, 100387, 100388, 100389, 100390, 100391, 100392, 100393, 100394, 100395, 100396, 100397, 100398, 100399, 100400, 100401, 100402, 100403, 100404, 100405, 100406, 100407, 100408, 100409, 100410, 100411, 100412, 100413, 100414, 100415, 100416, 100417, 100418, 100419, 100420, 100421, 100422, 100423, 100424, 100425, 100426, 100427, 100428, 100429, 100430, 100431, 100432, 100433, 100434, 100435, 100436, 100437, 100438, 100439, 100440, 100441, 100442, 100443, 100444, 100445, 100446, 100447, 100448, 100449, 100450, 100451, 100452, 100453, 100454, 100455, 100456, 100457, 100458, 100459, 100460, 100461, 100462, 100463, 100464, 100465, 100466, 100467, 100468, 100469, 100470, 100471, 100472, 100473, 100474, 100475, 100476, 100477, 100478, 100479, 100480, 100481, 100482, 100483, 100484, 100485, 100486, 100487, 100488, 100489, 100490, 100491, 100492, 100493, 100494, 100495, 100496, 100497, 100498, 100499, 100500, 100501, 100502, 100503, 100504, 100505, 100506, 100507, 100508, 100509, 100510, 100511, 100512, 100513, 100514, 100515, 100516, 100517, 100518, 100519, 100520, 100521, 100522, 100523, 100524, 100525, 100526, 100527, 100528, 100529, 100530, 100531, 100532, 100533, 100534, 100535, 100536, 100537, 100538, 100539, 100540, 100541, 100542, 100543, 100544, 100545, 100546, 100547, 100548, 100549, 100550, 100551, 100552, 100553, 100554, 100555, 100556, 100557, 100558, 100559, 100560, 100561, 100562, 100563, 100564, 100565, 100566, 100567, 100568, 100569, 100570, 100571, 100572, 100573, 100574, 100575, 100576, 100577, 100578, 100579, 100580, 100581, 100582, 100583, 100584, 100585, 100586, 100587, 100588, 100589, 100590, 100591, 100592, 100593, 100594, 100595, 100596, 100597, 100598, 100599, 100600, 100601, 100602, 100603, 100604, 100605, 100606, 100607, 100608, 100609, 100610, 100611, 100612, 100613, 100614, 100615, 100616, 100617, 100618, 100619, 100620, 100621, 100622, 100623, 100624, 100625, 100626, 100627, 100628, 100629, 100630, 100631, 100632, 100633, 100634, 100635, 100636, 100637, 100638, 100639, 100640, 100641, 100642, 100643, 100644, 100645, 100646, 100647, 100648, 100649, 100650, 100651, 100652, 100653, 100654, 100655, 100656, 100657, 100658, 100659, 100660, 100661, 100662, 100663, 100664, 100665, 100666, 100667, 100668, 100669, 100670, 100671, 100672, 100673, 100674, 100675, 100676, 100677, 100678, 100679, 100680, 100681, 100682, 100683, 100684, 100685, 100686, 100687, 100688, 100689, 100690, 100691, 100692, 100693, 100694, 100695, 100696, 100697, 100698, 100699, 100700, 100701, 100702, 100703, 100704, 100705, 100706, 100707, 100708, 100709, 100710, 100711, 100712, 100713, 100714, 100715, 100716, 100717, 100718, 100719, 100720, 100721, 100722, 100723, 100724, 100725, 100726, 100727, 100728, 100729, 100730, 100731, 100732, 100733, 100734, 100735, 100736, 100737, 100738, 100739, 100740, 100741, 100742, 100743, 100744, 100745, 100746, 100747, 100748, 100749, 100750, 100751, 100752, 100753, 100754, 100755, 100756, 100757, 100758, 100759, 100760, 100761, 100762, 100763, 100764, 100765, 100766, 100767, 100768, 100769, 100770, 100771, 100772, 100773, 100774, 100775, 100776, 100777, 100778, 100779, 100780, 100781, 100782, 100783, 100784, 100785, 100786, 100787, 100788, 100789, 100790, 100791, 100792, 100793, 100794, 100795, 100796, 100797, 100798, 100799, 100800, 100801, 100802, 100803, 100804, 100805, 100806, 100807, 100808, 100809, 100810, 100811, 100812, 100813, 100814, 100815, 100816, 100817, 100818, 100819, 100820, 100821, 100822, 100823, 100824, 100825, 100826, 100827, 100828, 100829, 100830, 100831, 100832, 100833, 100834, 100835, 100836, 100837, 100838, 100839, 100840, 100841, 100842, 100843, 100844, 100845, 100846, 100847, 100848, 100849, 100850, 100851, 100852, 100853, 100854, 100855, 100856, 100857, 100858, 100859, 100860, 100861, 100862, 100863, 100864, 100865, 100866, 100867, 100868, 100869, 100870, 100871, 100872, 100873, 100874, 100875, 100876, 100877, 100878, 100879, 100880, 100881, 100882, 100883, 100884, 100885, 100886, 100887, 100888, 100889, 100890, 100891, 100892, 100893, 100894, 100895, 100896, 100897, 100898, 100899, 100900, 100901, 100902, 100903, 100904, 100905, 100906, 100907, 100908, 100909, 100910, 100911, 100912, 100913, 100914, 100915, 100916, 100917, 100918, 100919, 100920, 100921, 100922, 100923, 100924, 100925, 100926, 100927, 100928, 100929, 100930, 100931, 100932, 100933, 100934, 100935, 100936, 100937, 100938, 100939, 100940, 100941, 100942, 100943, 100944, 100945, 100946, 100947, 100948, 100949, 100950, 100951, 100952, 100953, 100954, 100955, 100956, 100957, 100958, 100959, 100960, 100961, 100962, 100963, 100964, 100965, 100966, 100967, 100968, 100969, 100970, 100971, 100972, 100973, 100974, 100975, 100976, 100977, 100978, 100979, 100980, 100981, 100982, 100983, 100984, 100985, 100986, 100987, 100988, 100989, 100990, 100991, 100992, 100993, 100994, 100995, 100996, 100997, 100998, 100999, 101e3, 101001, 101002, 101003, 101004, 101005, 101006, 101007, 101008, 101009, 101010, 101011, 101012, 101013, 101014, 101015, 101016, 101017, 101018, 101019, 101020, 101021, 101022, 101023, 101024, 101025, 101026, 101027, 101028, 101029, 101030, 101031, 101032, 101033, 101034, 101035, 101036, 101037, 101038, 101039, 101040, 101041, 101042, 101043, 101044, 101045, 101046, 101047, 101048, 101049, 101050, 101051, 101052, 101053, 101054, 101055, 101056, 101057, 101058, 101059, 101060, 101061, 101062, 101063, 101064, 101065, 101066, 101067, 101068, 101069, 101070, 101071, 101072, 101073, 101074, 101075, 101076, 101077, 101078, 101079, 101080, 101081, 101082, 101083, 101084, 101085, 101086, 101087, 101088, 101089, 101090, 101091, 101092, 101093, 101094, 101095, 101096, 101097, 101098, 101099, 101100, 101101, 101102, 101103, 101104, 101105, 101106, 110592, 110593, 110594, 110595, 110596, 110597, 110598, 110599, 110600, 110601, 110602, 110603, 110604, 110605, 110606, 110607, 110608, 110609, 110610, 110611, 110612, 110613, 110614, 110615, 110616, 110617, 110618, 110619, 110620, 110621, 110622, 110623, 110624, 110625, 110626, 110627, 110628, 110629, 110630, 110631, 110632, 110633, 110634, 110635, 110636, 110637, 110638, 110639, 110640, 110641, 110642, 110643, 110644, 110645, 110646, 110647, 110648, 110649, 110650, 110651, 110652, 110653, 110654, 110655, 110656, 110657, 110658, 110659, 110660, 110661, 110662, 110663, 110664, 110665, 110666, 110667, 110668, 110669, 110670, 110671, 110672, 110673, 110674, 110675, 110676, 110677, 110678, 110679, 110680, 110681, 110682, 110683, 110684, 110685, 110686, 110687, 110688, 110689, 110690, 110691, 110692, 110693, 110694, 110695, 110696, 110697, 110698, 110699, 110700, 110701, 110702, 110703, 110704, 110705, 110706, 110707, 110708, 110709, 110710, 110711, 110712, 110713, 110714, 110715, 110716, 110717, 110718, 110719, 110720, 110721, 110722, 110723, 110724, 110725, 110726, 110727, 110728, 110729, 110730, 110731, 110732, 110733, 110734, 110735, 110736, 110737, 110738, 110739, 110740, 110741, 110742, 110743, 110744, 110745, 110746, 110747, 110748, 110749, 110750, 110751, 110752, 110753, 110754, 110755, 110756, 110757, 110758, 110759, 110760, 110761, 110762, 110763, 110764, 110765, 110766, 110767, 110768, 110769, 110770, 110771, 110772, 110773, 110774, 110775, 110776, 110777, 110778, 110779, 110780, 110781, 110782, 110783, 110784, 110785, 110786, 110787, 110788, 110789, 110790, 110791, 110792, 110793, 110794, 110795, 110796, 110797, 110798, 110799, 110800, 110801, 110802, 110803, 110804, 110805, 110806, 110807, 110808, 110809, 110810, 110811, 110812, 110813, 110814, 110815, 110816, 110817, 110818, 110819, 110820, 110821, 110822, 110823, 110824, 110825, 110826, 110827, 110828, 110829, 110830, 110831, 110832, 110833, 110834, 110835, 110836, 110837, 110838, 110839, 110840, 110841, 110842, 110843, 110844, 110845, 110846, 110847, 110848, 110849, 110850, 110851, 110852, 110853, 110854, 110855, 110856, 110857, 110858, 110859, 110860, 110861, 110862, 110863, 110864, 110865, 110866, 110867, 110868, 110869, 110870, 110871, 110872, 110873, 110874, 110875, 110876, 110877, 110878, 110960, 110961, 110962, 110963, 110964, 110965, 110966, 110967, 110968, 110969, 110970, 110971, 110972, 110973, 110974, 110975, 110976, 110977, 110978, 110979, 110980, 110981, 110982, 110983, 110984, 110985, 110986, 110987, 110988, 110989, 110990, 110991, 110992, 110993, 110994, 110995, 110996, 110997, 110998, 110999, 111e3, 111001, 111002, 111003, 111004, 111005, 111006, 111007, 111008, 111009, 111010, 111011, 111012, 111013, 111014, 111015, 111016, 111017, 111018, 111019, 111020, 111021, 111022, 111023, 111024, 111025, 111026, 111027, 111028, 111029, 111030, 111031, 111032, 111033, 111034, 111035, 111036, 111037, 111038, 111039, 111040, 111041, 111042, 111043, 111044, 111045, 111046, 111047, 111048, 111049, 111050, 111051, 111052, 111053, 111054, 111055, 111056, 111057, 111058, 111059, 111060, 111061, 111062, 111063, 111064, 111065, 111066, 111067, 111068, 111069, 111070, 111071, 111072, 111073, 111074, 111075, 111076, 111077, 111078, 111079, 111080, 111081, 111082, 111083, 111084, 111085, 111086, 111087, 111088, 111089, 111090, 111091, 111092, 111093, 111094, 111095, 111096, 111097, 111098, 111099, 111100, 111101, 111102, 111103, 111104, 111105, 111106, 111107, 111108, 111109, 111110, 111111, 111112, 111113, 111114, 111115, 111116, 111117, 111118, 111119, 111120, 111121, 111122, 111123, 111124, 111125, 111126, 111127, 111128, 111129, 111130, 111131, 111132, 111133, 111134, 111135, 111136, 111137, 111138, 111139, 111140, 111141, 111142, 111143, 111144, 111145, 111146, 111147, 111148, 111149, 111150, 111151, 111152, 111153, 111154, 111155, 111156, 111157, 111158, 111159, 111160, 111161, 111162, 111163, 111164, 111165, 111166, 111167, 111168, 111169, 111170, 111171, 111172, 111173, 111174, 111175, 111176, 111177, 111178, 111179, 111180, 111181, 111182, 111183, 111184, 111185, 111186, 111187, 111188, 111189, 111190, 111191, 111192, 111193, 111194, 111195, 111196, 111197, 111198, 111199, 111200, 111201, 111202, 111203, 111204, 111205, 111206, 111207, 111208, 111209, 111210, 111211, 111212, 111213, 111214, 111215, 111216, 111217, 111218, 111219, 111220, 111221, 111222, 111223, 111224, 111225, 111226, 111227, 111228, 111229, 111230, 111231, 111232, 111233, 111234, 111235, 111236, 111237, 111238, 111239, 111240, 111241, 111242, 111243, 111244, 111245, 111246, 111247, 111248, 111249, 111250, 111251, 111252, 111253, 111254, 111255, 111256, 111257, 111258, 111259, 111260, 111261, 111262, 111263, 111264, 111265, 111266, 111267, 111268, 111269, 111270, 111271, 111272, 111273, 111274, 111275, 111276, 111277, 111278, 111279, 111280, 111281, 111282, 111283, 111284, 111285, 111286, 111287, 111288, 111289, 111290, 111291, 111292, 111293, 111294, 111295, 111296, 111297, 111298, 111299, 111300, 111301, 111302, 111303, 111304, 111305, 111306, 111307, 111308, 111309, 111310, 111311, 111312, 111313, 111314, 111315, 111316, 111317, 111318, 111319, 111320, 111321, 111322, 111323, 111324, 111325, 111326, 111327, 111328, 111329, 111330, 111331, 111332, 111333, 111334, 111335, 111336, 111337, 111338, 111339, 111340, 111341, 111342, 111343, 111344, 111345, 111346, 111347, 111348, 111349, 111350, 111351, 111352, 111353, 111354, 111355, 113664, 113665, 113666, 113667, 113668, 113669, 113670, 113671, 113672, 113673, 113674, 113675, 113676, 113677, 113678, 113679, 113680, 113681, 113682, 113683, 113684, 113685, 113686, 113687, 113688, 113689, 113690, 113691, 113692, 113693, 113694, 113695, 113696, 113697, 113698, 113699, 113700, 113701, 113702, 113703, 113704, 113705, 113706, 113707, 113708, 113709, 113710, 113711, 113712, 113713, 113714, 113715, 113716, 113717, 113718, 113719, 113720, 113721, 113722, 113723, 113724, 113725, 113726, 113727, 113728, 113729, 113730, 113731, 113732, 113733, 113734, 113735, 113736, 113737, 113738, 113739, 113740, 113741, 113742, 113743, 113744, 113745, 113746, 113747, 113748, 113749, 113750, 113751, 113752, 113753, 113754, 113755, 113756, 113757, 113758, 113759, 113760, 113761, 113762, 113763, 113764, 113765, 113766, 113767, 113768, 113769, 113770, 113776, 113777, 113778, 113779, 113780, 113781, 113782, 113783, 113784, 113785, 113786, 113787, 113788, 113792, 113793, 113794, 113795, 113796, 113797, 113798, 113799, 113800, 113808, 113809, 113810, 113811, 113812, 113813, 113814, 113815, 113816, 113817, 124928, 124929, 124930, 124931, 124932, 124933, 124934, 124935, 124936, 124937, 124938, 124939, 124940, 124941, 124942, 124943, 124944, 124945, 124946, 124947, 124948, 124949, 124950, 124951, 124952, 124953, 124954, 124955, 124956, 124957, 124958, 124959, 124960, 124961, 124962, 124963, 124964, 124965, 124966, 124967, 124968, 124969, 124970, 124971, 124972, 124973, 124974, 124975, 124976, 124977, 124978, 124979, 124980, 124981, 124982, 124983, 124984, 124985, 124986, 124987, 124988, 124989, 124990, 124991, 124992, 124993, 124994, 124995, 124996, 124997, 124998, 124999, 125e3, 125001, 125002, 125003, 125004, 125005, 125006, 125007, 125008, 125009, 125010, 125011, 125012, 125013, 125014, 125015, 125016, 125017, 125018, 125019, 125020, 125021, 125022, 125023, 125024, 125025, 125026, 125027, 125028, 125029, 125030, 125031, 125032, 125033, 125034, 125035, 125036, 125037, 125038, 125039, 125040, 125041, 125042, 125043, 125044, 125045, 125046, 125047, 125048, 125049, 125050, 125051, 125052, 125053, 125054, 125055, 125056, 125057, 125058, 125059, 125060, 125061, 125062, 125063, 125064, 125065, 125066, 125067, 125068, 125069, 125070, 125071, 125072, 125073, 125074, 125075, 125076, 125077, 125078, 125079, 125080, 125081, 125082, 125083, 125084, 125085, 125086, 125087, 125088, 125089, 125090, 125091, 125092, 125093, 125094, 125095, 125096, 125097, 125098, 125099, 125100, 125101, 125102, 125103, 125104, 125105, 125106, 125107, 125108, 125109, 125110, 125111, 125112, 125113, 125114, 125115, 125116, 125117, 125118, 125119, 125120, 125121, 125122, 125123, 125124, 126464, 126465, 126466, 126467, 126469, 126470, 126471, 126472, 126473, 126474, 126475, 126476, 126477, 126478, 126479, 126480, 126481, 126482, 126483, 126484, 126485, 126486, 126487, 126488, 126489, 126490, 126491, 126492, 126493, 126494, 126495, 126497, 126498, 126500, 126503, 126505, 126506, 126507, 126508, 126509, 126510, 126511, 126512, 126513, 126514, 126516, 126517, 126518, 126519, 126521, 126523, 126530, 126535, 126537, 126539, 126541, 126542, 126543, 126545, 126546, 126548, 126551, 126553, 126555, 126557, 126559, 126561, 126562, 126564, 126567, 126568, 126569, 126570, 126572, 126573, 126574, 126575, 126576, 126577, 126578, 126580, 126581, 126582, 126583, 126585, 126586, 126587, 126588, 126590, 126592, 126593, 126594, 126595, 126596, 126597, 126598, 126599, 126600, 126601, 126603, 126604, 126605, 126606, 126607, 126608, 126609, 126610, 126611, 126612, 126613, 126614, 126615, 126616, 126617, 126618, 126619, 126625, 126626, 126627, 126629, 126630, 126631, 126632, 126633, 126635, 126636, 126637, 126638, 126639, 126640, 126641, 126642, 126643, 126644, 126645, 126646, 126647, 126648, 126649, 126650, 126651, 131072, 173782, 173824, 177972, 177984, 178205, 178208, 183969, 183984, 191456, 194560, 194561, 194562, 194563, 194564, 194565, 194566, 194567, 194568, 194569, 194570, 194571, 194572, 194573, 194574, 194575, 194576, 194577, 194578, 194579, 194580, 194581, 194582, 194583, 194584, 194585, 194586, 194587, 194588, 194589, 194590, 194591, 194592, 194593, 194594, 194595, 194596, 194597, 194598, 194599, 194600, 194601, 194602, 194603, 194604, 194605, 194606, 194607, 194608, 194609, 194610, 194611, 194612, 194613, 194614, 194615, 194616, 194617, 194618, 194619, 194620, 194621, 194622, 194623, 194624, 194625, 194626, 194627, 194628, 194629, 194630, 194631, 194632, 194633, 194634, 194635, 194636, 194637, 194638, 194639, 194640, 194641, 194642, 194643, 194644, 194645, 194646, 194647, 194648, 194649, 194650, 194651, 194652, 194653, 194654, 194655, 194656, 194657, 194658, 194659, 194660, 194661, 194662, 194663, 194664, 194665, 194666, 194667, 194668, 194669, 194670, 194671, 194672, 194673, 194674, 194675, 194676, 194677, 194678, 194679, 194680, 194681, 194682, 194683, 194684, 194685, 194686, 194687, 194688, 194689, 194690, 194691, 194692, 194693, 194694, 194695, 194696, 194697, 194698, 194699, 194700, 194701, 194702, 194703, 194704, 194705, 194706, 194707, 194708, 194709, 194710, 194711, 194712, 194713, 194714, 194715, 194716, 194717, 194718, 194719, 194720, 194721, 194722, 194723, 194724, 194725, 194726, 194727, 194728, 194729, 194730, 194731, 194732, 194733, 194734, 194735, 194736, 194737, 194738, 194739, 194740, 194741, 194742, 194743, 194744, 194745, 194746, 194747, 194748, 194749, 194750, 194751, 194752, 194753, 194754, 194755, 194756, 194757, 194758, 194759, 194760, 194761, 194762, 194763, 194764, 194765, 194766, 194767, 194768, 194769, 194770, 194771, 194772, 194773, 194774, 194775, 194776, 194777, 194778, 194779, 194780, 194781, 194782, 194783, 194784, 194785, 194786, 194787, 194788, 194789, 194790, 194791, 194792, 194793, 194794, 194795, 194796, 194797, 194798, 194799, 194800, 194801, 194802, 194803, 194804, 194805, 194806, 194807, 194808, 194809, 194810, 194811, 194812, 194813, 194814, 194815, 194816, 194817, 194818, 194819, 194820, 194821, 194822, 194823, 194824, 194825, 194826, 194827, 194828, 194829, 194830, 194831, 194832, 194833, 194834, 194835, 194836, 194837, 194838, 194839, 194840, 194841, 194842, 194843, 194844, 194845, 194846, 194847, 194848, 194849, 194850, 194851, 194852, 194853, 194854, 194855, 194856, 194857, 194858, 194859, 194860, 194861, 194862, 194863, 194864, 194865, 194866, 194867, 194868, 194869, 194870, 194871, 194872, 194873, 194874, 194875, 194876, 194877, 194878, 194879, 194880, 194881, 194882, 194883, 194884, 194885, 194886, 194887, 194888, 194889, 194890, 194891, 194892, 194893, 194894, 194895, 194896, 194897, 194898, 194899, 194900, 194901, 194902, 194903, 194904, 194905, 194906, 194907, 194908, 194909, 194910, 194911, 194912, 194913, 194914, 194915, 194916, 194917, 194918, 194919, 194920, 194921, 194922, 194923, 194924, 194925, 194926, 194927, 194928, 194929, 194930, 194931, 194932, 194933, 194934, 194935, 194936, 194937, 194938, 194939, 194940, 194941, 194942, 194943, 194944, 194945, 194946, 194947, 194948, 194949, 194950, 194951, 194952, 194953, 194954, 194955, 194956, 194957, 194958, 194959, 194960, 194961, 194962, 194963, 194964, 194965, 194966, 194967, 194968, 194969, 194970, 194971, 194972, 194973, 194974, 194975, 194976, 194977, 194978, 194979, 194980, 194981, 194982, 194983, 194984, 194985, 194986, 194987, 194988, 194989, 194990, 194991, 194992, 194993, 194994, 194995, 194996, 194997, 194998, 194999, 195e3, 195001, 195002, 195003, 195004, 195005, 195006, 195007, 195008, 195009, 195010, 195011, 195012, 195013, 195014, 195015, 195016, 195017, 195018, 195019, 195020, 195021, 195022, 195023, 195024, 195025, 195026, 195027, 195028, 195029, 195030, 195031, 195032, 195033, 195034, 195035, 195036, 195037, 195038, 195039, 195040, 195041, 195042, 195043, 195044, 195045, 195046, 195047, 195048, 195049, 195050, 195051, 195052, 195053, 195054, 195055, 195056, 195057, 195058, 195059, 195060, 195061, 195062, 195063, 195064, 195065, 195066, 195067, 195068, 195069, 195070, 195071, 195072, 195073, 195074, 195075, 195076, 195077, 195078, 195079, 195080, 195081, 195082, 195083, 195084, 195085, 195086, 195087, 195088, 195089, 195090, 195091, 195092, 195093, 195094, 195095, 195096, 195097, 195098, 195099, 195100, 195101],
		Pi: [171, 8216, 8219, 8220, 8223, 8249, 11778, 11780, 11785, 11788, 11804, 11808],
		Cf: [173, 1536, 1537, 1538, 1539, 1540, 1541, 1564, 1757, 1807, 2274, 6158, 8203, 8204, 8205, 8206, 8207, 8234, 8235, 8236, 8237, 8238, 8288, 8289, 8290, 8291, 8292, 8294, 8295, 8296, 8297, 8298, 8299, 8300, 8301, 8302, 8303, 65279, 65529, 65530, 65531, 69821, 113824, 113825, 113826, 113827, 119155, 119156, 119157, 119158, 119159, 119160, 119161, 119162, 917505, 917536, 917537, 917538, 917539, 917540, 917541, 917542, 917543, 917544, 917545, 917546, 917547, 917548, 917549, 917550, 917551, 917552, 917553, 917554, 917555, 917556, 917557, 917558, 917559, 917560, 917561, 917562, 917563, 917564, 917565, 917566, 917567, 917568, 917569, 917570, 917571, 917572, 917573, 917574, 917575, 917576, 917577, 917578, 917579, 917580, 917581, 917582, 917583, 917584, 917585, 917586, 917587, 917588, 917589, 917590, 917591, 917592, 917593, 917594, 917595, 917596, 917597, 917598, 917599, 917600, 917601, 917602, 917603, 917604, 917605, 917606, 917607, 917608, 917609, 917610, 917611, 917612, 917613, 917614, 917615, 917616, 917617, 917618, 917619, 917620, 917621, 917622, 917623, 917624, 917625, 917626, 917627, 917628, 917629, 917630, 917631],
		No: [178, 179, 185, 188, 189, 190, 2548, 2549, 2550, 2551, 2552, 2553, 2930, 2931, 2932, 2933, 2934, 2935, 3056, 3057, 3058, 3192, 3193, 3194, 3195, 3196, 3197, 3198, 3416, 3417, 3418, 3419, 3420, 3421, 3422, 3440, 3441, 3442, 3443, 3444, 3445, 3446, 3447, 3448, 3882, 3883, 3884, 3885, 3886, 3887, 3888, 3889, 3890, 3891, 4969, 4970, 4971, 4972, 4973, 4974, 4975, 4976, 4977, 4978, 4979, 4980, 4981, 4982, 4983, 4984, 4985, 4986, 4987, 4988, 6128, 6129, 6130, 6131, 6132, 6133, 6134, 6135, 6136, 6137, 6618, 8304, 8308, 8309, 8310, 8311, 8312, 8313, 8320, 8321, 8322, 8323, 8324, 8325, 8326, 8327, 8328, 8329, 8528, 8529, 8530, 8531, 8532, 8533, 8534, 8535, 8536, 8537, 8538, 8539, 8540, 8541, 8542, 8543, 8585, 9312, 9313, 9314, 9315, 9316, 9317, 9318, 9319, 9320, 9321, 9322, 9323, 9324, 9325, 9326, 9327, 9328, 9329, 9330, 9331, 9332, 9333, 9334, 9335, 9336, 9337, 9338, 9339, 9340, 9341, 9342, 9343, 9344, 9345, 9346, 9347, 9348, 9349, 9350, 9351, 9352, 9353, 9354, 9355, 9356, 9357, 9358, 9359, 9360, 9361, 9362, 9363, 9364, 9365, 9366, 9367, 9368, 9369, 9370, 9371, 9450, 9451, 9452, 9453, 9454, 9455, 9456, 9457, 9458, 9459, 9460, 9461, 9462, 9463, 9464, 9465, 9466, 9467, 9468, 9469, 9470, 9471, 10102, 10103, 10104, 10105, 10106, 10107, 10108, 10109, 10110, 10111, 10112, 10113, 10114, 10115, 10116, 10117, 10118, 10119, 10120, 10121, 10122, 10123, 10124, 10125, 10126, 10127, 10128, 10129, 10130, 10131, 11517, 12690, 12691, 12692, 12693, 12832, 12833, 12834, 12835, 12836, 12837, 12838, 12839, 12840, 12841, 12872, 12873, 12874, 12875, 12876, 12877, 12878, 12879, 12881, 12882, 12883, 12884, 12885, 12886, 12887, 12888, 12889, 12890, 12891, 12892, 12893, 12894, 12895, 12928, 12929, 12930, 12931, 12932, 12933, 12934, 12935, 12936, 12937, 12977, 12978, 12979, 12980, 12981, 12982, 12983, 12984, 12985, 12986, 12987, 12988, 12989, 12990, 12991, 43056, 43057, 43058, 43059, 43060, 43061, 65799, 65800, 65801, 65802, 65803, 65804, 65805, 65806, 65807, 65808, 65809, 65810, 65811, 65812, 65813, 65814, 65815, 65816, 65817, 65818, 65819, 65820, 65821, 65822, 65823, 65824, 65825, 65826, 65827, 65828, 65829, 65830, 65831, 65832, 65833, 65834, 65835, 65836, 65837, 65838, 65839, 65840, 65841, 65842, 65843, 65909, 65910, 65911, 65912, 65930, 65931, 66273, 66274, 66275, 66276, 66277, 66278, 66279, 66280, 66281, 66282, 66283, 66284, 66285, 66286, 66287, 66288, 66289, 66290, 66291, 66292, 66293, 66294, 66295, 66296, 66297, 66298, 66299, 66336, 66337, 66338, 66339, 67672, 67673, 67674, 67675, 67676, 67677, 67678, 67679, 67705, 67706, 67707, 67708, 67709, 67710, 67711, 67751, 67752, 67753, 67754, 67755, 67756, 67757, 67758, 67759, 67835, 67836, 67837, 67838, 67839, 67862, 67863, 67864, 67865, 67866, 67867, 68028, 68029, 68032, 68033, 68034, 68035, 68036, 68037, 68038, 68039, 68040, 68041, 68042, 68043, 68044, 68045, 68046, 68047, 68050, 68051, 68052, 68053, 68054, 68055, 68056, 68057, 68058, 68059, 68060, 68061, 68062, 68063, 68064, 68065, 68066, 68067, 68068, 68069, 68070, 68071, 68072, 68073, 68074, 68075, 68076, 68077, 68078, 68079, 68080, 68081, 68082, 68083, 68084, 68085, 68086, 68087, 68088, 68089, 68090, 68091, 68092, 68093, 68094, 68095, 68160, 68161, 68162, 68163, 68164, 68165, 68166, 68167, 68221, 68222, 68253, 68254, 68255, 68331, 68332, 68333, 68334, 68335, 68440, 68441, 68442, 68443, 68444, 68445, 68446, 68447, 68472, 68473, 68474, 68475, 68476, 68477, 68478, 68479, 68521, 68522, 68523, 68524, 68525, 68526, 68527, 68858, 68859, 68860, 68861, 68862, 68863, 69216, 69217, 69218, 69219, 69220, 69221, 69222, 69223, 69224, 69225, 69226, 69227, 69228, 69229, 69230, 69231, 69232, 69233, 69234, 69235, 69236, 69237, 69238, 69239, 69240, 69241, 69242, 69243, 69244, 69245, 69246, 69714, 69715, 69716, 69717, 69718, 69719, 69720, 69721, 69722, 69723, 69724, 69725, 69726, 69727, 69728, 69729, 69730, 69731, 69732, 69733, 70113, 70114, 70115, 70116, 70117, 70118, 70119, 70120, 70121, 70122, 70123, 70124, 70125, 70126, 70127, 70128, 70129, 70130, 70131, 70132, 71482, 71483, 71914, 71915, 71916, 71917, 71918, 71919, 71920, 71921, 71922, 72794, 72795, 72796, 72797, 72798, 72799, 72800, 72801, 72802, 72803, 72804, 72805, 72806, 72807, 72808, 72809, 72810, 72811, 72812, 93019, 93020, 93021, 93022, 93023, 93024, 93025, 119648, 119649, 119650, 119651, 119652, 119653, 119654, 119655, 119656, 119657, 119658, 119659, 119660, 119661, 119662, 119663, 119664, 119665, 125127, 125128, 125129, 125130, 125131, 125132, 125133, 125134, 125135, 127232, 127233, 127234, 127235, 127236, 127237, 127238, 127239, 127240, 127241, 127242, 127243, 127244],
		Pf: [187, 8217, 8221, 8250, 11779, 11781, 11786, 11789, 11805, 11809],
		Lt: [453, 456, 459, 498, 8072, 8073, 8074, 8075, 8076, 8077, 8078, 8079, 8088, 8089, 8090, 8091, 8092, 8093, 8094, 8095, 8104, 8105, 8106, 8107, 8108, 8109, 8110, 8111, 8124, 8140, 8188],
		Lm: [688, 689, 690, 691, 692, 693, 694, 695, 696, 697, 698, 699, 700, 701, 702, 703, 704, 705, 710, 711, 712, 713, 714, 715, 716, 717, 718, 719, 720, 721, 736, 737, 738, 739, 740, 748, 750, 884, 890, 1369, 1600, 1765, 1766, 2036, 2037, 2042, 2074, 2084, 2088, 2417, 3654, 3782, 4348, 6103, 6211, 6823, 7288, 7289, 7290, 7291, 7292, 7293, 7468, 7469, 7470, 7471, 7472, 7473, 7474, 7475, 7476, 7477, 7478, 7479, 7480, 7481, 7482, 7483, 7484, 7485, 7486, 7487, 7488, 7489, 7490, 7491, 7492, 7493, 7494, 7495, 7496, 7497, 7498, 7499, 7500, 7501, 7502, 7503, 7504, 7505, 7506, 7507, 7508, 7509, 7510, 7511, 7512, 7513, 7514, 7515, 7516, 7517, 7518, 7519, 7520, 7521, 7522, 7523, 7524, 7525, 7526, 7527, 7528, 7529, 7530, 7544, 7579, 7580, 7581, 7582, 7583, 7584, 7585, 7586, 7587, 7588, 7589, 7590, 7591, 7592, 7593, 7594, 7595, 7596, 7597, 7598, 7599, 7600, 7601, 7602, 7603, 7604, 7605, 7606, 7607, 7608, 7609, 7610, 7611, 7612, 7613, 7614, 7615, 8305, 8319, 8336, 8337, 8338, 8339, 8340, 8341, 8342, 8343, 8344, 8345, 8346, 8347, 8348, 11388, 11389, 11631, 11823, 12293, 12337, 12338, 12339, 12340, 12341, 12347, 12445, 12446, 12540, 12541, 12542, 40981, 42232, 42233, 42234, 42235, 42236, 42237, 42508, 42623, 42652, 42653, 42775, 42776, 42777, 42778, 42779, 42780, 42781, 42782, 42783, 42864, 42888, 43e3, 43001, 43471, 43494, 43632, 43741, 43763, 43764, 43868, 43869, 43870, 43871, 65392, 65438, 65439, 92992, 92993, 92994, 92995, 94099, 94100, 94101, 94102, 94103, 94104, 94105, 94106, 94107, 94108, 94109, 94110, 94111, 94176, 94177],
		Mn: [768, 769, 770, 771, 772, 773, 774, 775, 776, 777, 778, 779, 780, 781, 782, 783, 784, 785, 786, 787, 788, 789, 790, 791, 792, 793, 794, 795, 796, 797, 798, 799, 800, 801, 802, 803, 804, 805, 806, 807, 808, 809, 810, 811, 812, 813, 814, 815, 816, 817, 818, 819, 820, 821, 822, 823, 824, 825, 826, 827, 828, 829, 830, 831, 832, 833, 834, 835, 836, 837, 838, 839, 840, 841, 842, 843, 844, 845, 846, 847, 848, 849, 850, 851, 852, 853, 854, 855, 856, 857, 858, 859, 860, 861, 862, 863, 864, 865, 866, 867, 868, 869, 870, 871, 872, 873, 874, 875, 876, 877, 878, 879, 1155, 1156, 1157, 1158, 1159, 1425, 1426, 1427, 1428, 1429, 1430, 1431, 1432, 1433, 1434, 1435, 1436, 1437, 1438, 1439, 1440, 1441, 1442, 1443, 1444, 1445, 1446, 1447, 1448, 1449, 1450, 1451, 1452, 1453, 1454, 1455, 1456, 1457, 1458, 1459, 1460, 1461, 1462, 1463, 1464, 1465, 1466, 1467, 1468, 1469, 1471, 1473, 1474, 1476, 1477, 1479, 1552, 1553, 1554, 1555, 1556, 1557, 1558, 1559, 1560, 1561, 1562, 1611, 1612, 1613, 1614, 1615, 1616, 1617, 1618, 1619, 1620, 1621, 1622, 1623, 1624, 1625, 1626, 1627, 1628, 1629, 1630, 1631, 1648, 1750, 1751, 1752, 1753, 1754, 1755, 1756, 1759, 1760, 1761, 1762, 1763, 1764, 1767, 1768, 1770, 1771, 1772, 1773, 1809, 1840, 1841, 1842, 1843, 1844, 1845, 1846, 1847, 1848, 1849, 1850, 1851, 1852, 1853, 1854, 1855, 1856, 1857, 1858, 1859, 1860, 1861, 1862, 1863, 1864, 1865, 1866, 1958, 1959, 1960, 1961, 1962, 1963, 1964, 1965, 1966, 1967, 1968, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035, 2070, 2071, 2072, 2073, 2075, 2076, 2077, 2078, 2079, 2080, 2081, 2082, 2083, 2085, 2086, 2087, 2089, 2090, 2091, 2092, 2093, 2137, 2138, 2139, 2260, 2261, 2262, 2263, 2264, 2265, 2266, 2267, 2268, 2269, 2270, 2271, 2272, 2273, 2275, 2276, 2277, 2278, 2279, 2280, 2281, 2282, 2283, 2284, 2285, 2286, 2287, 2288, 2289, 2290, 2291, 2292, 2293, 2294, 2295, 2296, 2297, 2298, 2299, 2300, 2301, 2302, 2303, 2304, 2305, 2306, 2362, 2364, 2369, 2370, 2371, 2372, 2373, 2374, 2375, 2376, 2381, 2385, 2386, 2387, 2388, 2389, 2390, 2391, 2402, 2403, 2433, 2492, 2497, 2498, 2499, 2500, 2509, 2530, 2531, 2561, 2562, 2620, 2625, 2626, 2631, 2632, 2635, 2636, 2637, 2641, 2672, 2673, 2677, 2689, 2690, 2748, 2753, 2754, 2755, 2756, 2757, 2759, 2760, 2765, 2786, 2787, 2810, 2811, 2812, 2813, 2814, 2815, 2817, 2876, 2879, 2881, 2882, 2883, 2884, 2893, 2902, 2914, 2915, 2946, 3008, 3021, 3072, 3134, 3135, 3136, 3142, 3143, 3144, 3146, 3147, 3148, 3149, 3157, 3158, 3170, 3171, 3201, 3260, 3263, 3270, 3276, 3277, 3298, 3299, 3328, 3329, 3387, 3388, 3393, 3394, 3395, 3396, 3405, 3426, 3427, 3530, 3538, 3539, 3540, 3542, 3633, 3636, 3637, 3638, 3639, 3640, 3641, 3642, 3655, 3656, 3657, 3658, 3659, 3660, 3661, 3662, 3761, 3764, 3765, 3766, 3767, 3768, 3769, 3771, 3772, 3784, 3785, 3786, 3787, 3788, 3789, 3864, 3865, 3893, 3895, 3897, 3953, 3954, 3955, 3956, 3957, 3958, 3959, 3960, 3961, 3962, 3963, 3964, 3965, 3966, 3968, 3969, 3970, 3971, 3972, 3974, 3975, 3981, 3982, 3983, 3984, 3985, 3986, 3987, 3988, 3989, 3990, 3991, 3993, 3994, 3995, 3996, 3997, 3998, 3999, 4e3, 4001, 4002, 4003, 4004, 4005, 4006, 4007, 4008, 4009, 4010, 4011, 4012, 4013, 4014, 4015, 4016, 4017, 4018, 4019, 4020, 4021, 4022, 4023, 4024, 4025, 4026, 4027, 4028, 4038, 4141, 4142, 4143, 4144, 4146, 4147, 4148, 4149, 4150, 4151, 4153, 4154, 4157, 4158, 4184, 4185, 4190, 4191, 4192, 4209, 4210, 4211, 4212, 4226, 4229, 4230, 4237, 4253, 4957, 4958, 4959, 5906, 5907, 5908, 5938, 5939, 5940, 5970, 5971, 6002, 6003, 6068, 6069, 6071, 6072, 6073, 6074, 6075, 6076, 6077, 6086, 6089, 6090, 6091, 6092, 6093, 6094, 6095, 6096, 6097, 6098, 6099, 6109, 6155, 6156, 6157, 6277, 6278, 6313, 6432, 6433, 6434, 6439, 6440, 6450, 6457, 6458, 6459, 6679, 6680, 6683, 6742, 6744, 6745, 6746, 6747, 6748, 6749, 6750, 6752, 6754, 6757, 6758, 6759, 6760, 6761, 6762, 6763, 6764, 6771, 6772, 6773, 6774, 6775, 6776, 6777, 6778, 6779, 6780, 6783, 6832, 6833, 6834, 6835, 6836, 6837, 6838, 6839, 6840, 6841, 6842, 6843, 6844, 6845, 6912, 6913, 6914, 6915, 6964, 6966, 6967, 6968, 6969, 6970, 6972, 6978, 7019, 7020, 7021, 7022, 7023, 7024, 7025, 7026, 7027, 7040, 7041, 7074, 7075, 7076, 7077, 7080, 7081, 7083, 7084, 7085, 7142, 7144, 7145, 7149, 7151, 7152, 7153, 7212, 7213, 7214, 7215, 7216, 7217, 7218, 7219, 7222, 7223, 7376, 7377, 7378, 7380, 7381, 7382, 7383, 7384, 7385, 7386, 7387, 7388, 7389, 7390, 7391, 7392, 7394, 7395, 7396, 7397, 7398, 7399, 7400, 7405, 7412, 7416, 7417, 7616, 7617, 7618, 7619, 7620, 7621, 7622, 7623, 7624, 7625, 7626, 7627, 7628, 7629, 7630, 7631, 7632, 7633, 7634, 7635, 7636, 7637, 7638, 7639, 7640, 7641, 7642, 7643, 7644, 7645, 7646, 7647, 7648, 7649, 7650, 7651, 7652, 7653, 7654, 7655, 7656, 7657, 7658, 7659, 7660, 7661, 7662, 7663, 7664, 7665, 7666, 7667, 7668, 7669, 7670, 7671, 7672, 7673, 7675, 7676, 7677, 7678, 7679, 8400, 8401, 8402, 8403, 8404, 8405, 8406, 8407, 8408, 8409, 8410, 8411, 8412, 8417, 8421, 8422, 8423, 8424, 8425, 8426, 8427, 8428, 8429, 8430, 8431, 8432, 11503, 11504, 11505, 11647, 11744, 11745, 11746, 11747, 11748, 11749, 11750, 11751, 11752, 11753, 11754, 11755, 11756, 11757, 11758, 11759, 11760, 11761, 11762, 11763, 11764, 11765, 11766, 11767, 11768, 11769, 11770, 11771, 11772, 11773, 11774, 11775, 12330, 12331, 12332, 12333, 12441, 12442, 42607, 42612, 42613, 42614, 42615, 42616, 42617, 42618, 42619, 42620, 42621, 42654, 42655, 42736, 42737, 43010, 43014, 43019, 43045, 43046, 43204, 43205, 43232, 43233, 43234, 43235, 43236, 43237, 43238, 43239, 43240, 43241, 43242, 43243, 43244, 43245, 43246, 43247, 43248, 43249, 43302, 43303, 43304, 43305, 43306, 43307, 43308, 43309, 43335, 43336, 43337, 43338, 43339, 43340, 43341, 43342, 43343, 43344, 43345, 43392, 43393, 43394, 43443, 43446, 43447, 43448, 43449, 43452, 43493, 43561, 43562, 43563, 43564, 43565, 43566, 43569, 43570, 43573, 43574, 43587, 43596, 43644, 43696, 43698, 43699, 43700, 43703, 43704, 43710, 43711, 43713, 43756, 43757, 43766, 44005, 44008, 44013, 64286, 65024, 65025, 65026, 65027, 65028, 65029, 65030, 65031, 65032, 65033, 65034, 65035, 65036, 65037, 65038, 65039, 65056, 65057, 65058, 65059, 65060, 65061, 65062, 65063, 65064, 65065, 65066, 65067, 65068, 65069, 65070, 65071, 66045, 66272, 66422, 66423, 66424, 66425, 66426, 68097, 68098, 68099, 68101, 68102, 68108, 68109, 68110, 68111, 68152, 68153, 68154, 68159, 68325, 68326, 69633, 69688, 69689, 69690, 69691, 69692, 69693, 69694, 69695, 69696, 69697, 69698, 69699, 69700, 69701, 69702, 69759, 69760, 69761, 69811, 69812, 69813, 69814, 69817, 69818, 69888, 69889, 69890, 69927, 69928, 69929, 69930, 69931, 69933, 69934, 69935, 69936, 69937, 69938, 69939, 69940, 70003, 70016, 70017, 70070, 70071, 70072, 70073, 70074, 70075, 70076, 70077, 70078, 70090, 70091, 70092, 70191, 70192, 70193, 70196, 70198, 70199, 70206, 70367, 70371, 70372, 70373, 70374, 70375, 70376, 70377, 70378, 70400, 70401, 70460, 70464, 70502, 70503, 70504, 70505, 70506, 70507, 70508, 70512, 70513, 70514, 70515, 70516, 70712, 70713, 70714, 70715, 70716, 70717, 70718, 70719, 70722, 70723, 70724, 70726, 70835, 70836, 70837, 70838, 70839, 70840, 70842, 70847, 70848, 70850, 70851, 71090, 71091, 71092, 71093, 71100, 71101, 71103, 71104, 71132, 71133, 71219, 71220, 71221, 71222, 71223, 71224, 71225, 71226, 71229, 71231, 71232, 71339, 71341, 71344, 71345, 71346, 71347, 71348, 71349, 71351, 71453, 71454, 71455, 71458, 71459, 71460, 71461, 71463, 71464, 71465, 71466, 71467, 72193, 72194, 72195, 72196, 72197, 72198, 72201, 72202, 72243, 72244, 72245, 72246, 72247, 72248, 72251, 72252, 72253, 72254, 72263, 72273, 72274, 72275, 72276, 72277, 72278, 72281, 72282, 72283, 72330, 72331, 72332, 72333, 72334, 72335, 72336, 72337, 72338, 72339, 72340, 72341, 72342, 72344, 72345, 72752, 72753, 72754, 72755, 72756, 72757, 72758, 72760, 72761, 72762, 72763, 72764, 72765, 72767, 72850, 72851, 72852, 72853, 72854, 72855, 72856, 72857, 72858, 72859, 72860, 72861, 72862, 72863, 72864, 72865, 72866, 72867, 72868, 72869, 72870, 72871, 72874, 72875, 72876, 72877, 72878, 72879, 72880, 72882, 72883, 72885, 72886, 73009, 73010, 73011, 73012, 73013, 73014, 73018, 73020, 73021, 73023, 73024, 73025, 73026, 73027, 73028, 73029, 73031, 92912, 92913, 92914, 92915, 92916, 92976, 92977, 92978, 92979, 92980, 92981, 92982, 94095, 94096, 94097, 94098, 113821, 113822, 119143, 119144, 119145, 119163, 119164, 119165, 119166, 119167, 119168, 119169, 119170, 119173, 119174, 119175, 119176, 119177, 119178, 119179, 119210, 119211, 119212, 119213, 119362, 119363, 119364, 121344, 121345, 121346, 121347, 121348, 121349, 121350, 121351, 121352, 121353, 121354, 121355, 121356, 121357, 121358, 121359, 121360, 121361, 121362, 121363, 121364, 121365, 121366, 121367, 121368, 121369, 121370, 121371, 121372, 121373, 121374, 121375, 121376, 121377, 121378, 121379, 121380, 121381, 121382, 121383, 121384, 121385, 121386, 121387, 121388, 121389, 121390, 121391, 121392, 121393, 121394, 121395, 121396, 121397, 121398, 121403, 121404, 121405, 121406, 121407, 121408, 121409, 121410, 121411, 121412, 121413, 121414, 121415, 121416, 121417, 121418, 121419, 121420, 121421, 121422, 121423, 121424, 121425, 121426, 121427, 121428, 121429, 121430, 121431, 121432, 121433, 121434, 121435, 121436, 121437, 121438, 121439, 121440, 121441, 121442, 121443, 121444, 121445, 121446, 121447, 121448, 121449, 121450, 121451, 121452, 121461, 121476, 121499, 121500, 121501, 121502, 121503, 121505, 121506, 121507, 121508, 121509, 121510, 121511, 121512, 121513, 121514, 121515, 121516, 121517, 121518, 121519, 122880, 122881, 122882, 122883, 122884, 122885, 122886, 122888, 122889, 122890, 122891, 122892, 122893, 122894, 122895, 122896, 122897, 122898, 122899, 122900, 122901, 122902, 122903, 122904, 122907, 122908, 122909, 122910, 122911, 122912, 122913, 122915, 122916, 122918, 122919, 122920, 122921, 122922, 125136, 125137, 125138, 125139, 125140, 125141, 125142, 125252, 125253, 125254, 125255, 125256, 125257, 125258, 917760, 917761, 917762, 917763, 917764, 917765, 917766, 917767, 917768, 917769, 917770, 917771, 917772, 917773, 917774, 917775, 917776, 917777, 917778, 917779, 917780, 917781, 917782, 917783, 917784, 917785, 917786, 917787, 917788, 917789, 917790, 917791, 917792, 917793, 917794, 917795, 917796, 917797, 917798, 917799, 917800, 917801, 917802, 917803, 917804, 917805, 917806, 917807, 917808, 917809, 917810, 917811, 917812, 917813, 917814, 917815, 917816, 917817, 917818, 917819, 917820, 917821, 917822, 917823, 917824, 917825, 917826, 917827, 917828, 917829, 917830, 917831, 917832, 917833, 917834, 917835, 917836, 917837, 917838, 917839, 917840, 917841, 917842, 917843, 917844, 917845, 917846, 917847, 917848, 917849, 917850, 917851, 917852, 917853, 917854, 917855, 917856, 917857, 917858, 917859, 917860, 917861, 917862, 917863, 917864, 917865, 917866, 917867, 917868, 917869, 917870, 917871, 917872, 917873, 917874, 917875, 917876, 917877, 917878, 917879, 917880, 917881, 917882, 917883, 917884, 917885, 917886, 917887, 917888, 917889, 917890, 917891, 917892, 917893, 917894, 917895, 917896, 917897, 917898, 917899, 917900, 917901, 917902, 917903, 917904, 917905, 917906, 917907, 917908, 917909, 917910, 917911, 917912, 917913, 917914, 917915, 917916, 917917, 917918, 917919, 917920, 917921, 917922, 917923, 917924, 917925, 917926, 917927, 917928, 917929, 917930, 917931, 917932, 917933, 917934, 917935, 917936, 917937, 917938, 917939, 917940, 917941, 917942, 917943, 917944, 917945, 917946, 917947, 917948, 917949, 917950, 917951, 917952, 917953, 917954, 917955, 917956, 917957, 917958, 917959, 917960, 917961, 917962, 917963, 917964, 917965, 917966, 917967, 917968, 917969, 917970, 917971, 917972, 917973, 917974, 917975, 917976, 917977, 917978, 917979, 917980, 917981, 917982, 917983, 917984, 917985, 917986, 917987, 917988, 917989, 917990, 917991, 917992, 917993, 917994, 917995, 917996, 917997, 917998, 917999],
		Me: [1160, 1161, 6846, 8413, 8414, 8415, 8416, 8418, 8419, 8420, 42608, 42609, 42610],
		Mc: [2307, 2363, 2366, 2367, 2368, 2377, 2378, 2379, 2380, 2382, 2383, 2434, 2435, 2494, 2495, 2496, 2503, 2504, 2507, 2508, 2519, 2563, 2622, 2623, 2624, 2691, 2750, 2751, 2752, 2761, 2763, 2764, 2818, 2819, 2878, 2880, 2887, 2888, 2891, 2892, 2903, 3006, 3007, 3009, 3010, 3014, 3015, 3016, 3018, 3019, 3020, 3031, 3073, 3074, 3075, 3137, 3138, 3139, 3140, 3202, 3203, 3262, 3264, 3265, 3266, 3267, 3268, 3271, 3272, 3274, 3275, 3285, 3286, 3330, 3331, 3390, 3391, 3392, 3398, 3399, 3400, 3402, 3403, 3404, 3415, 3458, 3459, 3535, 3536, 3537, 3544, 3545, 3546, 3547, 3548, 3549, 3550, 3551, 3570, 3571, 3902, 3903, 3967, 4139, 4140, 4145, 4152, 4155, 4156, 4182, 4183, 4194, 4195, 4196, 4199, 4200, 4201, 4202, 4203, 4204, 4205, 4227, 4228, 4231, 4232, 4233, 4234, 4235, 4236, 4239, 4250, 4251, 4252, 6070, 6078, 6079, 6080, 6081, 6082, 6083, 6084, 6085, 6087, 6088, 6435, 6436, 6437, 6438, 6441, 6442, 6443, 6448, 6449, 6451, 6452, 6453, 6454, 6455, 6456, 6681, 6682, 6741, 6743, 6753, 6755, 6756, 6765, 6766, 6767, 6768, 6769, 6770, 6916, 6965, 6971, 6973, 6974, 6975, 6976, 6977, 6979, 6980, 7042, 7073, 7078, 7079, 7082, 7143, 7146, 7147, 7148, 7150, 7154, 7155, 7204, 7205, 7206, 7207, 7208, 7209, 7210, 7211, 7220, 7221, 7393, 7410, 7411, 7415, 12334, 12335, 43043, 43044, 43047, 43136, 43137, 43188, 43189, 43190, 43191, 43192, 43193, 43194, 43195, 43196, 43197, 43198, 43199, 43200, 43201, 43202, 43203, 43346, 43347, 43395, 43444, 43445, 43450, 43451, 43453, 43454, 43455, 43456, 43567, 43568, 43571, 43572, 43597, 43643, 43645, 43755, 43758, 43759, 43765, 44003, 44004, 44006, 44007, 44009, 44010, 44012, 69632, 69634, 69762, 69808, 69809, 69810, 69815, 69816, 69932, 70018, 70067, 70068, 70069, 70079, 70080, 70188, 70189, 70190, 70194, 70195, 70197, 70368, 70369, 70370, 70402, 70403, 70462, 70463, 70465, 70466, 70467, 70468, 70471, 70472, 70475, 70476, 70477, 70487, 70498, 70499, 70709, 70710, 70711, 70720, 70721, 70725, 70832, 70833, 70834, 70841, 70843, 70844, 70845, 70846, 70849, 71087, 71088, 71089, 71096, 71097, 71098, 71099, 71102, 71216, 71217, 71218, 71227, 71228, 71230, 71340, 71342, 71343, 71350, 71456, 71457, 71462, 72199, 72200, 72249, 72279, 72280, 72343, 72751, 72766, 72873, 72881, 72884, 94033, 94034, 94035, 94036, 94037, 94038, 94039, 94040, 94041, 94042, 94043, 94044, 94045, 94046, 94047, 94048, 94049, 94050, 94051, 94052, 94053, 94054, 94055, 94056, 94057, 94058, 94059, 94060, 94061, 94062, 94063, 94064, 94065, 94066, 94067, 94068, 94069, 94070, 94071, 94072, 94073, 94074, 94075, 94076, 94077, 94078, 119141, 119142, 119149, 119150, 119151, 119152, 119153, 119154],
		Nl: [5870, 5871, 5872, 8544, 8545, 8546, 8547, 8548, 8549, 8550, 8551, 8552, 8553, 8554, 8555, 8556, 8557, 8558, 8559, 8560, 8561, 8562, 8563, 8564, 8565, 8566, 8567, 8568, 8569, 8570, 8571, 8572, 8573, 8574, 8575, 8576, 8577, 8578, 8581, 8582, 8583, 8584, 12295, 12321, 12322, 12323, 12324, 12325, 12326, 12327, 12328, 12329, 12344, 12345, 12346, 42726, 42727, 42728, 42729, 42730, 42731, 42732, 42733, 42734, 42735, 65856, 65857, 65858, 65859, 65860, 65861, 65862, 65863, 65864, 65865, 65866, 65867, 65868, 65869, 65870, 65871, 65872, 65873, 65874, 65875, 65876, 65877, 65878, 65879, 65880, 65881, 65882, 65883, 65884, 65885, 65886, 65887, 65888, 65889, 65890, 65891, 65892, 65893, 65894, 65895, 65896, 65897, 65898, 65899, 65900, 65901, 65902, 65903, 65904, 65905, 65906, 65907, 65908, 66369, 66378, 66513, 66514, 66515, 66516, 66517, 74752, 74753, 74754, 74755, 74756, 74757, 74758, 74759, 74760, 74761, 74762, 74763, 74764, 74765, 74766, 74767, 74768, 74769, 74770, 74771, 74772, 74773, 74774, 74775, 74776, 74777, 74778, 74779, 74780, 74781, 74782, 74783, 74784, 74785, 74786, 74787, 74788, 74789, 74790, 74791, 74792, 74793, 74794, 74795, 74796, 74797, 74798, 74799, 74800, 74801, 74802, 74803, 74804, 74805, 74806, 74807, 74808, 74809, 74810, 74811, 74812, 74813, 74814, 74815, 74816, 74817, 74818, 74819, 74820, 74821, 74822, 74823, 74824, 74825, 74826, 74827, 74828, 74829, 74830, 74831, 74832, 74833, 74834, 74835, 74836, 74837, 74838, 74839, 74840, 74841, 74842, 74843, 74844, 74845, 74846, 74847, 74848, 74849, 74850, 74851, 74852, 74853, 74854, 74855, 74856, 74857, 74858, 74859, 74860, 74861, 74862],
		Zl: [8232],
		Zp: [8233],
		Cs: [55296, 56191, 56192, 56319, 56320, 57343],
		Co: [57344, 63743, 983040, 1048573, 1048576, 1114109]
	}
},
function(e, t, n) { (function(e) {
		var r; !
		function(a) {
			var i = "object" == typeof t && t,
			o = ("object" == typeof e && e && e.exports, "object" == typeof global && global);
			var l = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
			s = /[\x01-\x7F]/g,
			u = /[\x01-\t\x0B\f\x0E-\x1F\x7F\x81\x8D\x8F\x90\x9D\xA0-\uFFFF]/g,
			c = /<\u20D2|=\u20E5|>\u20D2|\u205F\u200A|\u219D\u0338|\u2202\u0338|\u2220\u20D2|\u2229\uFE00|\u222A\uFE00|\u223C\u20D2|\u223D\u0331|\u223E\u0333|\u2242\u0338|\u224B\u0338|\u224D\u20D2|\u224E\u0338|\u224F\u0338|\u2250\u0338|\u2261\u20E5|\u2264\u20D2|\u2265\u20D2|\u2266\u0338|\u2267\u0338|\u2268\uFE00|\u2269\uFE00|\u226A\u0338|\u226A\u20D2|\u226B\u0338|\u226B\u20D2|\u227F\u0338|\u2282\u20D2|\u2283\u20D2|\u228A\uFE00|\u228B\uFE00|\u228F\u0338|\u2290\u0338|\u2293\uFE00|\u2294\uFE00|\u22B4\u20D2|\u22B5\u20D2|\u22D8\u0338|\u22D9\u0338|\u22DA\uFE00|\u22DB\uFE00|\u22F5\u0338|\u22F9\u0338|\u2933\u0338|\u29CF\u0338|\u29D0\u0338|\u2A6D\u0338|\u2A70\u0338|\u2A7D\u0338|\u2A7E\u0338|\u2AA1\u0338|\u2AA2\u0338|\u2AAC\uFE00|\u2AAD\uFE00|\u2AAF\u0338|\u2AB0\u0338|\u2AC5\u0338|\u2AC6\u0338|\u2ACB\uFE00|\u2ACC\uFE00|\u2AFD\u20E5|[\xA0-\u0113\u0116-\u0122\u0124-\u012B\u012E-\u014D\u0150-\u017E\u0192\u01B5\u01F5\u0237\u02C6\u02C7\u02D8-\u02DD\u0311\u0391-\u03A1\u03A3-\u03A9\u03B1-\u03C9\u03D1\u03D2\u03D5\u03D6\u03DC\u03DD\u03F0\u03F1\u03F5\u03F6\u0401-\u040C\u040E-\u044F\u0451-\u045C\u045E\u045F\u2002-\u2005\u2007-\u2010\u2013-\u2016\u2018-\u201A\u201C-\u201E\u2020-\u2022\u2025\u2026\u2030-\u2035\u2039\u203A\u203E\u2041\u2043\u2044\u204F\u2057\u205F-\u2063\u20AC\u20DB\u20DC\u2102\u2105\u210A-\u2113\u2115-\u211E\u2122\u2124\u2127-\u2129\u212C\u212D\u212F-\u2131\u2133-\u2138\u2145-\u2148\u2153-\u215E\u2190-\u219B\u219D-\u21A7\u21A9-\u21AE\u21B0-\u21B3\u21B5-\u21B7\u21BA-\u21DB\u21DD\u21E4\u21E5\u21F5\u21FD-\u2205\u2207-\u2209\u220B\u220C\u220F-\u2214\u2216-\u2218\u221A\u221D-\u2238\u223A-\u2257\u2259\u225A\u225C\u225F-\u2262\u2264-\u228B\u228D-\u229B\u229D-\u22A5\u22A7-\u22B0\u22B2-\u22BB\u22BD-\u22DB\u22DE-\u22E3\u22E6-\u22F7\u22F9-\u22FE\u2305\u2306\u2308-\u2310\u2312\u2313\u2315\u2316\u231C-\u231F\u2322\u2323\u232D\u232E\u2336\u233D\u233F\u237C\u23B0\u23B1\u23B4-\u23B6\u23DC-\u23DF\u23E2\u23E7\u2423\u24C8\u2500\u2502\u250C\u2510\u2514\u2518\u251C\u2524\u252C\u2534\u253C\u2550-\u256C\u2580\u2584\u2588\u2591-\u2593\u25A1\u25AA\u25AB\u25AD\u25AE\u25B1\u25B3-\u25B5\u25B8\u25B9\u25BD-\u25BF\u25C2\u25C3\u25CA\u25CB\u25EC\u25EF\u25F8-\u25FC\u2605\u2606\u260E\u2640\u2642\u2660\u2663\u2665\u2666\u266A\u266D-\u266F\u2713\u2717\u2720\u2736\u2758\u2772\u2773\u27C8\u27C9\u27E6-\u27ED\u27F5-\u27FA\u27FC\u27FF\u2902-\u2905\u290C-\u2913\u2916\u2919-\u2920\u2923-\u292A\u2933\u2935-\u2939\u293C\u293D\u2945\u2948-\u294B\u294E-\u2976\u2978\u2979\u297B-\u297F\u2985\u2986\u298B-\u2996\u299A\u299C\u299D\u29A4-\u29B7\u29B9\u29BB\u29BC\u29BE-\u29C5\u29C9\u29CD-\u29D0\u29DC-\u29DE\u29E3-\u29E5\u29EB\u29F4\u29F6\u2A00-\u2A02\u2A04\u2A06\u2A0C\u2A0D\u2A10-\u2A17\u2A22-\u2A27\u2A29\u2A2A\u2A2D-\u2A31\u2A33-\u2A3C\u2A3F\u2A40\u2A42-\u2A4D\u2A50\u2A53-\u2A58\u2A5A-\u2A5D\u2A5F\u2A66\u2A6A\u2A6D-\u2A75\u2A77-\u2A9A\u2A9D-\u2AA2\u2AA4-\u2AB0\u2AB3-\u2AC8\u2ACB\u2ACC\u2ACF-\u2ADB\u2AE4\u2AE6-\u2AE9\u2AEB-\u2AF3\u2AFD\uFB00-\uFB04]|\uD835[\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDCCF\uDD04\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDD6B]/g,
			f = {
				"­": "shy",
				"‌": "zwnj",
				"‍": "zwj",
				"‎": "lrm",
				"⁣": "ic",
				"⁢": "it",
				"⁡": "af",
				"‏": "rlm",
				"​": "ZeroWidthSpace",
				"⁠": "NoBreak",
				"̑": "DownBreve",
				"⃛": "tdot",
				"⃜": "DotDot",
				"\t": "Tab",
				"\n": "NewLine",
				" ": "puncsp",
				" ": "MediumSpace",
				" ": "thinsp",
				" ": "hairsp",
				" ": "emsp13",
				" ": "ensp",
				" ": "emsp14",
				" ": "emsp",
				" ": "numsp",
				" ": "nbsp",
				"  ": "ThickSpace",
				"‾": "oline",
				_: "lowbar",
				"‐": "dash",
				"–": "ndash",
				"—": "mdash",
				"―": "horbar",
				",": "comma",
				";": "semi",
				"⁏": "bsemi",
				":": "colon",
				"⩴": "Colone",
				"!": "excl",
				"¡": "iexcl",
				"?": "quest",
				"¿": "iquest",
				".": "period",
				"‥": "nldr",
				"…": "mldr",
				"·": "middot",
				"'": "apos",
				"‘": "lsquo",
				"’": "rsquo",
				"‚": "sbquo",
				"‹": "lsaquo",
				"›": "rsaquo",
				'"': "quot",
				"“": "ldquo",
				"”": "rdquo",
				"„": "bdquo",
				"«": "laquo",
				"»": "raquo",
				"(": "lpar",
				")": "rpar",
				"[": "lsqb",
				"]": "rsqb",
				"{": "lcub",
				"}": "rcub",
				"⌈": "lceil",
				"⌉": "rceil",
				"⌊": "lfloor",
				"⌋": "rfloor",
				"⦅": "lopar",
				"⦆": "ropar",
				"⦋": "lbrke",
				"⦌": "rbrke",
				"⦍": "lbrkslu",
				"⦎": "rbrksld",
				"⦏": "lbrksld",
				"⦐": "rbrkslu",
				"⦑": "langd",
				"⦒": "rangd",
				"⦓": "lparlt",
				"⦔": "rpargt",
				"⦕": "gtlPar",
				"⦖": "ltrPar",
				"⟦": "lobrk",
				"⟧": "robrk",
				"⟨": "lang",
				"⟩": "rang",
				"⟪": "Lang",
				"⟫": "Rang",
				"⟬": "loang",
				"⟭": "roang",
				"❲": "lbbrk",
				"❳": "rbbrk",
				"‖": "Vert",
				"§": "sect",
				"¶": "para",
				"@": "commat",
				"*": "ast",
				"/": "sol",
				undefined: null,
				"&": "amp",
				"#": "num",
				"%": "percnt",
				"‰": "permil",
				"‱": "pertenk",
				"†": "dagger",
				"‡": "Dagger",
				"•": "bull",
				"⁃": "hybull",
				"′": "prime",
				"″": "Prime",
				"‴": "tprime",
				"⁗": "qprime",
				"‵": "bprime",
				"⁁": "caret",
				"`": "grave",
				"´": "acute",
				"˜": "tilde",
				"^": "Hat",
				"¯": "macr",
				"˘": "breve",
				"˙": "dot",
				"¨": "die",
				"˚": "ring",
				"˝": "dblac",
				"¸": "cedil",
				"˛": "ogon",
				"ˆ": "circ",
				"ˇ": "caron",
				"°": "deg",
				"©": "copy",
				"®": "reg",
				"℗": "copysr",
				"℘": "wp",
				"℞": "rx",
				"℧": "mho",
				"℩": "iiota",
				"←": "larr",
				"↚": "nlarr",
				"→": "rarr",
				"↛": "nrarr",
				"↑": "uarr",
				"↓": "darr",
				"↔": "harr",
				"↮": "nharr",
				"↕": "varr",
				"↖": "nwarr",
				"↗": "nearr",
				"↘": "searr",
				"↙": "swarr",
				"↝": "rarrw",
				"↝̸": "nrarrw",
				"↞": "Larr",
				"↟": "Uarr",
				"↠": "Rarr",
				"↡": "Darr",
				"↢": "larrtl",
				"↣": "rarrtl",
				"↤": "mapstoleft",
				"↥": "mapstoup",
				"↦": "map",
				"↧": "mapstodown",
				"↩": "larrhk",
				"↪": "rarrhk",
				"↫": "larrlp",
				"↬": "rarrlp",
				"↭": "harrw",
				"↰": "lsh",
				"↱": "rsh",
				"↲": "ldsh",
				"↳": "rdsh",
				"↵": "crarr",
				"↶": "cularr",
				"↷": "curarr",
				"↺": "olarr",
				"↻": "orarr",
				"↼": "lharu",
				"↽": "lhard",
				"↾": "uharr",
				"↿": "uharl",
				"⇀": "rharu",
				"⇁": "rhard",
				"⇂": "dharr",
				"⇃": "dharl",
				"⇄": "rlarr",
				"⇅": "udarr",
				"⇆": "lrarr",
				"⇇": "llarr",
				"⇈": "uuarr",
				"⇉": "rrarr",
				"⇊": "ddarr",
				"⇋": "lrhar",
				"⇌": "rlhar",
				"⇐": "lArr",
				"⇍": "nlArr",
				"⇑": "uArr",
				"⇒": "rArr",
				"⇏": "nrArr",
				"⇓": "dArr",
				"⇔": "iff",
				"⇎": "nhArr",
				"⇕": "vArr",
				"⇖": "nwArr",
				"⇗": "neArr",
				"⇘": "seArr",
				"⇙": "swArr",
				"⇚": "lAarr",
				"⇛": "rAarr",
				"⇝": "zigrarr",
				"⇤": "larrb",
				"⇥": "rarrb",
				"⇵": "duarr",
				"⇽": "loarr",
				"⇾": "roarr",
				"⇿": "hoarr",
				"∀": "forall",
				"∁": "comp",
				"∂": "part",
				"∂̸": "npart",
				"∃": "exist",
				"∄": "nexist",
				"∅": "empty",
				"∇": "Del",
				"∈": "in",
				"∉": "notin",
				"∋": "ni",
				"∌": "notni",
				"϶": "bepsi",
				"∏": "prod",
				"∐": "coprod",
				"∑": "sum",
				"+": "plus",
				"±": "pm",
				"÷": "div",
				"×": "times",
				"<": "lt",
				"≮": "nlt",
				"<⃒": "nvlt",
				"=": "equals",
				"≠": "ne",
				"=⃥": "bne",
				"⩵": "Equal",
				">": "gt",
				"≯": "ngt",
				">⃒": "nvgt",
				"¬": "not",
				"|": "vert",
				"¦": "brvbar",
				"−": "minus",
				"∓": "mp",
				"∔": "plusdo",
				"⁄": "frasl",
				"∖": "setmn",
				"∗": "lowast",
				"∘": "compfn",
				"√": "Sqrt",
				"∝": "prop",
				"∞": "infin",
				"∟": "angrt",
				"∠": "ang",
				"∠⃒": "nang",
				"∡": "angmsd",
				"∢": "angsph",
				"∣": "mid",
				"∤": "nmid",
				"∥": "par",
				"∦": "npar",
				"∧": "and",
				"∨": "or",
				"∩": "cap",
				"∩︀": "caps",
				"∪": "cup",
				"∪︀": "cups",
				"∫": "int",
				"∬": "Int",
				"∭": "tint",
				"⨌": "qint",
				"∮": "oint",
				"∯": "Conint",
				"∰": "Cconint",
				"∱": "cwint",
				"∲": "cwconint",
				"∳": "awconint",
				"∴": "there4",
				"∵": "becaus",
				"∶": "ratio",
				"∷": "Colon",
				"∸": "minusd",
				"∺": "mDDot",
				"∻": "homtht",
				"∼": "sim",
				"≁": "nsim",
				"∼⃒": "nvsim",
				"∽": "bsim",
				"∽̱": "race",
				"∾": "ac",
				"∾̳": "acE",
				"∿": "acd",
				"≀": "wr",
				"≂": "esim",
				"≂̸": "nesim",
				"≃": "sime",
				"≄": "nsime",
				"≅": "cong",
				"≇": "ncong",
				"≆": "simne",
				"≈": "ap",
				"≉": "nap",
				"≊": "ape",
				"≋": "apid",
				"≋̸": "napid",
				"≌": "bcong",
				"≍": "CupCap",
				"≭": "NotCupCap",
				"≍⃒": "nvap",
				"≎": "bump",
				"≎̸": "nbump",
				"≏": "bumpe",
				"≏̸": "nbumpe",
				"≐": "doteq",
				"≐̸": "nedot",
				"≑": "eDot",
				"≒": "efDot",
				"≓": "erDot",
				"≔": "colone",
				"≕": "ecolon",
				"≖": "ecir",
				"≗": "cire",
				"≙": "wedgeq",
				"≚": "veeeq",
				"≜": "trie",
				"≟": "equest",
				"≡": "equiv",
				"≢": "nequiv",
				"≡⃥": "bnequiv",
				"≤": "le",
				"≰": "nle",
				"≤⃒": "nvle",
				"≥": "ge",
				"≱": "nge",
				"≥⃒": "nvge",
				"≦": "lE",
				"≦̸": "nlE",
				"≧": "gE",
				"≧̸": "ngE",
				"≨︀": "lvnE",
				"≨": "lnE",
				"≩": "gnE",
				"≩︀": "gvnE",
				"≪": "ll",
				"≪̸": "nLtv",
				"≪⃒": "nLt",
				"≫": "gg",
				"≫̸": "nGtv",
				"≫⃒": "nGt",
				"≬": "twixt",
				"≲": "lsim",
				"≴": "nlsim",
				"≳": "gsim",
				"≵": "ngsim",
				"≶": "lg",
				"≸": "ntlg",
				"≷": "gl",
				"≹": "ntgl",
				"≺": "pr",
				"⊀": "npr",
				"≻": "sc",
				"⊁": "nsc",
				"≼": "prcue",
				"⋠": "nprcue",
				"≽": "sccue",
				"⋡": "nsccue",
				"≾": "prsim",
				"≿": "scsim",
				"≿̸": "NotSucceedsTilde",
				"⊂": "sub",
				"⊄": "nsub",
				"⊂⃒": "vnsub",
				"⊃": "sup",
				"⊅": "nsup",
				"⊃⃒": "vnsup",
				"⊆": "sube",
				"⊈": "nsube",
				"⊇": "supe",
				"⊉": "nsupe",
				"⊊︀": "vsubne",
				"⊊": "subne",
				"⊋︀": "vsupne",
				"⊋": "supne",
				"⊍": "cupdot",
				"⊎": "uplus",
				"⊏": "sqsub",
				"⊏̸": "NotSquareSubset",
				"⊐": "sqsup",
				"⊐̸": "NotSquareSuperset",
				"⊑": "sqsube",
				"⋢": "nsqsube",
				"⊒": "sqsupe",
				"⋣": "nsqsupe",
				"⊓": "sqcap",
				"⊓︀": "sqcaps",
				"⊔": "sqcup",
				"⊔︀": "sqcups",
				"⊕": "oplus",
				"⊖": "ominus",
				"⊗": "otimes",
				"⊘": "osol",
				"⊙": "odot",
				"⊚": "ocir",
				"⊛": "oast",
				"⊝": "odash",
				"⊞": "plusb",
				"⊟": "minusb",
				"⊠": "timesb",
				"⊡": "sdotb",
				"⊢": "vdash",
				"⊬": "nvdash",
				"⊣": "dashv",
				"⊤": "top",
				"⊥": "bot",
				"⊧": "models",
				"⊨": "vDash",
				"⊭": "nvDash",
				"⊩": "Vdash",
				"⊮": "nVdash",
				"⊪": "Vvdash",
				"⊫": "VDash",
				"⊯": "nVDash",
				"⊰": "prurel",
				"⊲": "vltri",
				"⋪": "nltri",
				"⊳": "vrtri",
				"⋫": "nrtri",
				"⊴": "ltrie",
				"⋬": "nltrie",
				"⊴⃒": "nvltrie",
				"⊵": "rtrie",
				"⋭": "nrtrie",
				"⊵⃒": "nvrtrie",
				"⊶": "origof",
				"⊷": "imof",
				"⊸": "mumap",
				"⊹": "hercon",
				"⊺": "intcal",
				"⊻": "veebar",
				"⊽": "barvee",
				"⊾": "angrtvb",
				"⊿": "lrtri",
				"⋀": "Wedge",
				"⋁": "Vee",
				"⋂": "xcap",
				"⋃": "xcup",
				"⋄": "diam",
				"⋅": "sdot",
				"⋆": "Star",
				"⋇": "divonx",
				"⋈": "bowtie",
				"⋉": "ltimes",
				"⋊": "rtimes",
				"⋋": "lthree",
				"⋌": "rthree",
				"⋍": "bsime",
				"⋎": "cuvee",
				"⋏": "cuwed",
				"⋐": "Sub",
				"⋑": "Sup",
				"⋒": "Cap",
				"⋓": "Cup",
				"⋔": "fork",
				"⋕": "epar",
				"⋖": "ltdot",
				"⋗": "gtdot",
				"⋘": "Ll",
				"⋘̸": "nLl",
				"⋙": "Gg",
				"⋙̸": "nGg",
				"⋚︀": "lesg",
				"⋚": "leg",
				"⋛": "gel",
				"⋛︀": "gesl",
				"⋞": "cuepr",
				"⋟": "cuesc",
				"⋦": "lnsim",
				"⋧": "gnsim",
				"⋨": "prnsim",
				"⋩": "scnsim",
				"⋮": "vellip",
				"⋯": "ctdot",
				"⋰": "utdot",
				"⋱": "dtdot",
				"⋲": "disin",
				"⋳": "isinsv",
				"⋴": "isins",
				"⋵": "isindot",
				"⋵̸": "notindot",
				"⋶": "notinvc",
				"⋷": "notinvb",
				"⋹": "isinE",
				"⋹̸": "notinE",
				"⋺": "nisd",
				"⋻": "xnis",
				"⋼": "nis",
				"⋽": "notnivc",
				"⋾": "notnivb",
				"⌅": "barwed",
				"⌆": "Barwed",
				"⌌": "drcrop",
				"⌍": "dlcrop",
				"⌎": "urcrop",
				"⌏": "ulcrop",
				"⌐": "bnot",
				"⌒": "profline",
				"⌓": "profsurf",
				"⌕": "telrec",
				"⌖": "target",
				"⌜": "ulcorn",
				"⌝": "urcorn",
				"⌞": "dlcorn",
				"⌟": "drcorn",
				"⌢": "frown",
				"⌣": "smile",
				"⌭": "cylcty",
				"⌮": "profalar",
				"⌶": "topbot",
				"⌽": "ovbar",
				"⌿": "solbar",
				"⍼": "angzarr",
				"⎰": "lmoust",
				"⎱": "rmoust",
				"⎴": "tbrk",
				"⎵": "bbrk",
				"⎶": "bbrktbrk",
				"⏜": "OverParenthesis",
				"⏝": "UnderParenthesis",
				"⏞": "OverBrace",
				"⏟": "UnderBrace",
				"⏢": "trpezium",
				"⏧": "elinters",
				"␣": "blank",
				"─": "boxh",
				"│": "boxv",
				"┌": "boxdr",
				"┐": "boxdl",
				"└": "boxur",
				"┘": "boxul",
				"├": "boxvr",
				"┤": "boxvl",
				"┬": "boxhd",
				"┴": "boxhu",
				"┼": "boxvh",
				"═": "boxH",
				"║": "boxV",
				"╒": "boxdR",
				"╓": "boxDr",
				"╔": "boxDR",
				"╕": "boxdL",
				"╖": "boxDl",
				"╗": "boxDL",
				"╘": "boxuR",
				"╙": "boxUr",
				"╚": "boxUR",
				"╛": "boxuL",
				"╜": "boxUl",
				"╝": "boxUL",
				"╞": "boxvR",
				"╟": "boxVr",
				"╠": "boxVR",
				"╡": "boxvL",
				"╢": "boxVl",
				"╣": "boxVL",
				"╤": "boxHd",
				"╥": "boxhD",
				"╦": "boxHD",
				"╧": "boxHu",
				"╨": "boxhU",
				"╩": "boxHU",
				"╪": "boxvH",
				"╫": "boxVh",
				"╬": "boxVH",
				"▀": "uhblk",
				"▄": "lhblk",
				"█": "block",
				"░": "blk14",
				"▒": "blk12",
				"▓": "blk34",
				"□": "squ",
				"▪": "squf",
				"▫": "EmptyVerySmallSquare",
				"▭": "rect",
				"▮": "marker",
				"▱": "fltns",
				"△": "xutri",
				"▴": "utrif",
				"▵": "utri",
				"▸": "rtrif",
				"▹": "rtri",
				"▽": "xdtri",
				"▾": "dtrif",
				"▿": "dtri",
				"◂": "ltrif",
				"◃": "ltri",
				"◊": "loz",
				"○": "cir",
				"◬": "tridot",
				"◯": "xcirc",
				"◸": "ultri",
				"◹": "urtri",
				"◺": "lltri",
				"◻": "EmptySmallSquare",
				"◼": "FilledSmallSquare",
				"★": "starf",
				"☆": "star",
				"☎": "phone",
				"♀": "female",
				"♂": "male",
				"♠": "spades",
				"♣": "clubs",
				"♥": "hearts",
				"♦": "diams",
				"♪": "sung",
				"✓": "check",
				"✗": "cross",
				"✠": "malt",
				"✶": "sext",
				"❘": "VerticalSeparator",
				"⟈": "bsolhsub",
				"⟉": "suphsol",
				"⟵": "xlarr",
				"⟶": "xrarr",
				"⟷": "xharr",
				"⟸": "xlArr",
				"⟹": "xrArr",
				"⟺": "xhArr",
				"⟼": "xmap",
				"⟿": "dzigrarr",
				"⤂": "nvlArr",
				"⤃": "nvrArr",
				"⤄": "nvHarr",
				"⤅": "Map",
				"⤌": "lbarr",
				"⤍": "rbarr",
				"⤎": "lBarr",
				"⤏": "rBarr",
				"⤐": "RBarr",
				"⤑": "DDotrahd",
				"⤒": "UpArrowBar",
				"⤓": "DownArrowBar",
				"⤖": "Rarrtl",
				"⤙": "latail",
				"⤚": "ratail",
				"⤛": "lAtail",
				"⤜": "rAtail",
				"⤝": "larrfs",
				"⤞": "rarrfs",
				"⤟": "larrbfs",
				"⤠": "rarrbfs",
				"⤣": "nwarhk",
				"⤤": "nearhk",
				"⤥": "searhk",
				"⤦": "swarhk",
				"⤧": "nwnear",
				"⤨": "toea",
				"⤩": "tosa",
				"⤪": "swnwar",
				"⤳": "rarrc",
				"⤳̸": "nrarrc",
				"⤵": "cudarrr",
				"⤶": "ldca",
				"⤷": "rdca",
				"⤸": "cudarrl",
				"⤹": "larrpl",
				"⤼": "curarrm",
				"⤽": "cularrp",
				"⥅": "rarrpl",
				"⥈": "harrcir",
				"⥉": "Uarrocir",
				"⥊": "lurdshar",
				"⥋": "ldrushar",
				"⥎": "LeftRightVector",
				"⥏": "RightUpDownVector",
				"⥐": "DownLeftRightVector",
				"⥑": "LeftUpDownVector",
				"⥒": "LeftVectorBar",
				"⥓": "RightVectorBar",
				"⥔": "RightUpVectorBar",
				"⥕": "RightDownVectorBar",
				"⥖": "DownLeftVectorBar",
				"⥗": "DownRightVectorBar",
				"⥘": "LeftUpVectorBar",
				"⥙": "LeftDownVectorBar",
				"⥚": "LeftTeeVector",
				"⥛": "RightTeeVector",
				"⥜": "RightUpTeeVector",
				"⥝": "RightDownTeeVector",
				"⥞": "DownLeftTeeVector",
				"⥟": "DownRightTeeVector",
				"⥠": "LeftUpTeeVector",
				"⥡": "LeftDownTeeVector",
				"⥢": "lHar",
				"⥣": "uHar",
				"⥤": "rHar",
				"⥥": "dHar",
				"⥦": "luruhar",
				"⥧": "ldrdhar",
				"⥨": "ruluhar",
				"⥩": "rdldhar",
				"⥪": "lharul",
				"⥫": "llhard",
				"⥬": "rharul",
				"⥭": "lrhard",
				"⥮": "udhar",
				"⥯": "duhar",
				"⥰": "RoundImplies",
				"⥱": "erarr",
				"⥲": "simrarr",
				"⥳": "larrsim",
				"⥴": "rarrsim",
				"⥵": "rarrap",
				"⥶": "ltlarr",
				"⥸": "gtrarr",
				"⥹": "subrarr",
				"⥻": "suplarr",
				"⥼": "lfisht",
				"⥽": "rfisht",
				"⥾": "ufisht",
				"⥿": "dfisht",
				"⦚": "vzigzag",
				"⦜": "vangrt",
				"⦝": "angrtvbd",
				"⦤": "ange",
				"⦥": "range",
				"⦦": "dwangle",
				"⦧": "uwangle",
				"⦨": "angmsdaa",
				"⦩": "angmsdab",
				"⦪": "angmsdac",
				"⦫": "angmsdad",
				"⦬": "angmsdae",
				"⦭": "angmsdaf",
				"⦮": "angmsdag",
				"⦯": "angmsdah",
				"⦰": "bemptyv",
				"⦱": "demptyv",
				"⦲": "cemptyv",
				"⦳": "raemptyv",
				"⦴": "laemptyv",
				"⦵": "ohbar",
				"⦶": "omid",
				"⦷": "opar",
				"⦹": "operp",
				"⦻": "olcross",
				"⦼": "odsold",
				"⦾": "olcir",
				"⦿": "ofcir",
				"⧀": "olt",
				"⧁": "ogt",
				"⧂": "cirscir",
				"⧃": "cirE",
				"⧄": "solb",
				"⧅": "bsolb",
				"⧉": "boxbox",
				"⧍": "trisb",
				"⧎": "rtriltri",
				"⧏": "LeftTriangleBar",
				"⧏̸": "NotLeftTriangleBar",
				"⧐": "RightTriangleBar",
				"⧐̸": "NotRightTriangleBar",
				"⧜": "iinfin",
				"⧝": "infintie",
				"⧞": "nvinfin",
				"⧣": "eparsl",
				"⧤": "smeparsl",
				"⧥": "eqvparsl",
				"⧫": "lozf",
				"⧴": "RuleDelayed",
				"⧶": "dsol",
				"⨀": "xodot",
				"⨁": "xoplus",
				"⨂": "xotime",
				"⨄": "xuplus",
				"⨆": "xsqcup",
				"⨍": "fpartint",
				"⨐": "cirfnint",
				"⨑": "awint",
				"⨒": "rppolint",
				"⨓": "scpolint",
				"⨔": "npolint",
				"⨕": "pointint",
				"⨖": "quatint",
				"⨗": "intlarhk",
				"⨢": "pluscir",
				"⨣": "plusacir",
				"⨤": "simplus",
				"⨥": "plusdu",
				"⨦": "plussim",
				"⨧": "plustwo",
				"⨩": "mcomma",
				"⨪": "minusdu",
				"⨭": "loplus",
				"⨮": "roplus",
				"⨯": "Cross",
				"⨰": "timesd",
				"⨱": "timesbar",
				"⨳": "smashp",
				"⨴": "lotimes",
				"⨵": "rotimes",
				"⨶": "otimesas",
				"⨷": "Otimes",
				"⨸": "odiv",
				"⨹": "triplus",
				"⨺": "triminus",
				"⨻": "tritime",
				"⨼": "iprod",
				"⨿": "amalg",
				"⩀": "capdot",
				"⩂": "ncup",
				"⩃": "ncap",
				"⩄": "capand",
				"⩅": "cupor",
				"⩆": "cupcap",
				"⩇": "capcup",
				"⩈": "cupbrcap",
				"⩉": "capbrcup",
				"⩊": "cupcup",
				"⩋": "capcap",
				"⩌": "ccups",
				"⩍": "ccaps",
				"⩐": "ccupssm",
				"⩓": "And",
				"⩔": "Or",
				"⩕": "andand",
				"⩖": "oror",
				"⩗": "orslope",
				"⩘": "andslope",
				"⩚": "andv",
				"⩛": "orv",
				"⩜": "andd",
				"⩝": "ord",
				"⩟": "wedbar",
				"⩦": "sdote",
				"⩪": "simdot",
				"⩭": "congdot",
				"⩭̸": "ncongdot",
				"⩮": "easter",
				"⩯": "apacir",
				"⩰": "apE",
				"⩰̸": "napE",
				"⩱": "eplus",
				"⩲": "pluse",
				"⩳": "Esim",
				"⩷": "eDDot",
				"⩸": "equivDD",
				"⩹": "ltcir",
				"⩺": "gtcir",
				"⩻": "ltquest",
				"⩼": "gtquest",
				"⩽": "les",
				"⩽̸": "nles",
				"⩾": "ges",
				"⩾̸": "nges",
				"⩿": "lesdot",
				"⪀": "gesdot",
				"⪁": "lesdoto",
				"⪂": "gesdoto",
				"⪃": "lesdotor",
				"⪄": "gesdotol",
				"⪅": "lap",
				"⪆": "gap",
				"⪇": "lne",
				"⪈": "gne",
				"⪉": "lnap",
				"⪊": "gnap",
				"⪋": "lEg",
				"⪌": "gEl",
				"⪍": "lsime",
				"⪎": "gsime",
				"⪏": "lsimg",
				"⪐": "gsiml",
				"⪑": "lgE",
				"⪒": "glE",
				"⪓": "lesges",
				"⪔": "gesles",
				"⪕": "els",
				"⪖": "egs",
				"⪗": "elsdot",
				"⪘": "egsdot",
				"⪙": "el",
				"⪚": "eg",
				"⪝": "siml",
				"⪞": "simg",
				"⪟": "simlE",
				"⪠": "simgE",
				"⪡": "LessLess",
				"⪡̸": "NotNestedLessLess",
				"⪢": "GreaterGreater",
				"⪢̸": "NotNestedGreaterGreater",
				"⪤": "glj",
				"⪥": "gla",
				"⪦": "ltcc",
				"⪧": "gtcc",
				"⪨": "lescc",
				"⪩": "gescc",
				"⪪": "smt",
				"⪫": "lat",
				"⪬": "smte",
				"⪬︀": "smtes",
				"⪭": "late",
				"⪭︀": "lates",
				"⪮": "bumpE",
				"⪯": "pre",
				"⪯̸": "npre",
				"⪰": "sce",
				"⪰̸": "nsce",
				"⪳": "prE",
				"⪴": "scE",
				"⪵": "prnE",
				"⪶": "scnE",
				"⪷": "prap",
				"⪸": "scap",
				"⪹": "prnap",
				"⪺": "scnap",
				"⪻": "Pr",
				"⪼": "Sc",
				"⪽": "subdot",
				"⪾": "supdot",
				"⪿": "subplus",
				"⫀": "supplus",
				"⫁": "submult",
				"⫂": "supmult",
				"⫃": "subedot",
				"⫄": "supedot",
				"⫅": "subE",
				"⫅̸": "nsubE",
				"⫆": "supE",
				"⫆̸": "nsupE",
				"⫇": "subsim",
				"⫈": "supsim",
				"⫋︀": "vsubnE",
				"⫋": "subnE",
				"⫌︀": "vsupnE",
				"⫌": "supnE",
				"⫏": "csub",
				"⫐": "csup",
				"⫑": "csube",
				"⫒": "csupe",
				"⫓": "subsup",
				"⫔": "supsub",
				"⫕": "subsub",
				"⫖": "supsup",
				"⫗": "suphsub",
				"⫘": "supdsub",
				"⫙": "forkv",
				"⫚": "topfork",
				"⫛": "mlcp",
				"⫤": "Dashv",
				"⫦": "Vdashl",
				"⫧": "Barv",
				"⫨": "vBar",
				"⫩": "vBarv",
				"⫫": "Vbar",
				"⫬": "Not",
				"⫭": "bNot",
				"⫮": "rnmid",
				"⫯": "cirmid",
				"⫰": "midcir",
				"⫱": "topcir",
				"⫲": "nhpar",
				"⫳": "parsim",
				"⫽": "parsl",
				"⫽⃥": "nparsl",
				"♭": "flat",
				"♮": "natur",
				"♯": "sharp",
				"¤": "curren",
				"¢": "cent",
				$: "dollar",
				"£": "pound",
				"¥": "yen",
				"€": "euro",
				"¹": "sup1",
				"½": "half",
				"⅓": "frac13",
				"¼": "frac14",
				"⅕": "frac15",
				"⅙": "frac16",
				"⅛": "frac18",
				"²": "sup2",
				"⅔": "frac23",
				"⅖": "frac25",
				"³": "sup3",
				"¾": "frac34",
				"⅗": "frac35",
				"⅜": "frac38",
				"⅘": "frac45",
				"⅚": "frac56",
				"⅝": "frac58",
				"⅞": "frac78",
				"𝒶": "ascr",
				"𝕒": "aopf",
				"𝔞": "afr",
				"𝔸": "Aopf",
				"𝔄": "Afr",
				"𝒜": "Ascr",
				"ª": "ordf",
				"á": "aacute",
				"Á": "Aacute",
				"à": "agrave",
				"À": "Agrave",
				"ă": "abreve",
				"Ă": "Abreve",
				"â": "acirc",
				"Â": "Acirc",
				"å": "aring",
				"Å": "angst",
				"ä": "auml",
				"Ä": "Auml",
				"ã": "atilde",
				"Ã": "Atilde",
				"ą": "aogon",
				"Ą": "Aogon",
				"ā": "amacr",
				"Ā": "Amacr",
				"æ": "aelig",
				"Æ": "AElig",
				"𝒷": "bscr",
				"𝕓": "bopf",
				"𝔟": "bfr",
				"𝔹": "Bopf",
				"ℬ": "Bscr",
				"𝔅": "Bfr",
				"𝔠": "cfr",
				"𝒸": "cscr",
				"𝕔": "copf",
				"ℭ": "Cfr",
				"𝒞": "Cscr",
				"ℂ": "Copf",
				"ć": "cacute",
				"Ć": "Cacute",
				"ĉ": "ccirc",
				"Ĉ": "Ccirc",
				"č": "ccaron",
				"Č": "Ccaron",
				"ċ": "cdot",
				"Ċ": "Cdot",
				"ç": "ccedil",
				"Ç": "Ccedil",
				"℅": "incare",
				"𝔡": "dfr",
				"ⅆ": "dd",
				"𝕕": "dopf",
				"𝒹": "dscr",
				"𝒟": "Dscr",
				"𝔇": "Dfr",
				"ⅅ": "DD",
				"𝔻": "Dopf",
				"ď": "dcaron",
				"Ď": "Dcaron",
				"đ": "dstrok",
				"Đ": "Dstrok",
				"ð": "eth",
				"Ð": "ETH",
				"ⅇ": "ee",
				"ℯ": "escr",
				"𝔢": "efr",
				"𝕖": "eopf",
				"ℰ": "Escr",
				"𝔈": "Efr",
				"𝔼": "Eopf",
				"é": "eacute",
				"É": "Eacute",
				"è": "egrave",
				"È": "Egrave",
				"ê": "ecirc",
				"Ê": "Ecirc",
				"ě": "ecaron",
				"Ě": "Ecaron",
				"ë": "euml",
				"Ë": "Euml",
				"ė": "edot",
				"Ė": "Edot",
				"ę": "eogon",
				"Ę": "Eogon",
				"ē": "emacr",
				"Ē": "Emacr",
				"𝔣": "ffr",
				"𝕗": "fopf",
				"𝒻": "fscr",
				"𝔉": "Ffr",
				"𝔽": "Fopf",
				"ℱ": "Fscr",
				"ﬀ": "fflig",
				"ﬃ": "ffilig",
				"ﬄ": "ffllig",
				"ﬁ": "filig",
				fj: "fjlig",
				"ﬂ": "fllig",
				"ƒ": "fnof",
				"ℊ": "gscr",
				"𝕘": "gopf",
				"𝔤": "gfr",
				"𝒢": "Gscr",
				"𝔾": "Gopf",
				"𝔊": "Gfr",
				"ǵ": "gacute",
				"ğ": "gbreve",
				"Ğ": "Gbreve",
				"ĝ": "gcirc",
				"Ĝ": "Gcirc",
				"ġ": "gdot",
				"Ġ": "Gdot",
				"Ģ": "Gcedil",
				"𝔥": "hfr",
				"ℎ": "planckh",
				"𝒽": "hscr",
				"𝕙": "hopf",
				"ℋ": "Hscr",
				"ℌ": "Hfr",
				"ℍ": "Hopf",
				"ĥ": "hcirc",
				"Ĥ": "Hcirc",
				"ℏ": "hbar",
				"ħ": "hstrok",
				"Ħ": "Hstrok",
				"𝕚": "iopf",
				"𝔦": "ifr",
				"𝒾": "iscr",
				"ⅈ": "ii",
				"𝕀": "Iopf",
				"ℐ": "Iscr",
				"ℑ": "Im",
				"í": "iacute",
				"Í": "Iacute",
				"ì": "igrave",
				"Ì": "Igrave",
				"î": "icirc",
				"Î": "Icirc",
				"ï": "iuml",
				"Ï": "Iuml",
				"ĩ": "itilde",
				"Ĩ": "Itilde",
				"İ": "Idot",
				"į": "iogon",
				"Į": "Iogon",
				"ī": "imacr",
				"Ī": "Imacr",
				"ĳ": "ijlig",
				"Ĳ": "IJlig",
				"ı": "imath",
				"𝒿": "jscr",
				"𝕛": "jopf",
				"𝔧": "jfr",
				"𝒥": "Jscr",
				"𝔍": "Jfr",
				"𝕁": "Jopf",
				"ĵ": "jcirc",
				"Ĵ": "Jcirc",
				"ȷ": "jmath",
				"𝕜": "kopf",
				"𝓀": "kscr",
				"𝔨": "kfr",
				"𝒦": "Kscr",
				"𝕂": "Kopf",
				"𝔎": "Kfr",
				"ķ": "kcedil",
				"Ķ": "Kcedil",
				"𝔩": "lfr",
				"𝓁": "lscr",
				"ℓ": "ell",
				"𝕝": "lopf",
				"ℒ": "Lscr",
				"𝔏": "Lfr",
				"𝕃": "Lopf",
				"ĺ": "lacute",
				"Ĺ": "Lacute",
				"ľ": "lcaron",
				"Ľ": "Lcaron",
				"ļ": "lcedil",
				"Ļ": "Lcedil",
				"ł": "lstrok",
				"Ł": "Lstrok",
				"ŀ": "lmidot",
				"Ŀ": "Lmidot",
				"𝔪": "mfr",
				"𝕞": "mopf",
				"𝓂": "mscr",
				"𝔐": "Mfr",
				"𝕄": "Mopf",
				"ℳ": "Mscr",
				"𝔫": "nfr",
				"𝕟": "nopf",
				"𝓃": "nscr",
				"ℕ": "Nopf",
				"𝒩": "Nscr",
				"𝔑": "Nfr",
				"ń": "nacute",
				"Ń": "Nacute",
				"ň": "ncaron",
				"Ň": "Ncaron",
				"ñ": "ntilde",
				"Ñ": "Ntilde",
				"ņ": "ncedil",
				"Ņ": "Ncedil",
				"№": "numero",
				"ŋ": "eng",
				"Ŋ": "ENG",
				"𝕠": "oopf",
				"𝔬": "ofr",
				"ℴ": "oscr",
				"𝒪": "Oscr",
				"𝔒": "Ofr",
				"𝕆": "Oopf",
				"º": "ordm",
				"ó": "oacute",
				"Ó": "Oacute",
				"ò": "ograve",
				"Ò": "Ograve",
				"ô": "ocirc",
				"Ô": "Ocirc",
				"ö": "ouml",
				"Ö": "Ouml",
				"ő": "odblac",
				"Ő": "Odblac",
				"õ": "otilde",
				"Õ": "Otilde",
				"ø": "oslash",
				"Ø": "Oslash",
				"ō": "omacr",
				"Ō": "Omacr",
				"œ": "oelig",
				"Œ": "OElig",
				"𝔭": "pfr",
				"𝓅": "pscr",
				"𝕡": "popf",
				"ℙ": "Popf",
				"𝔓": "Pfr",
				"𝒫": "Pscr",
				"𝕢": "qopf",
				"𝔮": "qfr",
				"𝓆": "qscr",
				"𝒬": "Qscr",
				"𝔔": "Qfr",
				"ℚ": "Qopf",
				"ĸ": "kgreen",
				"𝔯": "rfr",
				"𝕣": "ropf",
				"𝓇": "rscr",
				"ℛ": "Rscr",
				"ℜ": "Re",
				"ℝ": "Ropf",
				"ŕ": "racute",
				"Ŕ": "Racute",
				"ř": "rcaron",
				"Ř": "Rcaron",
				"ŗ": "rcedil",
				"Ŗ": "Rcedil",
				"𝕤": "sopf",
				"𝓈": "sscr",
				"𝔰": "sfr",
				"𝕊": "Sopf",
				"𝔖": "Sfr",
				"𝒮": "Sscr",
				"Ⓢ": "oS",
				"ś": "sacute",
				"Ś": "Sacute",
				"ŝ": "scirc",
				"Ŝ": "Scirc",
				"š": "scaron",
				"Š": "Scaron",
				"ş": "scedil",
				"Ş": "Scedil",
				"ß": "szlig",
				"𝔱": "tfr",
				"𝓉": "tscr",
				"𝕥": "topf",
				"𝒯": "Tscr",
				"𝔗": "Tfr",
				"𝕋": "Topf",
				"ť": "tcaron",
				"Ť": "Tcaron",
				"ţ": "tcedil",
				"Ţ": "Tcedil",
				"™": "trade",
				"ŧ": "tstrok",
				"Ŧ": "Tstrok",
				"𝓊": "uscr",
				"𝕦": "uopf",
				"𝔲": "ufr",
				"𝕌": "Uopf",
				"𝔘": "Ufr",
				"𝒰": "Uscr",
				"ú": "uacute",
				"Ú": "Uacute",
				"ù": "ugrave",
				"Ù": "Ugrave",
				"ŭ": "ubreve",
				"Ŭ": "Ubreve",
				"û": "ucirc",
				"Û": "Ucirc",
				"ů": "uring",
				"Ů": "Uring",
				"ü": "uuml",
				"Ü": "Uuml",
				"ű": "udblac",
				"Ű": "Udblac",
				"ũ": "utilde",
				"Ũ": "Utilde",
				"ų": "uogon",
				"Ų": "Uogon",
				"ū": "umacr",
				"Ū": "Umacr",
				"𝔳": "vfr",
				"𝕧": "vopf",
				"𝓋": "vscr",
				"𝔙": "Vfr",
				"𝕍": "Vopf",
				"𝒱": "Vscr",
				"𝕨": "wopf",
				"𝓌": "wscr",
				"𝔴": "wfr",
				"𝒲": "Wscr",
				"𝕎": "Wopf",
				"𝔚": "Wfr",
				"ŵ": "wcirc",
				"Ŵ": "Wcirc",
				"𝔵": "xfr",
				"𝓍": "xscr",
				"𝕩": "xopf",
				"𝕏": "Xopf",
				"𝔛": "Xfr",
				"𝒳": "Xscr",
				"𝔶": "yfr",
				"𝓎": "yscr",
				"𝕪": "yopf",
				"𝒴": "Yscr",
				"𝔜": "Yfr",
				"𝕐": "Yopf",
				"ý": "yacute",
				"Ý": "Yacute",
				"ŷ": "ycirc",
				"Ŷ": "Ycirc",
				"ÿ": "yuml",
				"Ÿ": "Yuml",
				"𝓏": "zscr",
				"𝔷": "zfr",
				"𝕫": "zopf",
				"ℨ": "Zfr",
				"ℤ": "Zopf",
				"𝒵": "Zscr",
				"ź": "zacute",
				"Ź": "Zacute",
				"ž": "zcaron",
				"Ž": "Zcaron",
				"ż": "zdot",
				"Ż": "Zdot",
				"Ƶ": "imped",
				"þ": "thorn",
				"Þ": "THORN",
				"ŉ": "napos",
				"α": "alpha",
				"Α": "Alpha",
				"β": "beta",
				"Β": "Beta",
				"γ": "gamma",
				"Γ": "Gamma",
				"δ": "delta",
				"Δ": "Delta",
				"ε": "epsi",
				"ϵ": "epsiv",
				"Ε": "Epsilon",
				"ϝ": "gammad",
				"Ϝ": "Gammad",
				"ζ": "zeta",
				"Ζ": "Zeta",
				"η": "eta",
				"Η": "Eta",
				"θ": "theta",
				"ϑ": "thetav",
				"Θ": "Theta",
				"ι": "iota",
				"Ι": "Iota",
				"κ": "kappa",
				"ϰ": "kappav",
				"Κ": "Kappa",
				"λ": "lambda",
				"Λ": "Lambda",
				"μ": "mu",
				"µ": "micro",
				"Μ": "Mu",
				"ν": "nu",
				"Ν": "Nu",
				"ξ": "xi",
				"Ξ": "Xi",
				"ο": "omicron",
				"Ο": "Omicron",
				"π": "pi",
				"ϖ": "piv",
				"Π": "Pi",
				"ρ": "rho",
				"ϱ": "rhov",
				"Ρ": "Rho",
				"σ": "sigma",
				"Σ": "Sigma",
				"ς": "sigmaf",
				"τ": "tau",
				"Τ": "Tau",
				"υ": "upsi",
				"Υ": "Upsilon",
				"ϒ": "Upsi",
				"φ": "phi",
				"ϕ": "phiv",
				"Φ": "Phi",
				"χ": "chi",
				"Χ": "Chi",
				"ψ": "psi",
				"Ψ": "Psi",
				"ω": "omega",
				"Ω": "ohm",
				"а": "acy",
				"А": "Acy",
				"б": "bcy",
				"Б": "Bcy",
				"в": "vcy",
				"В": "Vcy",
				"г": "gcy",
				"Г": "Gcy",
				"ѓ": "gjcy",
				"Ѓ": "GJcy",
				"д": "dcy",
				"Д": "Dcy",
				"ђ": "djcy",
				"Ђ": "DJcy",
				"е": "iecy",
				"Е": "IEcy",
				"ё": "iocy",
				"Ё": "IOcy",
				"є": "jukcy",
				"Є": "Jukcy",
				"ж": "zhcy",
				"Ж": "ZHcy",
				"з": "zcy",
				"З": "Zcy",
				"ѕ": "dscy",
				"Ѕ": "DScy",
				"и": "icy",
				"И": "Icy",
				"і": "iukcy",
				"І": "Iukcy",
				"ї": "yicy",
				"Ї": "YIcy",
				"й": "jcy",
				"Й": "Jcy",
				"ј": "jsercy",
				"Ј": "Jsercy",
				"к": "kcy",
				"К": "Kcy",
				"ќ": "kjcy",
				"Ќ": "KJcy",
				"л": "lcy",
				"Л": "Lcy",
				"љ": "ljcy",
				"Љ": "LJcy",
				"м": "mcy",
				"М": "Mcy",
				"н": "ncy",
				"Н": "Ncy",
				"њ": "njcy",
				"Њ": "NJcy",
				"о": "ocy",
				"О": "Ocy",
				"п": "pcy",
				"П": "Pcy",
				"р": "rcy",
				"Р": "Rcy",
				"с": "scy",
				"С": "Scy",
				"т": "tcy",
				"Т": "Tcy",
				"ћ": "tshcy",
				"Ћ": "TSHcy",
				"у": "ucy",
				"У": "Ucy",
				"ў": "ubrcy",
				"Ў": "Ubrcy",
				"ф": "fcy",
				"Ф": "Fcy",
				"х": "khcy",
				"Х": "KHcy",
				"ц": "tscy",
				"Ц": "TScy",
				"ч": "chcy",
				"Ч": "CHcy",
				"џ": "dzcy",
				"Џ": "DZcy",
				"ш": "shcy",
				"Ш": "SHcy",
				"щ": "shchcy",
				"Щ": "SHCHcy",
				"ъ": "hardcy",
				"Ъ": "HARDcy",
				"ы": "ycy",
				"Ы": "Ycy",
				"ь": "softcy",
				"Ь": "SOFTcy",
				"э": "ecy",
				"Э": "Ecy",
				"ю": "yucy",
				"Ю": "YUcy",
				"я": "yacy",
				"Я": "YAcy",
				"ℵ": "aleph",
				"ℶ": "beth",
				"ℷ": "gimel",
				"ℸ": "daleth"
			},
			p = /["&'<>`]/g,
			d = {
				'"': "&quot;",
				"&": "&amp;",
				"'": "&#x27;",
				"<": "&lt;",
				">": "&gt;",
				"`": "&#x60;"
			},
			h = /&#(?:[xX][^a-fA-F0-9]|[^0-9xX])/,
			m = /[\0-\x08\x0B\x0E-\x1F\x7F-\x9F\uFDD0-\uFDEF\uFFFE\uFFFF]|[\uD83F\uD87F\uD8BF\uD8FF\uD93F\uD97F\uD9BF\uD9FF\uDA3F\uDA7F\uDABF\uDAFF\uDB3F\uDB7F\uDBBF\uDBFF][\uDFFE\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,
			g = /&#([0-9]+)(;?)|&#[xX]([a-fA-F0-9]+)(;?)|&([0-9a-zA-Z]+);|&(Aacute|Agrave|Atilde|Ccedil|Eacute|Egrave|Iacute|Igrave|Ntilde|Oacute|Ograve|Oslash|Otilde|Uacute|Ugrave|Yacute|aacute|agrave|atilde|brvbar|ccedil|curren|divide|eacute|egrave|frac12|frac14|frac34|iacute|igrave|iquest|middot|ntilde|oacute|ograve|oslash|otilde|plusmn|uacute|ugrave|yacute|AElig|Acirc|Aring|Ecirc|Icirc|Ocirc|THORN|Ucirc|acirc|acute|aelig|aring|cedil|ecirc|icirc|iexcl|laquo|micro|ocirc|pound|raquo|szlig|thorn|times|ucirc|Auml|COPY|Euml|Iuml|Ouml|QUOT|Uuml|auml|cent|copy|euml|iuml|macr|nbsp|ordf|ordm|ouml|para|quot|sect|sup1|sup2|sup3|uuml|yuml|AMP|ETH|REG|amp|deg|eth|not|reg|shy|uml|yen|GT|LT|gt|lt)([=a-zA-Z0-9])?/g,
			v = {
				aacute: "á",
				Aacute: "Á",
				abreve: "ă",
				Abreve: "Ă",
				ac: "∾",
				acd: "∿",
				acE: "∾̳",
				acirc: "â",
				Acirc: "Â",
				acute: "´",
				acy: "а",
				Acy: "А",
				aelig: "æ",
				AElig: "Æ",
				af: "⁡",
				afr: "𝔞",
				Afr: "𝔄",
				agrave: "à",
				Agrave: "À",
				alefsym: "ℵ",
				aleph: "ℵ",
				alpha: "α",
				Alpha: "Α",
				amacr: "ā",
				Amacr: "Ā",
				amalg: "⨿",
				amp: "&",
				AMP: "&",
				and: "∧",
				And: "⩓",
				andand: "⩕",
				andd: "⩜",
				andslope: "⩘",
				andv: "⩚",
				ang: "∠",
				ange: "⦤",
				angle: "∠",
				angmsd: "∡",
				angmsdaa: "⦨",
				angmsdab: "⦩",
				angmsdac: "⦪",
				angmsdad: "⦫",
				angmsdae: "⦬",
				angmsdaf: "⦭",
				angmsdag: "⦮",
				angmsdah: "⦯",
				angrt: "∟",
				angrtvb: "⊾",
				angrtvbd: "⦝",
				angsph: "∢",
				angst: "Å",
				angzarr: "⍼",
				aogon: "ą",
				Aogon: "Ą",
				aopf: "𝕒",
				Aopf: "𝔸",
				ap: "≈",
				apacir: "⩯",
				ape: "≊",
				apE: "⩰",
				apid: "≋",
				apos: "'",
				ApplyFunction: "⁡",
				approx: "≈",
				approxeq: "≊",
				aring: "å",
				Aring: "Å",
				ascr: "𝒶",
				Ascr: "𝒜",
				Assign: "≔",
				ast: "*",
				asymp: "≈",
				asympeq: "≍",
				atilde: "ã",
				Atilde: "Ã",
				auml: "ä",
				Auml: "Ä",
				awconint: "∳",
				awint: "⨑",
				backcong: "≌",
				backepsilon: "϶",
				backprime: "‵",
				backsim: "∽",
				backsimeq: "⋍",
				Backslash: "∖",
				Barv: "⫧",
				barvee: "⊽",
				barwed: "⌅",
				Barwed: "⌆",
				barwedge: "⌅",
				bbrk: "⎵",
				bbrktbrk: "⎶",
				bcong: "≌",
				bcy: "б",
				Bcy: "Б",
				bdquo: "„",
				becaus: "∵",
				because: "∵",
				Because: "∵",
				bemptyv: "⦰",
				bepsi: "϶",
				bernou: "ℬ",
				Bernoullis: "ℬ",
				beta: "β",
				Beta: "Β",
				beth: "ℶ",
				between: "≬",
				bfr: "𝔟",
				Bfr: "𝔅",
				bigcap: "⋂",
				bigcirc: "◯",
				bigcup: "⋃",
				bigodot: "⨀",
				bigoplus: "⨁",
				bigotimes: "⨂",
				bigsqcup: "⨆",
				bigstar: "★",
				bigtriangledown: "▽",
				bigtriangleup: "△",
				biguplus: "⨄",
				bigvee: "⋁",
				bigwedge: "⋀",
				bkarow: "⤍",
				blacklozenge: "⧫",
				blacksquare: "▪",
				blacktriangle: "▴",
				blacktriangledown: "▾",
				blacktriangleleft: "◂",
				blacktriangleright: "▸",
				blank: "␣",
				blk12: "▒",
				blk14: "░",
				blk34: "▓",
				block: "█",
				bne: "=⃥",
				bnequiv: "≡⃥",
				bnot: "⌐",
				bNot: "⫭",
				bopf: "𝕓",
				Bopf: "𝔹",
				bot: "⊥",
				bottom: "⊥",
				bowtie: "⋈",
				boxbox: "⧉",
				boxdl: "┐",
				boxdL: "╕",
				boxDl: "╖",
				boxDL: "╗",
				boxdr: "┌",
				boxdR: "╒",
				boxDr: "╓",
				boxDR: "╔",
				boxh: "─",
				boxH: "═",
				boxhd: "┬",
				boxhD: "╥",
				boxHd: "╤",
				boxHD: "╦",
				boxhu: "┴",
				boxhU: "╨",
				boxHu: "╧",
				boxHU: "╩",
				boxminus: "⊟",
				boxplus: "⊞",
				boxtimes: "⊠",
				boxul: "┘",
				boxuL: "╛",
				boxUl: "╜",
				boxUL: "╝",
				boxur: "└",
				boxuR: "╘",
				boxUr: "╙",
				boxUR: "╚",
				boxv: "│",
				boxV: "║",
				boxvh: "┼",
				boxvH: "╪",
				boxVh: "╫",
				boxVH: "╬",
				boxvl: "┤",
				boxvL: "╡",
				boxVl: "╢",
				boxVL: "╣",
				boxvr: "├",
				boxvR: "╞",
				boxVr: "╟",
				boxVR: "╠",
				bprime: "‵",
				breve: "˘",
				Breve: "˘",
				brvbar: "¦",
				bscr: "𝒷",
				Bscr: "ℬ",
				bsemi: "⁏",
				bsim: "∽",
				bsime: "⋍",
				bsol: "\\",
				bsolb: "⧅",
				bsolhsub: "⟈",
				bull: "•",
				bullet: "•",
				bump: "≎",
				bumpe: "≏",
				bumpE: "⪮",
				bumpeq: "≏",
				Bumpeq: "≎",
				cacute: "ć",
				Cacute: "Ć",
				cap: "∩",
				Cap: "⋒",
				capand: "⩄",
				capbrcup: "⩉",
				capcap: "⩋",
				capcup: "⩇",
				capdot: "⩀",
				CapitalDifferentialD: "ⅅ",
				caps: "∩︀",
				caret: "⁁",
				caron: "ˇ",
				Cayleys: "ℭ",
				ccaps: "⩍",
				ccaron: "č",
				Ccaron: "Č",
				ccedil: "ç",
				Ccedil: "Ç",
				ccirc: "ĉ",
				Ccirc: "Ĉ",
				Cconint: "∰",
				ccups: "⩌",
				ccupssm: "⩐",
				cdot: "ċ",
				Cdot: "Ċ",
				cedil: "¸",
				Cedilla: "¸",
				cemptyv: "⦲",
				cent: "¢",
				centerdot: "·",
				CenterDot: "·",
				cfr: "𝔠",
				Cfr: "ℭ",
				chcy: "ч",
				CHcy: "Ч",
				check: "✓",
				checkmark: "✓",
				chi: "χ",
				Chi: "Χ",
				cir: "○",
				circ: "ˆ",
				circeq: "≗",
				circlearrowleft: "↺",
				circlearrowright: "↻",
				circledast: "⊛",
				circledcirc: "⊚",
				circleddash: "⊝",
				CircleDot: "⊙",
				circledR: "®",
				circledS: "Ⓢ",
				CircleMinus: "⊖",
				CirclePlus: "⊕",
				CircleTimes: "⊗",
				cire: "≗",
				cirE: "⧃",
				cirfnint: "⨐",
				cirmid: "⫯",
				cirscir: "⧂",
				ClockwiseContourIntegral: "∲",
				CloseCurlyDoubleQuote: "”",
				CloseCurlyQuote: "’",
				clubs: "♣",
				clubsuit: "♣",
				colon: ":",
				Colon: "∷",
				colone: "≔",
				Colone: "⩴",
				coloneq: "≔",
				comma: ",",
				commat: "@",
				comp: "∁",
				compfn: "∘",
				complement: "∁",
				complexes: "ℂ",
				cong: "≅",
				congdot: "⩭",
				Congruent: "≡",
				conint: "∮",
				Conint: "∯",
				ContourIntegral: "∮",
				copf: "𝕔",
				Copf: "ℂ",
				coprod: "∐",
				Coproduct: "∐",
				copy: "©",
				COPY: "©",
				copysr: "℗",
				CounterClockwiseContourIntegral: "∳",
				crarr: "↵",
				cross: "✗",
				Cross: "⨯",
				cscr: "𝒸",
				Cscr: "𝒞",
				csub: "⫏",
				csube: "⫑",
				csup: "⫐",
				csupe: "⫒",
				ctdot: "⋯",
				cudarrl: "⤸",
				cudarrr: "⤵",
				cuepr: "⋞",
				cuesc: "⋟",
				cularr: "↶",
				cularrp: "⤽",
				cup: "∪",
				Cup: "⋓",
				cupbrcap: "⩈",
				cupcap: "⩆",
				CupCap: "≍",
				cupcup: "⩊",
				cupdot: "⊍",
				cupor: "⩅",
				cups: "∪︀",
				curarr: "↷",
				curarrm: "⤼",
				curlyeqprec: "⋞",
				curlyeqsucc: "⋟",
				curlyvee: "⋎",
				curlywedge: "⋏",
				curren: "¤",
				curvearrowleft: "↶",
				curvearrowright: "↷",
				cuvee: "⋎",
				cuwed: "⋏",
				cwconint: "∲",
				cwint: "∱",
				cylcty: "⌭",
				dagger: "†",
				Dagger: "‡",
				daleth: "ℸ",
				darr: "↓",
				dArr: "⇓",
				Darr: "↡",
				dash: "‐",
				dashv: "⊣",
				Dashv: "⫤",
				dbkarow: "⤏",
				dblac: "˝",
				dcaron: "ď",
				Dcaron: "Ď",
				dcy: "д",
				Dcy: "Д",
				dd: "ⅆ",
				DD: "ⅅ",
				ddagger: "‡",
				ddarr: "⇊",
				DDotrahd: "⤑",
				ddotseq: "⩷",
				deg: "°",
				Del: "∇",
				delta: "δ",
				Delta: "Δ",
				demptyv: "⦱",
				dfisht: "⥿",
				dfr: "𝔡",
				Dfr: "𝔇",
				dHar: "⥥",
				dharl: "⇃",
				dharr: "⇂",
				DiacriticalAcute: "´",
				DiacriticalDot: "˙",
				DiacriticalDoubleAcute: "˝",
				DiacriticalGrave: "`",
				DiacriticalTilde: "˜",
				diam: "⋄",
				diamond: "⋄",
				Diamond: "⋄",
				diamondsuit: "♦",
				diams: "♦",
				die: "¨",
				DifferentialD: "ⅆ",
				digamma: "ϝ",
				disin: "⋲",
				div: "÷",
				divide: "÷",
				divideontimes: "⋇",
				divonx: "⋇",
				djcy: "ђ",
				DJcy: "Ђ",
				dlcorn: "⌞",
				dlcrop: "⌍",
				dollar: "$",
				dopf: "𝕕",
				Dopf: "𝔻",
				dot: "˙",
				Dot: "¨",
				DotDot: "⃜",
				doteq: "≐",
				doteqdot: "≑",
				DotEqual: "≐",
				dotminus: "∸",
				dotplus: "∔",
				dotsquare: "⊡",
				doublebarwedge: "⌆",
				DoubleContourIntegral: "∯",
				DoubleDot: "¨",
				DoubleDownArrow: "⇓",
				DoubleLeftArrow: "⇐",
				DoubleLeftRightArrow: "⇔",
				DoubleLeftTee: "⫤",
				DoubleLongLeftArrow: "⟸",
				DoubleLongLeftRightArrow: "⟺",
				DoubleLongRightArrow: "⟹",
				DoubleRightArrow: "⇒",
				DoubleRightTee: "⊨",
				DoubleUpArrow: "⇑",
				DoubleUpDownArrow: "⇕",
				DoubleVerticalBar: "∥",
				downarrow: "↓",
				Downarrow: "⇓",
				DownArrow: "↓",
				DownArrowBar: "⤓",
				DownArrowUpArrow: "⇵",
				DownBreve: "̑",
				downdownarrows: "⇊",
				downharpoonleft: "⇃",
				downharpoonright: "⇂",
				DownLeftRightVector: "⥐",
				DownLeftTeeVector: "⥞",
				DownLeftVector: "↽",
				DownLeftVectorBar: "⥖",
				DownRightTeeVector: "⥟",
				DownRightVector: "⇁",
				DownRightVectorBar: "⥗",
				DownTee: "⊤",
				DownTeeArrow: "↧",
				drbkarow: "⤐",
				drcorn: "⌟",
				drcrop: "⌌",
				dscr: "𝒹",
				Dscr: "𝒟",
				dscy: "ѕ",
				DScy: "Ѕ",
				dsol: "⧶",
				dstrok: "đ",
				Dstrok: "Đ",
				dtdot: "⋱",
				dtri: "▿",
				dtrif: "▾",
				duarr: "⇵",
				duhar: "⥯",
				dwangle: "⦦",
				dzcy: "џ",
				DZcy: "Џ",
				dzigrarr: "⟿",
				eacute: "é",
				Eacute: "É",
				easter: "⩮",
				ecaron: "ě",
				Ecaron: "Ě",
				ecir: "≖",
				ecirc: "ê",
				Ecirc: "Ê",
				ecolon: "≕",
				ecy: "э",
				Ecy: "Э",
				eDDot: "⩷",
				edot: "ė",
				eDot: "≑",
				Edot: "Ė",
				ee: "ⅇ",
				efDot: "≒",
				efr: "𝔢",
				Efr: "𝔈",
				eg: "⪚",
				egrave: "è",
				Egrave: "È",
				egs: "⪖",
				egsdot: "⪘",
				el: "⪙",
				Element: "∈",
				elinters: "⏧",
				ell: "ℓ",
				els: "⪕",
				elsdot: "⪗",
				emacr: "ē",
				Emacr: "Ē",
				empty: "∅",
				emptyset: "∅",
				EmptySmallSquare: "◻",
				emptyv: "∅",
				EmptyVerySmallSquare: "▫",
				emsp: " ",
				emsp13: " ",
				emsp14: " ",
				eng: "ŋ",
				ENG: "Ŋ",
				ensp: " ",
				eogon: "ę",
				Eogon: "Ę",
				eopf: "𝕖",
				Eopf: "𝔼",
				epar: "⋕",
				eparsl: "⧣",
				eplus: "⩱",
				epsi: "ε",
				epsilon: "ε",
				Epsilon: "Ε",
				epsiv: "ϵ",
				eqcirc: "≖",
				eqcolon: "≕",
				eqsim: "≂",
				eqslantgtr: "⪖",
				eqslantless: "⪕",
				Equal: "⩵",
				equals: "=",
				EqualTilde: "≂",
				equest: "≟",
				Equilibrium: "⇌",
				equiv: "≡",
				equivDD: "⩸",
				eqvparsl: "⧥",
				erarr: "⥱",
				erDot: "≓",
				escr: "ℯ",
				Escr: "ℰ",
				esdot: "≐",
				esim: "≂",
				Esim: "⩳",
				eta: "η",
				Eta: "Η",
				eth: "ð",
				ETH: "Ð",
				euml: "ë",
				Euml: "Ë",
				euro: "€",
				excl: "!",
				exist: "∃",
				Exists: "∃",
				expectation: "ℰ",
				exponentiale: "ⅇ",
				ExponentialE: "ⅇ",
				fallingdotseq: "≒",
				fcy: "ф",
				Fcy: "Ф",
				female: "♀",
				ffilig: "ﬃ",
				fflig: "ﬀ",
				ffllig: "ﬄ",
				ffr: "𝔣",
				Ffr: "𝔉",
				filig: "ﬁ",
				FilledSmallSquare: "◼",
				FilledVerySmallSquare: "▪",
				fjlig: "fj",
				flat: "♭",
				fllig: "ﬂ",
				fltns: "▱",
				fnof: "ƒ",
				fopf: "𝕗",
				Fopf: "𝔽",
				forall: "∀",
				ForAll: "∀",
				fork: "⋔",
				forkv: "⫙",
				Fouriertrf: "ℱ",
				fpartint: "⨍",
				frac12: "½",
				frac13: "⅓",
				frac14: "¼",
				frac15: "⅕",
				frac16: "⅙",
				frac18: "⅛",
				frac23: "⅔",
				frac25: "⅖",
				frac34: "¾",
				frac35: "⅗",
				frac38: "⅜",
				frac45: "⅘",
				frac56: "⅚",
				frac58: "⅝",
				frac78: "⅞",
				frasl: "⁄",
				frown: "⌢",
				fscr: "𝒻",
				Fscr: "ℱ",
				gacute: "ǵ",
				gamma: "γ",
				Gamma: "Γ",
				gammad: "ϝ",
				Gammad: "Ϝ",
				gap: "⪆",
				gbreve: "ğ",
				Gbreve: "Ğ",
				Gcedil: "Ģ",
				gcirc: "ĝ",
				Gcirc: "Ĝ",
				gcy: "г",
				Gcy: "Г",
				gdot: "ġ",
				Gdot: "Ġ",
				ge: "≥",
				gE: "≧",
				gel: "⋛",
				gEl: "⪌",
				geq: "≥",
				geqq: "≧",
				geqslant: "⩾",
				ges: "⩾",
				gescc: "⪩",
				gesdot: "⪀",
				gesdoto: "⪂",
				gesdotol: "⪄",
				gesl: "⋛︀",
				gesles: "⪔",
				gfr: "𝔤",
				Gfr: "𝔊",
				gg: "≫",
				Gg: "⋙",
				ggg: "⋙",
				gimel: "ℷ",
				gjcy: "ѓ",
				GJcy: "Ѓ",
				gl: "≷",
				gla: "⪥",
				glE: "⪒",
				glj: "⪤",
				gnap: "⪊",
				gnapprox: "⪊",
				gne: "⪈",
				gnE: "≩",
				gneq: "⪈",
				gneqq: "≩",
				gnsim: "⋧",
				gopf: "𝕘",
				Gopf: "𝔾",
				grave: "`",
				GreaterEqual: "≥",
				GreaterEqualLess: "⋛",
				GreaterFullEqual: "≧",
				GreaterGreater: "⪢",
				GreaterLess: "≷",
				GreaterSlantEqual: "⩾",
				GreaterTilde: "≳",
				gscr: "ℊ",
				Gscr: "𝒢",
				gsim: "≳",
				gsime: "⪎",
				gsiml: "⪐",
				gt: ">",
				Gt: "≫",
				GT: ">",
				gtcc: "⪧",
				gtcir: "⩺",
				gtdot: "⋗",
				gtlPar: "⦕",
				gtquest: "⩼",
				gtrapprox: "⪆",
				gtrarr: "⥸",
				gtrdot: "⋗",
				gtreqless: "⋛",
				gtreqqless: "⪌",
				gtrless: "≷",
				gtrsim: "≳",
				gvertneqq: "≩︀",
				gvnE: "≩︀",
				Hacek: "ˇ",
				hairsp: " ",
				half: "½",
				hamilt: "ℋ",
				hardcy: "ъ",
				HARDcy: "Ъ",
				harr: "↔",
				hArr: "⇔",
				harrcir: "⥈",
				harrw: "↭",
				Hat: "^",
				hbar: "ℏ",
				hcirc: "ĥ",
				Hcirc: "Ĥ",
				hearts: "♥",
				heartsuit: "♥",
				hellip: "…",
				hercon: "⊹",
				hfr: "𝔥",
				Hfr: "ℌ",
				HilbertSpace: "ℋ",
				hksearow: "⤥",
				hkswarow: "⤦",
				hoarr: "⇿",
				homtht: "∻",
				hookleftarrow: "↩",
				hookrightarrow: "↪",
				hopf: "𝕙",
				Hopf: "ℍ",
				horbar: "―",
				HorizontalLine: "─",
				hscr: "𝒽",
				Hscr: "ℋ",
				hslash: "ℏ",
				hstrok: "ħ",
				Hstrok: "Ħ",
				HumpDownHump: "≎",
				HumpEqual: "≏",
				hybull: "⁃",
				hyphen: "‐",
				iacute: "í",
				Iacute: "Í",
				ic: "⁣",
				icirc: "î",
				Icirc: "Î",
				icy: "и",
				Icy: "И",
				Idot: "İ",
				iecy: "е",
				IEcy: "Е",
				iexcl: "¡",
				iff: "⇔",
				ifr: "𝔦",
				Ifr: "ℑ",
				igrave: "ì",
				Igrave: "Ì",
				ii: "ⅈ",
				iiiint: "⨌",
				iiint: "∭",
				iinfin: "⧜",
				iiota: "℩",
				ijlig: "ĳ",
				IJlig: "Ĳ",
				Im: "ℑ",
				imacr: "ī",
				Imacr: "Ī",
				image: "ℑ",
				ImaginaryI: "ⅈ",
				imagline: "ℐ",
				imagpart: "ℑ",
				imath: "ı",
				imof: "⊷",
				imped: "Ƶ",
				Implies: "⇒",
				in:"∈",
				incare: "℅",
				infin: "∞",
				infintie: "⧝",
				inodot: "ı",
				int: "∫",
				Int: "∬",
				intcal: "⊺",
				integers: "ℤ",
				Integral: "∫",
				intercal: "⊺",
				Intersection: "⋂",
				intlarhk: "⨗",
				intprod: "⨼",
				InvisibleComma: "⁣",
				InvisibleTimes: "⁢",
				iocy: "ё",
				IOcy: "Ё",
				iogon: "į",
				Iogon: "Į",
				iopf: "𝕚",
				Iopf: "𝕀",
				iota: "ι",
				Iota: "Ι",
				iprod: "⨼",
				iquest: "¿",
				iscr: "𝒾",
				Iscr: "ℐ",
				isin: "∈",
				isindot: "⋵",
				isinE: "⋹",
				isins: "⋴",
				isinsv: "⋳",
				isinv: "∈",
				it: "⁢",
				itilde: "ĩ",
				Itilde: "Ĩ",
				iukcy: "і",
				Iukcy: "І",
				iuml: "ï",
				Iuml: "Ï",
				jcirc: "ĵ",
				Jcirc: "Ĵ",
				jcy: "й",
				Jcy: "Й",
				jfr: "𝔧",
				Jfr: "𝔍",
				jmath: "ȷ",
				jopf: "𝕛",
				Jopf: "𝕁",
				jscr: "𝒿",
				Jscr: "𝒥",
				jsercy: "ј",
				Jsercy: "Ј",
				jukcy: "є",
				Jukcy: "Є",
				kappa: "κ",
				Kappa: "Κ",
				kappav: "ϰ",
				kcedil: "ķ",
				Kcedil: "Ķ",
				kcy: "к",
				Kcy: "К",
				kfr: "𝔨",
				Kfr: "𝔎",
				kgreen: "ĸ",
				khcy: "х",
				KHcy: "Х",
				kjcy: "ќ",
				KJcy: "Ќ",
				kopf: "𝕜",
				Kopf: "𝕂",
				kscr: "𝓀",
				Kscr: "𝒦",
				lAarr: "⇚",
				lacute: "ĺ",
				Lacute: "Ĺ",
				laemptyv: "⦴",
				lagran: "ℒ",
				lambda: "λ",
				Lambda: "Λ",
				lang: "⟨",
				Lang: "⟪",
				langd: "⦑",
				langle: "⟨",
				lap: "⪅",
				Laplacetrf: "ℒ",
				laquo: "«",
				larr: "←",
				lArr: "⇐",
				Larr: "↞",
				larrb: "⇤",
				larrbfs: "⤟",
				larrfs: "⤝",
				larrhk: "↩",
				larrlp: "↫",
				larrpl: "⤹",
				larrsim: "⥳",
				larrtl: "↢",
				lat: "⪫",
				latail: "⤙",
				lAtail: "⤛",
				late: "⪭",
				lates: "⪭︀",
				lbarr: "⤌",
				lBarr: "⤎",
				lbbrk: "❲",
				lbrace: "{",
				lbrack: "[",
				lbrke: "⦋",
				lbrksld: "⦏",
				lbrkslu: "⦍",
				lcaron: "ľ",
				Lcaron: "Ľ",
				lcedil: "ļ",
				Lcedil: "Ļ",
				lceil: "⌈",
				lcub: "{",
				lcy: "л",
				Lcy: "Л",
				ldca: "⤶",
				ldquo: "“",
				ldquor: "„",
				ldrdhar: "⥧",
				ldrushar: "⥋",
				ldsh: "↲",
				le: "≤",
				lE: "≦",
				LeftAngleBracket: "⟨",
				leftarrow: "←",
				Leftarrow: "⇐",
				LeftArrow: "←",
				LeftArrowBar: "⇤",
				LeftArrowRightArrow: "⇆",
				leftarrowtail: "↢",
				LeftCeiling: "⌈",
				LeftDoubleBracket: "⟦",
				LeftDownTeeVector: "⥡",
				LeftDownVector: "⇃",
				LeftDownVectorBar: "⥙",
				LeftFloor: "⌊",
				leftharpoondown: "↽",
				leftharpoonup: "↼",
				leftleftarrows: "⇇",
				leftrightarrow: "↔",
				Leftrightarrow: "⇔",
				LeftRightArrow: "↔",
				leftrightarrows: "⇆",
				leftrightharpoons: "⇋",
				leftrightsquigarrow: "↭",
				LeftRightVector: "⥎",
				LeftTee: "⊣",
				LeftTeeArrow: "↤",
				LeftTeeVector: "⥚",
				leftthreetimes: "⋋",
				LeftTriangle: "⊲",
				LeftTriangleBar: "⧏",
				LeftTriangleEqual: "⊴",
				LeftUpDownVector: "⥑",
				LeftUpTeeVector: "⥠",
				LeftUpVector: "↿",
				LeftUpVectorBar: "⥘",
				LeftVector: "↼",
				LeftVectorBar: "⥒",
				leg: "⋚",
				lEg: "⪋",
				leq: "≤",
				leqq: "≦",
				leqslant: "⩽",
				les: "⩽",
				lescc: "⪨",
				lesdot: "⩿",
				lesdoto: "⪁",
				lesdotor: "⪃",
				lesg: "⋚︀",
				lesges: "⪓",
				lessapprox: "⪅",
				lessdot: "⋖",
				lesseqgtr: "⋚",
				lesseqqgtr: "⪋",
				LessEqualGreater: "⋚",
				LessFullEqual: "≦",
				LessGreater: "≶",
				lessgtr: "≶",
				LessLess: "⪡",
				lesssim: "≲",
				LessSlantEqual: "⩽",
				LessTilde: "≲",
				lfisht: "⥼",
				lfloor: "⌊",
				lfr: "𝔩",
				Lfr: "𝔏",
				lg: "≶",
				lgE: "⪑",
				lHar: "⥢",
				lhard: "↽",
				lharu: "↼",
				lharul: "⥪",
				lhblk: "▄",
				ljcy: "љ",
				LJcy: "Љ",
				ll: "≪",
				Ll: "⋘",
				llarr: "⇇",
				llcorner: "⌞",
				Lleftarrow: "⇚",
				llhard: "⥫",
				lltri: "◺",
				lmidot: "ŀ",
				Lmidot: "Ŀ",
				lmoust: "⎰",
				lmoustache: "⎰",
				lnap: "⪉",
				lnapprox: "⪉",
				lne: "⪇",
				lnE: "≨",
				lneq: "⪇",
				lneqq: "≨",
				lnsim: "⋦",
				loang: "⟬",
				loarr: "⇽",
				lobrk: "⟦",
				longleftarrow: "⟵",
				Longleftarrow: "⟸",
				LongLeftArrow: "⟵",
				longleftrightarrow: "⟷",
				Longleftrightarrow: "⟺",
				LongLeftRightArrow: "⟷",
				longmapsto: "⟼",
				longrightarrow: "⟶",
				Longrightarrow: "⟹",
				LongRightArrow: "⟶",
				looparrowleft: "↫",
				looparrowright: "↬",
				lopar: "⦅",
				lopf: "𝕝",
				Lopf: "𝕃",
				loplus: "⨭",
				lotimes: "⨴",
				lowast: "∗",
				lowbar: "_",
				LowerLeftArrow: "↙",
				LowerRightArrow: "↘",
				loz: "◊",
				lozenge: "◊",
				lozf: "⧫",
				lpar: "(",
				lparlt: "⦓",
				lrarr: "⇆",
				lrcorner: "⌟",
				lrhar: "⇋",
				lrhard: "⥭",
				lrm: "‎",
				lrtri: "⊿",
				lsaquo: "‹",
				lscr: "𝓁",
				Lscr: "ℒ",
				lsh: "↰",
				Lsh: "↰",
				lsim: "≲",
				lsime: "⪍",
				lsimg: "⪏",
				lsqb: "[",
				lsquo: "‘",
				lsquor: "‚",
				lstrok: "ł",
				Lstrok: "Ł",
				lt: "<",
				Lt: "≪",
				LT: "<",
				ltcc: "⪦",
				ltcir: "⩹",
				ltdot: "⋖",
				lthree: "⋋",
				ltimes: "⋉",
				ltlarr: "⥶",
				ltquest: "⩻",
				ltri: "◃",
				ltrie: "⊴",
				ltrif: "◂",
				ltrPar: "⦖",
				lurdshar: "⥊",
				luruhar: "⥦",
				lvertneqq: "≨︀",
				lvnE: "≨︀",
				macr: "¯",
				male: "♂",
				malt: "✠",
				maltese: "✠",
				map: "↦",
				Map: "⤅",
				mapsto: "↦",
				mapstodown: "↧",
				mapstoleft: "↤",
				mapstoup: "↥",
				marker: "▮",
				mcomma: "⨩",
				mcy: "м",
				Mcy: "М",
				mdash: "—",
				mDDot: "∺",
				measuredangle: "∡",
				MediumSpace: " ",
				Mellintrf: "ℳ",
				mfr: "𝔪",
				Mfr: "𝔐",
				mho: "℧",
				micro: "µ",
				mid: "∣",
				midast: "*",
				midcir: "⫰",
				middot: "·",
				minus: "−",
				minusb: "⊟",
				minusd: "∸",
				minusdu: "⨪",
				MinusPlus: "∓",
				mlcp: "⫛",
				mldr: "…",
				mnplus: "∓",
				models: "⊧",
				mopf: "𝕞",
				Mopf: "𝕄",
				mp: "∓",
				mscr: "𝓂",
				Mscr: "ℳ",
				mstpos: "∾",
				mu: "μ",
				Mu: "Μ",
				multimap: "⊸",
				mumap: "⊸",
				nabla: "∇",
				nacute: "ń",
				Nacute: "Ń",
				nang: "∠⃒",
				nap: "≉",
				napE: "⩰̸",
				napid: "≋̸",
				napos: "ŉ",
				napprox: "≉",
				natur: "♮",
				natural: "♮",
				naturals: "ℕ",
				nbsp: " ",
				nbump: "≎̸",
				nbumpe: "≏̸",
				ncap: "⩃",
				ncaron: "ň",
				Ncaron: "Ň",
				ncedil: "ņ",
				Ncedil: "Ņ",
				ncong: "≇",
				ncongdot: "⩭̸",
				ncup: "⩂",
				ncy: "н",
				Ncy: "Н",
				ndash: "–",
				ne: "≠",
				nearhk: "⤤",
				nearr: "↗",
				neArr: "⇗",
				nearrow: "↗",
				nedot: "≐̸",
				NegativeMediumSpace: "​",
				NegativeThickSpace: "​",
				NegativeThinSpace: "​",
				NegativeVeryThinSpace: "​",
				nequiv: "≢",
				nesear: "⤨",
				nesim: "≂̸",
				NestedGreaterGreater: "≫",
				NestedLessLess: "≪",
				NewLine: "\n",
				nexist: "∄",
				nexists: "∄",
				nfr: "𝔫",
				Nfr: "𝔑",
				nge: "≱",
				ngE: "≧̸",
				ngeq: "≱",
				ngeqq: "≧̸",
				ngeqslant: "⩾̸",
				nges: "⩾̸",
				nGg: "⋙̸",
				ngsim: "≵",
				ngt: "≯",
				nGt: "≫⃒",
				ngtr: "≯",
				nGtv: "≫̸",
				nharr: "↮",
				nhArr: "⇎",
				nhpar: "⫲",
				ni: "∋",
				nis: "⋼",
				nisd: "⋺",
				niv: "∋",
				njcy: "њ",
				NJcy: "Њ",
				nlarr: "↚",
				nlArr: "⇍",
				nldr: "‥",
				nle: "≰",
				nlE: "≦̸",
				nleftarrow: "↚",
				nLeftarrow: "⇍",
				nleftrightarrow: "↮",
				nLeftrightarrow: "⇎",
				nleq: "≰",
				nleqq: "≦̸",
				nleqslant: "⩽̸",
				nles: "⩽̸",
				nless: "≮",
				nLl: "⋘̸",
				nlsim: "≴",
				nlt: "≮",
				nLt: "≪⃒",
				nltri: "⋪",
				nltrie: "⋬",
				nLtv: "≪̸",
				nmid: "∤",
				NoBreak: "⁠",
				NonBreakingSpace: " ",
				nopf: "𝕟",
				Nopf: "ℕ",
				not: "¬",
				Not: "⫬",
				NotCongruent: "≢",
				NotCupCap: "≭",
				NotDoubleVerticalBar: "∦",
				NotElement: "∉",
				NotEqual: "≠",
				NotEqualTilde: "≂̸",
				NotExists: "∄",
				NotGreater: "≯",
				NotGreaterEqual: "≱",
				NotGreaterFullEqual: "≧̸",
				NotGreaterGreater: "≫̸",
				NotGreaterLess: "≹",
				NotGreaterSlantEqual: "⩾̸",
				NotGreaterTilde: "≵",
				NotHumpDownHump: "≎̸",
				NotHumpEqual: "≏̸",
				notin: "∉",
				notindot: "⋵̸",
				notinE: "⋹̸",
				notinva: "∉",
				notinvb: "⋷",
				notinvc: "⋶",
				NotLeftTriangle: "⋪",
				NotLeftTriangleBar: "⧏̸",
				NotLeftTriangleEqual: "⋬",
				NotLess: "≮",
				NotLessEqual: "≰",
				NotLessGreater: "≸",
				NotLessLess: "≪̸",
				NotLessSlantEqual: "⩽̸",
				NotLessTilde: "≴",
				NotNestedGreaterGreater: "⪢̸",
				NotNestedLessLess: "⪡̸",
				notni: "∌",
				notniva: "∌",
				notnivb: "⋾",
				notnivc: "⋽",
				NotPrecedes: "⊀",
				NotPrecedesEqual: "⪯̸",
				NotPrecedesSlantEqual: "⋠",
				NotReverseElement: "∌",
				NotRightTriangle: "⋫",
				NotRightTriangleBar: "⧐̸",
				NotRightTriangleEqual: "⋭",
				NotSquareSubset: "⊏̸",
				NotSquareSubsetEqual: "⋢",
				NotSquareSuperset: "⊐̸",
				NotSquareSupersetEqual: "⋣",
				NotSubset: "⊂⃒",
				NotSubsetEqual: "⊈",
				NotSucceeds: "⊁",
				NotSucceedsEqual: "⪰̸",
				NotSucceedsSlantEqual: "⋡",
				NotSucceedsTilde: "≿̸",
				NotSuperset: "⊃⃒",
				NotSupersetEqual: "⊉",
				NotTilde: "≁",
				NotTildeEqual: "≄",
				NotTildeFullEqual: "≇",
				NotTildeTilde: "≉",
				NotVerticalBar: "∤",
				npar: "∦",
				nparallel: "∦",
				nparsl: "⫽⃥",
				npart: "∂̸",
				npolint: "⨔",
				npr: "⊀",
				nprcue: "⋠",
				npre: "⪯̸",
				nprec: "⊀",
				npreceq: "⪯̸",
				nrarr: "↛",
				nrArr: "⇏",
				nrarrc: "⤳̸",
				nrarrw: "↝̸",
				nrightarrow: "↛",
				nRightarrow: "⇏",
				nrtri: "⋫",
				nrtrie: "⋭",
				nsc: "⊁",
				nsccue: "⋡",
				nsce: "⪰̸",
				nscr: "𝓃",
				Nscr: "𝒩",
				nshortmid: "∤",
				nshortparallel: "∦",
				nsim: "≁",
				nsime: "≄",
				nsimeq: "≄",
				nsmid: "∤",
				nspar: "∦",
				nsqsube: "⋢",
				nsqsupe: "⋣",
				nsub: "⊄",
				nsube: "⊈",
				nsubE: "⫅̸",
				nsubset: "⊂⃒",
				nsubseteq: "⊈",
				nsubseteqq: "⫅̸",
				nsucc: "⊁",
				nsucceq: "⪰̸",
				nsup: "⊅",
				nsupe: "⊉",
				nsupE: "⫆̸",
				nsupset: "⊃⃒",
				nsupseteq: "⊉",
				nsupseteqq: "⫆̸",
				ntgl: "≹",
				ntilde: "ñ",
				Ntilde: "Ñ",
				ntlg: "≸",
				ntriangleleft: "⋪",
				ntrianglelefteq: "⋬",
				ntriangleright: "⋫",
				ntrianglerighteq: "⋭",
				nu: "ν",
				Nu: "Ν",
				num: "#",
				numero: "№",
				numsp: " ",
				nvap: "≍⃒",
				nvdash: "⊬",
				nvDash: "⊭",
				nVdash: "⊮",
				nVDash: "⊯",
				nvge: "≥⃒",
				nvgt: ">⃒",
				nvHarr: "⤄",
				nvinfin: "⧞",
				nvlArr: "⤂",
				nvle: "≤⃒",
				nvlt: "<⃒",
				nvltrie: "⊴⃒",
				nvrArr: "⤃",
				nvrtrie: "⊵⃒",
				nvsim: "∼⃒",
				nwarhk: "⤣",
				nwarr: "↖",
				nwArr: "⇖",
				nwarrow: "↖",
				nwnear: "⤧",
				oacute: "ó",
				Oacute: "Ó",
				oast: "⊛",
				ocir: "⊚",
				ocirc: "ô",
				Ocirc: "Ô",
				ocy: "о",
				Ocy: "О",
				odash: "⊝",
				odblac: "ő",
				Odblac: "Ő",
				odiv: "⨸",
				odot: "⊙",
				odsold: "⦼",
				oelig: "œ",
				OElig: "Œ",
				ofcir: "⦿",
				ofr: "𝔬",
				Ofr: "𝔒",
				ogon: "˛",
				ograve: "ò",
				Ograve: "Ò",
				ogt: "⧁",
				ohbar: "⦵",
				ohm: "Ω",
				oint: "∮",
				olarr: "↺",
				olcir: "⦾",
				olcross: "⦻",
				oline: "‾",
				olt: "⧀",
				omacr: "ō",
				Omacr: "Ō",
				omega: "ω",
				Omega: "Ω",
				omicron: "ο",
				Omicron: "Ο",
				omid: "⦶",
				ominus: "⊖",
				oopf: "𝕠",
				Oopf: "𝕆",
				opar: "⦷",
				OpenCurlyDoubleQuote: "“",
				OpenCurlyQuote: "‘",
				operp: "⦹",
				oplus: "⊕",
				or: "∨",
				Or: "⩔",
				orarr: "↻",
				ord: "⩝",
				order: "ℴ",
				orderof: "ℴ",
				ordf: "ª",
				ordm: "º",
				origof: "⊶",
				oror: "⩖",
				orslope: "⩗",
				orv: "⩛",
				oS: "Ⓢ",
				oscr: "ℴ",
				Oscr: "𝒪",
				oslash: "ø",
				Oslash: "Ø",
				osol: "⊘",
				otilde: "õ",
				Otilde: "Õ",
				otimes: "⊗",
				Otimes: "⨷",
				otimesas: "⨶",
				ouml: "ö",
				Ouml: "Ö",
				ovbar: "⌽",
				OverBar: "‾",
				OverBrace: "⏞",
				OverBracket: "⎴",
				OverParenthesis: "⏜",
				par: "∥",
				para: "¶",
				parallel: "∥",
				parsim: "⫳",
				parsl: "⫽",
				part: "∂",
				PartialD: "∂",
				pcy: "п",
				Pcy: "П",
				percnt: "%",
				period: ".",
				permil: "‰",
				perp: "⊥",
				pertenk: "‱",
				pfr: "𝔭",
				Pfr: "𝔓",
				phi: "φ",
				Phi: "Φ",
				phiv: "ϕ",
				phmmat: "ℳ",
				phone: "☎",
				pi: "π",
				Pi: "Π",
				pitchfork: "⋔",
				piv: "ϖ",
				planck: "ℏ",
				planckh: "ℎ",
				plankv: "ℏ",
				plus: "+",
				plusacir: "⨣",
				plusb: "⊞",
				pluscir: "⨢",
				plusdo: "∔",
				plusdu: "⨥",
				pluse: "⩲",
				PlusMinus: "±",
				plusmn: "±",
				plussim: "⨦",
				plustwo: "⨧",
				pm: "±",
				Poincareplane: "ℌ",
				pointint: "⨕",
				popf: "𝕡",
				Popf: "ℙ",
				pound: "£",
				pr: "≺",
				Pr: "⪻",
				prap: "⪷",
				prcue: "≼",
				pre: "⪯",
				prE: "⪳",
				prec: "≺",
				precapprox: "⪷",
				preccurlyeq: "≼",
				Precedes: "≺",
				PrecedesEqual: "⪯",
				PrecedesSlantEqual: "≼",
				PrecedesTilde: "≾",
				preceq: "⪯",
				precnapprox: "⪹",
				precneqq: "⪵",
				precnsim: "⋨",
				precsim: "≾",
				prime: "′",
				Prime: "″",
				primes: "ℙ",
				prnap: "⪹",
				prnE: "⪵",
				prnsim: "⋨",
				prod: "∏",
				Product: "∏",
				profalar: "⌮",
				profline: "⌒",
				profsurf: "⌓",
				prop: "∝",
				Proportion: "∷",
				Proportional: "∝",
				propto: "∝",
				prsim: "≾",
				prurel: "⊰",
				pscr: "𝓅",
				Pscr: "𝒫",
				psi: "ψ",
				Psi: "Ψ",
				puncsp: " ",
				qfr: "𝔮",
				Qfr: "𝔔",
				qint: "⨌",
				qopf: "𝕢",
				Qopf: "ℚ",
				qprime: "⁗",
				qscr: "𝓆",
				Qscr: "𝒬",
				quaternions: "ℍ",
				quatint: "⨖",
				quest: "?",
				questeq: "≟",
				quot: '"',
				QUOT: '"',
				rAarr: "⇛",
				race: "∽̱",
				racute: "ŕ",
				Racute: "Ŕ",
				radic: "√",
				raemptyv: "⦳",
				rang: "⟩",
				Rang: "⟫",
				rangd: "⦒",
				range: "⦥",
				rangle: "⟩",
				raquo: "»",
				rarr: "→",
				rArr: "⇒",
				Rarr: "↠",
				rarrap: "⥵",
				rarrb: "⇥",
				rarrbfs: "⤠",
				rarrc: "⤳",
				rarrfs: "⤞",
				rarrhk: "↪",
				rarrlp: "↬",
				rarrpl: "⥅",
				rarrsim: "⥴",
				rarrtl: "↣",
				Rarrtl: "⤖",
				rarrw: "↝",
				ratail: "⤚",
				rAtail: "⤜",
				ratio: "∶",
				rationals: "ℚ",
				rbarr: "⤍",
				rBarr: "⤏",
				RBarr: "⤐",
				rbbrk: "❳",
				rbrace: "}",
				rbrack: "]",
				rbrke: "⦌",
				rbrksld: "⦎",
				rbrkslu: "⦐",
				rcaron: "ř",
				Rcaron: "Ř",
				rcedil: "ŗ",
				Rcedil: "Ŗ",
				rceil: "⌉",
				rcub: "}",
				rcy: "р",
				Rcy: "Р",
				rdca: "⤷",
				rdldhar: "⥩",
				rdquo: "”",
				rdquor: "”",
				rdsh: "↳",
				Re: "ℜ",
				real: "ℜ",
				realine: "ℛ",
				realpart: "ℜ",
				reals: "ℝ",
				rect: "▭",
				reg: "®",
				REG: "®",
				ReverseElement: "∋",
				ReverseEquilibrium: "⇋",
				ReverseUpEquilibrium: "⥯",
				rfisht: "⥽",
				rfloor: "⌋",
				rfr: "𝔯",
				Rfr: "ℜ",
				rHar: "⥤",
				rhard: "⇁",
				rharu: "⇀",
				rharul: "⥬",
				rho: "ρ",
				Rho: "Ρ",
				rhov: "ϱ",
				RightAngleBracket: "⟩",
				rightarrow: "→",
				Rightarrow: "⇒",
				RightArrow: "→",
				RightArrowBar: "⇥",
				RightArrowLeftArrow: "⇄",
				rightarrowtail: "↣",
				RightCeiling: "⌉",
				RightDoubleBracket: "⟧",
				RightDownTeeVector: "⥝",
				RightDownVector: "⇂",
				RightDownVectorBar: "⥕",
				RightFloor: "⌋",
				rightharpoondown: "⇁",
				rightharpoonup: "⇀",
				rightleftarrows: "⇄",
				rightleftharpoons: "⇌",
				rightrightarrows: "⇉",
				rightsquigarrow: "↝",
				RightTee: "⊢",
				RightTeeArrow: "↦",
				RightTeeVector: "⥛",
				rightthreetimes: "⋌",
				RightTriangle: "⊳",
				RightTriangleBar: "⧐",
				RightTriangleEqual: "⊵",
				RightUpDownVector: "⥏",
				RightUpTeeVector: "⥜",
				RightUpVector: "↾",
				RightUpVectorBar: "⥔",
				RightVector: "⇀",
				RightVectorBar: "⥓",
				ring: "˚",
				risingdotseq: "≓",
				rlarr: "⇄",
				rlhar: "⇌",
				rlm: "‏",
				rmoust: "⎱",
				rmoustache: "⎱",
				rnmid: "⫮",
				roang: "⟭",
				roarr: "⇾",
				robrk: "⟧",
				ropar: "⦆",
				ropf: "𝕣",
				Ropf: "ℝ",
				roplus: "⨮",
				rotimes: "⨵",
				RoundImplies: "⥰",
				rpar: ")",
				rpargt: "⦔",
				rppolint: "⨒",
				rrarr: "⇉",
				Rrightarrow: "⇛",
				rsaquo: "›",
				rscr: "𝓇",
				Rscr: "ℛ",
				rsh: "↱",
				Rsh: "↱",
				rsqb: "]",
				rsquo: "’",
				rsquor: "’",
				rthree: "⋌",
				rtimes: "⋊",
				rtri: "▹",
				rtrie: "⊵",
				rtrif: "▸",
				rtriltri: "⧎",
				RuleDelayed: "⧴",
				ruluhar: "⥨",
				rx: "℞",
				sacute: "ś",
				Sacute: "Ś",
				sbquo: "‚",
				sc: "≻",
				Sc: "⪼",
				scap: "⪸",
				scaron: "š",
				Scaron: "Š",
				sccue: "≽",
				sce: "⪰",
				scE: "⪴",
				scedil: "ş",
				Scedil: "Ş",
				scirc: "ŝ",
				Scirc: "Ŝ",
				scnap: "⪺",
				scnE: "⪶",
				scnsim: "⋩",
				scpolint: "⨓",
				scsim: "≿",
				scy: "с",
				Scy: "С",
				sdot: "⋅",
				sdotb: "⊡",
				sdote: "⩦",
				searhk: "⤥",
				searr: "↘",
				seArr: "⇘",
				searrow: "↘",
				sect: "§",
				semi: ";",
				seswar: "⤩",
				setminus: "∖",
				setmn: "∖",
				sext: "✶",
				sfr: "𝔰",
				Sfr: "𝔖",
				sfrown: "⌢",
				sharp: "♯",
				shchcy: "щ",
				SHCHcy: "Щ",
				shcy: "ш",
				SHcy: "Ш",
				ShortDownArrow: "↓",
				ShortLeftArrow: "←",
				shortmid: "∣",
				shortparallel: "∥",
				ShortRightArrow: "→",
				ShortUpArrow: "↑",
				shy: "­",
				sigma: "σ",
				Sigma: "Σ",
				sigmaf: "ς",
				sigmav: "ς",
				sim: "∼",
				simdot: "⩪",
				sime: "≃",
				simeq: "≃",
				simg: "⪞",
				simgE: "⪠",
				siml: "⪝",
				simlE: "⪟",
				simne: "≆",
				simplus: "⨤",
				simrarr: "⥲",
				slarr: "←",
				SmallCircle: "∘",
				smallsetminus: "∖",
				smashp: "⨳",
				smeparsl: "⧤",
				smid: "∣",
				smile: "⌣",
				smt: "⪪",
				smte: "⪬",
				smtes: "⪬︀",
				softcy: "ь",
				SOFTcy: "Ь",
				sol: "/",
				solb: "⧄",
				solbar: "⌿",
				sopf: "𝕤",
				Sopf: "𝕊",
				spades: "♠",
				spadesuit: "♠",
				spar: "∥",
				sqcap: "⊓",
				sqcaps: "⊓︀",
				sqcup: "⊔",
				sqcups: "⊔︀",
				Sqrt: "√",
				sqsub: "⊏",
				sqsube: "⊑",
				sqsubset: "⊏",
				sqsubseteq: "⊑",
				sqsup: "⊐",
				sqsupe: "⊒",
				sqsupset: "⊐",
				sqsupseteq: "⊒",
				squ: "□",
				square: "□",
				Square: "□",
				SquareIntersection: "⊓",
				SquareSubset: "⊏",
				SquareSubsetEqual: "⊑",
				SquareSuperset: "⊐",
				SquareSupersetEqual: "⊒",
				SquareUnion: "⊔",
				squarf: "▪",
				squf: "▪",
				srarr: "→",
				sscr: "𝓈",
				Sscr: "𝒮",
				ssetmn: "∖",
				ssmile: "⌣",
				sstarf: "⋆",
				star: "☆",
				Star: "⋆",
				starf: "★",
				straightepsilon: "ϵ",
				straightphi: "ϕ",
				strns: "¯",
				sub: "⊂",
				Sub: "⋐",
				subdot: "⪽",
				sube: "⊆",
				subE: "⫅",
				subedot: "⫃",
				submult: "⫁",
				subne: "⊊",
				subnE: "⫋",
				subplus: "⪿",
				subrarr: "⥹",
				subset: "⊂",
				Subset: "⋐",
				subseteq: "⊆",
				subseteqq: "⫅",
				SubsetEqual: "⊆",
				subsetneq: "⊊",
				subsetneqq: "⫋",
				subsim: "⫇",
				subsub: "⫕",
				subsup: "⫓",
				succ: "≻",
				succapprox: "⪸",
				succcurlyeq: "≽",
				Succeeds: "≻",
				SucceedsEqual: "⪰",
				SucceedsSlantEqual: "≽",
				SucceedsTilde: "≿",
				succeq: "⪰",
				succnapprox: "⪺",
				succneqq: "⪶",
				succnsim: "⋩",
				succsim: "≿",
				SuchThat: "∋",
				sum: "∑",
				Sum: "∑",
				sung: "♪",
				sup: "⊃",
				Sup: "⋑",
				sup1: "¹",
				sup2: "²",
				sup3: "³",
				supdot: "⪾",
				supdsub: "⫘",
				supe: "⊇",
				supE: "⫆",
				supedot: "⫄",
				Superset: "⊃",
				SupersetEqual: "⊇",
				suphsol: "⟉",
				suphsub: "⫗",
				suplarr: "⥻",
				supmult: "⫂",
				supne: "⊋",
				supnE: "⫌",
				supplus: "⫀",
				supset: "⊃",
				Supset: "⋑",
				supseteq: "⊇",
				supseteqq: "⫆",
				supsetneq: "⊋",
				supsetneqq: "⫌",
				supsim: "⫈",
				supsub: "⫔",
				supsup: "⫖",
				swarhk: "⤦",
				swarr: "↙",
				swArr: "⇙",
				swarrow: "↙",
				swnwar: "⤪",
				szlig: "ß",
				Tab: "\t",
				target: "⌖",
				tau: "τ",
				Tau: "Τ",
				tbrk: "⎴",
				tcaron: "ť",
				Tcaron: "Ť",
				tcedil: "ţ",
				Tcedil: "Ţ",
				tcy: "т",
				Tcy: "Т",
				tdot: "⃛",
				telrec: "⌕",
				tfr: "𝔱",
				Tfr: "𝔗",
				there4: "∴",
				therefore: "∴",
				Therefore: "∴",
				theta: "θ",
				Theta: "Θ",
				thetasym: "ϑ",
				thetav: "ϑ",
				thickapprox: "≈",
				thicksim: "∼",
				ThickSpace: "  ",
				thinsp: " ",
				ThinSpace: " ",
				thkap: "≈",
				thksim: "∼",
				thorn: "þ",
				THORN: "Þ",
				tilde: "˜",
				Tilde: "∼",
				TildeEqual: "≃",
				TildeFullEqual: "≅",
				TildeTilde: "≈",
				times: "×",
				timesb: "⊠",
				timesbar: "⨱",
				timesd: "⨰",
				tint: "∭",
				toea: "⤨",
				top: "⊤",
				topbot: "⌶",
				topcir: "⫱",
				topf: "𝕥",
				Topf: "𝕋",
				topfork: "⫚",
				tosa: "⤩",
				tprime: "‴",
				trade: "™",
				TRADE: "™",
				triangle: "▵",
				triangledown: "▿",
				triangleleft: "◃",
				trianglelefteq: "⊴",
				triangleq: "≜",
				triangleright: "▹",
				trianglerighteq: "⊵",
				tridot: "◬",
				trie: "≜",
				triminus: "⨺",
				TripleDot: "⃛",
				triplus: "⨹",
				trisb: "⧍",
				tritime: "⨻",
				trpezium: "⏢",
				tscr: "𝓉",
				Tscr: "𝒯",
				tscy: "ц",
				TScy: "Ц",
				tshcy: "ћ",
				TSHcy: "Ћ",
				tstrok: "ŧ",
				Tstrok: "Ŧ",
				twixt: "≬",
				twoheadleftarrow: "↞",
				twoheadrightarrow: "↠",
				uacute: "ú",
				Uacute: "Ú",
				uarr: "↑",
				uArr: "⇑",
				Uarr: "↟",
				Uarrocir: "⥉",
				ubrcy: "ў",
				Ubrcy: "Ў",
				ubreve: "ŭ",
				Ubreve: "Ŭ",
				ucirc: "û",
				Ucirc: "Û",
				ucy: "у",
				Ucy: "У",
				udarr: "⇅",
				udblac: "ű",
				Udblac: "Ű",
				udhar: "⥮",
				ufisht: "⥾",
				ufr: "𝔲",
				Ufr: "𝔘",
				ugrave: "ù",
				Ugrave: "Ù",
				uHar: "⥣",
				uharl: "↿",
				uharr: "↾",
				uhblk: "▀",
				ulcorn: "⌜",
				ulcorner: "⌜",
				ulcrop: "⌏",
				ultri: "◸",
				umacr: "ū",
				Umacr: "Ū",
				uml: "¨",
				UnderBar: "_",
				UnderBrace: "⏟",
				UnderBracket: "⎵",
				UnderParenthesis: "⏝",
				Union: "⋃",
				UnionPlus: "⊎",
				uogon: "ų",
				Uogon: "Ų",
				uopf: "𝕦",
				Uopf: "𝕌",
				uparrow: "↑",
				Uparrow: "⇑",
				UpArrow: "↑",
				UpArrowBar: "⤒",
				UpArrowDownArrow: "⇅",
				updownarrow: "↕",
				Updownarrow: "⇕",
				UpDownArrow: "↕",
				UpEquilibrium: "⥮",
				upharpoonleft: "↿",
				upharpoonright: "↾",
				uplus: "⊎",
				UpperLeftArrow: "↖",
				UpperRightArrow: "↗",
				upsi: "υ",
				Upsi: "ϒ",
				upsih: "ϒ",
				upsilon: "υ",
				Upsilon: "Υ",
				UpTee: "⊥",
				UpTeeArrow: "↥",
				upuparrows: "⇈",
				urcorn: "⌝",
				urcorner: "⌝",
				urcrop: "⌎",
				uring: "ů",
				Uring: "Ů",
				urtri: "◹",
				uscr: "𝓊",
				Uscr: "𝒰",
				utdot: "⋰",
				utilde: "ũ",
				Utilde: "Ũ",
				utri: "▵",
				utrif: "▴",
				uuarr: "⇈",
				uuml: "ü",
				Uuml: "Ü",
				uwangle: "⦧",
				vangrt: "⦜",
				varepsilon: "ϵ",
				varkappa: "ϰ",
				varnothing: "∅",
				varphi: "ϕ",
				varpi: "ϖ",
				varpropto: "∝",
				varr: "↕",
				vArr: "⇕",
				varrho: "ϱ",
				varsigma: "ς",
				varsubsetneq: "⊊︀",
				varsubsetneqq: "⫋︀",
				varsupsetneq: "⊋︀",
				varsupsetneqq: "⫌︀",
				vartheta: "ϑ",
				vartriangleleft: "⊲",
				vartriangleright: "⊳",
				vBar: "⫨",
				Vbar: "⫫",
				vBarv: "⫩",
				vcy: "в",
				Vcy: "В",
				vdash: "⊢",
				vDash: "⊨",
				Vdash: "⊩",
				VDash: "⊫",
				Vdashl: "⫦",
				vee: "∨",
				Vee: "⋁",
				veebar: "⊻",
				veeeq: "≚",
				vellip: "⋮",
				verbar: "|",
				Verbar: "‖",
				vert: "|",
				Vert: "‖",
				VerticalBar: "∣",
				VerticalLine: "|",
				VerticalSeparator: "❘",
				VerticalTilde: "≀",
				VeryThinSpace: " ",
				vfr: "𝔳",
				Vfr: "𝔙",
				vltri: "⊲",
				vnsub: "⊂⃒",
				vnsup: "⊃⃒",
				vopf: "𝕧",
				Vopf: "𝕍",
				vprop: "∝",
				vrtri: "⊳",
				vscr: "𝓋",
				Vscr: "𝒱",
				vsubne: "⊊︀",
				vsubnE: "⫋︀",
				vsupne: "⊋︀",
				vsupnE: "⫌︀",
				Vvdash: "⊪",
				vzigzag: "⦚",
				wcirc: "ŵ",
				Wcirc: "Ŵ",
				wedbar: "⩟",
				wedge: "∧",
				Wedge: "⋀",
				wedgeq: "≙",
				weierp: "℘",
				wfr: "𝔴",
				Wfr: "𝔚",
				wopf: "𝕨",
				Wopf: "𝕎",
				wp: "℘",
				wr: "≀",
				wreath: "≀",
				wscr: "𝓌",
				Wscr: "𝒲",
				xcap: "⋂",
				xcirc: "◯",
				xcup: "⋃",
				xdtri: "▽",
				xfr: "𝔵",
				Xfr: "𝔛",
				xharr: "⟷",
				xhArr: "⟺",
				xi: "ξ",
				Xi: "Ξ",
				xlarr: "⟵",
				xlArr: "⟸",
				xmap: "⟼",
				xnis: "⋻",
				xodot: "⨀",
				xopf: "𝕩",
				Xopf: "𝕏",
				xoplus: "⨁",
				xotime: "⨂",
				xrarr: "⟶",
				xrArr: "⟹",
				xscr: "𝓍",
				Xscr: "𝒳",
				xsqcup: "⨆",
				xuplus: "⨄",
				xutri: "△",
				xvee: "⋁",
				xwedge: "⋀",
				yacute: "ý",
				Yacute: "Ý",
				yacy: "я",
				YAcy: "Я",
				ycirc: "ŷ",
				Ycirc: "Ŷ",
				ycy: "ы",
				Ycy: "Ы",
				yen: "¥",
				yfr: "𝔶",
				Yfr: "𝔜",
				yicy: "ї",
				YIcy: "Ї",
				yopf: "𝕪",
				Yopf: "𝕐",
				yscr: "𝓎",
				Yscr: "𝒴",
				yucy: "ю",
				YUcy: "Ю",
				yuml: "ÿ",
				Yuml: "Ÿ",
				zacute: "ź",
				Zacute: "Ź",
				zcaron: "ž",
				Zcaron: "Ž",
				zcy: "з",
				Zcy: "З",
				zdot: "ż",
				Zdot: "Ż",
				zeetrf: "ℨ",
				ZeroWidthSpace: "​",
				zeta: "ζ",
				Zeta: "Ζ",
				zfr: "𝔷",
				Zfr: "ℨ",
				zhcy: "ж",
				ZHcy: "Ж",
				zigrarr: "⇝",
				zopf: "𝕫",
				Zopf: "ℤ",
				zscr: "𝓏",
				Zscr: "𝒵",
				zwj: "‍",
				zwnj: "‌"
			},
			y = {
				aacute: "á",
				Aacute: "Á",
				acirc: "â",
				Acirc: "Â",
				acute: "´",
				aelig: "æ",
				AElig: "Æ",
				agrave: "à",
				Agrave: "À",
				amp: "&",
				AMP: "&",
				aring: "å",
				Aring: "Å",
				atilde: "ã",
				Atilde: "Ã",
				auml: "ä",
				Auml: "Ä",
				brvbar: "¦",
				ccedil: "ç",
				Ccedil: "Ç",
				cedil: "¸",
				cent: "¢",
				copy: "©",
				COPY: "©",
				curren: "¤",
				deg: "°",
				divide: "÷",
				eacute: "é",
				Eacute: "É",
				ecirc: "ê",
				Ecirc: "Ê",
				egrave: "è",
				Egrave: "È",
				eth: "ð",
				ETH: "Ð",
				euml: "ë",
				Euml: "Ë",
				frac12: "½",
				frac14: "¼",
				frac34: "¾",
				gt: ">",
				GT: ">",
				iacute: "í",
				Iacute: "Í",
				icirc: "î",
				Icirc: "Î",
				iexcl: "¡",
				igrave: "ì",
				Igrave: "Ì",
				iquest: "¿",
				iuml: "ï",
				Iuml: "Ï",
				laquo: "«",
				lt: "<",
				LT: "<",
				macr: "¯",
				micro: "µ",
				middot: "·",
				nbsp: " ",
				not: "¬",
				ntilde: "ñ",
				Ntilde: "Ñ",
				oacute: "ó",
				Oacute: "Ó",
				ocirc: "ô",
				Ocirc: "Ô",
				ograve: "ò",
				Ograve: "Ò",
				ordf: "ª",
				ordm: "º",
				oslash: "ø",
				Oslash: "Ø",
				otilde: "õ",
				Otilde: "Õ",
				ouml: "ö",
				Ouml: "Ö",
				para: "¶",
				plusmn: "±",
				pound: "£",
				quot: '"',
				QUOT: '"',
				raquo: "»",
				reg: "®",
				REG: "®",
				sect: "§",
				shy: "­",
				sup1: "¹",
				sup2: "²",
				sup3: "³",
				szlig: "ß",
				thorn: "þ",
				THORN: "Þ",
				times: "×",
				uacute: "ú",
				Uacute: "Ú",
				ucirc: "û",
				Ucirc: "Û",
				ugrave: "ù",
				Ugrave: "Ù",
				uml: "¨",
				uuml: "ü",
				Uuml: "Ü",
				yacute: "ý",
				Yacute: "Ý",
				yen: "¥",
				yuml: "ÿ"
			},
			b = {
				0 : "�",
				128 : "€",
				130 : "‚",
				131 : "ƒ",
				132 : "„",
				133 : "…",
				134 : "†",
				135 : "‡",
				136 : "ˆ",
				137 : "‰",
				138 : "Š",
				139 : "‹",
				140 : "Œ",
				142 : "Ž",
				145 : "‘",
				146 : "’",
				147 : "“",
				148 : "”",
				149 : "•",
				150 : "–",
				151 : "—",
				152 : "˜",
				153 : "™",
				154 : "š",
				155 : "›",
				156 : "œ",
				158 : "ž",
				159 : "Ÿ"
			},
			x = [1, 2, 3, 4, 5, 6, 7, 8, 11, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 64976, 64977, 64978, 64979, 64980, 64981, 64982, 64983, 64984, 64985, 64986, 64987, 64988, 64989, 64990, 64991, 64992, 64993, 64994, 64995, 64996, 64997, 64998, 64999, 65e3, 65001, 65002, 65003, 65004, 65005, 65006, 65007, 65534, 65535, 131070, 131071, 196606, 196607, 262142, 262143, 327678, 327679, 393214, 393215, 458750, 458751, 524286, 524287, 589822, 589823, 655358, 655359, 720894, 720895, 786430, 786431, 851966, 851967, 917502, 917503, 983038, 983039, 1048574, 1048575, 1114110, 1114111],
			S = String.fromCharCode,
			w = {}.hasOwnProperty,
			L = function(e, t) {
				return w.call(e, t)
			},
			k = function(e, t) {
				if (!e) return t;
				var n, r = {};
				for (n in t) r[n] = L(e, n) ? e[n] : t[n];
				return r
			},
			D = function(e, t) {
				var n = "";
				return e >= 55296 && e <= 57343 || e > 1114111 ? (t && A("character reference outside the permissible Unicode range"), "�") : L(b, e) ? (t && A("disallowed character reference"), b[e]) : (t &&
				function(e, t) {
					for (var n = -1,
					r = e.length; ++n < r;) if (e[n] == t) return ! 0;
					return ! 1
				} (x, e) && A("disallowed character reference"), e > 65535 && (n += S((e -= 65536) >>> 10 & 1023 | 55296), e = 56320 | 1023 & e), n += S(e))
			},
			E = function(e) {
				return "&#x" + e.toString(16).toUpperCase() + ";"
			},
			C = function(e) {
				return "&#" + e + ";"
			},
			A = function(e) {
				throw Error("Parse error: " + e)
			},
			T = function(e, t) { (t = k(t, T.options)).strict && m.test(e) && A("forbidden code point");
				var n = t.encodeEverything,
				r = t.useNamedReferences,
				a = t.allowUnsafeSymbols,
				i = t.decimal ? C: E,
				o = function(e) {
					return i(e.charCodeAt(0))
				};
				return n ? (e = e.replace(s,
				function(e) {
					return r && L(f, e) ? "&" + f[e] + ";": o(e)
				}), r && (e = e.replace(/&gt;\u20D2/g, "&nvgt;").replace(/&lt;\u20D2/g, "&nvlt;").replace(/&#x66;&#x6A;/g, "&fjlig;")), r && (e = e.replace(c,
				function(e) {
					return "&" + f[e] + ";"
				}))) : r ? (a || (e = e.replace(p,
				function(e) {
					return "&" + f[e] + ";"
				})), e = (e = e.replace(/&gt;\u20D2/g, "&nvgt;").replace(/&lt;\u20D2/g, "&nvlt;")).replace(c,
				function(e) {
					return "&" + f[e] + ";"
				})) : a || (e = e.replace(p, o)),
				e.replace(l,
				function(e) {
					var t = e.charCodeAt(0),
					n = e.charCodeAt(1);
					return i(1024 * (t - 55296) + n - 56320 + 65536)
				}).replace(u, o)
			};
			T.options = {
				allowUnsafeSymbols: !1,
				encodeEverything: !1,
				strict: !1,
				useNamedReferences: !1,
				decimal: !1
			};
			var U = function(e, t) {
				var n = (t = k(t, U.options)).strict;
				return n && h.test(e) && A("malformed character reference"),
				e.replace(g,
				function(e, r, a, i, o, l, s, u) {
					var c, f, p, d, h, m;
					return r ? (p = r, f = a, n && !f && A("character reference was not terminated by a semicolon"), c = parseInt(p, 10), D(c, n)) : i ? (d = i, f = o, n && !f && A("character reference was not terminated by a semicolon"), c = parseInt(d, 16), D(c, n)) : l ? (h = l, L(v, h) ? v[h] : (n && A("named character reference was not terminated by a semicolon"), e)) : (h = s, (m = u) && t.isAttributeValue ? (n && "=" == m && A("`&` did not start a character reference"), e) : (n && A("named character reference was not terminated by a semicolon"), y[h] + (m || "")))
				})
			};
			U.options = {
				isAttributeValue: !1,
				strict: !1
			};
			var O = {
				version: "1.1.1",
				encode: T,
				decode: U,
				escape: function(e) {
					return e.replace(p,
					function(e) {
						return d[e]
					})
				},
				unescape: U
			};
			void 0 === (r = function() {
				return O
			}.call(t, n, t, e)) || (e.exports = r)
		} ()
	}).call(t, n(113)(e))
},
function(e, t) {
	e.exports = function(e) {
		return e.webpackPolyfill || (e.deprecate = function() {},
		e.paths = [], e.children || (e.children = []), Object.defineProperty(e, "loaded", {
			enumerable: !0,
			get: function() {
				return e.l
			}
		}), Object.defineProperty(e, "id", {
			enumerable: !0,
			get: function() {
				return e.i
			}
		}), e.webpackPolyfill = 1),
		e
	}
},
function(e, t) {
	function n() {
		this.table = new Uint16Array(16),
		this.trans = new Uint16Array(288)
	}
	function r(e, t, n, r) {
		var a, i;
		for (a = 0; a < n; ++a) e[a] = 0;
		for (a = 0; a < 30 - n; ++a) e[a + n] = a / n | 0;
		for (i = r, a = 0; a < 30; ++a) t[a] = i,
		i += 1 << e[a]
	}
	function a(e, t, n, r) {
		var a, i;
		for (a = 0; a < 16; ++a) e.table[a] = 0;
		for (a = 0; a < r; ++a) e.table[t[n + a]]++;
		for (e.table[0] = 0, i = 0, a = 0; a < 16; ++a) w[a] = i,
		i += e.table[a];
		for (a = 0; a < r; ++a) t[n + a] && (e.trans[w[t[n + a]]++] = a)
	}
	function i(e) {
		e.bitcount--||(e.tag = e.source[e.sourceIndex++], e.bitcount = 7);
		var t = 1 & e.tag;
		return e.tag >>>= 1,
		t
	}
	function o(e, t, n) {
		if (!t) return n;
		for (; e.bitcount < 24;) e.tag |= e.source[e.sourceIndex++] << e.bitcount,
		e.bitcount += 8;
		var r = e.tag & 65535 >>> 16 - t;
		return e.tag >>>= t,
		e.bitcount -= t,
		r + n
	}
	function l(e, t) {
		for (; e.bitcount < 24;) e.tag |= e.source[e.sourceIndex++] << e.bitcount,
		e.bitcount += 8;
		var n = 0,
		r = 0,
		a = 0,
		i = e.tag;
		do {
			r = 2 * r + (1 & i), i >>>= 1, ++a, n += t.table[a], r -= t.table[a]
		} while ( r >= 0 );
		return e.tag = i,
		e.bitcount -= a,
		t.trans[n + r]
	}
	function s(e, t, n) {
		var r, i, s, u, c, f;
		for (r = o(e, 5, 257), i = o(e, 5, 1), s = o(e, 4, 4), u = 0; u < 19; ++u) S[u] = 0;
		for (u = 0; u < s; ++u) {
			var p = o(e, 3, 0);
			S[b[u]] = p
		}
		for (a(x, S, 0, 19), c = 0; c < r + i;) {
			var d = l(e, x);
			switch (d) {
			case 16:
				var h = S[c - 1];
				for (f = o(e, 2, 3); f; --f) S[c++] = h;
				break;
			case 17:
				for (f = o(e, 3, 3); f; --f) S[c++] = 0;
				break;
			case 18:
				for (f = o(e, 7, 11); f; --f) S[c++] = 0;
				break;
			default:
				S[c++] = d
			}
		}
		a(t, S, 0, r),
		a(n, S, r, i)
	}
	function u(e, t, n) {
		for (;;) {
			var r = l(e, t);
			if (256 === r) return f;
			if (r < 256) e.dest[e.destLen++] = r;
			else {
				var a, i, s, u;
				for (a = o(e, m[r -= 257], g[r]), i = l(e, n), u = s = e.destLen - o(e, v[i], y[i]); u < s + a; ++u) e.dest[e.destLen++] = e.dest[u]
			}
		}
	}
	function c(e) {
		for (var t, n, r; e.bitcount > 8;) e.sourceIndex--,
		e.bitcount -= 8;
		if (t = e.source[e.sourceIndex + 1], t = 256 * t + e.source[e.sourceIndex], n = e.source[e.sourceIndex + 3], n = 256 * n + e.source[e.sourceIndex + 2], t !== (65535 & ~n)) return p;
		for (e.sourceIndex += 4, r = t; r; --r) e.dest[e.destLen++] = e.source[e.sourceIndex++];
		return e.bitcount = 0,
		f
	}
	var f = 0,
	p = -3,
	d = new n,
	h = new n,
	m = new Uint8Array(30),
	g = new Uint16Array(30),
	v = new Uint8Array(30),
	y = new Uint16Array(30),
	b = new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]),
	x = new n,
	S = new Uint8Array(320),
	w = new Uint16Array(16); !
	function(e, t) {
		var n;
		for (n = 0; n < 7; ++n) e.table[n] = 0;
		for (e.table[7] = 24, e.table[8] = 152, e.table[9] = 112, n = 0; n < 24; ++n) e.trans[n] = 256 + n;
		for (n = 0; n < 144; ++n) e.trans[24 + n] = n;
		for (n = 0; n < 8; ++n) e.trans[168 + n] = 280 + n;
		for (n = 0; n < 112; ++n) e.trans[176 + n] = 144 + n;
		for (n = 0; n < 5; ++n) t.table[n] = 0;
		for (t.table[5] = 32, n = 0; n < 32; ++n) t.trans[n] = n
	} (d, h),
	r(m, g, 4, 3),
	r(v, y, 2, 1),
	m[28] = 0,
	g[28] = 258,
	e.exports = function(e, t) {
		var r, a, l = new
		function(e, t) {
			this.source = e,
			this.sourceIndex = 0,
			this.tag = 0,
			this.bitcount = 0,
			this.dest = t,
			this.destLen = 0,
			this.ltree = new n,
			this.dtree = new n
		} (e, t);
		do {
			switch (r = i(l), o(l, 2, 0)) {
			case 0:
				a = c(l);
				break;
			case 1:
				a = u(l, d, h);
				break;
			case 2:
				s(l, l.ltree, l.dtree),
				a = u(l, l.ltree, l.dtree);
				break;
			default:
				a = p
			}
			if (a !== f) throw new Error("Data error")
		} while (! r );
		return l.destLen < l.dest.length ? "function" == typeof l.dest.slice ? l.dest.slice(0, l.destLen) : l.dest.subarray(0, l.destLen) : l.dest
	}
},
function(e, t, n) {
	"use strict";
	function r(e) {
		return e && e.__esModule ? e: {
		default:
			e
		}
	}
	function a(e) { (e = e || {}).empty || ((0, c.checkArgument)(e.familyName, "When creating a new Font object, familyName is required."), (0, c.checkArgument)(e.styleName, "When creating a new Font object, styleName is required."), (0, c.checkArgument)(e.unitsPerEm, "When creating a new Font object, unitsPerEm is required."), (0, c.checkArgument)(e.ascender, "When creating a new Font object, ascender is required."), (0, c.checkArgument)(e.descender, "When creating a new Font object, descender is required."), (0, c.checkArgument)(e.descender < 0, "Descender should be negative (e.g. -512)."), this.names = {
			fontFamily: {
				en: e.familyName || " "
			},
			fontSubfamily: {
				en: e.styleName || " "
			},
			fullName: {
				en: e.fullName || e.familyName + " " + e.styleName
			},
			postScriptName: {
				en: e.postScriptName || e.familyName + e.styleName
			},
			designer: {
				en: e.designer || " "
			},
			designerURL: {
				en: e.designerURL || " "
			},
			manufacturer: {
				en: e.manufacturer || " "
			},
			manufacturerURL: {
				en: e.manufacturerURL || " "
			},
			license: {
				en: e.license || " "
			},
			licenseURL: {
				en: e.licenseURL || " "
			},
			version: {
				en: e.version || "Version 0.1"
			},
			description: {
				en: e.description || " "
			},
			copyright: {
				en: e.copyright || " "
			},
			trademark: {
				en: e.trademark || " "
			}
		},
		this.unitsPerEm = e.unitsPerEm || 1e3, this.ascender = e.ascender, this.descender = e.descender, this.createdTimestamp = e.createdTimestamp, this.tables = {
			os2: {
				usWeightClass: e.weightClass || this.usWeightClasses.MEDIUM,
				usWidthClass: e.widthClass || this.usWidthClasses.MEDIUM,
				fsSelection: e.fsSelection || this.fsSelectionValues.REGULAR
			}
		}),
		this.supported = !0,
		this.glyphs = new s.
	default.GlyphSet(this, e.glyphs || []),
		this.encoding = new l.DefaultEncoding(this),
		this.substitution = new u.
	default(this),
		this.kerningPairs = e.kerningPairs || {},
		this.tables = this.tables || {};
		var t = 0;
		if (e.substitutions) for (var n = 0; n < e.substitutions.length; n++) {
			var r = e.substitutions[n];
			this.substitution.add(r.type, r.data),
			r.type.includes("lig") && (t = Math.max(t, r.data.sub.length))
		}
		Object.defineProperty(this, "hinting", {
			get: function() {
				return this._hinting ? this._hinting: "truetype" === this.outlinesFormat ? this._hinting = new f.
			default(this):
				void 0
			}
		})
	}
	Object.defineProperty(t, "__esModule", {
		value: !0
	});
	var i = r(n(16)),
	o = r(n(116)),
	l = n(24),
	s = r(n(40)),
	u = r(n(138)),
	c = n(75),
	f = r(n(140));
	a.prototype.hasChar = function(e) {
		return null !== this.encoding.charToGlyphIndex(e)
	},
	a.prototype.charToGlyphIndex = function(e) {
		return this.encoding.charToGlyphIndex(e)
	},
	a.prototype.charToGlyph = function(e) {
		var t = this.charToGlyphIndex(e),
		n = this.glyphs.get(t);
		return n || (n = this.glyphs.get(0)),
		n
	},
	a.prototype.stringToGlyphs = function(e, t) {
		t = t || this.defaultRenderOptions;
		for (var n = [], r = 0; r < e.length; r += 1) {
			var a = e[r];
			n.push(this.charToGlyphIndex(a))
		}
		var i = n.length;
		if (t.features) {
			var o = t.script || this.substitution.getDefaultScriptName(),
			l = [];
			t.features.liga && (l = l.concat(this.substitution.getFeature("liga", o, t.language))),
			t.features.rlig && (l = l.concat(this.substitution.getFeature("rlig", o, t.language)));
			for (var s = 0; s < i; s += 1) for (var u = 0; u < l.length; u++) {
				for (var c = l[u], f = c.sub, p = f.length, d = 0; d < p && f[d] === n[s + d];) d++;
				d === p && (n.splice(s, p, c.by), i = i - p + 1)
			}
		}
		for (var h = new Array(i), m = this.glyphs.get(0), g = 0; g < i; g += 1) h[g] = this.glyphs.get(n[g]) || m;
		return h
	},
	a.prototype.nameToGlyphIndex = function(e) {
		return this.glyphNames.nameToGlyphIndex(e)
	},
	a.prototype.nameToGlyph = function(e) {
		var t = this.nameToGlyphIndex(e),
		n = this.glyphs.get(t);
		return n || (n = this.glyphs.get(0)),
		n
	},
	a.prototype.glyphIndexToName = function(e) {
		return this.glyphNames.glyphIndexToName ? this.glyphNames.glyphIndexToName(e) : ""
	},
	a.prototype.getKerningValue = function(e, t) {
		e = e.index || e,
		t = t.index || t;
		var n = this.getGposKerningValue;
		return n ? n(e, t) : this.kerningPairs[e + "," + t] || 0
	},
	a.prototype.defaultRenderOptions = {
		kerning: !0,
		features: {
			liga: !0,
			rlig: !0
		}
	},
	a.prototype.forEachGlyph = function(e, t, n, r, a, i) {
		t = void 0 !== t ? t: 0,
		n = void 0 !== n ? n: 0,
		r = void 0 !== r ? r: 72,
		a = a || this.defaultRenderOptions;
		for (var o = 1 / this.unitsPerEm * r,
		l = this.stringToGlyphs(e, a), s = 0; s < l.length; s += 1) {
			var u = l[s];
			if (i.call(this, u, t, n, r, a), u.advanceWidth && (t += u.advanceWidth * o), a.kerning && s < l.length - 1) {
				t += this.getKerningValue(u, l[s + 1]) * o
			}
			a.letterSpacing ? t += a.letterSpacing * r: a.tracking && (t += a.tracking / 1e3 * r)
		}
		return t
	},
	a.prototype.getPath = function(e, t, n, r, a) {
		var o = new i.
	default;
		return this.forEachGlyph(e, t, n, r, a,
		function(e, t, n, r) {
			var i = e.getPath(t, n, r, a, this);
			o.extend(i)
		}),
		o
	},
	a.prototype.getPaths = function(e, t, n, r, a) {
		var i = [];
		return this.forEachGlyph(e, t, n, r, a,
		function(e, t, n, r) {
			var o = e.getPath(t, n, r, a, this);
			i.push(o)
		}),
		i
	},
	a.prototype.getAdvanceWidth = function(e, t, n) {
		return this.forEachGlyph(e, 0, 0, t, n,
		function() {})
	},
	a.prototype.draw = function(e, t, n, r, a, i) {
		this.getPath(t, n, r, a, i).draw(e)
	},
	a.prototype.drawPoints = function(e, t, n, r, a, i) {
		this.forEachGlyph(t, n, r, a, i,
		function(t, n, r, a) {
			t.drawPoints(e, n, r, a)
		})
	},
	a.prototype.drawMetrics = function(e, t, n, r, a, i) {
		this.forEachGlyph(t, n, r, a, i,
		function(t, n, r, a) {
			t.drawMetrics(e, n, r, a)
		})
	},
	a.prototype.getEnglishName = function(e) {
		var t = this.names[e];
		if (t) return t.en
	},
	a.prototype.validate = function() {
		function e(e, t) {
			e || n.push(t)
		}
		function t(t) {
			var n = r.getEnglishName(t);
			e(n && n.trim().length > 0, "No English " + t + " specified.")
		}
		var n = [],
		r = this;
		t("fontFamily"),
		t("weightName"),
		t("manufacturer"),
		t("copyright"),
		t("version"),
		e(this.unitsPerEm > 0, "No unitsPerEm specified.")
	},
	a.prototype.toTables = function() {
		return o.
	default.fontToTable(this)
	},
	a.prototype.toBuffer = function() {
		return this.toArrayBuffer()
	},
	a.prototype.toArrayBuffer = function() {
		for (var e = this.toTables().encode(), t = new ArrayBuffer(e.length), n = new Uint8Array(t), r = 0; r < e.length; r++) n[r] = e[r];
		return t
	},
	a.prototype.download = function(e) {
		var t = this.getEnglishName("fontFamily"),
		r = this.getEnglishName("fontSubfamily");
		e = e || t.replace(/\s/g, "") + "-" + r + ".otf";
		var a = this.toArrayBuffer();
		if ((0, c.isBrowser)()) window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem,
		window.requestFileSystem(window.TEMPORARY, a.byteLength,
		function(t) {
			t.root.getFile(e, {
				create: !0
			},
			function(e) {
				e.createWriter(function(t) {
					var n = new DataView(a),
					r = new Blob([n], {
						type: "font/opentype"
					});
					t.write(r),
					t.addEventListener("writeend",
					function() {
						location.href = e.toURL()
					},
					!1)
				})
			})
		},
		function(e) {
			throw new Error(e.name + ": " + e.message)
		});
		else {
			var i = n(41),
			o = (0, c.arrayBufferToNodeBuffer)(a);
			i.writeFileSync(e, o)
		}
	},
	a.prototype.fsSelectionValues = {
		ITALIC: 1,
		UNDERSCORE: 2,
		NEGATIVE: 4,
		OUTLINED: 8,
		STRIKEOUT: 16,
		BOLD: 32,
		REGULAR: 64,
		USER_TYPO_METRICS: 128,
		WWS: 256,
		OBLIQUE: 512
	},
	a.prototype.usWidthClasses = {
		ULTRA_CONDENSED: 1,
		EXTRA_CONDENSED: 2,
		CONDENSED: 3,
		SEMI_CONDENSED: 4,
		MEDIUM: 5,
		SEMI_EXPANDED: 6,
		EXPANDED: 7,
		EXTRA_EXPANDED: 8,
		ULTRA_EXPANDED: 9
	},
	a.prototype.usWeightClasses = {
		THIN: 100,
		EXTRA_LIGHT: 200,
		LIGHT: 300,
		NORMAL: 400,
		MEDIUM: 500,
		SEMI_BOLD: 600,
		BOLD: 700,
		EXTRA_BOLD: 800,
		BLACK: 900
	},
	t.
default = a
},
function(e, t, n) {
	"use strict";
	function r(e) {
		return e && e.__esModule ? e: {
		default:
			e
		}
	}
	function a(e) {
		return Math.log(e) / Math.log(2) | 0
	}
	function i(e) {
		for (; e.length % 4 != 0;) e.push(0);
		for (var t = 0,
		n = 0; n < e.length; n += 4) t += (e[n] << 24) + (e[n + 1] << 16) + (e[n + 2] << 8) + e[n + 3];
		return t %= Math.pow(2, 32)
	}
	function o(e, t, n, r) {
		return new f.
	default.Record("Table Record", [{
			name: "tag",
			type: "TAG",
			value: void 0 !== e ? e: ""
		},
		{
			name: "checkSum",
			type: "ULONG",
			value: void 0 !== t ? t: 0
		},
		{
			name: "offset",
			type: "ULONG",
			value: void 0 !== n ? n: 0
		},
		{
			name: "length",
			type: "ULONG",
			value: void 0 !== r ? r: 0
		}])
	}
	function l(e) {
		var t = new f.
	default.Table("sfnt", [{
			name: "version",
			type: "TAG",
			value: "OTTO"
		},
		{
			name: "numTables",
			type: "USHORT",
			value: 0
		},
		{
			name: "searchRange",
			type: "USHORT",
			value: 0
		},
		{
			name: "entrySelector",
			type: "USHORT",
			value: 0
		},
		{
			name: "rangeShift",
			type: "USHORT",
			value: 0
		}]);
		t.tables = e,
		t.numTables = e.length;
		var n = Math.pow(2, a(t.numTables));
		t.searchRange = 16 * n,
		t.entrySelector = a(n),
		t.rangeShift = 16 * t.numTables - t.searchRange;
		for (var r = [], l = [], s = t.sizeOf() + o().sizeOf() * t.numTables; s % 4 != 0;) s += 1,
		l.push({
			name: "padding",
			type: "BYTE",
			value: 0
		});
		for (var u = 0; u < e.length; u += 1) {
			var p = e[u];
			c.
		default.argument(4 === p.tableName.length, "Table name" + p.tableName + " is invalid.");
			var d = p.sizeOf(),
			h = o(p.tableName, i(p.encode()), s, d);
			for (r.push({
				name: h.tag + " Table Record",
				type: "RECORD",
				value: h
			}), l.push({
				name: p.tableName + " table",
				type: "RECORD",
				value: p
			}), s += d, c.
		default.argument(!isNaN(s), "Something went wrong calculating the offset."); s % 4 != 0;) s += 1,
			l.push({
				name: "padding",
				type: "BYTE",
				value: 0
			})
		}
		return r.sort(function(e, t) {
			return e.value.tag > t.value.tag ? 1 : -1
		}),
		t.fields = t.fields.concat(r),
		t.fields = t.fields.concat(l),
		t
	}
	function s(e, t, n) {
		for (var r = 0; r < t.length; r += 1) {
			var a = e.charToGlyphIndex(t[r]);
			if (a > 0) {
				return e.glyphs.get(a).getMetrics()
			}
		}
		return n
	}
	Object.defineProperty(t, "__esModule", {
		value: !0
	});
	var u = r(n(11)),
	c = r(n(1)),
	f = r(n(2)),
	p = r(n(60)),
	d = r(n(61)),
	h = r(n(64)),
	m = r(n(65)),
	g = r(n(66)),
	v = r(n(67)),
	y = r(n(68)),
	b = r(n(69)),
	x = r(n(70)),
	S = r(n(71)),
	w = r(n(72)),
	L = r(n(73)),
	k = r(n(74));
	t.
default = {
		make: l,
		fontToTable: function(e) {
			for (var t = [], n = [], r = [], a = [], o = [], c = [], f = [], D = void 0, E = 0, C = 0, A = 0, T = 0, U = 0, O = 0; O < e.glyphs.length; O += 1) {
				var B = e.glyphs.get(O),
				R = 0 | B.unicode;
				if (isNaN(B.advanceWidth)) throw new Error("Glyph " + B.name + " (" + O + "): advanceWidth is not a number."); (D > R || void 0 === D) && R > 0 && (D = R),
				E < R && (E = R);
				var F = x.
			default.getUnicodeRange(R);
				if (F < 32) C |= 1 << F;
				else if (F < 64) A |= 1 << F - 32;
				else if (F < 96) T |= 1 << F - 64;
				else {
					if (! (F < 123)) throw new Error("Unicode ranges bits > 123 are reserved for internal usage");
					U |= 1 << F - 96
				}
				if (".notdef" !== B.name) {
					var N = B.getMetrics();
					t.push(N.xMin),
					n.push(N.yMin),
					r.push(N.xMax),
					a.push(N.yMax),
					c.push(N.leftSideBearing),
					f.push(N.rightSideBearing),
					o.push(B.advanceWidth)
				}
			}
			var M = {
				xMin: Math.min.apply(null, t),
				yMin: Math.min.apply(null, n),
				xMax: Math.max.apply(null, r),
				yMax: Math.max.apply(null, a),
				advanceWidthMax: Math.max.apply(null, o),
				advanceWidthAvg: function(e) {
					for (var t = 0,
					n = 0; n < e.length; n += 1) t += e[n];
					return t / e.length
				} (o),
				minLeftSideBearing: Math.min.apply(null, c),
				maxLeftSideBearing: Math.max.apply(null, c),
				minRightSideBearing: Math.min.apply(null, f)
			};
			M.ascender = e.ascender,
			M.descender = e.descender;
			var G = h.
		default.make({
				flags:
				3,
				unitsPerEm: e.unitsPerEm,
				xMin: M.xMin,
				yMin: M.yMin,
				xMax: M.xMax,
				yMax: M.yMax,
				lowestRecPPEM: 3,
				createdTimestamp: e.createdTimestamp
			}),
			I = m.
		default.make({
				ascender:
				M.ascender,
				descender: M.descender,
				advanceWidthMax: M.advanceWidthMax,
				minLeftSideBearing: M.minLeftSideBearing,
				minRightSideBearing: M.minRightSideBearing,
				xMaxExtent: M.maxLeftSideBearing + (M.xMax - M.xMin),
				numberOfHMetrics: e.glyphs.length
			}),
			P = y.
		default.make(e.glyphs.length),
			_ = x.
		default.make({
				xAvgCharWidth:
				Math.round(M.advanceWidthAvg),
				usWeightClass: e.tables.os2.usWeightClass,
				usWidthClass: e.tables.os2.usWidthClass,
				usFirstCharIndex: D,
				usLastCharIndex: E,
				ulUnicodeRange1: C,
				ulUnicodeRange2: A,
				ulUnicodeRange3: T,
				ulUnicodeRange4: U,
				fsSelection: e.tables.os2.fsSelection,
				sTypoAscender: M.ascender,
				sTypoDescender: M.descender,
				sTypoLineGap: 0,
				usWinAscent: M.yMax,
				usWinDescent: Math.abs(M.yMin),
				ulCodePageRange1: 1,
				sxHeight: s(e, "xyvw", {
					yMax: Math.round(M.ascender / 2)
				}).yMax,
				sCapHeight: s(e, "HIKLEFJMNTZBDPRAGOQSUVWXY", M).yMax,
				usDefaultChar: e.hasChar(" ") ? 32 : 0,
				usBreakChar: e.hasChar(" ") ? 32 : 0
			}),
			q = g.
		default.make(e.glyphs),
			W = p.
		default.make(e.glyphs),
			H = e.getEnglishName("fontFamily"),
			z = e.getEnglishName("fontSubfamily"),
			j = H + " " + z,
			V = e.getEnglishName("postScriptName");
			V || (V = H.replace(/\s/g, "") + "-" + z);
			var Y = {};
			for (var X in e.names) Y[X] = e.names[X];
			Y.uniqueID || (Y.uniqueID = {
				en: e.getEnglishName("manufacturer") + ":" + j
			}),
			Y.postScriptName || (Y.postScriptName = {
				en: V
			}),
			Y.preferredFamily || (Y.preferredFamily = e.names.fontFamily),
			Y.preferredSubfamily || (Y.preferredSubfamily = e.names.fontSubfamily);
			var Z = [],
			J = b.
		default.make(Y, Z),
			Q = Z.length > 0 ? v.
		default.make(Z):
			void 0,
			K = S.
		default.make(),
			$ = d.
		default.make(e.glyphs, {
				version: e.getEnglishName("version"),
				fullName: j,
				familyName: H,
				weightName: z,
				postScriptName: V,
				unitsPerEm: e.unitsPerEm,
				fontBBox: [0, M.yMin, M.ascender, M.advanceWidthMax]
			}),
			ee = e.metas && (0, u.
		default)(e.metas).length > 0 ? k.
		default.make(e.metas):
			void 0,
			te = [G, I, P, _, J, W, K, $, q];
			Q && te.push(Q),
			(0, u.
		default)(e.kerningPairs).length && (te.push(L.
		default.make(e)), e.tables.gsub || e.substitutions || e.substitution.getGsubTable(!0), e.tables.gsub.scripts[0].tag = "latn"),
			e.tables.gsub && te.push(w.
		default.make(e.tables.gsub)),
			ee && te.push(ee);
			for (var ne = l(te), re = i(ne.encode()), ae = ne.fields, ie = !1, oe = 0; oe < ae.length; oe += 1) if ("head table" === ae[oe].name) {
				ae[oe].value.checkSumAdjustment = 2981146554 - re,
				ie = !0;
				break
			}
			if (!ie) throw new Error("Could not find head table with checkSum to adjust.");
			return ne
		},
		computeCheckSum: i
	}
},
function(e, t, n) {
	n(118),
	e.exports = n(3).Object.keys
},
function(e, t, n) {
	var r = n(19),
	a = n(25);
	n(37)("keys",
	function() {
		return function(e) {
			return a(r(e))
		}
	})
},
function(e, t, n) {
	e.exports = {
	default:
		n(120),
		__esModule: !0
	}
},
function(e, t, n) {
	n(121);
	var r = n(3).Object;
	e.exports = function(e, t) {
		return r.create(e, t)
	}
},
function(e, t, n) {
	var r = n(5);
	r(r.S, "Object", {
		create: n(53)
	})
},
function(e, t, n) {
	e.exports = {
	default:
		n(123),
		__esModule: !0
	}
},
function(e, t, n) {
	n(124),
	n(50),
	n(125),
	n(133),
	n(135),
	e.exports = n(3).WeakMap
},
function(e, t) {},
function(e, t, n) {
	"use strict";
	var r, a = n(38)(0),
	i = n(52),
	o = n(17),
	l = n(47),
	s = n(129),
	u = n(4),
	c = n(10),
	f = n(59),
	p = o.getWeak,
	d = Object.isExtensible,
	h = s.ufstore,
	m = {},
	g = function(e) {
		return function() {
			return e(this, arguments.length > 0 ? arguments[0] : void 0)
		}
	},
	v = {
		get: function(e) {
			if (u(e)) {
				var t = p(e);
				return ! 0 === t ? h(f(this, "WeakMap")).get(e) : t ? t[this._i] : void 0
			}
		},
		set: function(e, t) {
			return s.def(f(this, "WeakMap"), e, t)
		}
	},
	y = e.exports = n(132)("WeakMap", g, v, s, !0, !0);
	c(function() {
		return 7 != (new y).set((Object.freeze || Object)(m), 7).get(m)
	}) && (l((r = s.getConstructor(g, "WeakMap")).prototype, v), o.NEED = !0, a(["delete", "has", "get", "set"],
	function(e) {
		var t = y.prototype,
		n = t[e];
		i(t, e,
		function(t, a) {
			if (u(t) && !d(t)) {
				this._f || (this._f = new r);
				var i = this._f[e](t, a);
				return "set" == e ? this: i
			}
			return n.call(this, t, a)
		})
	}))
},
function(e, t, n) {
	var r = n(127);
	e.exports = function(e, t) {
		return new(r(e))(t)
	}
},
function(e, t, n) {
	var r = n(4),
	a = n(128),
	i = n(6)("species");
	e.exports = function(e) {
		var t;
		return a(e) && ("function" != typeof(t = e.constructor) || t !== Array && !a(t.prototype) || (t = void 0), r(t) && null === (t = t[i]) && (t = void 0)),
		void 0 === t ? Array: t
	}
},
function(e, t, n) {
	var r = n(28);
	e.exports = Array.isArray ||
	function(e) {
		return "Array" == r(e)
	}
},
function(e, t, n) {
	"use strict";
	var r = n(57),
	a = n(17).getWeak,
	i = n(9),
	o = n(4),
	l = n(58),
	s = n(39),
	u = n(38),
	c = n(14),
	f = n(59),
	p = u(5),
	d = u(6),
	h = 0,
	m = function(e) {
		return e._l || (e._l = new g)
	},
	g = function() {
		this.a = []
	},
	v = function(e, t) {
		return p(e.a,
		function(e) {
			return e[0] === t
		})
	};
	g.prototype = {
		get: function(e) {
			var t = v(this, e);
			if (t) return t[1]
		},
		has: function(e) {
			return !! v(this, e)
		},
		set: function(e, t) {
			var n = v(this, e);
			n ? n[1] = t: this.a.push([e, t])
		},
		delete: function(e) {
			var t = d(this.a,
			function(t) {
				return t[0] === e
			});
			return~t && this.a.splice(t, 1),
			!!~t
		}
	},
	e.exports = {
		getConstructor: function(e, t, n, i) {
			var u = e(function(e, r) {
				l(e, u, t, "_i"),
				e._t = t,
				e._i = h++,
				e._l = void 0,
				void 0 != r && s(r, n, e[i], e)
			});
			return r(u.prototype, {
				delete: function(e) {
					if (!o(e)) return ! 1;
					var n = a(e);
					return ! 0 === n ? m(f(this, t)).delete(e) : n && c(n, this._i) && delete n[this._i]
				},
				has: function(e) {
					if (!o(e)) return ! 1;
					var n = a(e);
					return ! 0 === n ? m(f(this, t)).has(e) : n && c(n, this._i)
				}
			}),
			u
		},
		def: function(e, t, n) {
			var r = a(i(t), !0);
			return ! 0 === r ? m(e).set(t, n) : r[e._i] = n,
			e
		},
		ufstore: m
	}
},
function(e, t, n) {
	var r = n(9);
	e.exports = function(e, t, n, a) {
		try {
			return a ? t(r(n)[0], n[1]) : t(n)
		} catch(t) {
			var i = e.
			return;
			throw void 0 !== i && r(i.call(e)),
			t
		}
	}
},
function(e, t, n) {
	var r = n(15),
	a = n(6)("iterator"),
	i = Array.prototype;
	e.exports = function(e) {
		return void 0 !== e && (r.Array === e || i[a] === e)
	}
},
function(e, t, n) {
	"use strict";
	var r = n(7),
	a = n(5),
	i = n(17),
	o = n(10),
	l = n(8),
	s = n(57),
	u = n(39),
	c = n(58),
	f = n(4),
	p = n(35),
	d = n(12).f,
	h = n(38)(0),
	m = n(13);
	e.exports = function(e, t, n, g, v, y) {
		var b = r[e],
		x = b,
		S = v ? "set": "add",
		w = x && x.prototype,
		L = {};
		return m && "function" == typeof x && (y || w.forEach && !o(function() { (new x).entries().next()
		})) ? (x = t(function(t, n) {
			c(t, x, e, "_c"),
			t._c = new b,
			void 0 != n && u(n, v, t[S], t)
		}), h("add,clear,delete,forEach,get,has,set,keys,values,entries,toJSON".split(","),
		function(e) {
			var t = "add" == e || "set" == e;
			e in w && (!y || "clear" != e) && l(x.prototype, e,
			function(n, r) {
				if (c(this, x, e), !t && y && !f(n)) return "get" == e && void 0;
				var a = this._c[e](0 === n ? 0 : n, r);
				return t ? this: a
			})
		}), y || d(x.prototype, "size", {
			get: function() {
				return this._c.size
			}
		})) : (x = g.getConstructor(t, e, v, S), s(x.prototype, n), i.NEED = !0),
		p(x, e),
		L[e] = x,
		a(a.G + a.W + a.F, L),
		y || g.setStrong(x, e, v),
		x
	}
},
function(e, t, n) {
	n(134)("WeakMap")
},
function(e, t, n) {
	"use strict";
	var r = n(5);
	e.exports = function(e) {
		r(r.S, e, {
			of: function() {
				for (var e = arguments.length,
				t = new Array(e); e--;) t[e] = arguments[e];
				return new this(t)
			}
		})
	}
},
function(e, t, n) {
	n(136)("WeakMap")
},
function(e, t, n) {
	"use strict";
	var r = n(5),
	a = n(44),
	i = n(18),
	o = n(39);
	e.exports = function(e) {
		r(r.S, e, {
			from: function(e) {
				var t, n, r, l, s = arguments[1];
				return a(this),
				(t = void 0 !== s) && a(s),
				void 0 == e ? new this: (n = [], t ? (r = 0, l = i(s, arguments[2], 2), o(e, !1,
				function(e) {
					n.push(l(e, r++))
				})) : o(e, !1, n.push, n), new this(n))
			}
		})
	}
},
function(e, t, n) {
	"use strict";
	Object.defineProperty(t, "__esModule", {
		value: !0
	}),
	t.
default = {
		line: function(e, t, n, r, a) {
			e.beginPath(),
			e.moveTo(t, n),
			e.lineTo(r, a),
			e.stroke()
		}
	}
},
function(e, t, n) {
	"use strict";
	function r(e) {
		return e && e.__esModule ? e: {
		default:
			e
		}
	}
	function a(e) {
		s.
	default.call(this, e, "gsub")
	}
	function i(e, t) {
		var n = e.length;
		if (n !== t.length) return ! 1;
		for (var r = 0; r < n; r++) if (e[r] !== t[r]) return ! 1;
		return ! 0
	}
	function o(e, t, n) {
		for (var r = e.subtables,
		a = 0; a < r.length; a++) {
			var i = r[a];
			if (i.substFormat === t) return i
		}
		if (n) return r.push(n),
		n
	}
	Object.defineProperty(t, "__esModule", {
		value: !0
	});
	var l = r(n(1)),
	s = r(n(139)); (a.prototype = s.
default.prototype).getGsubTable = function(e) {
		var t = this.font.tables.gsub;
		return ! t && e && (this.font.tables.gsub = t = {
			version: 1,
			scripts: [{
				tag: "DFLT",
				script: {
					defaultLangSys: {
						reserved: 0,
						reqFeatureIndex: 65535,
						featureIndexes: []
					},
					langSysRecords: []
				}
			}],
			features: [],
			lookups: []
		}),
		t
	},
	a.prototype.createDefaultTable = function() {
		return {
			version: 1,
			scripts: [{
				tag: "DFLT",
				script: {
					defaultLangSys: {
						reserved: 0,
						reqFeatureIndex: 65535,
						featureIndexes: []
					},
					langSysRecords: []
				}
			}],
			features: [],
			lookups: []
		}
	},
	a.prototype.getSingle = function(e, t, n) {
		for (var r = [], a = this.getLookupTables(t, n, e, 1), i = 0; i < a.length; i++) for (var o = a[i].subtables, l = 0; l < o.length; l++) {
			var s = o[l],
			u = this.expandCoverage(s.coverage),
			c = void 0;
			if (1 === s.substFormat) {
				var f = s.deltaGlyphId;
				for (c = 0; c < u.length; c++) {
					var p = u[c];
					r.push({
						sub: p,
						by: p + f
					})
				}
			} else {
				var d = s.substitute;
				for (c = 0; c < u.length; c++) r.push({
					sub: u[c],
					by: d[c]
				})
			}
		}
		return r
	},
	a.prototype.getAlternates = function(e, t, n) {
		for (var r = [], a = this.getLookupTables(t, n, e, 3), i = 0; i < a.length; i++) for (var o = a[i].subtables, l = 0; l < o.length; l++) for (var s = o[l], u = this.expandCoverage(s.coverage), c = s.alternateSets, f = 0; f < u.length; f++) r.push({
			sub: u[f],
			by: c[f]
		});
		return r
	},
	a.prototype.getLigatures = function(e, t, n) {
		for (var r = [], a = this.getLookupTables(t, n, e, 4), i = 0; i < a.length; i++) for (var o = a[i].subtables, l = 0; l < o.length; l++) for (var s = o[l], u = this.expandCoverage(s.coverage), c = s.ligatureSets, f = 0; f < u.length; f++) for (var p = u[f], d = c[f], h = 0; h < d.length; h++) {
			var m = d[h];
			r.push({
				sub: [p].concat(m.components),
				by: m.ligGlyph
			})
		}
		return r
	},
	a.prototype.addSingle = function(e, t, n, r) {
		var a = o(this.getLookupTables(n, r, e, 1, !0)[0], 2, {
			substFormat: 2,
			coverage: {
				format: 1,
				glyphs: []
			},
			substitute: []
		});
		l.
	default.assert(1 === a.coverage.format, "Ligature: unable to modify coverage table format " + a.coverage.format);
		var i = t.sub,
		s = this.binSearch(a.coverage.glyphs, i);
		s < 0 && (s = -1 - s, a.coverage.glyphs.splice(s, 0, i), a.substitute.splice(s, 0, 0)),
		a.substitute[s] = t.by
	},
	a.prototype.addAlternate = function(e, t, n, r) {
		var a = o(this.getLookupTables(n, r, e, 3, !0)[0], 1, {
			substFormat: 1,
			coverage: {
				format: 1,
				glyphs: []
			},
			alternateSets: []
		});
		l.
	default.assert(1 === a.coverage.format, "Ligature: unable to modify coverage table format " + a.coverage.format);
		var i = t.sub,
		s = this.binSearch(a.coverage.glyphs, i);
		s < 0 && (s = -1 - s, a.coverage.glyphs.splice(s, 0, i), a.alternateSets.splice(s, 0, 0)),
		a.alternateSets[s] = t.by
	},
	a.prototype.addLigature = function(e, t, n, r) {
		n = n || "DFLT",
		r = r || "DFLT";
		var a = this.getLookupTables(n, r, e, 4, !0)[0],
		o = a.subtables[0];
		o || (o = {
			substFormat: 1,
			coverage: {
				format: 1,
				glyphs: []
			},
			ligatureSets: []
		},
		a.subtables[0] = o),
		l.
	default.assert(1 === o.coverage.format, "Ligature: unable to modify coverage table format " + o.coverage.format);
		var s = t.sub[0],
		u = t.sub.slice(1),
		c = {
			ligGlyph: t.by,
			components: u
		},
		f = this.binSearch(o.coverage.glyphs, s);
		if (f >= 0) {
			for (var p = o.ligatureSets[f], d = 0; d < p.length; d++) if (i(p[d].components, u)) return;
			p.push(c)
		} else f = -1 - f,
		o.coverage.glyphs.splice(f, 0, s),
		o.ligatureSets.splice(f, 0, [c])
	},
	a.prototype.getFeature = function(e, t, n) {
		if (/ss\d\d/.test(e)) return this.getSingle(e, t, n);
		switch (e) {
		case "aalt":
		case "salt":
			return this.getSingle(e, t, n).concat(this.getAlternates(e, t, n));
		case "dlig":
		case "liga":
		case "rlig":
			return this.getLigatures(e, t, n)
		}
	},
	a.prototype.add = function(e, t, n, r) {
		if (/ss\d\d/.test(e)) return this.addSingle(e, t, n, r);
		switch (e) {
		case "aalt":
		case "salt":
			return "number" == typeof t.by || 1 === t.by.length ? this.addSingle(e, t, n, r) : this.addAlternate(e, t, n, r);
		case "dlig":
		case "liga":
		case "rlig":
			return this.addLigature(e, t, n, r)
		}
	},
	t.
default = a
},
function(e, t, n) {
	"use strict";
	function r(e, t) {
		for (var n = 0,
		r = e.length - 1; n <= r;) {
			var a = n + r >>> 1,
			i = e[a].tag;
			if (i === t) return a;
			i < t ? n = a + 1 : r = a - 1
		}
		return - n - 1
	}
	function a(e, t) {
		this.font = e,
		this.tableName = t
	}
	Object.defineProperty(t, "__esModule", {
		value: !0
	});
	var i = function(e) {
		return e && e.__esModule ? e: {
		default:
			e
		}
	} (n(1));
	a.prototype = {
		searchTag: r,
		binSearch: function(e, t) {
			for (var n = 0,
			r = e.length - 1; n <= r;) {
				var a = n + r >>> 1,
				i = e[a];
				if (i === t) return a;
				i < t ? n = a + 1 : r = a - 1
			}
			return - n - 1
		},
		getTable: function(e) {
			var t = this.font.tables[this.tableName];
			return ! t && e && (t = this.font.tables[this.tableName] = this.createDefaultTable()),
			t
		},
		getScriptNames: function() {
			var e = this.getTable();
			return e ? e.scripts.map(function(e) {
				return e.tag
			}) : []
		},
		getDefaultScriptName: function() {
			var e = this.getTable();
			if (e) {
				for (var t = !1,
				n = 0; n < e.scripts.length; n++) {
					var r = e.scripts[n].tag;
					if ("DFLT" === r) return r;
					"latn" === r && (t = !0)
				}
				return t ? "latn": void 0
			}
		},
		getScriptTable: function(e, t) {
			var n = this.getTable(t);
			if (n) {
				e = e || "DFLT";
				var a = n.scripts,
				i = r(n.scripts, e);
				if (i >= 0) return a[i].script;
				if (t) {
					var o = {
						tag: e,
						script: {
							defaultLangSys: {
								reserved: 0,
								reqFeatureIndex: 65535,
								featureIndexes: []
							},
							langSysRecords: []
						}
					};
					return a.splice( - 1 - i, 0, o),
					o.script
				}
			}
		},
		getLangSysTable: function(e, t, n) {
			var a = this.getScriptTable(e, n);
			if (a) {
				if (!t || "dflt" === t || "DFLT" === t) return a.defaultLangSys;
				var i = r(a.langSysRecords, t);
				if (i >= 0) return a.langSysRecords[i].langSys;
				if (n) {
					var o = {
						tag: t,
						langSys: {
							reserved: 0,
							reqFeatureIndex: 65535,
							featureIndexes: []
						}
					};
					return a.langSysRecords.splice( - 1 - i, 0, o),
					o.langSys
				}
			}
		},
		getFeatureTable: function(e, t, n, r) {
			var a = this.getLangSysTable(e, t, r);
			if (a) {
				for (var o = void 0,
				l = a.featureIndexes,
				s = this.font.tables[this.tableName].features, u = 0; u < l.length; u++) if ((o = s[l[u]]).tag === n) return o.feature;
				if (r) {
					var c = s.length;
					return i.
				default.assert(0 === c || n >= s[c - 1].tag, "Features must be added in alphabetical order."),
					o = {
						tag: n,
						feature: {
							params: 0,
							lookupListIndexes: []
						}
					},
					s.push(o),
					l.push(c),
					o.feature
				}
			}
		},
		getLookupTables: function(e, t, n, r, a) {
			var i = this.getFeatureTable(e, t, n, a),
			o = [];
			if (i) {
				for (var l = void 0,
				s = i.lookupListIndexes,
				u = this.font.tables[this.tableName].lookups, c = 0; c < s.length; c++)(l = u[s[c]]).lookupType === r && o.push(l);
				if (0 === o.length && a) {
					l = {
						lookupType: r,
						lookupFlag: 0,
						subtables: [],
						markFilteringSet: void 0
					};
					var f = u.length;
					return u.push(l),
					s.push(f),
					[l]
				}
			}
			return o
		},
		expandCoverage: function(e) {
			if (1 === e.format) return e.glyphs;
			for (var t = [], n = e.ranges, r = 0; r < n.length; r++) for (var a = n[r], i = a.start, o = a.end, l = i; l <= o; l++) t.push(l);
			return t
		}
	},
	t.
default = a
},
function(e, t, n) {
	"use strict";
	function r(e) {
		return e && e.__esModule ? e: {
		default:
			e
		}
	}
	function a(e) {
		this.font = e,
		this._fpgmState = this._prepState = void 0,
		this._errorState = 0
	}
	function i(e) {
		return e
	}
	function o(e) {
		return (0, W.
	default)(e) * Math.round(Math.abs(e))
	}
	function l(e) {
		return (0, W.
	default)(e) * Math.round(Math.abs(2 * e)) / 2
	}
	function s(e) {
		return (0, W.
	default)(e) * (Math.round(Math.abs(e) + .5) - .5)
	}
	function u(e) {
		return (0, W.
	default)(e) * Math.ceil(Math.abs(e))
	}
	function c(e) {
		return (0, W.
	default)(e) * Math.floor(Math.abs(e))
	}
	function f(e, t) {
		this.x = e,
		this.y = t,
		this.axis = void 0,
		this.slope = t / e,
		this.normalSlope = -e / t,
		(0, _.
	default)(this)
	}
	function p(e, t) {
		var n = Math.sqrt(e * e + t * t);
		return e /= n,
		t /= n,
		1 === e && 0 === t ? X: 0 === e && 1 === t ? Z: new f(e, t)
	}
	function d(e, t, n, r) {
		this.x = this.xo = Math.round(64 * e) / 64,
		this.y = this.yo = Math.round(64 * t) / 64,
		this.lastPointOfContour = n,
		this.onCurve = r,
		this.prevPointOnContour = void 0,
		this.nextPointOnContour = void 0,
		this.xTouched = !1,
		this.yTouched = !1,
		(0, P.
	default)(this)
	}
	function h(e, t) {
		switch (this.env = e, this.stack = [], this.prog = t, e) {
		case "glyf":
			this.zp0 = this.zp1 = this.zp2 = 1,
			this.rp0 = this.rp1 = this.rp2 = 0;
		case "prep":
			this.fv = this.pv = this.dpv = X,
			this.round = o
		}
	}
	function m(e) {
		for (var t = e.tZone = new Array(e.gZone.length), n = 0; n < t.length; n++) t[n] = new d(0, 0)
	}
	function g(e, t) {
		var n = e.prog,
		r = e.ip,
		a = 1,
		i = void 0;
		do {
			if (88 === (i = n[++r])) a++;
			else if (89 === i) a--;
			else if (64 === i) r += n[r + 1] + 1;
			else if (65 === i) r += 2 * n[r + 1] + 1;
			else if (i >= 176 && i <= 183) r += i - 176 + 1;
			else if (i >= 184 && i <= 191) r += 2 * (i - 184 + 1);
			else if (t && 1 === a && 27 === i) break
		} while ( a > 0 );
		e.ip = r
	}
	function v(e, n) {
		t.DEBUG,
		n.fv = n.pv = n.dpv = e
	}
	function y(e, n) {
		t.DEBUG,
		n.pv = n.dpv = e
	}
	function b(e, n) {
		t.DEBUG,
		n.fv = e
	}
	function x(e, n) {
		var r = n.stack,
		a = r.pop(),
		i = r.pop(),
		o = n.z2[a],
		l = n.z1[i];
		t.DEBUG;
		var s = void 0,
		u = void 0;
		e ? (s = o.y - l.y, u = l.x - o.x) : (s = l.x - o.x, u = l.y - o.y),
		n.pv = n.dpv = p(s, u)
	}
	function S(e, n) {
		var r = n.stack,
		a = r.pop(),
		i = r.pop(),
		o = n.z2[a],
		l = n.z1[i];
		t.DEBUG;
		var s = void 0,
		u = void 0;
		e ? (s = o.y - l.y, u = l.x - o.x) : (s = l.x - o.x, u = l.y - o.y),
		n.fv = p(s, u)
	}
	function w(e) {
		t.DEBUG,
		e.stack.pop()
	}
	function L(e, n) {
		var r = n.stack.pop(),
		a = n.z0[r],
		i = n.fv,
		o = n.pv;
		t.DEBUG;
		var l = o.distance(a, J);
		e && (l = n.round(l)),
		i.setRelative(a, J, l, o),
		i.touch(a),
		n.rp0 = n.rp1 = r
	}
	function k(e, n) {
		var r = n.z2,
		a = r.length - 2,
		i = void 0,
		o = void 0,
		l = void 0;
		t.DEBUG;
		for (var s = 0; s < a; s++) i = r[s],
		e.touched(i) || (o = i.prevTouched(e)) !== i && (o === (l = i.nextTouched(e)) && e.setRelative(i, i, e.distance(o, o, !1, !0), e, !0), e.interpolate(i, o, l, e))
	}
	function D(e, n) {
		for (var r = n.stack,
		a = e ? n.rp1: n.rp2, i = (e ? n.z0: n.z1)[a], o = n.fv, l = n.pv, s = n.loop, u = n.z2; s--;) {
			var c = r.pop(),
			f = u[c],
			p = l.distance(i, i, !1, !0);
			o.setRelative(f, f, p, l),
			o.touch(f),
			t.DEBUG
		}
		n.loop = 1
	}
	function E(e, n) {
		var r = n.stack,
		a = e ? n.rp1: n.rp2,
		i = (e ? n.z0: n.z1)[a],
		o = n.fv,
		l = n.pv,
		s = r.pop(),
		u = n.z2[n.contours[s]],
		c = u;
		t.DEBUG;
		var f = l.distance(i, i, !1, !0);
		do {
			c !== i && o.setRelative(c, c, f, l), c = c.nextPointOnContour
		} while ( c !== u )
	}
	function C(e, n) {
		var r = n.stack,
		a = e ? n.rp1: n.rp2,
		i = (e ? n.z0: n.z1)[a],
		o = n.fv,
		l = n.pv,
		s = r.pop();
		t.DEBUG;
		var u = void 0;
		switch (s) {
		case 0:
			u = n.tZone;
			break;
		case 1:
			u = n.gZone;
			break;
		default:
			throw new Error("Invalid zone")
		}
		for (var c = void 0,
		f = l.distance(i, i, !1, !0), p = u.length - 2, d = 0; d < p; d++) c = u[d],
		o.setRelative(c, c, f, l)
	}
	function A(e, n) {
		var r = n.stack,
		a = r.pop() / 64,
		i = r.pop(),
		o = n.z1[i],
		l = n.z0[n.rp0],
		s = n.fv,
		u = n.pv;
		s.setRelative(o, l, a, u),
		s.touch(o),
		t.DEBUG,
		n.rp1 = n.rp0,
		n.rp2 = i,
		e && (n.rp0 = i)
	}
	function T(e, n) {
		var r = n.stack,
		a = r.pop(),
		i = r.pop(),
		o = n.z0[i],
		l = n.fv,
		s = n.pv,
		u = n.cvt[a];
		t.DEBUG;
		var c = s.distance(o, J);
		e && (Math.abs(c - u) < n.cvCutIn && (c = u), c = n.round(c)),
		l.setRelative(o, J, c, s),
		0 === n.zp0 && (o.xo = o.x, o.yo = o.y),
		l.touch(o),
		n.rp0 = n.rp1 = i
	}
	function U(e, n) {
		var r = n.stack,
		a = r.pop(),
		i = n.z2[a];
		t.DEBUG,
		r.push(64 * n.dpv.distance(i, J, e, !1))
	}
	function O(e, n) {
		var r = n.stack,
		a = r.pop(),
		i = r.pop(),
		o = n.z1[a],
		l = n.z0[i],
		s = n.dpv.distance(l, o, e, e);
		t.DEBUG,
		n.stack.push(Math.round(64 * s))
	}
	function B(e, n) {
		var r = n.stack,
		a = r.pop(),
		i = n.fv,
		o = n.pv,
		l = n.ppem,
		s = n.deltaBase + 16 * (e - 1),
		u = n.deltaShift,
		c = n.z0;
		t.DEBUG;
		for (var f = 0; f < a; f++) {
			var p = r.pop(),
			d = r.pop();
			if (s + ((240 & d) >> 4) === l) {
				var h = (15 & d) - 8;
				h >= 0 && h++,
				t.DEBUG;
				var m = c[p];
				i.setRelative(m, m, h * u, o)
			}
		}
	}
	function R(e, n) {
		var r = n.stack,
		a = r.pop();
		t.DEBUG,
		r.push(64 * n.round(a / 64))
	}
	function F(e, n) {
		var r = n.stack,
		a = r.pop(),
		i = n.ppem,
		o = n.deltaBase + 16 * (e - 1),
		l = n.deltaShift;
		t.DEBUG;
		for (var s = 0; s < a; s++) {
			var u = r.pop(),
			c = r.pop();
			if (o + ((240 & c) >> 4) === i) {
				var f = (15 & c) - 8;
				f >= 0 && f++;
				var p = f * l;
				t.DEBUG,
				n.cvt[u] += p
			}
		}
	}
	function N(e, n) {
		var r = n.stack,
		a = r.pop(),
		i = r.pop(),
		o = n.z2[a],
		l = n.z1[i];
		t.DEBUG;
		var s = void 0,
		u = void 0;
		e ? (s = o.y - l.y, u = l.x - o.x) : (s = l.x - o.x, u = l.y - o.y),
		n.dpv = p(s, u)
	}
	function M(e, n) {
		var r = n.stack,
		a = n.prog,
		i = n.ip;
		t.DEBUG;
		for (var o = 0; o < e; o++) r.push(a[++i]);
		n.ip = i
	}
	function G(e, n) {
		var r = n.ip,
		a = n.prog,
		i = n.stack;
		t.DEBUG;
		for (var o = 0; o < e; o++) {
			var l = a[++r] << 8 | a[++r];
			32768 & l && (l = -(1 + (65535 ^ l))),
			i.push(l)
		}
		n.ip = r
	}
	function I(e, n, r, a, i, o) {
		var l = o.stack,
		s = e && l.pop(),
		u = l.pop(),
		c = o.rp0,
		f = o.z0[c],
		p = o.z1[u],
		d = o.minDis,
		h = o.fv,
		m = o.dpv,
		g = void 0,
		v = void 0,
		y = void 0;
		v = (g = m.distance(p, f, !0, !0)) >= 0 ? 1 : -1,
		g = Math.abs(g),
		e && (y = o.cvt[s], a && Math.abs(g - y) < o.cvCutIn && (g = y)),
		r && g < d && (g = d),
		a && (g = o.round(g)),
		h.setRelative(p, f, v * g, m),
		h.touch(p),
		t.DEBUG,
		o.rp1 = o.rp0,
		o.rp2 = u,
		n && (o.rp0 = u)
	}
	Object.defineProperty(t, "__esModule", {
		value: !0
	});
	var P = r(n(141)),
	_ = r(n(144)),
	q = r(n(147)),
	W = r(n(150)),
	H = void 0,
	z = void 0,
	j = void 0,
	V = void 0,
	Y = function(e) {
		var t = this.srPeriod,
		n = this.srPhase,
		r = this.srThreshold,
		a = 1;
		return e < 0 && (e = -e, a = -1),
		e += r - n,
		e = (0, q.
	default)(e / t) * t,
		(e += n) < 0 ? n * a: e * a
	},
	X = {
		x: 1,
		y: 0,
		axis: "x",
		distance: function(e, t, n, r) {
			return (n ? e.xo: e.x) - (r ? t.xo: t.x)
		},
		interpolate: function(e, t, n, r) {
			var a = void 0,
			i = void 0,
			o = void 0,
			l = void 0,
			s = void 0,
			u = void 0,
			c = void 0;
			if (!r || r === this) return a = e.xo - t.xo,
			i = e.xo - n.xo,
			s = t.x - t.xo,
			u = n.x - n.xo,
			o = Math.abs(a),
			l = Math.abs(i),
			0 === (c = o + l) ? void(e.x = e.xo + (s + u) / 2) : void(e.x = e.xo + (s * l + u * o) / c);
			a = r.distance(e, t, !0, !0),
			i = r.distance(e, n, !0, !0),
			s = r.distance(t, t, !1, !0),
			u = r.distance(n, n, !1, !0),
			0 !== (c = (o = Math.abs(a)) + (l = Math.abs(i))) ? X.setRelative(e, e, (s * l + u * o) / c, r, !0) : X.setRelative(e, e, (s + u) / 2, r, !0)
		},
		normalSlope: Number.NEGATIVE_INFINITY,
		setRelative: function(e, t, n, r, a) {
			if (r && r !== this) {
				var i = a ? t.xo: t.x,
				o = a ? t.yo: t.y,
				l = i + n * r.x,
				s = o + n * r.y;
				e.x = l + (e.y - s) / r.normalSlope
			} else e.x = (a ? t.xo: t.x) + n
		},
		slope: 0,
		touch: function(e) {
			e.xTouched = !0
		},
		touched: function(e) {
			return e.xTouched
		},
		untouch: function(e) {
			e.xTouched = !1
		}
	},
	Z = {
		x: 0,
		y: 1,
		axis: "y",
		distance: function(e, t, n, r) {
			return (n ? e.yo: e.y) - (r ? t.yo: t.y)
		},
		interpolate: function(e, t, n, r) {
			var a = void 0,
			i = void 0,
			o = void 0,
			l = void 0,
			s = void 0,
			u = void 0,
			c = void 0;
			if (!r || r === this) return a = e.yo - t.yo,
			i = e.yo - n.yo,
			s = t.y - t.yo,
			u = n.y - n.yo,
			o = Math.abs(a),
			l = Math.abs(i),
			0 === (c = o + l) ? void(e.y = e.yo + (s + u) / 2) : void(e.y = e.yo + (s * l + u * o) / c);
			a = r.distance(e, t, !0, !0),
			i = r.distance(e, n, !0, !0),
			s = r.distance(t, t, !1, !0),
			u = r.distance(n, n, !1, !0),
			0 !== (c = (o = Math.abs(a)) + (l = Math.abs(i))) ? Z.setRelative(e, e, (s * l + u * o) / c, r, !0) : Z.setRelative(e, e, (s + u) / 2, r, !0)
		},
		normalSlope: 0,
		setRelative: function(e, t, n, r, a) {
			if (r && r !== this) {
				var i = a ? t.xo: t.x,
				o = a ? t.yo: t.y,
				l = i + n * r.x,
				s = o + n * r.y;
				e.y = s + r.normalSlope * (e.x - l)
			} else e.y = (a ? t.yo: t.y) + n
		},
		slope: Number.POSITIVE_INFINITY,
		touch: function(e) {
			e.yTouched = !0
		},
		touched: function(e) {
			return e.yTouched
		},
		untouch: function(e) {
			e.yTouched = !1
		}
	}; (0, _.
default)(X),
	(0, _.
default)(Z),
	f.prototype.distance = function(e, t, n, r) {
		return this.x * X.distance(e, t, n, r) + this.y * Z.distance(e, t, n, r)
	},
	f.prototype.interpolate = function(e, t, n, r) {
		var a = void 0,
		i = void 0,
		o = void 0,
		l = void 0,
		s = void 0,
		u = void 0,
		c = void 0;
		o = r.distance(e, t, !0, !0),
		l = r.distance(e, n, !0, !0),
		a = r.distance(t, t, !1, !0),
		i = r.distance(n, n, !1, !0),
		0 !== (c = (s = Math.abs(o)) + (u = Math.abs(l))) ? this.setRelative(e, e, (a * u + i * s) / c, r, !0) : this.setRelative(e, e, (a + i) / 2, r, !0)
	},
	f.prototype.setRelative = function(e, t, n, r, a) {
		r = r || this;
		var i = a ? t.xo: t.x,
		o = a ? t.yo: t.y,
		l = i + n * r.x,
		s = o + n * r.y,
		u = r.normalSlope,
		c = this.slope,
		f = e.x,
		p = e.y;
		e.x = (c * f - u * l + s - p) / (c - u),
		e.y = c * (e.x - f) + p
	},
	f.prototype.touch = function(e) {
		e.xTouched = !0,
		e.yTouched = !0
	},
	d.prototype.nextTouched = function(e) {
		for (var t = this.nextPointOnContour; ! e.touched(t) && t !== this;) t = t.nextPointOnContour;
		return t
	},
	d.prototype.prevTouched = function(e) {
		for (var t = this.prevPointOnContour; ! e.touched(t) && t !== this;) t = t.prevPointOnContour;
		return t
	};
	var J = (0, _.
default)(new d(0, 0)),
	Q = {
		cvCutIn: 17 / 16,
		deltaBase: 9,
		deltaShift: .125,
		loop: 1,
		minDis: 1,
		autoFlip: !0
	};
	a.prototype.exec = function(e, n) {
		if ("number" != typeof n) throw new Error("Point size is not a number!");
		if (! (this._errorState > 2)) {
			var r = this.font,
			a = this._prepState;
			if (!a || a.ppem !== n) {
				var i = this._fpgmState;
				if (!i) {
					h.prototype = Q,
					(i = this._fpgmState = new h("fpgm", r.tables.fpgm)).funcs = [],
					i.font = r,
					t.DEBUG && (i.step = -1);
					try {
						z(i)
					} catch(e) {
						return void(this._errorState = 3)
					}
				}
				h.prototype = i,
				(a = this._prepState = new h("prep", r.tables.prep)).ppem = n;
				var o = r.tables.cvt;
				if (o) for (var l = a.cvt = new Array(o.length), s = n / r.unitsPerEm, u = 0; u < o.length; u++) l[u] = o[u] * s;
				else a.cvt = [];
				t.DEBUG && (a.step = -1);
				try {
					z(a)
				} catch(e) {
					this._errorState,
					this._errorState = 2
				}
			}
			if (! (this._errorState > 1)) try {
				return j(e, a)
			} catch(e) {
				return this._errorState,
				void(this._errorState = 1)
			}
		}
	},
	j = function(e, n) {
		var r = n.ppem / n.font.unitsPerEm,
		a = r,
		i = e.components,
		o = void 0,
		l = void 0,
		s = void 0;
		if (h.prototype = n, i) {
			var u = n.font;
			l = [],
			o = [];
			for (var c = 0; c < i.length; c++) {
				var f = i[c],
				p = u.glyphs.get(f.glyphIndex);
				s = new h("glyf", p.instructions),
				t.DEBUG && (s.step = -1),
				V(p, s, r, a);
				for (var m = Math.round(f.dx * r), g = Math.round(f.dy * a), v = s.gZone, y = s.contours, b = 0; b < v.length; b++) {
					var x = v[b];
					x.xTouched = x.yTouched = !1,
					x.xo = x.x = x.x + m,
					x.yo = x.y = x.y + g
				}
				var S = l.length;
				l.push.apply(l, v);
				for (var w = 0; w < y.length; w++) o.push(y[w] + S)
			}
			e.instructions && !s.inhibitGridFit && ((s = new h("glyf", e.instructions)).gZone = s.z0 = s.z1 = s.z2 = l, s.contours = o, l.push(new d(0, 0), new d(Math.round(e.advanceWidth * r), 0)), t.DEBUG && (s.step = -1), z(s), l.length -= 2)
		} else s = new h("glyf", e.instructions),
		t.DEBUG && (s.step = -1),
		V(e, s, r, a),
		l = s.gZone;
		return l
	},
	V = function(e, n, r, a) {
		for (var i = e.points || [], o = i.length, l = n.gZone = n.z0 = n.z1 = n.z2 = [], s = n.contours = [], u = void 0, c = 0; c < o; c++) u = i[c],
		l[c] = new d(u.x * r, u.y * a, u.lastPointOfContour, u.onCurve);
		for (var f = void 0,
		p = void 0,
		h = 0; h < o; h++) u = l[h],
		f || (f = u, s.push(h)),
		u.lastPointOfContour ? (u.nextPointOnContour = f, f.prevPointOnContour = u, f = void 0) : (p = l[h + 1], u.nextPointOnContour = p, p.prevPointOnContour = u);
		if (!n.inhibitGridFit) {
			if (t.DEBUG) for (var m = 0; m < o; m++);
			if (l.push(new d(0, 0), new d(Math.round(e.advanceWidth * r), 0)), z(n), l.length -= 2, t.DEBUG) for (var g = 0; g < o; g++);
		}
	},
	z = function(e) {
		var n = e.prog;
		if (n) {
			var r = n.length,
			a = void 0;
			for (e.ip = 0; e.ip < r; e.ip++) {
				if (t.DEBUG && e.step++, !(a = H[n[e.ip]])) throw new Error("unknown instruction: 0x" + Number(n[e.ip]).toString(16));
				a(e)
			}
		}
	},
	H = [v.bind(void 0, Z), v.bind(void 0, X), y.bind(void 0, Z), y.bind(void 0, X), b.bind(void 0, Z), b.bind(void 0, X), x.bind(void 0, 0), x.bind(void 0, 1), S.bind(void 0, 0), S.bind(void 0, 1),
	function(e) {
		var n = e.stack,
		r = n.pop(),
		a = n.pop();
		t.DEBUG,
		e.pv = e.dpv = p(a, r)
	},
	function(e) {
		var n = e.stack,
		r = n.pop(),
		a = n.pop();
		t.DEBUG,
		e.fv = p(a, r)
	},
	function(e) {
		var n = e.stack,
		r = e.pv;
		t.DEBUG,
		n.push(16384 * r.x),
		n.push(16384 * r.y)
	},
	function(e) {
		var n = e.stack,
		r = e.fv;
		t.DEBUG,
		n.push(16384 * r.x),
		n.push(16384 * r.y)
	},
	function(e) {
		e.fv = e.pv,
		t.DEBUG
	},
	function(e) {
		var n = e.stack,
		r = n.pop(),
		a = n.pop(),
		i = n.pop(),
		o = n.pop(),
		l = n.pop(),
		s = e.z0,
		u = e.z1,
		c = s[r],
		f = s[a],
		p = u[i],
		d = u[o],
		h = e.z2[l];
		t.DEBUG;
		var m = c.x,
		g = c.y,
		v = f.x,
		y = f.y,
		b = p.x,
		x = p.y,
		S = d.x,
		w = d.y,
		L = (m - v) * (x - w) - (g - y) * (b - S),
		k = m * y - g * v,
		D = b * w - x * S;
		h.x = (k * (b - S) - D * (m - v)) / L,
		h.y = (k * (x - w) - D * (g - y)) / L
	},
	function(e) {
		e.rp0 = e.stack.pop(),
		t.DEBUG
	},
	function(e) {
		e.rp1 = e.stack.pop(),
		t.DEBUG
	},
	function(e) {
		e.rp2 = e.stack.pop(),
		t.DEBUG
	},
	function(e) {
		var n = e.stack.pop();
		switch (t.DEBUG, e.zp0 = n, n) {
		case 0:
			e.tZone || m(e),
			e.z0 = e.tZone;
			break;
		case 1:
			e.z0 = e.gZone;
			break;
		default:
			throw new Error("Invalid zone pointer")
		}
	},
	function(e) {
		var n = e.stack.pop();
		switch (t.DEBUG, e.zp1 = n, n) {
		case 0:
			e.tZone || m(e),
			e.z1 = e.tZone;
			break;
		case 1:
			e.z1 = e.gZone;
			break;
		default:
			throw new Error("Invalid zone pointer")
		}
	},
	function(e) {
		var n = e.stack.pop();
		switch (t.DEBUG, e.zp2 = n, n) {
		case 0:
			e.tZone || m(e),
			e.z2 = e.tZone;
			break;
		case 1:
			e.z2 = e.gZone;
			break;
		default:
			throw new Error("Invalid zone pointer")
		}
	},
	function(e) {
		var n = e.stack.pop();
		switch (t.DEBUG, e.zp0 = e.zp1 = e.zp2 = n, n) {
		case 0:
			e.tZone || m(e),
			e.z0 = e.z1 = e.z2 = e.tZone;
			break;
		case 1:
			e.z0 = e.z1 = e.z2 = e.gZone;
			break;
		default:
			throw new Error("Invalid zone pointer")
		}
	},
	function(e) {
		e.loop = e.stack.pop(),
		t.DEBUG
	},
	function(e) {
		t.DEBUG,
		e.round = o
	},
	function(e) {
		t.DEBUG,
		e.round = s
	},
	function(e) {
		var n = e.stack.pop();
		t.DEBUG,
		e.minDis = n / 64
	},
	function(e) {
		t.DEBUG,
		g(e, !1)
	},
	function(e) {
		var n = e.stack.pop();
		t.DEBUG,
		e.ip += n - 1
	},
	function(e) {
		var n = e.stack.pop();
		t.DEBUG,
		e.cvCutIn = n / 64
	},
	void 0, void 0,
	function(e) {
		var n = e.stack;
		t.DEBUG,
		n.push(n[n.length - 1])
	},
	w,
	function(e) {
		t.DEBUG,
		e.stack.length = 0
	},
	function(e) {
		var n = e.stack,
		r = n.pop(),
		a = n.pop();
		t.DEBUG,
		n.push(r),
		n.push(a)
	},
	function(e) {
		var n = e.stack;
		t.DEBUG,
		n.push(n.length)
	},
	function(e) {
		var n = e.stack,
		r = n.pop();
		t.DEBUG,
		n.push(n[n.length - r])
	},
	function(e) {
		var n = e.stack,
		r = n.pop();
		t.DEBUG,
		n.push(n.splice(n.length - r, 1)[0])
	},
	void 0, void 0, void 0,
	function(e) {
		var n = e.stack,
		r = n.pop(),
		a = n.pop();
		t.DEBUG;
		var i = e.ip,
		o = e.prog;
		e.prog = e.funcs[r];
		for (var l = 0; l < a; l++) z(e),
		t.DEBUG;
		e.ip = i,
		e.prog = o
	},
	function(e) {
		var n = e.stack.pop();
		t.DEBUG;
		var r = e.ip,
		a = e.prog;
		e.prog = e.funcs[n],
		z(e),
		e.ip = r,
		e.prog = a,
		t.DEBUG
	},
	function(e) {
		if ("fpgm" !== e.env) throw new Error("FDEF not allowed here");
		var n = e.stack,
		r = e.prog,
		a = e.ip,
		i = n.pop(),
		o = a;
		for (t.DEBUG; 45 !== r[++a];);
		e.ip = a,
		e.funcs[i] = r.slice(o + 1, a)
	},
	void 0, L.bind(void 0, 0), L.bind(void 0, 1), k.bind(void 0, Z), k.bind(void 0, X), D.bind(void 0, 0), D.bind(void 0, 1), E.bind(void 0, 0), E.bind(void 0, 1), C.bind(void 0, 0), C.bind(void 0, 1),
	function(e) {
		for (var n = e.stack,
		r = e.loop,
		a = e.fv,
		i = n.pop() / 64, o = e.z2; r--;) {
			var l = n.pop(),
			s = o[l];
			t.DEBUG,
			a.setRelative(s, s, i),
			a.touch(s)
		}
		e.loop = 1
	},
	function(e) {
		for (var n = e.stack,
		r = e.rp1,
		a = e.rp2,
		i = e.loop,
		o = e.z0[r], l = e.z1[a], s = e.fv, u = e.dpv, c = e.z2; i--;) {
			var f = n.pop(),
			p = c[f];
			t.DEBUG,
			s.interpolate(p, o, l, u),
			s.touch(p)
		}
		e.loop = 1
	},
	A.bind(void 0, 0), A.bind(void 0, 1),
	function(e) {
		for (var n = e.stack,
		r = e.rp0,
		a = e.z0[r], i = e.loop, o = e.fv, l = e.pv, s = e.z1; i--;) {
			var u = n.pop(),
			c = s[u];
			t.DEBUG,
			o.setRelative(c, a, 0, l),
			o.touch(c)
		}
		e.loop = 1
	},
	function(e) {
		t.DEBUG,
		e.round = l
	},
	T.bind(void 0, 0), T.bind(void 0, 1),
	function(e) {
		var n = e.prog,
		r = e.ip,
		a = e.stack,
		i = n[++r];
		t.DEBUG;
		for (var o = 0; o < i; o++) a.push(n[++r]);
		e.ip = r
	},
	function(e) {
		var n = e.ip,
		r = e.prog,
		a = e.stack,
		i = r[++n];
		t.DEBUG;
		for (var o = 0; o < i; o++) {
			var l = r[++n] << 8 | r[++n];
			32768 & l && (l = -(1 + (65535 ^ l))),
			a.push(l)
		}
		e.ip = n
	},
	function(e) {
		var n = e.stack,
		r = e.store;
		r || (r = e.store = []);
		var a = n.pop(),
		i = n.pop();
		t.DEBUG,
		r[i] = a
	},
	function(e) {
		var n = e.stack,
		r = e.store,
		a = n.pop();
		t.DEBUG;
		var i = r && r[a] || 0;
		n.push(i)
	},
	function(e) {
		var n = e.stack,
		r = n.pop(),
		a = n.pop();
		t.DEBUG,
		e.cvt[a] = r / 64
	},
	function(e) {
		var n = e.stack,
		r = n.pop();
		t.DEBUG,
		n.push(64 * e.cvt[r])
	},
	U.bind(void 0, 0), U.bind(void 0, 1), void 0, O.bind(void 0, 0), O.bind(void 0, 1),
	function(e) {
		t.DEBUG,
		e.stack.push(e.ppem)
	},
	void 0,
	function(e) {
		t.DEBUG,
		e.autoFlip = !0
	},
	void 0, void 0,
	function(e) {
		var n = e.stack,
		r = n.pop(),
		a = n.pop();
		t.DEBUG,
		n.push(a < r ? 1 : 0)
	},
	function(e) {
		var n = e.stack,
		r = n.pop(),
		a = n.pop();
		t.DEBUG,
		n.push(a <= r ? 1 : 0)
	},
	function(e) {
		var n = e.stack,
		r = n.pop(),
		a = n.pop();
		t.DEBUG,
		n.push(a > r ? 1 : 0)
	},
	function(e) {
		var n = e.stack,
		r = n.pop(),
		a = n.pop();
		t.DEBUG,
		n.push(a >= r ? 1 : 0)
	},
	function(e) {
		var n = e.stack,
		r = n.pop(),
		a = n.pop();
		t.DEBUG,
		n.push(r === a ? 1 : 0)
	},
	function(e) {
		var n = e.stack,
		r = n.pop(),
		a = n.pop();
		t.DEBUG,
		n.push(r !== a ? 1 : 0)
	},
	function(e) {
		var n = e.stack,
		r = n.pop();
		t.DEBUG,
		n.push((0, q.
	default)(r) % 2 ? 1 : 0)
	},
	function(e) {
		var n = e.stack,
		r = n.pop();
		t.DEBUG,
		n.push((0, q.
	default)(r) % 2 ? 0 : 1)
	},
	function(e) {
		var n = e.stack.pop();
		t.DEBUG,
		n || (g(e, !0), t.DEBUG)
	},
	function(e) {
		t.DEBUG
	},
	function(e) {
		var n = e.stack,
		r = n.pop(),
		a = n.pop();
		t.DEBUG,
		n.push(r && a ? 1 : 0)
	},
	function(e) {
		var n = e.stack,
		r = n.pop(),
		a = n.pop();
		t.DEBUG,
		n.push(r || a ? 1 : 0)
	},
	function(e) {
		var n = e.stack,
		r = n.pop();
		t.DEBUG,
		n.push(r ? 0 : 1)
	},
	B.bind(void 0, 1),
	function(e) {
		var n = e.stack.pop();
		t.DEBUG,
		e.deltaBase = n
	},
	function(e) {
		var n = e.stack.pop();
		t.DEBUG,
		e.deltaShift = Math.pow(.5, n)
	},
	function(e) {
		var n = e.stack,
		r = n.pop(),
		a = n.pop();
		t.DEBUG,
		n.push(a + r)
	},
	function(e) {
		var n = e.stack,
		r = n.pop(),
		a = n.pop();
		t.DEBUG,
		n.push(a - r)
	},
	function(e) {
		var n = e.stack,
		r = n.pop(),
		a = n.pop();
		t.DEBUG,
		n.push(64 * a / r)
	},
	function(e) {
		var n = e.stack,
		r = n.pop(),
		a = n.pop();
		t.DEBUG,
		n.push(a * r / 64)
	},
	function(e) {
		var n = e.stack,
		r = n.pop();
		t.DEBUG,
		n.push(Math.abs(r))
	},
	function(e) {
		var n = e.stack,
		r = n.pop();
		t.DEBUG,
		n.push( - r)
	},
	function(e) {
		var n = e.stack,
		r = n.pop();
		t.DEBUG,
		n.push(64 * Math.floor(r / 64))
	},
	function(e) {
		var n = e.stack,
		r = n.pop();
		t.DEBUG,
		n.push(64 * Math.ceil(r / 64))
	},
	R.bind(void 0, 0), R.bind(void 0, 1), R.bind(void 0, 2), R.bind(void 0, 3), void 0, void 0, void 0, void 0,
	function(e) {
		var n = e.stack,
		r = n.pop(),
		a = n.pop();
		t.DEBUG,
		e.cvt[a] = r * e.ppem / e.font.unitsPerEm
	},
	B.bind(void 0, 2), B.bind(void 0, 3), F.bind(void 0, 1), F.bind(void 0, 2), F.bind(void 0, 3),
	function(e) {
		var n = e.stack.pop();
		t.DEBUG,
		e.round = Y;
		var r = void 0;
		switch (192 & n) {
		case 0:
			r = .5;
			break;
		case 64:
			r = 1;
			break;
		case 128:
			r = 2;
			break;
		default:
			throw new Error("invalid SROUND value")
		}
		switch (e.srPeriod = r, 48 & n) {
		case 0:
			e.srPhase = 0;
			break;
		case 16:
			e.srPhase = .25 * r;
			break;
		case 32:
			e.srPhase = .5 * r;
			break;
		case 48:
			e.srPhase = .75 * r;
			break;
		default:
			throw new Error("invalid SROUND value")
		}
		n &= 15,
		e.srThreshold = 0 === n ? 0 : (n / 8 - .5) * r
	},
	function(e) {
		var n = e.stack.pop();
		t.DEBUG,
		e.round = Y;
		var r = void 0;
		switch (192 & n) {
		case 0:
			r = Math.sqrt(2) / 2;
			break;
		case 64:
			r = Math.sqrt(2);
			break;
		case 128:
			r = 2 * Math.sqrt(2);
			break;
		default:
			throw new Error("invalid S45ROUND value")
		}
		switch (e.srPeriod = r, 48 & n) {
		case 0:
			e.srPhase = 0;
			break;
		case 16:
			e.srPhase = .25 * r;
			break;
		case 32:
			e.srPhase = .5 * r;
			break;
		case 48:
			e.srPhase = .75 * r;
			break;
		default:
			throw new Error("invalid S45ROUND value")
		}
		n &= 15,
		e.srThreshold = 0 === n ? 0 : (n / 8 - .5) * r
	},
	void 0, void 0,
	function(e) {
		t.DEBUG,
		e.round = i
	},
	void 0,
	function(e) {
		t.DEBUG,
		e.round = u
	},
	function(e) {
		t.DEBUG,
		e.round = c
	},
	w, w, void 0, void 0, void 0, void 0, void 0,
	function(e) {
		e.stack.pop(),
		t.DEBUG
	},
	N.bind(void 0, 0), N.bind(void 0, 1),
	function(e) {
		var n = e.stack,
		r = n.pop(),
		a = 0;
		t.DEBUG,
		1 & r && (a = 35),
		32 & r && (a |= 4096),
		n.push(a)
	},
	void 0,
	function(e) {
		var n = e.stack,
		r = n.pop(),
		a = n.pop(),
		i = n.pop();
		t.DEBUG,
		n.push(a),
		n.push(r),
		n.push(i)
	},
	function(e) {
		var n = e.stack,
		r = n.pop(),
		a = n.pop();
		t.DEBUG,
		n.push(Math.max(a, r))
	},
	function(e) {
		var n = e.stack,
		r = n.pop(),
		a = n.pop();
		t.DEBUG,
		n.push(Math.min(a, r))
	},
	function(e) {
		e.stack.pop(),
		t.DEBUG
	},
	function(e) {
		var n = e.stack.pop(),
		r = e.stack.pop();
		switch (t.DEBUG, n) {
		case 1:
			return void(e.inhibitGridFit = !!r);
		case 2:
			return void(e.ignoreCvt = !!r);
		default:
			throw new Error("invalid INSTCTRL[] selector")
		}
	},
	void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, M.bind(void 0, 1), M.bind(void 0, 2), M.bind(void 0, 3), M.bind(void 0, 4), M.bind(void 0, 5), M.bind(void 0, 6), M.bind(void 0, 7), M.bind(void 0, 8), G.bind(void 0, 1), G.bind(void 0, 2), G.bind(void 0, 3), G.bind(void 0, 4), G.bind(void 0, 5), G.bind(void 0, 6), G.bind(void 0, 7), G.bind(void 0, 8), I.bind(void 0, 0, 0, 0, 0, 0), I.bind(void 0, 0, 0, 0, 0, 1), I.bind(void 0, 0, 0, 0, 0, 2), I.bind(void 0, 0, 0, 0, 0, 3), I.bind(void 0, 0, 0, 0, 1, 0), I.bind(void 0, 0, 0, 0, 1, 1), I.bind(void 0, 0, 0, 0, 1, 2), I.bind(void 0, 0, 0, 0, 1, 3), I.bind(void 0, 0, 0, 1, 0, 0), I.bind(void 0, 0, 0, 1, 0, 1), I.bind(void 0, 0, 0, 1, 0, 2), I.bind(void 0, 0, 0, 1, 0, 3), I.bind(void 0, 0, 0, 1, 1, 0), I.bind(void 0, 0, 0, 1, 1, 1), I.bind(void 0, 0, 0, 1, 1, 2), I.bind(void 0, 0, 0, 1, 1, 3), I.bind(void 0, 0, 1, 0, 0, 0), I.bind(void 0, 0, 1, 0, 0, 1), I.bind(void 0, 0, 1, 0, 0, 2), I.bind(void 0, 0, 1, 0, 0, 3), I.bind(void 0, 0, 1, 0, 1, 0), I.bind(void 0, 0, 1, 0, 1, 1), I.bind(void 0, 0, 1, 0, 1, 2), I.bind(void 0, 0, 1, 0, 1, 3), I.bind(void 0, 0, 1, 1, 0, 0), I.bind(void 0, 0, 1, 1, 0, 1), I.bind(void 0, 0, 1, 1, 0, 2), I.bind(void 0, 0, 1, 1, 0, 3), I.bind(void 0, 0, 1, 1, 1, 0), I.bind(void 0, 0, 1, 1, 1, 1), I.bind(void 0, 0, 1, 1, 1, 2), I.bind(void 0, 0, 1, 1, 1, 3), I.bind(void 0, 1, 0, 0, 0, 0), I.bind(void 0, 1, 0, 0, 0, 1), I.bind(void 0, 1, 0, 0, 0, 2), I.bind(void 0, 1, 0, 0, 0, 3), I.bind(void 0, 1, 0, 0, 1, 0), I.bind(void 0, 1, 0, 0, 1, 1), I.bind(void 0, 1, 0, 0, 1, 2), I.bind(void 0, 1, 0, 0, 1, 3), I.bind(void 0, 1, 0, 1, 0, 0), I.bind(void 0, 1, 0, 1, 0, 1), I.bind(void 0, 1, 0, 1, 0, 2), I.bind(void 0, 1, 0, 1, 0, 3), I.bind(void 0, 1, 0, 1, 1, 0), I.bind(void 0, 1, 0, 1, 1, 1), I.bind(void 0, 1, 0, 1, 1, 2), I.bind(void 0, 1, 0, 1, 1, 3), I.bind(void 0, 1, 1, 0, 0, 0), I.bind(void 0, 1, 1, 0, 0, 1), I.bind(void 0, 1, 1, 0, 0, 2), I.bind(void 0, 1, 1, 0, 0, 3), I.bind(void 0, 1, 1, 0, 1, 0), I.bind(void 0, 1, 1, 0, 1, 1), I.bind(void 0, 1, 1, 0, 1, 2), I.bind(void 0, 1, 1, 0, 1, 3), I.bind(void 0, 1, 1, 1, 0, 0), I.bind(void 0, 1, 1, 1, 0, 1), I.bind(void 0, 1, 1, 1, 0, 2), I.bind(void 0, 1, 1, 1, 0, 3), I.bind(void 0, 1, 1, 1, 1, 0), I.bind(void 0, 1, 1, 1, 1, 1), I.bind(void 0, 1, 1, 1, 1, 2), I.bind(void 0, 1, 1, 1, 1, 3)],
	t.
default = a
},
function(e, t, n) {
	e.exports = {
	default:
		n(142),
		__esModule: !0
	}
},
function(e, t, n) {
	n(143),
	e.exports = n(3).Object.preventExtensions
},
function(e, t, n) {
	var r = n(4),
	a = n(17).onFreeze;
	n(37)("preventExtensions",
	function(e) {
		return function(t) {
			return e && r(t) ? e(a(t)) : t
		}
	})
},
function(e, t, n) {
	e.exports = {
	default:
		n(145),
		__esModule: !0
	}
},
function(e, t, n) {
	n(146),
	e.exports = n(3).Object.freeze
},
function(e, t, n) {
	var r = n(4),
	a = n(17).onFreeze;
	n(37)("freeze",
	function(e) {
		return function(t) {
			return e && r(t) ? e(a(t)) : t
		}
	})
},
function(e, t, n) {
	e.exports = {
	default:
		n(148),
		__esModule: !0
	}
},
function(e, t, n) {
	n(149),
	e.exports = n(3).Math.trunc
},
function(e, t, n) {
	var r = n(5);
	r(r.S, "Math", {
		trunc: function(e) {
			return (e > 0 ? Math.floor: Math.ceil)(e)
		}
	})
},
function(e, t, n) {
	e.exports = {
	default:
		n(151),
		__esModule: !0
	}
},
function(e, t, n) {
	n(152),
	e.exports = n(3).Math.sign
},
function(e, t, n) {
	var r = n(5);
	r(r.S, "Math", {
		sign: n(153)
	})
},
function(e, t) {
	e.exports = Math.sign ||
	function(e) {
		return 0 == (e = +e) || e != e ? e: e < 0 ? -1 : 1
	}
},
function(e, t, n) {
	"use strict";
	function r(e) {
		return e && e.__esModule ? e: {
		default:
			e
		}
	}
	function a(e, t) {
		var n = (0, u.
	default)(e),
		r = 256;
		for (var a in t) {
			var i = parseInt(a);
			if (i && !(i < 256)) {
				if ((0, u.
			default)(t[a]) === n) return i;
				r <= i && (r = i + 1)
			}
		}
		return t[r] = e,
		r
	}
	function i(e, t, n) {
		var r = a(t.name, n);
		return [{
			name: "tag_" + e,
			type: "TAG",
			value: t.tag
		},
		{
			name: "minValue_" + e,
			type: "FIXED",
			value: t.minValue << 16
		},
		{
			name: "defaultValue_" + e,
			type: "FIXED",
			value: t.defaultValue << 16
		},
		{
			name: "maxValue_" + e,
			type: "FIXED",
			value: t.maxValue << 16
		},
		{
			name: "flags_" + e,
			type: "USHORT",
			value: 0
		},
		{
			name: "nameID_" + e,
			type: "USHORT",
			value: r
		}]
	}
	function o(e, t, n) {
		var r = {},
		a = new f.
	default.Parser(e, t);
		return r.tag = a.parseTag(),
		r.minValue = a.parseFixed(),
		r.defaultValue = a.parseFixed(),
		r.maxValue = a.parseFixed(),
		a.skip("uShort", 1),
		r.name = n[a.parseUShort()] || {},
		r
	}
	function l(e, t, n, r) {
		for (var i = [{
			name: "nameID_" + e,
			type: "USHORT",
			value: a(t.name, r)
		},
		{
			name: "flags_" + e,
			type: "USHORT",
			value: 0
		}], o = 0; o < n.length; ++o) {
			var l = n[o].tag;
			i.push({
				name: "axis_" + e + " " + l,
				type: "FIXED",
				value: t.coordinates[l] << 16
			})
		}
		return i
	}
	function s(e, t, n, r) {
		var a = {},
		i = new f.
	default.Parser(e, t);
		a.name = r[i.parseUShort()] || {},
		i.skip("uShort", 1),
		a.coordinates = {};
		for (var o = 0; o < n.length; ++o) a.coordinates[n[o].tag] = i.parseFixed();
		return a
	}
	Object.defineProperty(t, "__esModule", {
		value: !0
	});
	var u = r(n(34)),
	c = r(n(1)),
	f = r(n(0)),
	p = r(n(2));
	t.
default = {
		make: function(e, t) {
			var n = new p.
		default.Table("fvar", [{
				name: "version",
				type: "ULONG",
				value: 65536
			},
			{
				name: "offsetToData",
				type: "USHORT",
				value: 0
			},
			{
				name: "countSizePairs",
				type: "USHORT",
				value: 2
			},
			{
				name: "axisCount",
				type: "USHORT",
				value: e.axes.length
			},
			{
				name: "axisSize",
				type: "USHORT",
				value: 20
			},
			{
				name: "instanceCount",
				type: "USHORT",
				value: e.instances.length
			},
			{
				name: "instanceSize",
				type: "USHORT",
				value: 4 + 4 * e.axes.length
			}]);
			n.offsetToData = n.sizeOf();
			for (var r = 0; r < e.axes.length; r++) n.fields = n.fields.concat(i(r, e.axes[r], t));
			for (var a = 0; a < e.instances.length; a++) n.fields = n.fields.concat(l(a, e.instances[a], e.axes, t));
			return n
		},
		parse: function(e, t, n) {
			var r = new f.
		default.Parser(e, t),
			a = r.parseULong();
			c.
		default.argument(65536 === a, "Unsupported fvar table version.");
			var i = r.parseOffset16();
			r.skip("uShort", 1);
			for (var l = r.parseUShort(), u = r.parseUShort(), p = r.parseUShort(), d = r.parseUShort(), h = [], m = 0; m < l; m++) h.push(o(e, t + i + m * u, n));
			for (var g = [], v = t + i + l * u, y = 0; y < p; y++) g.push(s(e, v + y * d, h, n));
			return {
				axes: h,
				instances: g
			}
		}
	}
},
function(e, t, n) {
	"use strict";
	function r(e) {
		return e && e.__esModule ? e: {
		default:
			e
		}
	}
	Object.defineProperty(t, "__esModule", {
		value: !0
	});
	var a = r(n(1)),
	i = r(n(0));
	t.
default = {
		parse: function(e, t) {
			var n = new i.
		default.Parser(e, t),
			r = n.parseUShort();
			if (0 === r) return function(e) {
				var t = {};
				e.skip("uShort");
				var n = e.parseUShort();
				a.
			default.argument(0 === n, "Unsupported kern sub-table version."),
				e.skip("uShort", 2);
				var r = e.parseUShort();
				e.skip("uShort", 3);
				for (var i = 0; i < r; i += 1) {
					var o = e.parseUShort(),
					l = e.parseUShort(),
					s = e.parseShort();
					t[o + "," + l] = s
				}
				return t
			} (n);
			if (1 === r) return function(e) {
				var t = {};
				e.skip("uShort"),
				e.parseULong(),
				e.skip("uLong");
				var n = 255 & e.parseUShort();
				if (e.skip("uShort"), 0 === n) {
					var r = e.parseUShort();
					e.skip("uShort", 3);
					for (var a = 0; a < r; a += 1) {
						var i = e.parseUShort(),
						o = e.parseUShort(),
						l = e.parseShort();
						t[i + "," + o] = l
					}
				}
				return t
			} (n);
			throw new Error("Unsupported kern table version (" + r + ").")
		}
	}
},
function(e, t, n) {
	"use strict";
	Object.defineProperty(t, "__esModule", {
		value: !0
	});
	var r = function(e) {
		return e && e.__esModule ? e: {
		default:
			e
		}
	} (n(0));
	t.
default = {
		parse: function(e, t, n, a) {
			for (var i = new r.
		default.Parser(e, t), o = a ? i.parseUShort: i.parseULong, l = [], s = 0; s < n + 1; s += 1) {
				var u = o.call(i);
				a && (u *= 2),
				l.push(u)
			}
			return l
		}
	}
},
function(e, t, n) {
	"use strict";
	function r(e) {
		return e && e.__esModule ? e: {
		default:
			e
		}
	}
	Object.defineProperty(t, "__esModule", {
		value: !0
	});
	var a = r(n(20)),
	i = r(n(21)),
	o = r(n(22)),
	l = function() {
		function e() {
			var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}; (0, i.
		default)(this, e),
			this.name = t.name || "",
			this.id = this.name.toLowerCase(),
			this.glyphs = t.glyphs || [],
			this.filters = t.filters || [],
			this.expanded = t.expanded || !0
		}
		return (0, o.
	default)(e, [{
			key: "clear",
			value: function() {
				this.glyphs = []
			}
		},
		{
			key: "findById",
			value: function(e) {
				var t = !0,
				n = !1,
				r = void 0;
				try {
					for (var i, o = (0, a.
				default)(this.glyphs); ! (t = (i = o.next()).done); t = !0) {
						var l = i.value;
						if (l.id === e) return l
					}
				} catch(e) {
					n = !0,
					r = e
				} finally {
					try { ! t && o.
						return && o.
						return ()
					} finally {
						if (n) throw r
					}
				}
				return null
			}
		},
		{
			key: "addGlyph",
			value: function(e, t) {
				this.findById(e.id) || (e.category = this, t ? this.glyphs.unshift(e) : this.glyphs.push(e))
			}
		},
		{
			key: "removeGlyph",
			value: function(e) {
				for (var t = -1,
				n = 0; n < this.glyphs.length; n++) {
					var r = this.glyphs[n];
					if (e.id === r.id) {
						t = n;
						break
					}
				} - 1 !== t && this.glyphs.splice(t, 1)
			}
		},
		{
			key: "filterBy",
			value: function(e) {
				if (!e || !e.length) return this.glyphs;
				var t = [],
				n = !0,
				r = !1,
				i = void 0;
				try {
					for (var o, l = (0, a.
				default)(this.glyphs); ! (n = (o = l.next()).done); n = !0) {
						var s = o.value;
						e.toUpperCase() === s.name.toUpperCase() && t.push(s)
					}
				} catch(e) {
					r = !0,
					i = e
				} finally {
					try { ! n && l.
						return && l.
						return ()
					} finally {
						if (r) throw i
					}
				}
				return t
			}
		},
		{
			key: "sortBy",
			value: function(e) {
				return "name" === e ? this._sortByName() : this.glyphs
			}
		},
		{
			key: "_sortByName",
			value: function() {
				return this.glyphs.sort(function(e, t) {
					var n = e.name.toUpperCase(),
					r = t.name.toUpperCase();
					return n < r ? -1 : n > r ? 1 : 0
				})
			}
		},
		{
			key: "isEmpty",
			get: function() {
				return ! this.glyphs.length
			}
		}]),
		e
	} ();
	t.
default = l
},
function(e, t, n) {
	"use strict";
	function r(e) {
		return e && e.__esModule ? e: {
		default:
			e
		}
	}
	Object.defineProperty(t, "__esModule", {
		value: !0
	});
	var a = r(n(159)),
	i = r(n(160)),
	o = r(n(171)),
	l = r(n(173));
	t.
default = {
		view: function() {
			return m(state.theme, m("fr-workspace.fr-theme-bg", m(a.
		default), m(i.
		default), m(o.
		default), m(l.
		default)))
		}
	}
},
function(e, t, n) {
	"use strict";
	Object.defineProperty(t, "__esModule", {
		value: !0
	}),
	t.
default = {
		oninit: function() {
			this.reload = function(e) {
				e.preventDefault(),
				location.reload()
			},
			this.showFont = function(e) {
				e.preventDefault(),
				window._actions_.showFont()
			},
			this.export = function(e) {
				e.preventDefault(),
				window._actions_.export()
			},
			this.open = function(e) {
				state.tab = e
			},
			this.openMenu = function() {
				window._actions_.openMenu()
			},
			this.DevNode = null,
			this.NavMenuNode = null,
			this.NavMenuNode = m("nav-menu", {
				onclick: this.openMenu
			},
			m(".icon.icon-menu"))
		},
		view: function() {
			var e = "editor" === state.tab ? ".selected": "",
			t = "info" === state.tab ? ".selected": "";
			return m("fr-navigation.fr-theme-border", m("fr-tabs", this.DevNode, m("nav-tab.fr-theme-button.left" + e, {
				onclick: this.open.bind(this, "editor")
			},
			"编辑"), m("nav-tab.fr-theme-button.right" + t, {
				onclick: this.open.bind(this, "info")
			},
			"属性"), this.NavMenuNode))
		}
	}
},
function(e, t, n) {
	"use strict";
	function r(e) {
		return e && e.__esModule ? e: {
		default:
			e
		}
	}
	Object.defineProperty(t, "__esModule", {
		value: !0
	});
	var a = r(n(161)),
	i = r(n(164)),
	o = r(n(165)),
	l = r(n(166)),
	s = r(n(168)),
	u = r(n(169));
	t.
default = {
		view: function() {
			return "editor" !== state.tab ? null: m("fr-container", m(a.
		default), m("fr-canvas.fr-theme-border", m(i.
		default), m(o.
		default), m(l.
		default)), m(s.
		default), m(u.
		default))
		}
	}
},
function(e, t, n) {
	"use strict";
	function r(e) {
		return e && e.__esModule ? e: {
		default:
			e
		}
	}
	Object.defineProperty(t, "__esModule", {
		value: !0
	});
	var a = r(n(162)),
	i = r(n(163));
	t.
default = {
		view: function() {
			var e = state.editor.glyph ? m(i.
		default):
			m(a.
		default);
			return m("fr-top-bar.fr-theme-bg", e)
		}
	}
},
function(e, t, n) {
	"use strict";
	Object.defineProperty(t, "__esModule", {
		value: !0
	}),
	t.
default = {
		oninit: function() {
			this.search = function(e) {
				state.searchText = e
			},
			this.import = function(e) {
				e.preventDefault(),
				window._actions_.import()
			},
			this.remove = function(e) {
				e.preventDefault();
				for (var t in state.selectedGlyphs) {
					var n = state.font.findById(t);
					state.font.removeGlyph(n)
				}
				state.selectedGlyphs = {},
				state.font.preview()
			},
			this.shouldDelete = function() {
				for (var e in state.selectedGlyphs) if ("space" !== e && state.selectedGlyphs[e]) return ! 0;
				return ! 1
			}
		},
		view: function() {
			var e = {};
			return this.shouldDelete() || (e = {
				opacity: "0.25",
				pointerEvents: "none"
			}),
			m("content.fr-theme-bg", m("icon-button#icon-search.fr-theme-font-color", m(".icon.icon-search")), m("input#search-input", {
				spellcheck: !1,
				autocomplete: "off",
				autocorrect: "off",
				autocapitalize: "off",
				placeholder: "搜索文字",
				value: state.searchText,
				oninput: m.withAttr("value", this.search)
			}), m("icon-button#icon-import", {
				onclick: this.import
			},
			m(".icon.icon-import")), m("icon-button#icon-delete", {
				style: e,
				onclick: this.remove
			},
			m(".icon.icon-trash")))
		}
	}
},
function(e, t, n) {
	"use strict";
	Object.defineProperty(t, "__esModule", {
		value: !0
	});
	var r = function(e) {
		return e && e.__esModule ? e: {
		default:
			e
		}
	} (n(76));
	t.
default = {
		oninit: function() {
			this.prevent = function(e) {
				e.stopPropagation(),
				e.preventDefault()
			},
			this.close = function() {
				state.editor.glyph = null
			},
			this.previous = function() {
				var e = state.editor.glyph;
				e && e.previousSibling && (state.editor.glyph = e.previousSibling, state.selectedGlyphs = (0, r.
			default)({},
				e.previousSibling.id, !0))
			},
			this.next = function() {
				var e = state.editor.glyph;
				e && e.nextSibling && (state.editor.glyph = e.nextSibling, state.selectedGlyphs = (0, r.
			default)({},
				e.nextSibling.id, !0))
			},
			this.updateSize = function(e) {
				state.editor.size = Number(e)
			}
		},
		view: function() {
			var e = state.editor.glyph;
			if (!e) return null;
			var t = {},
			n = {};
			return e.previousSibling || (t.pointerEvents = "none", t.opacity = "0.15"),
			e.nextSibling || (n.pointerEvents = "none", n.opacity = "0.15"),
			m("content.fr-theme-bg", m("button-close.fr-theme-font-color", {
				onclick: this.close
			},
			m("icon.icon-close")), m("button-group.fr-theme-font-color", m("button-nav", {
				style: t,
				onclick: this.previous
			},
			m(".icon.icon-keyboard_arrow_left")), m("glyph-title", e.name), m("button-nav", {
				style: n,
				onclick: this.next
			},
			m(".icon.icon-keyboard_arrow_right"))), m("glyph-slider", {
				ondblclick: this.prevent
			},
			m("input.slider[type=range]", {
				min: 50,
				max: 500,
				value: state.editor.size,
				oninput: m.withAttr("value", this.updateSize)
			})))
		}
	}
},
function(e, t, n) {
	"use strict";
	Object.defineProperty(t, "__esModule", {
		value: !0
	}),
	t.
default = {
		view: function() {
			if (state.searchText) {
				return state.font.findByName(state.searchText) ? null: m("glyphs-empty", m("icon-empty.icon.icon-search"), m("empty-title", "No result found"))
			}
			return state.font.isEmpty ? m("glyphs-empty", m("icon-empty.icon.icon-sparkle"), m("empty-title", m("div", "给每个图层适当的符号名称，例如给A、B、$等每一层增加一个字形。", m("br"), m("br"), "点击 ", m(".icon.icon-import"), " 导入选择的层。"))) : null
		}
	}
},
function(e, t, n) {
	"use strict";
	Object.defineProperty(t, "__esModule", {
		value: !0
	});
	var r = function(e) {
		return e && e.__esModule ? e: {
		default:
			e
		}
	} (n(76)),
	a = {
		oninit: function(e) {
			var t = this;
			this.glyph = e.attrs.glyph || {},
			this.select = function(e) {
				e.stopPropagation();
				e.metaKey ? state.selectedGlyphs[t.glyph.id] ? delete state.selectedGlyphs[t.glyph.id] : state.selectedGlyphs[t.glyph.id] = !0 : state.selectedGlyphs = (0, r.
			default)({},
				t.glyph.id, !0)
			},
			this.open = function() {
				state.selectedGlyphs = (0, r.
			default)({},
				t.glyph.id, !0),
				state.editor.glyph = t.glyph
			},
			this.prevent = function(e) {
				e.stopPropagation(),
				e.preventDefault()
			},
			this.isSelected = function() {
				return !! t.glyph && !!state.selectedGlyphs[t.glyph.id]
			}
		},
		view: function() {
			if (!this.glyph) return null;
			var e = "";
			this.isSelected() && (e = ".selected");
			return m("glyph-item" + e, m("glyph-ui", {
				style: {
					fontSize: "32px",
					fontFamily: '"fontrapid-preview", -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, Helvetica, Geneva, sans-serif'
				},
				onmousedown: this.select,
				ondblclick: this.open
			},
			this.glyph.character), m("glyph-name", this.glyph.name))
		}
	},
	i = {
		oninit: function() {
			this.prevent = function(e) {
				e.stopPropagation()
			}
		},
		view: function(e) {
			var t = e.attrs.category || {},
			n = e.attrs.toggle,
			r = 1 === state.font.glyphs.length && "space" === state.font.glyphs[0].id,
			i = t.filterBy(state.searchText);
			if (t.isEmpty || r || !i.length) return null;
			var o = m(".icon.icon-arrow-right"),
			l = void 0;
			return t.expanded && (o = m(".icon.icon-arrow-down"), l = m("category-content", i.map(function(e) {
				return m(a, {
					glyph: e,
					key: e.id
				})
			}))),
			m("glyphs-category", m("category-title", m("div", {
				onclick: n,
				onmousedown: this.prevent,
				style: "display: inline-block;"
			},
			o, t.name, m("category-count", i.length))), l)
		}
	};
	t.
default = {
		oninit: function() {
			this.cancelSelect = function(e) {
				e.preventDefault(),
				state.selectedGlyphs = {}
			},
			this.toggle = function(e, t) {
				t.stopPropagation(),
				e.expanded = !e.expanded
			}
		},
		view: function() {
			var e = this;
			return state.font.categories.length ? m("glyphs-list", {
				onmousedown: this.cancelSelect
			},
			state.font.categories.map(function(t) {
				return m(i, {
					category: t,
					toggle: e.toggle.bind(e, t),
					key: t.id
				})
			})) : null
		}
	}
},
function(e, t, n) {
	"use strict";
	Object.defineProperty(t, "__esModule", {
		value: !0
	});
	var r = function(e) {
		return e && e.__esModule ? e: {
		default:
			e
		}
	} (n(167)),
	a = new r.
default({
		metric:
		"left"
	}),
	i = new r.
default({
		metric:
		"right"
	}),
	o = new r.
default({
		metric:
		"ascender"
	}),
	l = new r.
default({
		metric:
		"descender"
	}),
	s = new r.
default({
		metric:
		"bottom"
	});
	t.
default = {
		oninit: function() {
			this.close = function() {
				state.editor.glyph = null
			},
			this.prevent = function(e) {
				e.stopPropagation(),
				e.preventDefault()
			}
		},
		view: function() {
			var e = state.editor.glyph;
			if (!e) return null;
			var t = state.editor.size / state.font.metrics.upm,
			n = t * state.font.scale,
			r = e.frame,
			u = window.innerWidth || 0,
			c = window.innerHeight - state.preview.height - 85,
			f = (u - r.w * n) / 2,
			p = (c - r.h * n) / 2,
			d = r.h * n - state.font.metrics.ascender * t,
			h = r.h * n - state.font.metrics.descender * t,
			g = -e.metrics.left * t,
			v = r.w * n + e.metrics.right * t,
			y = r.h * n - e.metrics.bottom * t;
			return m("glyph-canvas", {
				ondblclick: this.close
			},
			m("svg[width=100%][height=100%]", {
				style: {
					position: "absolute",
					top: "0",
					left: "0"
				}
			},
			m("g[transform=translate(" + f + ", " + p + ")]", m("line[x1=" + g + "][y1=" + r.h * n + "][x2=" + v + "][y2=" + r.h * n + "][stroke-width=1][stroke=red][opacity=0.7]"), m("line[x1=" + g + "][y1=" + d + "][x2=" + v + "][y2=" + d + "][stroke-width=1][stroke=#469bff]"), m("line[x1=" + g + "][y1=" + d + "][x2=" + v + "][y2=" + d + "][stroke-width=8][stroke=transparent].metric-ascender", {
				onmousedown: o.onmousedown,
				ondblclick: this.prevent
			}), m("line[x1=" + g + "][y1=" + h + "][x2=" + v + "][y2=" + h + "][stroke-width=1][stroke=#469bff]"), m("line[x1=" + g + "][y1=" + h + "][x2=" + v + "][y2=" + h + "][stroke-width=8][stroke=transparent].metric-descender", {
				onmousedown: l.onmousedown,
				ondblclick: this.prevent
			}), m("line[x1=" + g + "][y1=-5000][x2=" + g + "][y2=5000][stroke-width=1][stroke=#469bff]"), m("line[x1=" + g + "][y1=-5000][x2=" + g + "][y2=5000][stroke-width=8][stroke=transparent].metric-left", {
				onmousedown: a.onmousedown,
				ondblclick: this.prevent
			}), m("line[x1=" + v + "][y1=-5000][x2=" + v + "][y2=5000][stroke-width=1][stroke=#469bff]"), m("line[x1=" + v + "][y1=-5000][x2=" + v + "][y2=5000][stroke-width=8][stroke=transparent].metric-right", {
				onmousedown: i.onmousedown,
				ondblclick: this.prevent
			}), m("g[transform=translate(0, " + y + ")].glyph-path", {
				onmousedown: s.onmousedown
			},
			m("path[d=" + e.svgPath + "][fill-rule=evenodd][transform=scale(" + n + ",-" + n + ")]")))))
		}
	}
},
function(e, t, n) {
	"use strict";
	function r(e) {
		return e && e.__esModule ? e: {
		default:
			e
		}
	}
	Object.defineProperty(t, "__esModule", {
		value: !0
	});
	var a = r(n(21)),
	i = r(n(22)),
	o = function() {
		function e() {
			var t = this,
			n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}; (0, a.
		default)(this, e),
			this.metric = n.metric || "",
			this.length = 0,
			this.prevent = function(e) {
				e.stopPropagation(),
				e.preventDefault()
			},
			this.onmousedown = this.onmousedown.bind(this),
			this.shouldAttachDocEvents = !1,
			this.docEventsAttached = !1,
			this.mousePos = {
				x: 0,
				y: 0
			},
			this.distance = {
				x: 0,
				y: 0
			},
			this.docMousemove = function(e) {
				e.preventDefault();
				var n = state.editor.size / state.font.metrics.upm;
				state.resizing = !0;
				var r = "left" === t.metric || "right" === t.metric;
				document.body.style.cursor = "row-resize",
				r && (document.body.style.cursor = "col-resize");
				if (1 === e.which || 1 === e.buttons) {
					t.distance.x = "right" === t.metric ? e.clientX - t.mousePos.x: t.mousePos.x - e.clientX,
					t.distance.y = t.mousePos.y - e.clientY,
					t.mousePos = {
						x: e.clientX,
						y: e.clientY
					},
					t.length += r ? t.distance.x / n: t.distance.y / n,
					"descender" === t.metric && t.length >= -10 && (t.length = -10),
					"ascender" === t.metric && t.length <= 10 && (t.length = 10);
					var a = parseInt(t.length);
					switch (t.metric) {
					case "descender":
						state.font.metrics.descender = a;
						break;
					case "ascender":
						state.font.metrics.ascender = a;
						break;
					case "bottom":
						state.editor.glyph.metrics.bottom = a;
						break;
					case "left":
						state.editor.glyph.metrics.left = a;
						break;
					case "right":
						state.editor.glyph.metrics.right = a
					}
					m.redraw()
				}
			},
			this.docMouseup = function(e) {
				e.preventDefault(),
				state.resizing = !1,
				document.body.style.cursor = "default",
				document.removeEventListener("mousemove", t.docMousemove),
				document.removeEventListener("mouseup", t.docMouseup),
				t.shouldAttachDocEvents = !1,
				t.docEventsAttached = !1,
				state.font.preview(),
				window._actions_.save()
			}
		}
		return (0, i.
	default)(e, [{
			key: "onmousedown",
			value: function(e) {
				if (this.shouldAttachDocEvents = 1 === e.which || 1 === e.buttons, this.mousePos = {
					x: e.clientX,
					y: e.clientY
				},
				this.distance = {
					x: 0,
					y: 0
				},
				this.shouldAttachDocEvents && !this.docEventsAttached) switch (document.addEventListener("mousemove", this.docMousemove), document.addEventListener("mouseup", this.docMouseup), this.docEventsAttached = !0, this.metric) {
				case "descender":
					this.length = state.font.metrics.descender;
					break;
				case "ascender":
					this.length = state.font.metrics.ascender;
					break;
				case "bottom":
					this.length = state.editor.glyph.metrics.bottom;
					break;
				case "left":
					this.length = state.editor.glyph.metrics.left;
					break;
				case "right":
					this.length = state.editor.glyph.metrics.right
				}
			}
		}]),
		e
	} ();
	t.
default = o
},
function(e, t, n) {
	"use strict";
	Object.defineProperty(t, "__esModule", {
		value: !0
	}),
	t.
default = {
		oninit: function() {
			var e = this,
			t = !1,
			n = !1,
			r = {
				x: 0,
				y: 0
			},
			a = {
				x: 0,
				y: 0
			},
			i = function(t) {
				t.preventDefault(),
				state.resizing = !0,
				document.body.style.cursor = "row-resize"; (1 === t.which || 1 === t.buttons) && (a.x = t.clientX - r.x, a.y = t.clientY - r.y, r = {
					x: t.clientX,
					y: t.clientY
				},
				e.preview_height -= a.y, e.preview_height <= 0 && (e.preview_height = 0), e.preview_height >= window.innerHeight - 85 && (e.preview_height = window.innerHeight - 85), state.preview.height = e.preview_height, m.redraw())
			},
			o = function e(r) {
				r.preventDefault(),
				state.resizing = !1,
				document.body.style.cursor = "default",
				document.removeEventListener("mousemove", i),
				document.removeEventListener("mouseup", e),
				t = !1,
				n = !1,
				m.redraw()
			};
			this.onmousedown = function(l) {
				e.preview_height = state.preview.height,
				t = 1 === l.which || 1 === l.buttons,
				r = {
					x: l.clientX,
					y: l.clientY
				},
				a = {
					x: 0,
					y: 0
				},
				t && !n && (document.addEventListener("mousemove", i), document.addEventListener("mouseup", o), n = !0)
			},
			this.ondblclick = function(e) {
				e.preventDefault(),
				state.preview.height = 0
			}
		},
		view: function() {
			var e = {
				onmousedown: this.onmousedown,
				ondblclick: this.ondblclick
			};
			return m("splitter", e, m(".dots", m(".dot.fr-theme-fg"), m(".dot.fr-theme-fg"), m(".dot.fr-theme-fg")))
		}
	}
},
function(e, t, n) {
	"use strict";
	Object.defineProperty(t, "__esModule", {
		value: !0
	});
	var r = function(e) {
		return e && e.__esModule ? e: {
		default:
			e
		}
	} (n(170)),
	a = [{
		fg: "#fff",
		bg: "#4a5ab5"
	},
	{
		fg: "#fff",
		bg: "#333"
	},
	{
		fg: "#000",
		bg: "#ffde00"
	},
	{
		fg: "#000",
		bg: "#fff"
	},
	{
		fg: "#000",
		bg: "transparent"
	}];
	t.
default = {
		oninit: function() {
			var e = this;
			this.updatePreviewSize = function(e) {
				state.preview.size = e
			},
			this.updatePreview = function(e) {
				state.preview.text = e
			},
			this.switchPreview = function(e) {
				e.preventDefault();
				var t = r.
			default[e.target.selectedIndex];
				t && (state.preview.text = t.value, m.redraw())
			},
			this.showThemeChooser = !1,
			this.openThemeChooser = function(t) {
				t.preventDefault(),
				e.showThemeChooser = !0
			},
			this.closeTheme = function(t) {
				t.preventDefault(),
				e.showThemeChooser = !1
			},
			this.chooseTheme = function(t) {
				e.showThemeChooser = !1,
				state.preview.theme = t
			},
			this.clickGlyph = function(e) {
				if (state.editor.glyph) {
					var t = e.target.selectionStart,
					n = e.target.value[t],
					r = state.font.findById(n);
					r && (state.editor.glyph = r)
				}
			}
		},
		view: function() {
			var e = this,
			t = state.preview,
			n = t.size,
			i = state.font.metrics,
			o = {
				height: t.height + "px",
				pointerEvents: state.resizing ? "none": "auto"
			},
			l = {
				backgroundColor: state.preview.theme.bg
			},
			s = void 0;
			this.showThemeChooser && (s = m("theme-toolbar", a.map(function(t) {
				var n = {
					backgroundColor: t.bg
				};
				state.preview.theme === t && (n.boxShadow = "0px 0px 0px 2px rgba(0,0,0,0.15)");
				var r = "";
				return "transparent" === t.bg && (r = ".dot-bg", n.backgroundSize = "6px 6px"),
				m("theme-button" + r, {
					style: n,
					onclick: e.chooseTheme.bind(e, t)
				})
			}), m("theme-button-close", {
				onclick: this.closeTheme
			},
			m(".icon.icon-close"))));
			var u = "transparent" === state.preview.theme.bg ? ".dot-bg": "";
			return m("fr-preview.fr-theme-border", {
				style: o
			},
			m("toolbar", m(".left", m("select#preview-select", {
				onchange: this.switchPreview,
				value: state.preview.text
			},
			r.
		default.map(function(e) {
				return m("option[value=" + e.value + "]", {
					key: e.id
				},
				e.name)
			})), m("#preview-label", "预览文本", m(".icon.icon-arrow_drop_down"))), m(".right", m("preview-slider", m("slider-size", state.preview.size), m("input.slider[type=range][min=16][max=250]", {
				value: n,
				oninput: m.withAttr("value", this.updatePreviewSize)
			})), m("fr-preview-theme", m("theme-indicator", {
				style: l,
				onclick: this.openThemeChooser
			}), s))), m("textarea#preview-field" + u, {
				value: t.text,
				spellcheck: !1,
				onclick: this.clickGlyph,
				oninput: m.withAttr("value", this.updatePreview),
				style: {
					fontSize: n + "px",
					lineHeight: "" + (i.ascender - i.descender) / i.upm,
					fontFamily: '"fontrapid-preview", Arial, Helvetica, sans-serif',
					color: state.preview.theme.fg,
					backgroundColor: state.preview.theme.bg
				}
			}))
		}
	}
},
function(e, t, n) {
	"use strict";
	Object.defineProperty(t, "__esModule", {
		value: !0
	}),
	t.
default = [{
		id: 0,
		value: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz ‘?’“!”(%)[#]{@}/&\\<-+÷×=>®©$€£¥¢:;,.*",
		name: "常用拉丁字符"
	},
	{
		id: 1,
		value: "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz",
		name: "大小写混排"
	},
	{
		id: 2,
		value: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
		name: "大写"
	},
	{
		id: 3,
		value: "abcdefghijklmnopqrstuvwxyz",
		name: "小写"
	},
	{
		id: 4,
		value: "0123456789",
		name: "数字"
	},
	{
		id: 5,
		value: "The quick brown fox jumps over the lazy dog",
		name: "示例短句…"
	},
	{
		id: 5,
		value: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vitae posuere nibh. Curabitur metus ante, sagittis at sagittis quis, facilisis eget velit. Nullam eget augue semper, hendrerit diam ut, egestas libero. Maecenas neque eros, vulputate venenatis risus sit amet, posuere tempus dui. Sed ullamcorper nunc ac tempus aliquam. Quisque viverra magna in ex viverra tristique. Nunc fringilla viverra leo convallis fringilla. Pellentesque nec libero non felis sagittis auctor. Quisque sagittis rhoncus velit, quis aliquet ipsum sodales fringilla. Nam sit amet sem vitae sapien porttitor tempus at vestibulum eros.",
		name: "示例短文…"
	}]
},
function(e, t, n) {
	"use strict";
	Object.defineProperty(t, "__esModule", {
		value: !0
	});
	var r = function(e) {
		return e && e.__esModule ? e: {
		default:
			e
		}
	} (n(172));
	t.
default = {
		oninit: function() {
			this.updateWeight = function(e) {
				e.preventDefault();
				var t = e.target;
				state.font.metadata.weightClass = Number(t.value),
				state.font.metadata.styleName = t.options[t.selectedIndex].text,
				window._actions_.save()
			},
			this.updateItalic = function(e) {
				e.preventDefault(),
				state.font.metadata.italic = e.target.checked,
				window._actions_.save()
			}
		},
		view: function() {
			return "info" !== state.tab ? null: m("fr-container", m("fr-metadata", m("md-title.fr-theme-font-color", "字体名称"), m(r.
		default, {
				key: "familyName",
				placeholder: "请输入字体名称"
			}), m("md-title.fr-theme-font-color", "风格"), m("md-row", m("md-columns-two", m("select[name=weight].md-select", {
				onchange: this.updateWeight,
				value: state.font.metadata.weightClass
			},
			m("option", {
				value: 100
			},
			"Thin"), m("option", {
				value: 200
			},
			"Extralight"), m("option", {
				value: 300
			},
			"Light"), m("option", {
				value: 400
			},
			"Regular"), m("option", {
				value: 500
			},
			"Medium"), m("option", {
				value: 600
			},
			"Semibold"), m("option", {
				value: 700
			},
			"Bold"), m("option", {
				value: 800
			},
			"Heavy"), m("option", {
				value: 900
			},
			"Black")), m("md-option-style", m("input[type=checkbox].md-checkbox#isItalic", {
				onchange: this.updateItalic,
				checked: state.font.metadata.italic
			}), m("label[for=isItalic].fr-theme-font-color", "斜体")))), m("md-title.fr-theme-font-color", "版本"), m(r.
		default, {
				key: "version",
				className: ".version-input",
				placeholder: "请输入版本号"
			}), m("md-seperator.fr-theme-border"), m("md-title.fr-theme-font-color", "设计师"), m(r.
		default, {
				key: "designer",
				placeholder: "请输入设计师的名字"
			}), m("md-title.fr-theme-font-color", "设计师主页"), m(r.
		default, {
				key: "designerURL",
				placeholder: "请输入设计师主页"
			}), m("md-title.fr-theme-font-color", "设计主体"), m(r.
		default, {
				key: "manufacturer",
				placeholder: "请输入字体设计主体名称"
			}), m("md-title.fr-theme-font-color", "主体主页"), m(r.
		default, {
				key: "manufacturerURL",
				placeholder: "请输入主体主页"
			}), m("md-seperator.fr-theme-border"), m("md-title.fr-theme-font-color", "版权"), m(r.
		default, {
				key: "copyright",
				placeholder: "请输入版权信息"
			}), m("md-title.fr-theme-font-color", "商标"), m(r.
		default, {
				key: "trademark",
				placeholder: "请输入商标信息"
			}), m("md-title.fr-theme-font-color", "许可证"), m(r.
		default, {
				key: "license",
				placeholder: "字体许可条款"
			}), m("md-title.fr-theme-font-color", "许可证"), m(r.
		default, {
				key: "licenseURL",
				placeholder: "请输入许可证链接"
			})))
		}
	}
},
function(e, t, n) {
	"use strict";
	Object.defineProperty(t, "__esModule", {
		value: !0
	}),
	t.
default = {
		oninit: function(e) {
			var t = this;
			this.placeholder = e.attrs && e.attrs.placeholder || "",
			this.key = e.attrs.key,
			this.className = e.attrs.className || "",
			this.update = function(e) {
				state.font.metadata[t.key] = e
			},
			this.submit = function(e) {
				e.preventDefault(),
				window._actions_.save()
			}
		},
		view: function() {
			return m('input.md-input.fr-theme-input[autocomplete="off"][autocorrect="off"][autocapitalize="off"]' + this.className, {
				placeholder: this.placeholder,
				value: state.font.metadata[this.key],
				spellcheck: !1,
				oninput: m.withAttr("value", this.update),
				onblur: this.submit
			})
		}
	}
},
function(e, t, n) {
	"use strict";
	Object.defineProperty(t, "__esModule", {
		value: !0
	}),
	t.
default = {
		oninit: function() {
			this.showFont = function(e) {
				e.preventDefault(),
				window._actions_.showFont()
			},
			this.export = function(e) {
				e.preventDefault(),
				window._actions_.export()
			}
		},
		view: function() {
			var e = state.font.metadata.familyName || "无标题";
			return e += " - " + state.font.metadata.styleName,
			m("fr-bottom-bar.fr-theme-border", m("fr-project-name", {
				onclick: this.showFont
			},
			m("span", e)), m("fr-box", m("button.fr-theme-button", {
				onclick: this.export
			},
			"导出…")))
		}
	}
},
function(e, t, n) { !
	function() {
		"use strict";
		function t(e, t, n, r, a, i) {
			return {
				tag: e,
				key: t,
				attrs: n,
				children: r,
				text: a,
				dom: i,
				domSize: void 0,
				state: void 0,
				_state: void 0,
				events: void 0,
				instance: void 0,
				skip: !1
			}
		}
		function n(e) {
			for (var t in e) if (o.call(e, t)) return ! 1;
			return ! 0
		}
		function r(e) {
			var r, l = arguments[1],
			s = 2;
			if (null == e || "string" != typeof e && "function" != typeof e && "function" != typeof e.view) throw Error("The selector must be either a string or a component.");
			if ("string" == typeof e) var u = i[e] ||
			function(e) {
				for (var t, n = "div",
				r = [], o = {}; t = a.exec(e);) {
					var l = t[1],
					s = t[2];
					if ("" === l && "" !== s) n = s;
					else if ("#" === l) o.id = s;
					else if ("." === l) r.push(s);
					else if ("[" === t[3][0]) {
						var u = t[6];
						u && (u = u.replace(/\\(["'])/g, "$1").replace(/\\\\/g, "\\")),
						"class" === t[4] ? r.push(u) : o[t[4]] = "" === u ? u: u || !0
					}
				}
				return r.length > 0 && (o.className = r.join(" ")),
				i[e] = {
					tag: n,
					attrs: o
				}
			} (e);
			if (null == l ? l = {}: ("object" != typeof l || null != l.tag || Array.isArray(l)) && (l = {},
			s = 1), arguments.length === s + 1) r = arguments[s],
			Array.isArray(r) || (r = [r]);
			else for (r = []; s < arguments.length;) r.push(arguments[s++]);
			var c = t.normalizeChildren(r);
			return "string" == typeof e ?
			function(e, r, a) {
				var i, l, s = !1,
				u = r.className || r.class;
				if (!n(e.attrs) && !n(r)) {
					var c = {};
					for (var f in r) o.call(r, f) && (c[f] = r[f]);
					r = c
				}
				for (var f in e.attrs) o.call(e.attrs, f) && (r[f] = e.attrs[f]);
				void 0 !== u && (void 0 !== r.class && (r.class = void 0, r.className = u), null != e.attrs.className && (r.className = e.attrs.className + " " + u));
				for (var f in r) if (o.call(r, f) && "key" !== f) {
					s = !0;
					break
				}
				return Array.isArray(a) && 1 === a.length && null != a[0] && "#" === a[0].tag ? l = a[0].children: i = a,
				t(e.tag, r.key, s ? r: void 0, i, l)
			} (u, l, c) : t(e, l.key, l, c)
		}
		t.normalize = function(e) {
			return Array.isArray(e) ? t("[", void 0, void 0, t.normalizeChildren(e), void 0, void 0) : null != e && "object" != typeof e ? t("#", void 0, void 0, !1 === e ? "": e, void 0, void 0) : e
		},
		t.normalizeChildren = function(e) {
			for (var n = 0; n < e.length; n++) e[n] = t.normalize(e[n]);
			return e
		};
		var a = /(?:(^|#|\.)([^#\.\[\]]+))|(\[(.+?)(?:\s*=\s*("|'|)((?:\\["'\]]|.)*?)\5)?\])/g,
		i = {},
		o = {}.hasOwnProperty;
		r.trust = function(e) {
			return null == e && (e = ""),
			t("<", void 0, void 0, e, void 0, void 0)
		},
		r.fragment = function(e, n) {
			return t("[", e.key, e, t.normalizeChildren(n), void 0, void 0)
		};
		var l = r;
		if ((s = function(e) {
			function t(e, t) {
				return function o(s) {
					var f;
					try {
						if (!t || null == s || "object" != typeof s && "function" != typeof s || "function" != typeof(f = s.then)) c(function() { ! t && e.length;
							for (var n = 0; n < e.length; n++) e[n](s);
							a.length = 0,
							i.length = 0,
							u.state = t,
							u.retry = function() {
								o(s)
							}
						});
						else {
							if (s === r) throw new TypeError("Promise can't be resolved w/ itself");
							n(f.bind(s))
						}
					} catch(e) {
						l(e)
					}
				}
			}
			function n(e) {
				function t(e) {
					return function(t) {
						n++>0 || e(t)
					}
				}
				var n = 0,
				r = t(l);
				try {
					e(t(o), r)
				} catch(e) {
					r(e)
				}
			}
			if (! (this instanceof s)) throw new Error("Promise must be called with `new`");
			if ("function" != typeof e) throw new TypeError("executor must be a function");
			var r = this,
			a = [],
			i = [],
			o = t(a, !0),
			l = t(i, !1),
			u = r._instance = {
				resolvers: a,
				rejectors: i
			},
			c = "function" == typeof setImmediate ? setImmediate: setTimeout;
			n(e)
		}).prototype.then = function(e, t) {
			function n(e, t, n, o) {
				t.push(function(t) {
					if ("function" != typeof e) n(t);
					else try {
						r(e(t))
					} catch(e) {
						a && a(e)
					}
				}),
				"function" == typeof i.retry && o === i.state && i.retry()
			}
			var r, a, i = this._instance,
			o = new s(function(e, t) {
				r = e,
				a = t
			});
			return n(e, i.resolvers, r, !0),
			n(t, i.rejectors, a, !1),
			o
		},
		s.prototype.
		catch = function(e) {
			return this.then(null, e)
		},
		s.resolve = function(e) {
			return e instanceof s ? e: new s(function(t) {
				t(e)
			})
		},
		s.reject = function(e) {
			return new s(function(t, n) {
				n(e)
			})
		},
		s.all = function(e) {
			return new s(function(t, n) {
				var r = e.length,
				a = 0,
				i = [];
				if (0 === e.length) t([]);
				else for (var o = 0; o < e.length; o++) !
				function(o) {
					function l(e) {
						a++,
						i[o] = e,
						a === r && t(i)
					}
					null == e[o] || "object" != typeof e[o] && "function" != typeof e[o] || "function" != typeof e[o].then ? l(e[o]) : e[o].then(l, n)
				} (o)
			})
		},
		s.race = function(e) {
			return new s(function(t, n) {
				for (var r = 0; r < e.length; r++) e[r].then(t, n)
			})
		},
		"undefined" != typeof window) {
			void 0 === window.Promise && (window.Promise = s);
			var s = window.Promise
		} else if ("undefined" != typeof global) {
			void 0 === global.Promise && (global.Promise = s);
			s = global.Promise
		}
		var u = function(e) {
			function t(e, r) {
				if (Array.isArray(r)) for (var a = 0; a < r.length; a++) t(e + "[" + a + "]", r[a]);
				else if ("[object Object]" === Object.prototype.toString.call(r)) for (var a in r) t(e + "[" + a + "]", r[a]);
				else n.push(encodeURIComponent(e) + (null != r && "" !== r ? "=" + encodeURIComponent(r) : ""))
			}
			if ("[object Object]" !== Object.prototype.toString.call(e)) return "";
			var n = [];
			for (var r in e) t(r, e[r]);
			return n.join("&")
		},
		c = new RegExp("^file://", "i"),
		f = function(e, t) {
			function n() {
				function e() {
					0 == --t && "function" == typeof f && f()
				}
				var t = 0;
				return function n(r) {
					var a = r.then;
					return r.then = function() {
						t++;
						var i = a.apply(r, arguments);
						return i.then(e,
						function(n) {
							if (e(), 0 === t) throw n
						}),
						n(i)
					},
					r
				}
			}
			function r(e, t) {
				if ("string" == typeof e) {
					var n = e;
					null == (e = t || {}).url && (e.url = n)
				}
				return e
			}
			function a(e, t) {
				if (null == t) return e;
				for (var n = e.match(/:[^\/]+/gi) || [], r = 0; r < n.length; r++) {
					var a = n[r].slice(1);
					null != t[a] && (e = e.replace(n[r], t[a]))
				}
				return e
			}
			function i(e, t) {
				var n = u(t);
				return "" !== n && (e += (e.indexOf("?") < 0 ? "?": "&") + n),
				e
			}
			function o(e) {
				try {
					return "" !== e ? JSON.parse(e) : null
				} catch(t) {
					throw new Error(e)
				}
			}
			function l(e) {
				return e.responseText
			}
			function s(e, t) {
				if ("function" == typeof e) {
					if (!Array.isArray(t)) return new e(t);
					for (var n = 0; n < t.length; n++) t[n] = new e(t[n])
				}
				return t
			}
			var f, p = 0;
			return {
				request: function(u, f) {
					var p = n();
					u = r(u, f);
					var d = new t(function(t, n) {
						null == u.method && (u.method = "GET"),
						u.method = u.method.toUpperCase();
						var r = "GET" !== u.method && "TRACE" !== u.method && ("boolean" != typeof u.useBody || u.useBody);
						"function" != typeof u.serialize && (u.serialize = "undefined" != typeof FormData && u.data instanceof FormData ?
						function(e) {
							return e
						}: JSON.stringify),
						"function" != typeof u.deserialize && (u.deserialize = o),
						"function" != typeof u.extract && (u.extract = l),
						u.url = a(u.url, u.data),
						r ? u.data = u.serialize(u.data) : u.url = i(u.url, u.data);
						var f = new e.XMLHttpRequest,
						p = !1,
						d = f.abort;
						f.abort = function() {
							p = !0,
							d.call(f)
						},
						f.open(u.method, u.url, "boolean" != typeof u.async || u.async, "string" == typeof u.user ? u.user: void 0, "string" == typeof u.password ? u.password: void 0),
						u.serialize !== JSON.stringify || !r || u.headers && u.headers.hasOwnProperty("Content-Type") || f.setRequestHeader("Content-Type", "application/json; charset=utf-8"),
						u.deserialize !== o || u.headers && u.headers.hasOwnProperty("Accept") || f.setRequestHeader("Accept", "application/json, text/*"),
						u.withCredentials && (f.withCredentials = u.withCredentials);
						for (var h in u.headers)({}).hasOwnProperty.call(u.headers, h) && f.setRequestHeader(h, u.headers[h]);
						"function" == typeof u.config && (f = u.config(f, u) || f),
						f.onreadystatechange = function() {
							if (!p && 4 === f.readyState) try {
								var e = u.extract !== l ? u.extract(f, u) : u.deserialize(u.extract(f, u));
								if (f.status >= 200 && f.status < 300 || 304 === f.status || c.test(u.url)) t(s(u.type, e));
								else {
									var r = new Error(f.responseText);
									for (var a in e) r[a] = e[a];
									n(r)
								}
							} catch(e) {
								n(e)
							}
						},
						r && null != u.data ? f.send(u.data) : f.send()
					});
					return ! 0 === u.background ? d: p(d)
				},
				jsonp: function(o, l) {
					var u = n();
					o = r(o, l);
					var c = new t(function(t, n) {
						var r = o.callbackName || "_mithril_" + Math.round(1e16 * Math.random()) + "_" + p++,
						l = e.document.createElement("script");
						e[r] = function(n) {
							l.parentNode.removeChild(l),
							t(s(o.type, n)),
							delete e[r]
						},
						l.onerror = function() {
							l.parentNode.removeChild(l),
							n(new Error("JSONP request failed")),
							delete e[r]
						},
						null == o.data && (o.data = {}),
						o.url = a(o.url, o.data),
						o.data[o.callbackKey || "callback"] = r,
						l.src = i(o.url, o.data),
						e.document.documentElement.appendChild(l)
					});
					return ! 0 === o.background ? c: u(c)
				},
				setCompletionCallback: function(e) {
					f = e
				}
			}
		} (window, s),
		p = function(e) {
			function n(e) {
				return e.attrs && e.attrs.xmlns || D[e.tag]
			}
			function r(e, t, n, r, i, o, l) {
				for (var s = n; s < r; s++) {
					var u = t[s];
					null != u && a(e, u, i, l, o)
				}
			}
			function a(e, l, s, u, c) {
				var d = l.tag;
				if ("string" != typeof d) return function(e, t, n, r, i) {
					if (o(t, n), null != t.instance) {
						var l = a(e, t.instance, n, r, i);
						return t.dom = t.instance.dom,
						t.domSize = null != t.dom ? t.instance.domSize: 0,
						f(e, l, i),
						l
					}
					return t.domSize = 0,
					k
				} (e, l, s, u, c);
				switch (l.state = {},
				null != l.attrs && x(l.attrs, l, s), d) {
				case "#":
					return function(e, t, n) {
						return t.dom = L.createTextNode(t.children),
						f(e, t.dom, n),
						t.dom
					} (e, l, c);
				case "<":
					return i(e, l, c);
				case "[":
					return function(e, t, n, a, i) {
						var o = L.createDocumentFragment();
						if (null != t.children) {
							var l = t.children;
							r(o, l, 0, l.length, n, null, a)
						}
						return t.dom = o.firstChild,
						t.domSize = o.childNodes.length,
						f(e, o, i),
						o
					} (e, l, s, u, c);
				default:
					return function(e, a, i, o, l) {
						var s = a.tag,
						u = a.attrs,
						c = u && u.is,
						d = (o = n(a) || o) ? c ? L.createElementNS(o, s, {
							is: c
						}) : L.createElementNS(o, s) : c ? L.createElement(s, {
							is: c
						}) : L.createElement(s);
						a.dom = d,
						null != u &&
						function(e, t, n) {
							for (var r in t) v(e, r, null, t[r], n)
						} (a, u, o);
						if (f(e, d, l), null != a.attrs && null != a.attrs.contenteditable) p(a);
						else if (null != a.text && ("" !== a.text ? d.textContent = a.text: a.children = [t("#", void 0, void 0, a.text, void 0, void 0)]), null != a.children) {
							var h = a.children;
							r(d, h, 0, h.length, i, null, o),
							function(e) {
								var t = e.attrs;
								"select" === e.tag && null != t && ("value" in t && v(e, "value", null, t.value, void 0), "selectedIndex" in t && v(e, "selectedIndex", null, t.selectedIndex, void 0))
							} (a)
						}
						return d
					} (e, l, s, u, c)
				}
			}
			function i(e, t, n) {
				var r = {
					caption: "table",
					thead: "table",
					tbody: "table",
					tfoot: "table",
					tr: "tbody",
					th: "tr",
					td: "tr",
					colgroup: "table",
					col: "colgroup"
				} [(t.children.match(/^\s*?<(\w+)/im) || [])[1]] || "div",
				a = L.createElement(r);
				a.innerHTML = t.children,
				t.dom = a.firstChild,
				t.domSize = a.childNodes.length;
				for (var i, o = L.createDocumentFragment(); i = a.firstChild;) o.appendChild(i);
				return f(e, o, n),
				o
			}
			function o(e, n) {
				var r;
				if ("function" == typeof e.tag.view) {
					if (e.state = Object.create(e.tag), null != (r = e.state.view).$$reentrantLock$$) return k;
					r.$$reentrantLock$$ = !0
				} else {
					if (e.state = void 0, null != (r = e.tag).$$reentrantLock$$) return k;
					r.$$reentrantLock$$ = !0,
					e.state = null != e.tag.prototype && "function" == typeof e.tag.prototype.view ? new e.tag(e) : e.tag(e)
				}
				if (e._state = e.state, null != e.attrs && x(e.attrs, e, n), x(e._state, e, n), e.instance = t.normalize(e._state.view.call(e.state, e)), e.instance === e) throw Error("A view cannot return the vnode it received as argument");
				r.$$reentrantLock$$ = null
			}
			function l(e, t, n, i, o, l, p) {
				if (t !== n && (null != t || null != n)) if (null == t) r(e, n, 0, n.length, o, l, p);
				else if (null == n) d(t, 0, t.length, n);
				else {
					if (t.length === n.length) {
						for (var h = !1,
						m = 0; m < n.length; m++) if (null != n[m] && null != t[m]) {
							h = null == n[m].key && null == t[m].key;
							break
						}
						if (h) {
							for (m = 0; m < t.length; m++) t[m] !== n[m] && (null == t[m] && null != n[m] ? a(e, n[m], o, p, c(t, m + 1, l)) : null == n[m] ? d(t, m, m + 1, n) : s(e, t[m], n[m], o, c(t, m + 1, l), i, p));
							return
						}
					}
					if (i = i ||
					function(e, t) {
						if (null != e.pool && Math.abs(e.pool.length - t.length) <= Math.abs(e.length - t.length)) {
							var n = e[0] && e[0].children && e[0].children.length || 0,
							r = e.pool[0] && e.pool[0].children && e.pool[0].children.length || 0,
							a = t[0] && t[0].children && t[0].children.length || 0;
							if (Math.abs(r - a) <= Math.abs(n - a)) return ! 0
						}
						return ! 1
					} (t, n)) {
						var g = t.pool;
						t = t.concat(t.pool)
					}
					for (var v, y = 0,
					b = 0,
					x = t.length - 1,
					S = n.length - 1; x >= y && S >= b;) {
						if ((L = t[y]) !== (k = n[b]) || i) if (null == L) y++;
						else if (null == k) b++;
						else if (L.key === k.key) {
							var w = null != g && y >= t.length - g.length || null == g && i;
							b++,
							s(e, L, k, o, c(t, ++y, l), w, p),
							i && L.tag === k.tag && f(e, u(L), l)
						} else {
							if ((L = t[x]) !== k || i) if (null == L) x--;
							else if (null == k) b++;
							else {
								if (L.key !== k.key) break;
								w = null != g && x >= t.length - g.length || null == g && i;
								s(e, L, k, o, c(t, x + 1, l), w, p),
								(i || b < S) && f(e, u(L), c(t, y, l)),
								x--,
								b++
							} else x--,
							b++
						} else y++,
						b++
					}
					for (; x >= y && S >= b;) {
						var L, k;
						if ((L = t[x]) !== (k = n[S]) || i) if (null == L) x--;
						else if (null == k) S--;
						else if (L.key === k.key) {
							w = null != g && x >= t.length - g.length || null == g && i;
							s(e, L, k, o, c(t, x + 1, l), w, p),
							i && L.tag === k.tag && f(e, u(L), l),
							null != L.dom && (l = L.dom),
							x--,
							S--
						} else {
							if (v || (v = function(e, t) {
								for (var n = {},
								r = 0,
								r = 0; r < t; r++) {
									var a = e[r];
									if (null != a) {
										var i = a.key;
										null != i && (n[i] = r)
									}
								}
								return n
							} (t, x)), null != k) {
								var D = v[k.key];
								if (null != D) {
									var E = t[D];
									w = null != g && D >= t.length - g.length || null == g && i;
									s(e, E, k, o, c(t, x + 1, l), i, p),
									f(e, u(E), l),
									t[D].skip = !0,
									null != E.dom && (l = E.dom)
								} else {
									l = a(e, k, o, p, l)
								}
							}
							S--
						} else x--,
						S--;
						if (S < b) break
					}
					r(e, n, b, S + 1, o, l, p),
					d(t, y, x + 1, n)
				}
			}
			function s(e, r, c, f, d, m, g) {
				var w = r.tag;
				if (w === c.tag) {
					if (c.state = r.state, c._state = r._state, c.events = r.events, !m &&
					function(e, t) {
						var n, r;
						null != e.attrs && "function" == typeof e.attrs.onbeforeupdate && (n = e.attrs.onbeforeupdate.call(e.state, e, t));
						"string" != typeof e.tag && "function" == typeof e._state.onbeforeupdate && (r = e._state.onbeforeupdate.call(e.state, e, t));
						if (! (void 0 === n && void 0 === r || n || r)) return e.dom = t.dom,
						e.domSize = t.domSize,
						e.instance = t.instance,
						!0;
						return ! 1
					} (c, r)) return;
					if ("string" == typeof w) switch (null != c.attrs && (m ? (c.state = {},
					x(c.attrs, c, f)) : S(c.attrs, c, f)), w) {
					case "#":
						!
						function(e, t) {
							e.children.toString() !== t.children.toString() && (e.dom.nodeValue = t.children);
							t.dom = e.dom
						} (r, c);
						break;
					case "<":
						!
						function(e, t, n, r) {
							t.children !== n.children ? (u(t), i(e, n, r)) : (n.dom = t.dom, n.domSize = t.domSize)
						} (e, r, c, d);
						break;
					case "[":
						!
						function(e, t, n, r, a, i, o) {
							l(e, t.children, n.children, r, a, i, o);
							var s = 0,
							u = n.children;
							if (n.dom = null, null != u) {
								for (var c = 0; c < u.length; c++) {
									var f = u[c];
									null != f && null != f.dom && (null == n.dom && (n.dom = f.dom), s += f.domSize || 1)
								}
								1 !== s && (n.domSize = s)
							}
						} (e, r, c, m, f, d, g);
						break;
					default:
						!
						function(e, r, a, i, o) {
							var s = r.dom = e.dom;
							o = n(r) || o,
							"textarea" === r.tag && (null == r.attrs && (r.attrs = {}), null != r.text && (r.attrs.value = r.text, r.text = void 0)); (function(e, t, n, r) {
								if (null != n) for (var a in n) v(e, a, t && t[a], n[a], r);
								if (null != t) for (var a in t) null != n && a in n || ("className" === a && (a = "class"), "o" !== a[0] || "n" !== a[1] || y(a) ? "key" !== a && e.dom.removeAttribute(a) : b(e, a, void 0))
							})(r, e.attrs, r.attrs, o),
							null != r.attrs && null != r.attrs.contenteditable ? p(r) : null != e.text && null != r.text && "" !== r.text ? e.text.toString() !== r.text.toString() && (e.dom.firstChild.nodeValue = r.text) : (null != e.text && (e.children = [t("#", void 0, void 0, e.text, void 0, e.dom.firstChild)]), null != r.text && (r.children = [t("#", void 0, void 0, r.text, void 0, void 0)]), l(s, e.children, r.children, a, i, null, o))
						} (r, c, m, f, g)
					} else !
					function(e, n, r, i, l, u, c) {
						if (u) o(r, i);
						else {
							if (r.instance = t.normalize(r._state.view.call(r.state, r)), r.instance === r) throw Error("A view cannot return the vnode it received as argument");
							null != r.attrs && S(r.attrs, r, i),
							S(r._state, r, i)
						}
						null != r.instance ? (null == n.instance ? a(e, r.instance, i, c, l) : s(e, n.instance, r.instance, i, l, u, c), r.dom = r.instance.dom, r.domSize = r.instance.domSize) : null != n.instance ? (h(n.instance, null), r.dom = void 0, r.domSize = 0) : (r.dom = n.dom, r.domSize = n.domSize)
					} (e, r, c, f, d, m, g)
				} else h(r, null),
				a(e, c, f, g, d)
			}
			function u(e) {
				var t = e.domSize;
				if (null != t || null == e.dom) {
					var n = L.createDocumentFragment();
					if (t > 0) {
						for (var r = e.dom; --t;) n.appendChild(r.nextSibling);
						n.insertBefore(r, n.firstChild)
					}
					return n
				}
				return e.dom
			}
			function c(e, t, n) {
				for (; t < e.length; t++) if (null != e[t] && null != e[t].dom) return e[t].dom;
				return n
			}
			function f(e, t, n) {
				n && n.parentNode ? e.insertBefore(t, n) : e.appendChild(t)
			}
			function p(e) {
				var t = e.children;
				if (null != t && 1 === t.length && "<" === t[0].tag) {
					var n = t[0].children;
					e.dom.innerHTML !== n && (e.dom.innerHTML = n)
				} else if (null != e.text || null != t && 0 !== t.length) throw new Error("Child node of a contenteditable must be trusted")
			}
			function d(e, t, n, r) {
				for (var a = t; a < n; a++) {
					var i = e[a];
					null != i && (i.skip ? i.skip = !1 : h(i, r))
				}
			}
			function h(e, t) {
				function n() {
					if (++a === r && (g(e), e.dom)) {
						var n = e.domSize || 1;
						if (n > 1) for (var i = e.dom; --n;) m(i.nextSibling);
						m(e.dom),
						null == t || null != e.domSize ||
						function(e) {
							return null != e && (e.oncreate || e.onupdate || e.onbeforeremove || e.onremove)
						} (e.attrs) || "string" != typeof e.tag || (t.pool ? t.pool.push(e) : t.pool = [e])
					}
				}
				var r = 1,
				a = 0;
				if (e.attrs && "function" == typeof e.attrs.onbeforeremove) {
					null != (i = e.attrs.onbeforeremove.call(e.state, e)) && "function" == typeof i.then && (r++, i.then(n, n))
				}
				if ("string" != typeof e.tag && "function" == typeof e._state.onbeforeremove) {
					var i;
					null != (i = e._state.onbeforeremove.call(e.state, e)) && "function" == typeof i.then && (r++, i.then(n, n))
				}
				n()
			}
			function m(e) {
				var t = e.parentNode;
				null != t && t.removeChild(e)
			}
			function g(e) {
				if (e.attrs && "function" == typeof e.attrs.onremove && e.attrs.onremove.call(e.state, e), "string" != typeof e.tag)"function" == typeof e._state.onremove && e._state.onremove.call(e.state, e),
				null != e.instance && g(e.instance);
				else {
					var t = e.children;
					if (Array.isArray(t)) for (var n = 0; n < t.length; n++) {
						var r = t[n];
						null != r && g(r)
					}
				}
			}
			function v(e, t, n, r, a) {
				var i = e.dom;
				if ("key" !== t && "is" !== t && (n !== r ||
				function(e, t) {
					return "value" === t || "checked" === t || "selectedIndex" === t || "selected" === t && e.dom === L.activeElement
				} (e, t) || "object" == typeof r) && void 0 !== r && !y(t)) {
					var o = t.indexOf(":");
					if (o > -1 && "xlink" === t.substr(0, o)) i.setAttributeNS("http://www.w3.org/1999/xlink", t.slice(o + 1), r);
					else if ("o" === t[0] && "n" === t[1] && "function" == typeof r) b(e, t, r);
					else if ("style" === t) !
					function(e, t, n) {
						t === n && (e.style.cssText = "", t = null);
						if (null == n) e.style.cssText = "";
						else if ("string" == typeof n) e.style.cssText = n;
						else {
							"string" == typeof t && (e.style.cssText = "");
							for (var r in n) e.style[r] = n[r];
							if (null != t && "string" != typeof t) for (var r in t) r in n || (e.style[r] = "")
						}
					} (i, n, r);
					else if (t in i && !
					function(e) {
						return "href" === e || "list" === e || "form" === e || "width" === e || "height" === e
					} (t) && void 0 === a && !
					function(e) {
						return e.attrs.is || e.tag.indexOf("-") > -1
					} (e)) {
						if ("value" === t) {
							var l = "" + r;
							if (("input" === e.tag || "textarea" === e.tag) && e.dom.value === l && e.dom === L.activeElement) return;
							if ("select" === e.tag) if (null === r) {
								if ( - 1 === e.dom.selectedIndex && e.dom === L.activeElement) return
							} else if (null !== n && e.dom.value === l && e.dom === L.activeElement) return;
							if ("option" === e.tag && null != n && e.dom.value === l) return
						}
						if ("input" === e.tag && "type" === t) return void i.setAttribute(t, r);
						i[t] = r
					} else "boolean" == typeof r ? r ? i.setAttribute(t, "") : i.removeAttribute(t) : i.setAttribute("className" === t ? "class": t, r)
				}
			}
			function y(e) {
				return "oninit" === e || "oncreate" === e || "onupdate" === e || "onremove" === e || "onbeforeremove" === e || "onbeforeupdate" === e
			}
			function b(e, t, n) {
				var r = e.dom,
				a = "function" != typeof w ? n: function(e) {
					var t = n.call(r, e);
					return w.call(r, e),
					t
				};
				if (t in r) r[t] = "function" == typeof n ? a: null;
				else {
					var i = t.slice(2);
					if (void 0 === e.events && (e.events = {}), e.events[t] === a) return;
					null != e.events[t] && r.removeEventListener(i, e.events[t], !1),
					"function" == typeof n && (e.events[t] = a, r.addEventListener(i, e.events[t], !1))
				}
			}
			function x(e, t, n) {
				"function" == typeof e.oninit && e.oninit.call(t.state, t),
				"function" == typeof e.oncreate && n.push(e.oncreate.bind(t.state, t))
			}
			function S(e, t, n) {
				"function" == typeof e.onupdate && n.push(e.onupdate.bind(t.state, t))
			}
			var w, L = e.document,
			k = L.createDocumentFragment(),
			D = {
				svg: "http://www.w3.org/2000/svg",
				math: "http://www.w3.org/1998/Math/MathML"
			};
			return {
				render: function(e, n) {
					if (!e) throw new Error("Ensure the DOM element being passed to m.route/m.mount/m.render is not undefined.");
					var r = [],
					a = L.activeElement,
					i = e.namespaceURI;
					null == e.vnodes && (e.textContent = ""),
					Array.isArray(n) || (n = [n]),
					l(e, e.vnodes, t.normalizeChildren(n), !1, r, null, "http://www.w3.org/1999/xhtml" === i ? void 0 : i),
					e.vnodes = n,
					null != a && L.activeElement !== a && a.focus();
					for (var o = 0; o < r.length; o++) r[o]()
				},
				setEventCallback: function(e) {
					return w = e
				}
			}
		},
		d = function(e) {
			function t(e) {
				var t = a.indexOf(e);
				t > -1 && a.splice(t, 2)
			}
			function n() {
				for (var e = 1; e < a.length; e += 2) a[e]()
			}
			var r = p(e);
			r.setEventCallback(function(e) { ! 1 === e.redraw ? e.redraw = void 0 : n()
			});
			var a = [];
			return {
				subscribe: function(e, n) {
					t(e),
					a.push(e,
					function(e) {
						var t = 0,
						n = null,
						r = "function" == typeof requestAnimationFrame ? requestAnimationFrame: setTimeout;
						return function() {
							var a = Date.now();
							0 === t || a - t >= 16 ? (t = a, e()) : null === n && (n = r(function() {
								n = null,
								e(),
								t = Date.now()
							},
							16 - (a - t)))
						}
					} (n))
				},
				unsubscribe: t,
				redraw: n,
				render: r.render
			}
		} (window);
		f.setCompletionCallback(d.redraw);
		l.mount = function(e) {
			return function(n, r) {
				if (null === r) return e.render(n, []),
				void e.unsubscribe(n);
				if (null == r.view && "function" != typeof r) throw new Error("m.mount(element, component) expects a component, not a vnode");
				e.subscribe(n,
				function() {
					e.render(n, t(r))
				}),
				e.redraw()
			}
		} (d);
		var h = s,
		m = function(e) {
			if ("" === e || null == e) return {};
			"?" === e.charAt(0) && (e = e.slice(1));
			for (var t = e.split("&"), n = {},
			r = {},
			a = 0; a < t.length; a++) {
				var i = t[a].split("="),
				o = decodeURIComponent(i[0]),
				l = 2 === i.length ? decodeURIComponent(i[1]) : "";
				"true" === l ? l = !0 : "false" === l && (l = !1);
				var s = o.split(/\]\[?|\[/),
				u = n;
				o.indexOf("[") > -1 && s.pop();
				for (var c = 0; c < s.length; c++) {
					var f = s[c],
					p = s[c + 1],
					d = "" == p || !isNaN(parseInt(p, 10)),
					h = c === s.length - 1;
					if ("" === f) {
						null == r[o = s.slice(0, c).join()] && (r[o] = 0),
						f = r[o]++
					}
					null == u[f] && (u[f] = h ? l: d ? [] : {}),
					u = u[f]
				}
			}
			return n
		},
		g = function(e) {
			function t(t) {
				var n = e.location[t].replace(/(?:%[a-f89][a-f0-9])+/gim, decodeURIComponent);
				return "pathname" === t && "/" !== n[0] && (n = "/" + n),
				n
			}
			function n(e, t, n) {
				var r = e.indexOf("?"),
				a = e.indexOf("#"),
				i = r > -1 ? r: a > -1 ? a: e.length;
				if (r > -1) {
					var o = a > -1 ? a: e.length,
					l = m(e.slice(r + 1, o));
					for (var s in l) t[s] = l[s]
				}
				if (a > -1) {
					var u = m(e.slice(a + 1));
					for (var s in u) n[s] = u[s]
				}
				return e.slice(0, i)
			}
			var r, a = "function" == typeof e.history.pushState,
			i = "function" == typeof setImmediate ? setImmediate: setTimeout,
			o = {
				prefix: "#!"
			};
			return o.getPath = function() {
				switch (o.prefix.charAt(0)) {
				case "#":
					return t("hash").slice(o.prefix.length);
				case "?":
					return t("search").slice(o.prefix.length) + t("hash");
				default:
					return t("pathname").slice(o.prefix.length) + t("search") + t("hash")
				}
			},
			o.setPath = function(t, r, i) {
				var l = {},
				s = {};
				if (t = n(t, l, s), null != r) {
					for (var c in r) l[c] = r[c];
					t = t.replace(/:([^\/]+)/g,
					function(e, t) {
						return delete l[t],
						r[t]
					})
				}
				var f = u(l);
				f && (t += "?" + f);
				var p = u(s);
				if (p && (t += "#" + p), a) {
					var d = i ? i.state: null,
					h = i ? i.title: null;
					e.onpopstate(),
					i && i.replace ? e.history.replaceState(d, h, o.prefix + t) : e.history.pushState(d, h, o.prefix + t)
				} else e.location.href = o.prefix + t
			},
			o.defineRoutes = function(t, l, s) {
				function u() {
					var r = o.getPath(),
					a = {},
					i = n(r, a, a),
					u = e.history.state;
					if (null != u) for (var c in u) a[c] = u[c];
					for (var f in t) {
						var p = new RegExp("^" + f.replace(/:[^\/]+?\.{3}/g, "(.*?)").replace(/:[^\/]+/g, "([^\\/]+)") + "/?$");
						if (p.test(i)) return void i.replace(p,
						function() {
							for (var e = f.match(/:[^\/]+/g) || [], n = [].slice.call(arguments, 1, -2), i = 0; i < e.length; i++) a[e[i].replace(/:|\./g, "")] = decodeURIComponent(n[i]);
							l(t[f], a, r, f)
						})
					}
					s(r, a)
				}
				a ? e.onpopstate = function(e) {
					return function() {
						null == r && (r = i(function() {
							r = null,
							e()
						}))
					}
				} (u) : "#" === o.prefix.charAt(0) && (e.onhashchange = u),
				u()
			},
			o
		};
		l.route = function(e, n) {
			var r, a, i, o, l, s = g(e),
			u = function(e, u, c) {
				if (null == e) throw new Error("Ensure the DOM element that was passed to `m.route` is not undefined");
				var f = function() {
					null != r && n.render(e, r(t(a, i.key, i)))
				},
				p = function(e) {
					if (e === u) throw new Error("Could not resolve default route " + u);
					s.setPath(u, null, {
						replace: !0
					})
				};
				s.defineRoutes(c,
				function(e, t, n) {
					var s = l = function(e, u) {
						s === l && (a = null == u || "function" != typeof u.view && "function" != typeof u ? "div": u, i = t, o = n, l = null, r = (e.render ||
						function(e) {
							return e
						}).bind(e), f())
					};
					e.view || "function" == typeof e ? s({},
					e) : e.onmatch ? h.resolve(e.onmatch(t, n)).then(function(t) {
						s(e, t)
					},
					p) : s(e, "div")
				},
				p),
				n.subscribe(e, f)
			};
			return u.set = function(e, t, n) {
				null != l && ((n = n || {}).replace = !0),
				l = null,
				s.setPath(e, t, n)
			},
			u.get = function() {
				return o
			},
			u.prefix = function(e) {
				s.prefix = e
			},
			u.link = function(e) {
				e.dom.setAttribute("href", s.prefix + e.attrs.href),
				e.dom.onclick = function(e) {
					if (! (e.ctrlKey || e.metaKey || e.shiftKey || 2 === e.which)) {
						e.preventDefault(),
						e.redraw = !1;
						var t = this.getAttribute("href");
						0 === t.indexOf(s.prefix) && (t = t.slice(s.prefix.length)),
						u.set(t, void 0, void 0)
					}
				}
			},
			u.param = function(e) {
				return void 0 !== i && void 0 !== e ? i[e] : i
			},
			u
		} (window, d),
		l.withAttr = function(e, t, n) {
			return function(r) {
				t.call(n || this, e in r.currentTarget ? r.currentTarget[e] : r.currentTarget.getAttribute(e))
			}
		};
		var v = p(window);
		l.render = v.render,
		l.redraw = d.redraw,
		l.request = f.request,
		l.jsonp = f.jsonp,
		l.parseQueryString = m,
		l.buildQueryString = u,
		l.version = "1.1.6",
		l.vnode = t,
		e.exports = l
	} ()
},
function(e, t, n) {
	var r = n(176);
	"string" == typeof r && (r = [[e.i, r, ""]]);
	var a = {
		hmr: !0
	};
	a.transform = void 0;
	n(77)(r, a);
	r.locals && (e.exports = r.locals)
},
function(e, t, n) { (t = e.exports = n(42)(void 0)).i(n(177), ""),
	t.push([e.i, '/* RESET */\nhtml,\nbody {\n  margin: 0;\n  padding: 0;\n  width: 100%;\n  height: 100%;\n  cursor: default; }\n\nbody {\n  overflow: hidden;\n  font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, Helvetica, Geneva, sans-serif;\n  -webkit-backface-visibility: hidden;\n  -webkit-touch-callout: none;\n  font-size: 12px; }\n\n.icon {\n  display: inline-block;\n  flex-shrink: 0; }\n\n.dot-bg {\n  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAEVJREFUOBFjfPr06X8GIoC0tDQjEcoYmIhRRIqaUQNJCS3sakfDEHu4kCJKVOoHGUhsjhqNFFKCH7va0TDEHi6kiFI9DAHFCAfV7ctPwgAAAABJRU5ErkJggg=="); }\n\ntextarea {\n  border: none;\n  resize: none;\n  background: transparent;\n  -webkit-appearance: none; }\n\nfr-workspace {\n  width: 100%;\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  position: relative; }\n\nfr-container {\n  display: flex;\n  flex-direction: column;\n  flex-grow: 1; }\n\nglyphs-empty {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  overflow: hidden;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  flex-direction: column; }\n  glyphs-empty icon-empty {\n    font-size: 23px;\n    margin-bottom: 8px;\n    opacity: 0.35; }\n\nempty-title {\n  opacity: 0.45;\n  font-size: 11px;\n  padding: 0 10px;\n  max-width: 300px;\n  text-align: center; }\n\nfr-bottom-bar {\n  height: 26px;\n  background-color: #efefef;\n  border-top: 1px solid #b8b8b8;\n  flex-shrink: 0;\n  padding: 0 8px;\n  display: flex;\n  z-index: 9999;\n  align-items: center;\n  justify-content: space-between; }\n  fr-bottom-bar fr-project-name {\n    font-size: 11px;\n    line-height: 1.3;\n    opacity: 0.45;\n    white-space: nowrap;\n    text-overflow: ellipsis;\n    overflow: hidden;\n    margin-right: 6px; }\n    fr-bottom-bar fr-project-name span {\n      margin-right: 3px; }\n  fr-bottom-bar fr-project-name:hover {\n    opacity: 0.6; }\n  fr-bottom-bar fr-project-name:active {\n    opacity: 0.8; }\n  fr-bottom-bar .icon-history {\n    opacity: 0.35;\n    margin-right: 8px; }\n  fr-bottom-bar .icon-history:hover {\n    opacity: 0.5; }\n  fr-bottom-bar button {\n    -webkit-appearance: none;\n    border: none;\n    outline: none;\n    padding: 0 15px;\n    line-height: 1.3;\n    font-size: 11px;\n    height: 20px;\n    background-color: #fff;\n    border: 0.5px solid #bfbfbf;\n    color: #000;\n    text-align: center;\n    display: inline-block;\n    border-radius: 3px;\n    flex-shrink: 0; }\n  fr-bottom-bar button:active {\n    color: #fff;\n    background-color: #3b99fc;\n    border-color: #0881d2; }\n  fr-bottom-bar .long {\n    padding-left: 20px;\n    padding-right: 20px; }\n\nfr-navigation {\n  height: 26px;\n  width: 100%;\n  border-bottom: 1px solid #b8b8b8;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-grow: 0;\n  flex-shrink: 0;\n  background-color: #ebebeb; }\n  fr-navigation fr-tabs {\n    display: flex;\n    align-items: center; }\n    fr-navigation fr-tabs nav-tab {\n      text-align: center;\n      display: inline-block;\n      border-radius: 3px;\n      width: 45px;\n      padding: 3px 12px;\n      line-height: 1.3;\n      font-size: 10px;\n      z-index: 99; }\n    fr-navigation fr-tabs nav-tab.selected {\n      background-color: #3b99fc;\n      border-color: #0881d2;\n      color: #fff; }\n    fr-navigation fr-tabs .left {\n      border-right: none;\n      border-top-right-radius: 0;\n      border-bottom-right-radius: 0; }\n    fr-navigation fr-tabs .middle {\n      border-radius: 0; }\n    fr-navigation fr-tabs .right {\n      border-left: none;\n      border-top-left-radius: 0;\n      border-bottom-left-radius: 0; }\n    fr-navigation fr-tabs nav-dev {\n      position: absolute;\n      left: -17px;\n      top: -3px;\n      color: #fff;\n      background-color: red;\n      padding: 6px 15px 2px;\n      font-size: 7px;\n      transform: rotate(-45deg); }\n    fr-navigation fr-tabs nav-dev:active {\n      background-color: #ce1313; }\n    fr-navigation fr-tabs nav-menu {\n      position: absolute;\n      right: 8px;\n      top: 4px;\n      z-index: 0;\n      font-size: 12px;\n      line-height: 1px;\n      opacity: 0.4;\n      padding: 3px;\n      border-radius: 3px; }\n    fr-navigation fr-tabs nav-menu:hover {\n      opacity: 0.6;\n      background-color: #ccc; }\n\nsplitter {\n  width: 100%;\n  height: 5px;\n  cursor: row-resize;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n  border: none;\n  overflow: hidden; }\n  splitter .dots {\n    pointer-events: none;\n    flex-shrink: 0; }\n    splitter .dots .dot {\n      width: 3px;\n      height: 3px;\n      margin: 0 2px;\n      float: left;\n      display: inline-block;\n      overflow: hidden;\n      border-radius: 50%; }\n\nfr-preview {\n  height: 180px;\n  overflow: hidden;\n  border-width: 0.5px 0 0 0;\n  border-style: solid;\n  background-color: #fff;\n  display: flex;\n  max-height: 100%;\n  flex-direction: column;\n  flex-grow: 0; }\n  fr-preview toolbar {\n    height: 26px;\n    padding: 0 8px;\n    margin: 2px 0;\n    display: flex;\n    flex-shrink: 0;\n    align-items: center;\n    justify-content: space-between; }\n    fr-preview toolbar .left {\n      position: relative; }\n      fr-preview toolbar .left #preview-select {\n        width: 95px;\n        outline: none;\n        opacity: 0;\n        padding: 2px 0;\n        -webkit-appearance: none;\n        /* Override default CSS styles */\n        appearance: none;\n        margin-top: 2px; }\n      fr-preview toolbar .left #preview-label {\n        position: absolute;\n        top: 2px;\n        z-index: 3;\n        width: 85px;\n        padding: 2px 2px 2px 9px;\n        border-radius: 3px;\n        color: #9c9c9c;\n        background-color: #f4f4f4;\n        overflow: hidden;\n        opacity: 1;\n        pointer-events: none; }\n    fr-preview toolbar .right {\n      display: flex; }\n      fr-preview toolbar .right preview-slider {\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        width: 70px; }\n        fr-preview toolbar .right preview-slider slider-size {\n          width: 25px;\n          text-align: center;\n          overflow: hidden;\n          flex-shrink: 0;\n          font-size: 11px;\n          color: #bfbfbf; }\n        fr-preview toolbar .right preview-slider .slider {\n          -webkit-appearance: none;\n          /* Override default CSS styles */\n          appearance: none;\n          outline: none;\n          /* Remove outline */\n          opacity: 1;\n          width: 45px;\n          flex-shrink: 0; }\n        fr-preview toolbar .right preview-slider .slider::-webkit-slider-runnable-track {\n          width: 100%;\n          height: 3px;\n          border-radius: 5px;\n          background: #d8d8d8; }\n        fr-preview toolbar .right preview-slider .slider::-webkit-slider-thumb {\n          height: 10px;\n          width: 10px;\n          border-radius: 50%;\n          background: #3b99fc;\n          -webkit-appearance: none;\n          margin-top: -3px; }\n  fr-preview #preview-field {\n    /* width: 100%; */\n    height: 100%;\n    padding: 0;\n    margin: 0;\n    padding: 7px 10px;\n    overflow-y: auto;\n    overflow-x: hidden;\n    outline: none;\n    flex-grow: 1;\n    -webkit-user-select: auto;\n    -moz-user-select: auto;\n    -ms-user-select: auto;\n    user-select: auto; }\n\nfr-preview-theme {\n  width: 16px;\n  height: 16px;\n  flex-shrink: 0;\n  margin-left: 5px;\n  position: relative;\n  display: flex;\n  align-items: center;\n  justify-content: flex-end; }\n  fr-preview-theme theme-toolbar {\n    width: 120px;\n    height: 18px;\n    background-color: #fff;\n    position: absolute;\n    right: 0;\n    flex-shrink: 0;\n    display: flex;\n    align-items: center;\n    justify-content: flex-end; }\n  fr-preview-theme theme-indicator,\n  fr-preview-theme theme-button {\n    width: 12px;\n    height: 12px;\n    margin: 0 3px;\n    border: 0.5px solid #eee;\n    display: inline-block;\n    border-radius: 50%;\n    flex-shrink: 0;\n    transition: box-shadow 0.2s ease;\n    -webkit-transition: box-shadow 0.2s ease; }\n  fr-preview-theme theme-button-close {\n    width: 12px;\n    height: 12px;\n    margin: 0 3px;\n    border: 0.5px solid #eee;\n    display: flex;\n    border-radius: 50%;\n    flex-shrink: 0;\n    color: #a9a9a9;\n    background-color: #fff;\n    font-size: 9px;\n    justify-content: center;\n    align-items: center; }\n  fr-preview-theme theme-button:hover,\n  fr-preview-theme theme-button-close:hover {\n    box-shadow: 0px 0px 0px 2px rgba(0, 0, 0, 0.09); }\n\nfr-top-bar {\n  height: 24px;\n  position: relative;\n  flex-shrink: 0; }\n  fr-top-bar content {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    flex-shrink: 0;\n    position: absolute;\n    left: 8px;\n    right: 8px;\n    top: 0;\n    bottom: 0; }\n    fr-top-bar content button-close {\n      opacity: 0.5;\n      font-size: 13px;\n      width: 15px;\n      margin-right: 25px; }\n    fr-top-bar content button-close:active {\n      opacity: 0.8; }\n    fr-top-bar content button-group {\n      display: flex;\n      flex-direction: row; }\n      fr-top-bar content button-group button-nav {\n        font-size: 15px;\n        line-height: 0.5px;\n        margin: 0 2px;\n        opacity: 0.5;\n        transition: opacity 0.15s; }\n      fr-top-bar content button-group button-nav:hover {\n        opacity: 0.65; }\n      fr-top-bar content button-group button-nav:active {\n        opacity: 1; }\n      fr-top-bar content button-group glyph-title {\n        width: 35px;\n        text-align: center;\n        font-size: 12px; }\n    fr-top-bar content glyph-slider {\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      flex-shrink: 0;\n      width: 45px;\n      z-index: 9999; }\n      fr-top-bar content glyph-slider .slider {\n        width: 100%;\n        -webkit-appearance: none;\n        appearance: none;\n        flex-shrink: 0;\n        outline: none; }\n      fr-top-bar content glyph-slider .slider::-webkit-slider-runnable-track {\n        width: 100%;\n        height: 3px;\n        border-radius: 5px;\n        background: #c7c7c7; }\n      fr-top-bar content glyph-slider .slider::-webkit-slider-thumb {\n        height: 10px;\n        width: 10px;\n        border-radius: 50%;\n        background: #3b99fc;\n        -webkit-appearance: none;\n        margin-top: -3px; }\n    fr-top-bar content input#search-input {\n      width: 100%;\n      border: none;\n      outline: none;\n      margin-right: 5px;\n      background-color: transparent;\n      padding: 2px 5px 2px 10px;\n      line-height: 1.1;\n      font-size: 11px;\n      margin-left: -10px; }\n    fr-top-bar content icon-button {\n      font-size: 12px;\n      width: 18px;\n      height: 18px;\n      display: flex;\n      flex-shrink: 0;\n      align-items: center;\n      justify-content: center; }\n    fr-top-bar content #icon-search {\n      font-size: 11px;\n      color: #7d7d7d; }\n    fr-top-bar content #icon-import {\n      margin: 0 2px;\n      opacity: 0.6; }\n    fr-top-bar content #icon-delete {\n      opacity: 0.6; }\n    fr-top-bar content #icon-import:hover,\n    fr-top-bar content #icon-delete:hover {\n      opacity: 0.85; }\n    fr-top-bar content #icon-import:active,\n    fr-top-bar content #icon-delete:active {\n      opacity: 1; }\n\nfr-canvas {\n  background-color: #f2f2f2;\n  flex-grow: 1;\n  flex-shrink: 0;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  border-top: 1px solid #d1d1d1;\n  border-bottom: 1px solid #d1d1d1;\n  position: relative;\n  overflow: hidden; }\n\nglyphs-list {\n  flex-wrap: wrap;\n  display: flex;\n  justify-content: flex-start;\n  align-content: flex-start;\n  overflow-y: auto;\n  overflow-x: hidden;\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  padding: 5px; }\n  glyphs-list glyphs-category {\n    display: flex;\n    flex-wrap: wrap;\n    flex-direction: column;\n    width: 100%; }\n    glyphs-list glyphs-category category-title {\n      font-size: 12px;\n      padding-left: 2px;\n      margin: 3px 0;\n      color: #333;\n      flex-shrink: 0; }\n      glyphs-list glyphs-category category-title category-count {\n        font-size: 10px;\n        margin-left: 5px;\n        color: #b7b7b7; }\n    glyphs-list glyphs-category category-content {\n      display: flex;\n      flex-wrap: wrap;\n      width: 100%; }\n    glyphs-list glyphs-category glyph-item {\n      width: 50px;\n      height: 70px;\n      margin: 2px 3px;\n      display: flex;\n      align-items: center;\n      flex-direction: column;\n      position: relative;\n      align-self: flex-start; }\n      glyphs-list glyphs-category glyph-item button-delete {\n        position: absolute;\n        right: 3px;\n        top: 3px;\n        font-size: 10px;\n        opacity: 0.5;\n        color: #000;\n        display: none;\n        transition: opacity 0.2s; }\n      glyphs-list glyphs-category glyph-item button-delete:hover {\n        opacity: 0.98; }\n      glyphs-list glyphs-category glyph-item glyph-ui {\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        width: 50px;\n        height: 50px;\n        border: 0.5px solid #ccc;\n        background-color: #fff; }\n      glyphs-list glyphs-category glyph-item glyph-name {\n        font-size: 10px;\n        opacity: 0.5;\n        position: absolute;\n        bottom: 2px;\n        width: 100%;\n        text-align: center; }\n    glyphs-list glyphs-category glyph-item:hover button-delete {\n      display: inline-block; }\n    glyphs-list glyphs-category .selected glyph-ui {\n      border: 0.5px solid #3b99fc;\n      outline: 1.5px solid #3b99fc;\n      background-color: #fff; }\n    glyphs-list glyphs-category .selected button-delete {\n      color: #fff; }\n\nglyph-canvas {\n  display: flex;\n  overflow: hidden;\n  align-items: center;\n  justify-content: center;\n  background-color: #fff;\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0; }\n  glyph-canvas .metric-left,\n  glyph-canvas .metric-right {\n    cursor: col-resize; }\n  glyph-canvas .metric-ascender,\n  glyph-canvas .metric-descender {\n    cursor: row-resize; }\n  glyph-canvas .glyph-path {\n    cursor: ns-resize; }\n  glyph-canvas .glyph-path:hover {\n    /* stroke-width: 3px;\n    stroke: #43C0FF; */ }\n\nfr-metadata {\n  padding: 5px;\n  display: flex;\n  flex-direction: column;\n  flex-grow: 1;\n  overflow-y: auto;\n  overflow-x: hidden; }\n  fr-metadata md-seperator {\n    width: 100%;\n    height: 1px;\n    border-width: 0 0 1px 0;\n    border-style: solid;\n    margin: 8px 0 3px;\n    flex-shrink: 0; }\n  fr-metadata md-title {\n    font-size: 11px;\n    margin: 3px 0 2px 3px;\n    width: 100%;\n    text-align: left; }\n  fr-metadata md-row {\n    padding: 0 3px; }\n    fr-metadata md-row md-columns-two {\n      width: 170px;\n      display: flex;\n      align-items: center; }\n      fr-metadata md-row md-columns-two .md-select {\n        width: 100px; }\n      fr-metadata md-row md-columns-two md-option-style {\n        margin-left: 10px; }\n        fr-metadata md-row md-columns-two md-option-style label {\n          margin-left: 2px; }\n  fr-metadata input.md-input {\n    margin: 2px 3px;\n    border-width: 0.5px;\n    border-style: solid;\n    padding: 3px 5px;\n    font-size: 11px; }\n  fr-metadata input.md-input:focus {\n    outline: 2px solid #3b99fc; }\n  fr-metadata .version-input {\n    width: 140px; }\n', ""])
},
function(e, t, n) { (e.exports = n(42)(void 0)).push([e.i, "@font-face {\n  font-family: 'fricon';\n  src: url(" + n(178) + ') format(\'truetype\');\n  font-weight: normal;\n  font-style: normal;\n}\n\n[class^="icon-"], [class*=" icon-"] {\n  /* use !important to prevent issues with browser extensions that change fonts */\n  font-family: \'fricon\' !important;\n  speak: none;\n  font-style: normal;\n  font-weight: normal;\n  font-variant: normal;\n  text-transform: none;\n  line-height: 1;\n\n  /* Better Font Rendering =========== */\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\n.icon-anchor:before {\n  content: "\\E913";\n}\n.icon-import:before {\n  content: "\\E914";\n}\n.icon-external-link:before {\n  content: "\\E915";\n}\n.icon-menu:before {\n  content: "\\E916";\n}\n.icon-history:before {\n  content: "\\E911";\n}\n.icon-sparkle:before {\n  content: "\\E90E";\n}\n.icon-cancel:before {\n  content: "\\E909";\n}\n.icon-arrow-right:before {\n  content: "\\E907";\n}\n.icon-arrow-down:before {\n  content: "\\E903";\n}\n.icon-arrow-left:before {\n  content: "\\E908";\n}\n.icon-keyboard_arrow_right:before {\n  content: "\\E905";\n}\n.icon-keyboard_arrow_left:before {\n  content: "\\E906";\n}\n.icon-close:before {\n  content: "\\E904";\n}\n.icon-arrow_drop_down:before {\n  content: "\\E902";\n}\n.icon-share:before {\n  content: "\\E912";\n}\n.icon-trash:before {\n  content: "\\E901";\n}\n.icon-search:before {\n  content: "\\E900";\n}\n', ""])
},
function(e, t, n) {
	e.exports = n.p + "fricon.ttf"
},
function(e, t) {
	e.exports = function(e) {
		var t = "undefined" != typeof window && window.location;
		if (!t) throw new Error("fixUrls requires window.location");
		if (!e || "string" != typeof e) return e;
		var n = t.protocol + "//" + t.host,
		r = n + t.pathname.replace(/\/[^\/]*$/, "/");
		return e.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,
		function(e, t) {
			var a = t.trim().replace(/^"(.*)"$/,
			function(e, t) {
				return t
			}).replace(/^'(.*)'$/,
			function(e, t) {
				return t
			});
			if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(a)) return e;
			var i;
			return i = 0 === a.indexOf("//") ? a: 0 === a.indexOf("/") ? n + a: r + a.replace(/^\.\//, ""),
			"url(" + JSON.stringify(i) + ")"
		})
	}
},
function(e, t, n) {
	var r = n(181);
	"string" == typeof r && (r = [[e.i, r, ""]]);
	var a = {
		hmr: !0
	};
	a.transform = void 0;
	n(77)(r, a);
	r.locals && (e.exports = r.locals)
},
function(e, t, n) { (e.exports = n(42)(void 0)).push([e.i, "sketch-theme .fr-theme-fg {\n  background-color: #cbcbcb; }\n\nsketch-theme .fr-theme-bg {\n  background-color: #e6e6e6; }\n\nsketch-theme .fr-theme-font-color {\n  color: #000; }\n\nsketch-theme .fr-theme-button {\n  color: #000;\n  border: 0.5px solid #bfbfbf;\n  background-color: #fff; }\n\nsketch-theme .fr-theme-border {\n  border-color: #d1d1d1; }\n\nsketch-theme .fr-theme-input {\n  background-color: #fff;\n  border-color: #b5b5b5;\n  color: #000; }\n", ""])
},
function(e, t, n) {
	"use strict"; !
	function(e, t) {
		function n(e, t) {
			e.prototype[t] = function() {
				return this._q.push([t].concat(Array.prototype.slice.call(arguments, 0))),
				this
			}
		}
		function r(e) {
			function t(t) {
				e[t] = function() {
					e._q.push([t].concat(Array.prototype.slice.call(arguments, 0)))
				}
			}
			for (var n = 0; n < d.length; n++) t(d[n])
		}
		var a = e.amplitude || {
			_q: [],
			_iq: {}
		},
		i = t.createElement("script");
		i.type = "text/javascript",
		i.async = !0,
		i.src = "https://cdn.amplitude.com/libs/amplitude-4.0.0-min.gz.js",
		i.onload = function() {
			e.amplitude.runQueuedFunctions && e.amplitude.runQueuedFunctions()
		};
		var o = t.getElementsByTagName("script")[0];
		o.parentNode.insertBefore(i, o);
		for (var l = function() {
			return this._q = [],
			this
		},
		s = ["add", "append", "clearAll", "prepend", "set", "setOnce", "unset"], u = 0; u < s.length; u++) n(l, s[u]);
		a.Identify = l;
		for (var c = function() {
			return this._q = [],
			this
		},
		f = ["setProductId", "setQuantity", "setPrice", "setRevenueType", "setEventProperties"], p = 0; p < f.length; p++) n(c, f[p]);
		a.Revenue = c;
		var d = ["init", "logEvent", "logRevenue", "setUserId", "setUserProperties", "setOptOut", "setVersionName", "setDomain", "setDeviceId", "setGlobalUserProperties", "identify", "clearUserProperties", "setGroup", "logRevenueV2", "regenerateDeviceId", "logEventWithTimestamp", "logEventWithGroups", "setSessionId"];
		r(a),
		a.getInstance = function(e) {
			return e = (e && 0 !== e.length ? e: "$default_instance").toLowerCase(),
			a._iq.hasOwnProperty(e) || (a._iq[e] = {
				_q: []
			},
			r(a._iq[e])),
			a._iq[e]
		},
		e.amplitude = a
	} (window, document),
	amplitude.getInstance().init("125b24a8c3ba1745b90e835729db98b9")
}]);