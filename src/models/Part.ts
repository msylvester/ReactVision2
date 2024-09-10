interface Part {
    part_num: string;
    name: string;
    part_cat_id: number;
    part_url: string;
    part_img_url: string | null;
    external_ids: {
      BrickLink: string[];
      BrickOwl: string[];
      Brickset?: string[];
      LDraw: string[];
      LEGO?: string[];
    };
    print_of: string | null;
  }
  
  interface ApiResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Part[];
  }
  
  const jsonString = `{
    "count":3974,
    "next":"https://rebrickable.com/api/v3/lego/parts/?color_id=1&page=2&page_size=10&part_cat_id=&search=",
    "previous":null,
    "results":[
      {
        "part_num":"1",
        "name":"Homemaker Bookcase 2 x 4 x 4",
        "part_cat_id":7,
        "part_url":"https://rebrickable.com/parts/1/homemaker-bookcase-2-x-4-x-4/",
        "part_img_url":"https://cdn.rebrickable.com/media/parts/ldraw/15/1.png",
        "external_ids":{
          "BrickLink":["1"],
          "BrickOwl":["697619"],
          "LDraw":["1"]
        },
        "print_of":null
      },
      // ... other parts
    ]
  }`;
  
  function parseApiResponse(json: string): ApiResponse {
    return JSON.parse(json);
  }
  
  function logPartDetails(parts: Part[]): void {
    parts.forEach(part => {
      console.log(`Part Number: ${part.part_num}`);
      console.log(`Name: ${part.name}`);
      console.log(`Category ID: ${part.part_cat_id}`);
      console.log(`Part URL: ${part.part_url}`);
      console.log(`Image URL: ${part.part_img_url}`);
      console.log(`External IDs:`);
      console.log(`  BrickLink: ${part.external_ids.BrickLink.join(', ')}`);
      console.log(`  BrickOwl: ${part.external_ids.BrickOwl.join(', ')}`);
      if (part.external_ids.Brickset) {
        console.log(`  Brickset: ${part.external_ids.Brickset.join(', ')}`);
      }
      console.log(`  LDraw: ${part.external_ids.LDraw.join(', ')}`);
      if (part.external_ids.LEGO) {
        console.log(`  LEGO: ${part.external_ids.LEGO.join(', ')}`);
      }
      console.log(`Print Of: ${part.print_of}`);
      console.log('---');
    });
  }
  
  const apiResponse = parseApiResponse(jsonString);
  logPartDetails(apiResponse.results);
  