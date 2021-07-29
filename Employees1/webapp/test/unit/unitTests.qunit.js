/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"logaligroup11/Employees1/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
