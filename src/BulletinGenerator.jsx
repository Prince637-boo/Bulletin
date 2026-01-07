import React, { useState } from 'react';
import { Download, Printer, FileSpreadsheet } from 'lucide-react';

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

  const handleSubjectChange = (index, field, value) => {
    const newSubjects = [...subjects];
    newSubjects[index][field] = value;
    setSubjects(newSubjects);
  };

  const downloadPDF = () => {
    window.print();
  };

  return (
    <div style={{ minHeight: '100vh', padding: '20px', backgroundColor: '#f3f4f6', fontFamily: 'Arial, sans-serif' }}>
      <style>{`
        @media print {
          .print-hidden { display: none !important; }
          body { margin: 0; padding: 0; }
          @page { size: A4; margin: 0.5cm; }
        }
        .grades-table { page-break-inside: avoid; }
        input[type="text"], input[type="number"] {
          border: 1px solid #d1d5db;
          padding: 2px 4px;
          width: 100%;
          box-sizing: border-box;
        }
        /* Masquer les flèches des inputs number */
        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input[type="number"] {
          -moz-appearance: textfield;
        }
      `}</style>

      <div style={{ maxWidth: '1200px', margin: '0 auto', background: 'white', boxShadow: '0 5px 15px rgba(0,0,0,0.2)', borderRadius: '12px', overflow: 'hidden' }}>
        
        {/* Toolbar */}
        <div className="print-hidden" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#1e3a8a', color: 'white', padding: '15px' }}>
          <h1 style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.2rem', margin: 0 }}>
            <FileSpreadsheet /> Générateur de Bulletin
          </h1>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={() => window.print()} style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '8px 15px', border: 'none', borderRadius: '5px', cursor: 'pointer', backgroundColor: '#1d4ed8', color: 'white' }}>
              <Printer size={18} /> Imprimer
            </button>
            <button onClick={downloadPDF} style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '8px 15px', border: 'none', borderRadius: '5px', cursor: 'pointer', backgroundColor: '#16a34a', color: 'white', fontWeight: 'bold' }}>
              <Download size={18} /> Télécharger PDF
            </button>
          </div>
        </div>

        {/* Contenu du Bulletin */}
        <div id="bulletin-content" style={{ padding: '30px' }}>
          
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid black', paddingBottom: '10px', marginBottom: '20px' }}>
            
            {/* Logo */}
            <div style={{ width: '30%', border: '2px dashed #d1d5db', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '120px', padding: '10px' }}>
              <div style={{ width: '64px', height: '64px', backgroundColor: '#e5e7eb', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '5px' }}>
                <span style={{ fontSize: '24px', fontWeight: 'bold' }}>🏫</span>
              </div>
              <span style={{ fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase' }}>LOGO</span>
            </div>

            {/* Centre - École */}
            <div style={{ width: '30%', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h2 contentEditable suppressContentEditableWarning onBlur={(e) => setHeaderInfo({...headerInfo, schoolName: e.target.innerText})} style={{ fontSize: '20px', fontWeight: 'bold', textTransform: 'uppercase', color: '#1e3a8a', margin: '5px 0' }}>
                {headerInfo.schoolName}
              </h2>
              <p style={{ margin: '2px 0', fontSize: '12px' }}>RÉPUBLIQUE TOGOLAISE</p>
              <p style={{ margin: '2px 0', fontSize: '11px', fontStyle: 'italic' }}>Travail - Liberté - Patrie</p>
              <div style={{ marginTop: '5px', borderTop: '1px solid black', paddingTop: '3px' }}>
                <p style={{ margin: '2px 0', fontWeight: 'bold' }}>BULLETIN DE NOTES</p>
                <p style={{ margin: '2px 0', fontSize: '12px' }}>{headerInfo.trimestre}</p>
              </div>
            </div>

            {/* Droite - Élève */}
            <div style={{ width: '30%', border: '1px solid black', padding: '10px', fontSize: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #d1d5db', marginBottom: '5px', paddingBottom: '2px' }}>
                <b>Année:</b>
                <span contentEditable suppressContentEditableWarning onBlur={(e) => setHeaderInfo({...headerInfo, anneeScolaire: e.target.innerText})}>{headerInfo.anneeScolaire}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #d1d5db', marginBottom: '5px', paddingBottom: '2px' }}>
                <b>Classe:</b>
                <span contentEditable suppressContentEditableWarning onBlur={(e) => setHeaderInfo({...headerInfo, classe: e.target.innerText})}>{headerInfo.classe}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #d1d5db', marginBottom: '5px', paddingBottom: '2px' }}>
                <b>Effectif:</b>
                <span contentEditable suppressContentEditableWarning onBlur={(e) => setHeaderInfo({...headerInfo, effectif: e.target.innerText})}>{headerInfo.effectif}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #d1d5db', marginBottom: '5px', paddingBottom: '2px' }}>
                <b>Nom & Prénoms:</b>
                <span contentEditable suppressContentEditableWarning onBlur={(e) => setHeaderInfo({...headerInfo, eleveNom: e.target.innerText})}>{headerInfo.eleveNom}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                Matricule:
                <span contentEditable suppressContentEditableWarning onBlur={(e) => setHeaderInfo({...headerInfo, matricule: e.target.innerText})}>{headerInfo.matricule}</span>
              </div>
            </div>
          </div>

          {/* Tableau */}
          <table className="grades-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px', textAlign: 'center' }}>
            <thead>
              <tr style={{ backgroundColor: '#e5e7eb' }}>
                <th rowSpan="2" style={{ border: '1px solid black', padding: '4px' }}>Matière</th>
                <th colSpan="2" style={{ border: '1px solid black', padding: '4px' }}>NOTES DE CLASSE</th>
                <th rowSpan="2" style={{ border: '1px solid black', padding: '4px' }}>Moy. Classe</th>
                <th rowSpan="2" style={{ border: '1px solid black', padding: '4px' }}>Note Compo</th>
                <th rowSpan="2" style={{ border: '1px solid black', padding: '4px' }}>Moy. Trim.</th>
                <th rowSpan="2" style={{ border: '1px solid black', padding: '4px' }}>Coeff</th>
                <th rowSpan="2" style={{ border: '1px solid black', padding: '4px' }}>Points</th>
                <th rowSpan="2" style={{ border: '1px solid black', padding: '4px' }}>Rang</th>
                <th rowSpan="2" style={{ border: '1px solid black', padding: '4px' }}>Appréciation</th>
                <th rowSpan="2" style={{ border: '1px solid black', padding: '4px' }}>Nom Prof</th>
                <th rowSpan="2" style={{ border: '1px solid black', padding: '4px' }}>Signature</th>
              </tr>
              <tr style={{ backgroundColor: '#e5e7eb' }}>
                <th style={{ border: '1px solid black', padding: '4px' }}>N1</th>
                <th style={{ border: '1px solid black', padding: '4px' }}>N2</th>
              </tr>
            </thead>
            <tbody>
              {rowsWithCalcs.map((row, idx) => (
                <tr key={idx}>
                  <td style={{ border: '1px solid black', padding: '4px', textAlign: 'left' }}>{row.name}</td>
                  <td style={{ border: '1px solid black', padding: '2px' }}>
                    <input type="number" value={row.n1} onChange={(e) => handleSubjectChange(idx, 'n1', e.target.value)} style={{ width: '100%', textAlign: 'center' }} />
                  </td>
                  <td style={{ border: '1px solid black', padding: '2px' }}>
                    <input type="number" value={row.n2} onChange={(e) => handleSubjectChange(idx, 'n2', e.target.value)} style={{ width: '100%', textAlign: 'center' }} />
                  </td>
                  <td style={{ border: '1px solid black', padding: '2px' }}>
                    <input type="number" value={row.moyClasse} onChange={(e) => handleSubjectChange(idx, 'moyClasse', e.target.value)} style={{ width: '100%', textAlign: 'center' }} />
                  </td>
                  <td style={{ border: '1px solid black', padding: '2px' }}>
                    <input type="number" value={row.compo} onChange={(e) => handleSubjectChange(idx, 'compo', e.target.value)} style={{ width: '100%', textAlign: 'center' }} />
                  </td>
                  <td style={{ border: '1px solid black', padding: '4px', fontWeight: 'bold' }}>{row.moyCalculee}</td>
                  <td style={{ border: '1px solid black', padding: '4px' }}>{row.coeff}</td>
                  <td style={{ border: '1px solid black', padding: '4px', fontWeight: 'bold' }}>{row.points}</td>
                  <td style={{ border: '1px solid black', padding: '2px' }}>
                    <input type="text" value={row.rang} onChange={(e) => handleSubjectChange(idx, 'rang', e.target.value)} style={{ width: '100%', textAlign: 'center' }} />
                  </td>
                  <td style={{ border: '1px solid black', padding: '2px' }}>
                    <input type="text" value={row.appreciation} onChange={(e) => handleSubjectChange(idx, 'appreciation', e.target.value)} style={{ width: '100%', textAlign: 'center' }} />
                  </td>
                  <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px' }}>{row.prof}</td>
                  <td style={{ border: '1px solid black', padding: '4px' }}></td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr style={{ backgroundColor: '#1e3a8a', color: 'white', fontWeight: 'bold' }}>
                <td colSpan="6" style={{ border: '1px solid black', padding: '4px', textAlign: 'right' }}>TOTAUX:</td>
                <td style={{ border: '1px solid black', padding: '4px' }}>{totalCoeff}</td>
                <td style={{ border: '1px solid black', padding: '4px' }}>{totalPoints.toFixed(2)}</td>
                <td colSpan="4" style={{ border: '1px solid black', padding: '4px' }}>
                  MOYENNE GÉNÉRALE: <b>{moyenneGenerale}/20</b>
                </td>
              </tr>
            </tfoot>
          </table>

          {/* Pied de page */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', marginTop: '20px' }}>
            
            {/* Assiduité */}
            <div style={{ border: '1px solid black' }}>
              <div style={{ backgroundColor: '#e5e7eb', borderBottom: '1px solid black', textAlign: 'center', fontSize: '12px', fontWeight: 'bold', padding: '3px' }}>
                ASSIDUITÉ
              </div>
              <div style={{ padding: '10px' }}>
                <div style={{ marginBottom: '5px' }}>
                  <label>Absences: <input type="text" value={footerInfo.absences} onChange={(e) => setFooterInfo({...footerInfo, absences: e.target.value})} style={{ width: '50px' }} /></label>
                </div>
                <div style={{ marginBottom: '5px' }}>
                  <label>Retards: <input type="text" value={footerInfo.retards} onChange={(e) => setFooterInfo({...footerInfo, retards: e.target.value})} style={{ width: '50px' }} /></label>
                </div>
                <div>
                  <label>Conduite: <input type="text" value={footerInfo.conduite} onChange={(e) => setFooterInfo({...footerInfo, conduite: e.target.value})} style={{ width: '100px' }} /></label>
                </div>
              </div>
            </div>

            {/* Conseil */}
            <div style={{ border: '1px solid black' }}>
              <div style={{ backgroundColor: '#e5e7eb', borderBottom: '1px solid black', textAlign: 'center', fontSize: '12px', fontWeight: 'bold', padding: '3px' }}>
                CONSEIL
              </div>
              <div style={{ padding: '10px', fontSize: '12px' }}>
                <div><label><input type="checkbox" checked={footerInfo.tableauHonneur} onChange={() => setFooterInfo({...footerInfo, tableauHonneur: !footerInfo.tableauHonneur})} /> Tableau d'Honneur</label></div>
                <div><label><input type="checkbox" checked={footerInfo.felicitations} onChange={() => setFooterInfo({...footerInfo, felicitations: !footerInfo.felicitations})} /> Félicitations</label></div>
                <div><label><input type="checkbox" checked={footerInfo.encouragements} onChange={() => setFooterInfo({...footerInfo, encouragements: !footerInfo.encouragements})} /> Encouragements</label></div>
                <div><label><input type="checkbox" checked={footerInfo.avertissement} onChange={() => setFooterInfo({...footerInfo, avertissement: !footerInfo.avertissement})} /> Avertissement</label></div>
                <div><label><input type="checkbox" checked={footerInfo.blame} onChange={() => setFooterInfo({...footerInfo, blame: !footerInfo.blame})} /> Blâme</label></div>
                <div style={{ marginTop: '10px' }}>
                  <label><b>DÉCISION:</b> <input type="text" value={footerInfo.decision} onChange={(e) => setFooterInfo({...footerInfo, decision: e.target.value})} style={{ width: '100%' }} /></label>
                </div>
              </div>
            </div>
          </div>

          {/* Signatures */}
          <div style={{ display: 'flex', justifyContent: 'space-between', border: '1px solid black', marginTop: '10px', height: '100px' }}>
            <div style={{ width: '30%', textAlign: 'center', textDecoration: 'underline', fontWeight: 'bold', paddingTop: '10px' }}>Parents</div>
            <div style={{ width: '30%', textAlign: 'center', textDecoration: 'underline', fontWeight: 'bold', paddingTop: '10px' }}>Titulaire</div>
            <div style={{ width: '30%', textAlign: 'center', textDecoration: 'underline', fontWeight: 'bold', paddingTop: '10px' }}>Directeur</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulletinGenerator;