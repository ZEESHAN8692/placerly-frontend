import axiosInstance from "../api/axiosInstance"
import { create_asset_end, create_bankings_end, create_debt_end, create_executors_end, create_insurance_end, create_investments_end, create_utilities_end, dashboard_end, delelte_executors_end, delete_asset_end, delete_bankings_end, delete_debt_end, delete_insurance_end, delete_investments_end, delete_utilities_end,  executors_end,  get_asset_by_id_end, get_assets_end, get_bankings_by_id_end, get_bankings_end, get_debt_by_id_end, get_debts_end, get_insurance_by_id_end, get_insurance_end, get_investments_by_id_end, get_investments_end, get_Pricing_by_id_end, get_Pricings_end, get_totle_assets_value_end, get_totle_bankings_value_end, get_totle_investments_value_end, get_utilities_by_id_end, get_utilities_end, login_end, profile_end, register_end, reset_password_end, update_asset_end, update_bankings_end, update_debt_end, update_insurance_end, update_investments_end, update_profile_end, update_utilities_end, verify_email_end } from "../api/urls"

export const login = async (data) => {
    try {
        const login = await axiosInstance.post(login_end, data)
        return login.data
    } catch (error) {
        console.log(error)

    }
}

export const register = async (data) => {
    try {
        const register = await axiosInstance.post(register_end, data)
        return register.data
    } catch (error) {
        console.log(error)
    }
}

export const verifyEmail = async (data) => {
    try {
        const verifyEmail = await axiosInstance.post(verify_email_end, data)
        return verifyEmail.data
    } catch (error) {
        console.log(error)
    }
}

export const profile = async () => {
    try {
        const profile = await axiosInstance.get(profile_end)
        return profile.data
    } catch (error) {
        console.log(error)
    }
}

export const updateProfile = async (data) => {
    try {
        const updateProfile = await axiosInstance.put(update_profile_end, data)
        return updateProfile.data
    } catch (error) {
        console.log(error)
    }
}

export const resetPassword = async (data) => {
    try {
        const resetPassword = await axiosInstance.post(reset_password_end, data)
        return resetPassword.data
    } catch (error) {
        console.log(error)
    }
}




// Assets Manage Functions

export const createAsset = async (data) => {
    try {
        const createAsset = await axiosInstance.post(create_asset_end, data)
        return createAsset.data
    } catch (error) {
        console.log(error)
    }
}

export const getAssets = async () => {
    try {
        const getAssets = await axiosInstance.get(get_assets_end)
        return getAssets.data
    } catch (error) {
        console.log(error)
    }
}

export const getAssetById = async (id) => {
    try {
        const getAssetById = await axiosInstance.get(`${get_asset_by_id_end}/${id}`)
        return getAssetById.data
    } catch (error) {
        console.log(error)
    }
}

export const updateAsset = async (id, data) => {
    try {
        const updateAsset = await axiosInstance.put(`${update_asset_end}/${id}`, data)
        return updateAsset.data
    } catch (error) {
        console.log(error)
    }
}

export const deleteAsset = async (id) => {
    try {
        const deleteAsset = await axiosInstance.delete(`${delete_asset_end}/${id}`)
        return deleteAsset.data
    } catch (error) {
        console.log(error)
    }
}

export const getTotalAssetsValue = async () => {
    try {
        const getTotalAssets = await axiosInstance.get(get_totle_assets_value_end)
        return getTotalAssets.data
    } catch (error) {
        console.log(error)
    }
}

// Debts
export const createDebt =async (data)=>{
    try {
        const createDebt = await axiosInstance.post(create_debt_end,data)
        return createDebt.data
    } catch (error) {
        console.log(error)
    }
}

export const getDebts =async ()=>{
    try {
        const getDebts = await axiosInstance.get(get_debts_end)
        return getDebts.data
    } catch (error) {
        console.log(error)
    }
}

export const getDebtById =async (id)=>{
    try {
        const getDebtById = await axiosInstance.get(`${get_debt_by_id_end}/${id}`)
        return getDebtById.data
    } catch (error) {
        console.log(error)
    }
}

export const updateDebt =async (id,data)=>{
    try {
        const updateDebt = await axiosInstance.put(`${update_debt_end}/${id}`,data)
        return updateDebt.data
    } catch (error) {
        console.log(error)
    }
}

export const deleteDebt =async (id)=>{
    try {
        const deleteDebt = await axiosInstance.delete(`${delete_debt_end}/${id}`)
        return deleteDebt.data
    } catch (error) {
        console.log(error)
    }
}


// Insurance

export const createInsurance =async (data)=>{
    try {
        const createInsurance = await axiosInstance.post(create_insurance_end,data)
        return createInsurance.data
    } catch (error) {
        console.log(error)
    }
}

export const getInsurances =async ()=>{
    try {
        const getInsurances = await axiosInstance.get(get_insurance_end)
        return getInsurances.data
    } catch (error) {
        console.log(error)
    }
}


export const getInsuranceById =async (id)=>{
    try {
        const getInsuranceById = await axiosInstance.get(`${get_insurance_by_id_end}/${id}`)
        return getInsuranceById.data
    } catch (error) {
        console.log(error)
    }
}

export const updateInsurance =async (id,data)=>{
    try {
        const updateInsurance = await axiosInstance.put(`${update_insurance_end}/${id}`,data)
        return updateInsurance.data
    } catch (error) {
        console.log(error)
    }
}

