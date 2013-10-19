var sqlite_db =  function () {

    //10MB
    var db;

    return {
        init : function(){
            db = window.openDatabase("Database", "1.0", "photo and tag", 10000000);
            db.transaction(
                function(tx){
                    tx.executeSql('CREATE TABLE IF NOT EXISTS photo (path TEXT PRIMARY KEY, create_date INTEGER, tag TEXT)');
                    tx.executeSql('CREATE TABLE IF NOT EXISTS tag (name TEXT PRIMARY KEY, last_update INTEGER)');
                    tx.executeSql('SHOW TABLES');
                },
                errorCB
            );
        },

        insert_photo : function (path, create_date, tag) {
            var tag_arr = tag.split(',');
            db.transaction(
                function(tx){
                    tx.executeSql('INSERT INTO photo (path, create_date, tag) VALUES (' + path + ',' + create_date + ',' + tag + ')');
                    for ( var i=0 ; i < tag_arr.length ; i++ ){
                        tx.executeSql('INSERT OR REPLACE INTO tag (name, last_update) VALUES (' + tag_arr[i] + ',' + create_date + ')');
                    }
                },
                errorCB
            );
        },

        clear_db : function () {
            db.transaction(
                function(tx){
                    tx.executeSql('DROP TABLE IF EXISTS DEMO');
                    tx.executeSql('DROP TABLE IF EXISTS photo');
                    tx.executeSql('DROP TABLE IF EXISTS tag');
                    tx.executeSql('CREATE TABLE IF NOT EXISTS photo (path TEXT PRIMARY KEY, create_date INTEGER, tag TEXT)');
                    tx.executeSql('CREATE TABLE IF NOT EXISTS tag (name TEXT PRIMARY KEY, last_update INTEGER)');
                },
                errorCB
            );
        },

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

        // Transaction error callback
        var errorCB = function (err) {
            console.log("Error processing SQL: "+err.code);
        }

    };
};

var album = function () {
    var db = sqlite_db();
    return {
        list_photo : function (cb) {

        },
        list_tag : function (cb) {

        },
        insert_photo : function (path, create_date, tag) {
        
        }
    };
};

var app = {
    // Application Constructor
    init: function() {
        db.sqlite_db();
    }
};
