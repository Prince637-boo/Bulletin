import React, { useState } from "react";
import { Printer } from "lucide-react";
import CIP from "./assets/CIP.jpg";

const BulletinGenerator = () => {
  const [data, setData] = useState({
    ministere: "MINISTERE DES ENSEIGNEMENTS\nPRIMAIRE ET SECONDAIRE",
    dre: "DRE-KARA",
    iesg: "IESG-KARA",
    etablissement: "CPL EXCELLENCE",
    devise: "TRAVAIL-RIGUEUR-REUSSITE",
    contact: "BP: KARA-TOGO | TEL:+22892586723",
    annee: "2025-2026",
    classe: "",
    effectif: "",
    statut: "",
    sexe: "",
    nom: "",
    prenoms: "",
    dateNaissance: "",
    lieuNaissance: "",
    trimestre: "PREMIER TRIMESTRE",
    subjects: [
      {
        name: "Français",
        n1: "",
        n2: "",
        comp: "",
        coef: 3,
        rang: "",
        appr: "",
        prof: "",
      },
      {
        name: "Anglais",
        n1: "",
        n2: "",
        comp: "",
        coef: 2,
        rang: "",
        appr: "",
        prof: "",
      },
      {
        name: "Histoire Géographie",
        n1: "",
        n2: "",
        comp: "",
        coef: 2,
        rang: "",
        appr: "",
        prof: "",
      },
      {
        name: "ECM",
        n1: "",
        n2: "",
        comp: "",
        coef: 2,
        rang: "",
        appr: "",
        prof: "",
      },
      {
        name: "SVT",
        n1: "",
        n2: "",
        comp: "",
        coef: 2,
        rang: "",
        appr: "",
        prof: "",
      },
      {
        name: "PCT",
        n1: "",
        n2: "",
        comp: "",
        coef: 3,
        rang: "",
        appr: "",
        prof: "",
      },
      {
        name: "Mathématiques",
        n1: "",
        n2: "",
        comp: "",
        coef: 3,
        rang: "",
        appr: "",
        prof: "",
      },
      {
        name: "EPS",
        n1: "",
        n2: "",
        comp: "",
        coef: 1,
        rang: "",
        appr: "",
        prof: "",
      },
    ],
    plusForte: "",
    plusFaible: "",
    moyMinMax: "",
    rang: "",
    absences: "00",
    observation: "",
    tableauHonneur: true,
    titulaire: "M.DOUTI",
    directeur: "M. WIYAGOUDA Bamazi",
    date: "",
    lieu: "Kara",
  });

  const updateSubject = (index, field, value) => {
    const newSubjects = [...data.subjects];
    newSubjects[index] = { ...newSubjects[index], [field]: value };
    setData({ ...data, subjects: newSubjects });
  };

  // --- CALCULS AUTOMATIQUES ---
  const processedSubjects = data.subjects.map((s) => {
    const n1 = parseFloat(s.n1);
    const n2 = parseFloat(s.n2);
    const comp = parseFloat(s.comp);

    const hasN1 = !isNaN(n1);
    const hasN2 = !isNaN(n2);
    const hasComp = !isNaN(comp);

    let moyCla = "";
    if (hasN1 && hasN2) moyCla = ((n1 + n2) / 2).toFixed(2);
    else if (hasN1) moyCla = n1.toFixed(2);
    else if (hasN2) moyCla = n2.toFixed(2);

    let maxNoteClasse = 0;
    if (hasN1 && hasN2) maxNoteClasse = Math.max(n1, n2);
    else if (hasN1) maxNoteClasse = n1;
    else if (hasN2) maxNoteClasse = n2;

    let moyTrimVal = 0;
    let ntesDefVal = 0;
    let moyTrimDisplay = "";
    let ntesDefDisplay = "";

    if ((hasN1 || hasN2) && hasComp) {
      moyTrimVal = (maxNoteClasse + comp) / 2;
      ntesDefVal = moyTrimVal * s.coef;

      moyTrimDisplay = moyTrimVal.toFixed(2);
      ntesDefDisplay = ntesDefVal.toFixed(2);
    }

    return {
      ...s,
      moyClaDisplay: moyCla,
      moyTrimDisplay,
      ntesDefDisplay,
      rawNtesDef: ntesDefVal,
    };
  });

  const totalCoef = processedSubjects.reduce((acc, s) => acc + s.coef, 0);
  const totalNotes = processedSubjects.reduce(
    (acc, s) => acc + s.rawNtesDef,
    0
  );

  const moyenneGenerale =
    totalCoef > 0 ? (totalNotes / totalCoef).toFixed(2) : "";

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "10px",
        background: "#f3f4f6",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <style>{`
        @media print {
          .print-hidden { display: none !important; }
          body { background: white; }
          @page { size: A4; margin: 0; }
        }
        input, textarea { border: none; background: transparent; outline: none; }
        input:focus, textarea:focus { background: #fff3cd; }
        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button { 
          -webkit-appearance: none;
          margin: 0;
        }
        input[type="number"] {
          -moz-appearance: textfield;
        }
      `}</style>

      <div
        style={{
          maxWidth: "210mm",
          margin: "0 auto",
          background: "white",
          padding: "10mm",
          minHeight: "297mm",
          boxSizing: "border-box",
        }}
      >
        {/* Toolbar */}
        <div
          className="print-hidden"
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "10px",
            justifyContent: "center",
          }}
        >
          <button
            onClick={() => window.print()}
            style={{
              padding: "8px 15px",
              background: "#1d4ed8",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <Printer size={16} /> Imprimer PDF
          </button>
        </div>

        {/* En-tête */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px",
            alignItems: "flex-start",
          }}
        >
          {/* Gauche */}
          <div style={{ width: "35%", fontSize: "11px", textAlign: "center", fontWeight: "bold" }}>
            <div>MINISTERE DES ENSEIGNEMENTS</div>
            <div>PRIMAIRE ET SECONDAIRE</div>
            <div style={{ marginTop: "4px" }}>DRE-KARA</div>
            <div>IESG-KARA</div>
            <div
              style={{
                margin: "10px auto",
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                border: "2px solid #ffffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              <img
                src={CIP}
                alt="Logo"
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </div>
            <div style={{ fontSize: "13px", fontWeight: "bold" }}>CPL EXCELLENCE</div>
            <div style={{ fontSize: "9px", marginTop: "2px" }}>TRAVAIL-RIGUEUR-REUSSITE</div>
            <div style={{ fontSize: "9px", marginTop: "2px" }}>BP: KARA-TOGO</div>
            <div style={{ fontSize: "9px" }}>TEL:+22892586723</div>
          </div>

          {/* Centre */}
          <div
            style={{
              width: "30%",
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h2 style={{ fontSize: "13px", fontWeight: "bold", margin: 0, textDecoration: "underline" }}>
              BULLETIN DE NOTES DU PREMIER TRIMESTRE
            </h2>
          </div>

          {/* Droite */}
          <div style={{ width: "35%", fontSize: "11px", textAlign: "center" }}>
            <div style={{ fontWeight: "bold" }}>REPUBLIQUE TOGOLAISE</div>
            <div style={{ fontStyle: "italic", fontSize: "10px", marginTop: "2px" }}>
              Travail-Liberté-Patrie
            </div>
            <table
              style={{
                width: "100%",
                border: "2px solid #000",
                marginTop: "10px",
                fontSize: "10px",
                borderCollapse: "collapse",
              }}
            >
              <tbody>
                <tr>
                  <td
                    style={{
                      border: "1px solid #000",
                      padding: "4px",
                      fontWeight: "bold",
                      background: "#f0f0f0",
                    }}
                  >
                    Année
                  </td>
                  <td
                    contentEditable
                    suppressContentEditableWarning
                    style={{ border: "1px solid #000", padding: "4px", textAlign: "center" }}
                  >
                    {data.annee}
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      border: "1px solid #000",
                      padding: "4px",
                      fontWeight: "bold",
                      background: "#f0f0f0",
                    }}
                  >
                    Classe
                  </td>
                  <td
                    contentEditable
                    suppressContentEditableWarning
                    style={{ border: "1px solid #000", padding: "4px", textAlign: "center" }}
                  >
                    {data.classe}
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      border: "1px solid #000",
                      padding: "4px",
                      fontWeight: "bold",
                      background: "#f0f0f0",
                    }}
                  >
                    Effectif
                  </td>
                  <td
                    contentEditable
                    suppressContentEditableWarning
                    style={{ border: "1px solid #000", padding: "4px", textAlign: "center" }}
                  >
                    {data.effectif}
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      border: "1px solid #000",
                      padding: "4px",
                      fontWeight: "bold",
                      background: "#f0f0f0",
                    }}
                  >
                    Statut
                  </td>
                  <td
                    contentEditable
                    suppressContentEditableWarning
                    style={{ border: "1px solid #000", padding: "4px", textAlign: "center" }}
                  >
                    {data.statut}
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      border: "1px solid #000",
                      padding: "4px",
                      fontWeight: "bold",
                      background: "#f0f0f0",
                    }}
                  >
                    Sexe
                  </td>
                  <td
                    contentEditable
                    suppressContentEditableWarning
                    style={{ border: "1px solid #000", padding: "4px", textAlign: "center" }}
                  >
                    {data.sexe}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Info Élève */}
        <table
          style={{
            width: "100%",
            border: "2px solid #000",
            marginBottom: "10px",
            fontSize: "11px",
            borderCollapse: "collapse",
          }}
        >
          <tbody>
            <tr>
              <td
                style={{
                  border: "1px solid #000",
                  padding: "5px",
                  fontWeight: "bold",
                  width: "10%",
                  background: "#f0f0f0",
                }}
              >
                Nom:
              </td>
              <td
                contentEditable
                suppressContentEditableWarning
                style={{
                  border: "1px solid #000",
                  padding: "5px",
                  width: "38%",
                  textAlign: "center",
                }}
              >
                {data.nom}
              </td>
              <td
                style={{
                  border: "1px solid #000",
                  padding: "5px",
                  fontWeight: "bold",
                  width: "20%",
                  background: "#f0f0f0",
                }}
              >
                Date de Naissance
              </td>
              <td
                contentEditable
                suppressContentEditableWarning
                style={{
                  border: "1px solid #000",
                  padding: "5px",
                  width: "32%",
                  textAlign: "center",
                }}
              >
                {data.dateNaissance}
              </td>
            </tr>
            <tr>
              <td
                style={{
                  border: "1px solid #000",
                  padding: "5px",
                  fontWeight: "bold",
                  background: "#f0f0f0",
                }}
              >
                Prénoms
              </td>
              <td
                contentEditable
                suppressContentEditableWarning
                style={{ border: "1px solid #000", padding: "5px", textAlign: "center" }}
              >
                {data.prenoms}
              </td>
              <td
                style={{
                  border: "1px solid #000",
                  padding: "5px",
                  fontWeight: "bold",
                  background: "#f0f0f0",
                }}
              >
                Lieu de Naissance
              </td>
              <td
                contentEditable
                suppressContentEditableWarning
                style={{ border: "1px solid #000", padding: "5px", textAlign: "center" }}
              >
                {data.lieuNaissance}
              </td>
            </tr>
          </tbody>
        </table>

        {/* Tableau Notes */}
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "10px",
            border: "2px solid #000",
          }}
        >
          <thead>
            <tr style={{ background: "#f0f0f0" }}>
              <th
                rowSpan="2"
                style={{ border: "1px solid #000", padding: "5px", fontWeight: "bold" }}
              >
                MATIERES
              </th>
              <th
                colSpan="2"
                style={{ border: "1px solid #000", padding: "5px", fontWeight: "bold" }}
              >
                Ntes clas<br />Sur 20
              </th>
              <th
                rowSpan="2"
                style={{ border: "1px solid #000", padding: "5px", fontWeight: "bold" }}
              >
                Moy cla<br />sur 20
              </th>
              <th
                rowSpan="2"
                style={{ border: "1px solid #000", padding: "5px", fontWeight: "bold" }}
              >
                Comp<br />Sur 20
              </th>
              <th
                rowSpan="2"
                style={{ border: "1px solid #000", padding: "5px", fontWeight: "bold" }}
              >
                Moy<br />trim
              </th>
              <th
                rowSpan="2"
                style={{ border: "1px solid #000", padding: "5px", fontWeight: "bold" }}
              >
                Coef
              </th>
              <th
                rowSpan="2"
                style={{ border: "1px solid #000", padding: "5px", fontWeight: "bold" }}
              >
                Ntes<br />définitives
              </th>
              <th
                rowSpan="2"
                style={{ border: "1px solid #000", padding: "5px", fontWeight: "bold" }}
              >
                Rang
              </th>
              <th
                rowSpan="2"
                style={{ border: "1px solid #000", padding: "5px", fontWeight: "bold" }}
              >
                Appréciation<br />des professeurs
              </th>
              <th
                rowSpan="2"
                style={{ border: "1px solid #000", padding: "5px", fontWeight: "bold" }}
              >
                Noms des<br />Professeurs
              </th>
              <th
                rowSpan="2"
                style={{ border: "1px solid #000", padding: "5px", fontWeight: "bold" }}
              >
                Signature
              </th>
            </tr>
            <tr style={{ background: "#f0f0f0" }}>
              <th style={{ border: "1px solid #000", padding: "3px", fontWeight: "bold" }}>1</th>
              <th style={{ border: "1px solid #000", padding: "3px", fontWeight: "bold" }}>2</th>
            </tr>
          </thead>
          <tbody>
            {processedSubjects.map((s, i) => (
              <tr key={i}>
                <td
                  contentEditable
                  suppressContentEditableWarning
                  style={{
                    border: "1px solid #000",
                    padding: "5px",
                    fontWeight: "bold",
                  }}
                >
                  {s.name}
                </td>
                <td
                  style={{
                    border: "1px solid #000",
                    padding: "3px",
                    textAlign: "center",
                  }}
                >
                  <input
                    type="number"
                    value={s.n1}
                    onChange={(e) => updateSubject(i, "n1", e.target.value)}
                    style={{ width: "100%", textAlign: "center", fontSize: "10px" }}
                  />
                </td>
                <td
                  style={{
                    border: "1px solid #000",
                    padding: "3px",
                    textAlign: "center",
                  }}
                >
                  <input
                    type="number"
                    value={s.n2}
                    onChange={(e) => updateSubject(i, "n2", e.target.value)}
                    style={{ width: "100%", textAlign: "center", fontSize: "10px" }}
                  />
                </td>
                <td
                  style={{
                    border: "1px solid #000",
                    padding: "5px",
                    textAlign: "center",
                    background: "#fafafa",
                    fontWeight: "bold",
                  }}
                >
                  {s.moyClaDisplay}
                </td>
                <td
                  style={{
                    border: "1px solid #000",
                    padding: "3px",
                    textAlign: "center",
                  }}
                >
                  <input
                    type="number"
                    value={s.comp}
                    onChange={(e) => updateSubject(i, "comp", e.target.value)}
                    style={{ width: "100%", textAlign: "center", fontSize: "10px" }}
                  />
                </td>
                <td
                  style={{
                    border: "1px solid #000",
                    padding: "5px",
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  {s.moyTrimDisplay}
                </td>
                <td
                  contentEditable
                  suppressContentEditableWarning
                  style={{
                    border: "1px solid #000",
                    padding: "5px",
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  {s.coef}
                </td>
                <td
                  style={{
                    border: "1px solid #000",
                    padding: "5px",
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  {s.ntesDefDisplay}
                </td>
                <td
                  contentEditable
                  suppressContentEditableWarning
                  style={{
                    border: "1px solid #000",
                    padding: "5px",
                    textAlign: "center",
                  }}
                >
                  {s.rang}
                </td>
                <td
                  contentEditable
                  suppressContentEditableWarning
                  style={{
                    border: "1px solid #000",
                    padding: "5px",
                    textAlign: "center",
                  }}
                >
                  {s.appr}
                </td>
                <td
                  contentEditable
                  suppressContentEditableWarning
                  style={{
                    border: "1px solid #000",
                    padding: "5px",
                    textAlign: "center",
                  }}
                >
                  {s.prof}
                </td>
                <td style={{ border: "1px solid #000", padding: "5px" }}></td>
              </tr>
            ))}
            <tr style={{ background: "#f0f0f0", fontWeight: "bold" }}>
              <td
                colSpan="6"
                style={{
                  border: "1px solid #000",
                  padding: "5px",
                  textAlign: "right",
                }}
              >
                Totaux:
              </td>
              <td
                style={{
                  border: "1px solid #000",
                  padding: "5px",
                  textAlign: "center",
                }}
              >
                {totalCoef}
              </td>
              <td
                style={{
                  border: "1px solid #000",
                  padding: "5px",
                  textAlign: "center",
                }}
              >
                {totalNotes.toFixed(2)}
              </td>
              <td colSpan="4" style={{ border: "1px solid #000" }}></td>
            </tr>
          </tbody>
        </table>

{/* --- DÉBUT DE LA PARTIE BASSE (INTERACTIVE) --- */}
        
        <div style={{ display: "flex", border: "2px solid #000", borderTop: "none", fontFamily: "Arial, sans-serif", color: "#000", fontSize: "11px" }}>
          
          {/* ================= COLONNE GAUCHE ================= */}
          <div style={{ flex: 1, borderRight: "2px solid #000", display: "flex", flexDirection: "column" }}>
            
            {/* BLOC 1: RESULTATS DE L'ELEVE */}
            <div>
              <div style={{ 
                fontWeight: "bold", 
                textAlign: "center", 
                borderBottom: "1px solid #000", 
                background: "#f0f0f0",
                padding: "2px",
                fontSize: "11px"
              }}>
                RESULTATS DE L'ELEVE
              </div>
              
              {/* Ligne Moyenne */}
              <div style={{ display: "flex", borderBottom: "1px solid #000" }}>
                <div style={{ flex: 1, padding: "4px", fontWeight: "bold", borderRight: "1px solid #000" }}>
                  Moyenne trimestrielle:
                </div>
                <div 
                  contentEditable 
                  suppressContentEditableWarning
                  style={{ width: "60px", padding: "4px", textAlign: "center", fontWeight: "bold", fontSize: "12px", outline: "none", background: "#fff" }}
                >
                  {moyenneGenerale}
                </div>
              </div>

              {/* Ligne Rang */}
              <div style={{ display: "flex", borderBottom: "1px solid #000" }}>
                <div style={{ flex: 1, padding: "4px", fontWeight: "bold", borderRight: "1px solid #000" }}>
                  Rang:
                </div>
                <div 
                  contentEditable 
                  suppressContentEditableWarning
                  style={{ width: "60px", padding: "4px", textAlign: "center", fontWeight: "bold", fontSize: "12px", outline: "none", background: "#fff" }}
                >
                  {data.rang}
                </div>
              </div>
            </div>

            {/* BLOC 2: ABSENCES */}
            <div style={{ borderBottom: "1px solid #000", padding: "2px" }}>
              <div style={{ fontSize: "10px", textAlign: "center", fontWeight: "bold", marginBottom: "2px" }}>
                Nombre d'heures d'absence
              </div>
              <div 
                contentEditable 
                suppressContentEditableWarning
                style={{ textAlign: "center", fontWeight: "bold", fontSize: "12px", padding: "5px", outline: "none", minHeight: "20px" }}
              >
                {data.absences || "0"}
              </div>
            </div>

            {/* BLOC 3: DECISION DU CONSEIL (Checkboxes) */}
            <div style={{ padding: "5px", flex: 1, display: "flex", flexDirection: "column" }}>
              <div style={{ 
                fontWeight: "bold", 
                textAlign: "center", 
                textDecoration: "underline", 
                marginBottom: "5px", 
                fontSize: "11px" 
              }}>
                DECISION DU CONSEIL
              </div>

              <div style={{ fontSize: "10px", paddingLeft: "5px", paddingRight: "5px" }}>
                {["Félicitations", "Encouragement", "Tableau d'honneur", "Avertissement", "Blâme"].map((item, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                    <span>{item}</span>
                    {/* Checkbox fonctionnelle */}
                    <input 
                        type="checkbox" 
                        style={{ width: "16px", height: "16px", margin: 0, cursor: "pointer" }} 
                    />
                  </div>
                ))}
              </div>

              {/* Bloc arrondi: Décision des profs */}
              <div style={{ 
                border: "2px solid #000", 
                borderRadius: "15px", 
                padding: "5px", 
                marginTop: "10px", 
                minHeight: "40px",
                display: "flex",
                flexDirection: "column"
              }}>
                <span style={{ fontSize: "9px", fontWeight: "bold", textDecoration: "underline" }}>Décision du conseil des profs:</span>
                <div 
                  contentEditable 
                  suppressContentEditableWarning
                  style={{ textAlign: "center", fontWeight: "bold", fontSize: "12px", marginTop: "auto", marginBottom: "auto", outline: "none", width: "100%" }}
                >
                  {data.observation || "Assez-bien"}
                </div>
              </div>

              {/* Bloc arrondi: Titulaire */}
              <div style={{ 
                border: "2px solid #000", 
                borderRadius: "15px", 
                padding: "8px", 
                marginTop: "10px", 
                minHeight: "100px",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
              }}>
                 <div style={{ fontWeight: "bold", fontSize: "11px", textDecoration: "underline" }}>Titulaire</div>
                 
                 {/* Zone vide pour signature manuscrite */}
                 <div style={{ flex: 1 }}></div>

                 {/* Nom du titulaire modifiable */}
                 <div 
                   contentEditable 
                   suppressContentEditableWarning
                   style={{ fontWeight: "bold", fontSize: "11px", outline: "none", borderBottom: "1px dashed #ccc" }}
                 >
                   {data.titulaire || "M. DOUTI"}
                 </div>
              </div>

            </div>
          </div>

          {/* ================= COLONNE DROITE ================= */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            
            {/* BLOC 1: STATISTIQUES (Tableau) */}
            <div style={{ fontSize: "10px" }}>
              {/* Ligne 1 */}
              <div style={{ display: "flex", borderBottom: "1px solid #000" }}>
                <div style={{ flex: 1, padding: "5px", borderRight: "1px solid #000" }}>Plus forte moy sur 20</div>
                <div 
                  contentEditable 
                  suppressContentEditableWarning
                  style={{ width: "50px", padding: "5px", textAlign: "center", fontWeight: "bold", outline: "none" }}
                >
                    {data.plusForte}
                </div>
              </div>
              {/* Ligne 2 */}
              <div style={{ display: "flex", borderBottom: "1px solid #000" }}>
                <div style={{ flex: 1, padding: "5px", borderRight: "1px solid #000" }}>Plus faible moy sur 20</div>
                <div 
                  contentEditable 
                  suppressContentEditableWarning
                  style={{ width: "50px", padding: "5px", textAlign: "center", fontWeight: "bold", outline: "none" }}
                >
                    {data.plusFaible}
                </div>
              </div>
              {/* Ligne 3 */}
              <div style={{ display: "flex", borderBottom: "1px solid #000" }}>
                <div style={{ flex: 1, padding: "5px", borderRight: "1px solid #000" }}>Moy trim clas sur 20</div>
                <div 
                  contentEditable 
                  suppressContentEditableWarning
                  style={{ width: "50px", padding: "5px", textAlign: "center", fontWeight: "bold", outline: "none" }}
                >
                    {data.moyMinMax}
                </div>
              </div>
            </div>

            {/* BLOC 2: OBSERVATION DU CHEF */}
            <div style={{ borderBottom: "1px solid #000", flex: 1, display: "flex", flexDirection: "column" }}>
               <div style={{ 
                 background: "#f0f0f0", 
                 padding: "3px", 
                 textAlign: "center", 
                 fontWeight: "bold", 
                 fontSize: "10px", 
                 borderBottom: "1px solid #000" 
               }}>
                 Observation du chef d'établissement
               </div>
               <div 
                 contentEditable 
                 suppressContentEditableWarning
                 style={{ 
                   padding: "10px", 
                   textAlign: "center", 
                   fontWeight: "bold", 
                   fontSize: "14px",
                   flex: 1,
                   display: "flex",
                   alignItems: "center",
                   justifyContent: "center",
                   outline: "none"
                 }}
               >
                 {data.observationChef || "Assez-bien"}
               </div>
            </div>

            {/* BLOC 3: LE DIRECTEUR (Bloc arrondi en bas à droite) */}
            <div style={{ padding: "10px", marginTop: "auto" }}>
              <div style={{ 
                border: "2px solid #000", 
                borderRadius: "20px", 
                padding: "10px", 
                textAlign: "center",
                minHeight: "150px",
                position: "relative",
                display: "flex",
                flexDirection: "column"
              }}>
                <div style={{ fontSize: "10px", marginBottom: "5px" }}>
                  Fait à <span contentEditable suppressContentEditableWarning style={{fontWeight: "bold", outline: "none"}}>{data.lieu || "Kara"}</span>, 
                  le <span contentEditable suppressContentEditableWarning style={{fontWeight: "bold", outline: "none"}}>{data.date || "07/05/2025"}</span>
                </div>
                
                <div style={{ fontWeight: "bold", fontSize: "11px", textDecoration: "underline", marginBottom: "10px" }}>
                  LE DIRECTEUR
                </div>
                
                {/* Zone du tampon (Cercle vide pour laisser la place) */}
                <div style={{ flex: 1 }}></div>

                <div 
                  contentEditable 
                  suppressContentEditableWarning
                  style={{ fontWeight: "bold", fontSize: "12px", outline: "none", borderBottom: "1px dashed #ccc" }}
                >
                  {data.directeur || "M. WIYAGOUDA Bamazi"}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            fontSize: "11px",
            textAlign: "center",
            marginTop: "6px",
            fontStyle: "italic",
            fontFamily: "Times New Roman, serif"
          }}
        >
          Il n'est délivré qu'un seul exemplaire de bulletin. En cas de besoin, l'intéressé pourra en faire une copie certifiée par l'autorité compétente.
        </div>
  </div>
</div>);
};

export default BulletinGenerator;