// src/api.ts
// const KEY = ; 
export const fetchParts = async (colorId: string | null) => {
    const API_URL = 'https://rebrickable.com/api/v3/lego/parts/';

    try {
      const queryParams = new URLSearchParams({
        page_size: '10',
        color_id: colorId || '',
      }).toString();
    
      console.log(`here is the query ${API_URL}?${queryParams}` )
      
      const response = await fetch(`${API_URL}?${queryParams}`, {
        headers: {
            'Authorization': `key ${'fa4e68769dd0b1fe04ec4055eb870304'}`,
            'Accept': 'application/json',  // Match curl header
        },
    });
    //   const response = await fetch(`${API_URL}?${queryParams}`, {
    //     headers: {
    //       'Authorization': `key YOUR_API_KEY`,
    //     },
    //   });
      console.log(`hre is the response ${JSON.stringify(response)}`)
      if (!response.ok) {
        throw new Error('Error fetching parts');
      }
  
      const data = await response.json();
      console.log(`here is the JSON ${JSON.stringify(data)}`)
      return data.results;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };
  