import React, { useState } from 'react';
import { Download, Printer, FileSpreadsheet } from 'lucide-react';
import html2pdf from 'html2pdf.js';
import cipLogo from './assets/CIP.jpg';
import './BulletinGenerator.css';

const BulletinGenerator = () => {
  const [headerInfo, setHeaderInfo] = useState({
    schoolName: "COMPLEXE SCOLAIRE EXEMPLE",
    anneeScolaire: "2025 - 2026",
    eleveNom: "NOM Prénoms",
    classe: "3ème",
    matricule: "12345",
    effectif: "45",
    trimestre: "1er Trimestre"
  });

  const [subjects, setSubjects] = useState([
    { name: "Français", n1: 12, n2: 14, moyClasse: 13, compo: 12, coeff: 3, prof: "M. DUPONT", rang: "", appreciation: "Passable" },
    { name: "Anglais", n1: 15, n2: 13, moyClasse: 14, compo: 14, coeff: 2, prof: "Mme SMITH", rang: "", appreciation: "Assez-bien" },
    { name: "Histoire-Géographie", n1: 10, n2: 11, moyClasse: 10.5, compo: 11, coeff: 2, prof: "M. KOFFI", rang: "", appreciation: "Bien" },
    { name: "ECM", n1: 14, n2: 14, moyClasse: 14, compo: 15, coeff: 1, prof: "M. KONATE", rang: "", appreciation: "Bien" },
    { name: "SVT", n1: 11, n2: 12, moyClasse: 11.5, compo: 10, coeff: 2, prof: "Mme TOURE", rang: "", appreciation: "Très bien" },
    { name: "PCT", n1: 13, n2: 15, moyClasse: 14, compo: 13, coeff: 2, prof: "M. YAO", rang: "", appreciation: "Assez-bien" },
    { name: "Mathématiques", n1: 9, n2: 10, moyClasse: 9.5, compo: 11, coeff: 4, prof: "M. SOW", rang: "", appreciation: "Passable" },
    { name: "EPS", n1: 18, n2: 18, moyClasse: 18, compo: 17, coeff: 1, prof: "M. CISSE", rang: "", appreciation: "Bien" },
  ]);

  const [footerInfo, setFooterInfo] = useState({
    absences: "02",
    retards: "00",
    conduite: "Bonne",
    decision: "Passe en classe supérieure",
    tableauHonneur: false,
    encouragements: true,
    felicitations: false,
    avertissement: false,
    blame: false
  });

  // Calculs automatiques
  const calculateRow = (subject) => {
    const moyInterro = (parseFloat(subject.n1 || 0) + parseFloat(subject.n2 || 0)) / 2;
    const moyTrimestre = ((moyInterro + parseFloat(subject.compo || 0)) / 2).toFixed(2);
    const points = (parseFloat(moyTrimestre) * subject.coeff).toFixed(2);
    return { ...subject, moyCalculee: moyTrimestre, points: points };
  };

  const rowsWithCalcs = subjects.map(calculateRow);
  const totalCoeff = rowsWithCalcs.reduce((acc, curr) => acc + curr.coeff, 0);
  const totalPoints = rowsWithCalcs.reduce((acc, curr) => acc + parseFloat(curr.points), 0);
  const moyenneGenerale = (totalPoints / totalCoeff).toFixed(2);

  // Export PDF
  const exportToPDF = () => {
    const element = document.getElementById('bulletin-content');
    const opt = {
      margin: 0.5,
      filename: 'Bulletin_Scolaire.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
  };

  const handleSubjectChange = (index, field, value) => {
    const newSubjects = [...subjects];
    newSubjects[index][field] = value;
    setSubjects(newSubjects);
  };

  return (
    <div className="bulletin-container">
      <div className="bulletin-card">
        
        {/* Toolbar */}
        <div className="toolbar print-hidden">
          <h1><FileSpreadsheet /> Générateur de Bulletin</h1>
          <div>
            <button className="print-btn" onClick={() => window.print()}><Printer /> Imprimer</button>
            <button className="pdf-btn" onClick={exportToPDF}><Download /> Télécharger PDF</button>
          </div>
        </div>

        {/* Contenu du Bulletin */}
        <div id="bulletin-content">
          {/* Header */}
          <div className="bulletin-header">
            <div className="header-left">
              <img src={cipLogo} alt="Logo CIP" />
              <span>CIP</span>
            </div>

            <div className="header-center">
              <h2 contentEditable onBlur={(e) => setHeaderInfo({...headerInfo, schoolName: e.target.innerText})}>{headerInfo.schoolName}</h2>
              <p>RÉPUBLIQUE TOGOLAISE</p>
              <p><i>Travail - Liberté - Patrie</i></p>
              <div>
                <p><b>BULLETIN DE NOTES</b></p>
                <p>{headerInfo.trimestre}</p>
              </div>
            </div>

            <div className="header-right">
              <div>
                <b>Année:</b> <span contentEditable onBlur={(e) => setHeaderInfo({...headerInfo, anneeScolaire: e.target.innerText})}>{headerInfo.anneeScolaire}</span>
              </div>
              <div>
                <b>Classe:</b> <span contentEditable onBlur={(e) => setHeaderInfo({...headerInfo, classe: e.target.innerText})}>{headerInfo.classe}</span>
              </div>
              <div>
                <b>Effectif:</b> <span contentEditable onBlur={(e) => setHeaderInfo({...headerInfo, effectif: e.target.innerText})}>{headerInfo.effectif}</span>
              </div>
              <div>
                <b>Nom & Prénoms:</b> <span contentEditable onBlur={(e) => setHeaderInfo({...headerInfo, eleveNom: e.target.innerText})}>{headerInfo.eleveNom}</span>
              </div>
              <div>
                Matricule: <span contentEditable onBlur={(e) => setHeaderInfo({...headerInfo, matricule: e.target.innerText})}>{headerInfo.matricule}</span>
              </div>
            </div>
          </div>

          {/* Tableau */}
          <table className="grades-table">
            <thead>
              <tr>
                <th rowSpan="2">Matière</th>
                <th colSpan="2">NOTES DE CLASSE</th>
                <th rowSpan="2">Moy. Classe</th>
                <th rowSpan="2">Note Compo</th>
                <th rowSpan="2">Moy. Trimestre</th>
                <th rowSpan="2">Coeff</th>
                <th rowSpan="2">Points</th>
                <th rowSpan="2">Rang</th>
                <th rowSpan="2">Appréciation</th>
                <th rowSpan="2">Nom Prof</th>
                <th rowSpan="2">Signature</th>
              </tr>
              <tr>
                <th>N1</th>
                <th>N2</th>
              </tr>
            </thead>
            <tbody>
              {rowsWithCalcs.map((row, idx) => (
                <tr key={idx}>
                  <td>{row.name}</td>
                  <td><input value={row.n1} onChange={(e) => handleSubjectChange(idx, 'n1', e.target.value)} /></td>
                  <td><input value={row.n2} onChange={(e) => handleSubjectChange(idx, 'n2', e.target.value)} /></td>
                  <td><input value={row.moyClasse} onChange={(e) => handleSubjectChange(idx, 'moyClasse', e.target.value)} /></td>
                  <td><input value={row.compo} onChange={(e) => handleSubjectChange(idx, 'compo', e.target.value)} /></td>
                  <td>{row.moyCalculee}</td>
                  <td>{row.coeff}</td>
                  <td>{row.points}</td>
                  <td><input value={row.rang} onChange={(e) => handleSubjectChange(idx, 'rang', e.target.value)} /></td>
                  <td><input value={row.appreciation} onChange={(e) => handleSubjectChange(idx, 'appreciation', e.target.value)} /></td>
                  <td>{row.prof}</td>
                  <td></td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="6">TOTAUX:</td>
                <td>{totalCoeff}</td>
                <td>{totalPoints.toFixed(2)}</td>
                <td colSpan="4">
                  MOYENNE GÉNÉRALE: <b>{moyenneGenerale}</b>/20
                </td>
              </tr>
            </tfoot>
          </table>

          {/* Pied de page */}
          <div className="footer-grid">
            <div className="footer-block">
              <div className="header">ASSIDUITÉ</div>
              <div>
                <label>Absences: <input value={footerInfo.absences} onChange={(e) => setFooterInfo({...footerInfo, absences: e.target.value})} /></label>
                <label>Retards: <input value={footerInfo.retards} onChange={(e) => setFooterInfo({...footerInfo, retards: e.target.value})} /></label>
                <label>Conduite: <input value={footerInfo.conduite} onChange={(e) => setFooterInfo({...footerInfo, conduite: e.target.value})} /></label>
              </div>
            </div>

            <div className="footer-block">
              <div className="header">CONSEIL</div>
              <div>
                <label><input type="checkbox" checked={footerInfo.tableauHonneur} onChange={() => setFooterInfo({...footerInfo, tableauHonneur: !footerInfo.tableauHonneur})}/> Tableau d'Honneur</label>
                <label><input type="checkbox" checked={footerInfo.felicitations} onChange={() => setFooterInfo({...footerInfo, felicitations: !footerInfo.felicitations})}/> Félicitations</label>
                <label><input type="checkbox" checked={footerInfo.encouragements} onChange={() => setFooterInfo({...footerInfo, encouragements: !footerInfo.encouragements})}/> Encouragements</label>
                <label><input type="checkbox" checked={footerInfo.avertissement} onChange={() => setFooterInfo({...footerInfo, avertissement: !footerInfo.avertissement})}/> Avertissement</label>
                <label><input type="checkbox" checked={footerInfo.blame} onChange={() => setFooterInfo({...footerInfo, blame: !footerInfo.blame})}/> Blâme</label>

                <div>
                  <label>DÉCISION: <input value={footerInfo.decision} onChange={(e) => setFooterInfo({...footerInfo, decision: e.target.value})} /></label>
                </div>
              </div>
            </div>
          </div>

          {/* Signatures */}
          <div className="signatures">
            <div>Parents</div>
            <div>Titulaire</div>
            <div>Directeur</div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BulletinGenerator;
