export const shufflArray = (array: any[]) => 
    [...array].sort(() => Math.random() - 0.5);
