import AsyncStorage from "@react-native-async-storage/async-storage";

const SURVEY_KEY = "CURRENT_SURVEY";

// Save Survey
export const saveSurvey = async (survey) => {
  try {
    await AsyncStorage.setItem(SURVEY_KEY, JSON.stringify(survey));
  } catch (error) {
    console.log(error);
  }
};

// Get Survey
export const getSurvey = async () => {
  try {
    const data = await AsyncStorage.getItem(SURVEY_KEY);

    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.log(error);
  }
};

// Clear Survey
export const clearSurvey = async () => {
  try {
    await AsyncStorage.removeItem(SURVEY_KEY);
  } catch (error) {
    console.log(error);
  }
};