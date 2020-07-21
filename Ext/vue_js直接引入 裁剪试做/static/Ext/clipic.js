! function(t, i) {
	"object" == typeof exports && "undefined" != typeof module ? module.exports = i() : "function" == typeof define &&
		define.amd ? define(i) : (t = t || self).Clipic = i()
}(this, function() {
	"use strict";
	! function(t, i) {
		void 0 === i && (i = {});
		var e = i.insertAt;
		if (t && "undefined" != typeof document) {
			var s = document.head || document.getElementsByTagName("head")[0],
				n = document.createElement("style");
			n.type = "text/css", "top" === e && s.firstChild ? s.insertBefore(n, s.firstChild) : s.appendChild(n), n.styleSheet ?
				n.styleSheet.cssText = t : n.appendChild(document.createTextNode(t))
		}
	}(
		".clipic-body{background:#1c1c1c;position:fixed;width:100%;height:100%;top:0;left:0;-webkit-transform:translateY(100%);-ms-transform:translateY(100%);transform:translateY(100%);-webkit-transition:.4s;-o-transition:.4s;transition:.4s;-webkit-touch-callout:none;-webkit-user-select:none;z-index:99;overflow:hidden}.clipic-body,.clipic-body *{-webkit-box-sizing:border-box;box-sizing:border-box}.clipic-operation-bar{display:-webkit-box;display:-ms-flexbox;display:flex;color:#f2f2f2;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;position:absolute;width:100%;bottom:0;left:0}.clipic-operation-bar [role=button]{padding:15px 20px;font-size:1em}.clipic-frame{background:#f2f2f2;position:absolute;left:50%;top:30px;transform:translateX(-50%);transition:.3s}.clipic-frame img{-webkit-touch-callout:none;pointer-events:none}.clipic-frame-show{overflow:hidden}.clipic-cancel{color:#e04c4c}.clipic-reset{color:#3680fd}.clipic-confirm{color:#23c667}.clipic-layer{position:fixed;width:100%;height:100%;top:0;left:0;background:rgba(0,0,0,.8);pointer-events:none;transform:translateZ(0)}"
	);
	var i = function() {
		function s(t, i) {
			for (var e = 0; e < i.length; e++) {
				var s = i[e];
				s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(
					t, s.key, s)
			}
		}
		return function(t, i, e) {
			return i && s(t.prototype, i), e && s(t, e), t
		}
	}();
	return function() {
		function t() {
			! function(t, i) {
				if (!(t instanceof i)) throw new TypeError("Cannot call a class as a function")
			}(this, t), this.default = {
					width: 500,
					height: 500,
					src: "",
					encode: "base64",
					type: "jpeg",
					name: "clipic",
					quality: .9,
					buttonText: ["取消", "重置", "完成"]
				}, this.init(), this.clipic = this.getId("clipic"), this.img1 = this.getId("clipicImg1"), this.img2 = this.getId(
					"clipicImg2"), this.frame1 = this.getId("clipicFrame1"), this.frame2 = this.getId("clipicFrame2"), this.cancelBtn =
				this.getId("clipicCancel"), this.resetBtn = this.getId("clipicReset"), this.confirmBtn = this.getId(
					"clipicConfirm"), this.reset = this.reset.bind(this), this.done = this.done.bind(this), this.cancel = this.cancel
				.bind(this)
		}
		return i(t, [{
			key: "init",
			value: function() {
				this.getId("clipic") || this.createHtml()
			}
		}, {
			key: "getId",
			value: function(t) {
				return document.getElementById(t)
			}
		}, {
			key: "createHtml",
			value: function() {
				var t = document.createElement("div");
				t.className = "clipic-body", t.setAttribute("id", "clipic"), t.innerHTML =
					'\n    <div class="clipic-frame" id="clipicFrame1"><img id="clipicImg1"></div>\n    <div class="clipic-layer"></div>\n    <div class="clipic-frame clipic-frame-show" id="clipicFrame2"><img id="clipicImg2"></div>\n    <div class="clipic-operation-bar">\n      <div class="clipic-cancel" id="clipicCancel" role="button">取消</div>\n      <div class="clipic-reset" id="clipicReset" role="button">重置</div>\n      <div class="clipic-confirm" id="clipicConfirm" role="button">完成</div>\n    </div>\n  ',
					document.body.appendChild(t)
			}
		}, {
			key: "getImage",
			value: function() {
				var i = this,
					t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
				this.scale = 1.6, this.rotate = 0, this.translateX = 0, this.translateY = 0;
				var e = JSON.parse(JSON.stringify(this.default));
				this.options = Object.assign(e, t), this.cancelBtn.innerHTML = this.options.buttonText[0], this.resetBtn.innerHTML =
					this.options.buttonText[1], this.confirmBtn.innerHTML = this.options.buttonText[2], this.img1.src = this.options
					.src, this.img2.src = this.options.src;
				var s = new Image;
				s.onload = function() {
					i.originW = i.img2.width, i.originH = i.img2.height, i.options.ratio ? (i.options.width = i.img2.width, i.options
							.height = i.img2.width / i.options.ratio) : i.options.ratio = i.options.width / i.options.height, i.originRatio =
						i.originW / i.originH, i.initSize(), i.clipic.style.transform = "translate(0, 0)", setTimeout(function() {
							i.options.ratio > i.originRatio ? (i.img1.style.width = i.frame2.clientWidth + "px", i.img2.style.width =
								i.frame2.clientWidth + "px") : (i.img1.style.height = i.frame2.clientHeight + "px", i.img2.style.height =
								i.frame2.clientHeight + "px")
						}, 300), i.setTransform(), i.cancelBtn.addEventListener("click", i.cancel), i.resetBtn.addEventListener(
							"click", i.reset), i.confirmBtn.addEventListener("click", i.done), i.clipic.addEventListener("touchmove",
							function(t) {
								if (t.preventDefault(), 1 < t.touches.length) return i.setScale(t.touches[0], t.touches[1]), void i.setRotate(
									t.touches[0], t.touches[1]);
								i.setTranslate(t.touches[0])
							}), i.clipic.addEventListener("touchend", function(t) {
							i.distance = null, i.angle = null, i.moveX = null, i.moveY = null
						})
				}, s.src = this.options.src
			}
		}, {
			key: "initSize",
			value: function() {
				var t = document.documentElement || document.body,
					i = t.clientWidth - 60,
					e = t.clientHeight - 80;
				this.frame1.style.width = i + "px", this.frame1.style.height = i / this.options.ratio + "px", this.frame2.style
					.width = i + "px", this.frame2.style.height = i / this.options.ratio + "px", i / this.options.ratio > e && (
						this.frame1.style.height = e + "px", this.frame1.style.width = e * this.options.ratio + "px", this.frame2.style
						.height = e + "px", this.frame2.style.width = e * this.options.ratio + "px")
			}
		}, {
			key: "setScale",
			value: function(t, i) {
				var e = Math.abs(t.clientX - i.clientX),
					s = Math.abs(t.clientY - i.clientY),
					n = Math.sqrt(e * e + s * s);
				this.distance && (this.scale += (n - this.distance) / this.img2.clientWidth, this.setTransform()), this.distance =
					n
			}
		}, {
			key: "setRotate",
			value: function(t, i) {
				var e = t.clientX - i.clientX,
					s = t.clientY - i.clientY,
					n = 180 * Math.atan2(s, e) / Math.PI;
				this.angle && (this.rotate += n - this.angle, this.setTransform()), this.angle = n
			}
		}, {
			key: "setTranslate",
			value: function(t) {
				var i = t.clientX,
					e = t.clientY;
				this.moveX && (this.translateX += i - this.moveX), this.moveY && (this.translateY += e - this.moveY), this.moveX =
					i, this.moveY = e, this.setTransform()
			}
		}, {
			key: "setTransform",
			value: function() {
				var t = "translate(" + this.translateX + "px, " + this.translateY + "px) scale(" + this.scale + ") rotate(" +
					this.rotate + "deg)";
				this.img1.style.transform = t, this.img2.style.transform = t
			}
		}, {
			key: "cancel",
			value: function(t) {
				var i = this;
				this.clipic.style.transform = "translate(0, 100%)", setTimeout(function() {
					i.img1.style = "", i.img1.src = "", i.img2.style = "", i.img2.src = ""
				}, 400), this.options.onCancel && "done" !== t && this.options.onCancel(), this.cancelBtn.removeEventListener(
					"click", this.cancel), this.resetBtn.removeEventListener("click", this.reset), this.confirmBtn.removeEventListener(
					"click", this.done, !0)
			}
		}, {
			key: "reset",
			value: function() {
				var t = this;
				this.scale = 1, this.rotate = 0, this.translateX = 0, this.translateY = 0, this.img1.style.transition =
					"0.3s", this.img2.style.transition = "0.3s", this.setTransform(), setTimeout(function() {
						t.img1.style.transition = "", t.img2.style.transition = ""
					}, 300)
			}
		}, {
			key: "done",
			value: function() {
				var e = this,
					t = this.options.width / this.frame2.clientWidth,
					i = document.createElement("canvas");
				i.width = this.options.width, i.height = this.options.height;
				var s = i.getContext("2d");
				s.fillStyle = "#fff", s.fillRect(0, 0, i.width, i.height);
				var n = void 0,
					o = void 0;
				this.options.ratio > this.originRatio ? (n = this.options.width, o = this.originH / (this.originW / this.options
					.width)) : (o = this.options.height, n = this.originW / (this.originH / this.options.height));
				var a = {
					x: n / 2,
					y: o / 2
				};
				if (s.translate(this.translateX * t, this.translateY * t), 0 !== this.rotate && (s.translate(a.x, a.y), s.rotate(
						this.rotate * Math.PI / 180), s.translate(-a.x, -a.y)), 1 !== this.scale && (s.translate(a.x * (1 - this.scale),
						a.y * (1 - this.scale)), s.scale(this.scale, this.scale)), s.drawImage(this.img2, 0, 0, n, o), this.options
					.onDone) switch (this.options.encode) {
					case "base64":
						this.options.onDone(i.toDataURL("image/" + this.options.type, this.options.quality));
						break;
					case "blob":
						i.toBlob(function(t) {
							e.options.onDone(t)
						}, "image/" + this.options.type);
						break;
					case "file":
						i.toBlob(function(t) {
							var i = new window.File([t], e.options.name, {
								type: "image/" + e.options.type
							});
							e.options.onDone(i)
						}, "image/" + this.options.type);
						break;
					default:
						this.options.onDone(i.toDataURL("image/" + this.options.type, this.options.quality))
				}
				this.cancel("done")
			}
		}]), t
	}()
});
