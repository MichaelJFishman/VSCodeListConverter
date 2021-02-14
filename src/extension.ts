// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "list-converter" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json

	const newline2python = vscode.commands.registerCommand('list-converter.newline2python', () => {
		const editor = vscode.window.activeTextEditor;

		if (editor) {
			const document = editor.document;
			const selection = editor.selection;

			const input_str = document.getText(selection);
			const terms = input_str.replace(/\r/g, "").split("\n");
			const quoted_terms = terms.map(x => '"' + x + '"');
			const output_str = '[' + quoted_terms.join(', ') + ']';
			editor.edit(editBuilder => {
				editBuilder.replace(selection, output_str)
			});
		}
	});

	context.subscriptions.push(newline2python);


	const python2newline = vscode.commands.registerCommand('list-converter.python2newline', () => {
		const editor = vscode.window.activeTextEditor;

		if (editor) {
			const document = editor.document;
			const selection = editor.selection;
			const input_str = document.getText(selection);
			// TODO Check that this string looks like a python array and fail gracefully
			const terms = JSON.parse(input_str);
			const output_str = terms.join("\n");
			editor.edit(editBuilder => {
				editBuilder.replace(selection, output_str)
				}
			);
		}
	});

	context.subscriptions.push(python2newline);

}

// this method is called when your extension is deactivated
export function deactivate() {}
