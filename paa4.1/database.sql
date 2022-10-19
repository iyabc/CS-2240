USE paa4DB;

CREATE TABLE teachers (
	teacher_id int NOT NULL AUTO_INCREMENT,
    teacher_lname varchar(50) DEFAULT NULL,
    teacher_fname varchar(50) DEFAULT NULL,
    teacher_mname varchar(50) DEFAULT NULL,
    PRIMARY KEY (teacher_id)
)	ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE students (
	student_id int NOT NULL AUTO_INCREMENT,
    student_lname varchar(50) DEFAULT NULL,
    student_fname varchar(50) DEFAULT NULL,
    student_mname varchar(50) DEFAULT NULL,
    PRIMARY KEY (student_id)
)	ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE subjects (
	subject_id int NOT NULL AUTO_INCREMENT,
    subject_title varchar(200) DEFAULT NULL,
    subject_no varchar(50) DEFAULT NULL,
    transcript_load int DEFAULT NULL,
    paying_load int DEFAULT NULL,
    teaching_load int DEFAULT NULL,
    PRIMARY KEY (subject_id)
)	ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

select * from teachers;
TRUNCATE TABLE students;
DROP TABLE teachers;

INSERT INTO teachers VALUES (1, 'Panes', 'Julienne Andrea', 'Sentorias'), (2, 'Bungag', 'Viver Val', 'Palomos'),(3, 'Makiling', 'Michael Jay', 'Ricablanca');
INSERT INTO students VALUES (1, 'Olanolan', 'Cyriul', 'Malinao'), (2, 'Pawaon', 'Louis Miguel', 'Jaboc'),(3, 'Domingo', 'Keanne Kyle', 'Bsomething');
INSERT INTO subjects VALUES (1, 'PHILOSOPHY', 'Philo 1000', 1, 2, 3), (2, 'PATH-FIT I', 'PE 1114', 4, 5, 6), (3, 'THEOLOGY', 'Theo 1000	', 7, 8, 10);