export const deleteInsurance =async (id)=>{
    try {
        const deleteInsurance = await axiosInstance.delete(`${delete_insurance_end}/${id}`)
        return deleteInsurance.data
    } catch (error) {
        console.log(error)
    }
}


// Utils

export const createUtility =async (data)=>{
    try {
        const createUtilities = await axiosInstance.post(create_utilities_end,data)
        return createUtilities.data
    } catch (error) {
        console.log(error)
    }
}

export const getUtilities =async ()=>{
    try {
        const getUtilities = await axiosInstance.get(get_utilities_end)
        return getUtilities.data
    } catch (error) {
        console.log(error)
    }
}

export const getUtilityById =async (id)=>{
    try {
        const getUtilitiesById = await axiosInstance.get(`${get_utilities_by_id_end}/${id}`)
        return getUtilitiesById.data
    } catch (error) {
        console.log(error)
    }
}

export const updateUtility =async (id,data)=>{
    try {
        const updateUtilities = await axiosInstance.put(`${update_utilities_end}/${id}`,data)
        return updateUtilities.data
    } catch (error) {
        console.log(error)
    }
}

export const deleteUtility =async (id)=>{
    try {
        const deleteUtilities = await axiosInstance.delete(`${delete_utilities_end}/${id}`)
        return deleteUtilities.data
    } catch (error) {
        console.log(error)
    }
}


// Banking 

export const createBanking =async (data)=>{
    try {
        const createBankings = await axiosInstance.post(create_bankings_end,data)
        return createBankings.data
    } catch (error) {
        console.log(error)
    }
}

export const getBankings =async ()=>{
    try {
        const getBankings = await axiosInstance.get(get_bankings_end)
        return getBankings.data
    } catch (error) {
        console.log(error)
    }
}


export const getBankingById =async (id)=>{
    try {
        const getBankingById = await axiosInstance.get(`${get_bankings_by_id_end}/${id}`)
        return getBankingById.data
    } catch (error) {
        console.log(error)
    }
}

export const updateBanking =async (id,data)=>{
    try {
        const updateBankings = await axiosInstance.put(`${update_bankings_end}/${id}`,data)
        return updateBankings.data
    } catch (error) {
        console.log(error)
    }
}

export const deleteBanking =async (id)=>{
    try {
        const deleteBankings = await axiosInstance.delete(`${delete_bankings_end}/${id}`)
        return deleteBankings.data
    } catch (error) {
        console.log(error)
    }
}

export const getBankingValue =async ()=>{
    try {
        const getBankingValue = await axiosInstance.get(get_totle_bankings_value_end)
        return getBankingValue.data
    } catch (error) {
        console.log(error)
    }
}

// Investment

export const createInvestment =async (data)=>{
    try {
        const createInvestments = await axiosInstance.post(create_investments_end,data)
        return createInvestments.data
    } catch (error) {
        console.log(error)
    }
}

export const getInvestments =async ()=>{
    try {
        const getInvestments = await axiosInstance.get(get_investments_end)
        return getInvestments.data
    } catch (error) {
        console.log(error)
    }
}


export const getInvestmentById =async (id)=>{
    try {
        const getInvestmentById = await axiosInstance.get(`${get_investments_by_id_end}/${id}`)
        return getInvestmentById.data
    } catch (error) {
        console.log(error)
    }
}

export const updateInvestment =async (id,data)=>{
    try {
        const updateInvestments = await axiosInstance.put(`${update_investments_end}/${id}`,data)
        return updateInvestments.data
    } catch (error) {
        console.log(error)
    }
}

export const deleteInvestment =async (id)=>{
    try {
        const deleteInvestments = await axiosInstance.delete(`${delete_investments_end}/${id}`)
        return deleteInvestments.data
    } catch (error) {
        console.log(error)
    }
}

export const totalValueOfInvestments =async ()=>{
    try {
        const totalValueOfInvestments = await axiosInstance.get(get_totle_investments_value_end)
        return totalValueOfInvestments.data
    } catch (error) {
        console.log(error)
    }
}

// Pricing 

export const getPricing =async ()=>{
    try {
        const getPricing = await axiosInstance.get(get_Pricings_end)
        return getPricing.data
    } catch (error) {
        console.log(error)
    }
}

export const getPricingById =async (id)=>{
    try {
        const getPricingById = await axiosInstance.get(`${get_Pricing_by_id_end}/${id}`)
        return getPricingById.data
    } catch (error) {
        console.log(error)
    }
}


// Dashboard 

export const getDashboard =async ()=>{
    try {
        const getDashboard = await axiosInstance.get(dashboard_end)
        return getDashboard.data
    } catch (error) {
        console.log(error)
    }
}

// Executers 
export const getExecuters =async ()=>{
    try {
        const getExecuters = await axiosInstance.get(executors_end)
        return getExecuters.data
    } catch (error) {
        console.log(error)
    }
}

export const deleteExecuter =async (id)=>{
    try {
        const deleteExecuter = await axiosInstance.delete(`${delelte_executors_end}/${id}`)
        return deleteExecuter.data
    } catch (error) {
        console.log(error)
    }
}

export const createExecuter =async (data)=>{
    try {
        const createExecuter = await axiosInstance.post(create_executors_end,data)
        return createExecuter.data
    } catch (error) {
        console.log(error)
    }
}