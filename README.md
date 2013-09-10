# Conduit Apps Generator

> A Yeoman generator that provides boilerplate code to easily create Conduit Toolbar apps.

Maintainer: [Petar Bojinov](https://github.com/pbojinov)

## Prerequisites

1. Have node.js installed on your computer. See instructions [here](http://nodejs.org/download/)
2. Have [yeoman](http://yeoman.io/index.html) installed

        npm install -g yo

## Getting Started

1. Install the generator by running

        npm install -g generator-bcapi
        
2. Run the generator

        yo bcapi
        
3. Install required depedencies 

        npm install
        
3. Start writing your Conduit App :)

## Generators

Available generators:

* [bcapi](#app) (aka [bcapi:app](#app))
* [bcapi:component](#component)
* [bcapi:gadget](#gadget)
* [bcapi:launch](#launch)

**Note: Generators are to be run from the root directory of your app.**

### bcapi

Generates a new Conduit toolbar app, generating all the boilerplate you need to get started. The app generator also optionally installs Twitter Bootstrap 3.0 and jQuery (1.10.2)

Example:

    yo bcapi
  
### component

Example:

    yo bcapi:component red
    
Produces three files: `app/red.html`, `app/scripts/red.js`, `app/styles/red.css`

`app/red.html`:
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="../favicon.ico">
    <title>red Launch</title>
    
    <link rel="stylesheet" href="styles/red.css"/>
</head>
<body>
    <button id="launchGadget" name="Launch Gadget"></button>

    <!-- Core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script type="text/javascript" src="http://api.conduit.com/BrowserCompApi.js"></script>
    <script type="text/javascript" src="scripts/red.js"></script>
</body>
</html>
```
`app/scripts/red.js`:

```javascript
window.onload = function() {

    //some functions omitted for brevity
    
    function initialize() {
        window.EBDocumentComplete = function(tabid) {
            //the page has loaded!
        };
    }
    
    initialize();
};
```

### gadget

Example:

    yo bcapi:gadget green
    
Produces three files: `app/green.html`, `app/scripts/green.js`, `app/styles/green.css`

`app/green.html`:

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="../favicon.ico">
    <title>green Gadget</title>
    
    <link rel="stylesheet" href="styles/green.css"/>
</head>
<body>
    <button id="closeButton" name="close"></button>

    <!-- Core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script type="text/javascript" src="http://api.conduit.com/BrowserCompApi.js"></script>
    <script type="text/javascript" src="scripts/green.js"></script>
</body>
</html>
```

`app/scripts/green.js`:
```javascript
window.onload = function() {

    var closeButton;

    function closeWindow() {
        CloseFloatingWindow(); //closes gadget window
    }

    function initialize() {
        closeButton = document.getElementById('closeButton');
        closeButton.onclick = closeWindow;
    }

    initialize();
};
```

### launch

Example:

    yo bcapi:launch greenLaunch
    
Produces three files: `app/greenLaunch.html`, `app/scripts/greenLaunch.js`, `app/styles/greenLaunch.css`

`app/greenLaunch.html`:

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="../favicon.ico">
    <title>greenLaunch Launch</title>
    
    <link rel="stylesheet" href="styles/greenLaunch.css"/>
</head>
<body>
    <button id="launchGadget" name="Launch Gadget"></button>

    <!-- Core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script type="text/javascript" src="http://api.conduit.com/BrowserCompApi.js"></script>
    <script type="text/javascript" src="scripts/greenLaunch.js"></script>
</body>
</html>
```

`app/scripts/greenLaunch.js`:

```javascript
window.onload = function() {

    var closeButton;

    function toggleGadget() {

        //get the current absolute URL path
        var currentAbsPath = (((document.URL).toString()).split('#'))[0]; // the hash is to support chrome HTML components
        var APP_PATH = currentAbsPath.substring(0, currentAbsPath.lastIndexOf('/')) + '/';

        //use the absolute path, make sure gadget and greenGadget.html are in the same folder!
        var url = APP_PATH + 'greenGadget.html';
        var width = 100;
        var height = 300;
        var features = 'resizable=no, scrollbars=no, titlebar=no, savelocation=no, saveresizedsize=no, closeonexternalclick=yes, openposition=alignment:(B,R)';
        LaunchGadget(url, width, height, features);
    }

    function initialize() {
        closeButton = document.getElementById('close');
        closeButton.onclick = toggleGadget;
    }

    initialize();
};
```

## Structure

The basic structure of the project is given in the following way:

```
├── app/
│   └── scripts/
│   └── styles/
│   └── assets/
├── dist/
│   └── Apps/
├── .editorconfig
├── .jshintrc
├── favicon.ico
├── Gruntfile.js
└── package.json
```

## BCAPI Documentation

[Conduit BCAPI Documentation](http://wiki.conduit.com/display/conduitapis/Home)

## License

[MIT License](http://zenorocha.mit-license.org/)
