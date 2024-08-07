// geminiApi.js
const getRecipes = async (foods) => {
    const response = await fetch('https://api.gemini.com/recipes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer AIzaSyBPATezMWr5RKuayfS56aJgphpVFRwH4Tk'
      },
      body: JSON.stringify({ ingredients: foods })
    });
  
    if (!response.ok) {
      throw new Error('Failed to fetch recipes');
    }
  
    const data = await response.json();
    return data.recipes;
  };
  
  export { getRecipes };
  