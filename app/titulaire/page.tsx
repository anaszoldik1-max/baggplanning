"use client";
import { useState } from "react";

export default function TitulairePage() {
  const [onglet, setOnglet] = useState("dispos");
  const [toast, setToast] = useState({ visible: false, message: "" });
  const [jourActif, setJourActif] = useState("lundi");

  const showToast = (message: string) => {
    setToast({ visible: true, message });
    setTimeout(() => setToast({ visible: false, message: "" }), 3000);
  };

  const etudiants = [
    { nom: "Celya", initiales: "CE", dispos: ["17h-20h30", "-", "14h-20h30", "-", "17h-20h30", "14h-19h30"], statut: "ok" },
    { nom: "Anas", initiales: "AN", dispos: ["17h-20h30", "17h-20h30", "-", "-", "14h-20h30", "8h30-14h"], statut: "ok" },
    { nom: "Nicolas", initiales: "NI", dispos: ["14h-20h30", "-", "17h-20h30", "-", "-", "14h-19h30"], statut: "ok" },
    { nom: "Maissa", initiales: "MA", dispos: ["17h-20h30", "-", "-", "14h-20h30", "17h-20h30", "14h-19h30"], statut: "ok" },
    { nom: "Robin", initiales: "RO", dispos: ["8h30-14h", "-", "8h30-20h30", "-", "-", "8h30-14h"], statut: "ok" },
    { nom: "Aurelien", initiales: "AU", dispos: ["-", "14h-20h30", "-", "17h-20h30", "14h-20h30", "-"], statut: "ok" },
    { nom: "Kenza", initiales: "KE", dispos: ["-", "14h-20h30", "14h-20h30", "17h-20h30", "-", "-"], statut: "ok" },
    { nom: "Jean-Baptiste", initiales: "JB", dispos: ["?", "?", "?", "?", "?", "?"], statut: "pending" },
    { nom: "Matteo", initiales: "MT", dispos: ["?", "?", "?", "?", "?", "?"], statut: "pending" },
  ];

  const jours = ["Lun 20", "Mar 21", "Mer 22", "Jeu 23", "Ven 24", "Sam 25"];
  const joursTimeline = [
    { id: "lundi", nom: "Lundi", date: "20 jan", statut: "ok" },
    { id: "mardi", nom: "Mardi", date: "21 jan", statut: "warning" },
    { id: "mercredi", nom: "Mercredi", date: "22 jan", statut: "warning" },
    { id: "jeudi", nom: "Jeudi", date: "23 jan", statut: "warning" },
    { id: "vendredi", nom: "Vendredi", date: "24 jan", statut: "ok" },
    { id: "samedi", nom: "Samedi", date: "25 jan", statut: "warning" },
  ];

  const demandes = [
    { nom: "Ludovic", initiales: "LU", role: "Preparateur", type: "Conge", typeIcon: "🏖️", date: "Vendredi 24 janvier", creneau: "Journee entiere", motif: "RDV medical important", urgent: true, color: "blue" },
    { nom: "Sarah", initiales: "SA", role: "Pharmacien", type: "Echange", typeIcon: "🔄", date: "Samedi 25 janvier", creneau: "Matin", motif: "Echange avec Laura", urgent: false, color: "green" },
    { nom: "Celya", initiales: "CE", role: "Etudiant", type: "Maladie", typeIcon: "🏥", date: "Mercredi 22 janvier", creneau: "Apres-midi", motif: "Grippe - arret medecin", urgent: false, color: "orange" },
  ];

  const planningMatin = [
    { nom: "Lina", initiales: "LI", role: "Pharmacien", debut: 0, duree: 100, color: "green" },
    { nom: "Maryam", initiales: "MA", role: "Pharmacien", debut: 0, duree: 100, color: "green" },
    { nom: "Dilek", initiales: "DI", role: "Preparateur", debut: 0, duree: 100, color: "blue" },
    { nom: "Manon", initiales: "MN", role: "Apprenti", debut: 0, duree: 63, color: "purple" },
    { nom: "Robin", initiales: "RO", role: "Etudiant", debut: 0, duree: 100, color: "orange" },
  ];

  const planningAprem = [
    { nom: "Laura", initiales: "LA", role: "Pharmacien", debut: 0, duree: 100, color: "green" },
    { nom: "Sarah", initiales: "SA", role: "Pharmacien", debut: 0, duree: 100, color: "green" },
    { nom: "Hamide", initiales: "HA", role: "Preparateur", debut: 0, duree: 100, color: "blue" },
    { nom: "Ludovic", initiales: "LU", role: "Preparateur", debut: 0, duree: 100, color: "blue" },
    { nom: "Nicolas", initiales: "NI", role: "Etudiant", debut: 0, duree: 100, color: "orange" },
  ];

  const getColorClass = (color: string) => {
    const colors: Record<string, string> = {
      green: "from-green-400 to-green-500",
      blue: "from-blue-400 to-blue-500",
      orange: "from-orange-400 to-orange-500",
      purple: "from-purple-400 to-purple-500",
      pink: "from-pink-400 to-pink-500",
    };
    return colors[color] || colors.green;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200">
      
      {/* Header */}
      <header className="bg-gradient-to-r from-slate-800 to-slate-700 text-white p-4 shadow-lg">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="/" className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-500 rounded-xl flex items-center justify-center text-2xl shadow-lg">
              📅
            </a>
            <div>
              <h1 className="text-xl font-bold">BaggPlanning</h1>
              <p className="text-slate-300 text-sm">Espace Titulaire</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-slate-300">Semaine du</p>
              <p className="font-semibold">20 - 25 Janvier 2025</p>
            </div>
            <div className="relative">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-xl cursor-pointer">
                🔔
              </div>
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold">
                5
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex gap-2 p-2">
          {[
            { id: "dispos", icon: "✋", label: "Disponibilites", badge: "7/9" },
            { id: "demandes", icon: "📋", label: "Demandes", badge: "3" },
            { id: "planning", icon: "📅", label: "Planning", badge: null },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setOnglet(tab.id)}
              className={`px-4 py-2 rounded-xl font-medium transition-all flex items-center gap-2 ${
                onglet === tab.id
                  ? "bg-gradient-to-r from-green-500 to-green-600 text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
              {tab.badge && (
                <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                  onglet === tab.id ? "bg-white/20" : "bg-red-100 text-red-600"
                }`}>
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </nav>

      <main className="max-w-6xl mx-auto p-6">

        {/* VUE DISPONIBILITES */}
        {onglet === "dispos" && (
          <div>
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-white rounded-xl p-4 shadow flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-2xl">✓</div>
                <div>
                  <p className="text-2xl font-bold text-slate-800">7</p>
                  <p className="text-slate-500 text-sm">Ont repondu</p>
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow flex items-center gap-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center text-2xl">⏳</div>
                <div>
                  <p className="text-2xl font-bold text-slate-800">2</p>
                  <p className="text-slate-500 text-sm">En attente</p>
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow flex items-center gap-4">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center text-2xl">⏰</div>
                <div>
                  <p className="text-2xl font-bold text-slate-800">2j 4h</p>
                  <p className="text-slate-500 text-sm">Avant deadline</p>
                </div>
              </div>
            </div>

            {/* Tableau */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-4 border-b border-slate-200 flex justify-between items-center">
                <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  📊 Matrice des disponibilites
                </h2>
                <button
                  onClick={() => showToast("Rappel envoye a Jean-Baptiste et Matteo")}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600"
                >
                  📤 Envoyer rappel
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="text-left p-4 font-semibold text-slate-700">Etudiant</th>
                      {jours.map(jour => (
                        <th key={jour} className="p-4 font-semibold text-slate-700 text-center">{jour}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {etudiants.map((etudiant, i) => (
                      <tr key={etudiant.nom} className={`border-t border-slate-100 hover:bg-slate-50 ${etudiant.statut === "pending" ? "bg-yellow-50" : ""}`}>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm ${etudiant.statut === "pending" ? "bg-gradient-to-br from-yellow-400 to-yellow-500" : "bg-gradient-to-br from-orange-400 to-orange-500"}`}>
                              {etudiant.initiales}
                            </div>
                            <div>
                              <p className="font-medium text-slate-800">{etudiant.nom}</p>
                              <p className={`text-xs ${etudiant.statut === "ok" ? "text-green-500" : "text-yellow-600"}`}>
                                {etudiant.statut === "ok" ? "✓ Rempli" : "⏳ En attente"}
                              </p>
                            </div>
                          </div>
                        </td>
                        {etudiant.dispos.map((dispo, j) => (
                          <td key={j} className="p-4 text-center">
                            {dispo === "-" ? (
                              <span className="text-slate-300">-</span>
                            ) : dispo === "?" ? (
                              <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-lg text-sm font-medium">?</span>
                            ) : (
                              <span className="bg-green-100 text-green-700 px-2 py-1 rounded-lg text-sm font-medium">{dispo}</span>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Resume */}
              <div className="p-4 bg-green-50 border-t border-green-100">
                <p className="font-semibold text-green-700 text-sm mb-2">📊 Resume par jour</p>
                <div className="flex gap-3 flex-wrap">
                  {["Lun: 4 dispo", "Mar: 3 dispo", "Mer: 4 dispo", "Jeu: 3 dispo", "Ven: 4 dispo", "Sam: 5 dispo"].map(item => (
                    <span key={item} className="bg-white px-3 py-1 rounded-lg text-sm text-slate-700">{item}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VUE DEMANDES */}
        {onglet === "demandes" && (
          <div>
            <h2 className="text-xl font-bold text-slate-800 mb-4">📋 Demandes a traiter</h2>

            {demandes.map((demande, i) => (
              <div key={i} className={`bg-white rounded-2xl shadow-lg mb-4 overflow-hidden ${demande.urgent ? "border-2 border-yellow-400" : ""}`}>
                <div className={`p-4 flex justify-between items-center ${demande.urgent ? "bg-yellow-50" : "bg-slate-50"} border-b border-slate-200`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold bg-gradient-to-br ${getColorClass(demande.color)}`}>
                      {demande.initiales}
                    </div>
                    <div>
                      <p className="font-bold text-slate-800">{demande.nom}</p>
                      <p className="text-slate-500 text-sm">{demande.role}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-lg text-sm font-medium ${
                    demande.type === "Conge" ? "bg-blue-100 text-blue-700" :
                    demande.type === "Echange" ? "bg-purple-100 text-purple-700" :
                    "bg-red-100 text-red-700"
                  }`}>
                    {demande.typeIcon} {demande.type}
                  </span>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="bg-slate-50 p-3 rounded-xl">
                      <p className="text-xs text-slate-500 uppercase mb-1">Date</p>
                      <p className="font-semibold text-slate-800">{demande.date}</p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-xl">
                      <p className="text-xs text-slate-500 uppercase mb-1">Creneau</p>
                      <p className="font-semibold text-slate-800">{demande.creneau}</p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-xl">
                      <p className="text-xs text-slate-500 uppercase mb-1">Demande le</p>
                      <p className="font-semibold text-slate-800">16 jan a 14h32</p>
                    </div>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl mb-4">
                    <p className="text-xs text-slate-500 uppercase mb-1">Motif</p>
                    <p className="text-slate-700 italic">"{demande.motif}"</p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => showToast("Recherche de remplacant...")}
                      className="flex-1 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl"
                    >
                      🔍 Trouver remplacant
                    </button>
                    <button className="px-6 py-3 bg-slate-200 text-slate-700 font-semibold rounded-xl">
                      ✗ Refuser
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VUE PLANNING */}
        {onglet === "planning" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-bold text-slate-800">📅 Creer le planning</h2>
                <p className="text-slate-500 text-sm">Semaine du 20 au 25 janvier 2025</p>
              </div>
              <div className="flex gap-3">
                <button className="px-4 py-2 bg-white text-slate-700 rounded-xl font-medium border border-slate-200">
                  🔄 Reinitialiser
                </button>
                <button
                  onClick={() => showToast("Planning valide et publie !")}
                  className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-medium"
                >
                  ✓ Valider et publier
                </button>
              </div>
            </div>

            {/* Selecteur de jour */}
            <div className="grid grid-cols-6 gap-2 mb-6">
              {joursTimeline.map(jour => (
                <button
                  key={jour.id}
                  onClick={() => setJourActif(jour.id)}
                  className={`p-4 rounded-xl text-center transition-all ${
                    jourActif === jour.id
                      ? "bg-gradient-to-br from-slate-700 to-slate-800 text-white"
                      : "bg-white border-2 border-slate-200"
                  }`}
                >
                  <p className={`font-semibold ${jourActif === jour.id ? "text-white" : "text-slate-800"}`}>{jour.nom}</p>
                  <p className={`text-xs ${jourActif === jour.id ? "text-slate-300" : "text-slate-500"}`}>{jour.date}</p>
                  <span className={`inline-block mt-2 px-2 py-0.5 rounded-lg text-xs font-medium ${
                    jour.statut === "ok"
                      ? jourActif === jour.id ? "bg-white/20 text-white" : "bg-green-100 text-green-700"
                      : jourActif === jour.id ? "bg-white/20 text-yellow-300" : "bg-yellow-100 text-yellow-700"
                  }`}>
                    {jour.statut === "ok" ? "✓ Complet" : "⚠️ Alerte"}
                  </span>
                </button>
              ))}
            </div>

            {/* Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 flex gap-3">
              <span className="text-xl">💡</span>
              <div>
                <p className="font-semibold text-blue-800 text-sm">Comment ca marche ?</p>
                <p className="text-blue-700 text-xs">Les horaires fixes sont pre-remplis. Cliquez sur "+ Ajouter" pour assigner un etudiant disponible.</p>
              </div>
            </div>

            {/* MATIN */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-4">
              <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-xl flex items-center justify-center text-xl">🌅</div>
                  <span className="font-bold text-slate-800">MATIN (8h30 - 14h00)</span>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
                  ✓ 2 pharmaciens, 1 preparateur
                </span>
              </div>

              {/* Timeline header */}
              <div className="flex ml-36 mb-2">
                {["8h30", "9h", "10h", "11h", "12h", "13h", "14h"].map(h => (
                  <div key={h} className="flex-1 text-xs text-slate-500 font-medium">{h}</div>
                ))}
              </div>

              {/* Employes */}
              {planningMatin.map(emp => (
                <div key={emp.nom} className="flex items-center mb-2">
                  <div className="w-36 pr-4">
                    <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-lg">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold bg-gradient-to-br ${getColorClass(emp.color)}`}>
                        {emp.initiales}
                      </div>
                      <div>
                        <p className="font-medium text-slate-800 text-sm">{emp.nom}</p>
                        <p className="text-xs text-slate-500">{emp.role}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 h-10 relative">
                    <div
                      className={`absolute top-1 h-8 rounded-lg bg-gradient-to-r ${getColorClass(emp.color)} flex items-center px-3 text-white text-xs font-medium shadow-md`}
                      style={{ left: `${emp.debut}%`, width: `${emp.duree}%` }}
                    >
                      {emp.duree === 100 ? "8h30 - 14h00" : "8h30 - 12h00"}
                    </div>
                  </div>
                </div>
              ))}

              <button className="mt-4 w-full py-3 border-2 border-dashed border-slate-300 rounded-xl text-slate-500 font-medium hover:border-green-400 hover:text-green-600 transition-all">
                + Ajouter un etudiant
              </button>
            </div>

            {/* APRES-MIDI */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center text-xl">🌆</div>
                  <span className="font-bold text-slate-800">APRES-MIDI (14h00 - 20h30)</span>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
                  ✓ 2 pharmaciens, 2 preparateurs
                </span>
              </div>

              {/* Timeline header */}
              <div className="flex ml-36 mb-2">
                {["14h", "15h", "16h", "17h", "18h", "19h", "20h"].map(h => (
                  <div key={h} className="flex-1 text-xs text-slate-500 font-medium">{h}</div>
                ))}
              </div>

              {/* Employes */}
              {planningAprem.map(emp => (
                <div key={emp.nom} className="flex items-center mb-2">
                  <div className="w-36 pr-4">
                    <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-lg">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold bg-gradient-to-br ${getColorClass(emp.color)}`}>
                        {emp.initiales}
                      </div>
                      <div>
                        <p className="font-medium text-slate-800 text-sm">{emp.nom}</p>
                        <p className="text-xs text-slate-500">{emp.role}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 h-10 relative">
                    <div
                      className={`absolute top-1 h-8 rounded-lg bg-gradient-to-r ${getColorClass(emp.color)} flex items-center px-3 text-white text-xs font-medium shadow-md`}
                      style={{ left: "0%", width: "100%" }}
                    >
                      14h00 - 20h30
                    </div>
                  </div>
                </div>
              ))}

              <button className="mt-4 w-full py-3 border-2 border-dashed border-slate-300 rounded-xl text-slate-500 font-medium hover:border-green-400 hover:text-green-600 transition-all">
                + Ajouter un etudiant
              </button>
            </div>

            {/* Legende */}
            <div className="flex gap-6 mt-6 p-4 bg-slate-50 rounded-xl">
              {[
                { color: "green", label: "Pharmacien" },
                { color: "blue", label: "Preparateur" },
                { color: "purple", label: "Apprenti" },
                { color: "orange", label: "Etudiant" },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded bg-gradient-to-br ${getColorClass(item.color)}`}></div>
                  <span className="text-sm text-slate-600">{item.label}</span>
                </div>
              ))}
            </div>

            {/* Resume */}
            <div className="mt-6 bg-gradient-to-r from-slate-700 to-slate-800 rounded-2xl p-5 flex justify-between items-center">
              <div className="flex gap-8">
                <div className="text-center">
                  <p className="text-3xl font-bold text-white">10</p>
                  <p className="text-slate-400 text-sm">Personnes</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-white">4</p>
                  <p className="text-slate-400 text-sm">Pharmaciens</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-white">3</p>
                  <p className="text-slate-400 text-sm">Preparateurs</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-white">2</p>
                  <p className="text-slate-400 text-sm">Etudiants</p>
                </div>
              </div>
              <div className="flex gap-3">
                <button className="px-4 py-2 bg-white/10 text-white rounded-xl font-medium">
                  📄 Exporter PDF
                </button>
                <button
                  onClick={() => showToast("Journee validee !")}
                  className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-medium"
                >
                  ✓ Valider
                </button>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Toast */}
      {toast.visible && (
        <div className="fixed bottom-6 right-6 bg-gradient-to-r from-slate-700 to-slate-800 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 z-50">
          <span>✓</span>
          <span>{toast.message}</span>
        </div>
      )}
    </div>
  );
}