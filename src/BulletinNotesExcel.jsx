import React, { useState, useEffect, useRef } from 'react';
import { Download, Printer, Save, FileSpreadsheet, User, School } from 'lucide-react';

const BulletinGenerator = () => {
  const [isClient, setIsClient] = useState(false);
  
  // Données de l'établissement et de l'élève
  const [headerInfo, setHeaderInfo] = useState({
    schoolName: "COMPLEXE SCOLAIRE EXEMPLE",
    anneeScolaire: "2025 - 2026",
    eleveNom: "NOM Prénoms",
    classe: "3ème",
    matricule: "12345",
    effectif: "45",
    trimestre: "1er Trimestre"
  });

  // Liste des matières demandées
  const [subjects, setSubjects] = useState([
    { name: "Français", n1: 12, n2: 14, moyClasse: 13, compo: 12, coeff: 3, prof: "M. DUPONT" },
    { name: "Anglais", n1: 15, n2: 13, moyClasse: 14, compo: 14, coeff: 2, prof: "Mme SMITH" },
    { name: "Histoire-Géographie", n1: 10, n2: 11, moyClasse: 10.5, compo: 11, coeff: 2, prof: "M. KOFFI" },
    { name: "ECM", n1: 14, n2: 14, moyClasse: 14, compo: 15, coeff: 1, prof: "M. KONATE" },
    { name: "SVT", n1: 11, n2: 12, moyClasse: 11.5, compo: 10, coeff: 2, prof: "Mme TOURE" },
    { name: "PCT", n1: 13, n2: 15, moyClasse: 14, compo: 13, coeff: 2, prof: "M. YAO" },
    { name: "Mathématiques", n1: 9, n2: 10, moyClasse: 9.5, compo: 11, coeff: 4, prof: "M. SOW" },
    { name: "EPS", n1: 18, n2: 18, moyClasse: 18, compo: 17, coeff: 1, prof: "M. CISSE" },
  ]);

  // Données du bas de page (Absences, Décision, etc.)
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

  useEffect(() => {
    setIsClient(true);
    // Chargement dynamique de la librairie SheetJS pour l'export Excel
    const script = document.createElement('script');
    script.src = "https://cdn.sheetjs.com/xlsx-0.19.3/package/dist/xlsx.full.min.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    }
  }, []);

  // Calculs automatiques
  const calculateRow = (subject) => {
    // Moyenne de classe (Interros) : (N1 + N2) / 2
    // La "Moyenne de classe" demandée par l'utilisateur semble être la moyenne des interros ici, 
    // ou alors la moyenne statistique de la classe ? 
    // Vu la structure "2 notes de classe, une moy de classe", je suppose (N1+N2)/2.
    // Mais souvent "Moyenne de classe" dans un bulletin signifie la moyenne générale de la classe pour comparer.
    // Pour cet outil, je vais calculer la moyenne des interros.
    
    // Logique standard: Moyenne Trimestre = (Moy Interro + Note Compo) / 2
    // Moy Interro = (N1 + N2) / 2
    
    const moyInterro = (parseFloat(subject.n1) + parseFloat(subject.n2)) / 2;
    // Si l'utilisateur veut saisir manuellement la "Moyenne de classe" (statistique), on ne la calcule pas.
    // Mais pour "Moyenne Trimestre", on fait (MoyInterro + Compo) / 2 ?
    // Ou (MoyInterro + 2*Compo) / 3 ? Cela dépend des écoles. Je vais utiliser (MoyInterro + Compo) / 2 par défaut.
    
    const moyTrimestre = ((moyInterro + parseFloat(subject.compo)) / 2).toFixed(2);
    const points = (moyTrimestre * subject.coeff).toFixed(2);
    
    return { ...subject, moyCalculee: moyTrimestre, points: points };
  };

  const rowsWithCalcs = subjects.map(calculateRow);
  
  const totalCoeff = rowsWithCalcs.reduce((acc, curr) => acc + curr.coeff, 0);
  const totalPoints = rowsWithCalcs.reduce((acc, curr) => acc + parseFloat(curr.points), 0);
  const moyenneGenerale = (totalPoints / totalCoeff).toFixed(2);

  // Fonction d'export Excel
  const exportToExcel = () => {
    if (!window.XLSX) {
      alert("La librairie Excel est en cours de chargement, veuillez réessayer dans 2 secondes.");
      return;
    }

    const wb = window.XLSX.utils.book_new();
    
    // Création manuelle des données pour respecter la mise en page
    const ws_data = [
      ["", "", "", "", "", "", "BULLETIN DE NOTES", "", "", "", ""],
      ["ANNÉE SCOLAIRE: " + headerInfo.anneeScolaire, "", "", "", "", "", "", "", "CLASSE: " + headerInfo.classe, "", ""],
      ["NOM & PRÉNOMS: " + headerInfo.eleveNom, "", "", "", "", "", "", "", "MATRICULE: " + headerInfo.matricule, "", ""],
      ["", "", "", "", "", "", "", "", "", "", ""], // Espace
      // En-têtes du tableau
      ["MATIÈRE", "NOTES DE CLASSE", "", "MOY. CLASSE", "NOTE COMPO", "MOY. TRIM", "COEFF", "RANG", "APPRÉCIATION", "NOM PROF", "SIGNATURE"],
      ["", "Note 1", "Note 2", "", "", "", "", "", "", "", ""], // Sous-titres notes
    ];

    // Ajout des matières
    rowsWithCalcs.forEach(row => {
      ws_data.push([
        row.name,
        row.n1,
        row.n2,
        row.moyClasse, // Valeur saisie ou calculée
        row.compo,
        row.moyCalculee,
        row.coeff,
        "", // Rang (à remplir)
        "", // Appréciation
        row.prof,
        ""  // Signature
      ]);
    });

    // Totals
    ws_data.push(["", "", "", "", "", "", "", "", "", "", ""]);
    ws_data.push(["TOTAUX", "", "", "", "", "Pts: " + totalPoints.toFixed(2), "Coeff: " + totalCoeff, "", "MOYENNE GÉNÉRALE:", moyenneGenerale, ""]);
    
    // Pied de page (Absences, etc.)
    ws_data.push(["", "", "", "", "", "", "", "", "", "", ""]);
    ws_data.push(["ASSIDUITÉ & CONDUITE", "", "", "DÉCISION DU CONSEIL", "", "", "", "SIGNATURES", "", "", ""]);
    ws_data.push(["Absences: " + footerInfo.absences + "h", "", "", footerInfo.decision, "", "", "", "Le Directeur:", "", "Les Parents:", ""]);
    ws_data.push(["Retards: " + footerInfo.retards, "", "", "", "", "", "", "", "", "", ""]);
    ws_data.push(["Discipline: " + footerInfo.conduite, "", "", "", "", "", "", "", "", "", ""]);

    const ws = window.XLSX.utils.aoa_to_sheet(ws_data);

    // Fusion des cellules (Merges)
    ws['!merges'] = [
      { s: { r: 0, c: 6 }, e: { r: 0, c: 8 } }, // Titre
      { s: { r: 4, c: 1 }, e: { r: 4, c: 2 } }, // Header "Notes de classe" sur 2 colonnes
      { s: { r: 4, c: 0 }, e: { r: 5, c: 0 } }, // Header "Matière" sur 2 lignes
      { s: { r: 4, c: 3 }, e: { r: 5, c: 3 } }, // Moy Classe
      { s: { r: 4, c: 4 }, e: { r: 5, c: 4 } }, // Note Compo
      { s: { r: 4, c: 5 }, e: { r: 5, c: 5 } }, // Moy Trim
      { s: { r: 4, c: 6 }, e: { r: 5, c: 6 } }, // Coeff
      { s: { r: 4, c: 7 }, e: { r: 5, c: 7 } }, // Rang
      { s: { r: 4, c: 8 }, e: { r: 5, c: 8 } }, // Appréciation
      { s: { r: 4, c: 9 }, e: { r: 5, c: 9 } }, // Nom Prof
      { s: { r: 4, c: 10 }, e: { r: 5, c: 10 } }, // Signature
    ];

    // Largeur des colonnes
    ws['!cols'] = [
      { wch: 20 }, // Matière
      { wch: 6 },  // N1
      { wch: 6 },  // N2
      { wch: 10 }, // Moy Classe
      { wch: 10 }, // Compo
      { wch: 10 }, // Moy Trim
      { wch: 6 },  // Coeff
      { wch: 6 },  // Rang
      { wch: 15 }, // Appréciation
      { wch: 15 }, // Prof
      { wch: 10 }, // Sign
    ];

    window.XLSX.utils.book_append_sheet(wb, ws, "Bulletin");
    window.XLSX.writeFile(wb, "Bulletin_Scolaire.xlsx");
  };

  const handleSubjectChange = (index, field, value) => {
    const newSubjects = [...subjects];
    newSubjects[index][field] = value;
    setSubjects(newSubjects);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 font-sans">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        
        {/* Toolbar */}
        <div className="bg-blue-900 text-white p-4 flex flex-col md:flex-row justify-between items-center gap-4 print:hidden">
          <h1 className="text-xl font-bold flex items-center gap-2">
            <FileSpreadsheet className="h-6 w-6" />
            Générateur de Bulletin
          </h1>
          <div className="flex gap-2">
            <button 
              onClick={() => window.print()}
              className="flex items-center gap-2 px-4 py-2 bg-blue-700 hover:bg-blue-600 rounded transition"
            >
              <Printer className="h-4 w-4" /> Imprimer / PDF
            </button>
            <button 
              onClick={exportToExcel}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-500 rounded transition font-bold shadow-lg"
            >
              <Download className="h-4 w-4" /> Télécharger Excel
            </button>
          </div>
        </div>

        {/* Bulletin Content */}
        <div className="p-8 print:p-0" id="bulletin-content">
          
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between mb-6 border-b-2 border-black pb-4">
            {/* Logo Area */}
            <div className="w-full md:w-1/4 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 min-h-[120px] mb-4 md:mb-0">
              <div className="text-gray-400 text-center">
                <School className="h-8 w-8 mx-auto mb-2" />
                <span className="text-xs uppercase font-bold">Emplacement Logo</span>
                <p className="text-[10px]">(Insérez votre image ici dans Excel)</p>
              </div>
            </div>

            {/* School Info */}
            <div className="w-full md:w-1/2 text-center px-4 flex flex-col justify-center">
              <h2 className="text-2xl font-bold uppercase text-blue-900 editable" contentEditable onBlur={(e) => setHeaderInfo({...headerInfo, schoolName: e.target.innerText})}>
                {headerInfo.schoolName}
              </h2>
              <p className="text-sm">RÉPUBLIQUE TOGOLAISE</p>
              <p className="text-xs italic">Travail - Liberté - Patrie</p>
              <div className="mt-2 border-t border-black pt-1 w-1/2 mx-auto">
                <p className="font-bold">BULLETIN DE NOTES</p>
                <p className="text-sm font-semibold text-gray-700">{headerInfo.trimestre}</p>
              </div>
            </div>

            {/* Student Info */}
            <div className="w-full md:w-1/4 border border-black p-3 text-sm">
              <div className="flex justify-between border-b border-gray-300 mb-1">
                <span className="font-bold">Année:</span>
                <span contentEditable>{headerInfo.anneeScolaire}</span>
              </div>
              <div className="flex justify-between border-b border-gray-300 mb-1">
                <span className="font-bold">Classe:</span>
                <span contentEditable>{headerInfo.classe}</span>
              </div>
              <div className="flex justify-between border-b border-gray-300 mb-1">
                <span className="font-bold">Effectif:</span>
                <span contentEditable>{headerInfo.effectif}</span>
              </div>
              <div className="mt-2">
                <span className="font-bold block">Nom & Prénoms:</span>
                <div className="text-lg font-bold text-blue-900 uppercase" contentEditable>{headerInfo.eleveNom}</div>
              </div>
              <div className="mt-1 text-xs text-gray-500">
                Matricule: <span contentEditable>{headerInfo.matricule}</span>
              </div>
            </div>
          </div>

          {/* Grades Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-black text-xs md:text-sm text-center">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-black p-1 w-1/6" rowSpan="2">MATIÈRE</th>
                  <th className="border border-black p-1" colSpan="2">NOTES DE CLASSE</th>
                  <th className="border border-black p-1 w-16" rowSpan="2">MOY.<br/>CLASSE</th>
                  <th className="border border-black p-1 w-16" rowSpan="2">NOTE<br/>COMPO</th>
                  <th className="border border-black p-1 w-16" rowSpan="2">MOY.<br/>TRIM</th>
                  <th className="border border-black p-1 w-10" rowSpan="2">COEFF</th>
                  <th className="border border-black p-1 w-16" rowSpan="2">POINTS<br/>(M*C)</th>
                  <th className="border border-black p-1 w-10" rowSpan="2">RANG</th>
                  <th className="border border-black p-1 w-1/6" rowSpan="2">APPRÉCIATION</th>
                  <th className="border border-black p-1 w-24" rowSpan="2">NOM PROF</th>
                  <th className="border border-black p-1 w-16" rowSpan="2">SIGNATURE</th>
                </tr>
                <tr className="bg-gray-200">
                  <th className="border border-black p-1 w-10 text-[10px]">N1</th>
                  <th className="border border-black p-1 w-10 text-[10px]">N2</th>
                </tr>
              </thead>
              <tbody>
                {rowsWithCalcs.map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="border border-black p-2 font-bold text-left">{row.name}</td>
                    <td className="border border-black p-0">
                      <input className="w-full text-center p-1 bg-transparent" value={row.n1} onChange={(e) => handleSubjectChange(idx, 'n1', e.target.value)} />
                    </td>
                    <td className="border border-black p-0">
                      <input className="w-full text-center p-1 bg-transparent" value={row.n2} onChange={(e) => handleSubjectChange(idx, 'n2', e.target.value)} />
                    </td>
                    <td className="border border-black p-0 bg-gray-50">
                      <input className="w-full text-center p-1 bg-transparent font-medium" value={row.moyClasse} onChange={(e) => handleSubjectChange(idx, 'moyClasse', e.target.value)} />
                    </td>
                    <td className="border border-black p-0">
                      <input className="w-full text-center p-1 bg-transparent font-bold text-blue-700" value={row.compo} onChange={(e) => handleSubjectChange(idx, 'compo', e.target.value)} />
                    </td>
                    <td className="border border-black p-1 font-bold bg-blue-50">{row.moyCalculee}</td>
                    <td className="border border-black p-1">{row.coeff}</td>
                    <td className="border border-black p-1 font-medium bg-gray-100">{row.points}</td>
                    <td className="border border-black p-0">
                      <input className="w-full text-center p-1 bg-transparent" placeholder="-" />
                    </td>
                    <td className="border border-black p-0">
                      <input className="w-full text-center p-1 text-xs italic bg-transparent" placeholder="Bien" />
                    </td>
                    <td className="border border-black p-1 text-[10px]">{row.prof}</td>
                    <td className="border border-black p-1"></td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-blue-900 text-white font-bold">
                  <td className="border border-black p-2 text-right" colSpan="6">TOTAUX:</td>
                  <td className="border border-black p-2">{totalCoeff}</td>
                  <td className="border border-black p-2">{totalPoints.toFixed(2)}</td>
                  <td className="border border-black p-2 bg-white text-black text-left" colSpan="4">
                    <span className="text-xs font-normal mr-2">MOYENNE GÉNÉRALE:</span>
                    <span className="text-lg font-extrabold text-red-600">{moyenneGenerale}</span>
                    <span className="text-xs font-normal ml-1">/ 20</span>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Bottom Section (Le tralala) */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Absences & Discipline */}
            <div className="border border-black p-0">
              <div className="bg-gray-200 border-b border-black p-1 font-bold text-center text-xs">ASSIDUITÉ & CONDUITE</div>
              <div className="p-2 text-sm grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs text-gray-500">Absences (heures):</label>
                  <input className="border-b border-gray-400 w-full" value={footerInfo.absences} onChange={(e) => setFooterInfo({...footerInfo, absences: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs text-gray-500">Retards:</label>
                  <input className="border-b border-gray-400 w-full" value={footerInfo.retards} onChange={(e) => setFooterInfo({...footerInfo, retards: e.target.value})} />
                </div>
                <div className="col-span-2 mt-2">
                  <label className="block text-xs text-gray-500">Appréciation Conduite:</label>
                  <input className="border-b border-gray-400 w-full text-blue-800 font-medium" value={footerInfo.conduite} onChange={(e) => setFooterInfo({...footerInfo, conduite: e.target.value})} />
                </div>
              </div>
            </div>

            {/* Décision du Conseil */}
            <div className="border border-black p-0">
              <div className="bg-gray-200 border-b border-black p-1 font-bold text-center text-xs">DÉCISION DU CONSEIL</div>
              <div className="p-2">
                <div className="flex flex-wrap gap-2 text-xs mb-2">
                  <label className="flex items-center gap-1"><input type="checkbox" checked={footerInfo.tableauHonneur} onChange={() => setFooterInfo({...footerInfo, tableauHonneur: !footerInfo.tableauHonneur})} /> T. Honneur</label>
                  <label className="flex items-center gap-1"><input type="checkbox" checked={footerInfo.encouragements} onChange={() => setFooterInfo({...footerInfo, encouragements: !footerInfo.encouragements})} /> Encouragements</label>
                  <label className="flex items-center gap-1"><input type="checkbox" checked={footerInfo.felicitations} onChange={() => setFooterInfo({...footerInfo, felicitations: !footerInfo.felicitations})} /> Félicitations</label>
                  <label className="flex items-center gap-1"><input type="checkbox" checked={footerInfo.avertissement} onChange={() => setFooterInfo({...footerInfo, avertissement: !footerInfo.avertissement})} /> Avertissement</label>
                  <label className="flex items-center gap-1"><input type="checkbox" checked={footerInfo.blame} onChange={() => setFooterInfo({...footerInfo, blame: !footerInfo.blame})} /> Blâme</label>
                </div>
                <div className="mt-3">
                   <label className="block text-xs font-bold">DÉCISION:</label>
                   <input className="w-full p-2 border border-gray-300 rounded bg-green-50 text-green-800 font-bold" value={footerInfo.decision} onChange={(e) => setFooterInfo({...footerInfo, decision: e.target.value})} />
                </div>
              </div>
            </div>

            {/* Signatures */}
            <div className="col-span-1 md:col-span-2 border border-black p-2 flex justify-between h-32">
              <div className="w-1/3 text-center">
                 <p className="text-xs underline font-bold mb-8">Signature des Parents</p>
              </div>
              <div className="w-1/3 text-center">
                 <p className="text-xs underline font-bold mb-8">Le Professeur Titulaire</p>
              </div>
              <div className="w-1/3 text-center">
                 <p className="text-xs underline font-bold mb-8">Le Directeur (Cachet)</p>
                 <div className="text-[10px] text-gray-400 mt-8">(Place pour signature)</div>
              </div>
            </div>

          </div>
          
        </div>
      </div>
    </div>
  );
};

export default BulletinGenerator;