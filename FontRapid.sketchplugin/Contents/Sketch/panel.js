function togglePanel(e) {
	var t = e.document,
	r = t.documentWindow().contentView();
	if (!r || !t.fontrapid || !t.fontrapid.view) return t.showMessage(t.fontrapid.message.error),
	!1;
	var a = r.subviews().objectAtIndex(0),
	n = a.subviews();
	if (t.fontrapid.show) t.fontrapid.view.removeFromSuperview(),
	t.fontrapid.show = !1;
	else {
		for (var o = [], i = 0; i < n.count(); i++) {
			var s = n.objectAtIndex(i);
			o.push(s),
			"view_canvas" == s.identifier() && (o.push(t.fontrapid.view), t.fontrapid.show = !0)
		}
		a.subviews = o
	}
	a.adjustSubviews()
}
function onRun(e) {
	var t = e.document,
	r = e.api();
	if ((r && r._metadata.appVersion) < 50) alert("😔 抱歉，fontRipid仅支持ketch50以上版本", "必须为Sketch 50以上!");
	else {
		t.fontrapid ? t.fontrapid.firstRun = !1 : t.fontrapid = {
			view: null,
			menu: null,
			autoRevealItem: null,
			lastExportURL: null,
			show: !1,
			firstRun: !0,
			eval: null,
			message: {
				success: "已成功创建字体! 🙌",
				error: "😥 有问题, 请联系 team@fontrapid.com帮助 "
			}
		};
		try {
			if (!t.fontrapid.view) {
				COScript.currentCOScript().shouldKeepAround = !0;
				for (var a = [{
					type: "自动显示",
					name: "导出后显示字体"
				},
				{
					name: null
				},
				{
					name: "连接"
				},
				{
					type: "url",
					name: "推特",
					url: "https://twitter.com/FontRapid"
				},
				{
					type: "url",
					name: "脸书",
					url: "https://facebook.com/FontRapid"
				},
				{
					type: "url",
					name: "官网",
					url: "https://fontrapid.com/"
				},
				{
					type: "url",
					name: "Dribbble",
					url: "https://dribbble.com/ZHANGXIN090"
				},
				{
					type: "url",
					name: "Uplabs",
					url: "https://www.uplabs.com/users/zhangxin/showcases"
				},
				{
					name: null
				},
				{
					type: "version",
					name: "V1.5.0 (20180511)"
				},
				{
					type: "url",
					name: "更新日志",
					url: "https://fontrapid.com/changelog.html"
				},
				{
					type: "url",
					name: "意见反馈",
					url: "mailto:team@fontrapid.com"
				},
				{
					name: null
				},
				{
					type: "reset",
					name: "清除导入的数据"
				},
				{
					type: "close",
					name: "关闭画板"
				}], n = function(e) {
					var t = e.representedObject();
					t = NSURL.URLWithString(t),
					NSWorkspace.sharedWorkspace().openURL(t)
				},
				o = function() {
					togglePanel(e)
				},
				i = function(e) {
					setUserPreferences({
						showFontAfterExport: !e.state()
					})
				},
				s = function() {
					t.fontrapid.eval("window._actions_.reset()")
				},
				l = NSMenu.alloc().init(), c = 0; c < a.length; c++) {
					var p, u = a[c];
					u.name ? (p = NSMenuItem.alloc().initWithTitle_action_keyEquivalent(u.name, nil, ""), "url" === u.type ? (p.representedObject = u.url, p.setCOSJSTargetFunction(n)) : "autoreveal" === u.type ? (p.setCOSJSTargetFunction(i), t.fontrapid.autoRevealItem = p) : "reset" === u.type ? p.setCOSJSTargetFunction(s) : "close" === u.type && p.setCOSJSTargetFunction(o)) : p = NSMenuItem.separatorItem(),
					l.addItem(p)
				}
				t.fontrapid.menu = l;
				var d = WebView.alloc().initWithFrame(NSMakeRect(0, -24, 235, 100)),
				f = d.windowScriptObject();
				d.setIdentifier("fontrapid_view");
				var h = new MochaJSDelegate({
					"webView:didFinishLoadForFrame:": function(r, a) {
						t.fontrapid.firstRun && (togglePanel(e), t.fontrapid.firstRun = !1)
					},
					"webView:didChangeLocationWithinPageForFrame:": function(r, a) {
						var n = f.evaluateWebScript("window.location.hash").replace("#", "").split("?"),
						o = n[0];
						if ("IMPORT" == o) {
							var i = {
								glyphs: parseSelectedLayers(),
								data: readCustomData(e)
							};
							i = JSON.stringify(i),
							f.evaluateWebScript("window._actions_.import(" + i + ", true)"),
							p = null
						} else if ("OPENURL" == o) {
							var s = n[1];
							s && (s = NSURL.URLWithString(decodeURIComponent(s)), NSWorkspace.sharedWorkspace().openURL(s))
						} else if ("MENU" == o) {
							if (t.fontrapid.menu) {
								if (t.fontrapid.autoRevealItem) {
									var l = getUserPreferences({
										showFontAfterExport: !1
									}).showFontAfterExport ? NSOnState: NSOffState;
									t.fontrapid.autoRevealItem.state = l
								}
								var c = NSEvent.mouseLocation();
								c.x += 5,
								t.fontrapid.menu.popUpMenuPositioningItem_atLocation_inView(nil, c, nil)
							}
						} else if ("SAVE" == o) {
							var p = f.evaluateWebScript("window._actions_.save(true)");
							saveCustomData(e, p)
						} else if ("SHOWFONT" == o) {
							if (t.fontrapid.lastExportURL) {
								var u = [t.fontrapid.lastExportURL];
								NSWorkspace.sharedWorkspace().activateFileViewerSelectingURLs(u)
							}
						} else if ("EXPORT" == o) {
							i = f.evaluateWebScript("window._actions_.export(true)");
							try {
								i = JSON.parse(i)
							} catch(e) {
								t.showMessage(t.fontrapid.message.error)
							}
							var d = i.fileName,
							h = NSSavePanel.savePanel();
							if (h.setNameFieldStringValue(d + ".otf"), h.setExtensionHidden(!1), h.runModal() == NSFileHandlingPanelOKButton) {
								var g = h.URL().path(),
								m = NSData.alloc().initWithBase64Encoding(i.data);
								NSFileManager.defaultManager().createFileAtPath_contents_attributes(g, m, nil),
								t.showMessage(t.fontrapid.message.success),
								t.fontrapid.lastExportURL = h.URL();
								if (getUserPreferences({
									showFontAfterExport: !1
								}).showFontAfterExport) {
									u = [h.URL()];
									NSWorkspace.sharedWorkspace().activateFileViewerSelectingURLs(u)
								}
								i = null
							}
						}
					}
				});
				d.frameLoadDelegate = h.getClassInstance(),
				d.mainFrameURL = e.plugin.urlForResourceNamed("panel.html").path(),
				t.fontrapid.view = d,
				t.fontrapid.eval = d.stringByEvaluatingJavaScriptFromString
			}
			t.fontrapid.firstRun || togglePanel(e)
		} catch(e) {
			t.showMessage(t.fontrapid.message.error)
		}
	}
}
function isPresent(e) {
	return null != e
}
function getUserPreferences(e) {
	var t = {},
	r = NSUserDefaults.alloc().initWithSuiteName("com.fontrapid.sketch");
	return Object.keys(e).forEach(function(a) {
		"boolean" == typeof e[a] ? t[a] = isPresent(r.boolForKey(a)) ? Boolean(r.boolForKey(a)) : e[a] : "number" == typeof e[a] ? t[a] = isPresent(r.doubleForKey(a)) ? r.doubleForKey(a) : e[a] : "string" == typeof e[a] ? t[a] = isPresent(r.stringForKey(a)) ? "" + r.stringForKey(a) : e[a] : Array.isArray(e[a]) ? t[a] = r.arrayForKey(a) || e[a] : t[a] = r.dictionaryForKey(a) || e[a]
	}),
	t
}
function setUserPreferences(e) {
	var t = NSUserDefaults.alloc().initWithSuiteName("com.fontrapid.sketch");
	Object.keys(e).forEach(function(r) {
		"boolean" == typeof e[r] ? t.setBool_forKey(e[r], r) : "number" == typeof e[r] ? t.setDouble_forKey(e[r], r) : t.setObject_forKey(e[r], r)
	}),
	t.synchronize()
}
function clearCustomData(e) {
	try {
		var t = e.command,
		r = e.document.currentPage();
		t.setValue_forKey_onLayer_forPluginIdentifier(nil, "data", r, "com.fontrapid.sketch")
	} catch(e) {}
}
function saveCustomData(e, t) {
	try {
		var r = e.command,
		a = e.document.currentPage(),
		n = "null";
		try { (n = r.valueForKey_onLayer_forPluginIdentifier("data", a, "com.fontrapid.sketch")) && !n.isKindOfClass(NSDictionary) && (n = JSON.parse(n) || {})
		} catch(e) {}
		n = "object" != typeof n ? {}: n,
		t = t && JSON.parse(t) || {},
		void 0 === n.glyphMetrics && (n.glyphMetrics = {});
		var o = t.glyphMetrics || {};
		for (var i in o) n.glyphMetrics[i] = o[i];
		n.metadata = t.metadata,
		n.metrics = t.metrics,
		n.modified = t.modified,
		n.version = t.version,
		n.type = t.type,
		r.setValue_forKey_onLayer_forPluginIdentifier(n, "data", a, "com.fontrapid.sketch")
	} catch(e) {}
}
function readCustomData(e) {
	var t = null;
	try {
		var r = e.command,
		a = e.document.currentPage();
		t = r.valueForKey_onLayer_forPluginIdentifier("data", a, "com.fontrapid.sketch")
	} catch(e) {}
	if (t) if (t.isKindOfClass(NSDictionary)) {
		var n = NSJSONSerialization.dataWithJSONObject_options_error(t, 0, nil);
		n ? (t = NSString.alloc().initWithData_encoding(n, NSUTF8StringEncoding), t = JSON.parse(t) || {}) : log("error")
	} else t = JSON.parse(t) || {};
	return t
}
function parseSelectedLayers() {
	var e = [],
	t = NSDocumentController.sharedDocumentController().currentDocument();
	if (t) {
		var r = t.selectedLayers().layers(),
		a = r.count();
		if (0 == a) return void alert("请至少选择一个具有任何有效标志符号名称的形状图层。", "无选择");
		for (var n = 0; n < a; n++) {
			var o = r[n];
			if (o.isKindOfClass(MSArtboardGroup)) for (var i = o.layers(), s = 0; s < i.count(); s++) { (l = parseGlyph(i[s])) && e.push(l)
			} else {
				var l; (l = parseGlyph(o)) && e.push(l)
			}
		}
	}
	return e
}
function parseGlyph(e) {
	var t = null;
	if (e && e.isKindOfClass(MSShapeGroup)) {
		var r = e.name();
		if (! (r = (r = toJSString(r)).replace(/ /g, "").replace(/[\u200B-\u200D\uFEFF]/g, "").replace(/[\b]/g, "").replace(/[\f]/g, "").replace(/[\n]/g, "").replace(/[\r]/g, "").replace(/[\t]/g, "")).length) return t;
		if (r.length > 1) {
			var a = r.indexOf(".liga") <= -1,
			n = r.indexOf(".alt") <= -1;
			if (a && n) return t
		}
		t = {
			name: r,
			frame: {},
			path: {}
		};
		var o = e.copy();
		o.isFlippedVertical = !e.isFlippedVertical();
		var i = o.pathInFrameWithTransforms();
		o = null;
		var s = i.bounds();
		t.frame = {
			x: 0,
			y: 0,
			w: parseFloat(s.size.width),
			h: parseFloat(s.size.height)
		};
		var l = parseFloat(s.origin.x),
		c = parseFloat(s.origin.y),
		p = parseMSPathPoints(i, l, c);
		transformPath(p, l, c),
		t.path.points = p
	}
	return t
}
function parseMSPathPoints(e, t, r) {
	for (var a = [], n = e.contours(), o = 0; o < n.length; o++) {
		for (var i = n[o], s = i.segments(), l = 0; l < s.length; l++) {
			var c = s[l],
			p = c.segmentType(),
			u = {},
			d = c.endPoint1(),
			f = c.endPoint2();
			if (0 == l) {
				var h = {
					t: "M",
					x: d.x,
					y: d.y
				};
				a.push(h)
			}
			switch (p) {
			case 0:
				u.t = "L",
				u.x = f.x,
				u.y = f.y;
				break;
			case 2:
				var g = c.controlPoint1(),
				m = c.controlPoint2();
				u.t = "C",
				u.x1 = g.x,
				u.y1 = g.y,
				u.x2 = m.x,
				u.y2 = m.y,
				u.x = f.x,
				u.y = f.y,
				u.x1 < t && (t = u.x1),
				u.y1 > r && (r = u.y1),
				u.x2 < t && (t = u.x2),
				u.y2 > r && (r = u.y2)
			}
			a.push(u)
		}
		i.isClosed() && a.push({
			t: "Z"
		})
	}
	return a
}
function parsePoints(e, t, r) {
	var a = [],
	n = e.description().split("\n");
	n = n.slice(3, n.length);
	for (var o = /((\-|\+?)\d+\.\d+)/g,
	i = 0; i < n.length; i++) {
		var s = {},
		l = n[i].match(o);
		switch (parseInt(e.elementAtIndex(i))) {
		case 0:
			s.t = "M",
			s.x = parseFloat(l[0]),
			s.y = parseFloat(l[1]);
			break;
		case 1:
			s.t = "L",
			s.x = parseFloat(l[0]),
			s.y = parseFloat(l[1]);
			break;
		case 2:
			s.t = "C",
			s.x1 = parseFloat(l[0]),
			s.y1 = parseFloat(l[1]),
			s.x2 = parseFloat(l[2]),
			s.y2 = parseFloat(l[3]),
			s.x = parseFloat(l[4]),
			s.y = parseFloat(l[5]),
			s.x1 < t && (t = s.x1),
			s.y1 > r && (r = s.y1),
			s.x2 < t && (t = s.x2),
			s.y2 > r && (r = s.y2);
			break;
		case 3:
			s.t = "Z"
		}
		a.push(s)
	}
	return a
}
function transformPath(e, t, r) {
	for (var a = 0,
	n = e.length; a < n; a++) {
		var o = e[a];
		"Z" != o.t && (o.x = o.x - t, o.y = o.y - r, "C" == o.t && (o.x1 = o.x1 - t, o.y1 = o.y1 - r, o.x2 = o.x2 - t, o.y2 = o.y2 - r))
	}
}
function toJSString(e) {
	return new String(e).toString()
}
function alert(e, t) {
	return NSApplication.sharedApplication().displayDialog_withTitle(e, t)
}
function MochaJSDelegate(selectorHandlerDict) {
	var uniqueClassName = "MochaJSDelegate_DynamicClass_" + NSUUID.UUID().UUIDString(),
	delegateClassDesc = MOClassDescription.allocateDescriptionForClassWithName_superclass_(uniqueClassName, NSObject);
	delegateClassDesc.registerClass();
	var handlers = {};
	if (this.setHandlerForSelector = function(selectorString, func) {
		var handlerHasBeenSet = selectorString in handlers,
		selector = NSSelectorFromString(selectorString);
		if (handlers[selectorString] = func, !handlerHasBeenSet) {
			for (var dynamicHandler = function() {
				var e = handlers[selectorString];
				if (e) return e.apply(delegateClassDesc, arguments)
			},
			args = [], regex = /:/g; match = regex.exec(selectorString);) args.push("arg" + args.length);
			dynamicFunction = eval("(function(" + args.join(",") + "){ return dynamicHandler.apply(this, arguments); })"),
			delegateClassDesc.addInstanceMethodWithSelector_function_(selector, dynamicFunction)
		}
	},
	this.removeHandlerForSelector = function(e) {
		delete handlers[e]
	},
	this.getHandlerForSelector = function(e) {
		return handlers[e]
	},
	this.getAllHandlers = function() {
		return handlers
	},
	this.getClass = function() {
		return NSClassFromString(uniqueClassName)
	},
	this.getClassInstance = function() {
		return NSClassFromString(uniqueClassName).new()
	},
	"object" == typeof selectorHandlerDict) for (var selectorString in selectorHandlerDict) this.setHandlerForSelector(selectorString, selectorHandlerDict[selectorString])
}