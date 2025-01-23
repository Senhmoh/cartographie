import React, { useEffect, useState } from "react";
import { useParams, useNavigate} from "react-router-dom";
import { fetchChecklistDetails, updateChecklistTitle, updateChecklistImpactStatut } from "../../services/api";
import EditableTitle from "./EditableTitle";

const ChecklistDetails = () => {
    const { id } = useParams(); // Récupère l'ID depuis l'URL
    const [checklist, setChecklist] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); // Assurez-vous d'utiliser useNavigate correctement



    const renderStars = (importance) => {
        const fullStars = Array(importance).fill(<i className="bi bi-star-fill"></i>);
        const emptyStars = Array(3 - importance).fill(<i className="bi bi-star"></i>);
        return [...fullStars, ...emptyStars];
    };

    const statutIcons = {
        "Non commencé": "bi-circle",
        "Planifié": "bi-calendar",
        "En attente": "bi-hourglass-split",
        "En cours": "bi-arrow-repeat",
        "Suspendu": "bi-pause-circle",
        "Terminé": "bi-check-circle",
      };

      useEffect(() => {
        const loadChecklist = async () => {
            setLoading(true);
            try {
                const data = await fetchChecklistDetails(id);
                setChecklist(data);
            } catch (error) {
                console.error("Erreur lors de la récupération de la checklist :", error);
            } finally {
                setLoading(false);
            }
        };
    
        loadChecklist();
    }, [id]);
    

    const handleSaveTitle = async (newTitle) => {
        try {
          await updateChecklistTitle(id, newTitle);
          setChecklist((prev) => ({ ...prev, nom_checklist: newTitle }));
        } catch (error) {
          console.error("Erreur lors de la mise à jour du titre :", error);
        }
      };
    
    const handleStatutChange = async (checklistImpactId, newStatut) => {
  // Mise à jour immédiate du frontend
  setChecklist((prev) => ({
    ...prev,
    impacts: prev.impacts.map((impact) =>
      impact.id_checklist_impacts === checklistImpactId
        ? { ...impact, statut: newStatut }
        : impact
    ),
  }));

  try {
    // Mise à jour backend
    await updateChecklistImpactStatut(checklistImpactId, newStatut);
  } catch (error) {
    console.error("Erreur lors de la mise à jour du statut :", error);
    // Optionnel : Revenir à l'état précédent en cas d'erreur
    setChecklist((prev) => ({
      ...prev,
      impacts: prev.impacts.map((impact) =>
        impact.id_checklist_impacts === checklistImpactId
          ? { ...impact, statut: impact.statut } // Restaurer le statut précédent
          : impact
      ),
    }));
  }
};


    if (loading) return <p>Chargement...</p>;
    if (!checklist) return <p>Checklist introuvable.</p>;

    return (
        <div className="checklist-card-container">
                 <div className="back-button" onClick={() => navigate(`/profil`)}>
        <i className="bi bi-arrow-left"></i>
      </div>
         <EditableTitle initialTitle={checklist.nom_checklist} onSave={handleSaveTitle} />
          <div className="impact-card-underline"></div>
          {checklist.impacts.map((impact) => {          
            return (
              <div key={impact.id_impact} className="impact-card">
                <p>
                  <strong>Thématique :</strong> {impact.thematique_nom}
                </p>
                <p>
                  <strong>Impact :</strong> {impact.impact}
                </p>
                <div className="impact-importance">
                            <strong>Importance :</strong> {renderStars(impact.importance)}
                </div>
                <div className="statut-container">
  {Object.keys(statutIcons).map((statut) => (
    <label key={statut} className="statut-option">
<input
  type="checkbox"
  name={`statut-${impact.id_impact}-${impact.id_checklist_impacts}`}
  value={statut}
  checked={impact.statut === statut}
  onChange={() => handleStatutChange(impact.id_checklist_impacts, statut)}
/>


      <i className={`bi ${statutIcons[statut]}`}></i> {statut}
    </label>
  ))}
</div>

              </div>
            );
          })}
        </div>
      );
      
};

export default ChecklistDetails;
