export interface CatalogueType {
  id?: string;
  code: string;
  name: string;
  description?: string;
}

export interface CatalogueValue {
  id?: string;
  catalogueTypeId: string;
  code: string;
  name: string;
  numericValue?: number;
  description?: string;
}
