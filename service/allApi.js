import { commonApi } from "./commonApi"
import { serverUrl } from "./serviceUrl"

export const salesReportApi =async(reqBody,reqHeader)=>{
    return await commonApi('POST',`${serverUrl}/dailyIncome`,reqBody,reqHeader)
}

// get sales report

export const allSalesReportApi =async()=>{
    return await commonApi('GET',`${serverUrl}/dailyIncome`)
}
export const deleteSalesReportApi =async()=>{
  return await commonApi('DELETE',`${serverUrl}/dailyIncome`)
}

// worker report
  export const attendenceAddApi=async(reqBody)=>{
    return await commonApi('POST',`${serverUrl}/workers`,reqBody)
  }

  export const getAttendenceApi =async()=>{
    return await commonApi('GET',`${serverUrl}/workers`)
}
export const addExpenseApi =async(reqBody,reqHeader)=>{
    return await commonApi('POST',`${serverUrl}/expenses`,reqBody,reqHeader)
}
export const getExpenseApi =async()=>{
  return await commonApi('GET',`${serverUrl}/expenses`)
}
export const deleteExpenseApi =async()=>{
  return await commonApi('DELETE',`${serverUrl}/expenses`)
}
export const addProfileApi =async(reqBody,reqHeader)=>{
  return await commonApi('POST',`${serverUrl}/workerProfile`,reqBody,reqHeader)
}

// get sales report

export const getProfileApi =async()=>{
  return await commonApi('GET',`${serverUrl}/workerProfile`)
}

// monthly sales
export const addMonthlySalesApi =async(reqBody,reqHeader)=>{
  return await commonApi('POST',`${serverUrl}/monthlySales`,reqBody,reqHeader)
}

export const getMonthlySalesApi =async()=>{
  return await commonApi('GET',`${serverUrl}/monthlySales`)
}

// monthly expesnes
export const addMonthlyExpenseApi =async(reqBody,reqHeader)=>{
  return await commonApi('POST',`${serverUrl}/monthlyExpense`,reqBody,reqHeader)
}

export const getMonthlyExpenseApi =async()=>{
  return await commonApi('GET',`${serverUrl}/monthlyExpense`)
}

// soft copies
export const addCopyApi =async(reqBody,reqHeader)=>{
  return await commonApi('POST',`${serverUrl}/copies`,reqBody,reqHeader)
}
export const getCopyApi =async()=>{
  return await commonApi('GET',`${serverUrl}/copies`)
}

// register login section

export const registerApi = async(reqBody)=>{
  return await commonApi('POST',`${serverUrl}/register`,reqBody)
}

 export const LoginApi = async(reqBody)=>{
  return await commonApi('POST',`${serverUrl}/loging`,reqBody)
}


// updating content:
export const updateSalesApi = async(id,reqBody,reqHeader)=>{

  return await commonApi('PUT',`${serverUrl}/update/${id}`,reqBody,reqHeader)

}

export const updateExpenseApi = async(id,reqBody,reqHeader)=>{

  return await commonApi('PUT',`${serverUrl}/updates/${id}`,reqBody,reqHeader)

}
export const updateAttendenceApi = async(id,reqBody)=>{

  return await commonApi('PUT',`${serverUrl}/updatess/${id}`,reqBody)

}
export const deleteSoftApi =async(id)=>{
  return await commonApi('DELETE',`${serverUrl}/deleteSoft/${id}`)
}
export const deleteProfileApi =async(id)=>{
  return await commonApi('DELETE',`${serverUrl}/deleteProfile/${id}`)
}
export const updateProfileApi = async(id,reqBody,reqHeader)=>{

  return await commonApi('PUT',`${serverUrl}/updatingProfile/${id}`,reqBody,reqHeader)

}