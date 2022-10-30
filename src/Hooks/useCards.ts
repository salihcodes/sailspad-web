import { useMutation, useQuery } from "react-query";
import {
  CheckShortName,
  CheckShortNameResponse,
  createCard,
  uploadMarker,
} from "../Interfaces/Cards";
import { API_URL, getAccessToken } from "./api";

export const createNewCard = () => {
  return useMutation<any, Error, any>("create-card", async (variables: any) => {
    const response = await fetch(`${API_URL}/card/`, {
      method: "POST",
      headers: {
        // "Content-type": "application/json",
        Authorization: getAccessToken(),
      },
      body: variables,
    });
    if (!response.ok) {
      throw new Error("Error in create card");
    }
    return response.json();
  });
};
export const useCheckShortname = () => {
  return useMutation<CheckShortNameResponse, Error, CheckShortName>(
    "check-shortname",
    async (variables: CheckShortName) => {
      const response = await fetch(`${API_URL}/card/check-short-name`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(variables),
      });
      if (!response.ok) {
        throw new Error("Username already exists!");
      }
      return response.json();
    }
  );
};

export const getUserCards = () => {
  return useQuery<any, Error>("get-user-cards", async () => {
    const response = await fetch(`${API_URL}/card`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: getAccessToken(),
      },
    });
    if (!response.ok) {
      throw new Error("Error in Cards fetching");
    }
    return response.json();
  });
};

export const getMarkers = () => {
  return useQuery<any, Error>("get-user-markers", async () => {
    const response = await fetch(`${API_URL}/card/marker`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: getAccessToken(),
      },
    });
    if (!response.ok) {
      throw new Error("Error in Markers fetching");
    }
    return response.json();
  });
};

export const uploadNewmarker = () => {
  return useMutation<any, Error, uploadMarker>(
    "upload-marker",
    async (variables: uploadMarker) => {
      const response = await fetch(`${API_URL}/card/marker`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: getAccessToken(),
        },
        body: JSON.stringify(variables),
      });
      if (!response.ok) {
        throw new Error("Error in marker upload");
      }
      return response.json();
    }
  );
};

// export const editCardRequest = () => {
//   return useMutation<any, Error, any>(
//     "edit-card-request",
//     async (variables: { _id: string }) => {
//       const response = await fetch(`${API_URL}/card/card-edit-request`, {
//         method: "POST",
//         headers: {
//           "Content-type": "application/json",
//           Authorization: getAccessToken(),
//         },
//         body: JSON.stringify(variables),
//       });
//       if (!response.ok) {
//         throw new Error("Error in sending edit request");
//       }
//       return response.json();
//     }
//   );
// };

export const editCard = () => {
  return useMutation<any, Error, any>("edit-card", async (variables: any) => {
    const { id, formData } = variables;
    const response = await fetch(`${API_URL}/card/${id}/edit`, {
      method: "PUT",
      headers: {
        // "Content-type": "application/json",
        Authorization: getAccessToken(),
      },
      body: formData,
    });
    if (!response.ok) {
      throw new Error("Error in editing card");
    }
    return response.json();
  });
};
export const deleteCard = () => {
  return useMutation<any, Error, any>("delete-card", async (variables: any) => {
    const { id } = variables;
    const response = await fetch(`${API_URL}/card/${id}/delete`, {
      method: "DELETE",
      headers: {
        // "Content-type": "application/json",
        Authorization: getAccessToken(),
      },
      // body: formData
    });
    if (!response.ok) {
      throw new Error("Error in editing card");
    }
    return response.json();
  });
};

// export const deleteCardRequest = () => {
//   return useMutation<any, Error, any>(
//     "delete-card-request",
//     async (variables: any) => {
//       const response = await fetch(`${API_URL}/card/card-deletion-request`, {
//         method: "POST",
//         headers: {
//           "Content-type": "application/json",
//           Authorization: getAccessToken(),
//         },
//         body: JSON.stringify(variables),
//       });
//       if (!response.ok) {
//         throw new Error("Error in editing card");
//       }
//       return response.json();
//     }
//   );
// };

// export const emailEditRequest = () => {
//   return useMutation<any, Error, any>(
//     "email-edit-request",
//     async (variables: { _id: string }) => {
//       const response = await fetch(`${API_URL}/cards/email-edit-request`, {
//         method: "POST",
//         headers: {
//           "Content-type": "application/json",
//           Authorization: getAccessToken(),
//         },
//         body: JSON.stringify(variables),
//       });
//       if (!response.ok) {
//         throw new Error("Error in sending email edit request");
//       }
//       return response.json();
//     }
//   );
// };

// export const downloadCardSheet = () => {
//   return useQuery<any, Error>("download-card-sheet", async () => {
//     const response = await fetch(`${API_URL}/cards/download-data`, {
//       method: "GET",
//       headers: {
//         // "Content-type": "application/json",
//         Authorization: getAccessToken(),
//       },
//     });
//     if (!response.ok) {
//       throw new Error("Error in Downloading Sheet");
//     }
//     return response;
//   });
// };
