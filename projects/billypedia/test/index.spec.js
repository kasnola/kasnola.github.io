'use strict';
const path = require('path');
const _ = require('underscore');
const Browser = require('zombie');
const express = require('express');
const data = require('../data.json');
const bodyParser = require('body-parser');

const PORT = 7777;
const url = `http://localhost:${PORT}/`;
const browser = new Browser();
const app = express();
const server = app.listen(PORT, () => console.log(`Running on ${url}`));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../')));

describe('Billypedia', function(){

  after(done => server.close(done));

  beforeEach(function(done) {
    browser.visit(url, done);
  });

  it('should have a title Billypedia', function(done){
    browser.assert.text('title', 'Billypedia');
    done();
  });

  it('should have one image of billy', function(done){
    browser.assert.elements('#image-billy', 1);
    done();
  });

  it('should have three images on page', function(done){
    browser.assert.elements('img', {atLeast: 3}, "Make sure you have an <img> for Billy, top-rated albums, and recording albums");
    done();
  });

  it('should change image of Billy when clicked', function(done){
    data.images.billy.forEach(function(src) {
      browser.assert.attribute('#image-billy', 'src', src);
      browser.click('#image-billy');
    })
    browser.assert.attribute('#image-billy', 'src', data.images.billy[0]);
    done();
  });

	it('should have five top rated titles', function(done){
		browser.assert.elements('#list-top-rated > *', 5, 'Make sure you append a child to "#list-top-rated" for each of the top-rated albums');
		browser.assert.elements('#list-top-rated > li', 5, 'Make sure each child on the top-rated list is an <li>');
		browser.assert.elements('#list-top-rated > li.top-rated', 5, 'Make sure each of your <li> have the class "top-rated"');
		done();
	});

  it('should change top rated album image when clicking an album name', function(done){
    const src = num => data.discography.topRated[num].art;
    browser.assert.elements('#section-top-rated > div', 1, 'Make sure your "section-top-rated" list has a <div>');
    browser.assert.elements('#section-top-rated img', 1, 'Make sure your <img> is in the "#section-top-rated" section');
    browser.assert.attribute('#section-top-rated img', 'src', src(0), 'Make sure the src for your <img> defaults to the first image in the list');
    data.discography.topRated.forEach(function(album, index) {
      browser.click(`#section-top-rated > ul > *:nth-of-type(${index + 1})`);
      browser.assert.attribute('#section-top-rated > div#image-container-top-rated > img', 'src', album.art, 'Make sure your <img>\'s src updates dymanically');
    })
    done();
  });

	it('should have a section with the id "section-recordings"', function(done){
		browser.assert.elements('section#section-recordings', 1, 'Make sure you have a <section> with the ID "section-recordings"');
		done();
	});

	it('should have a ul with the id "list-recordings"', function(done){
		browser.assert.elements('#section-recordings > ul#list-recordings', 1, 'Make sure you have a <ul> with the ID "list-recordings" that is a child of the "section-recordings" <section>');
		done();
	});

	it('should have ten recording titles', function(done){
		browser.assert.elements('#list-recordings > *', 10, 'Make sure you append a child to "#list-recordings" for each of the top-rated albums');
		browser.assert.elements('#list-recordings > li', 10, 'Make sure each child on the top-rated list is an <li>');
		browser.assert.elements('#list-recordings > li.recording', 10, 'Make sure each of your <li> have the class "recording"');
		done();
	});

  it('should change recordings album image when clicking an album name', function(done){
    const src = num => data.discography.recordings[num].art;
    browser.assert.elements('#section-recordings > div', 1, 'Make sure your "section-recordings" list has a <div>');
    browser.assert.elements('#section-recordings img', 1, 'Make sure your <img> is inside the "#section-recordings" section');
    browser.assert.attribute('#section-recordings img', 'src', src(0), 'Make sure the src for your <img> defaults to the first image in the list');
    data.discography.recordings.forEach(function(album, index) {
      browser.click(`#section-recordings > ul > *:nth-of-type(${index + 1})`);
      browser.assert.attribute('#section-recordings > div#image-container-recording > img', 'src', album.art, 'Make sure your image\'s src updates dymanically');
    })
    done();
  });

  it('should have a table for all rider data', function(done){
    browser.assert.elements('table', 1, "Make sure you have a <table>");
    browser.assert.elements('tr', 14);
    browser.assert.elements('td', 28);
    done();
  });
});
