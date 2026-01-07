import React, { useState } from 'react';
import { Download, Printer } from 'lucide-react';

const BulletinGenerator = () => {
  const [data, setData] = useState({
    ministere: "MINISTERE DES ENSEIGNEMENTS\nPRIMAIRE ET SECONDAIRE",
    dre: "DRE-KARA",
    iesg: "IESG-KARA",
    etablissement: "CPL EXCELLENCE",
    devise: "TRAVAIL-RIGUEUR-REUSSITE",
    contact: "BP: KARA-TOGO | TEL:+22892586723",
    annee: "2024-2025",
    classe: "4ème",
    effectif: "27",
    statut: "Nouveaux",
    sexe: "M",
    nom: "NDODOU",
    prenoms: "Martin Aimé",
    dateNaissance: "11/07/2011",
    lieuNaissance: "KARA",
    trimestre: "PREMIER TRIMESTRE",
    subjects: [
      { name: "Français", n1: 12, n2: 10, comp: 11, moyTrim: 11.50, coef: 3, ntesDef: 34.50, rang: "88è", appr: "Passable", prof: "DOUTI" },
      { name: "Anglais", n1: 13, n2: 10, comp: 11.50, moyTrim: 14.00, coef: 2, ntesDef: 12.75, rang: "7è", appr: "Assez-bien", prof: "BOYODI" },
      { name: "Histoire Géographie", n1: 17, n2: 13, comp: 15.00, moyTrim: 13.00, coef: 2, ntesDef: 14.00, rang: "88", appr: "Bien", prof: "YATOUTI" },
      { name: "ECM", n1: 11, n2: 13, comp: 12.00, moyTrim: 16.00, coef: 2, ntesDef: 14.00, rang: "7è", appr: "Bien", prof: "YATOUTI" },
      { name: "SVT", n1: 19, n2: 15, comp: 17.00, moyTrim: 16.00, coef: 2, ntesDef: 16.50, rang: "7è", appr: "Très bien", prof: "PADJAKOMA" },
      { name: "PCT", n1: 16, n2: 13, comp: 14.50, moyTrim: 13.00, coef: 3, ntesDef: 13.75, rang: "56èx", appr: "Assez-bien", prof: "KPENLA" },
      { name: "Mathématiques", n1: 11, n2: 12, comp: 11.50, moyTrim: 10.00, coef: 3, ntesDef: 10.75, rang: "7è", appr: "Passable", prof: "PADJAKOMA" },
      { name: "EPS", n1: 14, n2: 14, comp: 14.00, moyTrim: 14.00, coef: 1, ntesDef: 14.00, rang: "168èx", appr: "Bien", prof: "DJATO" }
    ],
    moyTrim: "13,14",
    plusForte: "17,56",
    plusFaible: "7,94",
    moyMinMax: "11,79",
    rang: "7ème",
    absences: "0",
    observation: "Assez-bien",
    tableauHonneur: true,
    titulaire: "M.DOUTI",
    directeur: "M. WIYAGOUDA Bamazi",
    date: "07/05/2025",
    lieu: "KARA"
  });

  const totalCoef = data.subjects.reduce((acc, s) => acc + s.coef, 0);
  const totalNotes = data.subjects.reduce((acc, s) => acc + parseFloat(s.ntesDef), 0);

  return (
    <div style={{ minHeight: '100vh', padding: '10px', background: '#f3f4f6', fontFamily: 'Arial, sans-serif' }}>
      <style>{`
        @media print {
          .print-hidden { display: none !important; }
          body { background: white; }
          @page { size: A4; margin: 5mm; }
        }
        input, textarea { border: none; background: transparent; outline: none; }
        input:focus, textarea:focus { background: #fff3cd; }
        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button { display: none; }
      `}</style>

      <div style={{ maxWidth: '210mm', margin: '0 auto', background: '#ffc0cb', padding: '15px' }}>
        
        {/* Toolbar */}
        <div className="print-hidden" style={{ display: 'flex', gap: '10px', marginBottom: '10px', justifyContent: 'center' }}>
          <button onClick={() => window.print()} style={{ padding: '8px 15px', background: '#1d4ed8', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Printer size={16} /> Imprimer PDF
          </button>
        </div>

        {/* En-tête */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          {/* Gauche */}
          <div style={{ width: '38%', fontSize: '9px', textAlign: 'center' }}>
            <div style={{ fontWeight: 'bold' }}>
              {data.ministere.split('\n').map((line, i) => (
                <div key={i} contentEditable suppressContentEditableWarning>{line}</div>
              ))}
            </div>
            <div contentEditable suppressContentEditableWarning style={{ fontWeight: 'bold' }}>{data.dre}</div>
            <div contentEditable suppressContentEditableWarning style={{ fontWeight: 'bold' }}>{data.iesg}</div>
            <div style={{ margin: '8px auto', width: '55px', height: '55px', border: '2px solid #000', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'white' }}>🎓</div>
            <div contentEditable suppressContentEditableWarning style={{ fontWeight: 'bold', fontSize: '11px' }}>{data.etablissement}</div>
            <div contentEditable suppressContentEditableWarning style={{ fontSize: '7px' }}>{data.devise}</div>
            <div contentEditable suppressContentEditableWarning style={{ fontSize: '7px', marginTop: '3px' }}>{data.contact}</div>
          </div>

          {/* Centre */}
          <div style={{ width: '32%', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            <h2 contentEditable suppressContentEditableWarning style={{ fontSize: '10px', fontWeight: 'bold', margin: 0 }}>
              BULLETIN DE NOTES DU {data.trimestre}
            </h2>
          </div>

          {/* Droite */}
          <div style={{ width: '28%', fontSize: '9px', textAlign: 'center' }}>
            <div contentEditable suppressContentEditableWarning style={{ fontWeight: 'bold' }}>REPUBLIQUE TOGOLAISE</div>
            <div contentEditable suppressContentEditableWarning style={{ fontStyle: 'italic', fontSize: '8px' }}>Travail-Liberté-Patrie</div>
            <table style={{ width: '100%', border: '1px solid #000', marginTop: '5px', fontSize: '7px' }}>
              <tbody>
                {[
                  ['Année', data.annee],
                  ['Classe', data.classe],
                  ['Effectif', data.effectif],
                  ['Statut', data.statut],
                  ['Sexe', data.sexe]
                ].map(([label, val], i) => (
                  <tr key={i}>
                    <td style={{ border: '1px solid #000', padding: '2px', fontWeight: 'bold' }}>{label}</td>
                    <td contentEditable suppressContentEditableWarning style={{ border: '1px solid #000', padding: '2px' }}>{val}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Info Élève */}
        <table style={{ width: '100%', border: '1px solid #000', marginBottom: '8px', fontSize: '8px' }}>
          <tbody>
            <tr>
              <td style={{ border: '1px solid #000', padding: '2px', fontWeight: 'bold', width: '10%' }}>Nom:</td>
              <td contentEditable suppressContentEditableWarning style={{ border: '1px solid #000', padding: '2px', width: '40%' }}>{data.nom}</td>
              <td style={{ border: '1px solid #000', padding: '2px', fontWeight: 'bold', width: '18%' }}>Date de Naissance</td>
              <td contentEditable suppressContentEditableWarning style={{ border: '1px solid #000', padding: '2px', width: '32%' }}>{data.dateNaissance}</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #000', padding: '2px', fontWeight: 'bold' }}>Prénoms</td>
              <td contentEditable suppressContentEditableWarning style={{ border: '1px solid #000', padding: '2px' }}>{data.prenoms}</td>
              <td style={{ border: '1px solid #000', padding: '2px', fontWeight: 'bold' }}>Lieu de Naissance</td>
              <td contentEditable suppressContentEditableWarning style={{ border: '1px solid #000', padding: '2px' }}>{data.lieuNaissance}</td>
            </tr>
          </tbody>
        </table>

        {/* Tableau Notes */}
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '7px', border: '1px solid #000' }}>
          <thead style={{ background: '#d8bfd8' }}>
            <tr>
              <th rowSpan="2" style={{ border: '1px solid #000', padding: '2px' }}>MATIERES</th>
              <th colSpan="2" style={{ border: '1px solid #000', padding: '2px' }}>Ntes clas<br/>Sur 20</th>
              <th rowSpan="2" style={{ border: '1px solid #000', padding: '2px' }}>Moy cla<br/>sur 20</th>
              <th rowSpan="2" style={{ border: '1px solid #000', padding: '2px' }}>Comp<br/>Sur 20</th>
              <th rowSpan="2" style={{ border: '1px solid #000', padding: '2px' }}>Moy<br/>trim</th>
              <th rowSpan="2" style={{ border: '1px solid #000', padding: '2px' }}>Coef</th>
              <th rowSpan="2" style={{ border: '1px solid #000', padding: '2px' }}>Ntes<br/>définitives</th>
              <th rowSpan="2" style={{ border: '1px solid #000', padding: '2px' }}>Rang</th>
              <th rowSpan="2" style={{ border: '1px solid #000', padding: '2px' }}>Appréciation</th>
              <th rowSpan="2" style={{ border: '1px solid #000', padding: '2px' }}>Noms des<br/>Professeurs</th>
              <th rowSpan="2" style={{ border: '1px solid #000', padding: '2px' }}>Signature</th>
            </tr>
            <tr>
              <th style={{ border: '1px solid #000', padding: '1px' }}>1</th>
              <th style={{ border: '1px solid #000', padding: '1px' }}>2</th>
            </tr>
          </thead>
          <tbody>
            {data.subjects.map((s, i) => (
              <tr key={i}>
                <td contentEditable suppressContentEditableWarning style={{ border: '1px solid #000', padding: '2px', fontWeight: 'bold' }}>{s.name}</td>
                <td style={{ border: '1px solid #000', padding: '1px', textAlign: 'center' }}><input type="number" value={s.n1} style={{ width: '100%', textAlign: 'center' }} /></td>
                <td style={{ border: '1px solid #000', padding: '1px', textAlign: 'center' }}><input type="number" value={s.n2} style={{ width: '100%', textAlign: 'center' }} /></td>
                <td contentEditable suppressContentEditableWarning style={{ border: '1px solid #000', padding: '2px', textAlign: 'center' }}>{(s.n1 + s.n2) / 2}</td>
                <td style={{ border: '1px solid #000', padding: '1px', textAlign: 'center' }}><input type="number" value={s.comp} style={{ width: '100%', textAlign: 'center' }} /></td>
                <td contentEditable suppressContentEditableWarning style={{ border: '1px solid #000', padding: '2px', textAlign: 'center', fontWeight: 'bold' }}>{s.moyTrim}</td>
                <td contentEditable suppressContentEditableWarning style={{ border: '1px solid #000', padding: '2px', textAlign: 'center' }}>{s.coef}</td>
                <td contentEditable suppressContentEditableWarning style={{ border: '1px solid #000', padding: '2px', textAlign: 'center', fontWeight: 'bold' }}>{s.ntesDef}</td>
                <td contentEditable suppressContentEditableWarning style={{ border: '1px solid #000', padding: '2px', textAlign: 'center' }}>{s.rang}</td>
                <td contentEditable suppressContentEditableWarning style={{ border: '1px solid #000', padding: '2px', textAlign: 'center' }}>{s.appr}</td>
                <td contentEditable suppressContentEditableWarning style={{ border: '1px solid #000', padding: '2px', textAlign: 'center' }}>{s.prof}</td>
                <td style={{ border: '1px solid #000', padding: '2px' }}></td>
              </tr>
            ))}
            <tr style={{ background: '#d8bfd8', fontWeight: 'bold' }}>
              <td colSpan="6" style={{ border: '1px solid #000', padding: '2px', textAlign: 'right' }}>Totaux:</td>
              <td style={{ border: '1px solid #000', padding: '2px', textAlign: 'center' }}>{totalCoef}</td>
              <td style={{ border: '1px solid #000', padding: '2px', textAlign: 'center' }}>{totalNotes.toFixed(2)}</td>
              <td colSpan="4" style={{ border: '1px solid #000' }}></td>
            </tr>
          </tbody>
        </table>

        {/* Résultats et Décision */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '8px' }}>
          
          {/* Gauche */}
          <div>
            <div style={{ border: '1px solid #000', background: '#d8bfd8', padding: '2px', textAlign: 'center', fontSize: '8px', fontWeight: 'bold' }}>RESULTATS DE L'ELEVE</div>
            <table style={{ width: '100%', border: '1px solid #000', fontSize: '7px' }}>
              <tbody>
                <tr>
                  <td style={{ border: '1px solid #000', padding: '2px', fontWeight: 'bold' }}>Moyenne trimestrielle:</td>
                  <td contentEditable suppressContentEditableWarning style={{ border: '1px solid #000', padding: '2px' }}>{data.moyTrim}</td>
                  <td style={{ border: '1px solid #000', padding: '2px' }}>Plus forte my sr 20</td>
                  <td contentEditable suppressContentEditableWarning style={{ border: '1px solid #000', padding: '2px' }}>{data.plusForte}</td>
                </tr>
                <tr>
                  <td colSpan="2" style={{ border: '1px solid #000', padding: '2px' }}></td>
                  <td style={{ border: '1px solid #000', padding: '2px' }}>Plus faible my sr 20</td>
                  <td contentEditable suppressContentEditableWarning style={{ border: '1px solid #000', padding: '2px' }}>{data.plusFaible}</td>
                </tr>
                <tr>
                  <td style={{ border: '1px solid #000', padding: '2px', fontWeight: 'bold' }}>Rang:</td>
                  <td contentEditable suppressContentEditableWarning style={{ border: '1px solid #000', padding: '2px' }}>{data.rang}</td>
                  <td style={{ border: '1px solid #000', padding: '2px' }}>Moy min/max sr 20</td>
                  <td contentEditable suppressContentEditableWarning style={{ border: '1px solid #000', padding: '2px' }}>{data.moyMinMax}</td>
                </tr>
              </tbody>
            </table>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px', marginTop: '5px' }}>
              <div>
                <div style={{ border: '1px solid #000', padding: '2px', textAlign: 'center', fontSize: '7px', fontWeight: 'bold' }}>Nombre d'heures d'absence</div>
                <input contentEditable suppressContentEditableWarning value={data.absences} style={{ width: '100%', textAlign: 'center', border: '1px solid #000', padding: '8px' }} />
              </div>
              <div>
                <div style={{ border: '1px solid #000', padding: '2px', textAlign: 'center', fontSize: '7px', fontWeight: 'bold' }}>Observation du chef d'établissement</div>
                <div style={{ border: '1px solid #000', minHeight: '35px' }}></div>
              </div>
            </div>
          </div>

          {/* Droite */}
          <div>
            <div style={{ border: '1px solid #000', background: '#d8bfd8', padding: '2px', textAlign: 'center', fontSize: '8px', fontWeight: 'bold' }}>DECISION DU CONSEIL</div>
            <div style={{ border: '1px solid #000', padding: '5px', fontSize: '7px' }}>
              {['Félicitations', 'Encouragement', "Tableau d'honneur", 'Avertissement', 'Blâme'].map((item, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                  <span contentEditable suppressContentEditableWarning>{item}</span>
                  <input type="checkbox" checked={i === 2 && data.tableauHonneur} />
                </div>
              ))}
              
              <div style={{ border: '1px solid #000', padding: '5px', marginTop: '8px', minHeight: '40px' }}>
                <div style={{ fontSize: '7px', fontWeight: 'bold', marginBottom: '3px' }}>Décision du conseil des profs:</div>
                <div contentEditable suppressContentEditableWarning style={{ textAlign: 'center', fontSize: '12px', fontWeight: 'bold' }}>{data.observation}</div>
              </div>
            </div>

            {/* Signatures */}
            <div style={{ display: 'flex', border: '1px solid #000', marginTop: '8px', minHeight: '60px' }}>
              <div style={{ flex: 1, borderRight: '1px solid #000', padding: '3px', textAlign: 'center', fontSize: '7px' }}>
                <div style={{ fontWeight: 'bold', textDecoration: 'underline' }}>Titulaire</div>
                <div contentEditable suppressContentEditableWarning style={{ marginTop: '30px' }}>{data.titulaire}</div>
              </div>
              <div style={{ flex: 1, padding: '3px', textAlign: 'center', fontSize: '7px' }}>
                <div contentEditable suppressContentEditableWarning style={{ fontWeight: 'bold' }}>Fait à {data.lieu}, le {data.date}</div>
                <div style={{ fontWeight: 'bold', textDecoration: 'underline', margin: '3px 0' }}>LE DIRECTEUR</div>
                <div style={{ width: '50px', height: '50px', border: '1px dashed #000', borderRadius: '50%', margin: '5px auto' }}></div>
                <div contentEditable suppressContentEditableWarning style={{ marginTop: '5px' }}>{data.directeur}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ fontSize: '6px', textAlign: 'center', marginTop: '5px', fontStyle: 'italic' }}>
          Il n'est délivré qu'un seul exemplaire de bulletin en cas de perte,un duplicata pourra être fourni en tant que copie certifiée par l'autorité compétente.
        </div>
      </div>
    </div>
  );
};

export default BulletinGenerator;