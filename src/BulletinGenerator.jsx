import React, { useState } from "react";
import { Printer } from "lucide-react";
import CIP from "../assets/CIP.jpg";

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
    absences: "",
    observation: "",
    tableauHonneur: false,
    titulaire: "",
    directeur: "",
    date: "",
    lieu: "",
  });

  const updateSubject = (index, field, value) => {
    const newSubjects = [...data.subjects];
    newSubjects[index] = { ...newSubjects[index], [field]: value };
    setData({ ...data, subjects: newSubjects });
  };

  // --- CALCULS AUTOMATIQUES ---

  // 1. Calculer les lignes individuelles
  const processedSubjects = data.subjects.map((s) => {
    const n1 = parseFloat(s.n1);
    const n2 = parseFloat(s.n2);
    const comp = parseFloat(s.comp);

    // Vérifier si les nombres sont valides pour éviter d'afficher "NaN"
    const hasN1 = !isNaN(n1);
    const hasN2 = !isNaN(n2);
    const hasComp = !isNaN(comp);

    // Calcul Moyenne Classe (pour affichage seulement, si besoin)
    let moyCla = "";
    if (hasN1 && hasN2) moyCla = ((n1 + n2) / 2).toFixed(2);
    else if (hasN1) moyCla = n1.toFixed(2);
    else if (hasN2) moyCla = n2.toFixed(2);

    // Note Max pour le calcul demandé
    let maxNoteClasse = 0;
    if (hasN1 && hasN2) maxNoteClasse = Math.max(n1, n2);
    else if (hasN1) maxNoteClasse = n1;
    else if (hasN2) maxNoteClasse = n2;

    // Calcul Moyenne Trimestrielle: (Max(n1, n2) + Comp) / 2
    let moyTrimVal = 0;
    let ntesDefVal = 0;
    let moyTrimDisplay = "";
    let ntesDefDisplay = "";

    // On calcule seulement si on a au moins une note de classe ET une compo
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
      rawNtesDef: ntesDefVal, // Sert pour le total
    };
  });

  // 2. Calculer les Totaux Généraux
  const totalCoef = processedSubjects.reduce((acc, s) => acc + s.coef, 0);
  const totalNotes = processedSubjects.reduce(
    (acc, s) => acc + s.rawNtesDef,
    0
  );

  // 3. Calculer la Moyenne Générale
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
          padding: "15px",
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
            marginBottom: "8px",
          }}
        >
          {/* Gauche */}
          <div style={{ width: "38%", fontSize: "9px", textAlign: "center" }}>
            <div style={{ fontWeight: "bold" }}>
              <div contentEditable suppressContentEditableWarning>
                MINISTERE DES ENSEIGNEMENTS
              </div>
              <div contentEditable suppressContentEditableWarning>
                PRIMAIRE ET SECONDAIRE
              </div>
            </div>
            <div
              contentEditable
              suppressContentEditableWarning
              style={{ fontWeight: "bold" }}
            >
              {data.dre}
            </div>
            <div
              contentEditable
              suppressContentEditableWarning
              style={{ fontWeight: "bold" }}
            >
              {data.iesg}
            </div>
            <div
              style={{
                margin: "8px auto",
                width: "55px",
                height: "55px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "white",
                overflow: "hidden",
              }}
            >
              <img
                src={CIP}
                alt="Logo CIP"
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </div>
            <div
              contentEditable
              suppressContentEditableWarning
              style={{ fontWeight: "bold", fontSize: "11px" }}
            >
              {data.etablissement}
            </div>
            <div
              contentEditable
              suppressContentEditableWarning
              style={{ fontSize: "7px" }}
            >
              {data.devise}
            </div>
            <div
              contentEditable
              suppressContentEditableWarning
              style={{ fontSize: "7px", marginTop: "3px" }}
            >
              {data.contact}
            </div>
          </div>

          {/* Centre */}
          <div
            style={{
              width: "32%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <h2 style={{ fontSize: "10px", fontWeight: "bold", margin: 0 }}>
              BULLETIN DE NOTES DU{" "}
              <span contentEditable suppressContentEditableWarning>
                {data.trimestre}
              </span>
            </h2>
          </div>

          {/* Droite */}
          <div style={{ width: "28%", fontSize: "9px", textAlign: "center" }}>
            <div
              contentEditable
              suppressContentEditableWarning
              style={{ fontWeight: "bold" }}
            >
              REPUBLIQUE TOGOLAISE
            </div>
            <div
              contentEditable
              suppressContentEditableWarning
              style={{ fontStyle: "italic", fontSize: "8px" }}
            >
              Travail-Liberté-Patrie
            </div>
            <table
              style={{
                width: "100%",
                border: "1px solid #000",
                marginTop: "5px",
                fontSize: "7px",
                borderCollapse: "collapse",
              }}
            >
              <tbody>
                <tr>
                  <td
                    style={{
                      border: "1px solid #000",
                      padding: "2px",
                      fontWeight: "bold",
                    }}
                  >
                    Année
                  </td>
                  <td
                    contentEditable
                    suppressContentEditableWarning
                    style={{ border: "1px solid #000", padding: "2px" }}
                  >
                    {data.annee}
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      border: "1px solid #000",
                      padding: "2px",
                      fontWeight: "bold",
                    }}
                  >
                    Classe
                  </td>
                  <td
                    contentEditable
                    suppressContentEditableWarning
                    style={{ border: "1px solid #000", padding: "2px" }}
                  >
                    {data.classe}
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      border: "1px solid #000",
                      padding: "2px",
                      fontWeight: "bold",
                    }}
                  >
                    Effectif
                  </td>
                  <td
                    contentEditable
                    suppressContentEditableWarning
                    style={{ border: "1px solid #000", padding: "2px" }}
                  >
                    {data.effectif}
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      border: "1px solid #000",
                      padding: "2px",
                      fontWeight: "bold",
                    }}
                  >
                    Statut
                  </td>
                  <td
                    contentEditable
                    suppressContentEditableWarning
                    style={{ border: "1px solid #000", padding: "2px" }}
                  >
                    {data.statut}
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      border: "1px solid #000",
                      padding: "2px",
                      fontWeight: "bold",
                    }}
                  >
                    Sexe
                  </td>
                  <td
                    contentEditable
                    suppressContentEditableWarning
                    style={{ border: "1px solid #000", padding: "2px" }}
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
            border: "1px solid #000",
            marginBottom: "8px",
            fontSize: "8px",
            borderCollapse: "collapse",
          }}
        >
          <tbody>
            <tr>
              <td
                style={{
                  border: "1px solid #000",
                  padding: "2px",
                  fontWeight: "bold",
                  width: "10%",
                }}
              >
                Nom:
              </td>
              <td
                contentEditable
                suppressContentEditableWarning
                style={{
                  border: "1px solid #000",
                  padding: "2px",
                  width: "40%",
                }}
              >
                {data.nom}
              </td>
              <td
                style={{
                  border: "1px solid #000",
                  padding: "2px",
                  fontWeight: "bold",
                  width: "18%",
                }}
              >
                Date de Naissance
              </td>
              <td
                contentEditable
                suppressContentEditableWarning
                style={{
                  border: "1px solid #000",
                  padding: "2px",
                  width: "32%",
                }}
              >
                {data.dateNaissance}
              </td>
            </tr>
            <tr>
              <td
                style={{
                  border: "1px solid #000",
                  padding: "2px",
                  fontWeight: "bold",
                }}
              >
                Prénoms
              </td>
              <td
                contentEditable
                suppressContentEditableWarning
                style={{ border: "1px solid #000", padding: "2px" }}
              >
                {data.prenoms}
              </td>
              <td
                style={{
                  border: "1px solid #000",
                  padding: "2px",
                  fontWeight: "bold",
                }}
              >
                Lieu de Naissance
              </td>
              <td
                contentEditable
                suppressContentEditableWarning
                style={{ border: "1px solid #000", padding: "2px" }}
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
            fontSize: "7px",
            border: "1px solid #000",
          }}
        >
          <thead style={{ background: "#d8bfd8" }}>
            <tr>
              <th
                rowSpan="2"
                style={{ border: "1px solid #000", padding: "2px" }}
              >
                MATIERES
              </th>
              <th
                colSpan="2"
                style={{ border: "1px solid #000", padding: "2px" }}
              >
                Ntes clas
                <br />
                Sur 20
              </th>
              <th
                rowSpan="2"
                style={{ border: "1px solid #000", padding: "2px" }}
              >
                Moy cla
                <br />
                sur 20
              </th>
              <th
                rowSpan="2"
                style={{ border: "1px solid #000", padding: "2px" }}
              >
                Comp
                <br />
                Sur 20
              </th>
              <th
                rowSpan="2"
                style={{ border: "1px solid #000", padding: "2px" }}
              >
                Moy
                <br />
                trim
              </th>
              <th
                rowSpan="2"
                style={{ border: "1px solid #000", padding: "2px" }}
              >
                Coef
              </th>
              <th
                rowSpan="2"
                style={{ border: "1px solid #000", padding: "2px" }}
              >
                Ntes
                <br />
                définitives
              </th>
              <th
                rowSpan="2"
                style={{ border: "1px solid #000", padding: "2px" }}
              >
                Rang
              </th>
              <th
                rowSpan="2"
                style={{ border: "1px solid #000", padding: "2px" }}
              >
                Appréciation
              </th>
              <th
                rowSpan="2"
                style={{ border: "1px solid #000", padding: "2px" }}
              >
                Noms des
                <br />
                Professeurs
              </th>
              <th
                rowSpan="2"
                style={{ border: "1px solid #000", padding: "2px" }}
              >
                Signature
              </th>
            </tr>
            <tr>
              <th style={{ border: "1px solid #000", padding: "1px" }}>1</th>
              <th style={{ border: "1px solid #000", padding: "1px" }}>2</th>
            </tr>
          </thead>
          <tbody>
            {processedSubjects.map((s, i) => {
              return (
                <tr key={i}>
                  <td
                    contentEditable
                    suppressContentEditableWarning
                    style={{
                      border: "1px solid #000",
                      padding: "2px",
                      fontWeight: "bold",
                    }}
                  >
                    {s.name}
                  </td>
                  <td
                    style={{
                      border: "1px solid #000",
                      padding: "1px",
                      textAlign: "center",
                    }}
                  >
                    <input
                      type="number"
                      value={s.n1}
                      onChange={(e) => updateSubject(i, "n1", e.target.value)}
                      style={{ width: "100%", textAlign: "center" }}
                    />
                  </td>
                  <td
                    style={{
                      border: "1px solid #000",
                      padding: "1px",
                      textAlign: "center",
                    }}
                  >
                    <input
                      type="number"
                      value={s.n2}
                      onChange={(e) => updateSubject(i, "n2", e.target.value)}
                      style={{ width: "100%", textAlign: "center" }}
                    />
                  </td>
                  <td
                    style={{
                      border: "1px solid #000",
                      padding: "2px",
                      textAlign: "center",
                      background: "#fafafa",
                    }}
                  >
                    {s.moyClaDisplay}
                  </td>
                  <td
                    style={{
                      border: "1px solid #000",
                      padding: "1px",
                      textAlign: "center",
                    }}
                  >
                    <input
                      type="number"
                      value={s.comp}
                      onChange={(e) => updateSubject(i, "comp", e.target.value)}
                      style={{ width: "100%", textAlign: "center" }}
                    />
                  </td>
                  <td
                    style={{
                      border: "1px solid #000",
                      padding: "2px",
                      textAlign: "center",
                      fontWeight: "bold",
                      background: "#f0fdf4",
                    }}
                  >
                    {s.moyTrimDisplay}
                  </td>
                  <td
                    contentEditable
                    suppressContentEditableWarning
                    style={{
                      border: "1px solid #000",
                      padding: "2px",
                      textAlign: "center",
                    }}
                  >
                    {s.coef}
                  </td>
                  <td
                    style={{
                      border: "1px solid #000",
                      padding: "2px",
                      textAlign: "center",
                      fontWeight: "bold",
                      background: "#f0fdf4",
                    }}
                  >
                    {s.ntesDefDisplay}
                  </td>
                  <td
                    contentEditable
                    suppressContentEditableWarning
                    style={{
                      border: "1px solid #000",
                      padding: "2px",
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
                      padding: "2px",
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
                      padding: "2px",
                      textAlign: "center",
                    }}
                  >
                    {s.prof}
                  </td>
                  <td style={{ border: "1px solid #000", padding: "2px" }}></td>
                </tr>
              );
            })}
            <tr style={{ background: "#d8bfd8", fontWeight: "bold" }}>
              <td
                colSpan="6"
                style={{
                  border: "1px solid #000",
                  padding: "2px",
                  textAlign: "right",
                }}
              >
                Totaux:
              </td>
              <td
                style={{
                  border: "1px solid #000",
                  padding: "2px",
                  textAlign: "center",
                }}
              >
                {totalCoef}
              </td>
              <td
                style={{
                  border: "1px solid #000",
                  padding: "2px",
                  textAlign: "center",
                }}
              >
                {totalNotes.toFixed(2)}
              </td>
              <td colSpan="4" style={{ border: "1px solid #000" }}></td>
            </tr>
          </tbody>
        </table>

        {/* Résultats et Décision */}
        <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
          {/* Gauche */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <div
              style={{
                border: "1px solid #000",
                background: "#d8bfd8",
                padding: "2px",
                textAlign: "center",
                fontSize: "8px",
                fontWeight: "bold",
              }}
            >
              RESULTATS DE L'ELEVE
            </div>
            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
              <table
                style={{
                  width: "100%",
                  height: "50%",
                  border: "1px solid #000",
                  fontSize: "7px",
                  borderTop: "none",
                  borderCollapse: "collapse",
                  tableLayout: "fixed",
                }}
              >
                <tbody>
                  <tr style={{ height: "26.66%" }}>
                    <td
                      style={{
                        border: "1px solid #000",
                        padding: "2px",
                        fontWeight: "bold",
                        width: "35%",
                      }}
                    >
                      Moyenne trimestrielle:
                    </td>
                    <td
                      style={{
                        border: "1px solid #000",
                        padding: "2px",
                        width: "15%",
                        fontWeight: "bold",
                        fontSize: "10px",
                        textAlign: "center",
                      }}
                    >
                      {moyenneGenerale}
                    </td>
                    <td
                      style={{
                        border: "1px solid #000",
                        padding: "2px",
                        width: "35%",
                      }}
                    >
                      Plus forte moyenne sr 20
                    </td>
                    <td
                      contentEditable
                      suppressContentEditableWarning
                      style={{
                        border: "1px solid #000",
                        padding: "2px",
                        width: "15%",
                      }}
                    >
                      {data.plusForte}
                    </td>
                  </tr>
                  <tr style={{ height: "26.66%" }}>
                    <td
                      colSpan="2"
                      style={{ border: "1px solid #000", padding: "2px" }}
                    ></td>
                    <td style={{ border: "1px solid #000", padding: "2px" }}>
                      Plus faible moyenne sr 20
                    </td>
                    <td
                      contentEditable
                      suppressContentEditableWarning
                      style={{ border: "1px solid #000", padding: "2px" }}
                    >
                      {data.plusFaible}
                    </td>
                  </tr>
                  <tr style={{ height: "26.66%" }}>
                    <td
                      style={{
                        border: "1px solid #000",
                        padding: "2px",
                        fontWeight: "bold",
                      }}
                    >
                      Rang:
                    </td>
                    <td
                      contentEditable
                      suppressContentEditableWarning
                      style={{ border: "1px solid #000", padding: "2px" }}
                    >
                      {data.rang}
                    </td>
                    <td style={{ border: "1px solid #000", padding: "2px" }}>
                      Moy min/max sr 20
                    </td>
                    <td
                      contentEditable
                      suppressContentEditableWarning
                      style={{ border: "1px solid #000", padding: "2px" }}
                    >
                      {data.moyMinMax}
                    </td>
                  </tr>
                </tbody>
              </table>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "5px",
                  marginTop: "5px",
                  flex: 1,
                }}
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div
                    style={{
                      border: "1px solid #000",
                      padding: "2px",
                      textAlign: "center",
                      fontSize: "7px",
                      fontWeight: "bold",
                    }}
                  >
                    Nombre d'heures d'absence
                  </div>
                  <div
                    contentEditable
                    suppressContentEditableWarning
                    style={{
                      flex: 1,
                      textAlign: "center",
                      border: "1px solid #000",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderTop: "none",
                    }}
                  >
                    {data.absences}
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div
                    style={{
                      border: "1px solid #000",
                      padding: "2px",
                      textAlign: "center",
                      fontSize: "7px",
                      fontWeight: "bold",
                    }}
                  >
                    Observation du chef d'établissement
                  </div>
                  <div
                    style={{
                      border: "1px solid #000",
                      flex: 1,
                      borderTop: "none",
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Droite */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <div
              style={{
                border: "1px solid #000",
                background: "#d8bfd8",
                padding: "2px",
                textAlign: "center",
                fontSize: "8px",
                fontWeight: "bold",
              }}
            >
              DECISION DU CONSEIL
            </div>
            <div
              style={{
                border: "1px solid #000",
                padding: "5px",
                fontSize: "7px",
                flex: 1,
                display: "flex",
                flexDirection: "column",
                borderTop: "none",
              }}
            >
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
                    marginBottom: "3px",
                  }}
                >
                  <span contentEditable suppressContentEditableWarning>
                    {item}
                  </span>
                  <input
                    type="checkbox"
                    checked={i === 2 && data.tableauHonneur}
                    onChange={() => {}}
                  />
                </div>
              ))}

              <div
                style={{
                  border: "1px solid #000",
                  padding: "5px",
                  marginTop: "auto",
                  minHeight: "60px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    fontSize: "7px",
                    fontWeight: "bold",
                    marginBottom: "3px",
                  }}
                >
                  Décision du conseil des profs:
                </div>
                <div
                  contentEditable
                  suppressContentEditableWarning
                  style={{
                    textAlign: "center",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                >
                  {data.observation}
                </div>
              </div>
            </div>

            {/* Signatures */}
            <div
              style={{
                display: "flex",
                border: "1px solid #000",
                marginTop: "8px",
                minHeight: "60px",
              }}
            >
              <div
                style={{
                  flex: 1,
                  borderRight: "1px solid #000",
                  padding: "3px",
                  textAlign: "center",
                  fontSize: "7px",
                }}
              >
                <div
                  style={{ fontWeight: "bold", textDecoration: "underline" }}
                >
                  Titulaire
                </div>
                <div
                  contentEditable
                  suppressContentEditableWarning
                  style={{ marginTop: "30px" }}
                >
                  {data.titulaire}
                </div>
              </div>
              <div
                style={{
                  flex: 1,
                  padding: "3px",
                  textAlign: "center",
                  fontSize: "7px",
                }}
              >
                <div style={{ fontWeight: "bold" }}>
                  Fait à{" "}
                  <span contentEditable suppressContentEditableWarning>
                    {data.lieu}
                  </span>
                  , le{" "}
                  <span contentEditable suppressContentEditableWarning>
                    {data.date}
                  </span>
                </div>
                <div
                  style={{
                    fontWeight: "bold",
                    textDecoration: "underline",
                    margin: "3px 0",
                  }}
                >
                  LE DIRECTEUR
                </div>
                <div
                  style={{
                    width: "50px",
                    height: "50px",
                    border: "1px dashed #000",
                    borderRadius: "50%",
                    margin: "5px auto",
                  }}
                ></div>
                <div
                  contentEditable
                  suppressContentEditableWarning
                  style={{ marginTop: "5px" }}
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
            fontSize: "6px",
            textAlign: "center",
            marginTop: "5px",
            fontStyle: "italic",
          }}
        >
          Il n'est délivré qu'un seul exemplaire de bulletin en cas de perte,un
          duplicata pourra être fourni en tant que copie certifiée par
          l'autorité compétente.
        </div>
      </div>
    </div>
  );
};

export default BulletinGenerator;
