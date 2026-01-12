import React, { useState, useEffect } from 'react';
import BulletinManager from './BulletinManager';
import BulletinGenerator from './BulletinGenerator';
import './App.css';

function App() {
  // États pour gérer les vues
  const [view, setView] = useState('manager'); // 'manager' | 'edit-bulletin' | 'print-all'
  const [editData, setEditData] = useState(null);
  const [printData, setPrintData] = useState(null);

  // Fonction appelée quand on veut éditer un bulletin
  const handleEditBulletin = (classe, student, trimestre, bulletinData, onSave) => {
    setEditData({
      classe,
      student,
      trimestre,
      bulletinData,
      onSave
    });
    setView('edit-bulletin');
  };

  // Fonction appelée quand on veut imprimer tous les bulletins
  const handlePrintAll = (classe, trimestre, students) => {
    setPrintData({
      classe,
      trimestre,
      students
    });
    setView('print-all');
  };

  // Retour au manager
  const handleBackToManager = () => {
    setView('manager');
    setEditData(null);
    setPrintData(null);
  };

  // Sauvegarde du bulletin et retour
  const handleSaveBulletin = (updatedData) => {
    if (editData?.onSave) {
      editData.onSave(updatedData);
      alert('✅ Bulletin sauvegardé avec succès !');
      handleBackToManager();
    }
  };

  // === VUE MANAGER ===
  if (view === 'manager') {
    return (
      <BulletinManager 
        onEditBulletin={handleEditBulletin}
        onPrintAll={handlePrintAll}
      />
    );
  }

  // === VUE EDITION BULLETIN ===
  if (view === 'edit-bulletin' && editData) {
    return (
      <div style={{ minHeight: '100vh', background: '#f3f4f6', padding: '20px' }}>
        <div style={{ maxWidth: '210mm', margin: '0 auto' }}>
          {/* Barre d'actions */}
          <div className="print-hidden" style={{ 
            display: 'flex', 
            gap: '10px', 
            marginBottom: '20px',
            background: 'white',
            padding: '15px',
            borderRadius: '10px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <button
              onClick={handleBackToManager}
              style={{
                padding: '10px 20px',
                background: '#6b7280',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              ← Retour
            </button>
            <button
              onClick={() => {
                const bulletinGenerator = document.querySelector('#bulletin-generator');
                if (bulletinGenerator) {
                  // Récupérer les données du BulletinGenerator
                  const currentData = editData.bulletinData;
                  handleSaveBulletin(currentData);
                }
              }}
              style={{
                padding: '10px 20px',
                background: '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 'bold'
              }}
            >
              💾 Sauvegarder
            </button>
            <div style={{ flex: 1 }}></div>
            <div style={{ 
              padding: '10px 15px',
              background: '#e0e7ff',
              borderRadius: '5px',
              fontSize: '14px',
              fontWeight: 'bold',
              color: '#1d4ed8'
            }}>
              {editData.student.nom} {editData.student.prenoms} - {editData.trimestre.replace('trimestre', 'Trimestre ')}
            </div>
          </div>

          {/* BulletinGenerator */}
          <div id="bulletin-generator">
            <BulletinGeneratorWrapper 
              initialData={editData.bulletinData}
              onDataChange={(newData) => {
                editData.bulletinData = newData;
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  // === VUE IMPRESSION TOUS LES BULLETINS ===
  if (view === 'print-all' && printData) {
    return (
      <div style={{ minHeight: '100vh', background: '#f3f4f6', padding: '20px' }}>
        {/* Barre d'actions (masquée à l'impression) */}
        <div className="print-hidden" style={{ 
          maxWidth: '210mm', 
          margin: '0 auto 20px',
          background: 'white',
          padding: '15px',
          borderRadius: '10px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          display: 'flex',
          gap: '10px',
          alignItems: 'center'
        }}>
          <button
            onClick={handleBackToManager}
            style={{
              padding: '10px 20px',
              background: '#6b7280',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            ← Retour
          </button>
          <button
            onClick={() => window.print()}
            style={{
              padding: '10px 20px',
              background: '#1d4ed8',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '16px'
            }}
          >
            🖨️ Imprimer tous les bulletins ({printData.students.length})
          </button>
          <div style={{ 
            padding: '10px 15px',
            background: '#e0e7ff',
            borderRadius: '5px',
            fontSize: '14px',
            fontWeight: 'bold',
            color: '#1d4ed8'
          }}>
            {printData.classe.nom} - {printData.trimestre.replace('trimestre', 'Trimestre ')}
          </div>
        </div>

        {/* Bulletins (un par page) */}
        {printData.students.map((student, index) => {
          const bulletinData = student[printData.trimestre];
          if (!bulletinData) return null;

          return (
            <div 
              key={student.id}
              style={{ 
                pageBreakAfter: index < printData.students.length - 1 ? 'always' : 'auto',
                marginBottom: '20px'
              }}
            >
              <BulletinGeneratorWrapper 
                initialData={bulletinData}
                readOnly={true}
              />
            </div>
          );
        })}
      </div>
    );
  }

  return null;
}

// Wrapper pour BulletinGenerator qui gère les props
const BulletinGeneratorWrapper = ({ initialData, onDataChange, readOnly = false }) => {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  const handleDataChange = (newData) => {
    setData(newData);
    if (onDataChange && !readOnly) {
      onDataChange(newData);
    }
  };

  // Passer les données au BulletinGenerator
  // Note: Vous devrez modifier légèrement votre BulletinGenerator pour accepter ces props
  return <BulletinGenerator initialData={data} onDataChange={handleDataChange} readOnly={readOnly} />;
};

export default App;