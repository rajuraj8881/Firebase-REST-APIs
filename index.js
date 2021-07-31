const firebase = require("firebase");
const express = require("express");
const bodyparser = require("body-parser");
const app = express();

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

var firebaseConfig = {
    apiKey: "AIzaSyBEpfUmzwActOVzi7CrOiAYlZ6xYZw2XK0",
    authDomain: "nodejsrestapi-61ed0.firebaseapp.com",
    projectId: "nodejsrestapi-61ed0",
    storageBucket: "nodejsrestapi-61ed0.appspot.com",
    messagingSenderId: "1039988431148",
    appId: "1:1039988431148:web:6f0b8a75ef445fb4adb489",
    measurementId: "G-ZF32GJF8ZW"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//Post add data
app.post('/addData', (req, res) => {
    let data = req.body;

    firebase.firestore().collection('data').add(data).then(doc => {
        res.json({
            success: true,
            message: "Data add with Doc id" + doc.id,
            data: data
        })
        console.log(doc.id);
    }).catch(err => {
        res.json({
            success: false,
            error: err
        })
    });
});

//Get read data
app.get('/readData', (req, res) => {
    let data = [];
    firebase.firestore().collection('data').get().then(docs => {
        docs.forEach(doc => {
            data.push(doc.data());
        })
        res.json({
            success: true,
            count: data.length,
            data: data
        })
    }).catch(err => {
        res.json({
            success: false,
            error: err
        })
    })
});

//Get single data
app.get('/readData/:id', (req, res) => {
    let id = req.params.id;

    firebase.firestore().collection('data').doc(id).get().then(doc => {
        res.json({
            success: true,
            data: doc.data(),
            doc_id: id
        })
    }).catch(err => {
        res.json({
            success: false,
            error: err
        })
    })
})

//Update data
app.put('/updateData/:id', (req, res) => {
    let doc_id = req.params.id;
    let updateData = req.body;

    firebase.firestore().collection('data').doc(doc_id).update(updateData).then(doc => {
        res.json({
            success: true,
            data: updateData
        });
    }).catch(err => {
        res.json({
            success: false,
            error: err
        });
    });
});

//Delete data
app.delete('/deleteData/:id', (req, res) => {
    let doc_id = req.params.id;

    firebase.firestore().collection('data').doc(doc_id).delete().then(doc => {
        res.json({
            success: true,
            data: [],
            message: "Doc Removed"
        });
    }).catch(err => {
        res.json({
            success: false,
            error: err
        });
    });
});


//Test url
app.get('/', (req, res) => {
    res.json({
        message: "About Message."
    });
});

app.listen(3000, () => {
    console.log("app listening on port 3000");
});