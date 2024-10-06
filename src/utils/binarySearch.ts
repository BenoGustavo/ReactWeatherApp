// Binary search function
export const binarySearch = (arr: { sigla: string }[], target: string): number => {
    let left = 0;
    let right = arr.length - 1;
  
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      const midVal = arr[mid].sigla;
  
      if (midVal === target) {
        return mid;
      } else if (midVal < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  
    return -1; // Target not found
  }