// Declare variables for getting the xml file for the XSL transformation (folio_xml) and to load the image in IIIF on the page in question (number).
let tei = document.getElementById("folio");
let tei_xml = tei.innerHTML;
let extension = ".xml";
let folio_xml = tei_xml.concat(extension);
let page = document.getElementById("page");
let pageN = page.innerHTML;
let number = Number(pageN);

// Loading the IIIF manifest
var mirador = Mirador.viewer({
  "id": "my-mirador",
  "manifests": {
    "https://iiif.bodleian.ox.ac.uk/iiif/manifest/53fd0f29-d482-46e1-aa9d-37829b49987d.json": {
      provider: "Bodleian Library, University of Oxford"
    }
  },
  "window": {
    allowClose: false,
    allowWindowSideBar: true,
    allowTopMenuButton: false,
    allowMaximize: false,
    hideWindowTitle: true,
    panels: {
      info: false,
      attribution: false,
      canvas: true,
      annotations: false,
      search: false,
      layers: false,
    }
  },
  "workspaceControlPanel": {
    enabled: false,
  },
  "windows": [
    {
      loadedManifest: "https://iiif.bodleian.ox.ac.uk/iiif/manifest/53fd0f29-d482-46e1-aa9d-37829b49987d.json",
      canvasIndex: number,
      thumbnailNavigationPosition: 'off'
    }
  ]
});


// function to transform the text encoded in TEI with the xsl stylesheet "Frankenstein_text.xsl", this will apply the templates and output the text in the html <div id="text">
function documentLoader() {

    Promise.all([
      fetch(folio_xml).then(response => response.text()),
      fetch("Frankenstein_text.xsl").then(response => response.text())
    ])
    .then(function ([xmlString, xslString]) {
      var parser = new DOMParser();
      var xml_doc = parser.parseFromString(xmlString, "text/xml");
      var xsl_doc = parser.parseFromString(xslString, "text/xml");

      var xsltProcessor = new XSLTProcessor();
      xsltProcessor.importStylesheet(xsl_doc);
      var resultDocument = xsltProcessor.transformToFragment(xml_doc, document);

      var criticalElement = document.getElementById("text");
      criticalElement.innerHTML = ''; // Clear existing content
      criticalElement.appendChild(resultDocument);
    })
    .catch(function (error) {
      console.error("Error loading documents:", error);
    });
  }
  
