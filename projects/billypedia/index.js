/* global $ _ opspark */

$(document).ready(function() {
    $.getJSON('data.json', function (data) {
        // YOUR CODE BELOW HERE

        // let $section = $('<section>').attr('id', 'section-rider');
        // $section.append($('<h3>').text('Billy\'s Rider')).appendTo($('#sections'));
        
        // TODO 3: add style with jQuery
        $('#section-quotes').prependTo('#sections');
        $('#section-quotes').css('background-color', 'grey').css('border-radius', '8px');
        $('#section-quotes').children().css('padding-left', '10px');
        
        $('.heading-quotes').css('padding-top', '6px');
        $('.heading-quotes').css('color', 'white')
        
        $('#quotes').css('padding-bottom', '4px').css('padding-right', '4px');
        
        $('#section-bio p:last-child').remove();




        // uncomment this to inspect all available data; delete when done
        // EXAMPLE: Looping over top rated recordings; replace with your code
        // let topRated = data.discography.topRated;
        // _.forEach(topRated, function(recording) {
        //     console.log(recording);
        // });
        

        // YOUR CODE ABOVE HERE
    })
    .fail(function() { console.log('getJSON on discography failed!'); });
});
