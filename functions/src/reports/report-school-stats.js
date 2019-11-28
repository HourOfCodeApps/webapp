import * as Excel from 'exceljs';
import * as functions from 'firebase-functions';

import os from 'os';
import path from 'path';
import fs from 'fs';

import admin from '../lib/firebase';


//
const firestore = admin.firestore();

const getSchools = async () => {
  const snaps = await firestore.collection('schools').get();

  const schools = snaps.docs.map(d => ({
    ...d.data(),
    id: d.id,
  }));

  return schools;

  // const schoolsMap = schools.reduce((acc, curr) => ({ ...acc, [curr.id]: curr }), {});
  // return schoolsMap;
}

const getTeachersBySchool = async (schoolId) => {
  const snaps = await firestore.collection('teachers')
    .where('schoolId', '==', schoolId)
    .get();

  return snaps.docs.map(d => ({ ...d.data(), uid: d.id }));
}

const getTimeslotsBySchool = async (schoolId) => {
  const snaps = await firestore.collection('timeslots')
    .where('schoolId', '==', schoolId)
    .get();

  return snaps.docs.map(d => ({ ...d.data(), id: d.id }));
}

const aggregateSchool = async (school) => {
  const teachers = await getTeachersBySchool(school.id);
  const timeslots = await getTimeslotsBySchool(school.id);

  return {
    ...school,
    teachersCount: teachers.length,
    timeslotsCount: timeslots.length,
    pupilsCount: timeslots.reduce((acc, curr) => acc + (curr.pupilsCount || 0), 0),
  };
}

const generateReportFile = async (filePath) => {
  const schools = await getSchools();

  const schoolsAggregated = await Promise.all(schools.map(aggregateSchool));
  const schoolsAggregatedSorted = schoolsAggregated.sort(
    (a, b) => {
      if (a.teachersCount !== b.teachersCount) {
        return b.teachersCount - a.teachersCount;
      }

      if (a.timeslotsCount !== b.timeslotsCount) {
        return b.timeslotsCount - a.timeslotsCount;
      }

      return b.pupilsCount - a.pupilsCount;
    }
  );

  const stats = schoolsAggregatedSorted.reduce(
    (acc, curr) => ({
      teachersCount: acc.teachersCount + curr.teachersCount,
      timeslotsCount: acc.timeslotsCount + curr.timeslotsCount,
      pupilsCount: acc.pupilsCount + curr.pupilsCount,
    }),
    { teachersCount: 0, timeslotsCount: 0, pupilsCount: 0 },
  );


  const workbook = new Excel.Workbook();
  const ws = workbook.addWorksheet('Школи');


  ws.columns = [
    { header: 'Школа', key: 'name', width: 30 },
    { header: 'Вчителі', key: 'teachersCound', width: 10 },
    { header: 'Уроки', key: 'timeslotsCount', width: 10 },
    { header: 'Учні', key: 'pupilsCount', width: 10 },
  ];

  const statsRow = ws.getRow(2);
  statsRow.style = { font: { bold: true } };
  statsRow.getCell(1).value = 'Всього';
  statsRow.getCell(2).value = { formula: `SUM(B3:B${schoolsAggregatedSorted.length + 2})`, result: stats.teachersCount };
  statsRow.getCell(3).value = { formula: `SUM(C3:C${schoolsAggregatedSorted.length + 2})`, result: stats.timeslotsCount };
  statsRow.getCell(4).value = { formula: `SUM(D3:D${schoolsAggregatedSorted.length + 2})`, result: stats.pupilsCount };

  statsRow.commit();

  let rowI = 3;

  schoolsAggregatedSorted.forEach((school, i) => {
    const row = ws.getRow(rowI);

    row.getCell(1).value = school.name;
    row.getCell(1).alignment = {
      wrapText: true,
      vertical: 'top',
    };

    row.getCell(2).value = school.teachersCount;
    row.getCell(2).alignment = {
      wrapText: true,
      vertical: 'top',
    };

    row.getCell(3).value = school.timeslotsCount;
    row.getCell(3).alignment = {
      wrapText: true,
      vertical: 'top',
    };

    row.getCell(4).value = school.pupilsCount;
    row.getCell(4).alignment = {
      wrapText: true,
      vertical: 'top',
    };

    row.commit();
    rowI++;
  });

  return workbook.xlsx.writeFile(filePath);
}

const generateReport = async () => {
  const reportId = 'school-stats';
  const tempLocalFile = path.join(os.tmpdir(), `${reportId}.xlsx`);
  const destination = `reports/${reportId}.xlsx`;

  await admin.firestore().collection('reports').doc(reportId).set({
    inProgress: true,
  }, { merge: true });

  // generate report
  await generateReportFile(tempLocalFile);
  console.log('Report generated at', tempLocalFile);

  const bucket = admin.storage().bucket();
  const file = bucket.file(destination);

  // Uploading the Report.
  await bucket.upload(tempLocalFile, { destination });
  console.log('Report uploaded to Storage at', destination);
  fs.unlinkSync(tempLocalFile);

  // Get the Signed URLs for the report.
  const config = {
    action: 'read',
    expires: '03-01-2500',
  };

  const urlResults = await file.getSignedUrl(config);

  await admin.firestore().collection('reports').doc(reportId).set({
    inProgress: false,
    url: urlResults[0],
    generationTime: admin.firestore.Timestamp.fromDate(new Date()),
  }, { merge: true });

  return console.log('Report URL saved to database.');
}

export default generateReport;
