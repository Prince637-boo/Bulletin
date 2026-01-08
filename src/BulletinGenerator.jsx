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
                border: "2px solid #000",
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

        {/* Résultats et Décisions */}
        <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
          {/* Gauche - Résultats */}
          <div style={{ flex: 1, border: "2px solid #000" }}>
            <div
              style={{
                background: "#f0f0f0",
                padding: "5px",
                textAlign: "center",
                fontSize: "11px",
                fontWeight: "bold",
                borderBottom: "1px solid #000",
              }}
            >
              RESULTATS DE L'ELEVE
            </div>
            <table
              style={{
                width: "100%",
                fontSize: "10px",
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
                      width: "50%",
                    }}
                  >
                    Moyenne trimestrielle:
                  </td>
                  <td
                    style={{
                      border: "1px solid #000",
                      padding: "5px",
                      fontWeight: "bold",
                      fontSize: "14px",
                      textAlign: "center",
                    }}
                  >
                    {moyenneGenerale}
                  </td>
                  <td
                    style={{
                      border: "1px solid #000",
                      padding: "5px",
                    }}
                  >
                    Plus forte moy sr 20
                  </td>
                  <td
                    contentEditable
                    suppressContentEditableWarning
                    style={{
                      border: "1px solid #000",
                      padding: "15px",
                      textAlign: "center",
                    }}
                  >
                    {data.plusForte}
                  </td>
                </tr>
                <tr>
                  <td
                    rowSpan="2"
                    colSpan="2"
                    style={{ border: "1px solid #000", padding: "5px" }}
                  ></td>
                  <td style={{ border: "1px solid #000", padding: "5px" }}>
                    Plus faible moy sr 20
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
                    {data.plusFaible}
                  </td>
                </tr>
                <tr>
                  <td style={{ border: "1px solid #000", padding: "5px" }}>
                    Moy min/max sr 20
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
                    {data.moyMinMax}
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      border: "1px solid #000",
                      padding: "5px",
                      fontWeight: "bold",
                    }}
                  >
                    Rang:
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
                    {data.rang}
                  </td>
                  <td colSpan="2" style={{ border: "1px solid #000" }}></td>
                </tr>
              </tbody>
            </table>

            <div style={{ display: "flex", borderTop: "1px solid #000" }}>
              <div style={{ flex: 1, borderRight: "1px solid #000", textAlign: "center" }}>
                <div
                  style={{
                    padding: "5px",
                    fontSize: "10px",
                    fontWeight: "bold",
                    borderBottom: "1px solid #000",
                  }}
                >
                  Nombre d'heures d'absence
                </div>
                <div
                  contentEditable
                  suppressContentEditableWarning
                  style={{
                    padding: "20px",
                    fontSize: "14px",
                    fontWeight: "bold",
                  }}
                >
                  {data.absences}
                </div>
              </div>
              <div style={{ flex: 1, textAlign: "center" }}>
                <div
                  style={{
                    padding: "5px",
                    fontSize: "10px",
                    fontWeight: "bold",
                    borderBottom: "1px solid #000",
                  }}
                >
                  Observation du chef d'établissement
                </div>
                <div style={{ padding: "20px", minHeight: "60px" }}></div>
              </div>
            </div>
          </div>

          {/* Droite - Décisions */}
          <div style={{ flex: 1, border: "2px solid #000" }}>
            <div
              style={{
                background: "#f0f0f0",
                padding: "5px",
                textAlign: "center",
                fontSize: "11px",
                fontWeight: "bold",
                borderBottom: "1px solid #000",
              }}
            >
              DECISION DU CONSEIL
            </div>
            <div style={{ padding: "10px", fontSize: "10px" }}>
              {[
                "Félicitations",
                "Encouragement",
                "Tableau d'honneur",
                "Avertissement",
                "Blâme",
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "8px",
                    alignItems: "center",
                  }}
                >
                  <span>{item}</span>
                  <input
                    type="checkbox"
                    checked={i === 2 && data.tableauHonneur}
                    onChange={() => {}}
                    style={{ width: "18px", height: "18px" }}
                  />
                </div>
              ))}

              <div
                style={{
                  border: "2px solid #000",
                  padding: "10px",
                  marginTop: "15px",
                  minHeight: "80px",
                }}
              >
                <div
                  style={{
                    fontSize: "9px",
                    marginBottom: "8px",
                  }}
                >
                  Décision du conseil des profs:</div>
                <div
                  contentEditable
                  suppressContentEditableWarning
                  style={{
                    textAlign: "center",
                    fontSize: "16px",
                    fontWeight: "bold",
                    marginTop: "10px",
                  }}
                >
                  {data.observation}
                </div>
              </div>
            </div>

            {/* Signatures */}
        <div style={{ display: "flex", borderTop: "1px solid #000", minHeight: "100px" }}>
          <div
            style={{
              flex: 1,
              borderRight: "1px solid #000",
              padding: "10px",
              textAlign: "center",
              fontSize: "10px",
            }}
          >
            <div style={{ fontWeight: "bold", marginBottom: "30px" }}>Titulaire</div>
            <div
              contentEditable
              suppressContentEditableWarning
              style={{ marginTop: "auto", fontWeight: "bold" }}
            >
              {data.titulaire}
            </div>
          </div>
          <div
            style={{
              flex: 1,
              padding: "10px",
              textAlign: "center",
              fontSize: "10px",
            }}
          >
            <div style={{ fontWeight: "bold", marginBottom: "5px" }}>
              Fait à{" "}
              <span contentEditable suppressContentEditableWarning>
                {data.lieu}
              </span>
              , le{" "}
              <span contentEditable suppressContentEditableWarning>
                {data.date}
              </span>
            </div>
            <div style={{ fontWeight: "bold", marginBottom: "5px" }}>LE DIRECTEUR</div>
            <div
              style={{
                width: "70px",
                height: "70px",
                border: "2px dashed #000",
                borderRadius: "50%",
                margin: "10px auto",
              }}
            ></div>
            <div
              contentEditable
              suppressContentEditableWarning
              style={{ fontWeight: "bold" }}
            >
              {data.directeur}
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Footer */}
    <div
      style={{
        fontSize: "8px",
        textAlign: "center",
        marginTop: "10px",
        fontStyle: "italic",
      }}
    >
      Il n'est délivré qu'un seul exemplaire de bulletin en cas de perte,un duplicata pourra
      être fourni en tant que copie certifiée par l'autorité compétente.
    </div>
  </div>
</div>);
};

export default BulletinGenerator;