-- Insert data into CreditStatuses table
INSERT INTO public."CreditStatuses" (alias) VALUES('ok');
INSERT INTO public."CreditStatuses" (alias) VALUES('not ok');

-- Insert data into RecordBooks table
INSERT INTO public."RecordBooks" (id, "number", "studentId", "recordBookId") VALUES(1, '7385647389', NULL, 1);
INSERT INTO public."RecordBooks" (id, "number", "studentId", "recordBookId") VALUES(2, '9375647389', NULL, 2);



-- Insert data into Groups table
INSERT INTO public."Groups" (id, "name", "specialityId", "createdAt", "updatedAt", "course") VALUES(1, 'CS-1', 1, '2022-01-01', '2022-01-01', 2);
INSERT INTO public."Groups" (id, "name", "specialityId", "createdAt", "updatedAt", "course") VALUES(2, 'CS-2', 2, '2022-02-01', '2022-02-01', 1);



-- Insert data into Semesters table
INSERT INTO public."Semesters" (id, "name", "semesterId") VALUES(1, '1', 1);
INSERT INTO public."Semesters" (id, "name", "semesterId") VALUES(2, '2', 2);

-- Insert data into Specialities table
INSERT INTO public."Specialities" (id, "name", "facultyId", "createdAt", "updatedAt") VALUES(1, 'Computer Science', 1, '2022-01-01', '2022-01-01');
INSERT INTO public."Specialities" (id, "name", "facultyId", "createdAt", "updatedAt") VALUES(2, 'Business', 2, '2022-02-01', '2022-02-01');

-- Insert data into Faculties table
INSERT INTO public."Faculties" (id, "name", "createdAt", "updatedAt") VALUES(1, 'Computer Science', '2022-01-01', '2022-01-01');
INSERT INTO public."Faculties" (id, "name", "createdAt", "updatedAt") VALUES(2, 'Business', '2022-02-01', '2022-02-01');

-- Insert data into Students table
INSERT INTO public."Students" (id, firstname, lastname, patronymic, "groupId", "recordBookId", "createdAt", "updatedAt") VALUES(1, 'John', 'Doe', 'D', 1, 1, '2022-01-01', '2022-01-01');
INSERT INTO public."Students" (id, firstname, lastname, patronymic, "groupId", "recordBookId", "createdAt", "updatedAt") VALUES(2, 'Jane', 'Doe', 'D', 2, 2, '2022-02-01', '2022-02-01');

-- Insert data into Subjects table
INSERT INTO public."Subjects" (id, "name", "subjectId") VALUES(1, 'Computer Science', 1);
INSERT INTO public."Subjects" (id, "name", "subjectId") VALUES(2, 'Business', 2);

-- Insert data into Teachers table
INSERT INTO public."Teachers" (firstname, lastname, patronymic, email, "password", "createdAt", "updatedAt") VALUES('John', 'Doe', 'D', 'john.doe@example.com', '12345', '2022-01-01', '2022-01-01');
INSERT INTO public."Teachers" (firstname, lastname, patronymic, email, "password", "createdAt", "updatedAt") VALUES('Jane', 'Doe', 'D', 'jane.doe@example.com', '12345', '2022-02-01', '2022-02-01');

-- Insert data into TeachersSubjects table
INSERT INTO public."TeachersSubjects" ("createdAt", "updatedAt", "subjectId", "teacherId") VALUES('2022-01-01', '2022-01-01', 1, 1);
INSERT INTO public."TeachersSubjects" ("createdAt", "updatedAt", "subjectId", "teacherId") VALUES('2022-02-01', '2022-02-01', 2, 2);

-- Insert data into Credits table
INSERT INTO public."Credits" ("statusId", "teacherId", "studentId", "subjectId", "semesterId", "createdAt", "updatedAt") VALUES(7, 1, 1, 1, 1, '2022-01-01', '2022-01-01');
INSERT INTO public."Credits" ("statusId", "teacherId", "studentId", "subjectId", "semesterId", "createdAt", "updatedAt") VALUES(8, 2, 2, 2, 2, '2022-02-01', '2022-02-01');

-- Insert data into Exams table
INSERT INTO public."Exams" (mark, "teacherId", "studentId", "subjectId", "semesterId", "createdAt", "updatedAt") VALUES(8, 1, 1, 1, 1, '2022-01-01', '2022-01-01');
INSERT INTO public."Exams" (mark, "teacherId", "studentId", "subjectId", "semesterId", "createdAt", "updatedAt") VALUES(5, 2, 2, 2, 2, '2022-02-01', '2022-02-01');







