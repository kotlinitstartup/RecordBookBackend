-- Insert data into CreditStatuses table
INSERT INTO public."CreditStatuses" (alias) VALUES('Сдал');
INSERT INTO public."CreditStatuses" (alias) VALUES('Не сдал');

-- Insert data into Subjects table
INSERT INTO public."Subjects" ("name") VALUES('ООП');
INSERT INTO public."Subjects" ("name") VALUES('БД');
INSERT INTO public."Subjects" ("name") VALUES('Математика');

-- Insert data into Semesters table
INSERT INTO public."Semesters" (id, "name") VALUES(1, '1');
INSERT INTO public."Semesters" (id, "name") VALUES(2, '2');

-- Insert data into RecordBooks table
INSERT INTO public."RecordBooks" ("number", "studentId") VALUES('7385647389', NULL);
INSERT INTO public."RecordBooks" ("number", "studentId") VALUES('9375647389', NULL);
INSERT INTO public."RecordBooks" ("number", "studentId") VALUES('7384547389', NULL);
INSERT INTO public."RecordBooks" ("number", "studentId") VALUES('5375645389', NULL);
INSERT INTO public."RecordBooks" ("number", "studentId") VALUES('7939383389', NULL);
INSERT INTO public."RecordBooks" ("number", "studentId") VALUES('9375348382', NULL);
INSERT INTO public."RecordBooks" ("number", "studentId") VALUES('4390237821', NULL);
INSERT INTO public."RecordBooks" ("number", "studentId") VALUES('0128354382', NULL);

-- Insert data into Faculties table
INSERT INTO public."Faculties" ("name", "createdAt", "updatedAt") VALUES('ФИТ', '2022-01-01', '2022-01-01');

-- Insert data into Specialities table
INSERT INTO public."Specialities" ("name", "facultyId", "createdAt", "updatedAt") VALUES('ИСИТ', 1, '2022-01-01', '2022-01-01');
INSERT INTO public."Specialities" ("name", "facultyId", "createdAt", "updatedAt") VALUES('ПОИТ', 1, '2022-02-01', '2022-02-01');
INSERT INTO public."Specialities" ("name", "facultyId", "createdAt", "updatedAt") VALUES('ПОИБМС', 1, '2022-01-01', '2022-01-01');
INSERT INTO public."Specialities" ("name", "facultyId", "createdAt", "updatedAt") VALUES('ДЭиВИ', 1, '2022-02-01', '2022-02-01');

-- Insert data into Groups table
INSERT INTO public."Groups" ("name", "specialityId", "createdAt", "updatedAt", "course") VALUES('ИСИТ-1', 1, '2022-01-01', '2022-01-01', 1);
INSERT INTO public."Groups" ("name", "specialityId", "createdAt", "updatedAt", "course") VALUES('ПОИТ-3', 2, '2022-02-01', '2022-02-01', 1);
INSERT INTO public."Groups" ("name", "specialityId", "createdAt", "updatedAt", "course") VALUES('ПОИБМС-7', 3, '2022-01-01', '2022-01-01', 1);
INSERT INTO public."Groups" ("name", "specialityId", "createdAt", "updatedAt", "course") VALUES('ДЭиВИ-10', 4, '2022-02-01', '2022-02-01', 1);

-- Insert data into Students table
INSERT INTO public."Students" (firstname, lastname, patronymic, "groupId", "recordBookId", "createdAt", "updatedAt") VALUES('Максим', 'Крисанов', 'Игоревич', 1, 1, '2022-01-01', '2022-01-01');
INSERT INTO public."Students" (firstname, lastname, patronymic, "groupId", "recordBookId", "createdAt", "updatedAt") VALUES('Иван', 'Машук', 'Сергеевич', 1, 2, '2022-02-01', '2022-02-01');
INSERT INTO public."Students" (firstname, lastname, patronymic, "groupId", "recordBookId", "createdAt", "updatedAt") VALUES('Антон', 'Адамович', 'Игоревич', 2, 3, '2022-01-01', '2022-01-01');
INSERT INTO public."Students" (firstname, lastname, patronymic, "groupId", "recordBookId", "createdAt", "updatedAt") VALUES('Дмитрий', 'Заянковский', 'Валерьевич', 2, 4, '2022-02-01', '2022-02-01');
INSERT INTO public."Students" (firstname, lastname, patronymic, "groupId", "recordBookId", "createdAt", "updatedAt") VALUES('Алексей', 'Тихон', 'Сергеевич', 3, 5, '2022-01-01', '2022-01-01');
INSERT INTO public."Students" (firstname, lastname, patronymic, "groupId", "recordBookId", "createdAt", "updatedAt") VALUES('Евгений', 'Тильковский', 'Игоревич', 3, 6, '2022-02-01', '2022-02-01');
INSERT INTO public."Students" (firstname, lastname, patronymic, "groupId", "recordBookId", "createdAt", "updatedAt") VALUES('Иван', 'Беганский', 'Алексеевич', 4, 7, '2022-01-01', '2022-01-01');
INSERT INTO public."Students" (firstname, lastname, patronymic, "groupId", "recordBookId", "createdAt", "updatedAt") VALUES('Карпович', 'Карина', 'Игоревна', 4, 8, '2022-02-01', '2022-02-01');

