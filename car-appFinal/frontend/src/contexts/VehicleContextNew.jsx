import React, { createContext, useContext, useReducer } from "react";
import { vehicleService } from "../services/api";

const VehicleContext = createContext();

const initialState = {
  vehicles: [],
  loading: false,
  error: null,
  favorites: JSON.parse(localStorage.getItem("favorites") || "[]"),
  pagination: null,
};

function vehicleReducer(state, action) {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true, error: null };
    case "FETCH_SUCCESS":
      return { 
        ...state, 
        loading: false, 
        vehicles: action.payload.vehicles,
        pagination: action.payload.pagination 
      };
    case "FETCH_ERROR":
      return { ...state, loading: false, error: action.payload };
    case "ADD_VEHICLE":
      return { 
        ...state, 
        vehicles: [action.payload, ...state.vehicles] 
      };
    case "CLEAR":
      return { ...state, vehicles: [], loading: false, error: null, pagination: null };
    case "ADD_FAVORITE":
      const newFavorites = [...state.favorites];
      if (!newFavorites.some(v => v._id === action.payload._id)) {
        newFavorites.push(action.payload);
        localStorage.setItem("favorites", JSON.stringify(newFavorites));
      }
      return { ...state, favorites: newFavorites };
    case "REMOVE_FAVORITE":
      const filteredFavorites = state.favorites.filter(v => v._id !== action.payload);
      localStorage.setItem("favorites", JSON.stringify(filteredFavorites));
      return { ...state, favorites: filteredFavorites };
    case "CLEAR_FAVORITES":
      localStorage.removeItem("favorites");
      return { ...state, favorites: [] };
    default:
      return state;
  }
}

export function VehicleProvider({ children }) {
  const [state, dispatch] = useReducer(vehicleReducer, initialState);

  const searchVehicles = async (filters = {}) => {
    dispatch({ type: "FETCH_START" });

    try {
      const response = await vehicleService.search(filters);
      dispatch({ type: "FETCH_SUCCESS", payload: response });
    } catch (error) {
      console.error("Erro ao buscar veículos:", error);
      dispatch({ 
        type: "FETCH_ERROR", 
        payload: error.response?.data?.message || "Erro ao buscar veículos" 
      });
    }
  };

  const addVehicle = async (vehicleData) => {
    try {
      const response = await vehicleService.create(vehicleData);
      dispatch({ type: "ADD_VEHICLE", payload: response.vehicle });
      return { success: true, vehicle: response.vehicle };
    } catch (error) {
      console.error("Erro ao adicionar veículo:", error);
      return {
        success: false,
        error: error.response?.data?.message || "Erro ao adicionar veículo"
      };
    }
  };

  const clearVehicles = () => dispatch({ type: "CLEAR" });

  const addFavorite = (vehicle) => {
    dispatch({ type: "ADD_FAVORITE", payload: vehicle });
  };

  const removeFavorite = (vehicleId) => {
    dispatch({ type: "REMOVE_FAVORITE", payload: vehicleId });
  };

  const clearFavorites = () => dispatch({ type: "CLEAR_FAVORITES" });

  const isFavorite = (vehicleId) => {
    return state.favorites.some(v => v._id === vehicleId);
  };

  return (
    <VehicleContext.Provider
      value={{
        ...state,
        searchVehicles,
        addVehicle,
        clearVehicles,
        addFavorite,
        removeFavorite,
        clearFavorites,
        isFavorite,
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
    throw new Error("useVehicleContext deve ser usado dentro de VehicleProvider");
  }
  return context;
}