// function to transform the metadate encoded in teiHeader with the xsl stylesheet "Frankenstein_meta.xsl", this will apply the templates and output the text in the html <div id="stats">
  function statsLoader() {

    Promise.all([
      fetch(folio_xml).then(response => response.text()),
      fetch("Frankenstein_meta.xsl").then(response => response.text())
    ])
    .then(function ([xmlString, xslString]) {
      var parser = new DOMParser();
      var xml_doc = parser.parseFromString(xmlString, "text/xml");
      var xsl_doc = parser.parseFromString(xslString, "text/xml");

      var xsltProcessor = new XSLTProcessor();
      xsltProcessor.importStylesheet(xsl_doc);
      var resultDocument = xsltProcessor.transformToFragment(xml_doc, document);

      var criticalElement = document.getElementById("stats");
      criticalElement.innerHTML = ''; // Clear existing content
      criticalElement.appendChild(resultDocument);
    })
    .catch(function (error) {
      console.error("Error loading documents:", error);
    });
  }

  // Initial document load
  documentLoader();
  statsLoader();

  
  (function createPageControls() {
  var path = window.location.pathname.split('/').pop().split('?')[0].split('#')[0];
    if (path === '' || path === 'index.html') return; // don't add on index // don't add on index

  // Avoid adding twice
  if (document.getElementById('page-controls')) return;

  // Collect page links from the Pages dropdown
  var anchors = Array.from(document.querySelectorAll('.dropdown-menu a[href$=".html"]'));
  if (!anchors.length) return;

  var pages = anchors.map(function (a) {
    return a.getAttribute('href');
  });

  // Find current page index
  var idx = pages.indexOf(path);
  if (idx === -1) {
    idx = pages.findIndex(function (p) {
      return p.split('/').pop() === path;
    });
  }

  // Find container near selector
  var formGroup = document.querySelector('.form-group');
  var container =
    formGroup ||
    document.querySelector('.container-fluid') ||
    document.body;

  if (!container) return;

  /* ---------- Create wrapper ---------- */

  var controls = document.createElement('div');
  controls.id = 'page-controls';
  controls.className = 'page-controls';
  controls.style.marginTop = '0.5rem';

  /* ---------- Toggle button ---------- */

  function toggleDeletions() {
  var deletions = document.getElementsByClassName('deletion');
  var deletionArray = Array.from(deletions);
  deletionArray.forEach(function(element) {
    if (element.style.display === "none") {
      element.style.display = "inline";
    } else {
      element.style.display = "none";
    }
  });}

  var toggle = document.createElement('button');
  toggle.id = 'btn-toggle-deletions';
  toggle.type = 'button';
  toggle.className = 'page-nav-btn toggle-btn';
  toggle.textContent = 'Toggle deletions';
  toggle.addEventListener('click', toggleDeletions);

  /* ---------- Previous button ---------- */

  var prev = document.createElement('button');
  prev.id = 'btn-prev';
  prev.type = 'button';
  prev.className = 'page-nav-btn';
  prev.textContent = '← Previous';

  if (idx <= 0) {
    prev.disabled = true;
  } else {
    prev.addEventListener('click', function () {
      window.location.href = pages[idx - 1];
    });
  }

  /* ---------- Next button ---------- */

  var next = document.createElement('button');
  next.id = 'btn-next';
  next.type = 'button';
  next.className = 'page-nav-btn';
  next.textContent = 'Next →';

  if (idx === -1 || idx >= pages.length - 1) {
    next.disabled = true;
  } else {
    next.addEventListener('click', function () {
      window.location.href = pages[idx + 1];
    });
  }

  /* ---------- Assemble ---------- */

  
  controls.appendChild(toggle);
  controls.appendChild(prev);
  controls.appendChild(next);

  if (formGroup) {
    formGroup.appendChild(controls);
  } else {
    container.insertBefore(controls, container.firstChild);
  }
})();


  // Event listener for sel1 change
  function selectHand(event) {
  var visible_mary = document.getElementsByClassName('#MWS');
  var visible_percy = document.getElementsByClassName('#PBS');
  // Convert the HTMLCollection to an array for forEach compatibility
  var MaryArray = Array.from(visible_mary);
  var PercyArray = Array.from(visible_percy);
    if (event.target.value == 'both') {
    //write an forEach() method that shows all the text written and modified by both hand (in black?). The forEach() method of Array instances executes a provided function once for each array element.
    MaryArray.forEach(function(element) {
      element.style.color = "black";
    });
    PercyArray.forEach(function(element) {
      element.style.color = "black";
    });
    } else if (event.target.value == 'Mary') {
     //write an forEach() method that shows all the text written and modified by Mary in a different color (or highlight it) and the text by Percy in black.
     MaryArray.forEach(function(element) {
      element.style.color = "red";
    });
    PercyArray.forEach(function(element) {
      element.style.color = "lightgray";
    });
    } else {
     //write an forEach() method that shows all the text written and modified by Percy in a different color (or highlight it) and the text by Mary in black.
     PercyArray.forEach(function(element) {
      element.style.color = "blue";
    });
    MaryArray.forEach(function(element) {
      element.style.color = "lightgray";
    });
    }
  }
// write another function that will toggle the display of the deletions by clicking on a button
// EXTRA: write a function that will display the text as a reading text by clicking on a button or another dropdown list, meaning that all the deletions are removed and that the additions are shown inline (not in superscript)