import axios from 'axios'

const API_BASE_URL = 'http://localhost:8000'

export const generateStudyMaterials = async (notes) => {
  const formData = new FormData()
  
  notes.forEach(note => {
    formData.append('notes', note)
  })
  
  const response = await axios.post(`${API_BASE_URL}/api/generate`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  
  return response.data
}

export const downloadStudyMaterials = async (data) => {
  const response = await axios.post(`${API_BASE_URL}/api/download`, data, {
    responseType: 'blob',
  })
  
  return response.data
}
