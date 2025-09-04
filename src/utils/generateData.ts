import { Item } from "../types/types";




  export function generatePageData(page: number, pageSize: number): Item[] {
    const start = (page - 1) * pageSize + 1;
    const end = page * pageSize;
    return Array.from({ length: pageSize }, (_, i) => {
      const id = start + i;
      return {
        id,
        title: `Item #${id}`,
        subtitle: `This is a paginated row for item ${id}`,
      };
    });
  }
  