var sqlite_db =  function () {

    var db;

    var errorCB = function (err) {
        console.log("Error processing SQL: " + err.code);
    };

    return {
        // Transaction error callback
        init : function () {
            //20MB
            db = window.openDatabase("Database", "1.0", "photo and tag", 20000000);
            db.transaction(
                function (tx) {
                    tx.executeSql('CREATE TABLE IF NOT EXISTS photo (path TEXT PRIMARY KEY, create_date INTEGER, tag TEXT)');
                    tx.executeSql('CREATE TABLE IF NOT EXISTS tag (name TEXT PRIMARY KEY, last_update INTEGER)');
                    //tx.executeSql('SHOW TABLES');
                },
                errorCB
            );
        },

        list_photo : function (cb) {
            
            db.transaction(
                function (tx) {
                    tx.executeSql('SELECT * FROM photo', [], 
                        function (tx, results) {
                            var len = results.rows.length;
                            var result_arr = [];
                            console.log("photo table: " + len + " rows found.");
                            for (var i=0; i<len; i++){
                                result_arr.push({
                                    path : results.rows.item(i).path,
                                    create_date : results.rows.item(i).path,
                                    tag : results.rows.item(i).tag
                                });
                            }
                            cb(result_arr);
                        },
                        errorCB);
                },
                errorCB
            );
        },

        list_tag : function (cb) {

            db.transaction(
                function (tx) {
                    tx.executeSql('SELECT * FROM tag', [], 
                        function (tx, results) {
                            var len = results.rows.length;
                            var result_arr = [];
                            console.log("tag table: " + len + " rows found.");
                            for (var i=0; i<len; i++){
                                result_arr.push({
                                    name : results.rows.item(i).name,
                                    last_update : results.rows.item(i).last_update
                                });
                            }
                            cb(result_arr);
                        },
                        errorCB);
                },
                errorCB
            );
        },

        insert_photo : function (path, create_date, tag_arr, cb) {
            var tag_str = tag_arr.join(',');
            db.transaction(
                function (tx) {
                    tx.executeSql('INSERT INTO photo (path, create_date, tag) VALUES (' + path + ',' + create_date + ',' + tag_str + ')');
                    for ( var i=0 ; i < tag_arr.length ; i++ ){
                        tx.executeSql('INSERT OR REPLACE INTO tag (name, last_update) VALUES (' + tag_arr[i] + ',' + create_date + ')');
                    }
                },
                errorCB,
                cb
            );
        },

        clear_db : function () {
            db.transaction(
                function (tx) {
                    tx.executeSql('DROP TABLE IF EXISTS DEMO');
                    tx.executeSql('DROP TABLE IF EXISTS photo');
                    tx.executeSql('DROP TABLE IF EXISTS tag');
                    tx.executeSql('CREATE TABLE IF NOT EXISTS photo (path TEXT PRIMARY KEY, create_date INTEGER, tag TEXT)');
                    tx.executeSql('CREATE TABLE IF NOT EXISTS tag (name TEXT PRIMARY KEY, last_update INTEGER)');
                },
                errorCB
            );
        }

       // // Query the database
       // function queryDB(tx) {
       //     tx.executeSql('SELECT * FROM photo', [], querySuccess, errorCB);
       // }

       // // Query the success callback
       // function querySuccess(tx, results) {
       //     var len = results.rows.length;
       //     console.log("DEMO table: " + len + " rows found.");
       //     for (var i=0; i<len; i++){
       //         console.log("Row = " + i + " ID = " + results.rows.item(i).id + " Data =  " + results.rows.item(i).data);
       //     }
       // }

    };
};

var album = function () {
    var db = sqlite_db();
    db.init();
    return {
        list_photo : db.list_photo,
        list_tag : db.list_tag,
        insert_photo : db.insert_photo,
        clear_db : db.clear_db
    };
};

var app = {
    // Application Constructor
    init: function () {
        var album_inst = album();
        album_inst.insert_photo('abcd',1234,'abc');
        console.log(album_inst.list_photo());
        console.log(album_inst.list_tag());
        album_inst.clear_db();
    }
};
