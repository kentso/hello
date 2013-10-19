# PhoneGap sqlite database

## schema

    CREATE TABLE IF NOT EXISTS photo (path TEXT PRIMARY KEY, create_date INTEGER, tag TEXT)
    CREATE TABLE IF NOT EXISTS tag (name TEXT PRIMARY KEY, last_update INTEGER)'

## How to use it

    //init album
    var album_inst = album();
    //insert photos
    album_inst.insert_photo('/path/of/photo',1234,['tag']);
    album_inst.insert_photo('/path/should/be/unique',1235,['can', 'use', 'more', 'than', 'one', 'tag']);
    //print photo
    album_inst.list_photo(function (photo_arr) {
        var i;
        for (i=0 ; i<photo_arr.length ; i++){
            console.log('path: "' + photo_arr[i].path + '", create_date: ' + photo_arr[i].create_date + ', tag: "' + photo_arr[i].tag.join(',') + '"');
        }
    });
    //print tag
    album_inst.list_tag(function (tag_arr) {
        var i;
        for (i=0 ; i<tag_arr.length ; i++){
            console.log('name: "' + tag_arr[i].name + '", last_update: ' + tag_arr[i].last_update);
        }
    });

