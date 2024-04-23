'use strict';
$(document).ready(function() {
$.getJSON('./data.json', function (data) {    
describe('Billypedia', function () {

  it('should have a title Billypedia', function () {
    expect($('title').text()).to.equal('Billypedia');
  });

  it('should have one image of billy', function() {
    expect($('#image-billy').length).to.equal(1);
  });

  it('should have three images on page', function () {
    expect($('img').length).to.equal(3);
  });
  
  it('should change image of Billy when clicked', function () {
    data.images.billy.forEach(function(src) {
      expect($('#image-billy').attr('src')).to.equal(src);
      $('#image-billy').click();
    })
    expect($('#image-billy').attr('src')).to.equal(data.images.billy[0]);
  });
  
	it('should have five top rated titles', function () {
    expect($('#list-top-rated > *').length).to.equal(5);
    expect($('#list-top-rated > li').length).to.equal(5);
    expect($('#list-top-rated > li.top-rated').length).to.equal(5);
	});
  
  it('should change top rated album image when clicking an album name', function () {
    const src = num => data.discography.topRated[num].art;
    expect($('#section-top-rated > div').length).to.equal(1);
    expect($('#section-top-rated img').length).to.equal(1);
    expect($('#section-top-rated img').attr('src')).to.equal(src(0));
    data.discography.topRated.forEach(function(album, index) {
      $(`#section-top-rated > ul > *:nth-of-type(${index + 1})`).click();
      expect($('#section-top-rated > div#image-container-top-rated > img').attr('src')).to.equal(album.art);
    });
  });

	it('should have a section with the id "section-recordings"', function () {
    expect($('section#section-recordings').length).to.equal(1);
	});

	it('should have a ul with the id "list-recordings"', function () {
    expect($('#section-recordings > ul#list-recordings').length).to.equal(1);
	});
  
	it('should have ten recording titles', function () {
    expect($('#list-recordings > *').length).to.equal(10);
    expect($('#list-recordings > li').length).to.equal(10);
    expect($('#list-recordings > li.recording').length).to.equal(10);
	});
  
  it('should change recordings album image when clicking an album name', function () {
    const src = num => data.discography.recordings[num].art;
    expect($('#section-recordings > div').length).to.equal(1);
    expect($('#section-recordings img').length).to.equal(1);
    expect($('#section-recordings img').attr('src')).to.equal(src(0));
    data.discography.recordings.forEach(function(album, index) {
      $(`#section-recordings > ul > *:nth-of-type(${index + 1})`).click();
      expect($('#section-recordings > div#image-container-recording > img').attr('src')).to.equal(album.art);
    });
  });

  it('should have a table for all rider data', function () {
    expect($('table').length).to.equal(1);
    expect($('tr').length).to.equal(14);
    expect($('td').length).to.equal(28);
  });
});

mocha.run();
});
});