/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Output_1 = __webpack_require__(1);
	var Heisenberg_1 = __webpack_require__(2);
	var SpeechRecognition_1 = __webpack_require__(4);
	var Broadcaster_1 = __webpack_require__(3);
	__webpack_require__(5);
	__webpack_require__(7);
	__webpack_require__(13);
	var App = (function () {
	    function App(button, output, Heisenberg, SpeechRecognition) {
	        this.button = button;
	        this.output = output;
	        this.Heisenberg = Heisenberg;
	        this.SpeechRecognition = SpeechRecognition;
	        this.output = output;
	        this.bindDomEvents();
	    }
	    App.prototype.bindDomEvents = function () {
	        this.button.addEventListener("click", this.fireEvent.bind(this), false);
	    };
	    App.prototype.fireEvent = function () {
	        Broadcaster_1.Broadcaster.fireEvent("Heisenberg.sayMyName");
	    };
	    return App;
	}());
	new App(document.getElementById("Heisenberg"), new Output_1.Output(document.getElementById("audioOutput")), new Heisenberg_1.Heisenberg(), new SpeechRecognition_1.SpeechRecognition());


/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";
	var Output = (function () {
	    function Output(output) {
	        this.output = output;
	    }
	    Output.prototype.clearOutput = function () {
	        this.output.innerHTML = "";
	    };
	    Output.prototype.generateOutput = function (msg) {
	        var span = document.createElement("span");
	        span.innerHTML = msg;
	        var p = document.createElement("p");
	        p.appendChild(span);
	        return p;
	    };
	    Output.prototype.addOutput = function (msg) {
	        this.output.appendChild(this.generateOutput(msg));
	    };
	    return Output;
	}());
	exports.Output = Output;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Broadcaster_1 = __webpack_require__(3);
	var Heisenberg = (function () {
	    function Heisenberg() {
	        this.setUp();
	        this.addEventsToBroadcaster();
	    }
	    Heisenberg.prototype.addEventsToBroadcaster = function () {
	        Broadcaster_1.Broadcaster.addListener("Heisenberg.sayMyName", this.sayMyName.bind(this));
	        Broadcaster_1.Broadcaster.addListener("Heisenberg.youreGoddamnRight", this.youreGoddamnRight.bind(this));
	        Broadcaster_1.Broadcaster.addListener("Heisenberg.hisNameIsHank", this.hisNameIsHank.bind(this));
	    };
	    Heisenberg.prototype.setUp = function () {
	        this.heisenberg = new SpeechSynthesisUtterance();
	        this.resetSpeechValues();
	    };
	    Heisenberg.prototype.resetSpeechValues = function () {
	        var voices = window.speechSynthesis.getVoices();
	        this.heisenberg.voice = voices[10];
	        this.heisenberg.volume = 0.5;
	        this.heisenberg.rate = 0.2;
	        this.heisenberg.pitch = 0;
	        this.heisenberg.lang = 'en-US';
	    };
	    Heisenberg.prototype.sayMyName = function () {
	        this.heisenberg.text = "Say my name";
	        speechSynthesis.speak(this.heisenberg);
	        setTimeout(function () {
	            Broadcaster_1.Broadcaster.fireEvent("SpeechRecognition.start");
	        }, 1500);
	    };
	    Heisenberg.prototype.youreGoddamnRight = function () {
	        this.heisenberg.text = "You're Goddamn Right";
	        speechSynthesis.speak(this.heisenberg);
	    };
	    Heisenberg.prototype.hisNameIsHank = function () {
	        this.heisenberg.text = "His name is HANK!";
	        this.heisenberg.volume = 1;
	        this.heisenberg.pitch = 1;
	        speechSynthesis.speak(this.heisenberg);
	    };
	    Heisenberg.prototype.thisBatchItsWrong = function () {
	        this.heisenberg.text = "This batch it's all wrong, we need to start over";
	        this.heisenberg.volume = 1;
	        this.heisenberg.rate = 0.5;
	        speechSynthesis.speak(this.heisenberg);
	        this.resetSpeechValues();
	    };
	    return Heisenberg;
	}());
	exports.Heisenberg = Heisenberg;


/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	var Broadcaster = (function () {
	    function Broadcaster() {
	    }
	    Broadcaster.addListener = function (eventName, callback) {
	        if (!this.events.hasOwnProperty(eventName)) {
	            this.events[eventName] = [];
	        }
	        this.events[eventName].push(callback);
	    };
	    Broadcaster.fireEvent = function (eventName) {
	        if (!this.events.hasOwnProperty(eventName)) {
	            return;
	        }
	        this.events[eventName].forEach(function (cb) {
	            if (typeof cb === "function") {
	                cb();
	            }
	        });
	    };
	    Broadcaster.events = {};
	    return Broadcaster;
	}());
	exports.Broadcaster = Broadcaster;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Broadcaster_1 = __webpack_require__(3);
	var SpeechRecognition = (function () {
	    function SpeechRecognition() {
	        this.defaults();
	        this.setUp();
	        this.addEventsToBroadcaster();
	    }
	    SpeechRecognition.prototype.defaults = function () {
	        this.recognition = new webkitSpeechRecognition();
	    };
	    SpeechRecognition.prototype.setUp = function () {
	        this.recognition.lang = 'en-GB';
	        this.recognition.interimResults = false;
	        this.recognition.maxAlternatives = 1;
	        this.bindAudioEvents();
	    };
	    SpeechRecognition.prototype.addEventsToBroadcaster = function () {
	        Broadcaster_1.Broadcaster.addListener("SpeechRecognition.start", this.startListening.bind(this));
	    };
	    SpeechRecognition.prototype.startListening = function () {
	        this.recognition.start();
	    };
	    SpeechRecognition.prototype.bindAudioEvents = function () {
	        this.recognition.onresult = this.handleResult.bind(this);
	    };
	    SpeechRecognition.prototype.handleResult = function (e) {
	        if (e.results[0][0].transcript.toLowerCase() === "heisenberg") {
	            Broadcaster_1.Broadcaster.fireEvent("Heisenberg.youreGoddamnRight");
	        }
	        else {
	            Broadcaster_1.Broadcaster.fireEvent("Heisenberg.hisNameIsHank");
	        }
	    };
	    return SpeechRecognition;
	}());
	exports.SpeechRecognition = SpeechRecognition;


/***/ },
/* 5 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 6 */,
/* 7 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
/******/ ]);