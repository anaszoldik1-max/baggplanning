"use client";
import { useState } from "react";

export default function EmployePage() {
  const [onglet, setOnglet] = useState("disponibilites");
  const [disponibilites, setDisponibilites] = useState({
    lundi: { disponible: false, debut: "17:00", fin: "20:30" },
    mardi: { disponible: false, debut: "17:00", fin: "20:30" },
    mercredi: { disponible: false, debut: "14:00", fin: "20:30" },
    jeudi: { disponible: false, debut: "17:00", fin: "20:30" },
    vendredi: { disponible: true, debut: "14:00", fin: "20:30" },
    samedi: { disponible: true, debut: "08:30", fin: "14:00" },
  });

  const [toast, setToast] = useState({ visible: false, message: "" });

  const jours = [
    { id: "lundi", nom: "Lundi", date: "20 janvier" },
    { id: "mardi", nom: "Mardi", date: "21 janvier" },
    { id: "mercredi", nom: "Mercredi", date: "22 janvier" },
    { id: "jeudi", nom: "Jeudi", date: "23 janvier" },
    { id: "vendredi", nom: "Vendredi", date: "24 janvier" },
    { id: "samedi", nom: "Samedi", date: "25 janvier" },
  ];

  const heuresDebut = ["08:30", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"];
  const heuresFin = ["14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "19:30", "20:30"];

  const showToast = (message: string) => {
    setToast({ visible: true, message });
    setTimeout(() => setToast({ visible: false, message: "" }), 3000);
  };

  const toggleDispo = (jourId: string, value: boolean) => {
    setDisponibilites(prev => ({
      ...prev,
      [jourId]: { ...prev[jourId as keyof typeof prev], disponible: value }
    }));
  };

  const updateHeure = (jourId: string, type: "debut" | "fin", value: string) => {
    setDisponibilites(prev => ({
      ...prev,
      [jourId]: { ...prev[jourId as keyof typeof prev], [type]: value }
    }));
  };

  const quickSelect = (jourId: string, slot: string) => {
    let debut = "08:30";
    let fin = "20:30";
    if (slot === "matin") { debut = "08:30"; fin = "14:00"; }
    if (slot === "aprem") { debut = "14:00"; fin = "20:30"; }
    if (slot === "soir") { debut = "17:00"; fin = "20:30"; }
    if (slot === "journee") { debut = "08:30"; fin = "20:30"; }
    
    setDisponibilites(prev => ({
      ...prev,
      [jourId]: { disponible: true, debut, fin }
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-4">
      <div className="max-w-lg mx-auto">
        
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-500 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 shadow-lg">
            📅
          </div>
          <h1 className="text-2xl font-bold text-slate-800">BaggPlanning</h1>
          <p className="text-slate-500 text-sm">Espace Employe</p>
          
          <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full mt-3 shadow">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-500 rounded-lg flex items-center justify-center text-white text-xs font-bold">
              AN
            </div>
            <div className="text-left">
              <p className="font-semibold text-slate-800 text-sm">Anas</p>
              <p className="text-slate-500 text-xs">Etudiant</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="grid grid-cols-4 gap-2 mb-5">
          {[
            { id: "disponibilites", icon: "✋", label: "Mes dispos" },
            { id: "conge", icon: "📋", label: "Demande" },
            { id: "planning", icon: "📅", label: "Planning" },
            { id: "historique", icon: "📜", label: "Historique" },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setOnglet(tab.id)}
              className={`p-3 rounded-xl text-center transition-all ${
                onglet === tab.id
                  ? "bg-gradient-to-br from-slate-700 to-slate-800 text-white"
                  : "bg-white text-slate-600 border-2 border-slate-200"
              }`}
            >
              <span className="text-xl block mb-1">{tab.icon}</span>
              <span className="text-xs font-semibold">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* VUE DISPONIBILITES */}
        {onglet === "disponibilites" && (
          <div className="bg-white rounded-3xl p-6 shadow-lg">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 text-center mb-5">
              <p className="text-blue-600 text-xs font-semibold uppercase tracking-wide">Saisie des disponibilites</p>
              <p className="text-slate-800 text-lg font-bold mt-1">Semaine du 20 au 25 janvier 2025</p>
              <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-lg text-sm font-medium mt-2">
                ⏰ Date limite : Dimanche 19 janvier a 20h
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-4 mb-5 flex gap-3">
              <span className="text-xl">💡</span>
              <div>
                <p className="font-semibold text-blue-800 text-sm">Comment ca marche ?</p>
                <p className="text-blue-700 text-xs mt-1">Indiquez vos disponibilites pour chaque jour. Si vous etes disponible, precisez vos horaires.</p>
              </div>
            </div>

            {/* Liste des jours */}
            {jours.map(jour => (
              <div key={jour.id} className="border border-slate-200 rounded-xl mb-3 overflow-hidden">
                <div className="bg-slate-50 px-4 py-3 flex justify-between items-center border-b border-slate-200">
                  <span className="font-semibold text-slate-800">{jour.nom}</span>
                  <span className="text-slate-500 text-sm">{jour.date}</span>
                </div>
                <div className="p-4">
                  <div className="flex gap-2 mb-3">
                    <button
                      onClick={() => toggleDispo(jour.id, true)}
                      className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all border-2 ${
                        disponibilites[jour.id as keyof typeof disponibilites].disponible
                          ? "bg-green-50 border-green-400 text-green-700"
                          : "bg-white border-slate-200 text-slate-500"
                      }`}
                    >
                      ✓ Disponible
                    </button>
                    <button
                      onClick={() => toggleDispo(jour.id, false)}
                      className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all border-2 ${
                        !disponibilites[jour.id as keyof typeof disponibilites].disponible
                          ? "bg-red-50 border-red-400 text-red-700"
                          : "bg-white border-slate-200 text-slate-500"
                      }`}
                    >
                      ✗ Pas dispo
                    </button>
                  </div>

                  {disponibilites[jour.id as keyof typeof disponibilites].disponible && (
                    <>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex-1">
                          <label className="text-xs text-slate-500 mb-1 block">A partir de</label>
                          <select
                            value={disponibilites[jour.id as keyof typeof disponibilites].debut}
                            onChange={(e) => updateHeure(jour.id, "debut", e.target.value)}
                            className="w-full p-2 border border-slate-200 rounded-lg text-sm"
                          >
                            {heuresDebut.map(h => (
                              <option key={h} value={h}>{h.replace(":", "h")}</option>
                            ))}
                          </select>
                        </div>
                        <span className="text-slate-300 mt-5">→</span>
                        <div className="flex-1">
                          <label className="text-xs text-slate-500 mb-1 block">Jusqu a</label>
                          <select
                            value={disponibilites[jour.id as keyof typeof disponibilites].fin}
                            onChange={(e) => updateHeure(jour.id, "fin", e.target.value)}
                            className="w-full p-2 border border-slate-200 rounded-lg text-sm"
                          >
                            {heuresFin.map(h => (
                              <option key={h} value={h}>{h.replace(":", "h")}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <button onClick={() => quickSelect(jour.id, "matin")} className="px-3 py-1 bg-slate-100 rounded-lg text-xs text-slate-600 hover:bg-slate-200">Matin</button>
                        <button onClick={() => quickSelect(jour.id, "aprem")} className="px-3 py-1 bg-slate-100 rounded-lg text-xs text-slate-600 hover:bg-slate-200">Apres-midi</button>
                        <button onClick={() => quickSelect(jour.id, "soir")} className="px-3 py-1 bg-slate-100 rounded-lg text-xs text-slate-600 hover:bg-slate-200">Soir</button>
                        <button onClick={() => quickSelect(jour.id, "journee")} className="px-3 py-1 bg-slate-100 rounded-lg text-xs text-slate-600 hover:bg-slate-200">Journee</button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}

            <button
              onClick={() => showToast("Disponibilites enregistrees !")}
              className="w-full py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all mt-2"
            >
              ✓ Enregistrer mes disponibilites
            </button>
          </div>
        )}

        {/* VUE DEMANDE */}
        {onglet === "conge" && (
          <div className="bg-white rounded-3xl p-6 shadow-lg">
            <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              📋 Nouvelle demande
            </h2>

            <div className="mb-5">
              <label className="block font-semibold text-slate-800 text-sm mb-2">Type de demande</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: "🏖️", label: "Conge" },
                  { icon: "🔄", label: "Echange" },
                  { icon: "🏥", label: "Maladie" },
                  { icon: "📝", label: "Autre" },
                ].map((type, i) => (
                  <button key={type.label} className={`p-4 border-2 rounded-xl text-center transition-all ${i === 0 ? "border-green-400 bg-green-50" : "border-slate-200 bg-white"}`}>
                    <span className="text-2xl block mb-1">{type.icon}</span>
                    <span className="font-semibold text-slate-800 text-sm">{type.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-5">
              <label className="block font-semibold text-slate-800 text-sm mb-1">Date(s) concernee(s)</label>
              <p className="text-slate-500 text-xs mb-2">Selectionnez la ou les dates</p>
              <div className="flex gap-3 items-end">
                <div className="flex-1">
                  <label className="text-xs text-slate-500 mb-1 block">Du</label>
                  <input type="date" defaultValue="2025-01-24" className="w-full p-3 border-2 border-slate-200 rounded-xl" />
                </div>
                <span className="text-slate-300 pb-3">→</span>
                <div className="flex-1">
                  <label className="text-xs text-slate-500 mb-1 block">Au</label>
                  <input type="date" defaultValue="2025-01-24" className="w-full p-3 border-2 border-slate-200 rounded-xl" />
                </div>
              </div>
            </div>

            <div className="mb-5">
              <label className="block font-semibold text-slate-800 text-sm mb-2">Creneau horaire</label>
              <div className="grid grid-cols-3 gap-2">
                {["Journee entiere", "Matin", "Apres-midi"].map((slot, i) => (
                  <button key={slot} className={`p-3 border-2 rounded-xl text-sm font-medium transition-all ${i === 0 ? "border-green-400 bg-green-50 text-green-700" : "border-slate-200 text-slate-600"}`}>
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-5">
              <label className="block font-semibold text-slate-800 text-sm mb-1">Motif</label>
              <p className="text-slate-500 text-xs mb-2">Expliquez brievement la raison</p>
              <textarea className="w-full p-3 border-2 border-slate-200 rounded-xl min-h-24" placeholder="Ex: RDV medical, examen a la fac..."></textarea>
            </div>

            <div className="bg-blue-50 rounded-xl p-4 mb-5 flex gap-3">
              <span className="text-xl">ℹ️</span>
              <div>
                <p className="font-semibold text-blue-800 text-sm">Que se passe-t-il ensuite ?</p>
                <p className="text-blue-700 text-xs mt-1">Votre demande sera transmise a la titulaire qui cherchera un remplacant.</p>
              </div>
            </div>

            <button
              onClick={() => showToast("Demande envoyee !")}
              className="w-full py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl shadow-lg"
            >
              📤 Envoyer ma demande
            </button>
          </div>
        )}

        {/* VUE PLANNING */}
        {onglet === "planning" && (
          <div className="bg-white rounded-3xl p-6 shadow-lg">
            <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              📅 Mon planning cette semaine
            </h2>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 text-center mb-5">
              <p className="text-blue-600 text-xs font-semibold uppercase">Semaine en cours</p>
              <p className="text-slate-800 text-lg font-bold mt-1">13 - 18 janvier 2025</p>
            </div>

            {[
              { jour: "Lundi", horaire: "17h00 - 20h30", travaille: true },
              { jour: "Mardi", horaire: "17h00 - 20h30", travaille: true },
              { jour: "Mercredi", horaire: "Pas prevu", travaille: false },
              { jour: "Jeudi", horaire: "Pas prevu", travaille: false },
              { jour: "Vendredi", horaire: "14h00 - 20h30", travaille: true },
              { jour: "Samedi", horaire: "8h30 - 14h00", travaille: true },
            ].map(item => (
              <div key={item.jour} className="flex items-center py-3 border-b border-slate-100 last:border-0">
                <span className="w-24 font-semibold text-slate-800 text-sm">{item.jour}</span>
                <span className={`px-4 py-2 rounded-lg text-sm font-medium ${item.travaille ? "bg-gradient-to-r from-green-500 to-green-600 text-white" : "bg-slate-100 text-slate-400"}`}>
                  {item.horaire}
                </span>
              </div>
            ))}

            <div className="mt-5 p-4 bg-green-50 rounded-xl border border-green-200">
              <p className="font-semibold text-green-700 text-sm">📊 Cette semaine</p>
              <p className="text-green-600 text-2xl font-bold">17h30 prevues</p>
            </div>
          </div>
        )}

        {/* VUE HISTORIQUE */}
        {onglet === "historique" && (
          <div className="bg-white rounded-3xl p-6 shadow-lg">
            <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              📜 Historique des demandes
            </h2>

            {[
              { type: "🏖️ Conge", date: "8 janvier 2025", status: "approved", details: "Vendredi 10 janvier (apres-midi)", motif: "Examen a la fac", note: "Remplace par Nicolas" },
              { type: "🔄 Echange", date: "2 janvier 2025", status: "approved", details: "Samedi 4 janvier", motif: "Echange avec Celya", note: null },
              { type: "🏖️ Conge", date: "15 decembre 2024", status: "rejected", details: "Samedi 21 decembre", motif: "Fete de famille", note: "Aucun remplacant disponible" },
            ].map((item, i) => (
              <div key={i} className="border border-slate-200 rounded-xl p-4 mb-3">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-semibold text-slate-800">{item.type}</p>
                    <p className="text-slate-500 text-xs">Demande le {item.date}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-lg text-xs font-semibold ${
                    item.status === "approved" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  }`}>
                    {item.status === "approved" ? "✓ Approuve" : "✗ Refuse"}
                  </span>
                </div>
                <div className="text-sm text-slate-600">
                  <p><strong>Date :</strong> {item.details}</p>
                  <p><strong>Motif :</strong> {item.motif}</p>
                  {item.note && (
                    <p className={`mt-1 ${item.status === "approved" ? "text-green-600" : "text-red-600"}`}>
                      → {item.note}
                    </p>
                  )}
                </div>
              </div>
            ))}

            <p className="text-center text-slate-400 text-xs mt-4">Affichage des 3 dernieres demandes</p>
          </div>
        )}

        {/* Lien retour */}
        <a href="/" className="block text-center mt-6 text-slate-500 hover:text-slate-700">
          ← Retour a l accueil
        </a>
      </div>

      {/* Toast */}
      {toast.visible && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-slate-700 to-slate-800 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2">
          <span>✓</span>
          <span>{toast.message}</span>
        </div>
      )}
    </div>
  );
}