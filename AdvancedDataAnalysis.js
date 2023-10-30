/* Filename: AdvancedDataAnalysis.js */

// This code performs advanced data analysis on a given dataset

// Define the dataset
const dataset = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Function to calculate the mean of the dataset
function calculateMean(data) {
  let sum = 0;
  for (let i = 0; i < data.length; i++) {
    sum += data[i];
  }
  return sum / data.length;
}

// Function to calculate the median of the dataset
function calculateMedian(data) {
  const sortedData = data.sort((a, b) => a - b);
  const mid = Math.floor(sortedData.length / 2);
  
  if (sortedData.length % 2 === 0) {
    return (sortedData[mid - 1] + sortedData[mid]) / 2;
  } else {
    return sortedData[mid];
  }
}

// Function to calculate the mode of the dataset
function calculateMode(data) {
  const frequency = {};
  
  for (let i = 0; i < data.length; i++) {
    if (frequency[data[i]]) {
      frequency[data[i]]++;
    } else {
      frequency[data[i]] = 1;
    }
  }
  
  let mode;
  let maxFrequency = 0;
  
  for (const key in frequency) {
    if (frequency[key] > maxFrequency) {
      mode = key;
      maxFrequency = frequency[key];
    }
  }
  
  return mode;
}

// Function to perform outlier detection on the dataset
function detectOutliers(data) {
  const mean = calculateMean(data);
  const standardDeviation = calculateStandardDeviation(data);
  const outliers = [];
  
  for (let i = 0; i < data.length; i++) {
    const zScore = (data[i] - mean) / standardDeviation;
    
    if (Math.abs(zScore) > 2) {
      outliers.push(data[i]);
    }
  }
  
  return outliers;
}

// Function to calculate the standard deviation of the dataset
function calculateStandardDeviation(data) {
  const mean = calculateMean(data);
  let sumOfSquaredDifferences = 0;
  
  for (let i = 0; i < data.length; i++) {
    sumOfSquaredDifferences += Math.pow(data[i] - mean, 2);
  }
  
  return Math.sqrt(sumOfSquaredDifferences / data.length);
}

// Function to perform data analysis using all the above functions
function performDataAnalysis(data) {
  const mean = calculateMean(data);
  const median = calculateMedian(data);
  const mode = calculateMode(data);
  const outliers = detectOutliers(data);
  const standardDeviation = calculateStandardDeviation(data);
  
  console.log('Mean:', mean);
  console.log('Median:', median);
  console.log('Mode:', mode);
  console.log('Outliers:', outliers);
  console.log('Standard Deviation:', standardDeviation);
}

// Perform data analysis on the dataset
performDataAnalysis(dataset);