export type RecitationsInfo = {
  count: number;
  recitations_ids: number[];
};
 
export type Author = {
  id: number;
  title: string;
  add_date: number;
  recitations_info: RecitationsInfo;
};

export type AllAuthors = {
  id: number;
  add_date: number;
  title: string;
  description: string;
  locales: Record<string, unknown>[]; // افترضنا أن هذا الحقل يحتوي على مصفوفة تحتوي على كائنات ذات مفاتيح وقيم غير معروفة النوع في الوقت الحالي
  authors: Author[];
};

export type AuthorRecitations = {
  id:number;
  title:string;
  description: string;
  api_url: string;
};

export type CategoryInfo = {
  id: number;
  title: string;
  description: string | null;
};

export type PreparedBy = {
  id: number;
  source_id: number;
  title: string;
  type: string;
  kind: string;
};

export type QuranList = {
  id: number;
  order: number;
  title: string;
  duration: string;
  size: string;
  extension_type: string;
  description: string;
  url: string;
  api_url: string;
};

export type RecitationItem = {
  id: number;
  title: string;
  type: string;
  add_date: number;
  orginal_item: string;
  translation_language: string;
  source_language: string;
  category_info: CategoryInfo;
  prepared_by: PreparedBy[];
  attachments: QuranList[];
};

export type SuraList = {
  title: string;
  sizex: string;
  extension_type: string;
  url: string;
}

export type Radio = {
  id: number;              
  name: string;            
  url: string;             
  recent_date: string;     
}

export type RadiosData = {
  radios: Radio[];
}

export interface Article {
  id: string;
  title: string;
  content: string;
  image?: string;
  date?: string;
}