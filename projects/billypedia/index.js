/* global $ _ opspark */

$(document).ready(function() {
    $.getJSON('data.json', function (data) {
        // YOUR CODE BELOW HERE

        // let $section = $('<section>').attr('id', 'section-rider');
        // $section.append($('<h3>').text('Billy\'s Rider')).appendTo($('#sections'));
        
        // TODO 3: add style with jQuery
        $('#section-quotes').prependTo('#sections');
        $('#section-quotes').css('background-color', 'grey').css('border-radius', '8px');
        $('#section-quotes').children().css('color', 'white').css('padding-left', '10px');
        
        $('.heading-quotes').css('padding-top', '6px');
        $('#quotes').css('padding-bottom', '4px').css('padding-right', '4px');
        $('#section-bio p:last-child').remove();

        // uncomment this to inspect all available data; delete when done
        // EXAMPLE: Looping over top rated recordings; replace with your code
        
        
        let $list = $('#list-top-rated')
        let topRated = data.discography.topRated;
        
        $list.css('word-wrap', 'normal').width('160px');

        // lost in the sauce
        // _.forEach(topRated, function(topRated) {
        //     // console.log(topRated);
        //     let keys = Object.keys(topRated);
        //     let $entry = $('<li>').attr('class', 'recording').css('padding-top', '10px')
        //     let $div = $('<div>').attr('class', 'title')

        //     console.log({keys});

        //     $list.append($entry);
        //     $entry.append($div.text(topRated.title));
        //     $entry.append($div.text(topRated.artist));
        //     $entry.append($div.text(topRated.release));
        //     $entry.append($div.text(topRated.title));

        // });
        
        // let $generalRecords = $('<section>').attr('id', 'section-recordings');
        // let $generalRecordsList = $('<ul>').attr('id', 'list-recordings').attr('class', 'list-recordings');
        // let recordings = data.discography.recordings

        _.map(topRated, function(topRated) {
            console.log(topRated.title)
        });
        

        // YOUR CODE ABOVE HERE
    })
    .fail(function() { console.log('getJSON on discography failed!'); });
});
