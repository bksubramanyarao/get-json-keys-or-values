const vscode = require('vscode');

var output_kv = vscode.window.createOutputChannel("get-json-keys-or-values");

async function getJsonKeys() {
	try {
		const editor = vscode.window.activeTextEditor;
		const text = editor.document.getText(editor.selection);

		const json_raw_input = text;
		console.log(json_raw_input);
		const get_json_keys = json_raw_input
			.match(/^[^:]*/gm)
			.join(' ')
			.replace(/[\t|\n]/g, '');

		await vscode.env.clipboard.writeText(get_json_keys);
		output_kv.appendLine(get_json_keys);
	} catch (err) {
		console.log(err);
	}
};

async function getJsonKeysWithCommaSeparated() {
	try {
		const editor = vscode.window.activeTextEditor;
		const text = editor.document.getText(editor.selection);

		const json_raw_input = text;
		const get_json_keys = json_raw_input
			.match(/^[^:]*/gm)
			.join(', ')
			.replace(/[\t|\n]/g, '');
		const get_json_keys_with_comma_separated = get_json_keys;

		await vscode.env.clipboard.writeText(get_json_keys_with_comma_separated);
		output_kv.appendLine(get_json_keys_with_comma_separated);
	} catch (err) {
		console.log(err);
	}
};

async function getJsonValues() {
	try {
		const editor = vscode.window.activeTextEditor;
		const text = editor.document.getText(editor.selection);
		const json_raw_input = text;

		const get_json_values = json_raw_input
			.replace(/^[^:]*/gm, '')
			.replace(/^[\:]/gm, '')
			.replace(/^\s/gm, '');

		await vscode.env.clipboard.writeText(get_json_values);
		output_kv.appendLine(get_json_values);
	} catch (err) {
		console.log(err);
	}
};

async function getJsonValuesInline() {
	try {
		const editor = vscode.window.activeTextEditor;
		const text = editor.document.getText(editor.selection);
		const json_raw_input = text;

		const get_json_values = json_raw_input
			.replace(/^[^:]*/gm, '')
			.replace(/^[\:]/gm, '')
			.replace(/^[\s]/gm, '')
			.replace(/[\n|\r]/gm, '')
			.replace(/[\s].$/gm, '');

		await vscode.env.clipboard.writeText(get_json_values);
		output_kv.appendLine(get_json_values);
	} catch (err) {
		console.log(err);
	}
};

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	context.subscriptions.push(vscode.commands.registerCommand('getJsonKeys', function () {
		getJsonKeys();
	}));


	context.subscriptions.push(vscode.commands.registerCommand('getJsonKeysWithCommaSeparated', function () {
		getJsonKeysWithCommaSeparated();
	}));

	context.subscriptions.push(vscode.commands.registerCommand('getJsonValues', function () {
		getJsonValues();
	}));


	context.subscriptions.push(vscode.commands.registerCommand('getJsonValuesInline', function () {
		getJsonValuesInline();
	}));
}

// this method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
