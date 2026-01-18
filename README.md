# This folder consists of:

* index.html – the homepage of the edition
* 10 html documents for every manuscript page in the edition:
  * 21r.html
  * 21v.html
  * 22r.html
  * 22v.html
  * 23r.html
  * 23v.html
  * 24r.html
  * 24v.html
  * 25r.html
  * 25v.html
* 10 xml documents with the transcription of the manuscript pages encoded in TEI-XML, specifically following the guidelines for the BDMP:
  * 21r.xml
  * 21v.xml
  * 22r.xml
  * 22v.xml
  * 23r.xml
  * 23v.xml
  * 24r.xml
  * 24v.xml
  * 25v.xml
  * 25r.xml
* 2 xsl files:
  * “Frankenstein_text.xsl" $\to$ transforms the text of the transcription and outputs it in the html file
  * “Frankenstein_meta.xsl” $\to$ transforms the information in the teiHeader and outputs some basic statistics
* script.js – the functions in JavaScript:
  * one that loads the IIIF manifest of the manuscript
  * one that applies the xsl “Frankenstein_text.xsl”
  * one that applies the xsl “Frankenstein_meta.xsl”
* style.css – the css file for additional styling of the html pages
* a folder with images used on the website
* a folder with assets used for the wesbite
* a folder with fonts used on the website
