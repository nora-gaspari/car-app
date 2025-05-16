import React, { createContext, useContext, useReducer } from "react";

const VehicleContext = createContext();

const initialState = {
  vehicles: [],
  loading: false,
  error: null,
  favorites: [],
};

function vehicleReducer(state, action) {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true, error: null };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, vehicles: action.payload };
    case "FETCH_ERROR":
      return { ...state, loading: false, error: action.payload };
    case "CLEAR":
      return { ...state, vehicles: [], loading: false, error: null };
    case "ADD_FAVORITE":
      if (state.favorites.some((v) => v.Model_ID === action.payload.Model_ID))
        return state;
      return { ...state, favorites: [...state.favorites, action.payload] };
    case "REMOVE_FAVORITE":
      return {
        ...state,
        favorites: state.favorites.filter((v) => v.Model_ID !== action.payload),
      };
    case "CLEAR_FAVORITES":
      return { ...state, favorites: [] };
    default:
      return state;
  }
}

export function VehicleProvider({ children }) {
  const [state, dispatch] = useReducer(vehicleReducer, initialState);

  const fetchVehicles = async (make, model = "") => {
    if (!make) {
      dispatch({ type: "FETCH_ERROR", payload: "A marca é obrigatória." });
      return;
    }

    dispatch({ type: "FETCH_START" });

    try {
      const res = await fetch(
        `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMake/${make}?format=json`
      );
      const json = await res.json();
      let results = Array.isArray(json.Results) ? json.Results : [];

      if (model) {
        const term = model.toLowerCase();
        results = results.filter((v) =>
          v.Model_Name.toLowerCase().includes(term)
        );
      }

      dispatch({ type: "FETCH_SUCCESS", payload: results });
    } catch (err) {
      dispatch({ type: "FETCH_ERROR", payload: "Erro ao buscar modelos." });
    }
  };

  const clearVehicles = () => dispatch({ type: "CLEAR" });

  const addFavorite = (vehicle) =>
    dispatch({ type: "ADD_FAVORITE", payload: vehicle });

  const removeFavorite = (modelId) =>
    dispatch({ type: "REMOVE_FAVORITE", payload: modelId });

  const clearFavorites = () => dispatch({ type: "CLEAR_FAVORITES" });

  return (
    <VehicleContext.Provider
      value={{
        ...state,
        fetchVehicles,
        clearVehicles,
        addFavorite,
        removeFavorite,
        clearFavorites,
        dispatch,
      }}
    >
      {children}
    </VehicleContext.Provider>
  );
}

export function useVehicleContext() {
  const context = useContext(VehicleContext);
  if (!context) {
    throw new Error(
      "useVehicleContext deve ser usado dentro de VehicleProvider"
    );
  }
  return context;
}