-- Insert data into Teachers table
INSERT INTO public."Teachers" (firstname, lastname, patronymic, email, "password", "createdAt", "updatedAt") VALUES('Евгения', 'Блинова', 'Александровна', 'evgenia.blinova@example.com', '$2b$10$i/E5T059wx0g3mGkhf.HiOAjedcB05byW.BfFBQ3bEUEzSqSt8ck.', '2022-01-01', '2022-01-01');
INSERT INTO public."Teachers" (firstname, lastname, patronymic, email, "password", "createdAt", "updatedAt") VALUES('Наталья', 'Пацей', 'Владимировна', 'natalia.patsey@example.com', '$2b$10$i/E5T059wx0g3mGkhf.HiOAjedcB05byW.BfFBQ3bEUEzSqSt8ck.', '2022-02-01', '2022-02-01');
INSERT INTO public."Teachers" (firstname, lastname, patronymic, email, "password", "createdAt", "updatedAt") VALUES('Елена', 'Ловенецкая', 'Ивановна', 'loveneckaya.elena@example.com', '$2b$10$i/E5T059wx0g3mGkhf.HiOAjedcB05byW.BfFBQ3bEUEzSqSt8ck.', '2022-02-01', '2022-02-01');

-- Insert data into TeachersSubjects table
INSERT INTO public."TeachersSubjects" ("createdAt", "updatedAt", "subjectId", "teacherId") VALUES('2022-01-01', '2022-01-01', 1, 2);
INSERT INTO public."TeachersSubjects" ("createdAt", "updatedAt", "subjectId", "teacherId") VALUES('2022-02-01', '2022-02-01', 2, 1);
INSERT INTO public."TeachersSubjects" ("createdAt", "updatedAt", "subjectId", "teacherId") VALUES('2022-02-01', '2022-02-01', 3, 3);

-- Insert data into Credits table
INSERT INTO public."Credits" ("statusId", "teacherId", "studentId", "subjectId", "semesterId", "createdAt", "updatedAt") VALUES(1, 3, 1, 3, 1, '2022-01-01', '2022-01-01');
INSERT INTO public."Credits" ("statusId", "teacherId", "studentId", "subjectId", "semesterId", "createdAt", "updatedAt") VALUES(1, 3, 2, 3, 1, '2022-02-01', '2022-02-01');
INSERT INTO public."Credits" ("statusId", "teacherId", "studentId", "subjectId", "semesterId", "createdAt", "updatedAt") VALUES(1, 3, 3, 3, 1, '2022-02-01', '2022-02-01');
INSERT INTO public."Credits" ("statusId", "teacherId", "studentId", "subjectId", "semesterId", "createdAt", "updatedAt") VALUES(1, 3, 4, 3, 1, '2022-02-01', '2022-02-01');
INSERT INTO public."Credits" ("statusId", "teacherId", "studentId", "subjectId", "semesterId", "createdAt", "updatedAt") VALUES(2, 3, 5, 3, 1, '2022-02-01', '2022-02-01');
INSERT INTO public."Credits" ("statusId", "teacherId", "studentId", "subjectId", "semesterId", "createdAt", "updatedAt") VALUES(2, 3, 6, 3, 1, '2022-02-01', '2022-02-01');
INSERT INTO public."Credits" ("statusId", "teacherId", "studentId", "subjectId", "semesterId", "createdAt", "updatedAt") VALUES(2, 3, 7, 3, 1, '2022-02-01', '2022-02-01');
INSERT INTO public."Credits" ("statusId", "teacherId", "studentId", "subjectId", "semesterId", "createdAt", "updatedAt") VALUES(2, 3, 8, 3, 1, '2022-02-01', '2022-02-01');
INSERT INTO public."Credits" ("statusId", "teacherId", "studentId", "subjectId", "semesterId", "createdAt", "updatedAt") VALUES(1, 3, 1, 3, 2, '2022-04-01', '2022-04-01');
INSERT INTO public."Credits" ("statusId", "teacherId", "studentId", "subjectId", "semesterId", "createdAt", "updatedAt") VALUES(1, 3, 2, 3, 2, '2022-04-011', '2022-04-01');
INSERT INTO public."Credits" ("statusId", "teacherId", "studentId", "subjectId", "semesterId", "createdAt", "updatedAt") VALUES(1, 3, 3, 3, 2, '2022-04-01', '2022-04-01');
INSERT INTO public."Credits" ("statusId", "teacherId", "studentId", "subjectId", "semesterId", "createdAt", "updatedAt") VALUES(1, 3, 4, 3, 2, '2022-04-01', '2022-04-01');
INSERT INTO public."Credits" ("statusId", "teacherId", "studentId", "subjectId", "semesterId", "createdAt", "updatedAt") VALUES(2, 3, 5, 3, 2, '2022-04-01', '2022-04-01');
INSERT INTO public."Credits" ("statusId", "teacherId", "studentId", "subjectId", "semesterId", "createdAt", "updatedAt") VALUES(2, 3, 6, 3, 2, '2022-04-01', '2022-04-01');
INSERT INTO public."Credits" ("statusId", "teacherId", "studentId", "subjectId", "semesterId", "createdAt", "updatedAt") VALUES(2, 3, 7, 3, 2, '2022-04-01', '2022-04-01');
INSERT INTO public."Credits" ("statusId", "teacherId", "studentId", "subjectId", "semesterId", "createdAt", "updatedAt") VALUES(2, 3, 8, 3, 2, '2022-04-01', '2022-04-01');

