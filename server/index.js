import express from 'express';
import mysql from 'mysql';
import * as bodyParser from "express";
import cors from 'cors';

const app = express();
app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    port: 3307,
    user: 'root',
    password: '',
    database: 'rent_a_car',
})

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL server');
});


app.get('/', (req,res) => {
    res.send('Hello World');
})

app.get('/vehicles', (req,res) => {
    const sql = "CALL getVehicles()";
    db.query(sql, (err, data) => {
        if (err) throw err;
        return res.json(data[0]);
    });
});
app.get('/vehicle/:vehicleId', (req, res) => {
    const vehicleId = req.params.vehicleId;
    const sql = "CALL getVehicle(?)";
    db.query(sql, [vehicleId], (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json(data[0]);
    });
});
app.post('/vehicle/add', (req,res) => {
    const { aracMarka, aracModel, aracYil, aracRenk, aracImageUrl, aracPlaka, aracFiyat, aracYakit, aracVites, aracKilometre, aracDurum } = req.body;
    const sql = "CALL addVehicle(?,?,?,?,?,?,?,?,?,?,?)";
    db.query(sql, [aracMarka, aracModel, aracYil, aracRenk, aracImageUrl, aracPlaka, aracFiyat, aracYakit, aracVites, aracKilometre, aracDurum], (err, data) => {
        if (err) throw err;
        return res.json({ success: true, message: 'Araç başarıyla eklendi' });
    });
});
app.delete('/vehicle/delete/:vehicleId', (req,res) => {
    const vehicleId = req.params.vehicleId;
    const sql = "CALL deleteVehicle(?)";
    db.query(sql, vehicleId, (err, data) => {
        if (err) throw err;
        return res.json({ success: true, message: 'Araç başarıyla silindi' });
    });
});

app.get('/employees', (req,res) => {
    const sql = "CALL getEmployees()";
    db.query(sql, (err, data) => {
        if (err) throw err;
        return res.json(data[0]);
    });
});
app.post('/employee/add', (req,res) => {
    const { personelAd, personelSoyad, personelKimlik, personelTelefon, personelEmail, personelPozisyon } = req.body;
    const sql = "CALL addEmployee(?,?,?,?,?,?)";
    db.query(sql, [personelAd, personelSoyad, personelKimlik, personelTelefon, personelEmail, personelPozisyon], (err, data) => {
        if (err) throw err;
        return res.json({ success: true, message: 'Personel başarıyla eklendi' });
    });
});
app.delete('/employee/delete/:employeeId', (req,res) => {
    const employeeId = req.params.employeeId;
    const sql = "CALL deleteEmployee(?)";
    db.query(sql, employeeId, (err, data) => {
        if (err) throw err;
        return res.json({ success: true, message: 'Personel başarıyla silindi' });
    });
});

app.get('/customers', (req,res) => {
    const sql = "CALL getCustomers()";
    db.query(sql, (err, data) => {
        if (err) throw err;
        return res.json(data[0]);
    });
});
app.post('/customer/add', (req,res) => {
    const { musteriAd, musteriSoyad, musteriKimlik, musteriTelefon, musteriEmail } = req.body;
    const sql = "CALL addCustomer(?,?,?,?,?)";
    db.query(sql, [musteriAd, musteriSoyad, musteriKimlik, musteriTelefon, musteriEmail], (err, data) => {
        if (err) throw err;
        return res.json({ success: true, message: 'Müşteri başarıyla eklendi' });
    });
});
app.delete('/customer/delete/:customerId', (req,res) => {
    const customerId = req.params.customerId;
    const sql = "CALL deleteCustomer(?)";
    db.query(sql, customerId, (err, data) => {
        if (err) throw err;
        return res.json({ success: true, message: 'Müşteri başarıyla silindi' });
    });
});

app.get('/transactions', (req,res) => {
    const sql = "CALL getTransactions()";
    db.query(sql, (err, data) => {
        if (err) throw err;
        return res.json(data[0]);
    });
});
app.post('/transaction/add', (req,res) => {
    const { aracPlaka, personelKimlik, musteriKimlik, kiralamaTarih, teslimTarih, odeme_tur } = req.body;
    const sql = "CALL addTransaction(?,?,?,?,?,?)";
    db.query(sql, [aracPlaka, personelKimlik, musteriKimlik, kiralamaTarih, teslimTarih, odeme_tur], (err, data) => {
        if(err) {
            return res.json({ success: false, message: 'Teslim tarihi kiralama tarihinden önce olamaz' });
        }
        return res.json({ success: true, message: 'Kiralama işlemi başarıyla eklendi' });
    });
});
app.delete('/transaction/delete/:transactionId', (req,res) => {
    const transactionId = req.params.transactionId;
    const sql = "CALL deleteTransaction(?)";
    db.query(sql, transactionId, (err, data) => {
        if (err) throw err;
        return res.json({ success: true, message: 'Kiralama işlemi başarıyla silindi' });
    });
});

app.get('/maintenances', (req,res) => {
    const sql = "CALL getMaintenances()";
    db.query(sql, (err, data) => {
        if (err) throw err;
        return res.json(data[0]);
    });
});
app.post('/maintenance/add', (req,res) => {
    const { aracPlaka, bakimTarihi, bakimAciklama, bakimFiyat } = req.body;
    const sql = "CALL addMaintenance(?,?,?,?)";
    db.query(sql, [aracPlaka, bakimTarihi, bakimAciklama, bakimFiyat], (err, data) => {
        if (err) throw err;
        return res.json({ success: true, message: 'Bakım işlemi başarıyla eklendi' });
    });
});
app.delete('/maintenance/delete/:maintenanceId', (req,res) => {
    const maintenanceId = req.params.maintenanceId;
    const sql = "CALL deleteMaintenance(?)";
    db.query(sql, maintenanceId, (err, data) => {
        if (err) throw err;
        return res.json({ success: true, message: 'Bakım bilgisi başarıyla silindi' });
    });
});

app.listen(8080,() => {
    console.log("Connected to server")
});
