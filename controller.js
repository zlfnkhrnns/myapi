'use strict';

var response = require('./res');
var connection = require('./conn');

//LIST

exports.lists = function(req, res) {
    connection.query('SELECT lis.*, kategori.nama as kategori FROM lis LEFT JOIN kategori ON kategori.idKategori = lis.kategoriId', function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.lis(rows, res)
        }
    });
};

exports.findLists = function(req, res) {
    
    var judulSejarah = req.params.judulSejarah;

    connection.query('SELECT * FROM lis where judulSejarah like "%'+judulSejarah+'%" or namaNarator like "%'+judulSejarah+'%"',
    [ judulSejarah ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.lis(rows, res)
        }
    });
};

// exports.createLists = function(req, res) {
    
//     var kategoriId = req.body.kategoriId;
//     var indeksId = req.body.indeksId;
//     var namaNarator = req.body.namaNarator;
//     var namaInterview = req.body.namaInterview;
//     var judulSejarah = req.body.judulSejarah;
//     var tempatInterview = req.body.tempatInterview;
//     var tanggalInterview = req.body.tanggalInterview;
//     var rekaman = req.files.rekaman[0].filename;
//     var volume = req.body.volume;
//     var copyright = req.body.copyright;
//     var foto = req.files.foto[0].filename;
//     var download = req.body.download;
//     var indeks = req.body.indeks;

//     connection.query('INSERT INTO lis (kategoriId, indeksId, namaNarator, namaInterview, judulSejarah, tempatInterview, tanggalInterview, rekaman, volume, copyright, foto, download, indeks)values (?,?,?,?,?,?,?,?,?,?,?,?,?)',
//     [ kategoriId, indeksId, namaNarator, namaInterview, judulSejarah, tempatInterview, tanggalInterview, rekaman, volume, copyright, foto, download, indeks ], 
//     function (error, rows, fields){
//         if(error){
//             console.log(error)
//         } else{
//             response.lis("Berhasil menambahkan List!", res)
//         }
//     });
// };

// exports.updateLists = function(req, res) {
    
//     //var no = req.body.no;
//     var kategoriId = req.body.kategoriId;
//     var indeksId = req.body.indeksId;
//     var namaNarator = req.body.namaNarator;
//     var namaInterview = req.body.namaInterview;
//     var judulSejarah = req.body.judulSejarah;
//     var tempatInterview = req.body.tempatInterview;
//     var tanggalInterview = req.body.tanggalInterview;
//     var rekaman = req.body.rekaman;
//     var volume = req.body.volume;
//     var copyright = req.body.copyright;
//     var foto = req.body.foto;
//     var download = req.body.download;
//     var indeks = req.body.indeks;

//     connection.query('UPDATE lis SET kategoriId = ?, namaNarator = ?, namaInterview = ?, judulSejarah = ?, tempatInterview = ?, tanggalInterview = ?, rekaman = ?, volume = ?, copyright = ?, foto = ?, indeks=? WHERE indeksId = ?',
//     [ kategoriId, namaNarator, namaInterview, judulSejarah, tempatInterview, tanggalInterview, rekaman, volume, copyright, foto, download, indeks, indeksId ], 
//     function (error, rows, fields){
//         if(error){
//             console.log(error)
//         } else{
//             response.lis("Berhasil merubah List!", res)
//         }
//     });
// };

// exports.deleteLists = function(req, res) {
    
//     var indeksId = req.body.indeksId;

//     connection.query('DELETE FROM lis WHERE indeksId = ?',
//     [ indeksId ], 
//     function (error, rows, fields){
//         if(error){
//             console.log(error)
//         } else{
//             response.lis("Berhasil menghapus List!", res)
//         }
//     });
// };


//KATEGORI

exports.kategori = function(req, res) {
    connection.query('SELECT * FROM kategori `idKategori`', function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.kat(rows, res)
        }
    });
};

exports.findKategori = function(req, res) {

    var nama = req.params.nama;

    connection.query('SELECT * FROM kategori where nama like "%'+nama+'%"',
    [ nama ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.kat(rows, res)
        }
    });
};
// exports.createKategori = function(req, res) {

//     var idKategori = req.body.idKategori;
//     var nama = req.body.nama;
//     var gambar = req.files.gambar[0].filename

//     connection.query('INSERT INTO `kategori` (`idKategori`, `nama`, `gambar`) values (?,?,?)',
//     [ idKategori, nama, gambar ], 
//     function (error, result, fields){
//         if(error){
//             throw error
//         } else{
//             res.end(JSON.stringify(result))
//         }
//     });
// };

// exports.updateKategori = function(req, res) {

//     connection.query('UPDATE `kategori` SET `nama` = ?, `gambar` = ? where `idKategori` = ?',
//     [ req.body.nama, req.files.gambar[0].filename, req.body.idKategori ], 
//     function (error, result, fields){
//         if(error){
//             console.log(error)
//         } else{
//             res.end(json.stringify(result))
//         }
//     });
// };

// exports.deleteKategori = function(req, res) {
    
//     var idKategori = req.body.idKategori;

//     connection.query('DELETE FROM kategori WHERE idKategori = ?',
//     [ idKategori ], 
//     function (error, rows, fields){
//         if(error){
//             console.log(error)
//         } else{
//             response.kat("Berhasil menghapus kategori!", res)
//         }
//     });
// };

//INDEKSINTERVIEW

exports.deks = function(req, res) {
    connection.query('SELECT * FROM indeks', function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.deks(rows, res)
        }
    });
};

exports.findDeks = function(req, res) {
    
    var topik = req.params.topik;

    connection.query('SELECT * FROM indeks where topik like "%'+topik+'%"',
    [ topik ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.deks(rows, res)
        }
    });
};

// exports.createDeks = function(req, res) {
//     var no = req.body.no;
//     var idIndeks = req.body.idIndeks;
//     var topik = req.body.topik;
//     var menit = req.body.menit;

//     connection.query('INSERT INTO `indeks` SET `no` = ?, `idIndeks` = ?, `topik` = ?, `menit` = ?',
//     [ no, idIndeks, topik, menit ], 
//     function (error, rows, fields){
//         if(error){
//             console.log(error)
//         } else{
//             response.deks("Berhasil menambahkan indeks!", res)
//         }
//     });
// };

// exports.updateDeks = function(req, res) {
    
//     var no = req.body.no; 
//     var idIndeks = req.body.idIndeks;
//     var topik = req.body.topik;
//     var menit = req.body.menit;

//     connection.query('UPDATE indeks SET idIndeks = ?, topik = ?, menit = ?  WHERE no = ?',
//     [ idIndeks, topik, menit, no ], 
//     function (error, rows, fields){
//         if(error){
//             console.log(error)
//         } else{
//             response.deks("Berhasil merubah indeks!", res)
//         }
//     });
// };

// exports.deleteDeks = function(req, res) {
    
//     var no = req.params.no;

//     connection.query('DELETE FROM indeks WHERE no = ?',
//     [ no ], 
//     function (error, rows, fields){
//         if(error){
//             console.log(error)
//         } else{
//             response.deks("Berhasil menghapus indeks!", res)
//         }
//     });
// };

//INDEX

exports.index = function(req, res) {
    response.ok("Hello this is database Arisan", res)
};
