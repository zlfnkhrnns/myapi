'use strict';
var connection = require('./conn');
var multer = require('multer');
const bodyParser = require('body-parser');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      if(file.fieldname === "gambar") {
          cb(null, "assets/kategori");
        } else {
          cb(null, err);
        }
      },
      filename: (req, file, cb) => {
          cb(null, Date.now() + "--" + file.originalname);
        },
      }); 
const upload = multer({storage: storage});

const storage2 = multer.diskStorage({
    destination: (req, file, cb) => {
    if(file.fieldname === "rekaman") {
        cb(null, "assets/rekaman");
      } else {
        cb(null, "assets/foto");
      }
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "--" + file.originalname);
      },
    });
    
const upload2 = multer({storage: storage2});

module.exports = function(app) {
    var todoList = require('./controller');

    app.route('/').get(todoList.index);

    //LIST

    app.route('/List').get(todoList.lists);
    app.route('/List/:judulSejarah').get(todoList.findLists);
    app.post('/List', upload2.fields([{ name: 'rekaman', maxCount:1}, {name: 'foto', maxCount: 1}]), function(req, res, next){
      connection.query('INSERT INTO `lis` SET `idSejarah` =?, `kategoriId` = ?, `namaNarator` = ?, `namaInterview` = ?, `judulSejarah` = ?, `tempatInterview` = ?, `tanggalInterview` = ?, `rekaman` = ?, `volume` = ?, `copyright` = ?, `foto` = ?, `download`=?, `indeks` =?',
    [req.body.idSejarah, req.body.kategoriId, req.body.namaNarator, req.body.namaInterview, req.body.judulSejarah, req.body.tempatInterview, req.body.tanggalInterview,  req.files.rekaman[0].filename, req.body.volume, req.body.copyright, req.files.foto[0].filename, req.body.download, req.body.indeks], 
    function (error, result, fields){
        if(error){
            throw error
        } else{
            res.end(JSON.stringify(result))
        }
    });
    });
    
    app.put('/List/:idSejarah', upload2.fields([{ name: 'rekaman', maxCount:1}, {name: 'foto', maxCount: 1}]), function(req, res, next){
        if(req.files){
            connection.query('UPDATE `lis` SET  `kategoriId` = ?, `namaNarator` = ?, `namaInterview` = ?, `judulSejarah` = ?, `tempatInterview` = ?, `tanggalInterview` = ?, `rekaman` = ?, `volume` = ?, `copyright` = ?, `foto` = ?, `download`=?, `indeks` = ? where `idSejarah` = ?',
            [req.body.kategoriId, req.body.namaNarator, req.body.namaInterview, req.body.judulSejarah, req.body.tempatInterview, req.body.tanggalInterview,  req.files.rekaman[0].filename, req.body.volume, req.body.copyright, req.files.foto[0].filename, req.body.download, req.body.indeks, req.params.idSejarah ], 
            function (error, result, fields){
                if(error){
                    throw error
                } else{
                    res.end(JSON.stringify(result))
                }
            });
    } else {
            connection.query('UPDATE `lis` SET  `kategoriId` = ?, `namaNarator` = ?, `namaInterview` = ?, `judulSejarah` = ?, `tempatInterview` = ?, `tanggalInterview` = ?, `volume` = ?, `copyright` = ?, `download`=?, `indeks` = ? where `idSejarah` = ?',
            [req.body.kategoriId, req.body.namaNarator, req.body.namaInterview, req.body.judulSejarah, req.body.tempatInterview, req.body.tanggalInterview,  req.body.volume, req.body.copyright, req.body.download, req.body.indeks, req.params.idSejarah ], 
            function (error, result, fields){
                if(error){
                    throw error
                } else{
                    res.end(JSON.stringify(result))
                }
            });
        }
    });

    app.delete('/List/:idSejarah', function(req, res, next){
      connection.query('DELETE FROM `lis` WHERE `idSejarah` = ?',
      [ req.params.idSejarah ], 
    function (error, result, fields){
        if(error){
            throw error
        } else{
            res.end(JSON.stringify(result))
        }
    });
    });

    //kategori
    app.use(bodyParser.json())
    app.route('/Kategori').get(todoList.kategori);
    app.route('/Kategori/:nama').get(todoList.findKategori);

    app.post('/Kategori',upload.fields([{ name: 'gambar', maxCount:1}]), function(req, res, next) {
    connection.query('INSERT INTO `kategori` SET `nama` = ?, `gambar` = ?',
    [req.body.nama, req.files.gambar[0].filename ],
    function (error, result, fields){
        if(error){
            throw error
        } else{
            res.end(JSON.stringify(result))
        }
    });
    });

    app.put('/Kategori/:idKategori', upload.fields([{ name: 'gambar', maxCount:1}]), function(req, res, next){
        if(req.files){
            connection.query('UPDATE `kategori` SET `nama` = ?, `gambar` = ? where `idKategori` = ?',
            [ req.body.nama, req.files.gambar[0].filename, req.params.idKategori ], 
            function (error, result, fields){
                if(error){
                    throw error
                } else{
                    res.end(JSON.stringify(result))
                }
            });
        }else {
            connection.query('UPDATE `kategori` SET `nama` = ? where `idKategori` = ?',
            [ req.body.nama, req.params.idKategori ], 
            function (error, result, fields){
                if(error){
                    throw error
                } else{
                    res.end(JSON.stringify(result))
                }
            });
        }  
    });

    app.delete('/Kategori/:idKategori', function(req, res, next){
      connection.query('DELETE FROM `kategori` WHERE `idKategori` = ?',
      [ req.params.idKategori ], 
    function (error, result, fields){
        if(error){
            throw error
        } else{
            res.end(JSON.stringify(result))
        }
    });
    });

    //indeks

    app.route('/Indeks').get(todoList.deks);
    app.route('/Indeks/:topik').get(todoList.findDeks);
    app.post('/Indeks', function(req, res) {
      connection.query('INSERT INTO `indeks` SET `idIndeks` = ?, `sejarahId` = ?, `topik` = ?, `menit` = ?',
      [req.body.idIndeks, req.body.sejarahId, req.body.topik, req.body.menit],
      function (error, result, fields){
          if(error){
              throw error
          } else{
              res.end(JSON.stringify(result))
          }
      });
      });

    app.put('/Indeks/:idIndeks', function(req, res, next){
      connection.query('UPDATE `indeks` SET `sejarahId` = ?, `topik` = ?, `menit` = ? where `idIndeks` = ?',
    [req.body.sejarahId, req.body.topik, req.body.menit, req.params.idIndeks], 
    function (error, result, fields){
        if(error){
            throw error
        } else{
            res.end(JSON.stringify(result))
        }
    });
    });   

    app.delete('/Indeks/:idIndeks', function(req, res, next){
      connection.query('DELETE FROM `indeks` WHERE `idIndeks` = ?',
      [ req.params.idIndeks ], 
    function (error, result, fields){
        if(error){
            throw error
        } else{
            res.end(JSON.stringify(result))
        }
    });
    });
};
