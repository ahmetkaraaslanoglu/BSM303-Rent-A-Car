CREATE DATABASE IF NOT EXISTS rent_a_car;
use rent_a_car;

CREATE TABLE IF NOT EXISTS araclar (
	id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    marka varchar(255) NOT NULL,
    model varchar(255) NOT NULL,
    yil varchar(255) NOT NULL,
    renk varchar(255) NOT NULL,
    image_url varchar(255),
    plaka varchar(255) NOT NULL,
    fiyat INT NOT NULL,
    yakit varchar(255) NOT NULL,
    vites varchar(255) NOT NULL,
    kilometre varchar(255) NOT NULL,
    durum boolean NOT NULL
);

CREATE TABLE IF NOT EXISTS musteriler (
	id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    ad varchar(255) NOT NULL,
    soyad varchar(255) NOT NULL,
    kimlik dec(11) NOT NULL,
    telefon varchar(255) NOT NULL,
    email varchar(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS personeller (
	id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    ad varchar(255) NOT NULL,
    soyad varchar(255) NOT NULL,
    kimlik dec(11) NOT NULL,
    telefon varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    pozisyon varchar(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS kiralama_islemleri (
	id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    arac_id INT NOT NULL,
    musteri_id INT NOT NULL,
    personel_id INT NOT NULL,
    FOREIGN KEY (arac_id) REFERENCES araclar(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (musteri_id) REFERENCES musteriler(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (personel_id) REFERENCES personeller(id) ON DELETE CASCADE ON UPDATE CASCADE,
    kiralama_tarihi date NOT NULL,
    teslim_tarihi date NOT NULL,
    toplam_fiyat INT NOT NULL,
    odeme_tur varchar(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS bakim_gecmisleri (
	id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    arac_id INT NOT NULL,
    FOREIGN KEY (arac_id) REFERENCES araclar(id) ON DELETE CASCADE ON UPDATE CASCADE,
    bakim_tarihi date NOT NULL,
    bakim_aciklama varchar(255) NOT NULL,
    bakim_fiyat varchar(255) NOT NULL
);


DELIMITER //
CREATE FUNCTION generateImageUrl() RETURNS VARCHAR(255)
BEGIN
    DECLARE imageUrl VARCHAR(255);
    SET imageUrl = 'https://i.im.ge/2024/01/05/32WAA4.default-car-img.md.png';
    RETURN imageUrl;
END //
DELIMITER ;

DELIMITER //
CREATE FUNCTION calculateTotalCost(startDate DATE, endDate DATE, cost INT) RETURNS INT
BEGIN
    DECLARE dateDiff INT;
    DECLARE totalCost INT;
    SET dateDiff = DATEDIFF(endDate, startDate);
    SET totalCost = dateDiff * cost;
    RETURN totalCost;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE getVehicles()
BEGIN
    SELECT * FROM araclar;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE getVehicle(IN aracId VARCHAR(255))
BEGIN
	SELECT * FROM araclar WHERE id = aracId;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE getCustomers()
BEGIN
	SELECT * FROM musteriler;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE getEmployees()
BEGIN
	SELECT * FROM personeller;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE getMaintenances()
BEGIN
	SELECT 
    bakim.*, 
    arac.plaka
    FROM bakim_gecmisleri bakim
    INNER JOIN araclar arac ON bakim.arac_id = arac.id;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE getTransactions()
BEGIN
	SELECT 
    kiralama.*,
    musteri.kimlik,
    personel.email,
    arac.plaka 
    FROM kiralama_islemleri kiralama
    INNER JOIN araclar arac ON kiralama.arac_id = arac.id
    INNER JOIN musteriler musteri ON kiralama.musteri_id = musteri.id
    INNER JOIN personeller personel ON kiralama.personel_id = personel.id;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE addCustomer(
    IN musteriAd VARCHAR(255),
    IN musteriSoyad VARCHAR(255),
    IN musteriKimlik dec(11),
    IN musteriTelefon VARCHAR(255),
    IN musteriEmail VARCHAR(255)
)
BEGIN
	INSERT INTO musteriler (ad, soyad, kimlik, telefon, email)
    VALUES (musteriAd, musteriSoyad, musteriKimlik, musteriTelefon, musteriEmail);
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE addEmployee(
    IN personelAd VARCHAR(255),
    IN personelSoyad VARCHAR(255),
    IN personelKimlik dec(11),
    IN personelTelefon VARCHAR(255),
    IN personelEmail VARCHAR(255),
    IN personelPozisyon VARCHAR(255)
)
BEGIN
	INSERT INTO personeller (ad, soyad, kimlik, telefon, email, pozisyon)
    VALUES (personelAd, personelSoyad, personelKimlik, personelTelefon, personelEmail, personelPozisyon);
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE addMaintenance(
	IN aracPlaka varchar(255),
    IN bakimTarihi date,
    IN bakimAciklama varchar(255),
    IN bakimFiyat INT
)
BEGIN
	DECLARE aracId INT;
    SELECT id INTO aracId FROM araclar WHERE plaka = aracPlaka;
    INSERT INTO bakim_gecmisleri (arac_id, bakim_tarihi, bakim_aciklama, bakim_fiyat)
    VALUES (aracId, bakimTarihi, bakimAciklama, bakimFiyat);
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE addTransaction(
	IN aracPlaka varchar(255),
    IN personelKimlik dec(11),
    IN musteriKimlik dec(11),
    IN kiralamaTarih date,
    IN teslimTarih date,
	IN odeme_tur varchar(255)
)
BEGIN
	DECLARE aracId INT;
    DECLARE personelId INT;
    DECLARE musteriId INT;
    DECLARE gunlukFiyat INT;
    DECLARE toplam_fiyat INT;
   
    SELECT id INTO aracId FROM araclar WHERE plaka = aracPlaka;
    SELECT fiyat INTO gunlukFiyat FROM araclar WHERE plaka = aracPlaka;
    SELECT id INTO personelId FROM personeller WHERE kimlik = personelKimlik;
    SELECT id INTO musteriId FROM musteriler WHERE kimlik = musteriKimlik;
    
    SET toplam_fiyat = calculateTotalCost(kiralamaTarih, teslimTarih, gunlukFiyat);
    
    INSERT INTO kiralama_islemleri(arac_id, musteri_id, personel_id, kiralama_tarihi, teslim_tarihi, toplam_fiyat, odeme_tur)
    VALUES (aracId, musteriId, personelId, kiralamaTarih, teslimTarih, toplam_fiyat, odeme_tur);
END //
DELIMITER ;


DELIMITER //
CREATE PROCEDURE addVehicle(
    IN aracMarka VARCHAR(255),
    IN aracModel VARCHAR(255),
    IN aracYil VARCHAR(255),
    IN aracRenk VARCHAR(255),
    IN aracImageUrl VARCHAR(255),
    IN aracPlaka VARCHAR(255),
    IN aracFiyat INT,
    IN aracYakit VARCHAR(255),
    IN aracVites VARCHAR(255),
    IN aracKilometre VARCHAR(255),
    IN aracDurum boolean
)
BEGIN
	IF aracImageUrl IS NULL OR aracImageUrl = '' THEN
        SET aracImageUrl = generateImageUrl();
    END IF;

	INSERT INTO araclar (marka, model, yil, renk, image_url, plaka, fiyat, yakit, vites, kilometre, durum)
    VALUES (aracMarka, aracModel, aracYil, aracRenk, aracImageUrl, aracPlaka, aracFiyat, aracYakit, aracVites, aracKilometre, 0);
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE deleteCustomer(IN customerId INT)
BEGIN
	DELETE FROM musteriler WHERE id = customerId;
END //
DELIMITER ;


DELIMITER //
CREATE PROCEDURE deleteEmployee(IN employeeId INT)
BEGIN
	DELETE FROM  personeller WHERE id = employeeId;
END //
DELIMITER ;


DELIMITER //
CREATE PROCEDURE deleteMaintenance(IN maintenanceId INT)
BEGIN
	DELETE FROM bakim_gecmisleri WHERE id = maintenanceId;
END //
DELIMITER ;


DELIMITER //
CREATE PROCEDURE deleteTransaction(IN transactionId INT)
BEGIN
	DELETE FROM kiralama_islemleri WHERE id = transactionId;
END //
DELIMITER ;


DELIMITER //
CREATE PROCEDURE deleteVehicle(IN aracId INT)
BEGIN
	DELETE FROM araclar WHERE id = aracId;
END //
DELIMITER ;


DELIMITER //
CREATE PROCEDURE updateVehicleState(IN aracId INT)
BEGIN
	UPDATE araclar SET durum = NOT durum WHERE id = aracId;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE updateVehiclePlate(IN aracId INT, IN aracPlaka VARCHAR(255))
BEGIN
	UPDATE araclar SET plaka = aracPlaka WHERE id = aracId;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE updateVehicleCost(IN aracId INT, IN aracFiyat INT)
BEGIN
	UPDATE araclar SET fiyat = aracFiyat WHERE id = aracId;
END //
DELIMITER ;


DELIMITER //
CREATE TRIGGER before_addTransaction
BEFORE INSERT ON kiralama_islemleri
FOR EACH ROW
BEGIN
    IF NEW.teslim_tarihi < NEW.kiralama_tarihi THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Hata';
    END IF;
END //
DELIMITER ;


DELIMITER //
CREATE TRIGGER before_addVehicle
BEFORE INSERT ON araclar
FOR EACH ROW
BEGIN
    DECLARE existingCount INT;
    SELECT COUNT(*) INTO existingCount
    FROM araclar
    WHERE plaka = NEW.plaka;
    IF existingCount > 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Hata';
    END IF;
END //
DELIMITER ;


