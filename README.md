# 🚀 Malltina API CORS Helper Extension 🚀

[![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-yellow?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Chrome Extension](https://img.shields.io/badge/Chrome%20Extension-Manifest%20V3-brightgreen?style=flat-square&logo=google-chrome&logoColor=white)](https://developer.chrome.com/docs/extensions/mv3/)
[![Status](https://img.shields.io/badge/Status-Active-success?style=flat-square)]()

## 📝 Description

This Chrome Extension serves as a dedicated helper for the **Malltina Difference Calculator** web application. Its primary purpose is to facilitate API requests from the web app to `malltina.com` endpoints, effectively navigating potential Cross-Origin Resource Sharing (CORS) restrictions imposed by browsers.

Instead of directly modifying headers, this extension acts as a secure proxy:
1.  The **Malltina Difference Calculator** web app sends fetch requests to the extension's content script via `window.postMessage`.
2.  The **content script** (`contentScript.js`) forwards these requests to the extension's background service worker.
3.  The **background script** (`background.js`) executes the fetch requests using its granted permissions. It includes logic to handle concurrent requests and abort previous ones if new ones arrive quickly.
4.  The results (or errors) are sent back through the **content script** to the **web application**.

Additionally, clicking the extension's icon in the browser toolbar provides a convenient shortcut to open the Malltina Difference Calculator web app.

**Target Audience:** Users and developers of the Malltina Difference Calculator web application.

## ⚙️ Installation Instructions

To install and use this extension locally, follow these steps:

1.  **Prerequisites:** You need Google Chrome or a Chromium-based browser that supports Chrome Extensions (e.g., Brave, Edge).
2.  **Clone or Download:**
    * Clone this repository: `git clone https://github.com/SOBI-THE-GOD/BypassCors.git`
    * *OR* Download the repository contents as a ZIP file and extract it.
3.  **Load the Extension:**
    * Open your Chrome browser and navigate to `chrome://extensions/`.
    * Enable **Developer mode** using the toggle switch, usually located in the top-right corner.
    * Click the **"Load unpacked"** button that appears.
    * Select the folder where you cloned or extracted the project files (the folder containing `manifest.json`).
4.  **Confirmation:** The "Bypass CORS" extension (or the name specified in `manifest.json`) should now appear in your list of extensions and be active. You should see its icon in your browser's toolbar.

## ✨ Usage

Once installed, the extension works in two main ways:

1.  **Toolbar Shortcut 🖱️:** Click the extension's icon in your browser toolbar. This will automatically open the [Malltina Difference Calculator](https://malltina-difference-calculator.vercel.app) web application in a new tab.
2.  **Automatic API Proxying 🔄:** Navigate to the [Malltina Difference Calculator](https://malltina-difference-calculator.vercel.app) web application (or its development environment at `http://localhost:5173/`). When the web app needs to fetch data from `*.malltina.com` or `*.api.malltina.com`, the extension will automatically intercept these requests (initiated via `postMessage` from the web app), perform them in the background, and return the data to the web app. This process is seamless from the user's perspective, enabling the web app to function correctly despite potential CORS issues.

*No further user interaction is required for the API proxying functionality beyond having the extension installed and active.*

## 💻 Technology Stack

* **Core:** Chrome Extension API (Manifest V3)
* **Language:** JavaScript (ES6+)
* **APIs Used:**
    * `chrome.action`: For toolbar icon interactions.
    * `chrome.runtime`: For messaging between content/background scripts.
    * `chrome.tabs`: For opening new tabs.
    * `Workspace` API: For making HTTP requests in the background script.
    * `AbortController`: For cancelling pending fetch requests.
    * `window.postMessage` / `window.addEventListener('message')`: For communication between the web page and the content script.

## 📁 Project Structure

<pre>
.
│   manifest.json       # Extension configuration, permissions, scripts
│   background.js       # Service worker: Handles icon clicks, fetch requests, core logic
│   contentScript.js    # Injected into the target web app: Relays messages between web app and background script
│
└───icons/              # Folder containing extension icons
icon16.png      # 16x16 icon
icon32.png      # 32x32 icon
icon192.png     # 192x192 icon
</pre>

* **`manifest.json`:** Defines the extension's fundamental properties, including its name, version, permissions (`webRequest`, `scripting`, `tabs`, host permissions for `malltina.com`), background service worker (`background.js`), and the content script (`contentScript.js`) along with the pages it should be injected into.
* **`background.js`:** Runs persistently (as a service worker). It listens for clicks on the extension icon (to open the web app) and messages from the content script (specifically `action: "fetch"`). It contains the `WorkspaceData` function responsible for executing API calls, handling potential race conditions with `AbortController`, and returning results.
* **`contentScript.js`:** Injected directly into the specified web pages (`malltina-difference-calculator.vercel.app` and `localhost:5173`). It listens for `postMessage` events from the web app (`type: "from_web_app"`), forwards the request payload to `background.js` using `chrome.runtime.sendMessage`, and sends the response received from `background.js` back to the web app using `postMessage`.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](<your-repository-url>/issues) if you want to contribute.

**Steps to Contribute:**

1.  **Fork** the Project (Click the 'Fork' button at the top right of this page).
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the Branch (`git push origin feature/AmazingFeature`).
5.  Open a **Pull Request**.

**🍴 Forking for Your Own Projects:**

You can also fork this repository to use its structure as a boilerplate for creating your own Chrome Extension that facilitates communication between a specific web application and the extension's background script. Remember to update:
* `manifest.json`: Change names, descriptions, permissions, host permissions, and content script match patterns (`matches`).
* `background.js`: Modify the `iconClick` URL and potentially the `WorkspaceData` logic if needed.
* `contentScript.js`: Adjust the logic if your web application uses different message types or structures.
* Icons: Replace the icons in the `icons/` folder.

## 📌 Additional Notes

* This extension is specifically designed to work with the **Malltina Difference Calculator** web application and the `malltina.com` domain APIs.
* It utilizes **Manifest V3**, the current standard for Chrome Extensions, employing a service worker (`background.js`) for background tasks.
* The communication protocol relies on `window.postMessage` between the web app and the content script, and `chrome.runtime` messaging between the content script and the background script.
* Error handling is implemented to catch fetch errors in the background script and relay error information back to the web application.

---

We hope this extension proves useful! If you encounter any problems or have suggestions, please open an issue.
