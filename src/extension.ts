import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";

export function activate(context: vscode.ExtensionContext) {
  let webview = vscode.commands.registerCommand("dev-utils.open", () => {
    let panel = vscode.window.createWebviewPanel(
      "webview",
      "Dev Utilities",
      vscode.ViewColumn.One,
      {
        enableScripts: true,
        retainContextWhenHidden: true, // Add this to retain state
      }
    );

    let scriptSrc = panel.webview.asWebviewUri(
      vscode.Uri.joinPath(context.extensionUri, "web", "dist", "index.js")
    );

    let cssSrc = panel.webview.asWebviewUri(
      vscode.Uri.joinPath(context.extensionUri, "web", "dist", "index.css")
    );

    panel.webview.html = `<!DOCTYPE html>
        <html lang="en">
          <head>
            <link rel="stylesheet" href="${cssSrc}" />
          </head>
          <body>
            <noscript>You need to enable JavaScript to run this app.</noscript>
            <div id="root"></div>
            <script src="${scriptSrc}"></script>
          </body>
        </html>
        `;

    panel.webview.onDidReceiveMessage(
      async (message) => {
        switch (message.type) {
          case "copy":
            vscode.window.showInformationMessage("Copied to clipboard!");
            break;
          case "openLink":
            const url = vscode.Uri.parse(message.url);
            vscode.env.openExternal(url);
            break;
          case "downloadImage":
            const { base64Data, fileName } = message;
            const uri = await vscode.window.showSaveDialog({
              defaultUri: vscode.Uri.file(
                path.join(vscode.workspace.rootPath || "", fileName)
              ),
              filters: { Images: ["png", "jpeg", "jpg"] },
            });

            if (uri) {
              const base64Image = base64Data.split(",")[1]; // Remove the "data:image..." part
              const buffer = Buffer.from(base64Image, "base64");

              fs.writeFile(uri.fsPath, buffer, (err) => {
                if (err) {
                  vscode.window.showErrorMessage(
                    `Failed to save file: ${err.message}`
                  );
                } else {
                  vscode.window.showInformationMessage(
                    `File saved: ${uri.fsPath}`
                  );
                }
              });
            }
        }
      },
      undefined,
      context.subscriptions
    );
  });

  context.subscriptions.push(webview);
}

export function deactivate() {}