-- Insert data into Exams table
INSERT INTO public."Exams" (mark, "teacherId", "studentId", "subjectId", "semesterId", "createdAt", "updatedAt") VALUES(10, 1, 1, 1, 1, '2022-01-01', '2022-01-01');
INSERT INTO public."Exams" (mark, "teacherId", "studentId", "subjectId", "semesterId", "createdAt", "updatedAt") VALUES(9, 1, 2, 1, 1, '2022-01-01', '2022-01-01');
INSERT INTO public."Exams" (mark, "teacherId", "studentId", "subjectId", "semesterId", "createdAt", "updatedAt") VALUES(4, 1, 3, 1, 1, '2022-01-01', '2022-01-01');
INSERT INTO public."Exams" (mark, "teacherId", "studentId", "subjectId", "semesterId", "createdAt", "updatedAt") VALUES(5, 1, 4, 1, 1, '2022-01-01', '2022-01-01');
INSERT INTO public."Exams" (mark, "teacherId", "studentId", "subjectId", "semesterId", "createdAt", "updatedAt") VALUES(2, 1, 5, 1, 1, '2022-01-01', '2022-01-01');
INSERT INTO public."Exams" (mark, "teacherId", "studentId", "subjectId", "semesterId", "createdAt", "updatedAt") VALUES(5, 1, 6, 1, 1, '2022-01-01', '2022-01-01');
INSERT INTO public."Exams" (mark, "teacherId", "studentId", "subjectId", "semesterId", "createdAt", "updatedAt") VALUES(7, 1, 7, 1, 1, '2022-01-01', '2022-01-01');
INSERT INTO public."Exams" (mark, "teacherId", "studentId", "subjectId", "semesterId", "createdAt", "updatedAt") VALUES(8, 1, 8, 1, 1, '2022-01-01', '2022-01-01');
INSERT INTO public."Exams" (mark, "teacherId", "studentId", "subjectId", "semesterId", "createdAt", "updatedAt") VALUES(8, 2, 1, 2, 1, '2022-01-01', '2022-01-01');
INSERT INTO public."Exams" (mark, "teacherId", "studentId", "subjectId", "semesterId", "createdAt", "updatedAt") VALUES(8, 2, 2, 2, 1, '2022-01-01', '2022-01-01');
INSERT INTO public."Exams" (mark, "teacherId", "studentId", "subjectId", "semesterId", "createdAt", "updatedAt") VALUES(9, 2, 3, 2, 1, '2022-01-01', '2022-01-01');
INSERT INTO public."Exams" (mark, "teacherId", "studentId", "subjectId", "semesterId", "createdAt", "updatedAt") VALUES(10, 2, 4, 2, 1, '2022-01-01', '2022-01-01');
INSERT INTO public."Exams" (mark, "teacherId", "studentId", "subjectId", "semesterId", "createdAt", "updatedAt") VALUES(5, 2, 5, 2, 1, '2022-01-01', '2022-01-01');
INSERT INTO public."Exams" (mark, "teacherId", "studentId", "subjectId", "semesterId", "createdAt", "updatedAt") VALUES(6, 2, 6, 2, 1, '2022-01-01', '2022-01-01');
INSERT INTO public."Exams" (mark, "teacherId", "studentId", "subjectId", "semesterId", "createdAt", "updatedAt") VALUES(7, 2, 7, 2, 1, '2022-01-01', '2022-01-01');
INSERT INTO public."Exams" (mark, "teacherId", "studentId", "subjectId", "semesterId", "createdAt", "updatedAt") VALUES(3, 2, 8, 2, 1, '2022-01-01', '2022-01-01');







