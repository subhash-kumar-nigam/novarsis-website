export const generateOrderID = () => {
    // Get current date and time
    const now = new Date();
    
    // Extract date components
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(now.getDate()).padStart(2, '0');
    
    // Extract time components
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    // Generate a random number (just for uniqueness, in case of multiple orders in the same second)
    const randomNum = String(Math.floor(Math.random() * 1000)).padStart(3, '0');
    
    // Construct the order ID
    const orderID = `${year}${month}${day}_${hours}${minutes}${seconds}_${randomNum}`;
    
    return orderID;
}