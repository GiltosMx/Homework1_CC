/* 
 ***************************************************
 *     APLICACIONES Y SERVICIOS EN LA NUBE         *
 *                   ITESO                         *
 *                                                 * 
 *    Actividad 1: Diseño de un WebService         *
 *    Codigo Base: Alvaro Parres (parres@iteso.mx) * 
 *                                                 * 
 *    Alumno: Gilberto Adrian Toscano Prieto       *
 *    Exp: is698076                                *
 *                                                 *
 ***************************************************
 *                                                 *
 * Instrucciones: Complete el codigo basado en     * 
 * las indicaciones descritas en el documento      *
 *                                                 *
 ***************************************************
 */

var Wine = require('../models/wine');

exports.findAll = function(req, res) {
    
    // These lines are from the Phase 1

    // console.log('All Wines Request');
    //Modified the res.send code to return two JSON Objects
    // var responseJSON = {
    //     result: [
    //         {
    //             id: "id",
    //             name: "name",
    //             description: "description"
    //         },
    //         {
    //             id: "id2",
    //             name: "name2",
    //             description: "description2"
    //         }
    //     ]
    // }
    // res.send(responseJSON);

    // Wine is our MongoDB Object that provides access to the wines database
    Wine.find(function(err,wines) {
        if(err)
            res.send(500, err.message);

        console.log('All Wines Request');
        res.status(200).jsonp(wines);
    })
};

exports.findById = function(req, res) {

    // These lines are from the Phase 1

    // console.log('ID: '+req.params.id+' Wine Request');
    // Modified the res.send line to send a JSON Object with the requested ID. 
    // res.send({"id":req.params.id, "name":"nombre", "description":"DESCRIPCION"});

    Wine.findById(req.params.id, function callback(err, result) {
        if(err)
            res.send(500, err.message);
            
        console.log('ID: '+req.params.id+' Wine Request');
        res.status(200).jsonp(result);    
    })
};

exports.addWine = function(req, res) {
    var newWine = new Wine({
        name: req.body.name,
        year: req.body.year,
        grapes: req.body.grapes,
        country: req.body.country,
        description: req.body.description
    });

    newWine.save(function(err,addedElement) {
        if(err)
            res.status(500).send(err.message);
        
        res.status(200).jsonp(addedElement);    
    });
};

exports.deleteWine = function(req,res) {
    Wine.findById(req.params.id, function callback(err, result) {
        if(err)
            res.send(500, err.message);
        
        var wineToDelete = result;

        wineToDelete.remove(function(err) {
            if(err)
                res.status(500).send(err.message);
            
            res.status(200).send(wineToDelete);
        })
    })
};

exports.updateWine = function(req,res) {
    Wine.findById(req.params.id, function callback(err, result) {
        if(err)
            res.send(500, err.message);
        
        var wineToUpdate = result;

        wineToUpdate.name = req.body.name;
        wineToUpdate.year = req.body.year;
        wineToUpdate.grapes = req.body.grapes;
        wineToUpdate.country = req.body.country;
        wineToUpdate.description = req.body.description;
    
        wineToUpdate.save(function(err,addedElement) {
            if(err)
                res.status(500).send(err.message);
            
            res.status(200).jsonp(addedElement);    
        });
    })
};