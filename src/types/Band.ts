export type BandMember = {
  id: number;
  name: string;
  role: string;
  imageUrl?: string;
};

export type Band = {
  id: number;
  name: string;
  genre: string;
  formedYear: number;
  description: string;
  imageUrl: string;
  members: BandMember[];
};
