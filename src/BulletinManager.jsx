import React, { useState, useEffect } from "react";
import { 
  Plus, 
  Edit2, 
  Trash2, 
  ArrowLeft, 
  Users, 
  FileText, 
  Download, 
  Upload,
  Printer,
  BookOpen
} from "lucide-react";

const BulletinManager = ({ onEditBulletin, onPrintAll }) => {
  // États principaux
  const [view, setView] = useState("classes"); // classes | students | select-trimestre
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Charger les données au démarrage
  useEffect(() => {
    loadClasses();
  }, []);

  // === GESTION LOCALSTORAGE ===
  const loadClasses = () => {
    const saved = localStorage.getItem("bulletin_classes");
    if (saved) {
      try {
        setClasses(JSON.parse(saved));
      } catch (e) {
        console.error("Erreur chargement données:", e);
        setClasses([]);
      }
    }
  };

  const saveClasses = (newClasses) => {
    setClasses(newClasses);
    localStorage.setItem("bulletin_classes", JSON.stringify(newClasses));
  };

  // === GESTION DES CLASSES ===
  const addClass = (nom, annee) => {
    const newClass = {
      id: Date.now(),
      nom: nom.trim(),
      annee: annee.trim(),
      effectif: 0,
      eleves: [],
      createdAt: new Date().toISOString()
    };
    saveClasses([...classes, newClass]);
    return newClass;
  };

  const deleteClass = (id) => {
    if (window.confirm("⚠️ Supprimer cette classe et tous ses élèves ?")) {
      saveClasses(classes.filter(c => c.id !== id));
    }
  };

  const updateClass = (id, updates) => {
    saveClasses(classes.map(c => c.id === id ? { ...c, ...updates } : c));
  };

  // === GESTION DES ÉLÈVES ===
  const addStudent = (classId, nom, prenoms, dateNaissance, lieuNaissance, sexe, statut) => {
    const newStudent = {
      id: Date.now(),
      nom: nom.trim(),
      prenoms: prenoms.trim(),
      dateNaissance: dateNaissance.trim(),
      lieuNaissance: lieuNaissance.trim(),
      sexe: sexe.trim(),
      statut: statut.trim(),
      trimestre1: null,
      trimestre2: null,
      trimestre3: null,
      createdAt: new Date().toISOString()
    };

    const updatedClasses = classes.map(c => {
      if (c.id === classId) {
        return {
          ...c,
          eleves: [...c.eleves, newStudent],
          effectif: c.eleves.length + 1
        };
      }
      return c;
    });

    saveClasses(updatedClasses);
    return newStudent;
  };

  const deleteStudent = (classId, studentId) => {
    if (window.confirm("⚠️ Supprimer cet élève et ses bulletins ?")) {
      const updatedClasses = classes.map(c => {
        if (c.id === classId) {
          const newEleves = c.eleves.filter(e => e.id !== studentId);
          return {
            ...c,
            eleves: newEleves,
            effectif: newEleves.length
          };
        }
        return c;
      });
      saveClasses(updatedClasses);
    }
  };

  const updateStudentBulletin = (classId, studentId, trimestre, bulletinData) => {
    const updatedClasses = classes.map(c => {
      if (c.id === classId) {
        return {
          ...c,
          eleves: c.eleves.map(e => 
            e.id === studentId 
              ? { ...e, [trimestre]: bulletinData }
              : e
          )
        };
      }
      return c;
    });
    saveClasses(updatedClasses);
  };

  // === EXPORT/IMPORT JSON ===
  const exportToJSON = () => {
    const dataStr = JSON.stringify(classes, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `bulletins_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const importFromJSON = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target.result);
        if (Array.isArray(imported)) {
          if (window.confirm("⚠️ Remplacer toutes les données actuelles ?")) {
            saveClasses(imported);
            alert("✅ Données importées avec succès !");
          }
        } else {
          alert("❌ Format de fichier invalide");
        }
      } catch (error) {
        alert("❌ Erreur lors de l'import : " + error.message);
      }
    };
    reader.readAsText(file);
    event.target.value = ""; // Reset input
  };

  // === VUE 1: GESTION DES CLASSES ===
  const ClassesView = () => {
    const [nomClasse, setNomClasse] = useState("");
    const [annee, setAnnee] = useState("2025-2026");

    const handleAddClass = () => {
      if (!nomClasse.trim()) {
        alert("⚠️ Veuillez entrer un nom de classe");
        return;
      }
      addClass(nomClasse, annee);
      setNomClasse("");
    };

    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>📚 Gestion des Classes</h1>
          <div style={{ display: "flex", gap: "10px" }}>
            <button onClick={exportToJSON} style={styles.btnSecondary}>
              <Download size={16} /> Exporter JSON
            </button>
            <label style={styles.btnSecondary}>
              <Upload size={16} /> Importer JSON
              <input
                type="file"
                accept=".json"
                onChange={importFromJSON}
                style={{ display: "none" }}
              />
            </label>
          </div>
        </div>

        {/* Formulaire ajout classe */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>➕ Créer une nouvelle classe</h3>
          <div style={styles.formRow}>
            <input
              type="text"
              placeholder="Nom de la classe (ex: 6ème A, 3ème C...)"
              value={nomClasse}
              onChange={(e) => setNomClasse(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleAddClass()}
              style={{ ...styles.input, flex: 2 }}
            />
            <input
              type="text"
              placeholder="Année scolaire"
              value={annee}
              onChange={(e) => setAnnee(e.target.value)}
              style={{ ...styles.input, flex: 1 }}
            />
            <button onClick={handleAddClass} style={styles.btnPrimary}>
              <Plus size={20} /> Ajouter
            </button>
          </div>
        </div>

        {/* Liste des classes */}
        <div style={styles.grid}>
          {classes.length === 0 ? (
            <div style={styles.emptyState}>
              <BookOpen size={48} color="#ccc" />
              <p>Aucune classe créée. Commencez par ajouter une classe.</p>
            </div>
          ) : (
            classes.map(cls => (
              <div key={cls.id} style={styles.classCard}>
                <div>
                  <h3 style={styles.classTitle}>{cls.nom}</h3>
                  <p style={styles.classInfo}>
                    📅 {cls.annee} • 👥 {cls.effectif} élève(s)
                  </p>
                </div>
                <div style={styles.cardActions}>
                  <button
                    onClick={() => {
                      setSelectedClass(cls);
                      setView("students");
                    }}
                    style={styles.btnPrimary}
                  >
                    <Users size={16} /> Gérer
                  </button>
                  <button
                    onClick={() => deleteClass(cls.id)}
                    style={styles.btnDanger}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  };

  // === VUE 2: GESTION DES ÉLÈVES ===
  const StudentsView = () => {
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
      nom: "",
      prenoms: "",
      dateNaissance: "",
      lieuNaissance: "",
      sexe: "M",
      statut: "Affecté"
    });

    const handleAddStudent = () => {
      if (!formData.nom.trim() || !formData.prenoms.trim()) {
        alert("⚠️ Nom et prénoms obligatoires");
        return;
      }
      addStudent(
        selectedClass.id,
        formData.nom,
        formData.prenoms,
        formData.dateNaissance,
        formData.lieuNaissance,
        formData.sexe,
        formData.statut
      );
      setFormData({
        nom: "",
        prenoms: "",
        dateNaissance: "",
        lieuNaissance: "",
        sexe: "M",
        statut: "Affecté"
      });
      setShowForm(false);
      // Recharger la classe
      const updated = classes.find(c => c.id === selectedClass.id);
      setSelectedClass(updated);
    };

    const handleSelectStudent = (student, trimestre) => {
      setSelectedStudent(student);
      
      // Préparer les données pour BulletinGenerator
      const bulletinData = student[trimestre] || getDefaultBulletinData(student, trimestre);
      
      // Appeler la fonction parent pour éditer le bulletin
      onEditBulletin(selectedClass, student, trimestre, bulletinData, (updatedData) => {
        updateStudentBulletin(selectedClass.id, student.id, trimestre, updatedData);
      });
    };

    const handlePrintAll = (trimestre) => {
      const studentsWithBulletins = selectedClass.eleves.filter(e => e[trimestre]);
      if (studentsWithBulletins.length === 0) {
        alert("⚠️ Aucun bulletin à imprimer pour ce trimestre");
        return;
      }
      onPrintAll(selectedClass, trimestre, studentsWithBulletins);
    };

    const currentClass = classes.find(c => c.id === selectedClass.id);

    return (
      <div style={styles.container}>
        <button onClick={() => setView("classes")} style={styles.btnBack}>
          <ArrowLeft size={16} /> Retour aux classes
        </button>

        <div style={styles.header}>
          <div>
            <h1 style={styles.title}>👥 {currentClass?.nom}</h1>
            <p style={styles.subtitle}>
              📅 {currentClass?.annee} • 👥 {currentClass?.effectif} élève(s)
            </p>
          </div>
        </div>

        {/* Boutons impression */}
        {currentClass?.eleves.length > 0 && (
          <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
            <button
              onClick={() => handlePrintAll("trimestre1")}
              style={{ ...styles.btnSecondary, flex: 1 }}
            >
              <Printer size={16} /> Imprimer Trimestre 1
            </button>
            <button
              onClick={() => handlePrintAll("trimestre2")}
              style={{ ...styles.btnSecondary, flex: 1 }}
            >
              <Printer size={16} /> Imprimer Trimestre 2
            </button>
            <button
              onClick={() => handlePrintAll("trimestre3")}
              style={{ ...styles.btnSecondary, flex: 1 }}
            >
              <Printer size={16} /> Imprimer Trimestre 3
            </button>
          </div>
        )}

        {/* Bouton ajouter élève */}
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            style={{ ...styles.btnSuccess, width: "100%", marginBottom: "20px" }}
          >
            <Plus size={20} /> Ajouter un élève
          </button>
        )}

        {/* Formulaire ajout élève */}
        {showForm && (
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>➕ Nouvel élève</h3>
            <div style={styles.formGrid}>
              <input
                type="text"
                placeholder="Nom *"
                value={formData.nom}
                onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                style={styles.input}
              />
              <input
                type="text"
                placeholder="Prénoms *"
                value={formData.prenoms}
                onChange={(e) => setFormData({ ...formData, prenoms: e.target.value })}
                style={styles.input}
              />
              <input
                type="date"
                placeholder="Date de naissance"
                value={formData.dateNaissance}
                onChange={(e) => setFormData({ ...formData, dateNaissance: e.target.value })}
                style={styles.input}
              />
              <input
                type="text"
                placeholder="Lieu de naissance"
                value={formData.lieuNaissance}
                onChange={(e) => setFormData({ ...formData, lieuNaissance: e.target.value })}
                style={styles.input}
              />
              <select
                value={formData.sexe}
                onChange={(e) => setFormData({ ...formData, sexe: e.target.value })}
                style={styles.input}
              >
                <option value="M">Masculin</option>
                <option value="F">Féminin</option>
              </select>
              <select
                value={formData.statut}
                onChange={(e) => setFormData({ ...formData, statut: e.target.value })}
                style={styles.input}
              >
                <option value="Affecté">Affecté</option>
                <option value="Redoublant">Redoublant</option>
                <option value="Nouveau">Nouveau</option>
              </select>
            </div>
            <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
              <button onClick={handleAddStudent} style={{ ...styles.btnSuccess, flex: 1 }}>
                ✅ Ajouter
              </button>
              <button
                onClick={() => setShowForm(false)}
                style={{ ...styles.btnSecondary, flex: 1 }}
              >
                ❌ Annuler
              </button>
            </div>
          </div>
        )}

        {/* Liste des élèves */}
        <div style={styles.grid}>
          {currentClass?.eleves.length === 0 ? (
            <div style={styles.emptyState}>
              <Users size={48} color="#ccc" />
              <p>Aucun élève dans cette classe. Commencez par ajouter des élèves.</p>
            </div>
          ) : (
            currentClass?.eleves.map(student => (
              <div key={student.id} style={styles.studentCard}>
                <div style={{ flex: 1 }}>
                  <h3 style={styles.studentName}>
                    {student.nom} {student.prenoms}
                  </h3>
                  <p style={styles.studentInfo}>
                    {student.sexe} • {student.statut}
                    {student.dateNaissance && ` • Né(e) le ${student.dateNaissance}`}
                  </p>
                  
                  {/* Indicateurs trimestres */}
                  <div style={{ display: "flex", gap: "5px", marginTop: "8px" }}>
                    {["trimestre1", "trimestre2", "trimestre3"].map((trim, idx) => (
                      <span
                        key={trim}
                        style={{
                          fontSize: "11px",
                          padding: "3px 8px",
                          borderRadius: "12px",
                          background: student[trim] ? "#10b981" : "#e5e7eb",
                          color: student[trim] ? "white" : "#666",
                          fontWeight: "bold"
                        }}
                      >
                        T{idx + 1} {student[trim] ? "✓" : "○"}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                  <button
                    onClick={() => handleSelectStudent(student, "trimestre1")}
                    style={styles.btnTrimestre}
                  >
                    <FileText size={14} /> T1
                  </button>
                  <button
                    onClick={() => handleSelectStudent(student, "trimestre2")}
                    style={styles.btnTrimestre}
                  >
                    <FileText size={14} /> T2
                  </button>
                  <button
                    onClick={() => handleSelectStudent(student, "trimestre3")}
                    style={styles.btnTrimestre}
                  >
                    <FileText size={14} /> T3
                  </button>
                  <button
                    onClick={() => deleteStudent(selectedClass.id, student.id)}
                    style={{ ...styles.btnTrimestre, background: "#ef4444" }}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  };

  // Données par défaut pour un nouveau bulletin
  const getDefaultBulletinData = (student, trimestre) => {
    const trimestreNames = {
      trimestre1: "PREMIER TRIMESTRE",
      trimestre2: "DEUXIEME TRIMESTRE",
      trimestre3: "TROISIEME TRIMESTRE"
    };

    return {
      ministere: "MINISTERE DES ENSEIGNEMENTS\nPRIMAIRE ET SECONDAIRE",
      dre: "DRE-KARA",
      iesg: "IESG-KARA",
      etablissement: "CPL EXCELLENCE",
      devise: "TRAVAIL-RIGUEUR-REUSSITE",
      contact: "BP: KARA-TOGO | TEL:+22892586723",
      annee: selectedClass?.annee || "2025-2026",
      classe: selectedClass?.nom || "",
      effectif: selectedClass?.effectif || "",
      statut: student.statut || "",
      sexe: student.sexe || "",
      nom: student.nom || "",
      prenoms: student.prenoms || "",
      dateNaissance: student.dateNaissance || "",
      lieuNaissance: student.lieuNaissance || "",
      trimestre: trimestreNames[trimestre],
      subjects: [
        { name: "Français", n1: "", n2: "", comp: "", coef: 3, rang: "", appr: "", prof: "" },
        { name: "Anglais", n1: "", n2: "", comp: "", coef: 2, rang: "", appr: "", prof: "" },
        { name: "Histoire Géographie", n1: "", n2: "", comp: "", coef: 2, rang: "", appr: "", prof: "" },
        { name: "ECM", n1: "", n2: "", comp: "", coef: 2, rang: "", appr: "", prof: "" },
        { name: "SVT", n1: "", n2: "", comp: "", coef: 2, rang: "", appr: "", prof: "" },
        { name: "PCT", n1: "", n2: "", comp: "", coef: 3, rang: "", appr: "", prof: "" },
        { name: "Mathématiques", n1: "", n2: "", comp: "", coef: 3, rang: "", appr: "", prof: "" },
        { name: "EPS", n1: "", n2: "", comp: "", coef: 1, rang: "", appr: "", prof: "" },
      ],
      plusForte: "",
      plusFaible: "",
      moyMinMax: "",
      rang: "",
      absences: "00",
      observation: "",
      observationChef: "",
      tableauHonneur: false,
      titulaire: "M.DOUTI",
      directeur: "M. WIYAGOUDA Bamazi",
      date: "",
      lieu: "Kara",
    };
  };

  // Rendu principal
  return (
    <div style={{ minHeight: "100vh", background: "#f3f4f6", padding: "20px" }}>
      {view === "classes" && <ClassesView />}
      {view === "students" && <StudentsView />}
    </div>
  );
};

// === STYLES ===
const styles = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "30px",
  },
  title: {
    fontSize: "32px",
    fontWeight: "bold",
    color: "#1d4ed8",
    margin: 0,
  },
  subtitle: {
    fontSize: "16px",
    color: "#666",
    margin: "5px 0 0 0",
  },
  card: {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    marginBottom: "20px",
  },
  cardTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "15px",
    margin: 0,
  },
  formRow: {
    display: "flex",
    gap: "10px",
    marginTop: "15px",
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "10px",
    marginTop: "15px",
  },
  input: {
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    fontSize: "14px",
    outline: "none",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "15px",
  },
  classCard: {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  classTitle: {
    fontSize: "20px",
    fontWeight: "bold",
    margin: "0 0 5px 0",
  },
  classInfo: {
    fontSize: "14px",
    color: "#666",
    margin: 0,
  },
  studentCard: {
    background: "white",
    padding: "15px",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "10px",
  },
  studentName: {
    fontSize: "16px",
    fontWeight: "bold",
    margin: "0 0 5px 0",
  },
  studentInfo: {
    fontSize: "13px",
    color: "#666",
    margin: 0,
  },
  cardActions: {
    display: "flex",
    gap: "10px",
  },
  emptyState: {
    gridColumn: "1 / -1",
    textAlign: "center",
    padding: "60px 20px",
    background: "white",
    borderRadius: "10px",
    color: "#666",
  },
  btnPrimary: {
    padding: "10px 20px",
    background: "#1d4ed8",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "5px",
    fontSize: "14px",
    fontWeight: "500",
  },
  btnSecondary: {
    padding: "10px 20px",
    background: "#6b7280",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "5px",
    fontSize: "14px",
    fontWeight: "500",
  },
  btnSuccess: {
    padding: "10px 20px",
    background: "#10b981",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "5px",
    fontSize: "14px",
    fontWeight: "500",
    justifyContent: "center",
  },
  btnDanger: {
    padding: "10px 15px",
    background: "#ef4444",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "5px",
  },
  btnBack: {
    padding: "10px 15px",
    background: "#6b7280",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "5px",
    marginBottom: "20px",
  },
  btnTrimestre: {
    padding: "6px 12px",
    background: "#1d4ed8",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "5px",
    fontSize: "12px",
  }
};

export default BulletinManager;