import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const generatePDF = () => {
  const doc = new jsPDF();

  // Données du bulletin
  const data = [
    ['MATIERES', 'N1', 'N2', 'Moy Classe', 'Note Compo', 'Moy Trimestre', 'Coeff', 'Points', 'Rang', 'Appréciation', 'Nom Prof', 'Signature'],
    ['Français', 13, 11, 14, 12, 13.00, 3, 39.00, '78è', 'Passable', 'DOUTI', ''],
    ['Anglais', 13, 10, 11.5, 14, 12.75, 2, 25.50, '78', 'Assez-bien', 'BOYODI', ''],
    ['Histoire Géographie', 17, 13, 15, 11, 13.00, 2, 26.00, '88', 'Bien', 'YATOUTI', ''],
    ['ECM', 11, 13, 12, 15, 13.50, 2, 27.00, '78', 'Bien', 'YATOUTI', ''],
    ['SVT', 19, 15, 17, 10, 13.50, 2, 27.00, '78', 'Très bien', 'PADJÀKOMA', ''],
    ['PCT', 16, 13, 14.5, 13, 13.75, 3, 41.25, '56Ex', 'Assez-bien', 'KPENLA', ''],
    ['Mathématiques', 11, 12, 11.5, 11, 11.25, 3, 33.75, '78', 'Passable', 'PADJÀKOMA', ''],
    ['EPS', 14, 14, 14, 17, 15.50, 1, 15.50, '168Ex', 'Bien', 'DJATO', ''],
    ['TOTAUX', '', '', '', '', '', 16, 234.00, '', '', '', '']
  ];

  // Ajouter le titre
  doc.setFontSize(16);
  doc.text('BULLETIN DE NOTES DU PREMIER TRIMESTRE', 105, 20, { align: 'center' });

  // Informations de l'élève
  doc.setFontSize(12);
  doc.text('Nom: NDOGOU', 20, 35);
  doc.text('Prénoms: Drien Aimé', 20, 45);
  doc.text('Classe: 4ème', 20, 55);
  doc.text('Année: 2024-2025', 120, 35);
  doc.text('Effectif: 27', 120, 45);

  // Utiliser autoTable pour le tableau des notes
  doc.autoTable({
    head: [data[0]],
    body: data.slice(1),
    startY: 65,
    styles: {
      fontSize: 8,
      cellPadding: 2,
    },
    headStyles: {
      fillColor: [0, 0, 0],
      textColor: [255, 255, 255],
      fontStyle: 'bold'
    },
    columnStyles: {
      0: { cellWidth: 25 },
      1: { cellWidth: 10 },
      2: { cellWidth: 10 },
      3: { cellWidth: 15 },
      4: { cellWidth: 15 },
      5: { cellWidth: 15 },
      6: { cellWidth: 10 },
      7: { cellWidth: 15 },
      8: { cellWidth: 10 },
      9: { cellWidth: 20 },
      10: { cellWidth: 20 },
      11: { cellWidth: 15 },
    },
  });

  // Moyenne générale
  const moyenneGenerale = (234.00 / 16).toFixed(2);
  doc.setFontSize(10);
  doc.text(`Moyenne Générale: ${moyenneGenerale} / 20`, 20, doc.lastAutoTable.finalY + 10);

  // Sauvegarder le PDF
  doc.save('Bulletin_Scolaire.pdf');

  console.log('Fichier PDF généré: Bulletin_Scolaire.pdf');
};

// Exécuter la fonction
generatePDF();