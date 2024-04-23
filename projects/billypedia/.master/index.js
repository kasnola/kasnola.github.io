/* global $ _ opspark */
$(document).ready(function() {
    $.getJSON('./data.json', function (data) {
        // YOUR CODE BELOW HERE //
        // console.log(data);

        const
            billyPics = data.images.billy,
            $billyPic = $('#image-billy');

        $billyPic
            .on('click', function(event) {
                let i = $billyPic.attr('i');
                const pacifier = opspark.makePacifier($('#image-container-billy')[0]);
                $billyPic
                    .attr('src', billyPics[++i] || billyPics[i = 0])
                    .attr('i', i)
                    .hide()
                    .on('load', function (event) {
                        pacifier.stop();
                        $(event.currentTarget).fadeIn(200);
                    });
            });

        const topRated = data.discography.topRated;

        const $imageContainerTopRated = $('<div>').attr('id', 'image-container-top-rated').addClass('image-container');
        $imageContainerTopRated.append(createImage(_.find(topRated, {'title': 'Voice in the Night'}).art));
        $('#header-top-rated').after($imageContainerTopRated);

        const topRatedListItems = _.map(topRated, function(recording) {
            return $('<li>').addClass('top-rated')
                .attr('art', recording.art)
                .append($('<div>').addClass('top-rated-title').text(recording.title));
        });
        $('#list-top-rated').append(topRatedListItems);
        $('.top-rated').on('click', {id: 'image-container-top-rated'}, replaceImage);

        const recordings = data.discography.recordings;
        const recordingsListItems = _.map(recordings, function(recording) {
            return $('<li>').addClass('recording')
                .attr('art', recording.art)
                .append($('<div>')
                    .addClass('recording-title')
                    .text(truncateString(recording.title, 22)));
        });

        const $sectionRecordings = $('<section>').attr('id', 'section-recordings').addClass('recordings');
        const $headerRecordings = $('<header>').addClass('header-recordings').text('Recordings');
        const $listRecordings = $('<ul>').attr('id', 'list-recordings').append(recordingsListItems);
        const $imageContainerRecording = $('<div>').attr('id', 'image-container-recording').addClass('image-container');
        $imageContainerRecording.append(createImage(_.first(recordings).art));

        $sectionRecordings
            .append($headerRecordings)
            .append($imageContainerRecording)
            .append($listRecordings)
            .appendTo('#sidebar');

         $('.recording').on('click', {id: 'image-container-recording'}, replaceImage);

        const $table = createTable(data.rider);

        $('.content').append($table);

        // YOUR CODE ABOVE HERE //
    })
    .fail(function() { console.log('getJSON on discography failed!'); });
});

function replaceImage(event) {
    const
        $imageContainer = $(`#${event.data.id}`).empty(),
        pacifier = opspark.makePacifier($imageContainer[0]),
        artPath = $(event.currentTarget).attr('art');
    $imageContainer.append(createImage(artPath, pacifier));
}

function createImage(path, pacifier) {
    const $image = $('<img>')
        .hide()
        .attr('id', 'recording-image')
        .attr('src', path)
        .addClass('image')
        .on('load', function(event) {
            if(pacifier) pacifier.stop();
            $image.fadeIn(200);
        });
    return $image;
}

function truncateString(string, length) {
    return string.length > length ? string.substring(0, length) + '...' : string;
}

function createTable(riders){
    var createRow = function(rider){
        var $row = $("<tr>");
        var $type = $("<td>").text(rider.type);
        var $desc = $("<td>").text(rider.desc);
        $row.append($type);
        $row.append($desc);
        return $row;
    }
    var $table = $("<table>");
    var $rows = riders.map(createRow);
    $table.append($rows);
    return $table;
};
